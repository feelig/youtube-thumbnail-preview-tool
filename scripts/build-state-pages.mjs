import fs from "node:fs/promises";
import path from "node:path";

import {
  guideDecisionToolByRoute,
  guideEvidenceByRoute
} from "../data/state-guide-enhancements.mjs";
import { liveStatePages } from "../data/live-state-pages.mjs";
import { stateDirectory } from "../data/state-directory.mjs";
import { structuredStateContentByFilePath } from "../data/structured-state-content.mjs";
import {
  formatLongDate,
  getPageRoute,
  getReviewStatus,
  parseReviewDate,
  pluralize
} from "./lib/state-page-utils.mjs";

const ROOT = process.cwd();
const SITE_ORIGIN = "https://finlogichub5.com";
const GENERATED_AT = new Date();
const directoryByRoute = new Map(stateDirectory.map((entry) => [entry.route, entry]));
const decisionToolByRoute = new Map(Object.entries(guideDecisionToolByRoute));
const evidenceByRoute = new Map(Object.entries(guideEvidenceByRoute));
const structuredBodyByFilePath = new Map(Object.entries(structuredStateContentByFilePath));

function validateStructuredBodyCoverage() {
  const liveFilePaths = new Set(liveStatePages.map((page) => page.filePath));
  const missingStructuredBodies = liveStatePages
    .filter((page) => !structuredBodyByFilePath.has(page.filePath))
    .map((page) => page.filePath);
  const orphanStructuredBodies = [...structuredBodyByFilePath.keys()].filter(
    (filePath) => !liveFilePaths.has(filePath)
  );

  if (missingStructuredBodies.length > 0 || orphanStructuredBodies.length > 0) {
    const parts = [];

    if (missingStructuredBodies.length > 0) {
      parts.push(`missing structured bodies for: ${missingStructuredBodies.join(", ")}`);
    }

    if (orphanStructuredBodies.length > 0) {
      parts.push(`orphan structured bodies for: ${orphanStructuredBodies.join(", ")}`);
    }

    throw new Error(`Structured body coverage is out of sync: ${parts.join(" | ")}`);
  }
}

