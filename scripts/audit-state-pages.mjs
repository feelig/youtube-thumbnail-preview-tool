import fs from "node:fs/promises";
import path from "node:path";

import { MIN_RECOMMENDED_SOURCE_COUNT } from "./lib/state-page-utils.mjs";

const ROOT = process.cwd();
const TOOLS_DIR = path.join(ROOT, "tools");
const CHECK_LINKS = process.argv.includes("--check-links");
const CONCURRENCY = 6;
const TIMEOUT_MS = 15000;

async function walkToolPages() {
  const states = await fs.readdir(TOOLS_DIR, { withFileTypes: true });
  const files = [];

  for (const state of states) {
    if (!state.isDirectory()) continue;

    const stateDir = path.join(TOOLS_DIR, state.name);
    const tools = await fs.readdir(stateDir, { withFileTypes: true });

    for (const tool of tools) {
      if (!tool.isDirectory()) continue;

      const file = path.join(stateDir, tool.name, "index.html");

      try {
        await fs.access(file);
        files.push(file);
      } catch {}
    }
  }

  return files.sort();
}

function relative(file) {
  return path.relative(ROOT, file);
}

function extractFirst(pattern, text) {
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

function extractSourceUrls(html) {
  const sourceBlock = html.match(/<ul class="source-list">([\s\S]*?)<\/ul>/i);
  if (!sourceBlock) return [];

  return [...sourceBlock[1].matchAll(/<a[^>]+href="([^"]+)"/gi)].map((match) => match[1]);
}

function parsePage(file, html) {
  const title = extractFirst(/<h1>([\s\S]*?)<\/h1>/i, html);
  const reviewDate = extractFirst(/Last reviewed:\s*([^<]+)/i, html);
  const canonical = extractFirst(/<link rel="canonical" href="([^"]+)"/i, html);
  const contentModel = extractFirst(/<main class="page" data-content-model="([^"]+)"/i, html);
  const sourceUrls = extractSourceUrls(html);

  return {
    file,
    title,
    reviewDate,
    canonical,
    contentModel,
    sourceUrls,
    hasQuickAnswer: /What most readers need first/i.test(html),
    hasEvidenceChain: /data-evidence-chain/i.test(html),
    hasDecisionTool: /data-decision-tool-root/i.test(html),
    hasCustomerTask: /What to do before you file or pay/i.test(html),
    hasTrustSnapshot: /Why this page is safer to rely on/i.test(html),
    hasSourcesHeading: /Sources used for this page/i.test(html),
    hasFooterNav: /<nav class="footer-nav" aria-label="Footer">/i.test(html),
    hasSummaryTable: /class="summary-table"/i.test(html),
    hasDetailGrid: /class="detail-grid"/i.test(html),
  };
}

function findStructureProblems(page) {
  const problems = [];

  if (!page.title) problems.push("missing-h1");
  if (!page.reviewDate) problems.push("missing-review-date");
  if (!page.canonical) problems.push("missing-canonical");
  if (!page.hasQuickAnswer) problems.push("missing-quick-answer");
  if (!page.hasEvidenceChain) problems.push("missing-evidence-chain");
  if (!page.hasDecisionTool) problems.push("missing-decision-tool");
  if (!page.hasCustomerTask) problems.push("missing-customer-task");
  if (!page.hasTrustSnapshot) problems.push("missing-trust-snapshot");
  if (!page.hasSourcesHeading) problems.push("missing-sources-heading");
  if (page.sourceUrls.length === 0) problems.push("missing-source-links");
  if (!page.hasFooterNav) problems.push("missing-footer-nav");

  return problems;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "FinLogicHub page audit",
      },
      ...options,
    });
  } finally {
    clearTimeout(timeout);
  }
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
      note: `${error.name}: ${error.message}`,
    };
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
    note: response.url !== url ? `redirected to ${response.url}` : "",
  };
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

