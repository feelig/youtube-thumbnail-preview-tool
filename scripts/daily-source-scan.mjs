import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

import { liveStatePages } from "../data/live-state-pages.mjs";
import {
  DEFAULT_STALE_REVIEW_DAYS,
  differenceInDays,
  formatLongDate,
  getPageRoute,
  MIN_RECOMMENDED_SOURCE_COUNT,
  parseReviewDate
} from "./lib/state-page-utils.mjs";

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, "reports");
const JSON_REPORT = path.join(REPORTS_DIR, "daily-source-scan.json");
const MARKDOWN_REPORT = path.join(REPORTS_DIR, "daily-source-scan.md");
const SCANNED_AT = new Date();
const SCANNED_AT_TEXT = formatLongDate(SCANNED_AT);
const STALE_REVIEW_DAYS = Number(process.env.STALE_REVIEW_DAYS ?? DEFAULT_STALE_REVIEW_DAYS);
const CONCURRENCY = 6;
const TIMEOUT_MS = 15000;
const MAX_TEXT_FINGERPRINT_CHARS = 120000;
const SOFT_FAIL = process.argv.includes("--soft-fail");

function sentenceList(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function hashContent(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 16);
}

function normalizeHtmlText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_TEXT_FINGERPRINT_CHARS);
}

function normalizePlainText(text) {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT_FINGERPRINT_CHARS);
}

function extractHtmlTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? normalizePlainText(match[1]) : null;
}

async function loadPreviousReport() {
  try {
    const raw = await fs.readFile(JSON_REPORT, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; FinLogicHubSourceMonitor/1.0; +https://finlogichub5.com/operations)",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf;q=0.8,*/*;q=0.7",
        "accept-language": "en-US,en;q=0.9"
      },
      ...options
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function describeResponseContent(response) {
  const contentType = response.headers.get("content-type") ?? "";
  const contentLengthHeader = response.headers.get("content-length");
  const parsedContentLength = Number(contentLengthHeader);
  const contentLength = Number.isFinite(parsedContentLength) ? parsedContentLength : null;
  const clone = response.clone();

  try {
    if (/text\/html|application\/xhtml\+xml/i.test(contentType)) {
      const html = await clone.text();
      const normalized = normalizeHtmlText(html);

      return {
        contentType,
        contentLength,
        fingerprint: normalized ? hashContent(`html:${normalized}`) : null,
        title: extractHtmlTitle(html),
        preview: normalized.slice(0, 160) || null
      };
    }

    if (/text\/|application\/(?:json|xml|javascript)/i.test(contentType)) {
      const text = await clone.text();
      const normalized = normalizePlainText(text);

      return {
        contentType,
        contentLength,
        fingerprint: normalized ? hashContent(`text:${normalized}`) : null,
        title: null,
        preview: normalized.slice(0, 160) || null
      };
    }

    if (/application\/pdf/i.test(contentType)) {
      const buffer = Buffer.from(await clone.arrayBuffer());

      return {
        contentType,
        contentLength: contentLength ?? buffer.length,
        fingerprint: buffer.length > 0 ? hashContent(buffer) : null,
        title: null,
        preview: null
      };
    }
  } catch (error) {
    return {
      contentType,
      contentLength,
      fingerprint: null,
      title: null,
      preview: null,
      contentError: `${error.name}: ${error.message}`
    };
  }

  return {
    contentType,
    contentLength,
    fingerprint: null,
    title: null,
    preview: null
  };
}

function classifyLinkResult(url, response) {
  const { status } = response;
  let category = "ok";

  if (status === 401 || status === 403) {
    category = "blocked";
  } else if (status >= 400) {
    category = "broken";
  }

  return {
    url,
    status,
    mode: "GET",
    finalUrl: response.url,
    category,
    note: response.url !== url ? `redirected to ${response.url}` : ""
  };
}

async function checkLink(url) {
  try {
    const response = await fetchWithTimeout(url);
    const content = await describeResponseContent(response);

    return {
      ...classifyLinkResult(url, response),
      ...content
    };
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "AbortError";
    const isTransportIssue =
      error instanceof Error && error.name === "TypeError" && /fetch failed/i.test(error.message);

    return {
      url,
      status: isTimeout ? "TIMEOUT" : isTransportIssue ? "TRANSPORT" : "ERR",
      mode: "GET",
      finalUrl: null,
      category: isTimeout ? "timeout" : isTransportIssue ? "transport" : "error",
      note: `${error.name}: ${error.message}`,
      contentType: null,
      contentLength: null,
      fingerprint: null,
      title: null,
      preview: null
    };
  }
}

async function mapWithConcurrency(items, worker) {
  const queue = [...items];
  const results = [];

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length || 1) }, async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        results.push(await worker(item));
      }
    })
  );

  return results;
}