function validateGuideEnhancements() {
  const liveRoutes = new Set(liveStatePages.map((page) => getPageRoute(page)));
  const missingEvidence = [...liveRoutes].filter((route) => !evidenceByRoute.has(route));
  const missingDecisionTools = [...liveRoutes].filter((route) => !decisionToolByRoute.has(route));
  const orphanEvidence = [...evidenceByRoute.keys()].filter((route) => !liveRoutes.has(route));
  const orphanDecisionTools = [...decisionToolByRoute.keys()].filter((route) => !liveRoutes.has(route));
  const invalidReferences = [];

  function validateIndexes(route, label, indexes, sourceCount) {
    const invalidIndexes = [...new Set(indexes)].filter(
      (index) => !Number.isInteger(index) || index < 1 || index > sourceCount
    );

    if (invalidIndexes.length > 0) {
      invalidReferences.push(
        `${route} ${label} has invalid source indexes: ${invalidIndexes.join(", ")}`
      );
    }
  }

  for (const page of liveStatePages) {
    const route = getPageRoute(page);
    const sourceCount = page.sourceLinks.length;
    const evidenceConfig = evidenceByRoute.get(route);
    const decisionTool = decisionToolByRoute.get(route);

    if (evidenceConfig) {
      for (const [field, indexes] of Object.entries(evidenceConfig)) {
        validateIndexes(route, `evidence.${field}`, indexes, sourceCount);
      }
    }

    if (decisionTool) {
      for (const option of decisionTool.cases) {
        validateIndexes(route, `decision.${option.value}.sourceIndexes`, option.sourceIndexes, sourceCount);
        validateIndexes(
          route,
          `decision.${option.value}.lateSourceIndexes`,
          option.lateSourceIndexes,
          sourceCount
        );
        validateIndexes(
          route,
          `decision.${option.value}.confirmSourceIndexes`,
          option.confirmSourceIndexes,
          sourceCount
        );
      }
    }
  }

  if (
    missingEvidence.length > 0 ||
    missingDecisionTools.length > 0 ||
    orphanEvidence.length > 0 ||
    orphanDecisionTools.length > 0 ||
    invalidReferences.length > 0
  ) {
    const parts = [];

    if (missingEvidence.length > 0) {
      parts.push(`missing evidence config for: ${missingEvidence.join(", ")}`);
    }

    if (missingDecisionTools.length > 0) {
      parts.push(`missing decision tool config for: ${missingDecisionTools.join(", ")}`);
    }

    if (orphanEvidence.length > 0) {
      parts.push(`orphan evidence config for: ${orphanEvidence.join(", ")}`);
    }

    if (orphanDecisionTools.length > 0) {
      parts.push(`orphan decision tool config for: ${orphanDecisionTools.join(", ")}`);
    }

    if (invalidReferences.length > 0) {
      parts.push(invalidReferences.join(" | "));
    }

    throw new Error(`Guide enhancement coverage is out of sync: ${parts.join(" | ")}`);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderBreadcrumbs(items) {
  return items
    .map((item) => {
      if (item.href) {
        return `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`;
      }

      return `<span>${escapeHtml(item.label)}</span>`;
    })
    .join('\n              <span>/</span>\n              ');
}

function renderMetrics(metrics) {
  return metrics
    .map(
      (metric) => `              <div class="metric-card">
                <strong>${escapeHtml(metric.label)}</strong>
                <span>${escapeHtml(metric.text)}</span>
              </div>`
    )
    .join("\n");
}

function renderSourceLinks(links) {
  return links
    .map(
      (link, index) => `            <li class="source-item" id="source-${index + 1}">
              <a href="${escapeHtml(link.href)}">
                <span class="source-kicker">Official source ${index + 1}</span>
                <strong>${escapeHtml(link.label)}</strong>
              </a>
            </li>`
    )
    .join("\n");
}

function normalizeParagraphs(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function renderParagraphs(paragraphs, className = "body-copy") {
  return normalizeParagraphs(paragraphs)
    .map((paragraph) => `          <p class="${escapeHtml(className)}">${escapeHtml(paragraph)}</p>`)
    .join("\n");
}

function renderSectionHead(eyebrow, title) {
  return `          <div class="section__head">
            <p class="eyebrow">${escapeHtml(eyebrow)}</p>
            <h2>${escapeHtml(title)}</h2>
          </div>`;
}

function renderStructuredTableSection(section) {
  const paragraphs = renderParagraphs(section.paragraphs);
  const note = section.note
    ? `\n          <p class="table-note">${escapeHtml(section.note)}</p>`
    : "";

  return `        <section class="section surface">
${renderSectionHead(section.eyebrow, section.title)}
${paragraphs ? `${paragraphs}\n` : ""}          <div class="table-scroll">
            <table class="summary-table">
              <thead>
                <tr>
${section.headers
  .map((header) => `                  <th>${escapeHtml(header)}</th>`)
  .join("\n")}
                </tr>
              </thead>
              <tbody>
${section.rows
  .map(
    (row) => `                <tr>
${row.map((cell) => `                  <td>${escapeHtml(cell)}</td>`).join("\n")}
                </tr>`
  )
  .join("\n")}
              </tbody>
            </table>
          </div>${note}
        </section>`;
}

function renderStructuredDetailCardsSection(section) {
  const paragraphs = renderParagraphs(section.paragraphs);

  return `        <section class="section">
${renderSectionHead(section.eyebrow, section.title)}
${paragraphs ? `${paragraphs}\n` : ""}          <div class="detail-grid">
${section.cards
  .map(
    (card) => `            <article class="detail-card">
              <h3>${escapeHtml(card.title)}</h3>
              <p>${escapeHtml(card.text)}</p>
            </article>`
  )
  .join("\n")}
          </div>
        </section>`;
}

function renderStructuredRawHtmlSection(section) {
  return section.html.trim();
}

function renderStructuredBody(sections) {
  return sections
    .map((section) => {
      if (section.type === "table") {
        return renderStructuredTableSection(section);
      }

      if (section.type === "detailCards") {
        return renderStructuredDetailCardsSection(section);
      }

      if (section.type === "rawHtml") {
        return renderStructuredRawHtmlSection(section);
      }

      throw new Error(`Unsupported structured section type: ${section.type}`);
    })
    .join("\n\n");
}

function renderSectionNav() {
  const links = [
    { href: "#quick-answer", label: "Quick answer" },
    { href: "#evidence-chain", label: "Evidence chain" },
    { href: "#decision-tool", label: "Decision tool" },
    { href: "#decision-checks", label: "Decision checks" },
    { href: "#next-step", label: "Next step" },
    { href: "#details", label: "Detailed rules" },
    { href: "#sources", label: "Official sources" }
  ];

  return `        <nav class="section-nav surface" aria-label="Page sections">
          <strong>Jump to</strong>
          <div class="section-nav__links">
${links
  .map(
    (link) => `            <a class="section-link" href="${escapeHtml(link.href)}">${escapeHtml(
      link.label
    )}</a>`
  )
  .join("\n")}
          </div>
        </nav>`;
}

function formatReviewDate(value) {
  return parseReviewDate(value).toISOString().slice(0, 10);
}

function getBadgeToneClass(tone) {
  return tone ? ` badge--${tone}` : "";
}

function renderProofChips(page, sourceIndexes) {
  const uniqueIndexes = [...new Set(sourceIndexes)];

  return `          <div class="proof-chip-row">
${uniqueIndexes
  .map((index) => {
    const source = page.sourceLinks[index - 1];
    return `            <a class="proof-chip" href="#source-${index}" aria-label="${escapeHtml(
      `Open official source ${index}: ${source.label}`
    )}">Source ${index}</a>`;
  })
  .join("\n")}
          </div>`;
}

function getVerificationTrigger(entry) {
  const obligation = entry.directoryComparison.obligation.toLowerCase();
  const deadline = entry.directoryComparison.deadline.toLowerCase();

  if (obligation.includes("franchise tax")) {
    return "Confirm the report year, tax status, and whether a PIR or OIR is required on the official tax account.";
  }

  if (
    obligation.includes("statement") ||
    obligation.includes("periodic report") ||
    deadline.includes("anniversary") ||
    deadline.includes("calendar month") ||
    deadline.includes("month")
  ) {
    return "Check the exact formation, authority, anniversary, or report month on the official state record before paying or filing.";
  }

  if (deadline.includes("fiscal")) {
    return "Verify the entity's fiscal year end on the official record before using the due date shown here.";
  }

  if (obligation.includes("annual tax")) {
    return "Confirm whether the entity owes an annual tax, an annual report, or both before paying a private notice.";
  }

  return "Use the official state record to confirm the exact due trigger before filing or paying.";
}

function getCommonMistake(entry) {
  const obligation = entry.directoryComparison.obligation.toLowerCase();

  if (obligation.includes("franchise tax")) {
    return "Do not stop after the tax answer. The related information report can still control whether the filing is complete.";
  }

  if (obligation.includes("annual report or annual tax")) {
    return "Do not flatten corporations, foreign entities, and LLCs into one rule when the state treats them differently.";
  }

  if (obligation.includes("statement")) {
    return "Do not treat this like a standard annual report if the state uses a filing month or a separate entity-specific cycle.";
  }

  if (obligation.includes("annual list") || obligation.includes("business license")) {
    return "Do not forget the second recurring state charge. Some pages combine more than one state fee.";
  }

  return "Do not rely on a flat fee or deadline if the state separates entity type, filing method, or late-status consequences.";
}

function renderDecisionCheckSection(entry) {
  const focus = entry.homeComparison?.focus ?? entry.directoryComparison.entityFocus;
  const lateRule = entry.homeComparison?.lateRule ??
    "If the state record or official notice conflicts with this page, follow the state record.";

  const checks = [
    {
      label: "Use this page if",
      title: focus,
      text: "Start here only if that matches the exact state record you are looking at."
    },
    {
      label: "Verify on the record",
      title: "Confirm the trigger before you pay",
      text: getVerificationTrigger(entry)
    },
    {
      label: "Most common mistake",
      title: "Do not file on autopilot",
      text: getCommonMistake(entry)
    },
    {
      label: "If you are already late",
      title: "Use the late-state rule",
      text: lateRule
    }
  ];

  return `        <section class="section surface">
          <div id="decision-checks"></div>
          <div class="section__head">
            <p class="eyebrow">Decision checks</p>
            <h2>Before you rely on the answer above</h2>
          </div>
          <div class="mini-grid decision-grid">