function formatPageSummary(pages) {
  const lines = [];
  lines.push(`Pages found: ${pages.length}`);
  const structuredCount = pages.filter((page) => page.contentModel === "structured").length;
  lines.push(`Structured body pages: ${structuredCount}`);
  lines.push(`Legacy body pages: ${pages.length - structuredCount}`);
  lines.push("");

  for (const page of pages) {
    const problems = findStructureProblems(page);
    const summaryBits = [
      page.contentModel ? `${page.contentModel} body` : "unknown body model",
      `${page.sourceUrls.length} source link${page.sourceUrls.length === 1 ? "" : "s"}`,
      page.reviewDate ? `reviewed ${page.reviewDate}` : "no review date",
    ];

    if (problems.length > 0) {
      summaryBits.push(`problems: ${problems.join(", ")}`);
    }

    lines.push(`- ${relative(page.file)}: ${summaryBits.join(" | ")}`);
  }

  return lines.join("\n");
}

function formatLinkSummary(results) {
  const lines = [];
  const broken = results.filter((item) => item.category === "broken" || item.category === "error");
  const blocked = results.filter((item) => item.category === "blocked");
  const timedOut = results.filter((item) => item.category === "timeout");
  const transportIssues = results.filter((item) => item.category === "transport");

  lines.push("");
  lines.push(`Source links checked: ${results.length}`);
  lines.push(`OK: ${results.length - broken.length - blocked.length - timedOut.length - transportIssues.length}`);
  lines.push(`Blocked: ${blocked.length}`);
  lines.push(`Timed out: ${timedOut.length}`);
  lines.push(`Transport issues: ${transportIssues.length}`);
  lines.push(`Broken/Error: ${broken.length}`);

  if (blocked.length > 0) {
    lines.push("");
    lines.push("Blocked links:");
    for (const item of blocked) {
      lines.push(`- ${item.status} ${item.url}`);
    }
  }

  if (broken.length > 0) {
    lines.push("");
    lines.push("Broken or error links:");
    for (const item of broken) {
      const detail = item.note ? ` (${item.note})` : "";
      lines.push(`- ${item.status} ${item.url}${detail}`);
    }
  }

  if (timedOut.length > 0) {
    lines.push("");
    lines.push("Timed out links:");
    for (const item of timedOut) {
      const detail = item.note ? ` (${item.note})` : "";
      lines.push(`- ${item.status} ${item.url}${detail}`);
    }
  }

  if (transportIssues.length > 0) {
    lines.push("");
    lines.push("Transport issue links:");
    for (const item of transportIssues) {
      const detail = item.note ? ` (${item.note})` : "";
      lines.push(`- ${item.status} ${item.url}${detail}`);
    }
  }

  return lines.join("\n");
}

const files = await walkToolPages();
const pages = [];

for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  pages.push(parsePage(file, html));
}

const structureIssues = pages.flatMap((page) =>
  findStructureProblems(page).map((problem) => `${relative(page.file)}: ${problem}`)
);

let linkResults = [];
if (CHECK_LINKS) {
  const uniqueUrls = [...new Set(pages.flatMap((page) => page.sourceUrls))];
  linkResults = await mapWithConcurrency(uniqueUrls, checkLink);
}

const failingLinks = linkResults.filter(
  (item) => item.category === "broken" || item.category === "error"
);
const thinSourceCoverage = pages.filter((page) => page.sourceUrls.length < MIN_RECOMMENDED_SOURCE_COUNT);

console.log(formatPageSummary(pages));

if (structureIssues.length > 0) {
  console.log("");
  console.log("Structure issues:");
  for (const issue of structureIssues) {
    console.log(`- ${issue}`);
  }
}

if (CHECK_LINKS) {
  console.log(formatLinkSummary(linkResults));
}

if (thinSourceCoverage.length > 0) {
  console.log("");
  console.log(`Pages below the recommended ${MIN_RECOMMENDED_SOURCE_COUNT}-source target:`);
  for (const page of thinSourceCoverage) {
    console.log(`- ${relative(page.file)} (${page.sourceUrls.length} sources)`);
  }
}

if (structureIssues.length > 0 || failingLinks.length > 0 || thinSourceCoverage.length > 0) {
  process.exitCode = 1;
}
