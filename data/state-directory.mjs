import { expansionStateDirectory } from "./state-expansion.mjs";

export const coverageBuckets = [
  {
    key: "annual-reports",
    label: "Annual report guides",
    description:
      "Recurring annual-report pages where the state publishes a recognizable report cycle and fee structure."
  },
  {
    key: "annual-registration-and-tax",
    label: "Annual registration and annual tax guides",
    description:
      "States where the recurring compliance item is not just an annual report and the filing label changes by entity type."
  },
  {
    key: "recurring-fees-and-statements",
    label: "Recurring fee and statement tools",
    description:
      "Statement, biennial, information-report, annual-list, and franchise-tax pages that need tighter entity-level breakdowns."
  }
];

const baseStateDirectory = [
  {
    state: "North Carolina",
    route: "/tools/north-carolina/annual-report-deadline/",
    guideLabel: "North Carolina annual report fee and deadline",
    chipLabel: "NC LLCs",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "LLC and L3C due date, corporation timing, and the current online versus paper fee split.",
    directoryCardDescription:
      "LLC, L3C, and corporation timing with the current online and paper filing-fee split.",
    homeComparison: {
      focus: "LLC or L3C",
      deadline: "April 15",
      fee: "$202-$203 online / $200 paper",
      lateRule: "No flat late fee stated on the due-date chart"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "LLCs, L3Cs, corporations, partnerships",
      deadline: "April 15 for LLCs; fiscal-year-based for corporations",
      amount: "$202-$203 online or $200 paper for LLCs"
    }
  },
  {
    state: "Georgia",
    route: "/tools/georgia/annual-report-deadline/",
    guideLabel: "Georgia annual report and registration deadline",
    chipLabel: "Georgia registration",
    guideType: "Annual registration guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "January 1 to April 1 timing, common $60 online total, and the published $25 late penalty.",
    directoryCardDescription:
      "January 1 to April 1 timing, common $60 online total for many profit entities, and the published $25 late penalty.",
    homeComparison: {
      focus: "Profit corporation or LLC",
      deadline: "April 1",
      fee: "$60 common online total",
      lateRule: "$25 late penalty"
    },
    directoryComparison: {
      obligation: "Annual registration",
      entityFocus: "Business entities using the annual registration portal",
      deadline: "April 1",
      amount: "Varies by entity type; common $60 online total"
    }
  },
  {
    state: "Pennsylvania",
    route: "/tools/pennsylvania/annual-report-deadline/",
    guideLabel: "Pennsylvania annual report fee and deadline",
    chipLabel: "PA annual reports",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "2025 annual report rollout, $7 filing fee, and the 2027 late-enforcement timeline.",
    directoryCardDescription:
      "2025 launch rules, $7 filing fee, and the delayed enforcement window that begins with reports due in 2027.",
    homeComparison: {
      focus: "Pennsylvania LLC, corporation, LP, or LLP",
      deadline: "Window depends on association type; LLCs use January 1 to September 30",
      fee: "$7",
      lateRule: "Administrative action begins in 2027, six months after due date"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Corporations, LLCs, LPs, LLPs, and similar associations",
      deadline: "Window changes by association type; LLCs use January 1 to September 30",
      amount: "$7 standard fee for most business entities"
    }
  },
  {
    state: "Delaware",
    route: "/tools/delaware/annual-report-deadline/",
    guideLabel: "Delaware annual report and annual tax deadline",
    chipLabel: "Delaware filing split",
    guideType: "Annual report plus annual tax guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: true,
    homeCardDescription:
      "Domestic corporations, foreign corporations, and Delaware LLC annual tax are separated clearly.",
    directoryCardDescription:
      "Separates domestic corporations, foreign corporations, and the June 1 Delaware LLC annual tax.",
    homeComparison: {
      focus: "Domestic corporation",
      deadline: "March 1",
      fee: "$50 filing fee plus franchise tax",
      lateRule: "$200 penalty plus 1.5% monthly interest"
    },
    directoryComparison: {
      obligation: "Annual report or annual tax",
      entityFocus: "Domestic corporations, foreign corporations, LLCs, LPs, GPs",
      deadline: "March 1, June 1, or June 30 depending on entity type",
      amount: "$50 annual report fee or $300 LLC annual tax"
    }
  },
  {
    state: "Florida",
    route: "/tools/florida/annual-report-deadline/",
    guideLabel: "Florida annual report fee and deadline",
    chipLabel: "Florida annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "May 1 filing deadline, entity-specific annual report fees, $400 late-fee rules, and September dissolution timing.",
    directoryCardDescription:
      "May 1 deadline, $400 late-fee rules, September dissolution timing, and separate fee schedules for corporations, LLCs, and partnerships.",
    homeComparison: {
      focus: "Profit corporation or LLC filing an annual report",
      deadline: "January 1 to May 1",
      fee: "$150 for profit corporations or $138.75 for LLCs",
      lateRule:
        "$400 late fee after May 1 for profit corporations, LLCs, LPs, and LLLPs; dissolution or revocation after the September cutoff"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Profit and non-profit corporations, LLCs, LPs, and LLLPs",
      deadline: "January 1 to May 1, then September dissolution cutoff",
      amount:
        "$61.25 to $500.00 depending on entity type, plus a $400 late fee for most for-profit entities after May 1"
    }
  },
  {
    state: "Nevada",
    route: "/tools/nevada/annual-fee-calculator/",
    guideLabel: "Nevada annual fee calculator",
    chipLabel: "Nevada annual fees",
    guideType: "Interactive recurring-fee guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: true,
    homeCardDescription:
      "Annual list fees, state business license renewal, and late penalties for LLCs and corporations.",
    directoryCardDescription:
      "Annual list fees, business license renewals, and published late penalties for LLCs and corporations.",
    homeComparison: {
      focus: "LLC",
      deadline: "Last day of anniversary month",
      fee: "$150 annual list + $200 state business license",
      lateRule: "$75 annual-list penalty + $100 license penalty"
    },
    directoryComparison: {
      obligation: "Annual list and business license renewal",
      entityFocus: "LLCs and corporations",
      deadline: "Last day of anniversary month",
      amount: "$350 recurring LLC state total before late penalties"
    }
  },
  {
    state: "Texas",
    route: "/tools/texas/franchise-tax-deadline/",
    guideLabel: "Texas franchise tax deadline",
    chipLabel: "Texas franchise tax",
    guideType: "Franchise tax guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "May 15 due date, 2026 no-tax-due threshold, information-report requirements, and published late penalties.",
    directoryCardDescription:
      "May 15 filing timing, 2026 no-tax-due threshold, information-report rules, and late-report penalties.",
    homeComparison: {
      focus: "Texas taxable entity filing franchise tax",
      deadline: "May 15, or the next business day if the date falls on a weekend or holiday",
      fee: "$2,650,000 no-tax-due threshold for 2026 reports",
      lateRule: "$50 per late report, plus separate late-tax penalties if tax is due"
    },
    directoryComparison: {
      obligation: "Franchise tax report plus PIR or OIR",
      entityFocus: "Taxable entities that must file a Texas franchise tax return",
      deadline: "May 15, or the next business day if the date falls on a weekend or holiday",
      amount: "$2,650,000 no-tax-due threshold for 2026 reports"
    }
  },
  {
    state: "Kansas",
    route: "/tools/kansas/information-report-deadline/",
    guideLabel: "Kansas information report deadline",
    chipLabel: "Kansas info report",
    guideType: "Information report guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "Biennial filing cadence, April 15 or June 15 due dates, three-month delinquency window, and the confirmed LLC filing fee.",
    directoryCardDescription:
      "Biennial filing timing, April 15 or June 15 due dates, three-month delinquency window, and confirmed Kansas LLC filing fees.",
    homeComparison: {
      focus: "Kansas LLC or other business filing an information report",
      deadline: "April 15 for for-profit businesses; June 15 for not-for-profits",
      fee: "$53 online or $55 paper for Kansas LLCs",
      lateRule: "Three-month delinquency interval, then forfeiture"
    },
    directoryComparison: {
      obligation: "Biennial information report",
      entityFocus:
        "For-profit and not-for-profit businesses on file with the Secretary of State",
      deadline:
        "April 15 or June 15 depending on business type and formation-year parity",
      amount: "$53 online or $55 paper for Kansas LLCs"
    }
  },
  {
    state: "New York",
    route: "/tools/new-york/biennial-statement-deadline/",
    guideLabel: "New York biennial statement deadline",
    chipLabel: "New York biennial",
    guideType: "Biennial statement guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "$9 filing fee, due-month filing rule, no expedited handling, and past-due status consequences for LLCs and corporations.",
    directoryCardDescription:
      "$9 filing fee, due-month filing rule, no expedited handling, and the official past-due status consequences for corporations and LLCs.",
    homeComparison: {
      focus: "New York business corporation or LLC",
      deadline: "Every two years during the calendar month of formation or authority",
      fee: "$9 biennial statement",
      lateRule: "No flat DOS late fee listed; the filing status shows as past due"
    },
    directoryComparison: {
      obligation: "Biennial Statement",
      entityFocus: "Domestic and foreign business corporations and LLCs",
      deadline: "File every two years during the calendar month of formation or authority",
      amount: "$9 filing fee"
    }
  },
  {
    state: "California",
    route: "/tools/california/statement-of-information-deadline/",
    guideLabel: "California Statement of Information deadline",
    chipLabel: "California SOI",
    guideType: "Statement of Information guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "$25 stock corporation fee, $20 California LLC fee, six-month filing window, and delinquency or suspension risk.",
    directoryCardDescription:
      "$25 stock corporation fee, $20 California LLC fee, six-month filing window, and official delinquency and suspension language.",
    homeComparison: {
      focus: "California stock corporation or LLC filing a Statement of Information",
      deadline: "Within 90 days initially, then annual or biennial by entity type",
      fee: "$25 for stock corporations; $20 for California LLCs",
      lateRule: "FTB penalty and suspension or forfeiture risk after delinquency"
    },
    directoryComparison: {
      obligation: "Statement of Information",
      entityFocus: "Stock corporations and LLCs",
      deadline:
        "Annual for stock corporations; every two years for LLCs, with an official six-month filing window",
      amount: "$25 for stock corporations and $20 for LLCs"
    }
  },
  {
    state: "Washington",
    route: "/tools/washington/annual-report-deadline-guide/",
    guideLabel: "Washington annual report fee and deadline",
    chipLabel: "Washington annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "$70 for-profit fee, $95 delinquent total, end-of-anniversary-month deadline, and the dissolution or termination sequence.",
    directoryCardDescription:
      "$70 for-profit filing fee, $95 delinquent total, end-of-anniversary-month deadline, and the official delinquency or dissolution sequence.",
    homeComparison: {
      focus: "For-profit business filing an annual report",
      deadline: "By the end of the anniversary month each year",
      fee: "$70 for for-profit businesses",
      lateRule:
        "$25 delinquency fee, then domestic dissolution at 120 days or foreign termination at 90 days"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "For-profit business entities",
      deadline: "End of the anniversary month",
      amount: "$70 annual report or $95 with delinquency fee"
    }
  },
  {
    state: "Connecticut",
    route: "/tools/connecticut/annual-report-deadline/",
    guideLabel: "Connecticut annual report fee and deadline",
    chipLabel: "Connecticut annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "LLC, corporation, LLP, and LP fee table, reminder timing, overdue consequences, and certificate-of-legal-existence impact.",
    directoryCardDescription:
      "LLC, corporation, LLP, and LP fees, reminder timing, overdue consequences, and certificate-of-legal-existence limits.",
    homeComparison: {
      focus: "LLC, corporation, LLP, or LP filing an annual report",
      deadline: "Check the due date on the state business filing page; report is annual",
      fee:
        "$80 for LLCs, LLPs, and LPs; $150 domestic stock corporation; $50 non-stock corporation",
      lateRule:
        "Overdue entities cannot get a certificate of legal existence and may be dissolved"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "LLCs, stock and non-stock corporations, LLPs, and LPs",
      deadline: "Annual; due date shown in the state filing system and reminder notices",
      amount: "$80 to $435 depending on entity type"
    }
  },
  {
    state: "New Jersey",
    route: "/tools/new-jersey/annual-report-deadline/",
    guideLabel: "New Jersey annual report fee and deadline",
    chipLabel: "New Jersey annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Anniversary-month filing rule, $75 for-profit fee, $30 non-profit fee, and the two-missed-report status risk.",
    directoryCardDescription:
      "Annual report timing tied to the anniversary month, clear fee split by profit status, and repeated non-filing consequences.",
    homeComparison: {
      focus: "Registered New Jersey business entity",
      deadline: "Last day of the anniversary month",
      fee: "$75 for for-profit entities; $30 for non-profits",
      lateRule: "After two missed reports, the business may lose authority and registration benefits"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Corporations, LLCs, LPs, LLPs, and non-profits registered in New Jersey",
      deadline: "Every year on the last day of the anniversary month",
      amount: "$75 for for-profit entities and $30 for non-profit corporations"
    }
  },
  {
    state: "Virginia",
    route: "/tools/virginia/annual-registration-fee-deadline/",
    guideLabel: "Virginia annual registration fee and annual report deadline",
    chipLabel: "Virginia entity split",
    guideType: "Annual registration and report guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "Separates corporations, LLCs, LPs, business trusts, and LLP continuation reports so Virginia's recurring rules do not get blended together.",
    directoryCardDescription:
      "Entity-specific annual report, annual registration fee, and continuation-report rules for Virginia corporations, LLCs, LPs, business trusts, and LLPs.",
    homeComparison: {
      focus: "Virginia corporation, LLC, LP, business trust, or LLP",
      deadline: "Entity-specific; last day of formation month for many entities, July 1 for LLPs",
      fee: "$50 for LLCs, LPs, business trusts, LLPs, and LLLPs; corporation fee varies",
      lateRule:
        "Loss of good standing, revocation, or cancellation depending on entity type"
    },
    directoryComparison: {
      obligation: "Annual report, annual registration fee, or continuation report",
      entityFocus: "Corporations, LLCs, LPs, business trusts, LLPs, and LLLPs",
      deadline:
        "Last day of formation month for corporations and LLCs, October 1 for LPs and business trusts, or July 1 for LLPs and LLLPs",
      amount: "$50 for most non-corporate recurring filings; corporation fee varies by share count"
    }
  },
  {
    state: "Colorado",
    route: "/tools/colorado/periodic-report-deadline/",
    guideLabel: "Colorado periodic report fee and due date",
    chipLabel: "Colorado periodic report",
    guideType: "Periodic report guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "Periodic report month timing, electronic-only filing, $25 filing fee, and the late-penalty path before delinquency.",
    directoryCardDescription:
      "Colorado periodic report timing, $25 filing fee, $50 late penalty, and the noncompliant-to-delinquent sequence.",
    homeComparison: {
      focus: "Colorado reporting entity",
      deadline: "Two months before through the last day of the second month after the report month",
      fee: "$25 periodic report",
      lateRule: "$50 late filing penalty, then $100 to cure delinquency"
    },
    directoryComparison: {
      obligation: "Periodic report",
      entityFocus:
        "LLCs, corporations, nonprofits, foreign entities, LLPs, LLLPs, and reporting LPs",
      deadline:
        "File beginning two months before the periodic report month and no later than the last day of the second month after it",
      amount: "$25 filing fee, $50 late filing penalty, or $100 statement curing delinquency"
    }
  },
  {
    state: "Oregon",
    route: "/tools/oregon/annual-report-deadline/",
    guideLabel: "Oregon annual report fee and due date",
    chipLabel: "Oregon annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Anniversary-date renewals, 45-day reminder timing, common domestic versus foreign fee splits, and reinstatement guidance after missed reports.",
    directoryCardDescription:
      "Anniversary-date annual reports, Oregon fee splits by entity type, reminder timing, and reinstatement guidance for missed filings.",
    homeComparison: {
      focus: "Oregon corporation, LLC, nonprofit, or LP",
      deadline: "Anniversary date of the original filing",
      fee: "$100 for many domestic renewals; $275 for many foreign renewals",
      lateRule: "Administrative dissolution, then reinstatement fee plus missed annual fee(s)"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Corporations, LLCs, nonprofits, and limited partnerships",
      deadline: "Annual on the anniversary date of the original filing",
      amount: "$50 to $275 depending on entity type"
    }
  },
  {
    state: "Maine",
    route: "/tools/maine/annual-report-deadline/",
    guideLabel: "Maine annual report deadline",
    chipLabel: "Maine annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "June 1 deadline, domestic and foreign fee splits, courtesy email reminders, and late-filing consequences.",
    directoryCardDescription:
      "June 1 annual report timing, Maine fee splits by domestic, foreign, and nonprofit status, and the late-filing consequence path.",
    homeComparison: {
      focus: "Maine corporation, LLC, LP, LLP, or nonprofit corporation",
      deadline: "June 1 each year, with the first filing due the year after formation",
      fee: "$85 domestic business, $150 foreign business, or $35 nonprofit",
      lateRule:
        "Late filing penalty is assessed after June 1, and unpaid penalties can lead to administrative dissolution or revocation"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Corporations, LLCs, LPs, LLPs, and nonprofit corporations",
      deadline: "First report due the year after filing; then every year between January 1 and June 1",
      amount:
        "$85 for domestic business entities, $150 for foreign business entities, and $35 for nonprofit corporations"
    }
  },
  {
    state: "Maryland",
    route: "/tools/maryland/annual-report-deadline/",
    guideLabel: "Maryland annual report and personal property return deadline",
    chipLabel: "Maryland annual filing",
    guideType: "Annual report plus personal property return guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "April 15 deadline, common $300 Form 1 fee, current property-return trigger, and good-standing consequences.",
    directoryCardDescription:
      "Maryland April 15 filing timing, Form 1 fee split, personal property return trigger, extension path, and good-standing consequences.",
    homeComparison: {
      focus: "Maryland corporation, LLC, LLP, LP, REIT, or statutory trust",
      deadline: "April 15 each year, with a 60-day extension available",
      fee: "$300 for most entities, $0 for non-stock corporations, or $100 for SDAT certified family farms",
      lateRule:
        "Missing the required filing can put the business out of good standing, trigger late fees, and block status cleanup until annual filings are cleared"
    },
    directoryComparison: {
      obligation: "Annual report and, when required, personal property tax return",
      entityFocus:
        "Corporations, LLCs, LLPs, LPs, REITs, and statutory trusts registered in Maryland",
      deadline:
        "First filing due the year after formation; then every year by April 15 unless an extension is requested",
      amount:
        "$300 for most Form 1 filers, $0 for non-stock corporations, and $100 for SDAT certified family farms"
    }
  },
  {
    state: "Wyoming",
    route: "/tools/wyoming/annual-report-deadline/",
    guideLabel: "Wyoming annual report deadline",
    chipLabel: "Wyoming annual report",
    guideType: "Annual report and license tax guide",
    coverageBucket: "annual-registration-and-tax",
    featuredInHomeNav: false,
    homeCardDescription:
      "Anniversary-month deadline, $60 minimum license tax for most profit entities, reminder emails, and delinquency rules.",
    directoryCardDescription:
      "Wyoming anniversary-month annual report timing, annual license tax rules, nonprofit fee treatment, and delinquency or reinstatement steps.",
    homeComparison: {
      focus: "Wyoming LLC, corporation, LP, LLP, nonprofit, or statutory trust",
      deadline: "First day of the anniversary month, starting with the first anniversary year",
      fee:
        "$60 minimum annual license tax for most profit entities, $25 nonprofits, or $100 statutory trusts and foundations",
      lateRule:
        "Missed filings make the entity delinquent, then administratively dissolved; reinstatement requires a $100 fee plus each delinquent annual report fee"
    },
    directoryComparison: {
      obligation: "Annual report and annual license tax",
      entityFocus:
        "LLCs, profit corporations, LPs, LLPs, nonprofits, statutory trusts, and statutory foundations",
      deadline:
        "Due each year on or before the first day of the anniversary month; report may be filed up to 120 days early",
      amount:
        "$60 minimum for most profit entities or .0002 of Wyoming assets, $25 nonprofits, and $100 statutory trusts or foundations"
    }
  }
];

export const stateDirectory = [...baseStateDirectory, ...expansionStateDirectory];
