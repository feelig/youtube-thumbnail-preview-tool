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
        <p>&copy; 2026 FinLogic Hub. Informational only. Official state sources control.</p>
      </footer>`;
}

function renderCardMeta(entry) {
  return `Reviewed ${entry.page.lastReviewed} | ${entry.page.sourceLinks.length} official ${pluralize(
    entry.page.sourceLinks.length,
    "source"
  )}`;
}

function renderStateCards(entries, mode) {
  return entries
    .map((entry) => {
      const description =
        mode === "home" ? entry.homeCardDescription : entry.directoryCardDescription;
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

      return `            <a class="state-card" href="${escapeHtml(entry.route)}" data-guide-card data-search="${escapeHtml(searchText)}">
              <h3>${escapeHtml(entry.guideLabel)}</h3>
              <p>${escapeHtml(description)}</p>
              <span>${escapeHtml(renderCardMeta(entry))}</span>
            </a>`;
    })
    .join("\n");
}

function renderSelectOptions(entries) {
  return entries
    .map(
      (entry) =>
        `                  <option value="${escapeHtml(entry.route)}">${escapeHtml(
          entry.guideLabel
        )}</option>`
    )
    .join("\n");
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
              <span>Search live guides</span>
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
      label: "Open the right guide fast",
      text: "Use the quick state lookup when you already know the state and filing label."
    },
    {
      href: DIRECTORY_ROUTE,
      kicker: "I need to compare",
      label: "Compare live state guides",
      text: "Use the directory if you are checking more than one state, entity type, or filing label."
    },
    {
      href: "/filing-help-options.html",
      kicker: "I need help options",
      label: "Review self-serve and assisted paths",
      text: "Compare the official filing path with help options before paying a third-party service."
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

function renderHomePage({ entries, latestReviewText, uniqueSourceCount }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${renderSiteHead({
  title: "State Filing Deadlines and Recurring Business Fees | FinLogic Hub",
  description:
    "Official-state-source guides for annual report deadlines, franchise tax due dates, recurring filing fees, and late-payment rules for selected U.S. business entities.",
  canonical: "https://finlogichub5.com/",
  ogTitle: "State Filing Deadlines and Recurring Business Fees | FinLogic Hub",
  ogDescription:
    "Official state guidance summaries for filing deadlines, fee tables, annual taxes, and late-payment rules for selected U.S. business entities."
})}
  </head>
  <body>
    <div class="site-shell">
${renderHeader()}

      <main class="page">
        <section class="hero hero--home">
          <div class="hero__copy surface">
            <p class="eyebrow">Official-state-source guides</p>
            <h1>Find the state filing deadline, annual fee, or recurring tax that applies to your business.</h1>
            <p class="hero__subtitle">
              Each live guide is manually reviewed, tied to official state sources, and checked by
              a daily source-health scan. Start with the state and filing label you need, then use
              the linked official portal before you file or pay.
            </p>
            <div class="notice-bar">
              <strong>Important:</strong>
              <span>Use this site to narrow the answer fast. Official state instructions and filing portals still control.</span>
            </div>
            <div class="stat-grid">
              <div class="stat-card">
                <strong>${entries.length} live state guides</strong>
                <span>Pages for annual reports, fee schedules, statements, and recurring tax filings.</span>
              </div>
              <div class="stat-card">
                <strong>Latest manual review: ${escapeHtml(latestReviewText)}</strong>
                <span>Every live guide shows a visible review date.</span>
              </div>
              <div class="stat-card">
                <strong>${uniqueSourceCount} official source links monitored</strong>
                <span>Daily scans flag broken links and pages that may need a fresh check.</span>
              </div>
            </div>
          </div>

          <aside class="hero__panel surface">
            <h2>Quick state lookup</h2>
            <p>Choose the guide that matches your state and filing type.</p>
            <form class="lookup-form" data-state-lookup>
              <label class="field" for="stateGuideSelect">
                <span>Select a state guide</span>
                <select id="stateGuideSelect" name="state-guide">
                  <option value="">Select a guide</option>
${renderSelectOptions(entries)}
                </select>
              </label>
              <button class="button button--primary" type="submit">Open guide</button>
            </form>
          </aside>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Start here</p>
            <h2>Choose the fastest path for what you need</h2>
            <p>
              The site is organized for three common jobs: opening the right guide fast, comparing
              states before filing, or checking help options before paying someone else.
            </p>
          </div>
          <div class="action-list action-list--triple">
${renderStartPathCards()}
          </div>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Customer path</p>
            <h2>What most visitors need in the first minute</h2>
            <p>
              The site is built to answer the same decision sequence every time, so customers can
              move from confusion to the official filing source quickly.
            </p>
          </div>
          <div class="flow-grid">
${renderCustomerFlow()}
          </div>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Live guides</p>
            <h2>Current state coverage</h2>
            <p>
              Each card below is a live guide designed to answer the first customer questions:
              what is due, when it is due, what the published amount is, and which official source
              backs the answer.
            </p>
          </div>
${renderSearchPanel(
  "Start with the closest match",
  "Search by state, filing label, or entity type before scanning the full grid."
)}
          <div class="state-grid">
${renderStateCards(entries, "home")}
          </div>
          <p class="empty-state" hidden data-guide-empty>No matching live guide yet. Try a state name, entity type, or filing label.</p>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Comparison snapshot</p>
            <h2>Fast comparison of the live states</h2>
            <p>
              Use this table to spot the right guide quickly. If a state splits by entity type, use
              the detailed page before filing or paying.
            </p>
          </div>
          <div class="table-scroll">
            <table class="summary-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Main entity covered here</th>
                  <th>Deadline</th>
                  <th>Published fee</th>
                  <th>Late rule shown on live page</th>
                </tr>
              </thead>
              <tbody>
${renderHomeComparisonRows(entries)}
              </tbody>
            </table>
          </div>
        </section>

        <section class="section section--split">
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">How to use this site</p>
              <h2>What a customer should do first</h2>
            </div>
            <ul class="checklist">
              <li>Choose the state guide that matches the filing label, not just the state name.</li>
              <li>Check whether the page is separating LLC, corporation, partnership, or foreign-entity rules.</li>
              <li>Use the quick summary first, then the detailed table if the state has split rules.</li>
              <li>Finish by confirming on the official state link shown on the page.</li>
            </ul>
          </div>
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Trust signals</p>
              <h2>Why these pages stay cleaner and more credible</h2>
            </div>
            <ul class="checklist">
              <li>Official state sources only for deadlines, fees, and penalty math.</li>
              <li>Every live guide shows a specific manual review date.</li>
              <li>Entity-type differences stay separated instead of being blended into one answer.</li>
              <li>Daily source-health scans catch broken links and stale review cycles.</li>
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

function renderStatesPage({ entries, latestReviewText, bucketSummaries }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${renderSiteHead({
  title: "State Filing Guides | FinLogic Hub",
  description:
    "Browse official-state-source guides for annual report deadlines, franchise tax due dates, annual taxes, recurring business fees, and late-payment rules by state.",
  canonical: `https://finlogichub5.com${DIRECTORY_ROUTE}`,
  ogTitle: "State Filing Guides | FinLogic Hub",
  ogDescription:
    "State-by-state filing guides covering annual reports, franchise tax due dates, annual taxes, recurring fees, and official filing links."
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
              <span>State filing guides</span>
            </div>
            <p class="eyebrow">State directory</p>
            <h1>Pick the right live state guide quickly</h1>
            <p class="hero__subtitle">
              This directory is intentionally selective. A state appears here only after we can tie
              the key deadline, fee, and filing rule back to official state sources and add a manual
              review stamp.
            </p>
            <div class="badge-row">
              <span class="badge">${entries.length} live guides</span>
              <span class="badge">Latest manual review: ${escapeHtml(latestReviewText)}</span>
              <span class="badge">Daily source scan enabled</span>
            </div>
          </div>

          <aside class="summary-panel surface">
            <h2>Coverage pattern</h2>
            <div class="metric-grid">