${checks
  .map(
    (check) => `            <article class="mini-card">
              <span>${escapeHtml(check.label)}</span>
              <strong>${escapeHtml(check.title)}</strong>
              <p>${escapeHtml(check.text)}</p>
            </article>`
  )
  .join("\n")}
          </div>
        </section>`;
}

function renderActionCards(cards) {
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

function renderEvidenceChainSection(page, entry, evidenceConfig) {
  const claims = [
    {
      key: "filingLabel",
      label: "Filing label",
      answer: entry.directoryComparison.obligation,
      note: "This uses the state's actual recurring filing label instead of flattening everything into a generic annual-report name."
    },
    {
      key: "whoShouldUse",
      label: "Who should use this page",
      answer: entry.directoryComparison.entityFocus,
      note: "The scope comes from the entity groups named in the official sources, not just the state name."
    },
    {
      key: "headlineDueDate",
      label: "Headline due date",
      answer: entry.directoryComparison.deadline,
      note: "This is the fast answer, but the official record still controls if the state uses anniversary, formation-month, or report-month triggers."
    },
    {
      key: "mainAmountShown",
      label: "Main amount shown",
      answer: entry.directoryComparison.amount,
      note: "This stays tied to the published state fee, threshold, or state-level amount rather than a private service quote."
    }
  ];

  if (entry.homeComparison?.lateRule) {
    claims.push({
      key: "ifAlreadyLate",
      label: "If already late",
      answer: entry.homeComparison.lateRule,
      note: "Late-state consequences often differ from the on-time amount, so this answer is anchored separately."
    });
  }

  return `        <section class="section surface" data-evidence-chain>
          <div id="evidence-chain"></div>
          <div class="section__head">
            <p class="eyebrow">Evidence chain</p>
            <h2>Official proof for the headline answers</h2>
            <p>
              Each quick-answer field below points to the exact official sources that support it, so
              the customer-facing summary can still be audited back to the state record.
            </p>
          </div>
          <div class="evidence-grid">