function summarizeLinks(results) {
  const broken = results.filter((item) => item.category === "broken" || item.category === "error");
  const blocked = results.filter((item) => item.category === "blocked");
  const timedOut = results.filter((item) => item.category === "timeout");
  const transportIssues = results.filter((item) => item.category === "transport");

  return {
    checked: results.length,
    ok: results.length - broken.length - blocked.length - timedOut.length - transportIssues.length,
    blocked,
    timedOut,
    transportIssues,
    broken
  };
}

function formatRoute(route) {
  return route === "/" ? route : route.replace(/\/$/, "");
}

function buildSourceOwnerMap() {
  const owners = new Map();

  for (const page of liveStatePages) {
    for (const link of page.sourceLinks) {
      const existing = owners.get(link.href) ?? [];
      existing.push({
        state: page.state,
        route: getPageRoute(page)
      });
      owners.set(link.href, existing);
    }
  }

  return owners;
}

function detectChangedLinks(previousSnapshotsByUrl, currentResults) {
  const changes = [];

  for (const item of currentResults) {
    const previous = previousSnapshotsByUrl.get(item.url);

    if (!previous) {
      continue;
    }

    const changedFields = [];

    if ((previous.status ?? null) !== (item.status ?? null)) {
      changedFields.push("status");
    }

    if ((previous.category ?? null) !== (item.category ?? null)) {
      changedFields.push("category");
    }

    if ((previous.finalUrl ?? null) !== (item.finalUrl ?? null)) {
      changedFields.push("finalUrl");
    }

    const previousIsUntitledHtml =
      /text\/html|application\/xhtml\+xml/i.test(previous.contentType ?? "") && !previous.title;
    const currentIsUntitledHtml =
      /text\/html|application\/xhtml\+xml/i.test(item.contentType ?? "") && !item.title;

    if (
      previous.category === "ok" &&
      item.category === "ok" &&
      !previousIsUntitledHtml &&
      !currentIsUntitledHtml &&
      previous.fingerprint &&
      item.fingerprint &&
      previous.fingerprint !== item.fingerprint
    ) {
      changedFields.push("fingerprint");
    }

    if (changedFields.length === 0) {
      continue;
    }

    changes.push({
      url: item.url,
      changedFields,
      previousStatus: previous.status ?? null,
      status: item.status,
      previousCategory: previous.category ?? null,
      category: item.category,
      previousFinalUrl: previous.finalUrl ?? null,
      finalUrl: item.finalUrl ?? null,
      previousFingerprint: previous.fingerprint ?? null,
      fingerprint: item.fingerprint ?? null,
      previousTitle: previous.title ?? null,
      title: item.title ?? null
    });
  }

  return changes;
}