${renderCoverageMetrics(bucketSummaries)}
            </div>
          </aside>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Live guides</p>
            <h2>Current state coverage</h2>
            <p>
              Each card below links to a live page with official-source links, a review date, and a
              narrow scope. If a state treats entity types differently, the page should keep those
              rules separate instead of compressing them.
            </p>
          </div>
${renderSearchPanel(
  "Search the directory",
  "Filter the live guides by state, filing label, or the entity type you care about."
)}
          <div class="state-grid">
${renderStateCards(entries, "directory")}
          </div>
          <p class="empty-state" hidden data-guide-empty>No matching live guide yet. Try a state, obligation, or entity type.</p>
        </section>

        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Comparison snapshot</p>
            <h2>Fast comparison of the live states</h2>
            <p>
              This is a directory aid. Use the detailed state page before filing, paying, or
              choosing a compliance service.
            </p>
          </div>
          <div class="table-scroll">
            <table class="summary-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th>Main obligation covered</th>
                  <th>Entity focus</th>
                  <th>Headline due date</th>
                  <th>Main published amount shown</th>
                </tr>
              </thead>
              <tbody>
${renderDirectoryComparisonRows(entries)}
              </tbody>
            </table>
          </div>
        </section>

        <section class="section section--split">
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Publishing rule</p>
              <h2>What counts as a live page</h2>
            </div>
            <ul class="checklist">
              <li>The page starts from an official state source or statute.</li>
              <li>The page shows a clear review date.</li>
              <li>The page avoids inventing a flat late fee when the source does not publish one.</li>
              <li>The page separates entity types when the state treats them differently.</li>
              <li>The page keeps a direct path back to the controlling filing page, portal, or statute.</li>
            </ul>
          </div>
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Daily monitoring</p>
              <h2>How updates are handled</h2>
            </div>
            <ul class="checklist">
              <li>Every live guide targets at least five official state sources.</li>
              <li>Automated scans check official source links every day.</li>
              <li>The scan also flags pages whose manual review date has gone stale.</li>
              <li>Broken links trigger a report instead of silently leaving bad data live.</li>
              <li>Live copy still changes only after a human source review.</li>
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
const uniqueSourceCount = new Set(
  entries.flatMap((entry) => entry.page.sourceLinks.map((link) => link.href))
).size;
const bucketSummaries = coverageBuckets.map((bucket) => ({
  bucket,
  entries: entries.filter((entry) => entry.coverageBucket === bucket.key)
}));
const operationsSnapshot = await loadOperationsSnapshot(entries);
const operationsModel = buildOperationsModel(entries, operationsSnapshot);

await fs.writeFile(
  path.join(ROOT, "index.html"),
  renderHomePage({ entries, latestReviewText, uniqueSourceCount })
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