${claims
  .map((claim) => {
    const sourceIndexes = evidenceConfig[claim.key];
    return `            <article class="evidence-card">
              <span class="evidence-label">${escapeHtml(claim.label)}</span>
              <strong>${escapeHtml(claim.answer)}</strong>
              <p>${escapeHtml(claim.note)}</p>
${renderProofChips(page, sourceIndexes)}
            </article>`;
  })
  .join("\n")}
          </div>
        </section>`;
}

function renderQuickAnswers(entry) {
  const answerCards = [
    {
      label: "Filing label",
      text: entry.directoryComparison.obligation
    },
    {
      label: "Who should use this page",
      text: entry.directoryComparison.entityFocus
    },
    {
      label: "Headline due date",
      text: entry.directoryComparison.deadline
    },
    {
      label: "Main amount shown",
      text: entry.directoryComparison.amount
    }
  ];

  if (entry.homeComparison?.lateRule) {
    answerCards.push({
      label: "If already late",
      text: entry.homeComparison.lateRule
    });
  }

  return `        <section class="section surface">
          <div id="quick-answer"></div>
          <div class="section__head">
            <p class="eyebrow">Quick answer</p>
            <h2>What most readers need first</h2>
          </div>
          <div class="insight-grid">
${answerCards
  .map(
    (card) => `            <article class="insight-card">
              <span class="insight-label">${escapeHtml(card.label)}</span>
              <strong>${escapeHtml(card.text)}</strong>
            </article>`
  )
  .join("\n")}
          </div>
        </section>`;
}

function getDecisionRuleText(option, status) {
  if (status.value === "late") {
    return option.lateRule;
  }

  if (status.value === "confirm") {
    return option.confirmRule;
  }

  return option.normalRule;
}

function getDecisionSourceIndexes(option, status) {
  if (status.value === "late") {
    return option.lateSourceIndexes;
  }

  if (status.value === "confirm") {
    return option.confirmSourceIndexes;
  }

  return option.sourceIndexes;
}

function renderDecisionResultCard(page, option, status, isDefault) {
  const bodyText = getDecisionRuleText(option, status);
  const sourceIndexes = getDecisionSourceIndexes(option, status);
  const hiddenAttribute = isDefault ? "" : ' hidden';

  return `            <article class="decision-result-card"${hiddenAttribute} data-decision-card data-case="${escapeHtml(
    option.value
  )}" data-status="${escapeHtml(status.value)}">
              <span class="decision-result-label">${escapeHtml(status.label)}</span>
              <h3>${escapeHtml(option.label)}</h3>
              <p>${escapeHtml(bodyText)}</p>
              <div class="decision-result-grid">
                <div class="decision-result-stat">
                  <span>Due date</span>
                  <strong>${escapeHtml(option.deadline)}</strong>
                </div>
                <div class="decision-result-stat">
                  <span>Main amount</span>
                  <strong>${escapeHtml(option.amount)}</strong>
                </div>
              </div>
              <p class="decision-result-note">
                <strong>Next official step:</strong> ${escapeHtml(option.nextAction)}
              </p>
