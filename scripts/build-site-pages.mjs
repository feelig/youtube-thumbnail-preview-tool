import fs from "node:fs/promises";
import path from "node:path";

import { liveStatePages } from "../data/live-state-pages.mjs";
import { coverageBuckets, stateDirectory } from "../data/state-directory.mjs";
import {
  formatLongDate,
  getPageRoute,
  MIN_RECOMMENDED_SOURCE_COUNT,
  parseReviewDate,
  pluralize
} from "./lib/state-page-utils.mjs";

const ROOT = process.cwd();
const DIRECTORY_ROUTE = "/states.html";
const OPERATIONS_ROUTE = "/operations.html";
const OPERATIONS_REPORT = path.join(ROOT, "reports", "daily-source-scan.json");
const homeLookupGroupLabels = {
  "annual-reports": "年度报告指南",
  "annual-registration-and-tax": "年度注册和年度税务指南",
  "recurring-fees-and-statements": "定期费用和报表工具"
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderSiteHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  robotsContent = null
}) {
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta
      name="description"
      content="${escapeHtml(description)}"
    />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta
      property="og:description"
      content="${escapeHtml(ogDescription)}"
    />${robotsContent ? `\n    <meta name="robots" content="${escapeHtml(robotsContent)}" />` : ""}
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://finlogichub5.com/social-preview.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:wght@600;700&amp;display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/style.css" />`;
}

function renderHeader() {
  return `      <header class="site-header">
        <a class="brand" href="/">
          <span class="brand__mark">FH</span>
          <span>
            <strong>FinLogic Hub</strong>
            <small>State filing fee guides</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="${DIRECTORY_ROUTE}">States</a>
          <a href="/filing-basics.html">Filing basics</a>
          <a href="/filing-help-options.html">Help options</a>
          <a href="/about.html">About</a>
        </nav>
      </header>`;
}

function renderHomeHeader() {
  return `      <header class="site-header">
        <a class="brand" href="/">
          <span class="brand__mark">FH</span>
          <span>
            <strong>FinLogic Hub</strong>
            <small>各州备案费指南</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          <a href="/">首页</a>
          <a href="${DIRECTORY_ROUTE}">各州</a>
          <a href="/filing-basics.html">文件归档基础知识</a>
          <a href="/filing-help-options.html">帮助选项</a>
          <a href="/about.html">关于</a>
        </nav>
      </header>`;
}

function renderFooter() {
  return `      <footer class="site-footer">
        <nav class="footer-nav" aria-label="Footer">
          <a href="/">Home</a>
          <a href="${DIRECTORY_ROUTE}">States</a>
          <a href="/filing-basics.html">Filing basics</a>
          <a href="/filing-help-options.html">Help options</a>
          <a href="/about.html">About</a>
          <a href="/privacy.html">Privacy</a>
          <a href="/contact.html">Contact</a>
          <a href="/terms.html">Terms</a>
        </nav>
        <p>&copy; 2026 FinLogic Hub. For planning only. Confirm on the official state site before you file.</p>
      </footer>`;
}

function renderCardMeta(entry) {
  return `Checked ${entry.page.lastReviewed} | ${entry.page.sourceLinks.length} official ${pluralize(
    entry.page.sourceLinks.length,
    "source"
  )}`;
}

function renderStateCards(entries, mode) {
  return entries
    .map((entry) => {
      const description =
        mode === "home" ? entry.homeCardDescription : entry.directoryCardDescription;
      const compactDirectory = mode === "directory";
      const searchText = [
        entry.state,
        entry.guideLabel,
        entry.guideType,
        entry.directoryComparison.obligation,
        entry.directoryComparison.entityFocus,
        description
      ]
        .join(" ")
        .toLowerCase();

      return `            <a class="state-card${compactDirectory ? " state-card--compact" : ""}" href="${escapeHtml(entry.route)}" data-guide-card data-guide-bucket="${escapeHtml(entry.coverageBucket)}" data-search="${escapeHtml(searchText)}">
              <h3>${escapeHtml(entry.guideLabel)}</h3>
${compactDirectory ? "" : `              <p>${escapeHtml(description)}</p>\n`}
              <span>${escapeHtml(renderCardMeta(entry))}</span>
            </a>`;
    })
    .join("\n");
}

