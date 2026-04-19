import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

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
const SITE_ORIGIN = "https://finlogichub5.com";
const HOME_ROUTE = "/";
const DIRECTORY_ROUTE = "/states";
const OPERATIONS_ROUTE = "/operations";
const FILING_BASICS_ROUTE = "/filing-basics";
const FILING_HELP_OPTIONS_ROUTE = "/filing-help-options";
const ABOUT_ROUTE = "/about";
const PRIVACY_ROUTE = "/privacy";
const CONTACT_ROUTE = "/contact";
const TERMS_ROUTE = "/terms";
const OPERATIONS_REPORT = path.join(ROOT, "reports", "daily-source-scan.json");
const ASSET_VERSION = await buildAssetVersion();
const STYLE_ASSET_PATH = `/style.css?v=${ASSET_VERSION}`;
const SCRIPT_ASSET_PATH = `/script.js?v=${ASSET_VERSION}`;
const YANDEX_VERIFICATION_TOKEN = "ee96a1c002059a3e";
const BING_VERIFICATION_TOKEN = "15DD1222784CB4D486572468F3F4C785";
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const CONTACT_EMAIL = "feeligfeelig@gmail.com";
const homeLookupGroupLabels = {
  "annual-reports": "Annual report guides",
  "annual-registration-and-tax": "Annual registration and tax guides",
  "recurring-fees-and-statements": "Recurring fee and statement tools"
};
const HOME_FAQ_ITEMS = [
  {
    question: "Is FinLogic Hub an official state website?",
    answer:
      "No. FinLogic Hub is a research and comparison site that links to official state filing pages, fee schedules, and filing portals."
  },
  {
    question: "What does each guide show?",
    answer:
      "Each guide focuses on the filing label, main due date, amount, late-rule starting point, and the official sources used for the summary."
  },
  {
    question: "When should I use State compare?",
    answer:
      "Use State compare when you need to check two or three states side by side before opening the full state guide."
  },
  {
    question: "What if a state notice or portal says something different?",
    answer:
      "Use the official state notice, filing portal, and fee schedule as the final authority if they conflict with this site."
  }
];
const STATES_FAQ_ITEMS = [
  {
    question: "What can I compare on the State compare page?",
    answer:
      "You can compare the filing label, deadline, amount, and late-rule starting point across two or three live state guides."
  },
  {
    question: "Can I file directly from the comparison table?",
    answer:
      "No. The comparison table is a shortcut for narrowing the answer. You should still open the full guide and then use the official state source before filing or paying."
  },
  {
    question: "What if the rule changes by entity type?",
    answer:
      "Open the full guide and match the exact entity type because LLCs, corporations, nonprofits, and foreign entities are often treated differently."
  },
  {
    question: "Where should I start if I do not know the filing label?",
    answer:
      "Start with Filing basics first, then come back to the guide directory once you know whether you need an annual report, annual registration, annual tax, or franchise tax page."
  }
];
const POPULAR_GUIDE_CARDS = [
  {
    href: "/tools/north-carolina/annual-report-deadline/",
    kicker: "High-impression guide",
    label: "North Carolina annual report fee and deadline",
    text: "Use this guide for the April 15 LLC deadline and the current online vs paper fee split."
  },
  {
    href: "/tools/georgia/annual-report-deadline/",
    kicker: "High-impression guide",
    label: "Georgia annual report and registration",
    text: "Open this when you need the April 1 deadline, common online total, and late-penalty rule."
  },
  {
    href: "/tools/oregon/annual-report-deadline/",
    kicker: "High-impression guide",
    label: "Oregon annual report fee and due date",
    text: "Best for anniversary-date renewals and domestic vs foreign fee checks."
  },
  {
    href: "/tools/pennsylvania/annual-report-deadline/",
    kicker: "High-impression guide",
    label: "Pennsylvania annual report fee and deadline",
    text: "Use this guide for the filing window and the standard $7 annual report fee."
  },
  {
    href: "/tools/nevada/annual-fee-calculator/",
    kicker: "High-impression guide",
    label: "Nevada annual fee calculator",
    text: "Start here when you need the annual list and business-license fee estimate."
  }
];

