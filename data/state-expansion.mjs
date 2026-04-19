function decisionCase({
  value,
  label,
  deadline,
  amount,
  normalRule,
  lateRule,
  confirmRule,
  nextAction,
  sourceIndexes,
  lateSourceIndexes,
  confirmSourceIndexes
}) {
  return {
    value,
    label,
    deadline,
    amount,
    normalRule,
    lateRule,
    confirmRule,
    nextAction,
    sourceIndexes,
    lateSourceIndexes: lateSourceIndexes ?? sourceIndexes,
    confirmSourceIndexes: confirmSourceIndexes ?? sourceIndexes
  };
}

function decisionTool({ caseLabel, intro, cases }) {
  return {
    caseLabel,
    statusLabel: "What do you need right now?",
    intro,
    statuses: [
      {
        value: "standard",
        label: "Normal rule",
        description: "Show the normal due date and main published amount."
      },
      {
        value: "late",
        label: "Already late",
        description: "Show the late-state consequence or the urgent next official step."
      },
      {
        value: "confirm",
        label: "Need to verify",
        description: "Show what to confirm on the official record before relying on the summary."
      }
    ],
    cases
  };
}

export const expansionStatePages = [
  {
    filePath: "tools/arizona/annual-report-deadline/index.html",
    titleTag: "Arizona Annual Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Arizona corporation annual report due date and fee guidance covering the $45 for-profit fee, $10 nonprofit fee, six-month extension option, and delinquency timeline.",
    canonicalUrl: "https://finlogichub5.com/tools/arizona/annual-report-deadline/",
    ogTitle: "Arizona Annual Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Arizona corporation annual report due dates, fees, extension rules, courtesy reminders, and delinquency timing from Arizona Corporation Commission guidance.",
    state: "Arizona",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Arizona annual report", href: null }
    ],
    heroTitle: "Arizona annual report fee and deadline",
    heroSubtitle:
      "Use this page if you need the Arizona corporation annual report due date, fee, or extension rule. Start by confirming the record is a corporation, because Arizona LLCs do not file annual reports with the Arizona Corporation Commission.",
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Arizona Corporation Commission",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Arizona LLC rule",
        text: "Arizona LLCs do not file annual reports. This rule applies to corporations."
      },
      {
        label: "Annual report fee",
        text: "$45 for for-profit corporations or $10 for nonprofit corporations."
      },
      {
        label: "Late path",
        text: "$9 per month for late for-profit annual reports, then pending inactive status and possible administrative dissolution."
      }
    ],
    summaryNoteHtml: null,
    caseCards: [
      {
        label: "For-profit corporation",
        title: "Use the ACC due date and the $45 filing fee",
        text: "Arizona for-profit corporations file each year by the designated ACC due date and face the published $9-per-month late penalty if the report is missed."
      },
      {
        label: "Nonprofit corporation",
        title: "Lower fee, but the filing is still annual",
        text: "Arizona nonprofit corporations still file annual reports, but the fee is $10 and the FAQ says nonprofits are not assessed annual-report penalties."
      },
      {
        label: "Arizona LLC",
        title: "Stop before you use this page",
        text: "Arizona LLCs do not file annual reports. If the record is an LLC, use the LLC-specific ACC record and notice path instead of this corporation guide."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.azcc.gov/faqs/BusinessServicesFAQs",
        label: "Arizona Corporation Commission business services FAQs"
      },
      {
        href: "https://www.azcc.gov/docs/default-source/corps-files/fee-schedules/fee-schedule-corporations6def4cc74b1a47129d16c2b1c3851bda.pdf",
        label: "Arizona Corporation Commission corporation fee schedule PDF"
      },
      {
        href: "https://azcc.gov/docs/default-source/corps-files/how-to-file-a-corporation-annual-report.pdf",
        label: "Arizona how to file a corporation annual report PDF"
      },
      {
        href: "https://www.azcc.gov/docs/default-source/corps-files/instructions/c002i-instructions-ar-extension-request.pdf",
        label: "Arizona annual report extension instructions PDF"
      },
      {
        href: "https://www.azcc.gov/docs/default-source/corps-files/forms/c002-annual-report-extension-requestf24a52b02850428c9e36f556f48688ff.pdf",
        label: "Arizona annual report extension request form PDF"
      },
      {
        href: "https://www.azcc.gov/news/home/2026/01/08/arizona-business-center---acc-s-new-online-business-filing-portal-to-debut-january-12--2026",
        label: "Arizona Business Center launch and reminder notice"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/arkansas/franchise-tax-deadline/index.html",
    titleTag: "Arkansas Franchise Tax Deadline and Annual Report Fees | FinLogic Hub",
    metaDescription:
      "Arkansas franchise tax deadline guidance covering the May 1 due date, stock corporation, nonstock corporation, and LLC fee lanes, plus the published late-fee and interest language.",
    canonicalUrl: "https://finlogichub5.com/tools/arkansas/franchise-tax-deadline/",
    ogTitle: "Arkansas Franchise Tax Deadline | FinLogic Hub",
    ogDescription:
      "Review Arkansas franchise tax due dates, annual-report form lanes, official online filing links, and published late-fee language from Arkansas Secretary of State sources.",
    state: "Arkansas",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Arkansas franchise tax deadline", href: null }
    ],
    heroTitle: "Arkansas franchise tax deadline and annual report fees",
    heroSubtitle:
      "Use this page if you need the Arkansas franchise tax deadline or the correct annual report form lane. Start with the entity type, because stock corporations, nonstock corporations, and LLCs do not use the same published amount.",
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Arkansas Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Main due date",
        text: "Due on or before May 1 each year."
      },
      {
        label: "Common fee lane",
        text: "$150 for stock corporations and LLCs, or $300 for nonstock corporations."
      },
      {
        label: "Late filing language",
        text: "Recent Arkansas SOS guidance says late franchise-tax filings are typically charged a $25 late fee plus 0.000274 percent interest per day."
      }
    ],
    summaryNoteHtml: null,
    heroActions: [
      {
        href: "https://www.ark.org/sos/franchise/index.php",
        label: "Open official filing portal",
        variant: "primary"
      },
      {
        href: "https://www.sos.arkansas.gov/business-commercial-services-bcs/franchise-tax-report-forms/",
        label: "Check forms and fee lanes",
        variant: "secondary"
      }
    ],
    caseCards: [
      {
        label: "Stock corporation",
        title: "Start with the $150 minimum lane",
        text: "Arkansas stock corporations use the capital-stock franchise-tax lane, with a $150 minimum tax shown on the official form set and forms page."
      },
      {
        label: "Nonstock corporation",
        title: "Use the separate $300 nonstock form lane",
        text: "Arkansas nonstock corporations do not use the same minimum tax as stock corporations. The official nonstock form shows the $300 annual amount."
      },
      {
        label: "LLC or PLLC",
        title: "Use the Arkansas LLC franchise-tax lane",
        text: "Arkansas LLCs and PLLCs owe the state franchise tax and use the separate LLC form lane instead of the corporate capital-stock calculation."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sos.arkansas.gov/business-commercial-services-bcs/franchise-tax-report-forms/",
        label: "Arkansas franchise tax report forms page"
      },
      {
        href: "https://www.sos.arkansas.gov/frequently-asked-questions/63",
        label: "Arkansas franchise tax FAQ"
      },
      {
        href: "https://www.ark.org/sos/franchise/index.php",
        label: "Arkansas online franchise tax filing portal"
      },
      {
        href: "https://www.sos.arkansas.gov/news/detail/secretary-of-state-announces-temporary-waiver-of-franchise-tax-late-fees",
        label: "Arkansas Secretary of State late-fee waiver notice with typical penalty language"
      },
      {
        href: "https://www.sos.arkansas.gov/uploads/bcs/LLC1_FT_2025.pdf",
        label: "Arkansas LLC franchise tax report form PDF"
      },
      {
        href: "https://www.sos.arkansas.gov/uploads/bcs/Corp1_FT_2025_1.pdf",
        label: "Arkansas stock corporation franchise tax report form PDF"
      },
      {
        href: "https://www.sos.arkansas.gov/uploads/bcs/Corp_Nonstock1_FT_2025_1.pdf",
        label: "Arkansas nonstock corporation franchise tax report form PDF"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/indiana/business-entity-report-deadline/index.html",
    titleTag: "Indiana Business Entity Report Fee and Due Date | FinLogic Hub",
    metaDescription:
      "Indiana business entity report due date and fee guidance covering biennial anniversary-month timing, INBiz versus paper fees, reminders, and administrative dissolution or revocation risk.",
    canonicalUrl: "https://finlogichub5.com/tools/indiana/business-entity-report-deadline/",
    ogTitle: "Indiana Business Entity Report Fee and Due Date | FinLogic Hub",
    ogDescription:
      "Review Indiana business entity report timing, online and paper fees, reminders, and administrative dissolution or revocation rules from INBiz and Secretary of State guidance.",
    state: "Indiana",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Indiana business entity report", href: null }
    ],
    heroTitle: "Indiana business entity report fee and due date",
    heroSubtitle:
      "Use this page if you need the Indiana business entity report due date or filing fee. The first step is knowing this is a biennial Secretary of State filing, not a tax payment, and the report is tied to the anniversary month of formation or registration.",
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Indiana Secretary of State and INBiz",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Filing cadence",
        text: "First report due two years after formation or registration, then every other year."
      },
      {
        label: "Main fee",
        text: "$32 on INBiz or $50 by paper for for-profit entities."
      },
      {
        label: "Late-state rule",
        text: "No flat late fee is listed on the main report page, but missing the report can lead to administrative dissolution or revocation."
      }
    ],
    summaryNoteHtml: null,
    heroActions: [
      {
        href: "https://inbiz.in.gov/business-filings/business-entityreport",
        label: "Open official report guide",
        variant: "primary"
      },
      {
        href: "https://inbiz.in.gov/business-filings",
        label: "Open INBiz filings hub",
        variant: "secondary"
      }
    ],
    caseCards: [
      {
        label: "For-profit business",
        title: "Use the INBiz fee and anniversary-month rule",
        text: "Indiana for-profit business entity reports are due every other year by the end of the anniversary month, with the published $32 INBiz fee or $50 paper fee."
      },
      {
        label: "Nonprofit business",
        title: "Use the separate nonprofit fee lane",
        text: "Indiana nonprofits still file the same biennial report, but the main report page uses the lower $22 INBiz or $20 paper fee lane."
      },
      {
        label: "Past-due or dissolved record",
        title: "Move out of the normal filing lane quickly",
        text: "Once Indiana has already administratively dissolved or revoked the business, the ordinary report answer is not enough by itself and reinstatement steps may be required."
      }
    ],
    sourceLinks: [
      {
        href: "https://inbiz.in.gov/business-filings/business-entityreport",
        label: "Indiana INBiz business entity report page"
      },
      {
        href: "https://inbiz.in.gov/business-filings",
        label: "Indiana INBiz business filings hub"
      },
      {
        href: "https://inbiz.in.gov/business-filings/admin-dissolution",
        label: "Indiana administrative dissolution and revocation guidance"
      },
      {
        href: "https://forms.in.gov/Download.aspx?id=5500",
        label: "Indiana Business Entity Report paper form PDF"
      },
      {
        href: "https://www.in.gov/dor/files/new-small-business-handbook.pdf",
        label: "Indiana new small business handbook PDF"
      },
      {
        href: "https://inbiz.in.gov/BOS/SOS.Reinstatement/CertificateOfClearance",
        label: "Indiana reinstatement certificate of clearance path"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/michigan/annual-report-deadline/index.html",
    titleTag: "Michigan Annual Report and Annual Statement Fees and Due Dates | FinLogic Hub",
    metaDescription:
      "Michigan annual report and annual statement due date guidance covering the February 15 LLC deadline, May 15 corporation deadline, October 1 nonprofit deadline, filing fees, reminders, and penalty rules.",
    canonicalUrl: "https://finlogichub5.com/tools/michigan/annual-report-deadline/",
    ogTitle: "Michigan Annual Report and Annual Statement Fees | FinLogic Hub",
    ogDescription:
      "Review Michigan annual report and annual statement due dates, fees, late-penalty timing, reminders, and MiBusiness Registry filing paths from LARA guidance.",
    state: "Michigan",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Michigan annual report and statement", href: null }
    ],
    heroTitle: "Michigan annual report and annual statement fees and due dates",
    heroSubtitle:
      "Use this page if you need the Michigan annual filing deadline or fee. Start with the entity type, because LLCs, corporations, PLLCs, and nonprofit corporations do not share the same due date or the same late-fee rule.",
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Michigan LARA Corporations Division",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "LLC and PLLC due date",
        text: "February 15 each year; LLCs pay $25 and PLLCs pay $75."
      },
      {
        label: "Corporation due date",
        text: "May 15 each year with a $25 filing fee and published late-penalty schedule."
      },
      {
        label: "Reminder timing",
        text: "Email reminders and impending-status notices are sent 90 days before the due date."
      }
    ],
    summaryNoteHtml: null,
    heroActions: [
      {
        href: "https://www.michigan.gov/lara/bureau-list/cscl/corps/michigan-business-roadmap/annual-reports-and-annual-statements",
        label: "Open official annual filings guide",
        variant: "primary"
      },
      {
        href: "https://mibusinessregistry.lara.state.mi.us/",
        label: "Open MiBusiness Registry",
        variant: "secondary"
      }
    ],
    caseCards: [
      {
        label: "LLC or PLLC",
        title: "Use the February 15 annual statement lane",
        text: "Michigan LLCs and PLLCs file annual statements, not annual reports. LLCs pay $25, while PLLCs pay $75 and a separate $50 penalty applies if the statement is received after February 15."
      },
      {
        label: "Profit or professional corporation",
        title: "Use the May 15 annual report lane",
        text: "Michigan corporations file annual reports by May 15 with a $25 filing fee and an escalating penalty schedule if the report is received after the deadline."
      },
      {
        label: "Nonprofit corporation",
        title: "Use the October 1 nonprofit lane",
        text: "Michigan nonprofit corporations use the October 1 annual-report deadline and the lower nonprofit filing-fee lane rather than the corporation or LLC schedule."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.michigan.gov/lara/bureau-list/cscl/corps/michigan-business-roadmap/annual-reports-and-annual-statements",
        label: "Michigan LARA annual reports and annual statements guide"
      },
      {
        href: "https://www.michigan.gov/lara/bureau-list/cscl/corps/limited-liability-co/Filling-Requirements-Continued/annual-filings",
        label: "Michigan LLC annual filings page"
      },
      {
        href: "https://mibusinessregistry.lara.state.mi.us/",
        label: "Michigan MiBusiness Registry Portal"
      },
      {
        href: "https://www.michigan.gov/lara/news-releases/2025/06/30/michigan-launches-new-mibusiness-registry-portal-to-improve-business-filing-services",
        label: "Michigan MiBusiness Registry launch notice"
      },
      {
        href: "https://www.michigan.gov/lara/news-releases/2025/06/24/lara-alerts-michigan-businesses-of-scheme-to-file-their-limited-liability-company-annual-statement",
        label: "Michigan LARA alert about deceptive LLC annual statement filing offers"
      },
      {
        href: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/cscl/Folder6/Filing_Fees.pdf",
        label: "Michigan annual filing fee schedule PDF"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/utah/annual-renewal-deadline/index.html",
    titleTag: "Utah Annual Renewal Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Utah annual renewal due date guidance covering anniversary-date timing, $18 renewal fees for most entities, the $10 late renewal fee, and reinstatement limits for foreign entities.",
    canonicalUrl: "https://finlogichub5.com/tools/utah/annual-renewal-deadline/",
    ogTitle: "Utah Annual Renewal Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Utah annual report or renewal due dates, current fee schedule, late renewal fees, reinstatement limits, and official renewal warnings from Utah Division of Corporations guidance.",
    state: "Utah",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Utah annual renewal", href: null }
    ],
    heroTitle: "Utah annual renewal fee and deadline",
    heroSubtitle:
      "Use this page if you need the Utah annual report or renewal due date. Start with the anniversary date and then confirm whether the entity is domestic or foreign before you rely on the reinstatement path.",
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Utah Division of Corporations and Commercial Code",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Main due rule",
        text: "The renewal is due one year from registration and then each year after that."
      },
      {
        label: "Standard renewal fee",
        text: "$18 for corporations, nonprofits, LLCs, LPs, and LLPs on the current fee schedule."
      },
      {
        label: "Late and reinstatement rule",
        text: "$10 late renewal fee, and Utah says foreign entities cannot use the reinstatement path if they lapse."
      }
    ],
    summaryNoteHtml: null,
    heroActions: [
      {
        href: "https://corporations.utah.gov/renewal-process/",
        label: "Open official renewal process",
        variant: "primary"
      },
      {
        href: "https://businessregistration.utah.gov/",
        label: "Open Utah business portal",
        variant: "secondary"
      }
    ],
    caseCards: [
      {
        label: "Corporation or LLC",
        title: "Use the anniversary-date renewal lane",
        text: "Utah corporations and LLCs use the annual renewal tied to the registration anniversary, with the current $18 renewal fee on the published fee schedule."
      },
      {
        label: "LP or LLP",
        title: "Use the same annual cycle, but keep the entity type straight",
        text: "Utah limited partnerships and LLPs also renew on the annual cycle, and the fee schedule keeps them in the standard renewal-fee lane."
      },
      {
        label: "Foreign or lapsed entity",
        title: "Check status before assuming reinstatement is available",
        text: "Utah's reinstatement FAQ says foreign entities cannot reinstate. If the record is already lapsed, confirm the exact status before you pay."
      }
    ],
    sourceLinks: [
      {
        href: "https://corporations.utah.gov/renewal-process/",
        label: "Utah annual renewal process page"
      },
      {
        href: "https://corporations.utah.gov/faqs/how-to-renew-a-business/",
        label: "Utah how to renew a business FAQ"
      },
      {
        href: "https://corporations.utah.gov/wp-content/uploads/2023/04/currentfees.pdf",
        label: "Utah current fee schedule PDF"
      },
      {
        href: "https://corporations.utah.gov/faqs/how-to-reinstate-a-business-entity/",
        label: "Utah reinstatement FAQ"
      },
      {
        href: "https://corporations.utah.gov/reinstate-a-business/",
        label: "Utah reinstate a business general instructions"
      },
      {
        href: "https://commerce.utah.gov/2025/07/01/advisory-for-business-registrants-important-mail-alert-2/",
        label: "Utah business renewal mail alert"
      }
    ],
    scriptSrc: null
  }
];