function buildBucketSummaries(entries) {
  return coverageBuckets.map((bucket) => ({
    bucket,
    entries: entries.filter((entry) => entry.coverageBucket === bucket.key)
  }));
}

function renderLookupOptions(bucketSummaries, groupLabels = {}) {
  return bucketSummaries
    .map(
      ({ bucket, entries }) => `                  <optgroup label="${escapeHtml(groupLabels[bucket.key] ?? bucket.label)}">
${entries
  .map(
    (entry) =>
      `                    <option value="${escapeHtml(entry.route)}">${escapeHtml(
        entry.guideLabel
      )}</option>`
  )
  .join("\n")}
                  </optgroup>`
    )
    .join("\n");
}

function renderGuideTypeOptions(bucketSummaries) {
  return bucketSummaries
    .map(
      ({ bucket, entries }) =>
        `                <option value="${escapeHtml(bucket.key)}">${escapeHtml(
          `${bucket.label} (${entries.length})`
        )}</option>`
    )
    .join("\n");
}

function renderComparisonOptions(entries) {
  return [...entries]
    .sort((left, right) => left.state.localeCompare(right.state))
    .map(
      (entry) => `                  <option
                    value="${escapeHtml(entry.route)}"
                    data-state="${escapeHtml(entry.state)}"
                    data-guide-label="${escapeHtml(entry.guideLabel)}"
                    data-guide-type="${escapeHtml(entry.guideType)}"
                    data-obligation="${escapeHtml(entry.directoryComparison.obligation)}"
                    data-entity-focus="${escapeHtml(entry.directoryComparison.entityFocus)}"
                    data-deadline="${escapeHtml(entry.directoryComparison.deadline)}"
                    data-amount="${escapeHtml(entry.directoryComparison.amount)}"
                    data-late-rule="${escapeHtml(entry.homeComparison?.lateRule ?? "See guide for late rule")}"
                  >${escapeHtml(entry.state)}</option>`
    )
    .join("\n");
}

function renderProofStrip(items) {
  return `            <div class="proof-strip">
${items
  .map(
    (item) => `              <span class="proof-pill">
                <strong>${escapeHtml(item.label)}</strong>${item.text ? `\n                <span>${escapeHtml(item.text)}</span>` : ""}
              </span>`
  )
  .join("\n")}
            </div>`;
}

function renderHomeComparisonRows(entries) {
  return entries
    .map(
      (entry) => `                <tr>
                  <td>${escapeHtml(entry.state)}</td>
                  <td>${escapeHtml(entry.homeComparison.focus)}</td>
                  <td>${escapeHtml(entry.homeComparison.deadline)}</td>
                  <td>${escapeHtml(entry.homeComparison.fee)}</td>
                  <td>${escapeHtml(entry.homeComparison.lateRule)}</td>
                </tr>`
    )
    .join("\n");
}

function renderDirectoryComparisonRows(entries) {
  return entries
    .map(
      (entry) => `                <tr>
                  <td>${escapeHtml(entry.state)}</td>
                  <td>${escapeHtml(entry.directoryComparison.obligation)}</td>
                  <td>${escapeHtml(entry.directoryComparison.entityFocus)}</td>
                  <td>${escapeHtml(entry.directoryComparison.deadline)}</td>
                  <td>${escapeHtml(entry.directoryComparison.amount)}</td>
                </tr>`
    )
    .join("\n");
}

function renderCoverageMetrics(bucketSummaries) {
  return bucketSummaries
    .map(
      ({ bucket, entries }) => `              <div class="metric-card">
                <strong>${escapeHtml(bucket.label)} (${entries.length})</strong>
                <span>${escapeHtml(bucket.description)}</span>
              </div>`
    )
    .join("\n");
}