async function buildAssetVersion() {
  const [scriptContent, styleContent] = await Promise.all([
    fs.readFile(path.join(ROOT, "script.js")),
    fs.readFile(path.join(ROOT, "style.css"))
  ]);

  return createHash("sha1")
    .update(scriptContent)
    .update(styleContent)
    .digest("hex")
    .slice(0, 10);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function toSiteUrl(pathname) {
  return new URL(pathname, SITE_ORIGIN).toString();
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function renderStructuredDataScripts(structuredData = []) {
  if (!structuredData.length) {
    return "";
  }

  return `\n${structuredData
    .map(
      (entry) => `    <script type="application/ld+json">${serializeJsonLd(entry)}</script>`
    )
    .join("\n")}`;
}

function buildOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "FinLogic Hub",
    url: SITE_ORIGIN,
    email: CONTACT_EMAIL,
    description:
      "Official-source filing deadline, recurring fee, and compliance guide content for U.S. business entities."
  };
}

function buildWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_ORIGIN,
    name: "FinLogic Hub",
    publisher: {
      "@id": ORGANIZATION_ID
    }
  };
}

function buildFaqStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

function renderSiteHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  robotsContent = null,
  structuredData = []
}) {
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta
      name="description"
      content="${escapeHtml(description)}"
    />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta name="yandex-verification" content="${YANDEX_VERIFICATION_TOKEN}" />
    <meta name="msvalidate.01" content="${BING_VERIFICATION_TOKEN}" />
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
    <link rel="stylesheet" href="${STYLE_ASSET_PATH}" />${renderStructuredDataScripts(
      structuredData
    )}`;
}

function renderHeader() {
  return `      <header class="site-header">
        <a class="brand" href="${HOME_ROUTE}">
          <span class="brand__mark">FH</span>
          <span>
            <strong>FinLogic Hub</strong>
            <small>State filing fee guides</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          <a href="${HOME_ROUTE}">Home</a>
          <a href="${DIRECTORY_ROUTE}">State compare</a>
          <a href="${FILING_BASICS_ROUTE}">Filing basics</a>
          <a href="${FILING_HELP_OPTIONS_ROUTE}">Help options</a>
          <a href="${ABOUT_ROUTE}">About</a>
        </nav>
      </header>`;
}

function renderHomeHeader() {
  return renderHeader();
}

function renderFooter() {
  return `      <footer class="site-footer">
        <nav class="footer-nav" aria-label="Footer">
          <a href="${HOME_ROUTE}">Home</a>
          <a href="${DIRECTORY_ROUTE}">State compare</a>
          <a href="${FILING_BASICS_ROUTE}">Filing basics</a>
          <a href="${FILING_HELP_OPTIONS_ROUTE}">Help options</a>
          <a href="${ABOUT_ROUTE}">About</a>
          <a href="${PRIVACY_ROUTE}">Privacy</a>
          <a href="${CONTACT_ROUTE}">Contact</a>
          <a href="${TERMS_ROUTE}">Terms</a>
        </nav>
        <p>&copy; 2026 FinLogic Hub. For planning only. Confirm on the official state site before you file.</p>
      </footer>`;
}

function buildHomeStructuredData() {
  return [
    buildOrganizationStructuredData(),
    buildWebSiteStructuredData(),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: toSiteUrl(HOME_ROUTE),
      name: "State Filing Deadlines, Fees, and Annual Report Guides | FinLogic Hub",
      description:
        "Check annual report deadlines, state filing fees, franchise tax due dates, and official filing links by state.",
      isPartOf: {
        "@id": WEBSITE_ID
      },
      about: {
        "@id": ORGANIZATION_ID
      }
    },
    buildFaqStructuredData(HOME_FAQ_ITEMS)
  ];
}

function buildStatesStructuredData() {
  return [
    buildOrganizationStructuredData(),
    buildWebSiteStructuredData(),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      url: toSiteUrl(DIRECTORY_ROUTE),
      name: "Compare State Filing Deadlines and Fees | FinLogic Hub",
      description:
        "Compare annual report deadlines, filing fees, late rules, and recurring state filing requirements across live guides.",
      isPartOf: {
        "@id": WEBSITE_ID
      },
      about: {
        "@id": ORGANIZATION_ID
      }
    },
    buildFaqStructuredData(STATES_FAQ_ITEMS)
  ];
}

function renderFaqCards(items) {
  return items
    .map(
      (item) => `            <article class="mini-card">
              <span>Question</span>
              <strong>${escapeHtml(item.question)}</strong>
              <p>${escapeHtml(item.answer)}</p>
            </article>`
    )
    .join("\n");
}

function renderFaqSection({ eyebrow, title, intro = "", items }) {
  return `        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">${escapeHtml(eyebrow)}</p>
            <h2>${escapeHtml(title)}</h2>${intro ? `\n            <p>${escapeHtml(intro)}</p>` : ""}
          </div>
          <div class="mini-grid">
${renderFaqCards(items)}
          </div>
        </section>`;
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

function renderComparisonOption(entry) {
  const metrics = entry.page.metrics ?? [];
  const metricOne = metrics[0] ?? { label: "", text: "" };
  const metricTwo = metrics[1] ?? { label: "", text: "" };
  const metricThree = metrics[2] ?? { label: "", text: "" };
  const sourceAuthority = entry.page.sourceBadge.replace(/^Source:\s*/u, "");

  return `                  <option
                    value="${escapeHtml(entry.route)}"
                    data-state="${escapeHtml(entry.state)}"
                    data-guide-label="${escapeHtml(entry.guideLabel)}"
                    data-guide-type="${escapeHtml(entry.guideType)}"
                    data-use-case="${escapeHtml(entry.homeComparison?.focus ?? entry.directoryComparison.entityFocus)}"
                    data-obligation="${escapeHtml(entry.directoryComparison.obligation)}"
                    data-entity-focus="${escapeHtml(entry.directoryComparison.entityFocus)}"
                    data-summary="${escapeHtml(entry.page.heroSubtitle)}"
                    data-deadline="${escapeHtml(entry.directoryComparison.deadline)}"
                    data-amount="${escapeHtml(entry.directoryComparison.amount)}"
                    data-late-rule="${escapeHtml(entry.homeComparison?.lateRule ?? "See guide for late rule")}"
                    data-review-date="${escapeHtml(entry.page.lastReviewed)}"
                    data-source-count="${entry.page.sourceLinks.length}"
                    data-source-authority="${escapeHtml(sourceAuthority)}"
                    data-metric-one-label="${escapeHtml(metricOne.label)}"
                    data-metric-one-text="${escapeHtml(metricOne.text)}"
                    data-metric-two-label="${escapeHtml(metricTwo.label)}"
                    data-metric-two-text="${escapeHtml(metricTwo.text)}"
                    data-metric-three-label="${escapeHtml(metricThree.label)}"
                    data-metric-three-text="${escapeHtml(metricThree.text)}"
                  >${escapeHtml(entry.state)}</option>`;
}

function renderComparisonOptions(entries) {
  return [...entries]
    .sort((left, right) => left.state.localeCompare(right.state))
    .map((entry) => renderComparisonOption(entry))
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
    fingerprintStatus: "baseline-established",
    staleReviewThresholdDays: 45,
    pagesScanned: entries.length,
    sourceLinksChecked: new Set(entries.flatMap((entry) => entry.page.sourceLinks.map((link) => link.href))).size,
    linkHealth: {
      ok: 0,
      blocked: 0,
      timedOut: 0,
      transportIssues: 0,
      brokenOrError: 0,
      changed: 0
    },
    stalePages: [],
    thinCoveragePages: [],
    pages: entries.map((entry) => ({
      state: entry.state,
      route: entry.route,
      lastReviewed: entry.page.lastReviewed,
      reviewAgeDays: 0,
      sourceCount: entry.page.sourceLinks.length,
      changedSourceCount: 0
    })),
    changedStates: [],
    changedLinks: [],
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

  if (
    row.blockedCount > 0 ||
    row.changedCount > 0 ||
    row.reviewAgeDays >= Math.max(staleReviewThresholdDays - 10, 0)
  ) {
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

  if (row.changedCount > 0) parts.push(`${row.changedCount} changed`);
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
      { changedCount: 0, brokenCount: 0, blockedCount: 0, timedOutCount: 0, transportCount: 0 }
    ])
  );
  const issueSets = [
    { key: "changedCount", label: "Source content changed", items: snapshot.changedLinks ?? [] },
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
          issueSet.label === "Source content changed"
            ? 0
            : issueSet.label === "Broken or error"
              ? 1
            : issueSet.label === "Timed out"
              ? 2
            : issueSet.label === "Transport issue"
              ? 3
              : 4
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
        changedCount: 0,
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
      text: `${snapshot.sourceLinksChecked} checked | ${snapshot.linkHealth.brokenOrError} broken/error | ${snapshot.linkHealth.blocked} blocked | ${snapshot.linkHealth.changed ?? 0} changed`
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
              <p>The latest scan is not surfacing stale reviews, broken links, source-content changes, timeouts, or transport issues on any live state page.</p>
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
      label: "Open one guide",
      text: "Use the lookup when you already know the state and likely filing label."
    },
    {
      href: DIRECTORY_ROUTE,
      kicker: "I need to compare",
      label: "Compare states",
      text: "Use the directory and comparison tool when you are checking more than one state."
    },
    {
      href: FILING_BASICS_ROUTE,
      kicker: "I am not sure yet",
      label: "Learn the filing label",
      text: "Start there if you need to tell an annual report from an annual tax or franchise tax page."
    },
    {
      href: FILING_HELP_OPTIONS_ROUTE,
      kicker: "I may need help",
      label: "Review help options",
      text: "Use this page if you are deciding between DIY filing, a service, or professional help."
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

function renderPopularGuideCards() {
  return POPULAR_GUIDE_CARDS.map(
    (card) => `            <a class="action-card" href="${escapeHtml(card.href)}">
              <span class="action-label">${escapeHtml(card.kicker)}</span>
              <strong>${escapeHtml(card.label)}</strong>
              <span>${escapeHtml(card.text)}</span>
            </a>`
  ).join("\n");
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
  canonical: toSiteUrl(OPERATIONS_ROUTE),
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
              <a href="${HOME_ROUTE}">Home</a>
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
    <script src="${SCRIPT_ASSET_PATH}"></script>
  </body>
</html>
`;
}

