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

export const mayExpansionStatePages = [
  {
    filePath: "tools/alabama/business-privilege-tax-deadline/index.html",
    titleTag: "Alabama Business Privilege Tax and Annual Report Deadline | FinLogic Hub",
    metaDescription:
      "Alabama business privilege tax deadline guidance covering the post-2024 filing split, the $100-or-less exemption, initial-return timing, and the separate SOS corporation annual report window.",
    canonicalUrl: "https://finlogichub5.com/tools/alabama/business-privilege-tax-deadline/",
    ogTitle: "Alabama Business Privilege Tax and Annual Report Deadline | FinLogic Hub",
    ogDescription:
      "Review Alabama business privilege tax due dates, the $100-or-less exemption, initial-return timing, and the separate corporation annual report rule using Alabama Department of Revenue and Secretary of State sources.",
    state: "Alabama",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Alabama business privilege tax", href: null }
    ],
    heroTitle: "Alabama business privilege tax deadline and corporation annual report",
    heroSubtitle:
      "Use this page if you need the recurring Alabama filing rule. Start by separating the Alabama Department of Revenue business privilege tax from the Secretary of State corporation annual report, because those steps split apart beginning January 1, 2024.",
    heroActions: [
      {
        href: "https://www.revenue.alabama.gov/notice-important-changes-to-the-2024-business-privilege-tax-filing-requirements/",
        label: "Open 2024 filing-change notice",
        variant: "primary"
      },
      {
        href: "https://www.sos.alabama.gov/sites/default/files/2023-12/AnnualReport.pdf",
        label: "Check SOS annual report form",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Alabama Department of Revenue and Alabama Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Main tax timing",
        text: "With limited exceptions, Alabama business privilege tax filing follows the corresponding federal return due date, while the initial BPT-IN return is due within two and one-half months."
      },
      {
        label: "2024 exemption change",
        text: "For tax years beginning after December 31, 2023, taxpayers whose computed Alabama business privilege tax is $100 or less are not required to file the BPT return."
      },
      {
        label: "Corporation annual report lane",
        text: "Domestic and foreign for-profit corporations and professional corporations file a separate $10 Secretary of State annual report between January 1 and March 15."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Alabama is one of the least intuitive states in this set because the recurring answer
              split in 2024. The tax filing and the corporation annual report no longer live in the
              same step.
            </p>`,
    caseCards: [
      {
        label: "Business or professional corporation",
        title: "Many corporations now have two recurring Alabama tasks",
        text: "Covered corporations often need both the Alabama business privilege tax filing with ADOR and the separate $10 Secretary of State annual report window."
      },
      {
        label: "LLC, S corporation, or other pass-through lane",
        title: "Most non-corporate Alabama entities stay in the BPT lane",
        text: "Alabama LLCs, many S corporations, and other pass-through or disregarded entities usually focus on the business privilege tax filing and do not use the corporation annual report form."
      },
      {
        label: "Initial filing",
        title: "The first Alabama BPT return has its own clock",
        text: "The initial Alabama business privilege tax return is due within two and one-half months after organization or qualification, and ADOR says the initial return does not get an extension."
      },
      {
        label: "Low-tax-due filer",
        title: "A small tax answer may remove the BPT filing entirely",
        text: "For tax years beginning after December 31, 2023, Alabama says taxpayers whose business privilege tax computes to $100 or less do not have to file the BPT return."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.revenue.alabama.gov/notice-important-changes-to-the-2024-business-privilege-tax-filing-requirements/",
        label: "Alabama DOR 2024 business privilege tax filing-change notice"
      },
      {
        href: "https://www.revenue.alabama.gov/faq-categories/business-privilege-tax/",
        label: "Alabama DOR business privilege tax FAQs"
      },
      {
        href: "https://www.revenue.alabama.gov/faqs/what-taxpayers-must-file-an-alabama-business-privilege-tax-return/",
        label: "Alabama DOR who must file a business privilege tax return"
      },
      {
        href: "https://www.sos.alabama.gov/sites/default/files/2023-12/AnnualReport.pdf",
        label: "Alabama SOS corporation annual report form PDF"
      },
      {
        href: "https://www.sos.alabama.gov/sites/default/files/form-files/FeeSchedule.pdf",
        label: "Alabama SOS business entity fee schedule PDF"
      },
      {
        href: "https://myalabamataxes.alabama.gov/_/",
        label: "My Alabama Taxes filing portal"
      },
      {
        href: "https://www.alabamainteractive.org/sos/",
        label: "Alabama SOS online annual report filing portal"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/alaska/biennial-report-deadline/index.html",
    titleTag: "Alaska Biennial Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Alaska biennial report fee and deadline guidance covering the January 2 and July 2 deadlines, domestic-versus-foreign fee splits, initial-report timing, and involuntary dissolution risk.",
    canonicalUrl: "https://finlogichub5.com/tools/alaska/biennial-report-deadline/",
    ogTitle: "Alaska Biennial Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Alaska biennial report timing, domestic and foreign fee splits, initial-report rules, and involuntary dissolution or revocation risk using Alaska state sources.",
    state: "Alaska",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Alaska biennial report", href: null }
    ],
    heroTitle: "Alaska biennial report fee and deadline",
    heroSubtitle:
      "Use this page if you need the Alaska biennial report due date or filing fee. Start with the entity type, because Alaska uses a January lane for most for-profit businesses and LLCs, a July lane for nonprofits and cooperatives, and a separate initial-report rule for several domestic entities.",
    heroActions: [
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/BiennialReports.aspx",
        label: "Open Alaska biennial report guide",
        variant: "primary"
      },
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/CorpFormsFees/FormsbyEntity.aspx",
        label: "Check forms and fee lanes",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Alaska Division of Corporations, Business and Professional Licensing",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "January lane",
        text: "For-profit corporations, professional corporations, LLCs, and LLPs file by January 2 in the matching odd or even year, with late fees after February 1."
      },
      {
        label: "July lane",
        text: "Nonprofit, religious, and cooperative corporations file by July 2 in the matching odd or even year, with late fees after August 1."
      },
      {
        label: "Common fee split",
        text: "$100 domestic or $200 foreign for many January biennial reports, while nonprofit biennial reports use the $25 lane."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Alaska is easier to get wrong than it looks because the state uses both odd-or-even
              year matching and different winter-versus-summer due dates depending on the entity
              type.
            </p>`,
    caseCards: [
      {
        label: "Domestic corporation, LLC, or LLP",
        title: "Most domestic Alaska business filers use the January lane",
        text: "Domestic business corporations, professional corporations, LLCs, and LLPs generally file by January 2 in the matching odd or even year and use the $100 biennial report lane."
      },
      {
        label: "Foreign corporation, LLC, or LLP",
        title: "Foreign Alaska filers use the same date but a higher fee",
        text: "Foreign business corporations, foreign LLCs, and foreign LLPs also use the January biennial report cycle, but the official fee lane is higher than the domestic amount."
      },
      {
        label: "Nonprofit, religious, or cooperative corporation",
        title: "The Alaska nonprofit lane uses July, not January",
        text: "Nonprofit, religious, and cooperative corporations file in July of the matching odd or even year, with the lower nonprofit fee lane and a separate cooperative amount."
      },
      {
        label: "Initial report or reinstatement",
        title: "The first Alaska filing or a missed report can change the answer",
        text: "Several domestic Alaska entities file a free initial report within six months after creation, while entities that miss one or more biennial reports can move into involuntary dissolution or revocation and need reinstatement work."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/BiennialReports.aspx",
        label: "Alaska biennial reports page"
      },
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/BiennialReportsFAQs.aspx",
        label: "Alaska biennial reports FAQs"
      },
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/CorpFormsFees/FormsbyEntity.aspx",
        label: "Alaska forms by entity and fee lanes"
      },
      {
        href: "https://www.commerce.alaska.gov/web/portals/5/pub/Entity_Responsibility.pdf",
        label: "Alaska notice of the entity's responsibility PDF"
      },
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/ReinstateDissolvedEntity.aspx",
        label: "Alaska reinstatement guidance for dissolved or revoked entities"
      },
      {
        href: "https://www.commerce.alaska.gov/web/cbpl/Corporations/Corporations.aspx",
        label: "Alaska corporations division home and solicitation warning"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/hawaii/annual-report-deadline/index.html",
    titleTag: "Hawaii Annual Business Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Hawaii annual business report fee and deadline guidance covering quarter-based due dates, current online fee lanes, the no-first-year filing rule, and the $10 per-year late fee.",
    canonicalUrl: "https://finlogichub5.com/tools/hawaii/annual-report-deadline/",
    ogTitle: "Hawaii Annual Business Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Hawaii annual business report due-quarter rules, current online filing fees, no-first-year filing rule, and late-fee language using Hawaii DCCA sources.",
    state: "Hawaii",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Hawaii annual business report", href: null }
    ],
    heroTitle: "Hawaii annual business report fee and deadline",
    heroSubtitle:
      "Use this page if you need the Hawaii annual business report due date or fee. Start with the registration quarter, because Hawaii files by quarter rather than one fixed statewide day, and a newly registered entity generally does not file the report in that same year.",
    heroActions: [
      {
        href: "https://hbe.ehawaii.gov/annuals",
        label: "Open Hawaii annual filing portal",
        variant: "primary"
      },
      {
        href: "https://cca.hawaii.gov/breg/first-quarter-hawai%CA%BBi-annual-business-reports-due/",
        label: "Check current filing release",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Hawaii Department of Commerce and Consumer Affairs, Business Registration Division",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Quarter-based timing",
        text: "The report is due by the end of the calendar quarter tied to the entity's registration date: March 31, June 30, September 30, or December 31."
      },
      {
        label: "Common online fee lane",
        text: "$12.50 online for LLCs, profit corporations, and LLPs; $2.50 for nonprofits; and $5.00 for partnerships."
      },
      {
        label: "Late cost",
        text: "Delinquent Hawaii annual business reports can still be filed online, with a $10.00 late fee assessed per delinquent year."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Hawaii is one of the cleaner annual-report states once you stop looking for a single
              statewide date. The practical answer starts with the registration quarter, not the
              anniversary day itself.
            </p>`,
    caseCards: [
      {
        label: "LLC, profit corporation, or LLP",
        title: "Most Hawaii business filers use the $12.50 online lane",
        text: "Hawaii LLCs, profit corporations, and LLPs generally file their annual business reports during the due quarter using the common online fee lane."
      },
      {
        label: "Nonprofit corporation",
        title: "Nonprofits still file annually, but the fee lane is lower",
        text: "Hawaii nonprofits follow the same quarter-based timing rule but use the lower online filing amount published by the Business Registration Division."
      },
      {
        label: "Partnership",
        title: "Partnerships use the same quarter rule with their own fee",
        text: "Hawaii partnerships still track the registration quarter, but the published annual statement fee differs from the corporation and LLC lane."
      },
      {
        label: "New or delinquent filing",
        title: "The first year and late years need different handling",
        text: "If the entity registered in the same year the report would otherwise be due, Hawaii says that filing is not required that year, but older delinquent years add a $10 late fee per year."
      }
    ],
    sourceLinks: [
      {
        href: "https://cca.hawaii.gov/breg/registration/",
        label: "Hawaii registration forms, fees, and information page"
      },
      {
        href: "https://cca.hawaii.gov/breg/first-quarter-hawai%CA%BBi-annual-business-reports-due/",
        label: "Hawaii first-quarter annual business reports due release"
      },
      {
        href: "https://cca.hawaii.gov/wp-content/uploads/2025/12/Form-Fee-Schedule-12-2022.pdf",
        label: "Hawaii business registration form fee schedule PDF"
      },
      {
        href: "https://cca.hawaii.gov/breg/faqs/",
        label: "Hawaii BREG frequently asked questions"
      },
      {
        href: "https://hbe.ehawaii.gov/annuals",
        label: "Hawaii annual business report filing portal"
      }
    ],
    scriptSrc: null
  }
];

export const mayExpansionStateDirectory = [
  {
    state: "Alabama",
    route: "/tools/alabama/business-privilege-tax-deadline/",
    guideLabel: "Alabama business privilege tax and annual report deadline",
    chipLabel: "Alabama BPT split",
    guideType: "Business privilege tax and annual report guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "Post-2024 Alabama filing split, $100-or-less exemption, and the separate January to March SOS corporation annual report lane.",
    directoryCardDescription:
      "Alabama business privilege tax timing, initial-return rules, low-tax-due exemption, and the separate corporation annual report path.",
    homeComparison: {
      focus: "Alabama corporation or LLC",
      deadline: "BPT usually follows the federal return due date; covered corporation annual reports run January 1 to March 15",
      fee: "$10 SOS annual report for covered corporations, plus any Alabama business privilege tax due",
      lateRule: "ADOR delinquency notices warn of interest and penalties, while the SOS annual report uses a separate filing window"
    },
    directoryComparison: {
      obligation: "Business privilege tax return, and sometimes a separate corporation annual report",
      entityFocus:
        "C corporations, S corporations, LLCs, disregarded entities, and covered for-profit or professional corporations",
      deadline:
        "BPT generally follows the corresponding federal due date; initial BPT-IN is due in two and one-half months; covered corporation annual reports file January 1 through March 15",
      amount: "$10 annual report fee for covered corporations, with BPT amounts depending on the entity's Alabama tax computation"
    }
  },
  {
    state: "Alaska",
    route: "/tools/alaska/biennial-report-deadline/",
    guideLabel: "Alaska biennial report fee and deadline",
    chipLabel: "Alaska biennial",
    guideType: "Biennial report guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "January and July Alaska biennial report lanes, domestic-versus-foreign fee splits, and initial-report or reinstatement traps.",
    directoryCardDescription:
      "Alaska biennial report due dates, domestic and foreign fee lanes, initial-report timing, and involuntary dissolution risk.",
    homeComparison: {
      focus: "Alaska domestic LLC or business corporation",
      deadline: "January 2 in the matching odd or even year",
      fee: "$100 domestic biennial report fee",
      lateRule: "Late fees start after February 1 and missed reports can push the entity toward involuntary dissolution or revocation"
    },
    directoryComparison: {
      obligation: "Biennial report",
      entityFocus:
        "Domestic and foreign corporations, LLCs, LLPs, nonprofits, religious corporations, and cooperatives",
      deadline:
        "January 2 or July 2 in the matching odd or even year, depending on entity type",
      amount:
        "$100 domestic or $200 foreign for many January biennial reports, or $25 for nonprofit July filers"
    }
  },
  {
    state: "Hawaii",
    route: "/tools/hawaii/annual-report-deadline/",
    guideLabel: "Hawaii annual business report fee and deadline",
    chipLabel: "Hawaii quarter rule",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Quarter-based Hawaii annual business reports, current online fee lanes, first-year exception, and the $10 per-year late fee.",
    directoryCardDescription:
      "Hawaii annual business report due-quarter rules, current online fees, first-year filing exception, and delinquent-year late fees.",
    homeComparison: {
      focus: "Hawaii LLC or profit corporation",
      deadline: "By the end of the calendar quarter tied to the registration date",
      fee: "$12.50 online common lane",
      lateRule: "$10.00 late fee for each delinquent year"
    },
    directoryComparison: {
      obligation: "Annual business report",
      entityFocus: "LLCs, profit corporations, LLPs, nonprofits, and partnerships",
      deadline:
        "By March 31, June 30, September 30, or December 31 depending on the registration quarter",
      amount:
        "$12.50 online for LLCs, profit corporations, and LLPs; $2.50 for nonprofits; or $5.00 for partnerships"
    }
  }
];

export const mayExpansionStructuredStateContentByFilePath = {
  "tools/alabama/business-privilege-tax-deadline/index.html": [
    {
      type: "table",
      eyebrow: "2024 split",
      title: "Alabama now separates the tax filing from the corporation annual report",
      headers: ["Entity lane", "Recurring filing rule", "Deadline or window", "Published amount"],
      rows: [
        [
          "Domestic or foreign for-profit corporation or professional corporation",
          "Business privilege tax with ADOR, plus a separate SOS corporation annual report",
          "BPT generally follows the federal return due date; SOS annual report files between January 1 and March 15",
          "$10 SOS annual report fee, plus any Alabama business privilege tax due"
        ],
        [
          "S corporation, LLC, pass-through limited liability entity, or disregarded entity",
          "Business privilege tax filing or exemption only",
          "BPT generally follows the federal return due date unless the filing is the initial return",
          "Depends on the Alabama tax computation; no BPT return required if the computed tax is $100 or less for post-2023 tax years"
        ],
        [
          "New Alabama or newly qualified foreign entity",
          "Initial business privilege tax return on Form BPT-IN",
          "Due within two and one-half months after organization or Alabama qualification",
          "Use the current ADOR initial-return rules and computation"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and filing-path notes",
      title: "The practical Alabama traps are split filing and delinquency handling",
      cards: [
        {
          title: "The SOS annual report is not the place to change entity details",
          text: "Alabama's current corporation annual report form says the annual report is for annual report information only and that entity-detail changes are not made through that form."
        },
        {
          title: "ADOR delinquency notices point to interest and penalties",
          text: "The Alabama business privilege tax FAQ says businesses receiving delinquency notices should file and pay promptly to avoid further interest and penalties."
        },
        {
          title: "The 2024 split only applies to certain corporations",
          text: "ADOR's filing-change notice says the separate Secretary of State annual report applies to domestic and foreign for-profit corporations and professional corporations, and annual reports from other entities are not accepted in that lane."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Alabama filing details",
      headers: ["Question", "Alabama answer used here"],
      rows: [
        [
          "What if the business privilege tax computes to $100 or less?",
          "For tax years beginning after December 31, 2023, Alabama says taxpayers whose computed business privilege tax is $100 or less are not required to file the BPT return."
        ],
        [
          "Can you extend the Alabama BPT filing?",
          "ADOR says the regular BPT return follows the federal extension pattern, but there is no extension of time to file the initial Form BPT-IN."
        ],
        [
          "When does the separate corporation annual report file?",
          "The Alabama SOS annual report form says covered corporations file between January 1 and March 15 and pay the $10 processing fee."
        ],
        [
          "Where should you file?",
          "Use My Alabama Taxes for the business privilege tax and the Alabama SOS annual report portal or form for the separate corporation annual report."
        ]
      ]
    }
  ],
  "tools/alaska/biennial-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Alaska biennial reports move between January and July lanes",
      headers: ["Entity type", "Due rule", "Published amount", "What to watch"],
      rows: [
        [
          "Domestic business corporation, professional corporation, LLC, or LLP",
          "January 2 of the matching odd or even year; filing opens October 2 of the prior year",
          "$100.00, or $137.50 on or after February 2",
          "Domestic Alaska entities can also have a free initial report within six months after creation."
        ],
        [
          "Foreign business corporation, foreign LLC, or foreign LLP",
          "January 2 of the matching odd or even year; filing opens October 2 of the prior year",
          "$200.00, or $247.50 on or after February 2",
          "Foreign entities do not file the free initial report."
        ],
        [
          "Nonprofit or religious corporation",
          "July 2 of the matching odd or even year; filing opens April 2",
          "$25.00, or $30.00 on or after August 2",
          "This is the most common Alaska summer filing lane."
        ],
        [
          "Cooperative corporation",
          "July 2 of the matching odd or even year; filing opens April 2",
          "$100.00, or $110.00 on or after August 2",
          "Cooperatives share the summer lane but not the nonprofit fee."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and cleanup path",
      title: "Alaska biennial misses can quickly become a status problem",
      cards: [
        {
          title: "Initial reports are separate from biennial reports",
          text: "Alaska's FAQ says domestic business corporations, professional corporations, nonprofit corporations, and LLCs can have a free initial report due within six months after creation before the biennial cycle matters."
        },
        {
          title: "Missed reports can move the record into dissolution or revocation work",
          text: "Alaska's biennial report FAQ says entities that have been involuntarily dissolved as a result of missing one or more biennial reports will need additional reinstatement fees."
        },
        {
          title: "Do not use the biennial report to change the registered agent",
          text: "Alaska says registered-agent changes must be handled with the separate statement-of-change path rather than through the biennial report itself."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Alaska biennial report details",
      headers: ["Question", "Alaska answer used here"],
      rows: [
        [
          "How do you know the next due date?",
          "Alaska says to check the entity details in the state's corporations database because the due year still depends on whether the entity was created or registered in an odd or even year."
        ],
        [
          "Can the report be filed online?",
          "Yes. Alaska says biennial reports can be filed online or by hard copy, but businesses should submit only one filing method for the same report."
        ],
        [
          "When does the filing window open?",
          "Alaska opens January-lane biennial reports on October 2 of the previous year and July-lane biennial reports on April 2 of the filing year."
        ],
        [
          "What should you do about suspicious correspondence?",
          "Alaska's corporations division says official state correspondence will clearly indicate State of Alaska origin, so unfamiliar payment requests should be checked carefully before sending money."
        ]
      ]
    }
  ],
  "tools/hawaii/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Quarter rule",
      title: "Hawaii annual business reports use the registration quarter, not one fixed date",
      headers: ["Entity type", "Due rule", "Current common online fee", "What to watch"],
      rows: [
        [
          "LLC, profit corporation, or LLP",
          "File during the quarter tied to the registration date and no later than the last day of that quarter",
          "$12.50 online",
          "The fee schedule PDF still shows the larger base annual report amount used outside the discounted online lane."
        ],
        [
          "Nonprofit corporation",
          "File during the quarter tied to the registration date and no later than the last day of that quarter",
          "$2.50 online",
          "The nonprofit online amount is lower than the common profit-corporation and LLC lane."
        ],
        [
          "Partnership",
          "File during the quarter tied to the registration date and no later than the last day of that quarter",
          "$5.00 online",
          "Partnerships still follow the same quarter-based due rule."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and first-year rules",
      title: "Hawaii's cleanest shortcuts are quarter matching and the first-year exception",
      cards: [
        {
          title: "No report is due in the same registration year",
          text: "Hawaii's due-date announcement says that if an entity is registered in the same year the annual report or annual statement would otherwise be due, the entity is not required to file that report for that year."
        },
        {
          title: "The late fee is straightforward",
          text: "The current DCCA release says delinquent Hawaii annual business reports can still be submitted online and a $10.00 late fee is assessed for each delinquent year."
        },
        {
          title: "Good standing matters more than the filing itself",
          text: "Hawaii's annual-report release says timely filing helps keep the entity in good standing, which may be a prerequisite for contracts, loans, and other business assistance."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Hawaii annual business report details",
      headers: ["Question", "Hawaii answer used here"],
      rows: [
        [
          "How do you map the due quarter?",
          "Hawaii says registrations dated January through March file by March 31, April through June file by June 30, July through September file by September 30, and October through December file by December 31."
        ],
        [
          "Where should you file?",
          "Use the Hawaii Business Express annual filing portal for online filing, or use the Business Registration Division's approved filing channels if filing by email, mail, or fax."
        ],
        [
          "Can you still use paper or email?",
          "Yes. Hawaii says filings by email, mail, and fax are accepted, but processing times may be delayed compared with the online filing path."
        ],
        [
          "How should you handle look-alike mailers?",
          "Hawaii's current annual-report release says businesses should be cautious of correspondence that does not come from the state Business Registration Division."
        ]
      ]
    }
  ]
};

export const mayExpansionGuideEvidenceByRoute = {
  "/tools/alabama/business-privilege-tax-deadline/": {
    filingLabel: [1, 2, 4],
    whoShouldUse: [1, 3, 4],
    headlineDueDate: [2, 4],
    mainAmountShown: [1, 4, 5],
    ifAlreadyLate: [2, 5, 6]
  },
  "/tools/alaska/biennial-report-deadline/": {
    filingLabel: [1, 2, 3],
    whoShouldUse: [1, 2, 3],
    headlineDueDate: [1, 2],
    mainAmountShown: [2, 3],
    ifAlreadyLate: [2, 4, 5, 6]
  },
  "/tools/hawaii/annual-report-deadline/": {
    filingLabel: [1, 2, 4, 5],
    whoShouldUse: [1, 2, 4],
    headlineDueDate: [2, 4],
    mainAmountShown: [2, 3],
    ifAlreadyLate: [2, 4, 5]
  }
};

export const mayExpansionGuideDecisionToolByRoute = {
  "/tools/alabama/business-privilege-tax-deadline/": decisionTool({
    caseLabel: "Which Alabama recurring filing lane fits best?",
    intro:
      "Alabama's practical trap is that the recurring answer split apart in 2024. The right first step is figuring out whether the business only has the ADOR tax lane or also has the separate SOS corporation annual report.",
    cases: [
      decisionCase({
        value: "covered-corporation",
        label: "For-profit or professional corporation",
        deadline:
          "BPT generally follows the corresponding federal due date, and the separate SOS annual report files January 1 through March 15",
        amount: "$10 SOS annual report fee, plus any Alabama business privilege tax due",
        normalRule:
          "Covered Alabama corporations often have two recurring tasks: the ADOR business privilege tax filing and the separate Secretary of State corporation annual report.",
        lateRule:
          "If the business privilege tax filing is late, ADOR says the delinquency path can bring further interest and penalties. The SOS annual report should also be cleared during its filing window instead of being ignored.",
        confirmRule:
          "Confirm that the record is a domestic or foreign for-profit corporation or professional corporation before relying on the separate SOS annual report answer.",
        nextAction:
          "Use the DOR filing-change notice, My Alabama Taxes, and the SOS annual report form before filing.",
        sourceIndexes: [1, 2, 4, 6, 7],
        lateSourceIndexes: [2, 4, 6],
        confirmSourceIndexes: [1, 4, 5]
      }),
      decisionCase({
        value: "llc-s-corp-pass-through",
        label: "LLC, S corporation, or pass-through lane",
        deadline:
          "Business privilege tax generally follows the corresponding federal due date unless the filing is the initial return",
        amount: "Depends on the Alabama business privilege tax computation",
        normalRule:
          "Most Alabama LLCs, S corporations, pass-through entities, and disregarded entities focus on the ADOR business privilege tax lane and do not use the corporation annual report form.",
        lateRule:
          "A missed ADOR filing can still trigger delinquency notices, interest, and penalties even if the entity is not in the separate SOS corporation annual report lane.",
        confirmRule:
          "Confirm both the legal entity type and the federal tax classification before relying on the Alabama BPT answer.",
        nextAction:
          "Use the business privilege tax FAQ and My Alabama Taxes first.",
        sourceIndexes: [2, 3, 6],
        lateSourceIndexes: [2, 6],
        confirmSourceIndexes: [2, 3]
      }),
      decisionCase({
        value: "initial-return",
        label: "Initial Alabama return",
        deadline: "Two and one-half months after Alabama organization or qualification",
        amount: "Use the current initial-return computation rules",
        normalRule:
          "The first Alabama business privilege tax return uses the initial-return lane and does not follow the normal extension pattern for ongoing CPT or PPT filings.",
        lateRule:
          "Because ADOR says there is no extension for Form BPT-IN, a missed initial return should be fixed promptly rather than treated like a routine ongoing filing.",
        confirmRule:
          "Check the exact organization or qualification date before you rely on the two-and-one-half-month rule.",
        nextAction:
          "Use the Alabama BPT FAQ and the current ADOR filing portal before submitting the initial return.",
        sourceIndexes: [2, 6],
        lateSourceIndexes: [2, 6],
        confirmSourceIndexes: [2]
      }),
      decisionCase({
        value: "low-tax-due-exemption",
        label: "Computed tax is $100 or less",
        deadline: "Apply the post-2023 exemption before preparing a BPT return",
        amount: "$0 BPT return filing requirement if the computed tax is $100 or less",
        normalRule:
          "For tax years beginning after December 31, 2023, Alabama says taxpayers whose computed business privilege tax is $100 or less are not required to file the BPT return.",
        lateRule:
          "Do not assume the low-tax-due exemption also removes a separate corporation annual report if the entity is in the covered corporation lane.",
        confirmRule:
          "Confirm both the computed Alabama business privilege tax amount and whether the entity is a covered corporation that still has a separate SOS annual report.",
        nextAction:
          "Use the 2024 filing-change notice and the direct taxpayer FAQ before deciding not to file.",
        sourceIndexes: [1, 3],
        lateSourceIndexes: [1, 4],
        confirmSourceIndexes: [1, 3, 4]
      })
    ]
  }),
  "/tools/alaska/biennial-report-deadline/": decisionTool({
    caseLabel: "Which Alaska biennial report lane fits best?",
    intro:
      "Alaska's real split is not just domestic versus foreign. The due month also changes between the January business lane and the July nonprofit or cooperative lane, and some domestic entities have an initial report before the biennial cycle matters.",
    cases: [
      decisionCase({
        value: "domestic-january-lane",
        label: "Domestic corporation, LLC, or LLP",
        deadline: "January 2 of the matching odd or even year",
        amount: "$100.00, or $137.50 on or after February 2",
        normalRule:
          "Domestic Alaska business corporations, professional corporations, LLCs, and LLPs file by January 2 in the matching odd or even year and use the $100 biennial report lane.",
        lateRule:
          "If the domestic January report slips past February 1, Alaska adds the published late amount and the record can eventually move into involuntary dissolution if missed reports stack up.",
        confirmRule:
          "Confirm that the record is domestic and that the due year matches the entity's odd-or-even creation year before paying.",
        nextAction:
          "Use the Alaska biennial report page, FAQ, and forms-by-entity fee table before filing.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [2, 4, 5],
        confirmSourceIndexes: [2, 3, 4]
      }),
      decisionCase({
        value: "foreign-january-lane",
        label: "Foreign corporation, LLC, or LLP",
        deadline: "January 2 of the matching odd or even year",
        amount: "$200.00, or $247.50 on or after February 2",
        normalRule:
          "Foreign Alaska business corporations, foreign LLCs, and foreign LLPs also use the January 2 biennial report lane, but the fee is higher than the domestic lane.",
        lateRule:
          "A foreign entity that misses the report can still fall into Alaska's revocation or reinstatement path after the biennial report stays unresolved.",
        confirmRule:
          "Confirm that the business is foreign-qualified and not domestic before relying on the higher January fee lane.",
        nextAction:
          "Use the Alaska FAQ and the forms-by-entity table together before paying.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [2, 3]
      }),
      decisionCase({
        value: "summer-lane",
        label: "Nonprofit, religious, or cooperative corporation",
        deadline: "July 2 of the matching odd or even year",
        amount: "$25.00 for many nonprofits or $100.00 for cooperatives",
        normalRule:
          "Alaska nonprofits and religious corporations use the July 2 lane with the lower fee, while cooperatives share the same timing but not the same amount.",
        lateRule:
          "If the summer filing is postmarked after August 1, Alaska applies the published late-fee lane and unresolved misses can still grow into a reinstatement problem.",
        confirmRule:
          "Confirm whether the entity is a nonprofit or cooperative before relying on the lower Alaska fee answer.",
        nextAction:
          "Use the biennial report FAQ and fee table before filing.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [2, 3]
      }),
      decisionCase({
        value: "initial-report",
        label: "Domestic entity with an initial report due",
        deadline: "Within six months after creation",
        amount: "No charge",
        normalRule:
          "Several domestic Alaska entities file a free initial report within six months after creation before the biennial report cycle becomes the main answer.",
        lateRule:
          "If the entity misses the early filing and later also misses biennial reports, the cleanup path becomes more complex and can involve non-compliance or reinstatement work.",
        confirmRule:
          "Confirm that the business is one of the domestic Alaska entity types that still has the initial-report requirement.",
        nextAction:
          "Use the Alaska biennial report FAQ and forms-by-entity page before filing.",
        sourceIndexes: [2, 3],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [2, 3]
      }),
      decisionCase({
        value: "already-dissolved-or-revoked",
        label: "Already dissolved or revoked",
        deadline: "Resolve the status issue as soon as possible",
        amount: "Current report fees plus Alaska reinstatement requirements",
        normalRule:
          "Once Alaska has already moved the entity out of good standing, the ordinary biennial report answer is no longer enough by itself.",
        lateRule:
          "Alaska says entities that have been involuntarily dissolved or revoked after missed biennial reports need the reinstatement path and additional fees.",
        confirmRule:
          "Check whether the record is merely late or already dissolved or revoked before paying the normal biennial report lane.",
        nextAction:
          "Use Alaska's reinstatement guidance before submitting payment or forms.",
        sourceIndexes: [2, 5],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [4, 5]
      })
    ]
  }),
  "/tools/hawaii/annual-report-deadline/": decisionTool({
    caseLabel: "Which Hawaii annual business report lane fits best?",
    intro:
      "Hawaii's first trap is looking for one due date. The real answer starts with the registration quarter, and the second trap is assuming the first registration year still needs the report.",
    cases: [
      decisionCase({
        value: "llc-profit-corp-llp",
        label: "LLC, profit corporation, or LLP",
        deadline: "By the end of the registration quarter",
        amount: "$12.50 online common lane",
        normalRule:
          "Hawaii LLCs, profit corporations, and LLPs file during the quarter tied to the registration date and commonly use the $12.50 online annual-report lane.",
        lateRule:
          "If the annual business report is delinquent, Hawaii says the report can still be filed online and a $10.00 late fee is assessed per delinquent year.",
        confirmRule:
          "Confirm the original registration quarter first so you know whether the live deadline is March 31, June 30, September 30, or December 31.",
        nextAction:
          "Use the Hawaii annual filing portal and the current DCCA release before paying.",
        sourceIndexes: [2, 3, 4, 5],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [2, 4, 5]
      }),
      decisionCase({
        value: "nonprofit",
        label: "Nonprofit corporation",
        deadline: "By the end of the registration quarter",
        amount: "$2.50 online common lane",
        normalRule:
          "Hawaii nonprofits use the same quarter-based timing rule as other business entities, but the published online annual-report fee is lower.",
        lateRule:
          "A delinquent nonprofit annual report still picks up the $10.00 per-year late fee and should be cleared before the record falls behind further.",
        confirmRule:
          "Confirm that the entity is a nonprofit corporation before relying on the lower fee lane.",
        nextAction:
          "Use the current DCCA annual-report release and the annual filing portal before submitting payment.",
        sourceIndexes: [2, 3, 5],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [2, 3]
      }),
      decisionCase({
        value: "partnership",
        label: "Partnership",
        deadline: "By the end of the registration quarter",
        amount: "$5.00 online common lane",
        normalRule:
          "Hawaii partnerships still follow the quarter-based annual statement rule, but the published online fee differs from the corporation and LLC lane.",
        lateRule:
          "Delinquent Hawaii partnership reports use the same published $10.00 late fee per delinquent year.",
        confirmRule:
          "Confirm that the business is actually in the partnership filing lane before relying on the $5.00 answer.",
        nextAction:
          "Use the Hawaii fee schedule and annual filing portal together before paying.",
        sourceIndexes: [2, 3, 5],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [2, 3]
      }),
      decisionCase({
        value: "registered-this-year",
        label: "Registered this same year",
        deadline: "Usually no annual report is required in that same registration year",
        amount: "$0 first-year report obligation in that same year",
        normalRule:
          "Hawaii's due-date announcement says an entity registered in the same year the report would otherwise be due does not have to file that annual report or statement for that year.",
        lateRule:
          "Do not confuse the first-year exception with delinquent older years. Once a prior year is actually due, Hawaii applies the standard late-fee lane.",
        confirmRule:
          "Confirm the year of registration before relying on the first-year Hawaii exception.",
        nextAction:
          "Use the Hawaii due-date announcement and annual filing portal before preparing a report that may not yet be required.",
        sourceIndexes: [4, 5],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [4]
      }),
      decisionCase({
        value: "already-delinquent",
        label: "Already delinquent",
        deadline: "File the overdue report as soon as possible",
        amount: "Current filing fee plus $10.00 for each delinquent year",
        normalRule:
          "Once the Hawaii report is already overdue, the ordinary due-quarter rule is no longer enough by itself because the delinquent-year fee has started to stack.",
        lateRule:
          "Hawaii's current release says a $10.00 late fee is assessed for each delinquent year and timely filing matters for keeping the entity in good standing.",
        confirmRule:
          "Check how many Hawaii report years are actually delinquent before paying so you do not understate the total.",
        nextAction:
          "Use the Hawaii annual filing portal and current DCCA release before filing.",
        sourceIndexes: [2, 5],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [1, 2, 5]
      })
    ]
  })
};