function renderCustomerFlow() {
  const steps = [
    {
      step: "1",
      title: "Pick the exact filing label",
      text: "Choose the page that matches the actual state filing type, not just the state name."
    },
    {
      step: "2",
      title: "Match the entity type",
      text: "Check whether the state treats LLCs, corporations, nonprofits, or foreign entities differently."
    },
    {
      step: "3",
      title: "Use the due date and published amount",
      text: "Get the first practical answer fast before opening the official filing screen."
    },
    {
      step: "4",
      title: "Finish on the official source",
      text: "Use the linked state portal, fee schedule, or FAQ as the controlling source before you file."
    }
  ];

  return steps
    .map(
      (item) => `            <article class="flow-card">
              <span class="flow-step">${escapeHtml(item.step)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.text)}</p>
            </article>`
    )
    .join("\n");
}

function renderSearchPanel(title, description) {
  return `          <div class="filter-bar">
            <div>
              <strong>${escapeHtml(title)}</strong>
              <span>${escapeHtml(description)}</span>
            </div>
            <label class="field field--search">
              <span>Search guides</span>
              <input
                type="search"
                placeholder="Type a state, filing type, or entity"
                data-guide-search-input
              />
            </label>
          </div>`;
}

function buildFallbackScan(entries) {
  return {
    scannedAt: null,
    readableDate: "No scan snapshot yet",
    staleReviewThresholdDays: 45,
    pagesScanned: entries.length,
    sourceLinksChecked: new Set(entries.flatMap((entry) => entry.page.sourceLinks.map((link) => link.href))).size,
    linkHealth: {
      ok: 0,
      blocked: 0,
      timedOut: 0,
      transportIssues: 0,
      brokenOrError: 0
    },
    stalePages: [],
    thinCoveragePages: [],
    pages: entries.map((entry) => ({
      state: entry.state,
      route: entry.route,
      lastReviewed: entry.page.lastReviewed,
      reviewAgeDays: 0,
      sourceCount: entry.page.sourceLinks.length
    })),
    brokenLinks: [],
    blockedLinks: [],
    timedOutLinks: [],
    transportIssueLinks: []
  };
}

async function loadOperationsSnapshot(entries) {
  try {
    const raw = await fs.readFile(OPERATIONS_REPORT, "utf8");
    return JSON.parse(raw);
  } catch {
    return buildFallbackScan(entries);
  }
}

function formatScanTimestamp(scannedAt, readableDate) {
  if (!scannedAt) {
    return readableDate;
  }

  const value = new Date(scannedAt);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short"
  }).format(value);
}

function getOperationsPriority(row, staleReviewThresholdDays) {
  if (
    row.reviewAgeDays > staleReviewThresholdDays ||
    row.brokenCount > 0 ||
    row.timedOutCount > 0 ||
    row.transportCount > 0
  ) {
    return {
      rank: 0,
      label: "Immediate attention",
      note: "Resolve data or source-health risk before relying on this page as current.",
      toneClass: "badge--overdue"
    };
  }

  if (row.blockedCount > 0 || row.reviewAgeDays >= Math.max(staleReviewThresholdDays - 10, 0)) {
    return {
      rank: 1,
      label: "Watch closely",
      note: "The page is still usable, but it deserves a quick human check or source follow-up.",
      toneClass: "badge--soon"
    };
  }

  return {
    rank: 2,
    label: "Stable",
    note: "No immediate review or source-health issue is showing in the latest scan snapshot.",
    toneClass: "badge--fresh"
  };
}

function renderIssueSummary(row) {
  const parts = [];

  if (row.brokenCount > 0) parts.push(`${row.brokenCount} broken`);
  if (row.timedOutCount > 0) parts.push(`${row.timedOutCount} timeout`);
  if (row.transportCount > 0) parts.push(`${row.transportCount} transport`);
  if (row.blockedCount > 0) parts.push(`${row.blockedCount} blocked`);

  return parts.length > 0 ? parts.join(" / ") : "No source-health issues in latest scan";
}

