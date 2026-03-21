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

export const guideEvidenceByRoute = {
  "/tools/california/statement-of-information-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2],
    headlineDueDate: [1, 2],
    mainAmountShown: [3, 4],
    ifAlreadyLate: [1, 6]
  },
  "/tools/connecticut/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 5],
    headlineDueDate: [1, 2],
    mainAmountShown: [3, 4],
    ifAlreadyLate: [1, 6]
  },
  "/tools/delaware/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 3],
    headlineDueDate: [1, 2, 3],
    mainAmountShown: [2, 3],
    ifAlreadyLate: [2, 3, 5]
  },
  "/tools/florida/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2],
    headlineDueDate: [1],
    mainAmountShown: [2, 3, 4],
    ifAlreadyLate: [1, 6]
  },
  "/tools/georgia/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2],
    headlineDueDate: [1, 2],
    mainAmountShown: [1, 5],
    ifAlreadyLate: [1, 5]
  },
  "/tools/kansas/information-report-deadline/": {
    filingLabel: [1, 5],
    whoShouldUse: [1, 5],
    headlineDueDate: [1, 5],
    mainAmountShown: [2, 5],
    ifAlreadyLate: [4, 5]
  },
  "/tools/nevada/annual-fee-calculator/": {
    filingLabel: [1, 3],
    whoShouldUse: [1, 3],
    headlineDueDate: [1, 3],
    mainAmountShown: [1, 3, 4],
    ifAlreadyLate: [2, 4, 5]
  },
  "/tools/new-york/biennial-statement-deadline/": {
    filingLabel: [1, 5],
    whoShouldUse: [1, 5],
    headlineDueDate: [1],
    mainAmountShown: [2, 3],
    ifAlreadyLate: [1, 5]
  },
  "/tools/north-carolina/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 3],
    headlineDueDate: [1, 2, 3],
    mainAmountShown: [2, 5],
    ifAlreadyLate: [1, 4]
  },
  "/tools/pennsylvania/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 2],
    headlineDueDate: [1, 2],
    mainAmountShown: [1, 2],
    ifAlreadyLate: [1, 5]
  },
  "/tools/texas/franchise-tax-deadline/": {
    filingLabel: [1, 2, 3],
    whoShouldUse: [1, 3],
    headlineDueDate: [1, 5],
    mainAmountShown: [1, 4],
    ifAlreadyLate: [1, 2, 6]
  },
  "/tools/washington/annual-report-deadline-guide/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 4],
    headlineDueDate: [1, 2],
    mainAmountShown: [1, 5],
    ifAlreadyLate: [5, 6]
  },
  "/tools/new-jersey/annual-report-deadline/": {
    filingLabel: [1, 3],
    whoShouldUse: [1, 3],
    headlineDueDate: [1, 3],
    mainAmountShown: [1, 4],
    ifAlreadyLate: [1, 5]
  },
  "/tools/virginia/annual-registration-fee-deadline/": {
    filingLabel: [1, 2, 4],
    whoShouldUse: [1, 2, 4],
    headlineDueDate: [1, 2, 4],
    mainAmountShown: [1, 4],
    ifAlreadyLate: [2, 3]
  },
  "/tools/colorado/periodic-report-deadline/": {
    filingLabel: [1, 4],
    whoShouldUse: [1],
    headlineDueDate: [1, 4],
    mainAmountShown: [2, 3],
    ifAlreadyLate: [2, 4]
  },
  "/tools/oregon/annual-report-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 5],
    headlineDueDate: [1, 2],
    mainAmountShown: [1, 5],
    ifAlreadyLate: [4, 5]
  }
};