function renderHomePage({
  entries,
  latestReviewText,
  uniqueSourceCount,
  bucketSummaries
}) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${renderSiteHead({
  title: "State Filing Deadlines, Fees, and Annual Report Guides | FinLogic Hub",
  description:
    "Check annual report deadlines, state filing fees, franchise tax due dates, and official filing links by state.",
  canonical: toSiteUrl(HOME_ROUTE),
  ogTitle: "State Filing Deadlines, Fees, and Annual Report Guides | FinLogic Hub",
  ogDescription:
    "Check state filing deadlines, fees, and official filing links faster before you open the state portal.",
  structuredData: buildHomeStructuredData()
})}
  </head>
  <body>
    <div class="site-shell">
${renderHomeHeader()}

      <main class="page">
        <section class="hero hero--home">
          <div class="hero__copy surface">
            <p class="eyebrow">Official-source filing guides</p>
            <h1>Check state filing deadlines and fees faster.</h1>
            <p class="hero__subtitle">
              Start with a reviewed guide, match the filing label and entity type, then confirm the final rule on the linked official state source before you file or pay.
            </p>
            <div class="notice-bar">
              <strong>Not official:</strong>
              <span>Use the linked state filing page or payment portal as the final authority.</span>
            </div>
            <div class="stat-grid">
              <div class="stat-card">
                <strong>${entries.length} live state guides</strong>
                <span>Annual reports, recurring fees, statements, and franchise-tax filings.</span>
              </div>
              <div class="stat-card">
                <strong>Latest manual review: ${latestReviewText}</strong>
                <span>Every live guide shows its review date on the page.</span>
              </div>
              <div class="stat-card">
                <strong>${uniqueSourceCount} official source links monitored</strong>
                <span>Daily scans flag broken links and pages that may need a refresh.</span>
              </div>
            </div>
          </div>

          <aside class="hero__panel surface">
            <h2>Find a guide fast</h2>
            <p>Select the state guide that matches your filing requirement.</p>
            <form class="lookup-form" data-state-lookup>
              <label class="field" for="stateGuideSelect">
                <span>Select a state guide</span>
                <select id="stateGuideSelect" name="state-guide">
                  <option value="">Choose a guide</option>