${renderProofChips(page, sourceIndexes)}
            </article>`;
}

function renderDecisionToolSection(page, decisionTool) {
  const [defaultCase] = decisionTool.cases;
  const [defaultStatus] = decisionTool.statuses;

  return `        <section class="section surface" data-decision-tool-root>
          <div id="decision-tool"></div>
          <div class="section__head">
            <p class="eyebrow">Decision tool</p>
            <h2>Narrow the rule to your situation</h2>
            <p>${escapeHtml(decisionTool.intro)}</p>
          </div>
          <div class="decision-tool-layout">
            <div class="decision-tool-controls">
              <label class="field" for="decision-case-${escapeHtml(page.state.toLowerCase().replaceAll(/\s+/g, "-"))}">
                <span>${escapeHtml(decisionTool.caseLabel)}</span>
                <select id="decision-case-${escapeHtml(
                  page.state.toLowerCase().replaceAll(/\s+/g, "-")
                )}" data-decision-case>
${decisionTool.cases
  .map(
    (option) => `                  <option value="${escapeHtml(option.value)}">${escapeHtml(
      option.label
    )}</option>`
  )
  .join("\n")}
                </select>
              </label>
              <label class="field" for="decision-status-${escapeHtml(page.state.toLowerCase().replaceAll(/\s+/g, "-"))}">
                <span>${escapeHtml(decisionTool.statusLabel)}</span>
                <select id="decision-status-${escapeHtml(
                  page.state.toLowerCase().replaceAll(/\s+/g, "-")
                )}" data-decision-status>
${decisionTool.statuses
  .map(
    (status) => `                  <option value="${escapeHtml(status.value)}">${escapeHtml(
      status.label
    )}</option>`
  )
  .join("\n")}
                </select>
              </label>
              <p class="decision-tool-note">
                Use this to trim the page to the rule set that matters first, then finish on the
                official sources linked on the card.
              </p>
            </div>
            <div class="decision-tool-results" data-decision-tool aria-live="polite">
${decisionTool.cases
  .flatMap((option, optionIndex) =>
    decisionTool.statuses.map((status, statusIndex) =>
      renderDecisionResultCard(
        page,
        option,
        status,
        optionIndex === 0 && statusIndex === 0 && option.value === defaultCase.value && status.value === defaultStatus.value
      )
    )
  )
  .join("\n")}
            </div>
          </div>
        </section>`;
}

function renderCustomerActionSection(page, entry) {
  const nextStepCards = [
    {
      href: page.sourceLinks[0].href,
      kicker: "Official filing path",
      label: page.sourceLinks[0].label,
      text: "Open the controlling state page or filing portal before filing or paying."
    },
    {
      href: "/states.html",
      kicker: "Compare live guides",
      label: "Compare another state or filing label",
      text: "Use the directory if you are checking another state, entity type, or filing label."
    },
    {
      href: "/filing-help-options.html",
      kicker: "Help options",
      label: "Review self-serve and assisted filing paths",
      text: "Compare the official do-it-yourself path with help options before paying a third-party service."
    }
  ];
  const lateRule = entry.homeComparison?.lateRule ??
    "Check the official portal, state record, or official notice for the current late consequence.";

  return `        <section class="section section--split">
          <div id="next-step"></div>
          <div class="surface task-panel">
            <div class="section__head">
              <p class="eyebrow">Customer task</p>
              <h2>What to do before you file or pay</h2>
            </div>
            <div class="flow-grid flow-grid--compact">
              <article class="flow-card">
                <span class="flow-step">Check scope</span>
                <h3>Match the entity first</h3>
                <p>This page is built for ${escapeHtml(entry.directoryComparison.entityFocus)}.</p>
              </article>
              <article class="flow-card">
                <span class="flow-step">Plan the filing</span>
                <h3>Use the headline answer</h3>
                <p>Start with ${escapeHtml(entry.directoryComparison.deadline)} and ${escapeHtml(entry.directoryComparison.amount)}.</p>
              </article>
              <article class="flow-card">
                <span class="flow-step">If already late</span>
                <h3>Use the late-state rule</h3>
                <p>${escapeHtml(lateRule)}</p>
              </article>
            </div>
            <p class="section-note">
              After you file, keep the official receipt, confirmation email, or payment record from
              the state portal. If the state record gives a record-specific date, amount, or status
              that conflicts with this page, follow the official state source.
            </p>
          </div>
          <div class="surface task-panel">
            <div class="section__head">
              <p class="eyebrow">Next step</p>
              <h2>Choose the path that fits your situation</h2>
            </div>
            <div class="action-list">
