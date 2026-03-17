export const structuredStateContentByFilePath = {
  "tools/california/statement-of-information-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "California stock corporations and LLCs do not follow the same cadence",
      headers: ["Entity type", "Initial due date", "Recurring rule", "Filing fee"],
      rows: [
        [
          "California stock corporation or qualified out-of-state corporation",
          "Within 90 days of initial registration",
          "Every year in the month of registration",
          "$25"
        ],
        [
          "California LLC or qualified out-of-state LLC",
          "Within 90 days of initial registration",
          "Every two years in the month of registration, in the matching odd or even year",
          "$20"
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Filing window",
      title: "Use the six-month California filing window, not just the due month",
      paragraphs: [
        "After the initial statement is filed, the California Secretary of State publishes a six-month filing window for later Statements of Information. That means the practical answer is wider than a single due month, and businesses can often file earlier without falling outside the correct cycle."
      ],
      headers: ["If your registration month is", "Filing window begins", "Filing window ends"],
      rows: [
        ["January", "August", "January"],
        ["June", "January", "June"],
        ["December", "July", "December"]
      ],
      note: "Use the official California month-by-month filing-window schedule if your registration month is not in this quick snapshot."
    },
    {
      type: "detailCards",
      eyebrow: "Late and status risk",
      title: "What happens if the statement is not filed",
      cards: [
        {
          title: "Delinquency and suspension path",
          text: "California says failure to file the required Statement of Information may lead to Franchise Tax Board penalties and suspension or forfeiture. The FAQ explains that the entity first receives a delinquency notice and an additional 60 days to file before the Secretary of State notifies the Franchise Tax Board."
        },
        {
          title: "Pending suspension or forfeiture notice",
          text: "If a Notice of Pending Suspension or Forfeiture has already been issued, California says the Statement of Information must be received and filed within 60 days from the notice date to avoid losing the entity's powers, rights, privileges, and name use."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful California filing details",
      headers: ["Question", "Official answer"],
      rows: [
        [
          "Will California remind you?",
          "The Secretary of State says it sends a reminder about three months before the filing is due."
        ],
        [
          "Can you use a no-change filing?",
          "California provides a Statement of No Change after the initial Statement of Information has been filed and if no changes have been made, subject to the state rules on the form."
        ],
        [
          "When should you file an update outside the normal cycle?",
          "California says an updated statement should be filed any time there are information changes between statutory filing periods."
        ]
      ]
    }
  ],
  "tools/connecticut/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee table",
      title: "Connecticut annual report fees from the current state guidance",
      headers: ["Entity type", "Domestic fee", "Foreign fee"],
      rows: [
        ["Limited Liability Company", "$80", "$80"],
        ["Stock Corporation", "$150", "$435"],
        ["Non-Stock Corporation", "$50", "$50"],
        ["Limited Liability Partnership", "$80", "$80"],
        ["Limited Partnership", "$80", "$80"]
      ],
      note: "The Connecticut filing guide also says the annual report fee is separate from the Connecticut Business Entity Tax."
    },
    {
      type: "table",
      eyebrow: "Timing and reminders",
      title: "How Connecticut tells you an annual report is due",
      headers: ["Question", "Official guidance used here"],
      rows: [
        [
          "How do you know when it is due?",
          "The state says to log into the business filing page or business record and check when the last annual report was filed and when the next one is due."
        ],
        [
          "Will the state remind you?",
          "Yes. Connecticut says it emails the address on file about one month before the report is due, or mails a postcard if no email address was provided."
        ],
        [
          "Can more than one year be due?",
          "Yes. The filing guide says the business screen may show more than one year requiring filing, and prior years must be filed before the current year's annual report."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "If you are overdue",
      title: "Why overdue Connecticut reports quickly become a status problem",
      cards: [
        {
          title: "Certificate of legal existence risk",
          text: "Connecticut says that if your report is overdue, you cannot get a certificate of legal existence. That can make financing, registrations, and other business transactions harder."
        },
        {
          title: "Possible dissolution",
          text: "The Office of the Secretary of the State may dissolve a business that does not file its annual report. If the record already shows overdue years, use the official filing portal and complete the older years first."
        },
        {
          title: "What the report actually covers",
          text: "The annual report updates basic company information such as principal details, registered-agent information, business email and address details, and NAICS data. Connecticut says the annual report does not include financial information."
        }
      ]
    }
  ],
  "tools/delaware/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Do not collapse these Delaware rules into one number",
      headers: ["Entity type", "Deadline", "Published filing fee or tax", "Late consequence"],
      rows: [
        [
          "Domestic corporation, non-exempt",
          "March 1",
          "$50 annual report filing fee plus franchise tax",
          "$200 penalty plus 1.5% interest per month on tax and penalty"
        ],
        [
          "Domestic corporation, exempt",
          "March 1",
          "$25 annual report filing fee",
          "$200 penalty if the annual report is not filed on time"
        ],
        [
          "Foreign corporation",
          "June 30",
          "$125 annual report filing fee",
          "$125 penalty if the report is not filed by the due date"
        ],
        [
          "Delaware LLC, LP, or GP",
          "June 1",
          "$300 annual tax",
          "$200 penalty plus 1.5% interest per month on tax and penalty"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Why Delaware confuses people",
      title: "The important distinction is report versus annual tax",
      cards: [
        {
          title: "Why the old LLC annual-report phrasing was wrong",
          text: "Delaware's own LLC, LP, and GP tax page says those entities do not file annual reports. They pay a yearly tax instead. That distinction matters because many third-party pages incorrectly frame the June 1 Delaware LLC tax as an annual report deadline."
        },
        {
          title: "Which filing path to use",
          text: "Delaware directs both domestic corporation annual reports and alternative-entity annual tax payments through the Division of Corporations online system. Use the official portal rather than a solicitation or reminder letter that did not come from the state or your registered agent."
        }
      ]
    }
  ],
  "tools/florida/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee table",
      title: "Florida annual report fees by entity type",
      headers: ["Entity type", "On-time annual report fee", "If received after May 1"],
      rows: [
        ["Profit corporation", "$150.00", "$550.00"],
        ["Non-profit corporation", "$61.25", "$61.25"],
        ["Limited liability company", "$138.75", "$538.75"],
        ["Limited partnership or limited liability limited partnership", "$500.00", "$900.00"]
      ],
      note: "The amount after May 1 is the published annual report fee plus Florida's $400 late fee for profit corporations, LLCs, LPs, and LLLPs."
    },
    {
      type: "table",
      eyebrow: "Timing",
      title: "Florida's filing window and late-file sequence",
      headers: ["Rule", "Official guidance used here"],
      rows: [
        [
          "When is the annual report due?",
          "Florida says annual reports are due every year between January 1 and May 1."
        ],
        [
          "How does mail payment timing work?",
          "The payment voucher and check or money order must be postmarked and mailed on or before May 1 to avoid the late fee."
        ],
        [
          "What happens after May 1?",
          "A $400 late fee is imposed on profit corporations, LLCs, LPs, and LLLPs. Non-profit corporations are not subject to that late fee."
        ],
        [
          "What happens if you still do not file?",
          "If the annual report is not filed by the third Friday in September, the entity is administratively dissolved or revoked in the state's records on the fourth Friday in September."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and reinstatement",
      title: "Why waiting past May gets expensive fast",
      cards: [
        {
          title: "What the Florida annual report does",
          text: "Florida says the annual report updates or confirms the Division of Corporations' records. It is not a financial statement. The report must be filed each year to keep the entity in active status, even if no changes are needed."
        },
        {
          title: "Reinstatement is separate from the late fee",
          text: "Once an entity is administratively dissolved or revoked, Florida requires a reinstatement filing plus associated fees. The published fee schedules separate those reinstatement charges from the annual report late fee, so waiting into September makes the cleanup materially more expensive."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Reinstatement snapshot",
      title: "Published reinstatement fees Florida lists separately",
      headers: ["Entity type", "Reinstatement fee shown by Florida"],
      rows: [
        ["Profit corporation", "$600.00 plus each year annual report fee"],
        ["Non-profit corporation", "$175.00 plus each year annual report fee"],
        ["Limited liability company", "$100.00 plus each year annual report fee"],
        ["Limited partnership or LLLP", "$500.00 plus each year annual report due"]
      ]
    }
  ],
  "tools/new-york/biennial-statement-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Core rule",
      title: "What the New York Department of State says",
      headers: ["Item", "Official rule used on this page"],
      rows: [
        [
          "Who is covered",
          "Domestic and foreign business corporations and LLCs are required to file a Biennial Statement every two years."
        ],
        [
          "Due-month rule",
          "The filing period is the calendar month in which the original Certificate of Incorporation, Articles of Organization, or Application for Authority was filed with the Department of State."
        ],
        ["Filing fee", "$9 for a business corporation or LLC."],
        ["Expedited handling", "Expedited handling is not available for Biennial Statements."],
        [
          "How to file online",
          "Most entities can file online using the e-Statement Filing Service with the exact entity name and DOS ID number."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Past-due status",
      title: "Why the due month matters more than a flat late fee",
      cards: [
        {
          title: "What happens if you file late",
          text: "New York does not frame this page around a flat late fee. Instead, the Department of State says the entity will be reflected in state records as past due in the filing of its Biennial Statement. That status will also appear on a Certificate of Status or status letter and may interfere with business transactions."
        },
        {
          title: "Why the due month matters",
          text: "Many recurring-filing pages talk about a fixed annual deadline, but New York uses a formation-month rule. If your LLC was formed in July, the biennial statement is due every two years during July. Filing it early does not reset the underlying due month."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful details before you file",
      headers: ["Question", "Answer from the official guidance"],
      rows: [
        [
          "Will the state send a reminder?",
          "If an email address has been provided to the Department of State, the Department will send an email notice at the beginning of the month in which the Biennial Statement is due."
        ],
        [
          "Can you still file if it is already past due?",
          "Yes. The Department says past-due Biennial Statements may still be filed online, or a paper form may be requested if online filing is not available."
        ],
        [
          "Why does this filing matter?",
          "The Department explains that litigation is often initiated through service of process on the Secretary of State, so keeping the address on file current helps avoid missed process and default-judgment risk."
        ]
      ]
    }
  ],
  "tools/north-carolina/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee and deadline table",
      title: "What the North Carolina guidance says",
      headers: ["Entity type", "Published due date", "Online fee", "Paper fee"],
      rows: [
        [
          "Business corporation",
          "15th day of the fourth month following fiscal year end",
          "$20 ACH or $21 credit card",
          "$25"
        ],
        [
          "Limited Liability Company (LLC or L3C)",
          "April 15 each year after the year of creation",
          "$202 ACH or $203 credit card",
          "$200"
        ],
        [
          "Partnerships (LLP and LLLP)",
          "15th day of the fourth month after fiscal year end",
          "$202 ACH or $203 credit card",
          "$200"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "How to read the rule",
      title: "North Carolina gets easier once you separate entity type from payment method",
      cards: [
        {
          title: "How to read the deadline correctly",
          text: "LLCs in North Carolina are simpler than corporations because they use a fixed April 15 due date. Business corporations do not use that fixed date because the filing deadline tracks the entity's fiscal year end instead."
        },
        {
          title: "What happens if you are late",
          text: "The annual report due-date chart confirms when the filing is due and what the filing fee is, but it does not publish a flat late fee on the same page. If you are already overdue, check the Secretary of State filing instructions before relying on any third-party summary."
        },
        {
          title: "If the business was dissolved already",
          text: "The North Carolina reinstatement page says that when the ground for dissolution is failure to file annual reports, the business must file an annual report and pay the applicable filing fee for each missing year. Overdue entities should not stop at the current-year fee alone."
        },
        {
          title: "Where the fee math comes from",
          text: "North Carolina separates the statutory filing fee from the electronic payment fee. That is why the best planning answer is usually a paper amount plus a small online add-on for ACH or credit-card processing."
        }
      ]
    }
  ],
  "tools/pennsylvania/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Deadline table",
      title: "Pennsylvania filing windows by association type",
      headers: ["Association type", "Filing dates", "Published fee"],
      rows: [
        [
          "Corporations, business and nonprofit, domestic and foreign",
          "January 1 to June 30",
          "$7 for business corporations, $0 for nonprofits"
        ],
        [
          "Limited liability companies, domestic and foreign",
          "January 1 to September 30",
          "$7, or $0 for LLCs with a not-for-profit purpose"
        ],
        [
          "Limited partnerships, LLPs, business trusts, professional associations",
          "January 1 to December 31",
          "$7, or $0 for qualifying not-for-profit entities"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Enforcement and reinstatement",
      title: "What matters if the Pennsylvania filing is missed",
      cards: [
        {
          title: "What happens if you fail to file",
          text: "The Pennsylvania Department of State says failure to file will subject the association to administrative dissolution, termination, or cancellation and loss of protection of its name. Act 122 includes a transition period, and the state says entities that fail to file annual reports in the 2027 calendar year will be subject to enforcement six months after the due date."
        },
        {
          title: "Reinstatement note",
          text: "Domestic entities can reinstate after administrative dissolution or cancellation, but registered foreign associations generally must reregister instead of curing retroactively through reinstatement."
        }
      ]
    }
  ],
  "tools/texas/franchise-tax-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Core filing rules",
      title: "What the Texas Comptroller says for 2026 reports",
      headers: ["Item", "Official rule used on this page"],
      rows: [
        [
          "Annual due date",
          "The annual franchise tax report is due May 15. If May 15 falls on a weekend or holiday, the due date moves to the next business day, and Webfile payments must be submitted by 11:59 p.m. Central Time on the due date to be timely."
        ],
        ["2026 no-tax-due threshold", "$2,650,000."],
        [
          "No Tax Due Report change",
          "For reports originally due on or after January 1, 2024, entities at or below the no-tax-due threshold are no longer required to file a No Tax Due Report."
        ],
        [
          "Information report still required",
          "Even when no tax is due under the threshold rules, the filing still needs the appropriate Public Information Report or Ownership Information Report based on entity type."
        ],
        [
          "Late penalties",
          "$50 on each report filed after the due date. If tax is paid 1 to 30 days late, the tax penalty is 5%. If tax is paid more than 30 days late, the tax penalty is 10%."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "PIR versus OIR",
      title: "Which Texas information report applies",
      headers: ["Entity type", "Information report named in the Comptroller FAQ"],
      rows: [
        [
          "Corporations, LLCs, professional associations, limited partnerships, financial institutions",
          "Public Information Report (PIR)"
        ],
        [
          "Associations, trusts, and other taxable entities not listed above",
          "Ownership Information Report (OIR)"
        ],
        [
          "Members of a combined group with Texas nexus",
          "A separate PIR or OIR for each member, as described in the Comptroller FAQ"
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Timing and late-report risk",
      title: "The filing is not finished just because tax is zero",
      cards: [
        {
          title: "Newly taxable entities",
          text: "The Texas Comptroller FAQ says that an entity first subject to franchise tax on or after October 4, 2009 files its first annual report on May 15 of the year following the year it became subject to the tax."
        },
        {
          title: "What happens if you ignore it",
          text: "The clearest flat number is the $50 penalty for each late report. The Comptroller also states that tax paid late carries percentage penalties. If the issue continues, the state can move into forfeiture and reinstatement steps, so overdue entities should use the official filing and notice pages instead of guessing."
        }
      ]
    }
  ],
  "tools/washington/annual-report-deadline-guide/index.html": [
    {
      type: "table",
      eyebrow: "Official timing",
      title: "What the Washington Secretary of State says",
      headers: ["Item", "Official rule used on this page"],
      rows: [
        ["Annual report due date", "Annual report must be filed each year by the end of the anniversary month."],
        ["Early filing window", "Washington says the annual report may be filed within 180 days before the expiration date."],
        ["Filing fee for for-profit businesses", "$70, or $95 if filed with the delinquency fee."],
        ["Email reminder", "About 60 days prior to expiration."],
        ["Paper reminder", "About 45 to 60 days prior to expiration if electronic notification is not selected."],
        [
          "How to file",
          "Through the Corporations and Charities Filing System by selecting express annual report or by logging into the customer profile."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Delinquency sequence",
      title: "Washington publishes the late-status timeline clearly",
      cards: [
        {
          title: "Delinquency notice sequence",
          text: "Washington says a delinquency notice is sent on the first day of the month after the expiration date if the annual report has not been filed. The fee schedule shows a $95 total for an annual report with the delinquency fee. Submitted reports remain pending until processed by the Secretary of State."
        },
        {
          title: "Dissolution or termination timing",
          text: "The Washington Secretary of State says an administrative dissolution notice is sent 120 days after the expiration date to domestic entities without a filed annual report. Foreign entities instead receive a statement of termination 90 days after the expiration date if the annual report is still not filed."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical warning",
      title: "Washington explicitly warns about third-party solicitations",
      paragraphs: [
        "Washington has an unusually useful official page about misleading annual-report notices. The Secretary of State says a third-party service is not required to submit filings to the Corporations and Charities Division and points readers to the official fee schedule when notices quote higher fees."
      ],
      headers: ["Question", "Official answer used here"],
      rows: [
        [
          "Do you need a third-party service to file?",
          "No. Washington says a third-party service is not required to submit filings."
        ],
        [
          "What should you do if a quoted fee seems high?",
          "Compare it to the official Washington filing fee schedule and use the official filing system."
        ],
        [
          "What if the annual report is already overdue?",
          "File through the official system as soon as possible, expect the delinquency fee to apply, and use the 120-day or 90-day timeline above to judge urgency."
        ]
      ]
    }
  ]
};