function buildOperationsModel(entries, snapshot) {
  const pageSummaryByRoute = new Map(snapshot.pages.map((page) => [page.route, page]));
  const sourceOwners = new Map();

  for (const entry of entries) {
    for (const link of entry.page.sourceLinks) {
      const owners = sourceOwners.get(link.href) ?? [];
      owners.push({ route: entry.route, state: entry.state });
      sourceOwners.set(link.href, owners);
    }
  }

  const routeCounts = new Map(
    entries.map((entry) => [
      entry.route,
      { brokenCount: 0, blockedCount: 0, timedOutCount: 0, transportCount: 0 }
    ])
  );
  const issueSets = [
    { key: "brokenCount", label: "Broken or error", items: snapshot.brokenLinks ?? [] },
    { key: "timedOutCount", label: "Timed out", items: snapshot.timedOutLinks ?? [] },
    { key: "transportCount", label: "Transport issue", items: snapshot.transportIssueLinks ?? [] },
    { key: "blockedCount", label: "Blocked", items: snapshot.blockedLinks ?? [] }
  ];
  const issueRows = [];

  for (const issueSet of issueSets) {
    for (const item of issueSet.items) {
      const owners = sourceOwners.get(item.url) ?? [];

      for (const owner of owners) {
        const counts = routeCounts.get(owner.route);
        if (counts) {
          counts[issueSet.key] += 1;
        }
      }

      issueRows.push({
        category: issueSet.label,
        states: owners.length > 0 ? owners.map((owner) => owner.state).join(", ") : "Not matched",
        url: item.url,
        detail:
          item.note ||
          (item.finalUrl && item.finalUrl !== item.url ? `Redirected to ${item.finalUrl}` : ""),
        sortRank:
          issueSet.label === "Broken or error"
            ? 0
            : issueSet.label === "Timed out"
              ? 1
              : issueSet.label === "Transport issue"
                ? 2
                : 3
      });
    }
  }

  const routeHealthRows = entries
    .map((entry) => {
      const summary = pageSummaryByRoute.get(entry.route) ?? {
        route: entry.route,
        state: entry.state,
        lastReviewed: entry.page.lastReviewed,
        reviewAgeDays: 0,
        sourceCount: entry.page.sourceLinks.length
      };
      const counts = routeCounts.get(entry.route) ?? {
        brokenCount: 0,
        blockedCount: 0,
        timedOutCount: 0,
        transportCount: 0
      };
      const priority = getOperationsPriority(
        {
          ...summary,
          ...counts
        },
        snapshot.staleReviewThresholdDays
      );

      return {
        state: entry.state,
        route: entry.route,
        lastReviewed: summary.lastReviewed,
        reviewAgeDays: summary.reviewAgeDays,
        sourceCount: summary.sourceCount,
        ...counts,
        issueSummary: renderIssueSummary(counts),
        priority
      };
    })
    .sort((left, right) => {
      if (left.priority.rank !== right.priority.rank) {
        return left.priority.rank - right.priority.rank;
      }

      if (left.reviewAgeDays !== right.reviewAgeDays) {
        return right.reviewAgeDays - left.reviewAgeDays;
      }

      return left.state.localeCompare(right.state);
    });

  return {
    issueRows: issueRows.sort((left, right) => {
      if (left.sortRank !== right.sortRank) {
        return left.sortRank - right.sortRank;
      }

      return left.states.localeCompare(right.states);
    }),
    routeHealthRows,
    attentionRows: routeHealthRows.filter((row) => row.priority.rank < 2),
    pagesAtBaselineCoverage: routeHealthRows.filter(
      (row) => row.sourceCount === MIN_RECOMMENDED_SOURCE_COUNT
    ).length
  };
}

function renderOperationsMetrics(snapshot, attentionRows, pagesAtBaselineCoverage) {
  const metrics = [
    {
      label: "Latest scan",
      text: `${formatScanTimestamp(snapshot.scannedAt, snapshot.readableDate)} | ${snapshot.pagesScanned} pages`
    },
    {
      label: "Link health",
      text: `${snapshot.sourceLinksChecked} checked | ${snapshot.linkHealth.brokenOrError} broken/error | ${snapshot.linkHealth.blocked} blocked`
    },
    {
      label: "Pages needing attention",
      text: `${attentionRows.length} page${attentionRows.length === 1 ? "" : "s"} | ${pagesAtBaselineCoverage} still sitting on the 5-source baseline`
    }
  ];

  return metrics
    .map(
      (metric) => `              <div class="metric-card">
                <strong>${escapeHtml(metric.label)}</strong>
                <span>${escapeHtml(metric.text)}</span>
              </div>`
    )
    .join("\n");
}

