const STANDARD_STATUSES = [
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
];

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
    statuses: STANDARD_STATUSES,
    cases
  };
}

export const extraExpansionStatePages = [
  {
    filePath: "tools/louisiana/annual-report-deadline/index.html",
    titleTag: "Louisiana Annual Report Fee and Due Date | FinLogic Hub",
    metaDescription:
      "Louisiana annual report fee and due date guidance covering the 30-day renewal window, current fee lanes, revocation timing, and official geauxBIZ filing paths.",
    canonicalUrl: "https://finlogichub5.com/tools/louisiana/annual-report-deadline/",
    ogTitle: "Louisiana Annual Report Fee and Due Date | FinLogic Hub",
    ogDescription:
      "Review Louisiana annual report renewal timing, current fees, revocation rules, and official geauxBIZ filing paths using Louisiana Secretary of State sources.",
    state: "Louisiana",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Louisiana annual report", href: null }
    ],
    heroTitle: "Louisiana annual report fee and due date",
    heroSubtitle:
      "Use this page if you need the Louisiana annual report deadline or fee. Start with the renewal date shown on the business record, because Louisiana only opens the online annual report within 30 days of that renewal date.",
    heroActions: [
      {
        href: "https://www.sos.la.gov/BusinessServices/FileBusinessDocuments/FileAnnualReport/Pages/default.aspx",
        label: "Open official annual report page",
        variant: "primary"
      },
      {
        href: "https://www.sos.la.gov/businessservices/filebusinessdocuments/getformsandfeeschedule/pages/default.aspx?PF=1",
        label: "Check current fee schedule",
        variant: "secondary"
      }
    ],
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Louisiana Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Core filing window",
        text: "Louisiana only opens online annual report filing within 30 days of the renewal date."
      },
      {
        label: "Common fee lane",
        text: "$30 for most corporations, LLCs, and partnerships, or $10 for domestic nonprofit annual reports."
      },
      {
        label: "Revocation path",
        text: "Louisiana entities can be revoked after three missed annual reports, while foreign entities can be revoked after one missed annual report."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Louisiana is one of the states where the filing window and the revocation rule matter
              almost as much as the fee. Start with the renewal date instead of guessing from the
              calendar.
            </p>`,
    caseCards: [
      {
        label: "Domestic corporation or LLC",
        title: "Most Louisiana domestic annual reports start with the $30 lane",
        text: "Domestic business corporations and LLCs commonly use the $30 annual report lane, but the filing can only be opened in the 30-day window tied to the renewal date."
      },
      {
        label: "Domestic nonprofit",
        title: "Lower fee, but the annual report still has to be filed",
        text: "Louisiana domestic nonprofit corporations use the lower $10 annual report fee, and the state still expects the report every year even if nothing changed."
      },
      {
        label: "Foreign corporation or LLC",
        title: "The fee may be the same, but the late risk is not",
        text: "Foreign corporations and foreign LLCs still use the $30 annual report lane, but Louisiana says foreign entities can be revoked after one missed annual report."
      },
      {
        label: "Revocation notice",
        title: "A mailed notice means the cleanup clock is already running",
        text: "Louisiana's FAQ says a notice of intent to revoke generally gives Louisiana entities 30 days to respond and foreign corporations or LLCs 60 days."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sos.la.gov/BusinessServices/FileBusinessDocuments/FileAnnualReport/Pages/default.aspx",
        label: "Louisiana SOS file annual report page"
      },
      {
        href: "https://www.sos.la.gov/businessservices/filebusinessdocuments/getformsandfeeschedule/pages/default.aspx?PF=1",
        label: "Louisiana SOS current forms and fee schedule"
      },
      {
        href: "https://www.sos.la.gov/BusinessServices/HTMLPages/AnnualReportFilingInstructions.htm",
        label: "Louisiana annual report filing instructions"
      },
      {
        href: "https://www.sos.la.gov/BusinessServices/FileBusinessDocuments/FrequentlyAskedQuestions/Pages/default.aspx?OwnershipName=FileBusinessDocuments&faqid=0",
        label: "Louisiana business filing FAQs"
      },
      {
        href: "https://www.sos.la.gov/BusinessServices/HTMLPages/AboutQuarterlyRevocationList.htm",
        label: "Louisiana quarterly revocation list explanation"
      },
      {
        href: "https://www.sos.la.gov/BusinessServices/FileBusinessDocuments/Pages/default.aspx",
        label: "Louisiana commercial online filing page"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/mississippi/annual-report-deadline/index.html",
    titleTag: "Mississippi Annual Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Mississippi annual report fee and deadline guidance covering April 15 and May 15 due dates, domestic and foreign fee splits, online filing, and administrative dissolution or reinstatement rules.",
    canonicalUrl: "https://finlogichub5.com/tools/mississippi/annual-report-deadline/",
    ogTitle: "Mississippi Annual Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Mississippi annual report due dates, entity-specific fees, online filing rules, and scam-warning guidance using Mississippi Secretary of State sources.",
    state: "Mississippi",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Mississippi annual report", href: null }
    ],
    heroTitle: "Mississippi annual report fee and deadline",
    heroSubtitle:
      "Use this page if you need the Mississippi annual report deadline or fee. Start with the entity type and whether the record is domestic or foreign, because Mississippi uses different fee lanes even though the filing stays online-only.",
    heroActions: [
      {
        href: "https://www.sos.ms.gov/business-services/annual-reports",
        label: "Open official annual report page",
        variant: "primary"
      },
      {
        href: "https://www.sos.ms.gov/content/documents/Business/FeeSchedule.pdf",
        label: "Check official fee schedule",
        variant: "secondary"
      }
    ],
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Mississippi Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Main due dates",
        text: "Corporations and LLCs can file on or after January 1 and are due April 15. Nonprofit annual reports are due May 15."
      },
      {
        label: "Big fee split",
        text: "$0 domestic LLC, $25 Mississippi business corporation annual report, $0 nonprofit annual report, or $250 foreign LLC annual report."
      },
      {
        label: "Late-state risk",
        text: "Failure to file can lead to administrative dissolution, and reinstatement can require separate fees plus tax-clearance steps for some entities."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Mississippi is a useful page to double-check because the due-date pattern looks simple,
              but the fee answer changes quickly between domestic LLCs, corporations, nonprofits,
              and foreign LLCs.
            </p>`,
    caseCards: [
      {
        label: "Domestic LLC",
        title: "The official Mississippi annual report filing path is free",
        text: "Mississippi domestic LLCs can file the annual report online at no cost, but they still have to clear the April 15 deadline to avoid status trouble."
      },
      {
        label: "Profit corporation",
        title: "The common corporation lane uses the $25 annual report fee",
        text: "Mississippi business corporations stay in the April 15 lane, but the annual report is not free like the domestic LLC filing."
      },
      {
        label: "Nonprofit corporation",
        title: "Nonprofits use the May 15 lane and a zero-dollar filing",
        text: "Mississippi nonprofit corporations now file annual reports too, but the due date and fee lane are different from the standard business-entity answer."
      },
      {
        label: "Foreign LLC",
        title: "The foreign LLC fee is the one people most often miss",
        text: "Mississippi's fee schedule puts foreign LLC annual reports in the higher $250 lane, so this record needs a deliberate fee check before payment."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sos.ms.gov/business-services/annual-reports",
        label: "Mississippi annual reports page"
      },
      {
        href: "https://www.sos.ms.gov/content/documents/Business/FeeSchedule.pdf",
        label: "Mississippi business fee schedule PDF"
      },
      {
        href: "https://www.sos.ms.gov/business-services-regulation",
        label: "Mississippi business services and regulation page"
      },
      {
        href: "https://www.sos.ms.gov/index.php/business-services/faqs",
        label: "Mississippi business services FAQs"
      },
      {
        href: "https://www.sos.ms.gov/press/new-nonprofit-annual-report-filing-requirement",
        label: "Mississippi nonprofit annual report requirement notice"
      },
      {
        href: "https://www.sos.ms.gov/press/warning-misleading-annual-report-mailers",
        label: "Mississippi warning on misleading annual report mailers"
      },
      {
        href: "https://corp.sos.ms.gov/corp/portal/c/portal.aspx",
        label: "Mississippi online business filing portal"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/wisconsin/annual-report-deadline/index.html",
    titleTag: "Wisconsin Annual Report Fee and Due Date | FinLogic Hub",
    metaDescription:
      "Wisconsin annual report fee and due date guidance covering anniversary-quarter timing, March 31 foreign-entity deadlines, domestic and foreign fee splits, and delinquency rules.",
    canonicalUrl: "https://finlogichub5.com/tools/wisconsin/annual-report-deadline/",
    ogTitle: "Wisconsin Annual Report Fee and Due Date | FinLogic Hub",
    ogDescription:
      "Review Wisconsin annual report timing, domestic and foreign fee lanes, filing portals, and delinquency or revocation rules using Wisconsin DFI sources.",
    state: "Wisconsin",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Wisconsin annual report", href: null }
    ],
    heroTitle: "Wisconsin annual report fee and due date",
    heroSubtitle:
      "Use this page if you need the Wisconsin annual report deadline or fee. Start with whether the entity is domestic or foreign, because domestic entities file in the anniversary quarter while foreign entities use the March 31 lane.",
    heroActions: [
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/FAQ.aspx",
        label: "Open official annual report FAQ",
        variant: "primary"
      },
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/Fees.aspx",
        label: "Check official fee table",
        variant: "secondary"
      }
    ],
    lastReviewed: "April 18, 2026",
    sourceBadge: "Source: Wisconsin Department of Financial Institutions",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Core due rule",
        text: "Domestic entities file by the end of the quarter of the anniversary date. Foreign entities file by March 31."
      },
      {
        label: "Common fee split",
        text: "$25 online or $40 paper for many domestic corporations, LLCs, and nonstock corporations, or $65 online and $80 paper for many foreign entities."
      },
      {
        label: "Late path",
        text: "Wisconsin does not use late fees or penalties for annual reports, but delinquent entities can be administratively dissolved and foreign entities can be revoked."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Wisconsin is a good example of a state where the due date changes by domestic versus
              foreign status, while the real late-state pain is delinquency or revocation rather
              than a flat penalty amount.
            </p>`,
    caseCards: [
      {
        label: "Domestic corporation or LLC",
        title: "Domestic entities use the anniversary-quarter lane",
        text: "Wisconsin domestic business corporations and domestic LLCs file annual reports by the end of the quarter of the anniversary date, and the current online fee is commonly $25."
      },
      {
        label: "Foreign entity",
        title: "Foreign entities stay on the March 31 lane",
        text: "Wisconsin foreign corporations and foreign LLCs do not use the domestic anniversary-quarter rule. Their annual report deadline is March 31."
      },
      {
        label: "Delinquent record",
        title: "No late fee does not mean no risk",
        text: "Wisconsin says delinquent entities can often cure the problem by filing the annual report and paying back annual report fees, but long-running delinquencies can still lead to dissolution or revocation."
      }
    ],
    sourceLinks: [
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/FAQ.aspx",
        label: "Wisconsin DFI annual report FAQ"
      },
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/Fees.aspx",
        label: "Wisconsin DFI business entity fees"
      },
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/FileOnline.aspx",
        label: "Wisconsin DFI online filing guidance"
      },
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/AdministrativeDissolutions.aspx",
        label: "Wisconsin DFI administrative dissolutions guidance"
      },
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/OSB.aspx",
        label: "Wisconsin One Stop Business Portal annual report guidance"
      },
      {
        href: "https://dfi.wi.gov/Pages/BusinessServices/BusinessEntities/SuspiciousNotices.aspx",
        label: "Wisconsin DFI suspicious notices and solicitations warning"
      }
    ],
    scriptSrc: null
  }
];

export const extraExpansionStateDirectory = [
  {
    state: "Louisiana",
    route: "/tools/louisiana/annual-report-deadline/",
    guideLabel: "Louisiana annual report fee and due date",
    chipLabel: "Louisiana annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Renewal-date filing window, current $30 and $10 fee lanes, and revocation timing for domestic and foreign entities.",
    directoryCardDescription:
      "Louisiana annual report timing, current domestic and nonprofit fee lanes, revocation rules, and geauxBIZ filing path.",
    homeComparison: {
      focus: "Louisiana domestic corporation or LLC",
      deadline: "Within 30 days of the renewal date shown on the business record",
      fee: "$30 for most domestic and foreign corporations or LLCs, or $10 for domestic nonprofits",
      lateRule:
        "Louisiana entities can be revoked after three missed reports; foreign entities can be revoked after one missed report"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Domestic and foreign corporations, LLCs, nonprofits, and partnerships",
      deadline: "File within 30 days of the renewal date shown on the Louisiana business record",
      amount: "$30 for most annual reports or $10 for domestic nonprofit annual reports"
    }
  },
  {
    state: "Mississippi",
    route: "/tools/mississippi/annual-report-deadline/",
    guideLabel: "Mississippi annual report fee and deadline",
    chipLabel: "Mississippi annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "April 15 and May 15 due dates, domestic-versus-foreign fee splits, online-only filing, and reinstatement risks.",
    directoryCardDescription:
      "Mississippi annual report timing, online-only filing path, nonprofit rollout, and fee differences for corporations, domestic LLCs, and foreign LLCs.",
    homeComparison: {
      focus: "Mississippi domestic LLC",
      deadline: "File on or after January 1 and no later than April 15; nonprofits use May 15",
      fee: "$0 domestic LLC, $25 business corporation, $0 nonprofit, or $250 foreign LLC",
      lateRule:
        "Administrative dissolution can follow a missed report, and reinstatement can add separate fees and tax-clearance work"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus:
        "Business corporations, LLCs, nonprofit corporations, and selected foreign entities using the Mississippi annual report lane",
      deadline: "April 15 for corporations and LLCs, or May 15 for nonprofit annual reports",
      amount: "$0 domestic LLC, $25 business corporation, $0 nonprofit, or $250 foreign LLC"
    }
  },
  {
    state: "Wisconsin",
    route: "/tools/wisconsin/annual-report-deadline/",
    guideLabel: "Wisconsin annual report fee and due date",
    chipLabel: "Wisconsin annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Domestic anniversary-quarter timing, March 31 foreign-entity deadline, fee splits, and delinquency rules without a flat late fee.",
    directoryCardDescription:
      "Wisconsin annual report timing, domestic and foreign fee lanes, filing-portal choices, and dissolution or revocation path.",
    homeComparison: {
      focus: "Wisconsin domestic corporation or LLC",
      deadline: "By the end of the quarter of the anniversary date, or March 31 for foreign entities",
      fee:
        "$25 online or $40 paper for many domestic corporations and LLCs, or $65 online and $80 paper for many foreign entities",
      lateRule:
        "No flat late fee or penalty, but delinquent entities can be administratively dissolved and foreign entities can be revoked"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus:
        "Domestic and foreign corporations, LLCs, nonstock corporations, LLPs, and LPs using Wisconsin annual reports",
      deadline:
        "By the end of the anniversary quarter for domestic entities, or by March 31 for foreign entities",
      amount:
        "$25 online or $40 paper for many domestic filers, or $65 online and $80 paper for many foreign filers"
    }
  }
];

export const extraExpansionStructuredStateContentByFilePath = {
  "tools/louisiana/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee and entity split",
      title: "Louisiana annual report fees start with the entity lane",
      headers: ["Entity type", "Core timing rule", "Published amount", "What to watch"],
      rows: [
        [
          "Domestic corporation or LLC",
          "Within 30 days of the renewal date shown on the business record",
          "$30",
          "The online annual report only opens in the 30-day filing window."
        ],
        [
          "Domestic nonprofit corporation",
          "Within 30 days of the renewal date shown on the business record",
          "$10",
          "The annual report is still required every year even if no information changed."
        ],
        [
          "Foreign corporation, foreign LLC, or foreign partnership",
          "Within 30 days of the renewal date shown on the business record",
          "$30",
          "Foreign entities do not get the same missed-report tolerance as Louisiana entities."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and revocation path",
      title: "Louisiana moves from missed reports to revocation in a predictable pattern",
      cards: [
        {
          title: "Louisiana entities get more runway than foreign entities",
          text: "Louisiana's quarterly revocation explanation says Louisiana entities can be revoked after three consecutive annual reports are not filed, while foreign entities can be revoked after one missed annual report."
        },
        {
          title: "A notice of intent to revoke shortens the decision window",
          text: "The Louisiana FAQ says a Louisiana entity that receives a notice of intent to revoke generally has 30 days to submit the annual report, while foreign corporations and foreign LLCs generally get 60 days."
        },
        {
          title: "Use the official online path, not a look-alike letter",
          text: "Louisiana's annual report page says annual reports are filed through the Secretary of State path or geauxBIZ. If a mailed solicitation looks unfamiliar, verify it against the official Louisiana site before you pay."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Louisiana filing details",
      headers: ["Question", "Louisiana answer used here"],
      rows: [
        [
          "When does the online filing open?",
          "Louisiana says the annual report can only be filed online within 30 days of the renewal date."
        ],
        [
          "Can you skip the annual report if nothing changed?",
          "No. Louisiana's annual report filing instructions say a completed annual report must be filed each year even when no information has changed."
        ],
        [
          "When can you print the annual report form?",
          "The Louisiana FAQ says the printable annual report form appears if the report is due or up to four weeks before the due date."
        ],
        [
          "Where should you verify the entity record before filing?",
          "Use the Louisiana commercial database and geauxBIZ before relying on the annual report answer or mailing a payment."
        ]
      ]
    }
  ],
  "tools/mississippi/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Mississippi annual report fees change quickly by entity type",
      headers: ["Entity type", "Filing window", "Published amount", "What to watch"],
      rows: [
        [
          "Mississippi business corporation",
          "On or after January 1 through April 15",
          "$25",
          "The annual report is filed online through the Secretary of State portal."
        ],
        [
          "Domestic LLC",
          "On or after January 1 through April 15",
          "$0",
          "The filing is still required even though the official annual report path is free."
        ],
        [
          "Nonprofit corporation",
          "On or after January 1 through May 15",
          "$0",
          "Mississippi nonprofits now file annual reports too, so the due date differs from the business-corporation lane."
        ],
        [
          "Foreign LLC",
          "On or after January 1 through April 15",
          "$250",
          "The foreign LLC fee is the biggest annual-report jump on the Mississippi fee schedule."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and cleanup path",
      title: "Mississippi turns missed annual reports into a status problem fast",
      cards: [
        {
          title: "Administrative dissolution is the main late-state risk",
          text: "Mississippi's annual report page says failure to file may result in administrative dissolution. The practical issue is usually the entity's status, not just the missed filing itself."
        },
        {
          title: "Reinstatement can involve more than one payment",
          text: "Mississippi's fee schedule and FAQ show separate reinstatement fee lanes, and the FAQ says all corporations and certain LLCs seeking reinstatement must also obtain a tax-clearance letter from the Department of Revenue."
        },
        {
          title: "Be careful with mailers that imply a private service is required",
          text: "Mississippi's warning on misleading annual report mailers says domestic LLC annual reports are filed on the official state website at no cost, so private payment letters should be checked carefully before you send money."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Mississippi filing details",
      headers: ["Question", "Mississippi answer used here"],
      rows: [
        [
          "Can every annual report be filed online?",
          "Yes. Mississippi's annual reports page says annual reports are filed only online through the state portal."
        ],
        [
          "What do you need to start the filing?",
          "Mississippi's FAQ says you need the Business ID to file the annual report and can look up the business in the state's online search if needed."
        ],
        [
          "Why does the nonprofit due date look different?",
          "Mississippi's nonprofit notice says annual reports for nonprofits became effective July 1, 2024, and annual report filings became available January 1, 2025 with the May 15 due date."
        ],
        [
          "What should you do before paying a foreign LLC annual report?",
          "Use the current fee schedule and the online entity record together because the foreign LLC annual report fee is not the same as the domestic LLC lane."
        ]
      ]
    }
  ],
  "tools/wisconsin/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Timing and fee split",
      title: "Wisconsin annual reports separate domestic and foreign filing lanes",
      headers: ["Entity type", "Core due rule", "Common fee lane", "What to watch"],
      rows: [
        [
          "Domestic business corporation or domestic LLC",
          "By the end of the quarter of the anniversary date",
          "$25 online or $40 paper",
          "Domestic business corporations and domestic LLCs can use the One Stop Business Portal."
        ],
        [
          "Domestic nonstock corporation",
          "By the end of the quarter of the anniversary date",
          "$25 online or $40 paper",
          "Nonstock corporations stay on the Wisconsin DFI path rather than the One Stop Business Portal lane."
        ],
        [
          "Foreign corporation or foreign LLC",
          "March 31 each year",
          "$65 online or $80 paper",
          "Foreign entities do not use the anniversary-quarter timing rule."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and delinquent path",
      title: "Wisconsin treats annual report misses as a delinquency problem, not a late-fee problem",
      cards: [
        {
          title: "No flat late fee is the unusual part",
          text: "Wisconsin's FAQ says there are no late fees or penalties for annual reports. That is helpful, but it does not remove the need to fix the filing quickly."
        },
        {
          title: "Delinquencies can still end in dissolution or revocation",
          text: "Wisconsin's FAQ and administrative-dissolution page say delinquent entities can often cure the issue by filing the report and paying back annual report fees, but longer-running problems can still lead to dissolution or revocation."
        },
        {
          title: "Be skeptical of notices that look official but are not",
          text: "Wisconsin DFI warns that deceptive annual report solicitations exist and that businesses should verify notices on the official DFI website before sending payment."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Wisconsin annual report details",
      headers: ["Question", "Wisconsin answer used here"],
      rows: [
        [
          "Will Wisconsin remind you when the report is coming due?",
          "Wisconsin says it continues to notify businesses by email on a quarterly basis when annual reports are due in the following quarter."
        ],
        [
          "Which entities use the One Stop Business Portal?",
          "Wisconsin says domestic business corporations, domestic close corporations, and domestic LLCs file annual reports through the One Stop Business Portal."
        ],
        [
          "Where do other entities file?",
          "Wisconsin says other annual report filers stay on the Wisconsin DFI website instead of the One Stop Business Portal."
        ],
        [
          "What if you accidentally start in the wrong filing system?",
          "Wisconsin says users are automatically redirected if they start from the old route, but it is still safest to begin from the current DFI filing page or the One Stop Business Portal page."
        ]
      ]
    }
  ]
};

export const extraExpansionGuideEvidenceByRoute = {
  "/tools/louisiana/annual-report-deadline/": {
    filingLabel: [1, 3, 4],
    whoShouldUse: [1, 4, 5],
    headlineDueDate: [3, 4, 5],
    mainAmountShown: [2],
    ifAlreadyLate: [4, 5]
  },
  "/tools/mississippi/annual-report-deadline/": {
    filingLabel: [1, 4],
    whoShouldUse: [1, 4, 5],
    headlineDueDate: [1, 4, 5],
    mainAmountShown: [2, 3, 5, 6],
    ifAlreadyLate: [1, 2, 4, 5]
  },
  "/tools/wisconsin/annual-report-deadline/": {
    filingLabel: [1, 3],
    whoShouldUse: [1, 3, 5],
    headlineDueDate: [1, 5],
    mainAmountShown: [2],
    ifAlreadyLate: [1, 4, 6]
  }
};

export const extraExpansionGuideDecisionToolByRoute = {
  "/tools/louisiana/annual-report-deadline/": decisionTool({
    caseLabel: "Which Louisiana annual report lane fits best?",
    intro:
      "Louisiana's main trap is assuming there is a single statewide deadline. The timing is tied to the renewal date, and the missed-report risk changes sharply between Louisiana and foreign entities.",
    cases: [
      decisionCase({
        value: "domestic-corporation-or-llc",
        label: "Domestic corporation or LLC",
        deadline: "Within 30 days of the renewal date shown on the business record",
        amount: "$30",
        normalRule:
          "Louisiana domestic corporations and LLCs commonly use the $30 annual report lane, and the online annual report opens only within 30 days of the renewal date.",
        lateRule:
          "If a Louisiana entity keeps missing annual reports, the state says it can be revoked after three consecutive missed filings, and a notice of intent to revoke means the response window is already short.",
        confirmRule:
          "Confirm the renewal date on the Louisiana business record before relying on the timing answer, because Louisiana does not use one fixed statewide calendar deadline.",
        nextAction:
          "Use the Louisiana annual report page or geauxBIZ once the 30-day filing window opens.",
        sourceIndexes: [1, 2, 3, 6],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [3, 4]
      }),
      decisionCase({
        value: "domestic-nonprofit",
        label: "Domestic nonprofit corporation",
        deadline: "Within 30 days of the renewal date shown on the business record",
        amount: "$10",
        normalRule:
          "Louisiana domestic nonprofit corporations still file annual reports every year, but the current annual report fee is the lower $10 lane instead of the standard $30 amount.",
        lateRule:
          "A nonprofit that ignores the annual report can still move into Louisiana's revocation path, even though the filing fee is lower.",
        confirmRule:
          "Confirm that the entity is a domestic nonprofit corporation before using the $10 answer.",
        nextAction:
          "Use the Louisiana fee schedule, FAQ, and geauxBIZ filing path before paying.",
        sourceIndexes: [2, 3, 4, 6],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [2, 4]
      }),
      decisionCase({
        value: "foreign-corporation-or-llc",
        label: "Foreign corporation or foreign LLC",
        deadline: "Within 30 days of the renewal date shown on the business record",
        amount: "$30",
        normalRule:
          "Louisiana's current fee schedule puts foreign corporations and foreign LLCs in the $30 annual report lane, and the online annual report still opens only in the 30-day renewal window.",
        lateRule:
          "Louisiana says foreign entities can be revoked after one missed annual report, and the FAQ says foreign corporations and foreign LLCs generally get 60 days if a notice of intent to revoke is issued.",
        confirmRule:
          "Confirm that the record is foreign-qualified before using the foreign late-rule answer.",
        nextAction:
          "Use the commercial database and geauxBIZ, then clear the report before the foreign revocation window closes.",
        sourceIndexes: [2, 3, 6],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [4, 5]
      }),
      decisionCase({
        value: "received-revocation-notice",
        label: "Already received a notice of intent to revoke",
        deadline: "Usually 30 days from notice for Louisiana entities, or 60 days for foreign corporations or LLCs",
        amount: "Annual report fee first, then higher reinstatement costs if revocation already happened",
        normalRule:
          "Once Louisiana has already issued a notice of intent to revoke, the normal annual report answer is no longer enough by itself.",
        lateRule:
          "Use the notice date immediately. Louisiana's FAQ says the ordinary response window is 30 days for Louisiana entities and 60 days for foreign corporations or LLCs.",
        confirmRule:
          "Check the notice date and the entity type before paying so you know whether you are still inside the response window or already in the reinstatement lane.",
        nextAction:
          "Use the Louisiana FAQ, revocation guidance, and geauxBIZ or the printable annual report form right away.",
        sourceIndexes: [4, 5, 6],
        lateSourceIndexes: [4, 5, 6],
        confirmSourceIndexes: [4, 5]
      })
    ]
  }),
  "/tools/mississippi/annual-report-deadline/": decisionTool({
    caseLabel: "Which Mississippi annual report lane fits best?",
    intro:
      "Mississippi looks simple on the surface because the filing is online-only, but the actual fee and due-date answer changes immediately between corporations, domestic LLCs, nonprofits, and foreign LLCs.",
    cases: [
      decisionCase({
        value: "profit-corporation",
        label: "Profit corporation",
        deadline: "On or after January 1 and no later than April 15",
        amount: "$25",
        normalRule:
          "Mississippi business corporations use the standard April 15 annual report lane and the current $25 annual report fee.",
        lateRule:
          "If the Mississippi corporation annual report is not filed, the state says failure to file may result in administrative dissolution and the business may have to work through reinstatement later.",
        confirmRule:
          "Confirm that the record is a business corporation and not a nonprofit or LLC before using the $25 answer.",
        nextAction:
          "Use the Mississippi annual reports page and online filing portal before paying.",
        sourceIndexes: [1, 2, 4, 7],
        lateSourceIndexes: [1, 2, 4],
        confirmSourceIndexes: [1, 2, 4]
      }),
      decisionCase({
        value: "domestic-llc",
        label: "Domestic LLC",
        deadline: "On or after January 1 and no later than April 15",
        amount: "$0",
        normalRule:
          "Mississippi domestic LLC annual reports are filed online through the official state website at no cost, but they still use the April 15 deadline.",
        lateRule:
          "A no-cost Mississippi LLC annual report can still turn into an administrative-dissolution problem if the filing is ignored. Do not let a private mailer distract you from the official state path.",
        confirmRule:
          "Confirm that the record is domestic and not foreign before relying on the zero-dollar answer.",
        nextAction:
          "Use the official Mississippi annual report portal and verify the Business ID before filing.",
        sourceIndexes: [1, 2, 3, 6, 7],
        lateSourceIndexes: [1, 2, 6],
        confirmSourceIndexes: [2, 3, 6]
      }),
      decisionCase({
        value: "nonprofit-corporation",
        label: "Nonprofit corporation",
        deadline: "On or after January 1 and no later than May 15",
        amount: "$0",
        normalRule:
          "Mississippi nonprofit corporations now file annual reports too, but the due date is May 15 and the current annual report lane is zero-dollar.",
        lateRule:
          "A Mississippi nonprofit that misses the annual report can still move into the same administrative-dissolution path if the filing remains unresolved.",
        confirmRule:
          "Confirm that the entity is a nonprofit corporation before using the May 15 and zero-dollar answer.",
        nextAction:
          "Use the Mississippi annual reports page, the nonprofit notice, and the online portal before filing.",
        sourceIndexes: [1, 4, 5, 7],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [4, 5]
      }),
      decisionCase({
        value: "foreign-llc",
        label: "Foreign LLC",
        deadline: "On or after January 1 and no later than April 15",
        amount: "$250",
        normalRule:
          "Mississippi's fee schedule puts foreign LLC annual reports in the current $250 lane, even though the filing still follows the annual report path used by other business entities.",
        lateRule:
          "If a foreign LLC annual report is missed, Mississippi can still move the entity toward administrative dissolution or later reinstatement work.",
        confirmRule:
          "Confirm that the LLC is foreign-qualified before paying, because the domestic LLC annual report lane is a zero-dollar filing.",
        nextAction:
          "Use the Mississippi fee schedule and the official filing portal together before sending payment.",
        sourceIndexes: [1, 2, 7],
        lateSourceIndexes: [1, 2],
        confirmSourceIndexes: [2, 7]
      }),
      decisionCase({
        value: "reinstatement-needed",
        label: "Already dissolved or reinstating",
        deadline: "Resolve the status issue as soon as possible",
        amount:
          "Reinstatement fees commonly start at $50 on domestic lanes and $100 on foreign lanes, plus tax clearance for some entities",
        normalRule:
          "Once Mississippi has already pushed the entity out of normal filing status, the annual report fee answer by itself is no longer enough.",
        lateRule:
          "Mississippi's fee schedule lists separate reinstatement fees, and the FAQ says all corporations and certain LLCs must obtain a tax-clearance letter to reinstate.",
        confirmRule:
          "Confirm whether the entity only needs the annual report or also needs reinstatement and tax clearance before you pay.",
        nextAction:
          "Use the Mississippi fee schedule, FAQ, and business portal first so you can choose the correct reinstatement lane.",
        sourceIndexes: [2, 4, 7],
        lateSourceIndexes: [2, 4, 7],
        confirmSourceIndexes: [2, 4]
      })
    ]
  }),
  "/tools/wisconsin/annual-report-deadline/": decisionTool({
    caseLabel: "Which Wisconsin annual report lane fits best?",
    intro:
      "Wisconsin's big split is domestic versus foreign. The fee lane and deadline both move, and the late-state risk is delinquency or revocation rather than a flat penalty.",
    cases: [
      decisionCase({
        value: "domestic-corporation-or-llc",
        label: "Domestic corporation or domestic LLC",
        deadline: "By the end of the quarter of the anniversary date",
        amount: "$25 online or $40 paper",
        normalRule:
          "Wisconsin domestic business corporations and domestic LLCs file annual reports by the end of the quarter of the anniversary date, and the common online fee lane is $25.",
        lateRule:
          "Wisconsin says there is no flat late fee or penalty, but delinquent domestic entities can still move toward administrative dissolution if the annual report problem is left unresolved.",
        confirmRule:
          "Confirm that the entity is domestic and that you are using the anniversary quarter, not the March 31 foreign-entity rule.",
        nextAction:
          "Use the Wisconsin FAQ, fee table, and the current online filing path or One Stop Business Portal before filing.",
        sourceIndexes: [1, 2, 3, 5],
        lateSourceIndexes: [1, 4],
        confirmSourceIndexes: [1, 5]
      }),
      decisionCase({
        value: "foreign-corporation-or-llc",
        label: "Foreign corporation or foreign LLC",
        deadline: "March 31",
        amount: "$65 online or $80 paper",
        normalRule:
          "Wisconsin foreign corporations and foreign LLCs do not use the anniversary-quarter rule. Their annual report deadline is March 31 and the common foreign fee lane is higher than the domestic amount.",
        lateRule:
          "Wisconsin's FAQ says foreign entities that fail to file within four months of March 31 may be revoked, so a missed foreign annual report should be treated as urgent.",
        confirmRule:
          "Confirm that the record is foreign-qualified before relying on the March 31 and higher-fee answer.",
        nextAction:
          "Use the Wisconsin DFI annual report FAQ and filing page before paying.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [1, 4],
        confirmSourceIndexes: [1, 3]
      }),
      decisionCase({
        value: "already-delinquent",
        label: "Already delinquent or facing dissolution or revocation",
        deadline: "Resolve the annual report issue as soon as possible",
        amount: "Back annual report fees may apply even though Wisconsin does not use a late penalty",
        normalRule:
          "Once a Wisconsin entity is already delinquent, the ordinary annual report timing answer is not enough by itself.",
        lateRule:
          "Wisconsin says many delinquent entities can cure the problem by filing the report and paying back annual report fees, but longer-running problems can still result in dissolution or revocation.",
        confirmRule:
          "Check the Wisconsin entity record and the official DFI warning pages so you know whether you are clearing a simple delinquency or responding to something more serious.",
        nextAction:
          "Use the Wisconsin DFI annual report FAQ, administrative-dissolution guidance, and official filing path before sending payment.",
        sourceIndexes: [1, 4, 6],
        lateSourceIndexes: [1, 4, 6],
        confirmSourceIndexes: [4, 6]
      })
    ]
  })
};