export const expansionStateDirectory = [
  {
    state: "Arizona",
    route: "/tools/arizona/annual-report-deadline/",
    guideLabel: "Arizona annual report fee and deadline",
    chipLabel: "Arizona corporation report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Corporation-only annual report rules, $45 or $10 fees, six-month extension option, and published delinquency timing.",
    directoryCardDescription:
      "Arizona corporation annual report timing, fee split, extension rule, and for-profit late-penalty path.",
    homeComparison: {
      focus: "Arizona for-profit or nonprofit corporation",
      deadline: "Each year by the designated due date on the ACC record, with a six-month extension available",
      fee: "$45 for for-profit corporations or $10 for nonprofit corporations",
      lateRule:
        "$9 per month for late for-profit reports; nonprofits are not assessed annual-report penalties, but missed filings still lead to delinquency notices and possible dissolution"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "For-profit and nonprofit corporations registered in Arizona",
      deadline:
        "Each year by the designated due date shown on the ACC record, with a six-month extension available",
      amount: "$45 for for-profit corporations or $10 for nonprofit corporations"
    }
  },
  {
    state: "Arkansas",
    route: "/tools/arkansas/franchise-tax-deadline/",
    guideLabel: "Arkansas franchise tax deadline",
    chipLabel: "Arkansas franchise tax",
    guideType: "Franchise tax guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "May 1 deadline, stock corporation, nonstock corporation, and LLC fee lanes, plus published late-fee language.",
    directoryCardDescription:
      "Arkansas May 1 franchise-tax timing, entity-specific fee lanes, online filing path, and late-fee or interest language.",
    homeComparison: {
      focus: "Arkansas corporation or LLC paying annual franchise tax",
      deadline: "May 1 each year",
      fee: "$150 for stock corporations and LLCs or $300 for nonstock corporations",
      lateRule:
        "Recent Arkansas SOS guidance says late filings are typically charged a $25 late fee plus 0.000274 percent daily interest"
    },
    directoryComparison: {
      obligation: "Annual franchise tax report",
      entityFocus:
        "Corporations, nonstock corporations, LLCs, banks, and insurance entities registered in Arkansas",
      deadline: "Due on or before May 1 each year",
      amount: "$150 for stock corporations and LLCs or $300 for nonstock corporations"
    }
  },
  {
    state: "Indiana",
    route: "/tools/indiana/business-entity-report-deadline/",
    guideLabel: "Indiana business entity report fee and deadline",
    chipLabel: "Indiana entity report",
    guideType: "Biennial report guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "Biennial anniversary-month timing, INBiz vs paper fee split, reminder timing, and administrative dissolution risk.",
    directoryCardDescription:
      "Indiana biennial Business Entity Report timing, online and paper fees, reminder notices, and dissolution or revocation path.",
    homeComparison: {
      focus: "Indiana registered business filing a Business Entity Report",
      deadline: "Two years after registration, then every other year by the end of the anniversary month",
      fee: "$32 on INBiz or $50 paper for for-profit businesses; $22 on INBiz or $20 paper for nonprofits",
      lateRule:
        "No flat late fee is listed on the main filing page, but missed reports can lead to administrative dissolution or revocation"
    },
    directoryComparison: {
      obligation: "Business Entity Report",
      entityFocus:
        "Corporations, LLCs, nonprofit corporations, LPs, LLPs, benefit corporations, business trusts, and agricultural cooperatives",
      deadline:
        "First report due two years after formation or registration; then every other year by the end of the anniversary month",
      amount:
        "$32 on INBiz or $50 by paper for for-profit entities, or $22 on INBiz and $20 by paper for nonprofits"
    }
  },
  {
    state: "Michigan",
    route: "/tools/michigan/annual-report-deadline/",
    guideLabel: "Michigan annual report and annual statement deadline",
    chipLabel: "Michigan annual filing",
    guideType: "Annual report and statement guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "February 15 LLC timing, May 15 corporation timing, October 1 nonprofit timing, and entity-specific fee or penalty splits.",
    directoryCardDescription:
      "Michigan annual report and annual statement deadlines by entity type, reminder timing, fee lanes, and published late-penalty sequence.",
    homeComparison: {
      focus: "Michigan corporation, nonprofit corporation, LLC, or PLLC",
      deadline: "February 15, May 15, or October 1 depending on entity type",
      fee: "$25 for LLCs and corporations, $75 for PLLCs, or $20 for nonprofit corporations",
      lateRule:
        "LLCs and nonprofits can fall into not-good-standing or dissolution paths, while corporations face published penalty amounts if filed after May 15"
    },
    directoryComparison: {
      obligation: "Annual report or annual statement",
      entityFocus: "Corporations, nonprofit corporations, LLCs, and PLLCs registered in Michigan",
      deadline: "February 15, May 15, or October 1 depending on entity type",
      amount: "$25 for LLCs and corporations, $75 for PLLCs, or $20 for nonprofit corporations"
    }
  },
  {
    state: "Utah",
    route: "/tools/utah/annual-renewal-deadline/",
    guideLabel: "Utah annual renewal fee and deadline",
    chipLabel: "Utah renewal",
    guideType: "Annual renewal guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "Anniversary-date renewal timing, $18 standard fee lane, $10 late fee, and reinstatement limits for foreign entities.",
    directoryCardDescription:
      "Utah annual renewal timing, current fee schedule, late renewal fee, and domestic-versus-foreign reinstatement split.",
    homeComparison: {
      focus: "Utah domestic or foreign corporation, nonprofit, LLC, LP, or LLP",
      deadline: "One year from registration and annually thereafter",
      fee: "$18 renewal fee for corporations, nonprofits, LLCs, LPs, and LLPs",
      lateRule:
        "$10 late renewal fee, and Utah says foreign entities cannot use the reinstatement path if they lapse"
    },
    directoryComparison: {
      obligation: "Annual report or renewal",
      entityFocus:
        "Domestic and foreign corporations, nonprofits, LLCs, LPs, and LLPs registered in Utah",
      deadline:
        "One year from registration and annually thereafter, with notice timing tied to the anniversary date",
      amount:
        "$18 renewal fee for corporations, nonprofits, LLCs, LPs, and LLPs, plus a $10 late renewal fee"
    }
  }
];