export const guideDecisionToolByRoute = {
  "/tools/california/statement-of-information-deadline/": decisionTool({
    caseLabel: "Which California filing case fits best?",
    intro:
      "California trips people up because the state splits the initial 90-day filing from the later recurring cycle and uses different recurring cadences for stock corporations and LLCs.",
    cases: [
      decisionCase({
        value: "stock-corporation",
        label: "Stock corporation recurring filing",
        deadline: "Annual in the registration month, using California's six-month filing window",
        amount: "$25",
        normalRule:
          "After the initial filing, stock corporations move into the annual Statement of Information cycle tied to the registration month and filing-window schedule.",
        lateRule:
          "California says a missed statement can lead to delinquency notices, Franchise Tax Board penalties, and suspension or forfeiture risk.",
        confirmRule:
          "Confirm that the entity is a stock corporation and that you are not still in the initial 90-day filing period before relying on the recurring annual rule.",
        nextAction:
          "Use the California filing-window schedule or bizfile Online before filing or paying.",
        sourceIndexes: [1, 2, 3, 5],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "llc",
        label: "LLC recurring filing",
        deadline: "Every two years in the registration month, using California's six-month filing window",
        amount: "$20",
        normalRule:
          "California LLCs move to the biennial Statement of Information cycle after the initial 90-day filing, and the due window still follows the registration month.",
        lateRule:
          "Late California LLC statements can move into delinquency and suspension or forfeiture risk if the state notices are ignored.",
        confirmRule:
          "Confirm that the entity is an LLC and check the odd-or-even year pattern before relying on the recurring biennial cycle.",
        nextAction:
          "Open the California filing-window schedule first, then file through bizfile Online.",
        sourceIndexes: [1, 2, 4, 5],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "initial-filing",
        label: "Initial 90-day filing",
        deadline: "Within 90 days of initial registration",
        amount: "$25 for stock corporations or $20 for LLCs",
        normalRule:
          "Both stock corporations and LLCs start with the initial 90-day Statement of Information obligation before the recurring cycle takes over.",
        lateRule:
          "If the initial filing was missed, use the state record and filing portal immediately instead of assuming the later recurring cycle controls.",
        confirmRule:
          "Confirm the registration date and entity type on the Secretary of State record before using the initial-filing rule.",
        nextAction:
          "Check the California SOS entity record and file through the official portal.",
        sourceIndexes: [1, 2, 3, 4, 5],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1, 2]
      })
    ]
  }),
  "/tools/connecticut/annual-report-deadline/": decisionTool({
    caseLabel: "Which Connecticut rule set fits best?",
    intro:
      "Connecticut's core issue is not a single flat due date. The filing system shows the exact annual-report due date, and the fee changes by entity type.",
    cases: [
      decisionCase({
        value: "llc-family",
        label: "LLC, LLP, or LP",
        deadline: "Annual; exact due date shown in the Connecticut filing system",
        amount: "$80",
        normalRule:
          "Use the state filing system and reminder notice because Connecticut treats the due date as record-specific even though the filing is annual.",
        lateRule:
          "Overdue entities cannot get a certificate of legal existence and may be dissolved if the report is not cleared.",
        confirmRule:
          "Confirm whether older annual reports are also due because Connecticut can surface prior years on the business filing screen.",
        nextAction:
          "Open the Connecticut annual-report overview or PDF guide and check the business record directly.",
        sourceIndexes: [1, 2, 3, 5],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1, 2, 5]
      }),
      decisionCase({
        value: "domestic-stock-corporation",
        label: "Domestic stock corporation",
        deadline: "Annual; exact due date shown in the Connecticut filing system",
        amount: "$150",
        normalRule:
          "Domestic stock corporations use the same record-specific due-date check but a higher published annual-report fee.",
        lateRule:
          "The overdue-status rules still matter: the business can lose certificate-of-legal-existence access and move toward dissolution.",
        confirmRule:
          "Confirm that the corporation is domestic and not foreign because Connecticut uses a much higher foreign stock-corporation fee.",
        nextAction:
          "Check the state filing record before relying on a copied due date or third-party notice.",
        sourceIndexes: [1, 2, 3, 5],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [1, 2, 3, 4]
      }),
      decisionCase({
        value: "nonstock-or-foreign-corporation",
        label: "Non-stock corporation or foreign stock corporation",
        deadline: "Annual; exact due date shown in the Connecticut filing system",
        amount: "$50 for non-stock corporations or $435 for foreign stock corporations",
        normalRule:
          "This is the Connecticut category where the state fee answer swings the most, so do not reuse the domestic stock-corporation number.",
        lateRule:
          "Once overdue, Connecticut still blocks certificate-of-legal-existence access and can move the business toward dissolution.",
        confirmRule:
          "Confirm whether the corporation is non-stock or foreign before using the fee answer because the published amounts are very different.",
        nextAction:
          "Use the Connecticut domestic and foreign fee guidance before filing.",
        sourceIndexes: [1, 2, 3, 4],
        lateSourceIndexes: [1, 6],
        confirmSourceIndexes: [3, 4]
      })
    ]
  }),
  "/tools/delaware/annual-report-deadline/": decisionTool({
    caseLabel: "Which Delaware filing path fits best?",
    intro:
      "Delaware confuses people because domestic corporations, foreign corporations, and LLC or LP annual taxes are not the same filing.",
    cases: [
      decisionCase({
        value: "domestic-corporation",
        label: "Domestic corporation",
        deadline: "March 1",
        amount: "$50 annual-report filing fee plus franchise tax",
        normalRule:
          "Domestic corporations file an annual report and franchise-tax payment together through Delaware's corporation system.",
        lateRule:
          "Delaware publishes a $200 penalty plus 1.5% monthly interest on the unpaid tax and penalty for late domestic-corporation filings.",
        confirmRule:
          "Confirm whether the corporation is exempt or non-exempt because the annual report fee can differ even though the March 1 deadline stays central.",
        nextAction:
          "Use Delaware's Pay Taxes / File Annual Report portal rather than a solicitation letter.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "foreign-corporation",
        label: "Foreign corporation",
        deadline: "June 30",
        amount: "$125 annual-report filing fee",
        normalRule:
          "Foreign corporations use a later annual-report deadline and a separate fixed filing fee, so they should not be blended into the March 1 domestic-corporation answer.",
        lateRule:
          "Delaware publishes a $125 penalty if the foreign-corporation annual report is not filed by the due date.",
        confirmRule:
          "Confirm that the business is foreign-qualified in Delaware before using the June 30 rule.",
        nextAction:
          "File through the Delaware online system tied to the corporation record.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [2, 5],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "llc-lp-gp",
        label: "Delaware LLC, LP, or GP annual tax",
        deadline: "June 1",
        amount: "$300 annual tax",
        normalRule:
          "Delaware LLCs, LPs, and GPs do not file annual reports here. They pay the annual tax instead, and that label matters.",
        lateRule:
          "Delaware publishes a $200 penalty plus 1.5% monthly interest on the late annual tax and penalty.",
        confirmRule:
          "Confirm that the entity is in Delaware's alternative-entity tax group before relying on the June 1 annual-tax answer.",
        nextAction:
          "Use the alternative-entity annual-tax instructions and official portal.",
        sourceIndexes: [1, 3, 4],
        lateSourceIndexes: [3, 5],
        confirmSourceIndexes: [1, 3]
      })
    ]
  }),
  "/tools/florida/annual-report-deadline/": decisionTool({
    caseLabel: "Which Florida entity type fits best?",
    intro:
      "Florida is one of the clearer states on timing, but the fee and late-fee exposure still split sharply by entity type.",
    cases: [
      decisionCase({
        value: "profit-corporation",
        label: "Profit corporation",
        deadline: "January 1 through May 1",
        amount: "$150.00 on time or $550.00 after May 1",
        normalRule:
          "Florida uses the same annual-report filing window each year, so the main corporation decision is whether the report is still on time or already in the late-fee window.",
        lateRule:
          "After May 1, Florida adds the $400 late fee and later moves toward administrative dissolution if the report is still not filed by the September cutoff.",
        confirmRule:
          "Confirm that the business is a profit corporation and not a nonprofit because the late-fee treatment changes materially.",
        nextAction:
          "Use Sunbiz annual-report filing first, then keep the official receipt.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [1, 3, 6],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "llc",
        label: "LLC",
        deadline: "January 1 through May 1",
        amount: "$138.75 on time or $538.75 after May 1",
        normalRule:
          "Florida LLCs use the same filing window as corporations but a different published fee schedule.",
        lateRule:
          "Florida adds the same $400 late fee after May 1 and later moves toward administrative dissolution if the LLC is not cleared by the September cutoff.",
        confirmRule:
          "Confirm that the entity is an LLC and not a corporation or partnership before relying on the amount shown.",
        nextAction:
          "Use the Florida LLC fee schedule and filing page together before paying.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [1, 4, 6],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "nonprofit-corporation",
        label: "Non-profit corporation",
        deadline: "January 1 through May 1",
        amount: "$61.25",
        normalRule:
          "Florida still requires the annual report, but the nonprofit fee is lower and the headline late-fee rule is different.",
        lateRule:
          "Florida's main annual-report page says nonprofits are not subject to the $400 late fee that applies to most for-profit entities.",
        confirmRule:
          "Confirm that the corporation is nonprofit before using the no-$400-late-fee reading.",
        nextAction:
          "Use the Florida filing page and fee schedule rather than a generic private-service quote.",
        sourceIndexes: [1, 2],
        lateSourceIndexes: [1, 2],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "lp-or-lllp",
        label: "LP or LLLP",
        deadline: "January 1 through May 1",
        amount: "$500.00 on time or $900.00 after May 1",
        normalRule:
          "Florida limited partnerships and LLLPs share the core filing window but use the highest annual-report fee in this guide.",
        lateRule:
          "After May 1, the $400 late fee applies here too, and missed filings can still roll into revocation by the September cutoff.",
        confirmRule:
          "Confirm that the business is an LP or LLLP because the published fee is much higher than the corporation and LLC amounts.",
        nextAction:
          "Use the Sunbiz filing path with the LP/LLLP fee schedule in view.",
        sourceIndexes: [1, 2],
        lateSourceIndexes: [1, 2, 6],
        confirmSourceIndexes: [1, 2]
      })
    ]
  }),
  "/tools/georgia/annual-report-deadline/": decisionTool({
    caseLabel: "Which Georgia case looks closest?",
    intro:
      "Georgia is one of the states where the deadline is straightforward but the fee answer is not. The common profit-entity total is useful, but it is not universal.",
    cases: [
      decisionCase({
        value: "profit-entity",
        label: "Profit corporation or LLC",
        deadline: "January 1 through April 1",
        amount: "Common $60 online total",
        normalRule:
          "The current Georgia guidance points many profit entities to the common $60 online total, making it the fastest practical answer for standard corporation and LLC filings.",
        lateRule:
          "Georgia currently publishes a $25 late penalty if the annual registration is filed after the deadline.",
        confirmRule:
          "Confirm the live entity record before relying on the common $60 total because the fee schedule is not universal across every entity type.",
        nextAction:
          "Start with the Georgia annual-registration instructions, then confirm the filing path in the SOS portal.",
        sourceIndexes: [1, 4, 5],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 2, 5]
      }),
      decisionCase({
        value: "nonprofit-corporation",
        label: "Nonprofit corporation",
        deadline: "January 1 through April 1",
        amount: "Lower than the common $60 profit-entity total; confirm on the Georgia fee schedule",
        normalRule:
          "Georgia's current guidance says lower totals exist for at least some nonprofit filings, so the common profit-entity answer is not the safest one here.",
        lateRule:
          "The published $25 late penalty still matters if the annual registration is missed.",
        confirmRule:
          "Use the Georgia fee schedule or portal before paying because the nonprofit total is intentionally lower than the common profit-entity number.",
        nextAction:
          "Open the Georgia fee reference and filing portal side by side before filing.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [2, 5]
      }),
      decisionCase({
        value: "llp-or-other",
        label: "Domestic LLP or another Georgia entity with a special fee",
        deadline: "January 1 through April 1",
        amount: "Fee varies by entity type on the Georgia fee schedule",
        normalRule:
          "Georgia says some domestic LLP and other entity filings fall below the common $60 total, so use the live fee schedule instead of a flat-number shortcut.",
        lateRule:
          "The published $25 late penalty is still the practical late-state number to expect if the filing slips.",
        confirmRule:
          "Confirm the exact entity type on the live Georgia record before you trust any copied fee figure.",
        nextAction:
          "Use the annual-registration instructions first, then confirm the exact fee on the SOS schedule or live filing record.",
        sourceIndexes: [1, 4, 5],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [2, 4, 5]
      })
    ]
  }),
  "/tools/kansas/information-report-deadline/": decisionTool({
    caseLabel: "Which Kansas case fits best?",
    intro:
      "Kansas is easier once you separate for-profit versus not-for-profit timing and stop pretending the website publishes every entity's fee on one screen.",
    cases: [
      decisionCase({
        value: "for-profit-business",
        label: "For-profit business",
        deadline: "April 15 in the matching odd or even filing year",
        amount: "Entity-specific; Kansas LLCs are $53 online or $55 paper",
        normalRule:
          "Kansas ties the information report to odd-or-even formation-year parity, and the standard for-profit due date is April 15 in the matching filing year.",
        lateRule:
          "Kansas gives a three-month delinquency interval after the due date and then moves the business into forfeiture if it is still not filed.",
        confirmRule:
          "Confirm the formation-year parity before relying on the April 15 cycle, especially if the entity has an unusual tax-year pattern.",
        nextAction:
          "Use the Kansas information-report page first and then the matching entity form if you need an exact fee.",
        sourceIndexes: [1, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 5]
      }),
      decisionCase({
        value: "not-for-profit-business",
        label: "Not-for-profit business",
        deadline: "June 15 in the matching odd or even filing year",
        amount: "Confirm on the matching Kansas form if you need the exact fee",
        normalRule:
          "Kansas uses the same parity concept for not-for-profit businesses, but the standard due date is later than the for-profit April cycle.",
        lateRule:
          "The same three-month delinquency interval and later forfeiture risk apply if the report is ignored.",
        confirmRule:
          "Confirm the business type and matching filing year before using the June 15 rule.",
        nextAction:
          "Use the Kansas information-report guidance and the matching nonprofit form before filing.",
        sourceIndexes: [1, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 5]
      }),
      decisionCase({
        value: "kansas-llc-fee",
        label: "Kansas LLC fee check",
        deadline: "Use the LLC's matching filing year; common window is January 1 through April 15 after year end",
        amount: "$53 online or $55 paper",
        normalRule:
          "The Kansas LLC form is the clearest place to confirm the exact fee, which is why this guide gives the LLC figure more precisely than some other Kansas entity types.",
        lateRule:
          "If the report goes unresolved, Kansas can move the business into forfeiture after the delinquency interval.",
        confirmRule:
          "Use the LLC form itself if the fee number matters because Kansas does not publish every entity fee on one combined page.",
        nextAction:
          "Open the Kansas LLC form or filing portal before relying on a copied fee quote.",
        sourceIndexes: [2, 3, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [2, 5]
      })
    ]
  }),
  "/tools/nevada/annual-fee-calculator/": decisionTool({
    caseLabel: "Which Nevada entity type fits best?",
    intro:
      "Nevada is one of the cleaner recurring-fee states because the annual list and state business license can be stacked into one state-level total, but the corporation license amount is much higher than the LLC amount.",
    cases: [
      decisionCase({
        value: "llc",
        label: "Nevada LLC",
        deadline: "Last day of the anniversary month",
        amount: "$150 annual list plus $200 business license renewal",
        normalRule:
          "For a standard Nevada LLC, the recurring state-level answer is the annual list plus the business-license renewal, both keyed to the anniversary month.",
        lateRule:
          "Nevada publishes a $75 annual-list penalty and a $100 business-license late penalty if the filing slips.",
        confirmRule:
          "Confirm that the entity is an LLC and use the anniversary month on the state record before paying.",
        nextAction:
          "Use the Nevada anniversary month and the statutory amounts shown in the calculator before adding any private-service cost.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [2, 4],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "corporation",
        label: "Nevada corporation",
        deadline: "Last day of the anniversary month",
        amount: "$150 annual list plus $500 business license renewal",
        normalRule:
          "The annual-list fee is the same, but Nevada corporations use the higher business-license renewal amount, so the recurring total is materially larger than the LLC total.",
        lateRule:
          "Nevada's published late penalties still stack here, and the corporation annual-list default consequences matter if the record is ignored.",
        confirmRule:
          "Confirm that the entity is a corporation organized under the Nevada corporate chapters before using the $500 business-license amount.",
        nextAction:
          "Use the Nevada record and the statutory fee sections before filing or paying.",
        sourceIndexes: [3, 4],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [3, 4]
      })
    ]
  }),
  "/tools/new-york/biennial-statement-deadline/": decisionTool({
    caseLabel: "Which New York entity type fits best?",
    intro:
      "New York is not a flat annual deadline state. The key is the formation or authority month, and the consequence is a past-due status rather than a standard late-fee table.",
    cases: [
      decisionCase({
        value: "business-corporation",
        label: "Business corporation",
        deadline: "Every two years during the calendar month of incorporation or authority",
        amount: "$9",
        normalRule:
          "New York business corporations follow the biennial due-month rule rather than a single annual due date.",
        lateRule:
          "New York says the corporation will show as past due in state records and on status documents if the Biennial Statement is not filed.",
        confirmRule:
          "Confirm the original filing month on the Department of State record because filing early does not reset the underlying due month.",
        nextAction:
          "Use the Department of State biennial-statement filing service and the entity search before filing.",
        sourceIndexes: [1, 3, 4],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "llc",
        label: "LLC",
        deadline: "Every two years during the calendar month of formation or authority",
        amount: "$9",
        normalRule:
          "New York LLCs use the same due-month rule and $9 fee, so the practical question is usually the entity's formation month rather than the fee math.",
        lateRule:
          "New York still frames the miss as a past-due status problem rather than a flat late fee.",
        confirmRule:
          "Check the formation or authority month on the state record before relying on the due-month answer.",
        nextAction:
          "Open the biennial filing service and the entity search together before filing.",
        sourceIndexes: [1, 3, 4],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 4]
      })
    ]
  }),
  "/tools/north-carolina/annual-report-deadline/": decisionTool({
    caseLabel: "Which North Carolina entity type fits best?",
    intro:
      "North Carolina becomes much easier once you separate LLC timing from corporation timing and keep the online payment-method fees separate from the base filing fees.",
    cases: [
      decisionCase({
        value: "llc-or-l3c",
        label: "LLC or L3C",
        deadline: "April 15 each year after the year of creation",
        amount: "$200 paper, $202 by ACH, or $203 by credit card online",
        normalRule:
          "North Carolina LLCs and L3Cs are the simpler path because they use the fixed April 15 annual-report deadline after the year of formation.",
        lateRule:
          "North Carolina's due-date chart does not publish a flat late fee, so use the state record and reinstatement guidance if the business may already be out of status.",
        confirmRule:
          "Confirm that the entity is an LLC or L3C and not a corporation before relying on the fixed April 15 rule.",
        nextAction:
          "Use the SOS annual-report guidance and fee table before choosing online or paper filing.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [1, 4],
        confirmSourceIndexes: [1, 3]
      }),
      decisionCase({
        value: "corporation",
        label: "Business corporation",
        deadline: "The 15th day of the fourth month after the fiscal year end",
        amount: "$25 paper, $20 by ACH, or $21 by credit card online",
        normalRule:
          "North Carolina corporations do not use the LLC's fixed April 15 rule. The due date tracks the corporation's fiscal year instead.",
        lateRule:
          "If the corporation has already missed reports, North Carolina's reinstatement guidance says the missing reports and applicable fees must be cleared for each year involved.",
        confirmRule:
          "Confirm the corporation's fiscal year end before relying on the due date because that trigger controls the report deadline.",
        nextAction:
          "Check the state annual-report guidance and the corporation's fiscal-year record before filing.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 2, 3]
      })
    ]
  }),
  "/tools/pennsylvania/annual-report-deadline/": decisionTool({
    caseLabel: "Which Pennsylvania association type fits best?",
    intro:
      "Pennsylvania is one of the states where the fee answer is simple but the filing window changes by association type, so the entity label matters more than the dollar amount.",
    cases: [
      decisionCase({
        value: "corporation",
        label: "Corporation",
        deadline: "January 1 through June 30",
        amount: "$7 for business corporations or $0 for qualifying nonprofits",
        normalRule:
          "Pennsylvania corporations now file annual reports in the January-through-June window, and the business-corporation fee is the standard $7 amount used on the state pages.",
        lateRule:
          "Pennsylvania says administrative action begins with annual reports due in 2027, six months after the due date, so missed filings should be cleared before enforcement starts.",
        confirmRule:
          "Confirm whether the corporation is business or qualifying nonprofit before relying on the fee number.",
        nextAction:
          "Use the Pennsylvania annual-report guidance and online filing portal together before filing.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "llc",
        label: "LLC",
        deadline: "January 1 through September 30",
        amount: "$7, or $0 for LLCs with a not-for-profit purpose",
        normalRule:
          "Pennsylvania LLCs use the later September window, so they should not borrow the corporation cutoff.",
        lateRule:
          "The transition rule still points to enforcement beginning with annual reports due in 2027, six months after the due date.",
        confirmRule:
          "Confirm whether the LLC has a not-for-profit purpose before using the standard $7 amount.",
        nextAction:
          "Open the Pennsylvania filing guide or portal and use the LLC-specific window.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "lp-or-llp",
        label: "LP, LLP, business trust, or professional association",
        deadline: "January 1 through December 31",
        amount: "$7, or $0 for qualifying not-for-profit entities",
        normalRule:
          "These Pennsylvania filings use the longest annual-report window in the guide, so they should not be collapsed into the corporation or LLC timing.",
        lateRule:
          "The same 2027 enforcement timeline still matters if the filing is ignored once annual-report enforcement starts.",
        confirmRule:
          "Confirm the exact association type before using the year-end window because Pennsylvania groups several entity labels together here.",
        nextAction:
          "Use the Pennsylvania annual-report guidance or one-pager before filing.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 2]
      })
    ]
  }),
  "/tools/texas/franchise-tax-deadline/": decisionTool({
    caseLabel: "Which Texas filing situation fits best?",
    intro:
      "Texas is not just about whether tax is due. The May 15 deadline, no-tax-due threshold, and PIR or OIR requirement all need to stay in the same picture.",
    cases: [
      decisionCase({
        value: "no-tax-due",
        label: "Entity at or below the 2026 no-tax-due threshold",
        deadline: "May 15",
        amount: "$2,650,000 no-tax-due threshold for 2026 reports",
        normalRule:
          "Even when no franchise tax is due under the threshold rule, Texas still expects the appropriate Public Information Report or Ownership Information Report.",
        lateRule:
          "Texas publishes a $50 penalty for each late report, and overdue accounts can still move into additional enforcement steps.",
        confirmRule:
          "Confirm the report year and threshold before relying on the no-tax-due reading because Texas changed the reporting rules for returns due on or after January 1, 2024.",
        nextAction:
          "Use the Comptroller account and the PIR or OIR guidance before you stop at a zero-tax answer.",
        sourceIndexes: [1, 3, 4],
        lateSourceIndexes: [1, 2, 6],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "tax-due",
        label: "Entity that may owe franchise tax",
        deadline: "May 15",
        amount: "Tax can be due, plus late-report and late-tax penalties if not filed on time",
        normalRule:
          "The normal Texas filing path here is still May 15, but the entity must handle both the tax calculation and the related information report.",
        lateRule:
          "Texas says late reports draw a $50 penalty, and late tax can carry 5% or 10% tax penalties depending on how late the payment is.",
        confirmRule:
          "Confirm whether tax is actually due before filing because the information-report obligation still continues either way.",
        nextAction:
          "Use the Comptroller franchise-tax page, due-date guidance, and Webfile timing rules before paying.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [1, 2, 6],
        confirmSourceIndexes: [1, 2, 5]
      }),
      decisionCase({
        value: "pir-or-oir",
        label: "Entity checking PIR versus OIR",
        deadline: "May 15",
        amount: "The key issue is the correct information report, not a separate filing fee",
        normalRule:
          "Texas splits the information report into PIR versus OIR, and using the wrong report type is one of the easiest ways to under-read the filing requirement.",
        lateRule:
          "If the report is late, Texas still applies the late-report penalty and can escalate the account if it stays unresolved.",
        confirmRule:
          "Match the entity type to the Comptroller's PIR and OIR guidance before filing, especially for trusts, associations, or combined-group members.",
        nextAction:
          "Use the Comptroller PIR or OIR guidance before submitting the franchise-tax filing.",
        sourceIndexes: [2, 3],
        lateSourceIndexes: [1, 2, 6],
        confirmSourceIndexes: [2, 3]
      })
    ]
  }),
  "/tools/washington/annual-report-deadline-guide/": decisionTool({
    caseLabel: "Which Washington case fits best?",
    intro:
      "Washington is fairly clean on timing, but the status path splits between regular filings, delinquent filings, and the domestic-versus-foreign late consequence.",
    cases: [
      decisionCase({
        value: "domestic-for-profit",
        label: "Domestic for-profit entity",
        deadline: "By the end of the anniversary month each year",
        amount: "$70 on time or $95 with the delinquency fee",
        normalRule:
          "Washington says the annual report is due by the end of the anniversary month, and the report can be filed within 180 days before expiration.",
        lateRule:
          "If the report is not filed, Washington sends a delinquency notice and later moves domestic entities toward administrative dissolution after the published timeline.",
        confirmRule:
          "Confirm the anniversary month on the state record because that is the control point for the due date.",
        nextAction:
          "Use the Corporations and Charities Filing System and the fee schedule before filing.",
        sourceIndexes: [1, 2, 4, 5],
        lateSourceIndexes: [1, 5, 6],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "foreign-for-profit",
        label: "Foreign for-profit entity",
        deadline: "By the end of the anniversary month each year",
        amount: "$70 on time or $95 with the delinquency fee",
        normalRule:
          "Foreign Washington entities use the same annual-report timing and fee structure on the front end.",
        lateRule:
          "Washington says foreign entities move toward a statement of termination 90 days after expiration if the annual report still is not filed.",
        confirmRule:
          "Confirm whether the entity is domestic or foreign because the late-status consequence changes even when the standard fee does not.",
        nextAction:
          "Use the official filing system and the Washington misleading-notice alert before paying any third party.",
        sourceIndexes: [1, 2, 4, 5],
        lateSourceIndexes: [1, 5, 6],
        confirmSourceIndexes: [1, 3]
      })
    ]
  }),
  "/tools/new-jersey/annual-report-deadline/": decisionTool({
    caseLabel: "Which New Jersey entity type fits best?",
    intro:
      "New Jersey's anniversary-month rule is simple. The important split is the entity fee and the repeated non-filing consequence.",
    cases: [
      decisionCase({
        value: "for-profit",
        label: "For-profit corporation, LLC, LP, or LLP",
        deadline: "Every year on the last day of the anniversary month",
        amount: "$75",
        normalRule:
          "New Jersey uses a recurring annual-report rule for these registered businesses, with the due date tied to the anniversary month rather than a flat calendar date.",
        lateRule:
          "New Jersey emphasizes loss of authority and registration benefits after repeated missed reports more than a flat late fee.",
        confirmRule:
          "Confirm that the entity is registered in New Jersey and use the anniversary month from the state record before relying on the summary.",
        nextAction:
          "Use the Business.NJ annual-report page and the online annual-reports portal before filing.",
        sourceIndexes: [1, 3, 6],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 3]
      }),
      decisionCase({
        value: "nonprofit",
        label: "Non-profit corporation",
        deadline: "Every year on the last day of the anniversary month",
        amount: "$30",
        normalRule:
          "The anniversary-month timing stays the same, but the nonprofit annual-report fee is lower than the for-profit amount.",
        lateRule:
          "The more important official risk is still status loss after repeated missed reports, not a prominently published flat late fee.",
        confirmRule:
          "Confirm that the corporation is nonprofit before relying on the $30 fee answer.",
        nextAction:
          "Use the New Jersey fee schedule and annual-reports portal together before filing.",
        sourceIndexes: [1, 3, 4, 6],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [3, 4]
      })
    ]
  }),
  "/tools/virginia/annual-registration-fee-deadline/": decisionTool({
    caseLabel: "Which Virginia filing label fits best?",
    intro:
      "Virginia is exactly the kind of state that gets misread when people compress everything into one annual-report rule. The filing label changes by entity type.",
    cases: [
      decisionCase({
        value: "corporation",
        label: "Corporation",
        deadline: "Last day of the month of incorporation or Virginia registration",
        amount: "No annual-report fee; annual registration fee varies for stock corporations or is $25 for nonstock corporations",
        normalRule:
          "Virginia corporations use both the annual report and the annual registration fee framework, so the fee answer depends on whether the corporation is stock or nonstock.",
        lateRule:
          "Virginia says missed corporation annual reports change the business to not-in-good-standing status, and foreign-corporation authority can later be revoked if the annual report or fee is not handled.",
        confirmRule:
          "Confirm whether the corporation is stock, nonstock, domestic, or foreign before relying on the fee answer.",
        nextAction:
          "Use the Virginia annual-report FAQ, fee schedule, and CIS filing system before paying.",
        sourceIndexes: [1, 2, 4, 5],
        lateSourceIndexes: [2, 3],
        confirmSourceIndexes: [1, 2, 4]
      }),
      decisionCase({
        value: "llc",
        label: "LLC",
        deadline: "Last day of the month the LLC was organized or registered",
        amount: "$50",
        normalRule:
          "Virginia LLCs use the annual registration fee path rather than a corporation annual-report-plus-fee structure.",
        lateRule:
          "Virginia's maintenance guidance treats missed recurring filings as a status problem, so use the official system if the LLC may already be behind.",
        confirmRule:
          "Confirm the organization or registration month on the SCC record before relying on the due date.",
        nextAction:
          "Wait for the SCC assessment notice if needed, then use CIS to pay the fee.",
        sourceIndexes: [1, 3, 5],
        lateSourceIndexes: [3, 6],
        confirmSourceIndexes: [1, 3]
      }),
      decisionCase({
        value: "lp-or-business-trust",
        label: "LP or business trust",
        deadline: "Treat the annual registration fee as something to clear no later than September 30 or October 1",
        amount: "$50",
        normalRule:
          "Virginia's fee pages and maintenance guidance do not read like a simple anniversary-month rule here, so this guide uses a conservative fall timing answer.",
        lateRule:
          "Virginia says unpaid LP or business-trust registration fees can lead to automatic cancellation by December 31.",
        confirmRule:
          "Use the state record and current SCC guidance before postponing this filing to year end.",
        nextAction:
          "Use the Virginia fee page and maintenance guidance before paying through CIS.",
        sourceIndexes: [1, 3, 5],
        lateSourceIndexes: [3],
        confirmSourceIndexes: [1, 3, 4]
      }),
      decisionCase({
        value: "llp-or-lllp",
        label: "LLP or LLLP continuation report",
        deadline: "July 1",
        amount: "$50",
        normalRule:
          "Virginia LLPs and LLLPs use the annual continuation-report label, not the corporation or LLC terminology.",
        lateRule:
          "Virginia says the notice of impending cancellation goes out by September 1 and automatic cancellation follows if the report still is not filed by November 1.",
        confirmRule:
          "Confirm that the entity is truly in the LLP or LLLP continuation-report category before using the July 1 deadline.",
        nextAction:
          "Use the SCC continuation-report guidance and CIS filing system before filing.",
        sourceIndexes: [1, 3, 5],
        lateSourceIndexes: [2, 3],
        confirmSourceIndexes: [1, 3]
      })
    ]
  }),
  "/tools/colorado/periodic-report-deadline/": decisionTool({
    caseLabel: "Which Colorado status fits best?",
    intro:
      "Colorado is more about status than entity type. The same business can move from regular filing to noncompliant to delinquent, with a different filing at the end of that path.",
    cases: [
      decisionCase({
        value: "regular-periodic-report",
        label: "Regular periodic report",
        deadline: "File beginning two months before the periodic report month and no later than the last day of the second month after it",
        amount: "$25",
        normalRule:
          "Colorado centers the rule on the periodic report month shown on the entity summary page, and the regular periodic report is the standard recurring filing.",
        lateRule:
          "If the report is not filed by the regular due date, Colorado moves the entity into noncompliant status and a late report is still due before delinquency.",
        confirmRule:
          "Use the Colorado record to confirm the periodic report month before relying on the date range.",
        nextAction:
          "Search the business record and file electronically through the official Colorado SOS path.",
        sourceIndexes: [1, 3, 4],
        lateSourceIndexes: [2, 4],
        confirmSourceIndexes: [1, 4]
      }),
      decisionCase({
        value: "noncompliant-late-report",
        label: "Noncompliant but still in the late-report window",
        deadline: "Use the late-report window shown by Colorado's example; the January example runs through May 31",
        amount: "$25 report fee plus $50 late filing penalty",
        normalRule:
          "Colorado's own example shows that the entity can still file the periodic report after the regular due date while in noncompliant status.",
        lateRule:
          "This is exactly the stage where the published $50 late filing penalty matters, but the business has not yet moved into the separate delinquency-cure filing.",
        confirmRule:
          "Use the entity's periodic report month and the SOS late-status example before guessing at the late window.",
        nextAction:
          "File the periodic report electronically through the Colorado record while the entity is still in the late-report stage.",
        sourceIndexes: [1, 2, 3, 4],
        lateSourceIndexes: [2, 3, 4],
        confirmSourceIndexes: [1, 2]
      }),
      decisionCase({
        value: "delinquent-cure",
        label: "Already delinquent and curing status",
        deadline: "Use the SOS delinquency path once the regular and late periodic-report windows are missed",
        amount: "$100 Statement Curing Delinquency",
        normalRule:
          "Once Colorado moves the entity to delinquent status, the business is no longer using the standard periodic-report filing as the recovery step.",
        lateRule:
          "The late-state consequence here is the switch to the separate Statement Curing Delinquency with its own published fee.",
        confirmRule:
          "Confirm the current status on the state record before paying because delinquent entities use a different filing than noncompliant entities.",
        nextAction:
          "Use the Colorado business forms and filing instructions for the Statement Curing Delinquency.",
        sourceIndexes: [2, 3, 4],
        lateSourceIndexes: [2, 3, 4],
        confirmSourceIndexes: [2, 4]
      })
    ]
  }),
  "/tools/oregon/annual-report-deadline/": decisionTool({
    caseLabel: "Which Oregon rule set fits best?",
    intro:
      "Oregon is easy on timing and tricky on price. The anniversary-date rule is broad, but the fee changes a lot between domestic and foreign filings.",
    cases: [
      decisionCase({
        value: "domestic-business",
        label: "Domestic corporation, LLC, nonprofit, or LP",
        deadline: "Annual on the anniversary date of the original filing",
        amount: "Usually $100 for domestic renewals",
        normalRule:
          "For many domestic Oregon entities, the simple answer is the anniversary-date renewal with the common $100 fee.",
        lateRule:
          "If the annual report is missed, Oregon says the entity can move into administrative dissolution and later reinstatement with the missed annual fee or fees.",
        confirmRule:
          "Confirm that the business is domestic and not foreign before using the common $100 answer.",
        nextAction:
          "Use Oregon Business Registry renewal tools and the public business record before filing.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 5]
      }),
      decisionCase({
        value: "foreign-business",
        label: "Foreign corporation, foreign LLC, or foreign LP",
        deadline: "Annual on the anniversary date of the original filing",
        amount: "Usually $275 for foreign renewals",
        normalRule:
          "Foreign Oregon business entities use the same anniversary-date timing but a materially higher recurring annual-report fee.",
        lateRule:
          "The missed-report consequence still leads toward dissolution or loss of status and later reinstatement costs if the entity is eligible.",
        confirmRule:
          "Confirm that the entity is foreign-qualified before using the $275 answer because Oregon's domestic and foreign fees are easy to confuse.",
        nextAction:
          "Use the Oregon fee schedule and public business record together before filing.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 5]
      }),
      decisionCase({
        value: "foreign-nonprofit",
        label: "Foreign nonprofit corporation",
        deadline: "Annual on the anniversary date of the original filing",
        amount: "$50",
        normalRule:
          "Foreign nonprofit renewals are the notable Oregon exception where the annual fee is lower than the broader foreign-business amount.",
        lateRule:
          "Missed annual reports still move into the same status and reinstatement framework if the entity becomes administratively dissolved.",
        confirmRule:
          "Confirm that the entity is specifically a foreign nonprofit before using this lower fee.",
        nextAction:
          "Use the Oregon fee schedule and public record before filing.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [4, 5],
        confirmSourceIndexes: [1, 5]
      })
    ]
  })
};