${renderLookupOptions(bucketSummaries, homeLookupGroupLabels)}
                </select>
              </label>
              <button class="button button--primary" type="submit">Open guide</button>
            </form>
            <p class="panel-note">Need a side-by-side check instead? Use <a class="inline-link" href="${DIRECTORY_ROUTE}">State compare</a>.</p>
          </aside>
        </section>

        <section class="section section--split">
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Start here</p>
              <h2>Choose the shortest path</h2>
              <p>Use the route that gets you to the right answer fastest.</p>
            </div>
            <div class="action-list action-list--triple">
${renderStartPathCards()}
            </div>
          </div>
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Quick questions</p>
              <h2>What most visitors need to know first</h2>
              <p>These answers keep the page useful without adding more clutter.</p>
            </div>
            <div class="mini-grid">
${renderFaqCards(HOME_FAQ_ITEMS)}
            </div>
          </div>
        </section>

        <section class="section">
          <div class="surface">
            <div class="section__head">
              <p class="eyebrow">Popular state guides</p>
              <h2>Open the pages most visitors need first</h2>
              <p>These are the state guides people most often need when they are checking deadlines, fees, or recurring filing rules.</p>
            </div>
            <div class="action-list action-list--triple">
${renderPopularGuideCards()}
            </div>
          </div>
        </section>
      </main>
    </div>
    <script src="${SCRIPT_ASSET_PATH}"></script>
  </body>