export const expansionStructuredStateContentByFilePath = {
  "tools/arizona/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Arizona annual reports only apply to corporations",
      headers: ["Entity type", "Does it file?", "Due rule", "Published amount"],
      rows: [
        [
          "For-profit corporation",
          "Yes",
          "Every year by the designated due date shown on the ACC record",
          "$45"
        ],
        [
          "Nonprofit corporation",
          "Yes",
          "Every year by the designated due date shown on the ACC record",
          "$10"
        ],
        [
          "Arizona LLC",
          "No",
          "No ACC annual report requirement",
          "Not applicable"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and extension path",
      title: "Arizona separates extra filing time from the annual fee itself",
      cards: [
        {
          title: "The extension is six months, but the fee is still due",
          text: "The Arizona FAQ and extension form say a corporation can request a six-month extension, but the annual report fee still has to be delivered with the request or the extension will not be granted."
        },
        {
          title: "For-profit late penalties keep accruing",
          text: "Arizona says for-profit corporations start accruing a $9 per month penalty after the deadline. If the report still is not filed, the entity moves through delinquency notices, pending inactive status, and possible administrative dissolution."
        },
        {
          title: "Nonprofits avoid the penalty, not the filing duty",
          text: "Arizona says nonprofit corporations are not assessed annual-report penalties, but they still have to file and can still move into delinquency and dissolution if the filing is ignored."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Arizona filing details",
      headers: ["Question", "Arizona answer used on this page"],
      rows: [
        [
          "How do you check the due date?",
          "Use the corporation's ACC record. The FAQ says the annual report is due by the designated due date shown in the state record."
        ],
        [
          "Can you file early?",
          "Yes. Arizona says the annual report can be filed through the online system up to 90 days before it is due."
        ],
        [
          "Will the state remind you?",
          "The corporation is responsible for filing on time, but Arizona says users can sign up for courtesy reminders through the online filing system and business center."
        ]
      ]
    }
  ],
  "tools/arkansas/franchise-tax-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Arkansas franchise tax uses separate fee lanes by entity type",
      headers: ["Entity type", "Core due date", "Published amount", "What to watch"],
      rows: [
        [
          "Stock corporation",
          "May 1",
          "$150 minimum franchise tax",
          "The stock corporation form uses the capital-stock calculation but still shows a $150 minimum."
        ],
        [
          "Nonstock corporation",
          "May 1",
          "$300",
          "Nonstock corporations use their own annual franchise-tax report lane."
        ],
        [
          "LLC or PLLC",
          "May 1",
          "$150",
          "Arkansas LLCs use the separate LLC franchise-tax form lane instead of the corporation capital-stock calculation."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Arkansas core rules",
      title: "Practical rules that matter before you pay",
      headers: ["Question", "Official Arkansas answer used here"],
      rows: [
        [
          "Can you file online?",
          "Yes. Arkansas provides the official online franchise-tax portal through the Secretary of State link."
        ],
        [
          "Is there an extension?",
          "The Arkansas franchise-tax report forms say the older extension option was eliminated, so the practical answer is to treat May 1 as the live filing deadline."
        ],
        [
          "What happens if the tax is unpaid?",
          "The forms page says that if franchise tax is not paid and filed for all years due, the business cannot file other Business and Commercial Services documents except final dissolution or withdrawal filings."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and status risk",
      title: "The late cost is more than a simple flat fee",
      cards: [
        {
          title: "Recent SOS filing notice gives the working late number",
          text: "The Arkansas Secretary of State's late-fee waiver notice says late franchise-tax filings are normally charged a $25 late fee plus 0.000274 percent interest per day."
        },
        {
          title: "Taxes can keep accruing even on revoked entities",
          text: "Arkansas says revocation or forfeiture does not eliminate the franchise-tax obligation. The state continues charging annual franchise tax until a proper final dissolution or withdrawal is filed."
        },
        {
          title: "The safer move is to clear the tax before other cleanup",
          text: "Because unpaid franchise tax can block other Business and Commercial Services filings, the fastest cleanup path is usually to clear the tax issue before trying other record changes."
        }
      ]
    }
  ],
  "tools/indiana/business-entity-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee and timing snapshot",
      title: "Indiana uses a biennial report tied to the anniversary month",
      headers: ["Entity lane", "When it is due", "INBiz fee", "Paper fee"],
      rows: [
        [
          "For-profit businesses",
          "Two years after registering, then every other year by the end of the anniversary month",
          "$32",
          "$50"
        ],
        [
          "Nonprofit businesses",
          "Two years after registering, then every other year by the end of the anniversary month",
          "$22",
          "$20"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "If the report is missed",
      title: "Indiana turns missed reports into a status problem instead of a published late-fee table",
      cards: [
        {
          title: "Administrative dissolution or revocation is the main risk",
          text: "Indiana's administrative-dissolution guidance treats the missed Business Entity Report as a status issue that can move a business toward dissolution or revocation instead of a prominently published flat late fee."
        },
        {
          title: "Paper filing errors slow people down",
          text: "Indiana says about 90 percent of paper business entity reports are rejected because of incorrect forms or data-entry problems. INBiz is the cleaner path when you can use it."
        },
        {
          title: "The report is separate from taxes",
          text: "Indiana's small business handbook says the business entity report is separate from paying state taxes. Filing the report does not replace tax registrations or tax filings."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Indiana filing details",
      headers: ["Question", "Indiana answer used here"],
      rows: [
        [
          "Who has to file?",
          "Indiana says corporations, LLCs, nonprofit corporations, LPs, LLPs, benefit corporations, business trusts, and agricultural cooperatives must file the report."
        ],
        [
          "Will you get reminders?",
          "Indiana says the Secretary of State will send a reminder notice in the month the report is due. The small business handbook also points filers back to INBiz for deadline checks."
        ],
        [
          "What should you do if the record is already revoked or dissolved?",
          "Use the administrative-dissolution or reinstatement pages first. Once the entity is already out of active status, the normal biennial-report answer is no longer enough by itself."
        ]
      ]
    }
  ],
  "tools/michigan/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Michigan keeps separate annual filing lanes by entity type",
      headers: ["Entity type", "Due date", "Published filing fee", "Late note"],
      rows: [
        [
          "Limited liability company",
          "February 15",
          "$25",
          "If formed after September 30, no February 15 statement is due in the immediately succeeding year."
        ],
        [
          "Professional limited liability company",
          "February 15",
          "$75",
          "$50 penalty if the annual statement is received after February 15."
        ],
        [
          "Profit or professional corporation",
          "May 15",
          "$25",
          "Penalty schedule starts after May 15 and increases by filing month."
        ],
        [
          "Nonprofit corporation",
          "October 1",
          "$20",
          "Uses the nonprofit lane instead of the corporation or LLC schedule."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and reminder path",
      title: "Michigan publishes the reminder timing and the status downside clearly",
      cards: [
        {
          title: "Reminders go out 90 days early",
          text: "Michigan says email reminders are sent 90 days before the annual due date, and impending dissolution, revocation, or not-good-standing notices also go out 90 days before the due date."
        },
        {
          title: "Corporation late penalties escalate by month",
          text: "Michigan's annual filings guide says corporations pay $10 if the report is received from May 16 to May 31, $20 from June 1 to June 30, and $30 from July 1 to July 31. The full schedule continues if the filing keeps slipping."
        },
        {
          title: "Missed annuals create a status cleanup problem",
          text: "Michigan says failing to file an annual can lead to dissolution, revocation, or not-good-standing status after the applicable grace period, and getting back into good standing can carry separate penalty fees."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Michigan filing details",
      headers: ["Question", "Michigan answer used here"],
      rows: [
        [
          "Who has to file?",
          "Michigan says corporations, nonprofit corporations, LLCs, and PLLCs must file. Limited partnerships and LLPs do not use this annual filing lane."
        ],
        [
          "Where do you file?",
          "Annual reports and annual statements are filed with the Corporations Division through the MiBusiness Registry Portal."
        ],
        [
          "Why should you be careful with mailers?",
          "Michigan LARA warns that deceptive offers may try to file an LLC annual statement for a fee. Use the official LARA or MiBusiness Registry path instead."
        ]
      ]
    }
  ],
  "tools/utah/annual-renewal-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee and timing snapshot",
      title: "Utah annual renewals run on the anniversary date with a standard fee lane",
      headers: ["Entity type", "Core timing rule", "Published renewal fee", "Late note"],
      rows: [
        [
          "Corporation or LLC",
          "One year from registration and every year after that",
          "$18",
          "$10 late renewal fee"
        ],
        [
          "Nonprofit corporation",
          "One year from registration and every year after that",
          "$18",
          "$10 late renewal fee"
        ],
        [
          "LP or LLP",
          "One year from registration and every year after that",
          "$18",
          "$10 late renewal fee"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and reinstatement split",
      title: "Utah separates ordinary renewals from lapsed-status cleanup",
      cards: [
        {
          title: "The standard late cost is simple",
          text: "Utah's current fee schedule shows a $10 late renewal fee on top of the standard annual renewal amount."
        },
        {
          title: "Foreign entities do not get the same cleanup path",
          text: "Utah's reinstatement FAQ says foreign entities and DBAs cannot reinstate. If the record has already lapsed, confirm the exact status before sending payment."
        },
        {
          title: "Watch for misleading renewal solicitations",
          text: "Utah's 2025 mail alert warns about third-party mailers that imitate the official site and try to charge $175 for business renewal services."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Utah renewal details",
      headers: ["Question", "Utah answer used here"],
      rows: [
        [
          "Will Utah remind you?",
          "Utah says a postcard reminder is sent about 60 days before the anniversary date."
        ],
        [
          "What if I need the exact amount by entity type?",
          "Use the current Utah fee schedule because the state publishes the renewal fee lanes there and updates that PDF when fees change."
        ],
        [
          "Where should you start the filing?",
          "Utah says to start your business registration or renewal at the official state portal rather than a private letter or QR-code mailer."
        ]
      ]
    }
  ]
};

export const expansionGuideEvidenceByRoute = {
  "/tools/arizona/annual-report-deadline/": {
    filingLabel: [1, 3],
    whoShouldUse: [1],
    headlineDueDate: [1, 4, 5],
    mainAmountShown: [1, 2],
    ifAlreadyLate: [1, 6]
  },
  "/tools/arkansas/franchise-tax-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2],
    headlineDueDate: [1, 4],
    mainAmountShown: [1, 5, 6, 7],
    ifAlreadyLate: [1, 4]
  },
  "/tools/indiana/business-entity-report-deadline/": {
    filingLabel: [1, 5],
    whoShouldUse: [1, 5],
    headlineDueDate: [1, 2, 4],
    mainAmountShown: [1, 4],
    ifAlreadyLate: [3, 6]
  },
  "/tools/michigan/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2],
    headlineDueDate: [1, 2],
    mainAmountShown: [1, 2, 6],
    ifAlreadyLate: [1, 2, 5]
  },
  "/tools/utah/annual-renewal-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2, 3],
    headlineDueDate: [1, 2],
    mainAmountShown: [3],
    ifAlreadyLate: [3, 4, 5, 6]
  }
};

export const expansionGuideDecisionToolByRoute = {
  "/tools/arizona/annual-report-deadline/": decisionTool({
    caseLabel: "Which Arizona record fits best?",
    intro:
      "Arizona is easy to misread if you flatten corporations and LLCs into one rule. Start by confirming the entity is actually a corporation before you rely on the fee or due date.",
    cases: [
      decisionCase({
        value: "for-profit-corporation",
        label: "For-profit corporation",
        deadline: "Each year by the designated ACC due date",
        amount: "$45 annual report fee",
        normalRule:
          "Arizona for-profit corporations file annual reports each year by the designated ACC due date, and the report can be filed online up to 90 days early.",
        lateRule:
          "For-profit corporations begin accruing a $9 per month penalty after the deadline and can move through delinquency notices into administrative dissolution if the report remains unfiled.",
        confirmRule:
          "Confirm that the record is a corporation and not an LLC before relying on the annual report rule, because Arizona LLCs do not file annual reports.",
        nextAction:
          "Use the ACC business record and the corporation annual report filing path before paying.",
        sourceIndexes: [1, 3],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1]
      }),
      decisionCase({
        value: "nonprofit-corporation",
        label: "Nonprofit corporation",
        deadline: "Each year by the designated ACC due date",
        amount: "$10 annual report fee",
        normalRule:
          "Arizona nonprofit corporations still file annual reports each year, but the published fee is $10 instead of the for-profit corporation amount.",
        lateRule:
          "Arizona says nonprofit corporations are not assessed annual-report penalties, but missed filings still move into delinquency notices and possible administrative dissolution if they remain unresolved.",
        confirmRule:
          "Confirm that the record is actually a nonprofit corporation before using the $10 fee lane.",
        nextAction:
          "Use the ACC record and annual report instructions before filing.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "llc-check",
        label: "Arizona LLC or not sure the record is a corporation",
        deadline: "No ACC annual report rule for Arizona LLCs",
        amount: "No corporation annual report fee applies",
        normalRule:
          "Arizona's FAQ says LLCs are not required to file annual reports. If the record is an LLC, this page is the wrong filing lane.",
        lateRule:
          "If the record is an LLC, do not pay a corporation annual-report notice by mistake. Use the entity record and the correct LLC notice or status page instead.",
        confirmRule:
          "Check the ACC record first. The safest move in Arizona is to confirm the entity type before relying on any corporation annual report answer.",
        nextAction:
          "Open the ACC business record and verify whether the entity is a corporation or LLC.",
        sourceIndexes: [1],
        lateSourceIndexes: [1],
        confirmSourceIndexes: [1, 6]
      })
    ]
  }),
  "/tools/arkansas/franchise-tax-deadline/": decisionTool({
    caseLabel: "Which Arkansas franchise-tax lane fits best?",
    intro:
      "Arkansas is mainly about the right entity lane. Stock corporations, nonstock corporations, and LLCs do not use the same published amount even though the deadline is the same.",
    cases: [
      decisionCase({
        value: "stock-corporation",
        label: "Stock corporation",
        deadline: "May 1",
        amount: "$150 minimum franchise tax",
        normalRule:
          "Arkansas stock corporations use the annual franchise-tax report lane with the published $150 minimum amount and the May 1 deadline.",
        lateRule:
          "Recent Arkansas SOS late-fee guidance says late filings are typically charged a $25 late fee plus 0.000274 percent daily interest.",
        confirmRule:
          "Confirm that the record is a stock corporation and not a nonstock corporation or LLC before using the minimum-tax answer.",
        nextAction:
          "Use the Arkansas online franchise-tax portal or the stock-corporation form lane before paying.",
        sourceIndexes: [1, 3, 6],
        lateSourceIndexes: [4, 6],
        confirmSourceIndexes: [1, 6]
      }),
      decisionCase({
        value: "nonstock-corporation",
        label: "Nonstock corporation",
        deadline: "May 1",
        amount: "$300",
        normalRule:
          "Arkansas nonstock corporations use the separate nonstock franchise-tax form lane and the published $300 annual amount.",
        lateRule:
          "The late-fee and interest warning still matters on the Arkansas nonstock lane if the filing slides past May 1.",
        confirmRule:
          "Confirm that the entity is actually a nonstock corporation before using the $300 amount.",
        nextAction:
          "Use the Arkansas nonstock franchise-tax form or online filing path before paying.",
        sourceIndexes: [1, 3, 7],
        lateSourceIndexes: [4, 7],
        confirmSourceIndexes: [1, 7]
      }),
      decisionCase({
        value: "llc-pllc",
        label: "LLC or PLLC",
        deadline: "May 1",
        amount: "$150",
        normalRule:
          "Arkansas LLCs and PLLCs use the separate LLC franchise-tax form lane and the published $150 amount.",
        lateRule:
          "The same Arkansas late-fee and daily-interest language is the practical late-state number to start with if the LLC filing is already overdue.",
        confirmRule:
          "Confirm that the record is an LLC or PLLC before using the flat $150 answer instead of a corporation lane.",
        nextAction:
          "Use the Arkansas LLC franchise-tax report path before paying.",
        sourceIndexes: [1, 3, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 5]
      })
    ]
  }),
  "/tools/indiana/business-entity-report-deadline/": decisionTool({
    caseLabel: "Which Indiana report lane fits best?",
    intro:
      "Indiana's main trap is forgetting that the Business Entity Report is biennial and anniversary-based. The second trap is assuming the online and paper fee lanes are identical.",
    cases: [
      decisionCase({
        value: "for-profit-entity",
        label: "For-profit entity",
        deadline: "Two years after registration, then every other year by the end of the anniversary month",
        amount: "$32 on INBiz or $50 by paper",
        normalRule:
          "Indiana for-profit entities use the biennial Business Entity Report tied to the anniversary month, with the published INBiz and paper fee split.",
        lateRule:
          "Indiana does not foreground a flat late fee on the main report page. The more serious issue is falling into administrative dissolution or revocation if the report stays unresolved.",
        confirmRule:
          "Confirm the exact anniversary month and whether the filing will be made online or by paper before relying on the fee shown here.",
        nextAction:
          "Use the Indiana Business Entity Report page or INBiz before filing.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [3, 6],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "nonprofit-entity",
        label: "Nonprofit entity",
        deadline: "Two years after registration, then every other year by the end of the anniversary month",
        amount: "$22 on INBiz or $20 by paper",
        normalRule:
          "Indiana nonprofits still file the same Business Entity Report, but the report page lists the lower nonprofit fee lane instead of the for-profit amount.",
        lateRule:
          "The business still risks falling out of active status if the report is ignored, even though the fee lane is lower than the for-profit schedule.",
        confirmRule:
          "Confirm that the record is actually nonprofit before using the lower fee lane.",
        nextAction:
          "Use INBiz or the Indiana paper form with the nonprofit fee lane before filing.",
        sourceIndexes: [1, 4],
        lateSourceIndexes: [3, 6],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "already-dissolved-or-revoked",
        label: "Already dissolved or revoked for missed reports",
        deadline: "Clear the issue as soon as possible",
        amount: "Reinstatement costs can sit on top of the missed report filing",
        normalRule:
          "Once Indiana has already pushed the business out of active status, the normal biennial report answer is no longer enough by itself.",
        lateRule:
          "Use the administrative-dissolution and reinstatement path immediately instead of treating the problem as just a late report.",
        confirmRule:
          "Confirm whether the business only needs the report or also needs reinstatement and a certificate of clearance before you pay.",
        nextAction:
          "Open Indiana's administrative-dissolution and reinstatement pages first.",
        sourceIndexes: [3, 6],
        lateSourceIndexes: [3, 6],
        confirmSourceIndexes: [3, 6]
      })
    ]
  }),
  "/tools/michigan/annual-report-deadline/": decisionTool({
    caseLabel: "Which Michigan annual filing lane fits best?",
    intro:
      "Michigan is one of the states where the filing label and due date both change by entity type. Start with the entity type before trusting any single deadline or fee.",
    cases: [
      decisionCase({
        value: "llc-or-pllc",
        label: "LLC or PLLC",
        deadline: "February 15 each year after organization or qualification",
        amount: "$25 for LLCs or $75 for PLLCs",
        normalRule:
          "Michigan LLCs and PLLCs file annual statements, not annual reports, and the main due date is February 15. If the LLC was formed after September 30, the immediately following February filing is skipped.",
        lateRule:
          "PLLCs face the separate $50 penalty if the annual statement is received after February 15. Michigan also warns that missed annuals can eventually cause bad-standing or dissolution problems.",
        confirmRule:
          "Confirm whether the record is an LLC or a PLLC, and whether the business was formed after September 30, before using the February filing answer.",
        nextAction:
          "Use the Michigan annual filings guide or MiBusiness Registry before filing.",
        sourceIndexes: [1, 2],
        lateSourceIndexes: [1, 2, 6],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "profit-corporation",
        label: "Profit or professional corporation",
        deadline: "May 15 each year after incorporation or qualification",
        amount: "$25 annual report fee",
        normalRule:
          "Michigan profit and professional corporations file annual reports by May 15 with the published $25 fee.",
        lateRule:
          "Michigan publishes the corporation penalty schedule by month after May 15, and continuing failures can push the business into not-good-standing, revocation, or dissolution paths.",
        confirmRule:
          "Confirm that the record is a corporation and not a nonprofit or LLC before using the May 15 rule.",
        nextAction:
          "Use MiBusiness Registry and the Michigan annual filings guide before filing.",
        sourceIndexes: [1, 3],
        lateSourceIndexes: [1, 5, 6],
        confirmSourceIndexes: [1]
      }),
      decisionCase({
        value: "nonprofit-corporation",
        label: "Nonprofit corporation",
        deadline: "October 1 each year after incorporation or qualification",
        amount: "$20 annual report fee",
        normalRule:
          "Michigan nonprofit corporations use the October 1 annual report lane and the lower nonprofit fee amount.",
        lateRule:
          "Even without the corporation-style penalty schedule, a missed nonprofit filing can still move the entity into not-good-standing or other cleanup status.",
        confirmRule:
          "Confirm that the entity is a nonprofit corporation before using the October 1 and $20 answers.",
        nextAction:
          "Use the Michigan annual filings guide or MiBusiness Registry before filing.",
        sourceIndexes: [1, 3],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1]
      })
    ]
  }),
  "/tools/utah/annual-renewal-deadline/": decisionTool({
    caseLabel: "Which Utah renewal lane fits best?",
    intro:
      "Utah's core answer is anniversary-based, but the real trap is assuming every lapsed entity can simply reinstate. Start with the entity type and whether the business is already out of good status.",
    cases: [
      decisionCase({
        value: "corporation-or-llc",
        label: "Corporation, nonprofit, or LLC in good standing",
        deadline: "One year from registration and annually thereafter",
        amount: "$18 renewal fee, plus a $10 late fee if the filing is late",
        normalRule:
          "Utah corporations, nonprofits, and LLCs use the anniversary-date annual renewal lane and the current fee schedule puts them in the $18 renewal-fee lane.",
        lateRule:
          "Utah's current fee schedule adds the $10 late renewal fee when the filing slips past the due date.",
        confirmRule:
          "Confirm the exact anniversary date and whether the entity is still in good standing before using the standard renewal answer.",
        nextAction:
          "Use the official Utah renewal process or business portal before paying.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [2, 3],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "lp-or-llp",
        label: "LP or LLP",
        deadline: "One year from registration and annually thereafter",
        amount: "$18 renewal fee, plus a $10 late fee if the filing is late",
        normalRule:
          "Utah LPs and LLPs stay in the same anniversary-based renewal cycle and use the published fee schedule instead of a separate annual-report fee table.",
        lateRule:
          "The same $10 late renewal fee applies if the renewal is late, so the practical next step is to renew through the official Utah path before other issues pile up.",
        confirmRule:
          "Confirm the entity type and exact anniversary date before filing, especially if the record changed recently.",
        nextAction:
          "Use Utah's renewal process and fee schedule together before paying.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [2, 3],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "foreign-or-lapsed-entity",
        label: "Foreign entity or already lapsed record",
        deadline: "Resolve the status issue as soon as possible",
        amount: "Do not assume the normal renewal answer applies",
        normalRule:
          "If the record is already lapsed, the normal annual renewal answer may not be enough because Utah splits ordinary renewals from reinstatement work.",
        lateRule:
          "Utah says foreign entities cannot reinstate, so a lapsed foreign record needs closer status review before any payment is sent.",
        confirmRule:
          "Confirm whether the entity is domestic or foreign and whether Utah still shows the record as renewable instead of terminated.",
        nextAction:
          "Use Utah's reinstatement FAQ and official help pages before paying or mailing anything.",
        sourceIndexes: [4, 5],
        lateSourceIndexes: [4, 5, 6],
        confirmSourceIndexes: [2, 4, 5]
      })
    ]
  })
};
