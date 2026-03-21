import fs from "node:fs/promises";
import path from "node:path";

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
const SOFT_FAIL = process.argv.includes("--soft-fail");

function sentenceList(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "FinLogicHub daily source scan"
      },
      ...options
    });
  } finally {
    clearTimeout(timeout);
  }
}

function classifyLinkResult(url, response, mode) {
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
    mode,
    finalUrl: response.url,
    category,
    note: response.url !== url ? `redirected to ${response.url}` : ""
  };
}

async function checkLink(url) {
  try {
    const head = await fetchWithTimeout(url, { method: "HEAD" });
    if (head.status !== 405) {
      return classifyLinkResult(url, head, "HEAD");
    }
  } catch {}

  try {
    const get = await fetchWithTimeout(url, { method: "GET" });
    return classifyLinkResult(url, get, "GET");
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
      note: `${error.name}: ${error.message}`
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

function renderMarkdownReport({ pageSummaries, stalePages, linkSummary }) {
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
      `- ${page.state}: ${page.sourceCount} official sources | reviewed ${page.lastReviewed} | ${page.reviewAgeDays} day(s) old`
    );
  }

  return `${lines.join("\n")}\n`;
}

const uniqueLinks = [
  ...new Set(liveStatePages.flatMap((page) => page.sourceLinks.map((link) => link.href)))
];

const pageSummaries = liveStatePages.map((page) => {
  const reviewDate = parseReviewDate(page.lastReviewed);
  const route = getPageRoute(page);
  const reviewAgeDays = differenceInDays(reviewDate, SCANNED_AT);

  return {
    state: page.state,
    route,
    lastReviewed: page.lastReviewed,
    reviewAgeDays,
    sourceCount: page.sourceLinks.length
  };
});

const stalePages = pageSummaries
  .filter((page) => page.reviewAgeDays > STALE_REVIEW_DAYS)
  .sort((left, right) => right.reviewAgeDays - left.reviewAgeDays);

const linkResults = await mapWithConcurrency(uniqueLinks, checkLink);
const linkSummary = summarizeLinks(linkResults);

const report = {
  scannedAt: SCANNED_AT.toISOString(),
  readableDate: SCANNED_AT_TEXT,
  staleReviewThresholdDays: STALE_REVIEW_DAYS,
  pagesScanned: liveStatePages.length,
  sourceLinksChecked: linkSummary.checked,
  linkHealth: {
    ok: linkSummary.ok,
    blocked: linkSummary.blocked.length,
    timedOut: linkSummary.timedOut.length,
    transportIssues: linkSummary.transportIssues.length,
    brokenOrError: linkSummary.broken.length
  },
  stalePages,
  thinCoveragePages: pageSummaries.filter((page) => page.sourceCount < MIN_RECOMMENDED_SOURCE_COUNT),
  pages: pageSummaries,
  brokenLinks: linkSummary.broken,
  blockedLinks: linkSummary.blocked,
  timedOutLinks: linkSummary.timedOut,
  transportIssueLinks: linkSummary.transportIssues
};

await fs.mkdir(REPORTS_DIR, { recursive: true });
await fs.writeFile(JSON_REPORT, JSON.stringify(report, null, 2));
await fs.writeFile(
  MARKDOWN_REPORT,
  renderMarkdownReport({ pageSummaries, stalePages, linkSummary })
);

console.log(`Daily source scan completed on ${SCANNED_AT.toISOString()}.`);
console.log(`Pages scanned: ${pageSummaries.length}`);
console.log(`Source links checked: ${linkSummary.checked}`);
console.log(`Broken or error links: ${linkSummary.broken.length}`);
console.log(`Blocked links: ${linkSummary.blocked.length}`);
console.log(`Stale pages: ${stalePages.length}`);
console.log(`Reports written: ${path.relative(ROOT, JSON_REPORT)}, ${path.relative(ROOT, MARKDOWN_REPORT)}`);

if (SOFT_FAIL && (linkSummary.broken.length > 0 || stalePages.length > 0)) {
  console.log("Soft-fail mode enabled: report was written, and release gating should happen in a later audit step.");
}

if (!SOFT_FAIL && (linkSummary.broken.length > 0 || stalePages.length > 0)) {
  process.exitCode = 1;
}