${renderActionCards(nextStepCards)}
            </div>
            <p class="section-note">
              Supporting official sources stay listed below. If a private notice, service quote, or
              state record conflicts with this summary, follow the official state source.
            </p>
          </div>
        </section>`;
}

function renderDetailIntro(entry) {
  return `        <section class="section surface">
          <div id="details"></div>
          <div class="section__head">
            <p class="eyebrow">Detailed rules</p>
            <h2>Read the official-detail layer only if you still need it</h2>
            <p>
              The sections below break down the specific ${escapeHtml(
                entry.directoryComparison.obligation.toLowerCase()
              )} rules, entity splits, and official notes that sit behind the quick answer.
            </p>
          </div>
        </section>`;
}

function renderTrustSnapshot(page, entry) {
  const reviewStatus = getReviewStatus(parseReviewDate(page.lastReviewed), GENERATED_AT);

  return `        <section class="section surface">
          <div class="section__head">
            <p class="eyebrow">Trust snapshot</p>
            <h2>Why this page is safer to rely on</h2>
          </div>
          <div class="trust-grid">
            <article class="trust-card">
              <span>Review status</span>
              <strong>${escapeHtml(reviewStatus.label)}</strong>
              <p>${escapeHtml(reviewStatus.detail)}</p>
            </article>
            <article class="trust-card">
              <span>Last reviewed</span>
              <strong>${escapeHtml(page.lastReviewed)}</strong>
              <p>Target refresh by ${escapeHtml(formatLongDate(reviewStatus.nextReviewDate))}.</p>
            </article>
            <article class="trust-card">
              <span>Official sources</span>
              <strong>${page.sourceLinks.length} linked ${pluralize(page.sourceLinks.length, "source")}</strong>
              <p>The answer points back to the controlling state pages shown below.</p>
            </article>
            <article class="trust-card">
              <span>Monitoring</span>
              <strong>Daily source scan monitored</strong>
              <p>Release checks look for stale review dates and broken official links before publishing.</p>
            </article>
          </div>
        </section>`;
}

function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function renderStructuredData(page) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? new URL(item.href, SITE_ORIGIN).toString() : page.canonicalUrl
    }))
  };

  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.heroTitle,
    description: page.metaDescription,
    url: page.canonicalUrl,
    dateModified: formatReviewDate(page.lastReviewed),
    about: {
      "@type": "AdministrativeArea",
      name: page.state
    },
    isPartOf: {
      "@type": "WebSite",
      name: "FinLogic Hub",
      url: SITE_ORIGIN
    }
  };

  return `\n    <script type="application/ld+json">${serializeJsonLd(breadcrumbData)}</script>\n    <script type="application/ld+json">${serializeJsonLd(webPageData)}</script>`;
}

function renderPage(page) {
  const scriptTag = page.scriptSrc ? `\n    <script src="${escapeHtml(page.scriptSrc)}"></script>` : "";
  const summaryNote = page.summaryNoteHtml ? `\n${page.summaryNoteHtml}` : "";
  const route = getPageRoute(page);
  const directoryEntry = directoryByRoute.get(route);
  const evidenceConfig = evidenceByRoute.get(route);
  const decisionTool = decisionToolByRoute.get(route);
  const structuredSections = structuredBodyByFilePath.get(page.filePath);
  const pageBody = renderStructuredBody(structuredSections);
  const reviewStatus = getReviewStatus(parseReviewDate(page.lastReviewed), GENERATED_AT);
  const sectionNav = directoryEntry ? `\n${renderSectionNav()}\n` : "\n";
  const quickAnswerSection = directoryEntry ? `\n${renderQuickAnswers(directoryEntry)}\n` : "\n";
  const evidenceChainSection =
    directoryEntry && evidenceConfig ? `\n${renderEvidenceChainSection(page, directoryEntry, evidenceConfig)}\n` : "\n";
  const decisionToolSection =
    decisionTool ? `\n${renderDecisionToolSection(page, decisionTool)}\n` : "\n";
  const decisionCheckSection = directoryEntry
    ? `\n${renderDecisionCheckSection(directoryEntry)}\n`
    : "\n";
  const customerActionSection = directoryEntry
    ? `\n${renderCustomerActionSection(page, directoryEntry)}\n`
    : "\n";
  const trustSnapshotSection = directoryEntry
    ? `\n${renderTrustSnapshot(page, directoryEntry)}\n`
    : "\n";
  const detailIntroSection = directoryEntry ? `\n${renderDetailIntro(directoryEntry)}\n` : "\n";
  const structuredData = renderStructuredData(page);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.titleTag)}</title>
    <meta
      name="description"
      content="${escapeHtml(page.metaDescription)}"
    />
    <link rel="canonical" href="${escapeHtml(page.canonicalUrl)}" />
    <meta property="og:title" content="${escapeHtml(page.ogTitle)}" />
    <meta
      property="og:description"
      content="${escapeHtml(page.ogDescription)}"
    />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://finlogichub5.com/social-preview.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&amp;family=Source+Serif+4:wght@600;700&amp;display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/style.css" />${structuredData}
  </head>
  <body>
    <div class="site-shell">
      <header class="site-header">
        <a class="brand" href="/">
          <span class="brand__mark">FH</span>
          <span>
            <strong>FinLogic Hub</strong>
            <small>State filing fee guides</small>
          </span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/states.html">States</a>
          <a href="/filing-basics.html">Filing basics</a>
          <a href="/filing-help-options.html">Help options</a>
          <a href="/about.html">About</a>
        </nav>
      </header>

      <main class="page" data-content-model="${structuredSections ? "structured" : "legacy"}">
        <section class="hero hero--page">
          <div class="hero__copy surface">
            <div class="breadcrumbs">
              ${renderBreadcrumbs(page.breadcrumbs)}
            </div>
            <p class="eyebrow">${escapeHtml(page.state)}</p>
            <h1>${escapeHtml(page.heroTitle)}</h1>
            <p class="hero__subtitle">
              ${escapeHtml(page.heroSubtitle)}
            </p>
            <div class="badge-row">
              <span class="badge${getBadgeToneClass(reviewStatus.tone)}">${escapeHtml(reviewStatus.label)}</span>
              <span class="badge">Last reviewed: ${escapeHtml(page.lastReviewed)}</span>
              <span class="badge">Target refresh by ${escapeHtml(formatLongDate(reviewStatus.nextReviewDate))}</span>
              <span class="badge">${page.sourceLinks.length} official ${pluralize(page.sourceLinks.length, "source")}</span>
              <span class="badge">${escapeHtml(page.sourceBadge)}</span>
            </div>
          </div>

          <aside class="summary-panel surface">
            <h2>${escapeHtml(page.summaryTitle || "At a glance")}</h2>
            <div class="metric-grid">
${renderMetrics(page.metrics)}
            </div>${summaryNote}
          </aside>
        </section>${sectionNav}${quickAnswerSection}${evidenceChainSection}${decisionToolSection}${decisionCheckSection}${customerActionSection}${trustSnapshotSection}${detailIntroSection}
${pageBody}

        <section class="section surface" id="sources">
          <div class="section__head">
            <p class="eyebrow">Official links</p>
            <h2>Sources used for this page</h2>
          </div>
          <ul class="source-list">
${renderSourceLinks(page.sourceLinks)}
          </ul>
        </section>
      </main>

      <footer class="site-footer">
        <nav class="footer-nav" aria-label="Footer">
          <a href="/">Home</a>
          <a href="/states.html">States</a>
          <a href="/filing-basics.html">Filing basics</a>
          <a href="/filing-help-options.html">Help options</a>
          <a href="/about.html">About</a>
          <a href="/privacy.html">Privacy</a>
          <a href="/contact.html">Contact</a>
          <a href="/terms.html">Terms</a>
        </nav>
        <p>&copy; 2026 FinLogic Hub. Informational only. Official state sources control.</p>
      </footer>
    </div>${scriptTag}
  </body>
</html>
`;
}

validateStructuredBodyCoverage();
validateGuideEnhancements();

for (const page of liveStatePages) {
  const targetFile = path.join(ROOT, page.filePath);
  await fs.mkdir(path.dirname(targetFile), { recursive: true });
  await fs.writeFile(targetFile, renderPage(page));
}

console.log(
  `Built ${liveStatePages.length} state pages. Structured bodies: ${structuredBodyByFilePath.size}.`
);