function renderMarkdownReport({
  pageSummaries,
  stalePages,
  linkSummary,
  changedLinks,
  fingerprintStatus
}) {
  const lines = [];
  const thinCoveragePages = pageSummaries.filter((page) => page.sourceCount < MIN_RECOMMENDED_SOURCE_COUNT);

  lines.push("# Daily Source Scan");
  lines.push("");
  lines.push(`Scanned: ${SCANNED_AT.toISOString()}`);
  lines.push(`Readable date: ${SCANNED_AT_TEXT}`);
  lines.push(`Pages scanned: ${pageSummaries.length}`);
  lines.push(`Stale review threshold: ${STALE_REVIEW_DAYS} days`);
  lines.push("");
  lines.push("## Link Health");
  lines.push("");
  lines.push(`- Checked: ${linkSummary.checked}`);
  lines.push(`- OK: ${linkSummary.ok}`);
  lines.push(`- Blocked: ${linkSummary.blocked.length}`);
  lines.push(`- Timed out: ${linkSummary.timedOut.length}`);
  lines.push(`- Transport issues: ${linkSummary.transportIssues.length}`);
  lines.push(`- Broken or error: ${linkSummary.broken.length}`);
  lines.push(`- Changed since previous scan: ${changedLinks.length}`);

  if (stalePages.length > 0) {
    lines.push("");
    lines.push("## Stale Manual Reviews");
    lines.push("");

    for (const page of stalePages) {
      lines.push(
        `- ${page.state} (${formatRoute(page.route)}): reviewed ${page.lastReviewed} (${page.reviewAgeDays} days old)`
      );
    }
  } else {
    lines.push("");
    lines.push("## Stale Manual Reviews");
    lines.push("");
    lines.push("- None");
  }

  const warningStates = pageSummaries
    .filter((page) => page.reviewAgeDays >= Math.max(STALE_REVIEW_DAYS - 10, 0))
    .map((page) => page.state);

  lines.push("");
  lines.push("## Pages Near Review Threshold");
  lines.push("");
  lines.push(`- ${warningStates.length > 0 ? sentenceList(warningStates) : "None"}`);

  lines.push("");
  lines.push("## Source Content Changes Since Previous Scan");
  lines.push("");

  if (fingerprintStatus === "baseline-established") {
    lines.push("- Baseline established on this scan. Future scans will highlight source content changes automatically.");
  } else if (changedLinks.length > 0) {
    for (const link of changedLinks) {
      lines.push(
        `- ${link.url} (${link.changedFields.join(", ")}${link.title ? ` | ${link.title}` : ""})`
      );
    }
  } else {
    lines.push("- None");
  }

  lines.push("");
  lines.push("## Pages Below Recommended Source Coverage");
  lines.push("");
  lines.push(
    `- ${
      thinCoveragePages.length > 0
        ? sentenceList(thinCoveragePages.map((page) => `${page.state} (${page.sourceCount} sources)`))
        : "None"
    }`
  );

  if (linkSummary.broken.length > 0) {
    lines.push("");
    lines.push("## Broken or Error Links");
    lines.push("");

    for (const link of linkSummary.broken) {
      const detail = link.note ? ` (${link.note})` : "";
      lines.push(`- ${link.status} ${link.url}${detail}`);
    }
  }

  if (linkSummary.blocked.length > 0) {
    lines.push("");
    lines.push("## Blocked Links");
    lines.push("");

    for (const link of linkSummary.blocked) {
      lines.push(`- ${link.status} ${link.url}`);
    }
  }

  lines.push("");
  lines.push("## Page Summary");
  lines.push("");

  for (const page of pageSummaries) {
    lines.push(
      `- ${page.state}: ${page.sourceCount} official sources | reviewed ${page.lastReviewed} | ${page.reviewAgeDays} day(s) old${
        page.changedSourceCount > 0 ? ` | ${page.changedSourceCount} source change(s)` : ""
      }`
    );
  }

  return `${lines.join("\n")}\n`;
}