</html>
`;
}

function renderStatesPage({ entries, latestReviewText, bucketSummaries }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${renderSiteHead({
  title: "Compare State Filing Deadlines and Fees | FinLogic Hub",
  description:
    "Compare annual report deadlines, filing fees, late rules, and recurring state filing requirements across live guides.",
  canonical: toSiteUrl(DIRECTORY_ROUTE),
  ogTitle: "Compare State Filing Deadlines and Fees | FinLogic Hub",
  ogDescription:
    "Compare deadlines, fees, and late rules across live state filing guides before you open the full page.",
  structuredData: buildStatesStructuredData()
})}
  </head>
  <body>
    <div class="site-shell">
${renderHeader()}

      <main class="page" data-guide-compare-root>
        <section class="hero hero--page">
          <div class="hero__copy surface">
            <div class="breadcrumbs">
              <a href="${HOME_ROUTE}">Home</a>
              <span>/</span>
              <span>State compare</span>
            </div>
            <p class="eyebrow">State compare</p>
            <h1>Compare state filing rules</h1>
            <p class="hero__subtitle">
              Choose 2 or 3 states to compare the filing label, deadline, amount, and late-rule starting point before you open the full guide.
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
            <p class="panel-note">Need help with filing labels first? Start with <a class="inline-link" href="${FILING_BASICS_ROUTE}">Filing basics</a>.</p>
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
            <p>Open the full guide once you know which state and filing label you need.</p>
          </div>
          <div class="state-grid state-grid--directory">
${renderStateCards(entries, "directory")}
          </div>
        </section>

${renderFaqSection({
  eyebrow: "Quick questions",
  title: "Use the comparison table the right way",
  intro: "The table is a shortcut, not the filing step itself.",
  items: STATES_FAQ_ITEMS
})}
      </main>

${renderFooter()}
    </div>
    <script src="${SCRIPT_ASSET_PATH}"></script>
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
const bucketSummaries = buildBucketSummaries(entries);
const operationsSnapshot = await loadOperationsSnapshot(entries);
const operationsModel = buildOperationsModel(entries, operationsSnapshot);

await fs.writeFile(
  path.join(ROOT, "index.html"),
  renderHomePage({
    entries,
    latestReviewText,
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