function renderOperationsAttentionCards(rows) {
  if (rows.length === 0) {
    return `          <div class="mini-grid">
            <article class="mini-card">
              <span>Stable snapshot</span>
              <strong>No pages are calling for immediate follow-up right now.</strong>
              <p>The latest scan is not surfacing stale reviews, broken links, timeouts, or transport issues on any live state page.</p>
            </article>
          </div>`;
  }

  return `          <div class="mini-grid ops-grid">
${rows
  .map(
    (row) => `            <article class="mini-card ops-card">
              <span>${escapeHtml(row.priority.label)}</span>
              <strong>${escapeHtml(row.state)}</strong>
              <p>${escapeHtml(row.priority.note)}</p>
              <p class="ops-card__meta">Reviewed ${escapeHtml(row.lastReviewed)} | ${row.sourceCount} official ${pluralize(row.sourceCount, "source")}</p>
              <p class="ops-card__meta">${escapeHtml(row.issueSummary)}</p>
            </article>`
  )
  .join("\n")}
          </div>`;
}

function renderOperationsBoardRows(rows) {
  return rows
    .map(
      (row) => `                <tr>
                  <td><a class="inline-link" href="${escapeHtml(row.route)}">${escapeHtml(row.state)}</a></td>
                  <td>${escapeHtml(row.lastReviewed)} (${row.reviewAgeDays} day${row.reviewAgeDays === 1 ? "" : "s"} old)</td>
                  <td>${row.sourceCount}</td>
                  <td>${escapeHtml(row.issueSummary)}</td>
                  <td><span class="badge ${row.priority.toneClass}">${escapeHtml(row.priority.label)}</span></td>
                </tr>`
    )
    .join("\n");
}

function renderIssueLogRows(issueRows) {
  if (issueRows.length === 0) {
    return `                <tr>
                  <td colspan="4">No blocked, timed-out, transport, or broken source links are in the current scan log.</td>
                </tr>`;
  }

  return issueRows
    .map(
      (row) => `                <tr>
                  <td>${escapeHtml(row.category)}</td>
                  <td>${escapeHtml(row.states)}</td>
                  <td><a class="inline-link" href="${escapeHtml(row.url)}">${escapeHtml(row.url)}</a></td>
                  <td>${escapeHtml(row.detail || "No extra note")}</td>
                </tr>`
    )
    .join("\n");
}

function renderStartPathCards() {
  const cards = [
    {
      href: "#stateGuideSelect",
      kicker: "I know the state",
      label: "Open one guide fast",
      text: "Choose the state guide when you already know the state and filing label."
    },
    {
      href: DIRECTORY_ROUTE,
      kicker: "I need to compare",
      label: "Browse all live states",
      text: "Use the full directory if you need to compare more than one state or filing rule."
    },
    {
      href: "/filing-basics.html",
      kicker: "I am not sure yet",
      label: "Read the filing basics",
      text: "Start there if you need help understanding the filing label before opening a guide."
    }
  ];

  return cards
    .map(
      (card) => `            <a class="action-card" href="${escapeHtml(card.href)}">
              <span class="action-label">${escapeHtml(card.kicker)}</span>
              <strong>${escapeHtml(card.label)}</strong>
              <span>${escapeHtml(card.text)}</span>
            </a>`
    )
    .join("\n");
}