const previousReport = await loadPreviousReport();
const previousSnapshotsByUrl = new Map(
  (previousReport?.sourceSnapshots ?? []).map((snapshot) => [snapshot.url, snapshot])
);
const sourceOwnersByUrl = buildSourceOwnerMap();
const uniqueLinks = [
  ...new Set(liveStatePages.flatMap((page) => page.sourceLinks.map((link) => link.href)))
];
const linkResults = await mapWithConcurrency(uniqueLinks, checkLink);
const linkSummary = summarizeLinks(linkResults);
const changedLinks = detectChangedLinks(previousSnapshotsByUrl, linkResults);
const changedUrls = new Set(changedLinks.map((link) => link.url));
const pageSummaries = liveStatePages.map((page) => {
  const reviewDate = parseReviewDate(page.lastReviewed);
  const route = getPageRoute(page);
  const reviewAgeDays = differenceInDays(reviewDate, SCANNED_AT);
  const changedSourceCount = page.sourceLinks.filter((link) => changedUrls.has(link.href)).length;

  return {
    state: page.state,
    route,
    lastReviewed: page.lastReviewed,
    reviewAgeDays,
    sourceCount: page.sourceLinks.length,
    changedSourceCount
  };
});
const stalePages = pageSummaries
  .filter((page) => page.reviewAgeDays > STALE_REVIEW_DAYS)
  .sort((left, right) => right.reviewAgeDays - left.reviewAgeDays);
const changedStates = pageSummaries
  .filter((page) => page.changedSourceCount > 0)
  .map((page) => ({
    state: page.state,
    route: page.route,
    changedSourceCount: page.changedSourceCount
  }));
const fingerprintStatus =
  previousSnapshotsByUrl.size > 0 ? "compared-to-previous-scan" : "baseline-established";

const report = {
  scannedAt: SCANNED_AT.toISOString(),
  readableDate: SCANNED_AT_TEXT,
  fingerprintStatus,
  staleReviewThresholdDays: STALE_REVIEW_DAYS,
  pagesScanned: liveStatePages.length,
  sourceLinksChecked: linkSummary.checked,
  linkHealth: {
    ok: linkSummary.ok,
    blocked: linkSummary.blocked.length,
    timedOut: linkSummary.timedOut.length,
    transportIssues: linkSummary.transportIssues.length,
    brokenOrError: linkSummary.broken.length,
    changed: changedLinks.length
  },
  stalePages,
  thinCoveragePages: pageSummaries.filter((page) => page.sourceCount < MIN_RECOMMENDED_SOURCE_COUNT),
  pages: pageSummaries,
  changedStates,
  changedLinks: changedLinks.map((link) => ({
    ...link,
    owners: sourceOwnersByUrl.get(link.url) ?? []
  })),
  brokenLinks: linkSummary.broken,
  blockedLinks: linkSummary.blocked,
  timedOutLinks: linkSummary.timedOut,
  transportIssueLinks: linkSummary.transportIssues,
  sourceSnapshots: linkResults.map((result) => ({
    url: result.url,
    status: result.status,
    category: result.category,
    finalUrl: result.finalUrl,
    contentType: result.contentType,
    contentLength: result.contentLength,
    fingerprint: result.fingerprint,
    title: result.title
  }))
};

await fs.mkdir(REPORTS_DIR, { recursive: true });
await fs.writeFile(JSON_REPORT, JSON.stringify(report, null, 2));
await fs.writeFile(
  MARKDOWN_REPORT,
  renderMarkdownReport({
    pageSummaries,
    stalePages,
    linkSummary,
    changedLinks,
    fingerprintStatus
  })
);

console.log(`Daily source scan completed on ${SCANNED_AT.toISOString()}.`);
console.log(`Pages scanned: ${pageSummaries.length}`);
console.log(`Source links checked: ${linkSummary.checked}`);
console.log(`Broken or error links: ${linkSummary.broken.length}`);
console.log(`Blocked links: ${linkSummary.blocked.length}`);
console.log(`Changed since previous scan: ${changedLinks.length}`);
console.log(`Stale pages: ${stalePages.length}`);
console.log(`Reports written: ${path.relative(ROOT, JSON_REPORT)}, ${path.relative(ROOT, MARKDOWN_REPORT)}`);

if (SOFT_FAIL && (linkSummary.broken.length > 0 || stalePages.length > 0)) {
  console.log("Soft-fail mode enabled: report was written, and release gating should happen in a later audit step.");
}

if (!SOFT_FAIL && (linkSummary.broken.length > 0 || stalePages.length > 0)) {
  process.exitCode = 1;
}