function renderOperationsPage({
  latestReviewText,
  snapshot,
  routeHealthRows,
  attentionRows,
  issueRows,
  pagesAtBaselineCoverage
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${renderSiteHead({
  title: "Operations Review Board | FinLogic Hub",
  description:
    "Internal monitoring board for FinLogic Hub showing the latest source scan snapshot, review freshness, and state-guide follow-up priorities.",
  canonical: `https://finlogichub5.com${OPERATIONS_ROUTE}`,
  ogTitle: "Operations Review Board | FinLogic Hub",
  ogDescription:
    "Internal monitoring board for source health, review freshness, and state-guide follow-up priorities.",
  robotsContent: "noindex,follow"
})}
  </head>
  <body>
    <div class="site-shell">
${renderHeader()}

      <main class="page">
        <section class="hero hero--page">
          <div class="hero__copy surface">
            <div class="breadcrumbs">
              <a href="/">Home</a>
              <span>/</span>
              <span>Operations review board</span>
            </div>
            <p class="eyebrow">Operations</p>
            <h1>Track review freshness, source health, and pages that need follow-up.</h1>
            <p class="hero__subtitle">
              This board is an internal maintenance view. It keeps the latest scan snapshot, review
              cadence, and source-health signals in one place without adding customer clutter to the
              public navigation.
            </p>
            <div class="badge-row">
              <span class="badge">Latest scan: ${escapeHtml(formatScanTimestamp(snapshot.scannedAt, snapshot.readableDate))}</span>
              <span class="badge">Latest manual review on live pages: ${escapeHtml(latestReviewText)}</span>
              <span class="badge">Noindex maintenance page</span>
            </div>
          </div>

          <aside class="summary-panel surface">
            <h2>Current snapshot</h2>
            <div class="metric-grid">
${renderOperationsMetrics(snapshot, attentionRows, pagesAtBaselineCoverage)}
            </div>
          </aside>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Follow-up first</p>
            <h2>States that deserve a closer look</h2>
            <p>
              Immediate attention means a stale review, timeout, transport issue, or broken source.
              Watch closely usually means blocked government sources or a page nearing the review
              threshold.
            </p>
          </div>
${renderOperationsAttentionCards(attentionRows)}
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">State board</p>
            <h2>Health snapshot across all live guides</h2>
            <p>
              This board combines review age, source count, and link-health signals so release
              decisions can stay consistent across the whole site.
            </p>
          </div>
          <div class="table-scroll">
            <table class="summary-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Review freshness</th>
                  <th>Sources</th>
                  <th>Latest scan issues</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
${renderOperationsBoardRows(routeHealthRows)}
              </tbody>
            </table>
          </div>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Issue log</p>
            <h2>Blocked, timed-out, transport, and broken source links</h2>
            <p>
              This table mirrors the latest scan log so the team can see which official sources
              were blocked, unstable, or broken without opening the raw report file first.
            </p>
          </div>
          <div class="table-scroll">
            <table class="summary-table">
              <thead>
                <tr>
                  <th>Issue type</th>
                  <th>State impact</th>
                  <th>Source URL</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
${renderIssueLogRows(issueRows)}
              </tbody>
            </table>
          </div>
        </section>

        <section class="section section--split">
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Release rule</p>
              <h2>What this board is meant to protect</h2>
            </div>
            <ul class="checklist">
              <li>Every live guide should keep its manual review date inside the current review window.</li>
              <li>Every live guide should keep at least ${MIN_RECOMMENDED_SOURCE_COUNT} official state sources linked.</li>
              <li>Broken or error-level source links should stop the release path instead of hiding quietly in production.</li>
              <li>Blocked government sources should trigger human follow-up even when the page itself is still usable.</li>
            </ul>
          </div>
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">How to use it</p>
              <h2>How this board fits the maintenance workflow</h2>
            </div>
            <ul class="checklist">
              <li>Start with the states marked Immediate attention.</li>
              <li>If the issue is a blocked source, verify manually before changing the live copy.</li>
              <li>If the issue is a timeout or transport failure, rerun the scan before treating it as a broken source.</li>
              <li>Use the linked state guide from the board table when the page itself needs a fresh review.</li>
            </ul>
          </div>
        </section>
      </main>

${renderFooter()}
    </div>
    <script src="/script.js"></script>
  </body>
</html>
`;
}

function renderHomePage({
  entries,
  latestReviewChineseText,
  uniqueSourceCount,
  bucketSummaries
}) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
${renderSiteHead({
  title: "State Filing Deadlines and Recurring Business Fees | FinLogic Hub",
  description:
    "State filing guides for annual report deadlines, franchise tax due dates, recurring filing fees, and late-payment rules.",
  canonical: "https://finlogichub5.com/",
  ogTitle: "State Filing Deadlines and Recurring Business Fees | FinLogic Hub",
  ogDescription:
    "Customer-friendly state filing guides with official-source links for deadlines, fees, annual taxes, and late-payment rules."
})}
  </head>
  <body>
    <div class="site-shell">
${renderHomeHeader()}

      <main class="page">
        <section class="hero hero--home">
          <div class="hero__copy surface">
            <p class="eyebrow">官方州来源指南</p>
            <h1>查找适用于您企业的州申报截止日期、年费或定期税款。</h1>
            <p class="hero__subtitle">
              每份在线指南均经过人工审核，并与官方州政府信息来源关联，且每日进行来源健康检查。请选择您需要的州和申报标签，然后在提交或付款前使用链接的官方门户网站。
            </p>
            <div class="notice-bar">
              <strong>重要的:</strong>
              <span>使用此网站可以快速缩小答案范围。官方州政府的指示和申报门户网站仍然具有决定性意义。</span>
            </div>
            <div class="stat-grid">
              <div class="stat-card">
                <strong>${entries.length} 个实时州指南</strong>
                <span>用于年度报告、费用表、报表和定期税务申报的页面。</span>
              </div>
              <div class="stat-card">
                <strong>最新人工审核日期: ${latestReviewChineseText}</strong>
                <span>每个在线指南都会显示可见的审核日期。</span>
              </div>
              <div class="stat-card">
                <strong>监测到 ${uniqueSourceCount} 个官方来源链接</strong>
                <span>每日扫描会标记出失效链接和可能需要重新检查的页面。</span>
              </div>
            </div>
          </div>

          <aside class="hero__panel surface">
            <h2>快速查找指南</h2>
            <p>选择与您所在州和申报类型相符的指南。</p>
            <form class="lookup-form" data-state-lookup>
              <label class="field" for="stateGuideSelect">
                <span>选择州指南</span>
                <select id="stateGuideSelect" name="state-guide">
                  <option value="">选择一份指南</option>
${renderLookupOptions(bucketSummaries, homeLookupGroupLabels)}
                </select>
              </label>
              <button class="button button--primary" type="submit">打开指南</button>
            </form>
          </aside>
        </section>
      </main>
    </div>
    <script src="/script.js"></script>
  </body>
</html>
`;
}

function renderStatesPage({ entries, latestReviewText, bucketSummaries }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${renderSiteHead({
  title: "State Filing Guides | FinLogic Hub",
  description:
    "Browse state filing guides for annual report deadlines, franchise tax due dates, annual taxes, recurring business fees, and late-payment rules by state.",
  canonical: `https://finlogichub5.com${DIRECTORY_ROUTE}`,
  ogTitle: "State Filing Guides | FinLogic Hub",
  ogDescription:
    "State-by-state filing guides covering annual reports, franchise tax due dates, annual taxes, recurring fees, and official filing links."
})}
  </head>
  <body>
    <div class="site-shell">
${renderHeader()}

      <main class="page" data-guide-compare-root>
        <section class="hero hero--page">
          <div class="hero__copy surface">
            <div class="breadcrumbs">
              <a href="/">Home</a>
              <span>/</span>
              <span>State filing guides</span>
            </div>
            <p class="eyebrow">State directory</p>
            <h1>Browse and compare state guides</h1>
            <p class="hero__subtitle">
              Choose 2 or 3 states, submit the comparison, and review the filing label, deadline,
              amount, and late rule below.
            </p>
            <div class="badge-row">
              <span class="badge">${entries.length} state guides</span>
              <span class="badge">Checked ${escapeHtml(latestReviewText)}</span>
              <span class="badge">Daily source scan enabled</span>
            </div>
          </div>

          <aside class="summary-panel surface">
            <p class="eyebrow">Compare states</p>
            <h2>Compare 2 or 3 states</h2>
            <p>Pick your states here, then read the generated comparison table below.</p>
            <form class="compare-form" data-compare-form>
            <div class="compare-toolbar">
              <div class="compare-mode-group" role="group" aria-label="Compare mode">
                <button
                  class="button button--secondary compare-mode-button is-active"
                  type="button"
                  data-compare-mode-button
                  data-mode="2"
                  aria-pressed="true"
                >
                  2 states
                </button>
                <button
                  class="button button--secondary compare-mode-button"
                  type="button"
                  data-compare-mode-button
                  data-mode="3"
                  aria-pressed="false"
                >
                  3 states
                </button>
              </div>
              <label class="field" for="compareStateOne">
                <span>State 1</span>
                <select id="compareStateOne" data-compare-select>
                  <option value="">Choose a state</option>
${renderComparisonOptions(entries)}
                </select>
              </label>
              <label class="field" for="compareStateTwo">
                <span>State 2</span>
                <select id="compareStateTwo" data-compare-select>
                  <option value="">Choose a state</option>
${renderComparisonOptions(entries)}
                </select>
              </label>
              <label class="field" for="compareStateThree" data-compare-third-field hidden>
                <span>State 3</span>
                <select id="compareStateThree" data-compare-select>
                  <option value="">Choose a state</option>
${renderComparisonOptions(entries)}
                </select>
              </label>
            </div>
            <div class="compare-actions">
              <button class="button button--primary" type="submit">Compare states</button>
              <button class="button button--secondary" type="button" data-compare-reset>
                Clear
              </button>
            </div>
            </form>
            <p class="panel-note">Need help with filing labels first? Start with <a class="inline-link" href="/filing-basics.html">Filing basics</a>.</p>
          </aside>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Comparison results</p>
            <h2>State comparison results</h2>
            <p>
              This result table is generated from the states you selected above and links back to
              each full guide.
            </p>
          </div>
          <p class="compare-status" data-compare-status>
            Choose 2 states and click Compare states.
          </p>
          <div class="table-scroll" hidden data-compare-table-wrap>
            <table class="summary-table compare-table" data-compare-table></table>
          </div>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">All guides</p>
            <h2>All state guides</h2>
          </div>
          <div class="state-grid state-grid--directory">
${renderStateCards(entries, "directory")}
          </div>
        </section>
      </main>

${renderFooter()}
    </div>
    <script src="/script.js"></script>
  </body>
</html>
`;
}

const pagesByRoute = new Map(liveStatePages.map((page) => [getPageRoute(page), page]));

const entries = stateDirectory.map((entry) => {
  const page = pagesByRoute.get(entry.route);

  if (!page) {
    throw new Error(`Missing live page data for route: ${entry.route}`);
  }

  return {
    ...entry,
    page
  };
});

const latestReviewDate = new Date(
  Math.max(...entries.map((entry) => parseReviewDate(entry.page.lastReviewed).getTime()))
);
const latestReviewText = formatLongDate(latestReviewDate);
const latestReviewChineseText = `${latestReviewDate.getUTCFullYear()}年${latestReviewDate.getUTCMonth() + 1}月${latestReviewDate.getUTCDate()}日`;
const uniqueSourceCount = new Set(
  entries.flatMap((entry) => entry.page.sourceLinks.map((link) => link.href))
).size;
const bucketSummaries = buildBucketSummaries(entries);
const operationsSnapshot = await loadOperationsSnapshot(entries);
const operationsModel = buildOperationsModel(entries, operationsSnapshot);

await fs.writeFile(
  path.join(ROOT, "index.html"),
  renderHomePage({
    entries,
    latestReviewChineseText,
    uniqueSourceCount,
    bucketSummaries
  })
);

await fs.writeFile(
  path.join(ROOT, "states.html"),
  renderStatesPage({ entries, latestReviewText, bucketSummaries })
);

await fs.writeFile(
  path.join(ROOT, "operations.html"),
  renderOperationsPage({
    latestReviewText,
    snapshot: operationsSnapshot,
    routeHealthRows: operationsModel.routeHealthRows,
    attentionRows: operationsModel.attentionRows,
    issueRows: operationsModel.issueRows,
    pagesAtBaselineCoverage: operationsModel.pagesAtBaselineCoverage
  })
);

console.log(`Built site pages for ${entries.length} live guides plus the operations board.`);
