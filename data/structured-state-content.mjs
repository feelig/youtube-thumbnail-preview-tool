import { expansionStructuredStateContentByFilePath } from "./state-expansion.mjs";

const baseStructuredStateContentByFilePath = {
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
  ],
  "tools/georgia/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Georgia core rules",
      title: "What the Georgia Secretary of State says now",
      headers: ["Question", "Current Georgia answer used on this page"],
      rows: [
        [
          "When do annual registrations file?",
          "The Georgia Secretary of State says annual registrations are filed between January 1 and April 1 each year."
        ],
        [
          "When is the first filing usually due?",
          "Georgia FAQ guidance says corporations file the first annual registration between January 1 and April 1 of the calendar year after incorporation or registration."
        ],
        [
          "What fee should most customers expect first?",
          "The current Georgia guidance shows a common $60 online total for many profit entities, with lower totals published for some nonprofits and domestic LLPs."
        ],
        [
          "What happens if you miss April 1?",
          "The state currently publishes a $25 late penalty for the annual registration."
        ],
        [
          "Where should you file?",
          "Start with the Georgia annual registration instructions, then confirm the entity and filing path through the Secretary of State portal."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "How to read Georgia correctly",
      title: "Why this page does not use a flat Georgia fee",
      cards: [
        {
          title: "Why this page changed",
          text: "Georgia used to be summarized on this site with a flat $50 figure. That is too simple. The current official guidance surfaces a more useful customer answer: the deadline is shared, many profit entities now see a $60 online total, and lower totals exist for at least some nonprofit and domestic LLP filings."
        },
        {
          title: "What to do if you are already late",
          text: "Go directly to the Georgia annual registration instructions and filing portal, confirm the exact entity record, and expect the published $25 late penalty to matter. If your entity type or filing path is unusual, use the SOS guidance on the live record before relying on a generic third-party fee table."
        }
      ]
    }
  ],
  "tools/kansas/information-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Timing rules",
      title: "What the Kansas information-report page says",
      headers: ["Business type", "Filing cadence", "Due date", "After the due date"],
      rows: [
        [
          "For-profit businesses on file with the Kansas Secretary of State",
          "Biennial, in each succeeding odd or even year matching the formation year",
          "April 15",
          "Three-month delinquency interval, then forfeiture if still not filed"
        ],
        [
          "Not-for-profit businesses on file with the Kansas Secretary of State",
          "Biennial, in each succeeding odd or even year matching the formation year",
          "June 15",
          "Three-month delinquency interval, then forfeiture if still not filed"
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Kansas LLC fee detail",
      title: "What the Kansas LLC form confirms",
      headers: ["Item", "Official detail used on this page"],
      rows: [
        ["Online Kansas LLC filing fee", "$53"],
        ["Paper Kansas LLC filing fee", "$55"],
        [
          "Tax closing date example on the form",
          "If the entity's tax year ends on December 31, the report due-date period is between January 1 and April 15 after that December."
        ],
        [
          "Why the page says information report",
          "The Kansas website uses \"information report,\" while the entity form PDFs still use \"annual report\" language for the filing form itself."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and forfeiture risk",
      title: "Kansas becomes a status problem if the report is ignored",
      cards: [
        {
          title: "Delinquency and forfeiture",
          text: "Kansas gives every business a three-month delinquency interval after the due date. Once that interval passes, the Secretary of State says the business will forfeit and will not be able to file other documents until past-due reports are submitted and the business is reinstated."
        },
        {
          title: "What this page does not guess",
          text: "The general Kansas information-report page does not publish every entity-specific fee on one screen, so this guide only states the LLC fee that is directly confirmed by the Kansas LLC form. If you need another entity's exact filing fee, confirm it from the matching Kansas form before you file."
        }
      ]
    }
  ],
  "tools/nevada/annual-fee-calculator/index.html": [
    {
      type: "rawHtml",
      html: `<section class="tool-card surface" data-nevada-calculator="">
          <p class="eyebrow">Interactive breakdown</p>
          <h2><span data-nevada-title="">Nevada LLC</span> recurring annual fees</h2>
          <div class="calculator">
            <div class="toggle-group" role="radiogroup" aria-label="Nevada entity type">
              <label>
                <input type="radio" name="nevada-entity" value="llc" checked="">
                <span>LLC</span>
              </label>
              <label>
                <input type="radio" name="nevada-entity" value="corporation">
                <span>Corporation</span>
              </label>
            </div>

            <div class="breakdown-grid">
              <div class="breakdown-item">
                <span>Annual list fee</span>
                <strong data-annual-list-fee="">$150</strong>
              </div>
              <div class="breakdown-item">
                <span>State business license renewal</span>
                <strong data-business-license-fee="">$200</strong>
              </div>
              <div class="breakdown-item">
                <span>Recurring state total</span>
                <strong data-recurring-total="">$350</strong>
              </div>
              <div class="breakdown-item">
                <span>Total if filed late</span>
                <strong data-late-total="">$525</strong>
              </div>
            </div>

            <p class="calc-note" data-nevada-note="">
              Uses the Nevada LLC annual list fee in NRS 86.263 and the general state business
              license renewal fee in NRS 76.130.
            </p>
          </div>
        </section>`
    },
    {
      type: "detailCards",
      eyebrow: "Calculator scope",
      title: "What the Nevada calculator includes and what it leaves out",
      cards: [
        {
          title: "What the calculator includes",
          text: "The calculator adds the annual list fee and the state business license renewal fee. It also shows the published late penalties used for overdue annual lists and overdue state business license renewal payments."
        },
        {
          title: "What the calculator does not include",
          text: "It does not include registered-agent fees, local business licenses, expedited service, amendments, reinstatement costs, or any other private-service costs. This page is only tracking the recurring state-level items shown in the source set below."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Statutory basis",
      title: "Source rules behind the Nevada totals",
      headers: ["Rule", "Published amount or timing"],
      rows: [
        [
          "Nevada LLC annual list fee",
          "$150 with the annual list due by the last day of the anniversary month"
        ],
        [
          "Nevada corporation annual list fee",
          "$150 with the annual list due by the last day of the anniversary month"
        ],
        [
          "State business license renewal fee",
          "$200 generally, or $500 for corporations organized under chapters 78, 78A, or 78B and foreign corporations under chapter 80"
        ],
        [
          "Late penalties shown here",
          "$75 annual-list penalty and $100 state-business-license late penalty"
        ]
      ]
    }
  ],
  "tools/new-jersey/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee split",
      title: "New Jersey annual report fees depend mainly on entity type",
      headers: [
        "Entity type",
        "Recurring filing",
        "Main annual report fee shown by the state",
        "Practical note"
      ],
      rows: [
        [
          "For-profit corporation",
          "Annual report",
          "$75",
          "Reinstatement information shows delinquent reports plus a current annual report are due if the business falls out of status."
        ],
        [
          "Limited liability company",
          "Annual report",
          "$75",
          "The same $75 annual report fee appears on the DORES fee schedules and reinstatement guidance."
        ],
        [
          "Limited partnership or LLP",
          "Annual report",
          "$75",
          "New Jersey treats these as annual-report filers rather than splitting them into a separate annual-tax page."
        ],
        [
          "Non-profit corporation",
          "Annual report",
          "$30",
          "The fee schedules publish a lower annual report fee for non-profits."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Timing",
      title: "New Jersey ties the due date to the anniversary month",
      headers: ["Question", "Official guidance used here"],
      rows: [
        [
          "When is the report due?",
          "The New Jersey Small Business Manual says the annual report is due every year on the last day of the month in which the business completed formation."
        ],
        [
          "Does the rule also apply to authorized foreign entities?",
          "The state filing tools and business portal frame annual reports as a recurring filing for registered New Jersey business entities, including those authorized to do business in the state."
        ],
        [
          "Will the state send reminders?",
          "Yes. DORES says businesses can sign up for free electronic annual-report reminders through Gov2Go, and the Treasury also promotes mobile reminder services."
        ],
        [
          "Where do you file?",
          "New Jersey directs annual report filing through the state's online annual reports and change-services portal."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Status risk",
      title: "The real New Jersey risk is losing status, not a flat late fee",
      cards: [
        {
          title: "What happens after repeated missed reports",
          text: "The Business.NJ annual report page says that after two missed annual reports, a business may lose its authority to do business in New Jersey, its Business Registration Certificate may be invalidated, and it may lose access to state services such as licenses or funding opportunities."
        },
        {
          title: "Why New Jersey still needs a careful page",
          text: "The deadline rule itself is simple, but customers often confuse annual reports with tax filings or assume a missed due date only causes a minor late fee. New Jersey's official guidance emphasizes status loss and reinstatement costs instead."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Reinstatement and practical notes",
      title: "What to know if the business is already behind",
      headers: ["Question", "New Jersey answer"],
      rows: [
        [
          "Is there a prominently published flat late fee?",
          "Not on the main annual-report filing guidance. The more visible official consequence is loss of authority or deactivation after repeated missed reports."
        ],
        [
          "What does reinstatement usually require?",
          "New Jersey says reinstating a business generally requires delinquent annual reports, the current annual report, and a reinstatement filing fee, with additional tax-clearance rules in some corporation cases."
        ],
        [
          "Can businesses monitor future filings more closely?",
          "Yes. DORES also offers CorpWatch alerts so businesses can monitor filings added to the state's records."
        ],
        [
          "What information does the report confirm?",
          "The Business.NJ filing page says the annual report confirms contact information and business address details, and the DORES annual report service highlights registered-agent and public business-record information."
        ]
      ]
    }
  ],
  "tools/virginia/annual-registration-fee-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Virginia does not use one recurring filing rule for every entity type",
      headers: [
        "Entity type",
        "Main recurring filing or fee",
        "Deadline shown by Virginia SCC",
        "Published amount"
      ],
      rows: [
        [
          "Stock corporation",
          "Annual report plus annual registration fee",
          "Last day of the month of incorporation or Virginia registration",
          "Annual report has no fee; annual registration fee is based on authorized shares"
        ],
        [
          "Nonstock corporation",
          "Annual report plus annual registration fee",
          "Last day of the month of incorporation or Virginia registration",
          "No annual report fee; $25 annual registration fee"
        ],
        [
          "Limited liability company",
          "Annual registration fee",
          "Last day of the month the LLC was organized or registered",
          "$50"
        ],
        [
          "Limited partnership or business trust",
          "Annual registration fee",
          "Virginia fee pages say on or before October 1, while maintenance guidance warns of cancellation by December 31 if unpaid",
          "$50"
        ],
        ["LLP or LLLP", "Annual continuation report", "July 1", "$50"]
      ]
    },
    {
      type: "table",
      eyebrow: "Late-status rules",
      title: "What Virginia says happens when these filings are missed",
      headers: ["Rule", "Official guidance used on this page"],
      rows: [
        [
          "Corporation annual report",
          "If a corporation does not file its annual report by the due date, Virginia says the corporation will not be in good standing and that status change will be reflected in the Commission's records."
        ],
        [
          "Foreign corporation annual report or fee",
          "Virginia says a foreign corporation's authority will be automatically revoked if the annual registration fee is not paid or the annual report is not filed by the last day of the fourth month after the due date."
        ],
        [
          "LP or business trust annual registration fee",
          "Virginia maintenance guidance says unpaid LP or business-trust registration fees lead to automatic cancellation by December 31."
        ],
        [
          "LLP or LLLP continuation report",
          "If the report is not received by September 1, Virginia sends a notice of impending cancellation. If it is still not filed by November 1, the registration is automatically canceled."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Why Virginia needs a split guide",
      title: "Virginia is easy to misread if the filing labels are collapsed",
      cards: [
        {
          title: "Why Virginia is easy to misread",
          text: "Many recurring-filing sites try to compress Virginia into a single annual report or a single fee. The official SCC guidance does not work that way. Corporations, LLCs, LPs, business trusts, and LLPs use different recurring items, and the page label matters."
        },
        {
          title: "How Virginia timing notices work",
          text: "Virginia says it assesses annual registration fees and sends the notice two months before the fee is due. The annual report FAQ likewise says the Clerk's Office sends the annual report to the registered agent two months before the corporation's due date."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "What to file online and what to verify before paying",
      headers: ["Question", "Virginia SCC answer"],
      rows: [
        [
          "Can you pay annual registration fees early?",
          "No. Virginia says the fee may only be paid after the SCC assesses the business and issues the notice."
        ],
        [
          "How do stock corporations know the amount?",
          "The annual registration fee is based on authorized shares, and Virginia points readers to the Annual Corporation Requirements and Fee Schedule."
        ],
        [
          "How should LPs and business trusts treat the due date?",
          "One Virginia fee page uses October 1 wording while maintenance guidance frames year-end cancellation. This guide takes the conservative approach and treats the fee as something to clear no later than September 30 or October 1, not something to postpone until year-end."
        ],
        [
          "Where do online filings and fee payments happen?",
          "Virginia directs annual report filing and annual registration fee payment through the Clerk's Information System (CIS)."
        ]
      ]
    }
  ],
  "tools/colorado/periodic-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Timing",
      title: "Colorado centers the deadline around the periodic report month",
      headers: ["Question", "Colorado answer used on this page"],
      rows: [
        [
          "Who files a periodic report?",
          "Colorado says reporting entities include LLCs, corporations, nonprofit corporations, foreign entities, LLPs, LLLPs, and reporting limited partnerships."
        ],
        [
          "When does the filing window open?",
          "The periodic report FAQ says the report can be filed two months before the periodic report month."
        ],
        [
          "What is the practical due date?",
          "Colorado's delinquency FAQ gives the January example: if the periodic report month is January, the report due date is March 31. That means the standard due date is the last day of the second month after the report month."
        ],
        [
          "Where do businesses find the report month?",
          "The Secretary of State says the entity's Summary page shows the periodic report month."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Fees",
      title: "Colorado publishes the regular fee, late penalty, and delinquency-cure fee separately",
      headers: ["Item", "Published online amount", "Practical note"],
      rows: [
        [
          "Periodic Report",
          "$25.00",
          "This is the standard recurring filing fee shown on Colorado's business fee schedule."
        ],
        [
          "Periodic Report Late Filing Penalty",
          "$50.00",
          "Colorado lists the late penalty separately from the base filing fee."
        ],
        [
          "Statement Curing Delinquency",
          "$100.00",
          "If the entity reaches delinquent status, the cure filing is a different filing with a higher published fee."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Electronic filing and late path",
      title: "Colorado is straightforward once you separate noncompliant from delinquent status",
      cards: [
        {
          title: "Electronic-only filing is the default",
          text: "Colorado's business forms page shows online filing for both the Periodic Report and the Statement Curing Delinquency, and it marks paper filing as not available for the Periodic Report. For customers, that means the live state record is part of the filing workflow, not just a search tool."
        },
        {
          title: "Colorado has a two-step late-status sequence",
          text: "The delinquency FAQ shows the sequence clearly. If the report is not filed by the regular due date, the entity becomes noncompliant and a late report is still due. If it is still not filed by the later cure date, the entity becomes delinquent and must use a Statement Curing Delinquency to return to good standing."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Late status",
      title: "Colorado's January example shows how the late path works",
      headers: ["Stage", "What the state says"],
      rows: [
        ["Periodic report month is January", "The delinquency FAQ says the regular due date is March 31."],
        [
          "After March 31",
          "If the report is not filed on or before March 31, the entity's status becomes noncompliant and a late report is due by May 31."
        ],
        [
          "After May 31",
          "If the report is still not filed on or before May 31, the entity's status changes to delinquent."
        ],
        [
          "Returning to good standing",
          "Colorado says a delinquent entity files a Statement Curing Delinquency to return its status to good standing."
        ]
      ],
      note: "The January example is the Secretary of State's own illustration. It is useful because it turns Colorado's report-month rule into concrete dates."
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Filing details customers usually need first",
      headers: ["Question", "Colorado answer"],
      rows: [
        [
          "How do you file the periodic report?",
          "Colorado says the report must be filed electronically through the Secretary of State website by searching the business record, opening File a form, and selecting Periodic Report."
        ],
        [
          "Will the state send reminders?",
          "Yes. Colorado says courtesy notices are sent, and the email-notification service sends a due-date email in the month before the periodic report month."
        ],
        [
          "What if the entity is no longer doing business in Colorado?",
          "The periodic report FAQ says the business may consider filing the appropriate dissolution or withdrawal instead of filing the report first."
        ],
        [
          "Where do filings happen if the entity is already delinquent?",
          "The business forms page shows the same online filing path for the Statement Curing Delinquency after you search for the entity's record."
        ]
      ]
    }
  ],
  "tools/oregon/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee split",
      title: "Oregon annual report fees depend on entity type and home jurisdiction",
      headers: ["Entity type", "Recurring filing", "Published annual fee", "Practical note"],
      rows: [
        [
          "Domestic business or professional corporation",
          "Annual report",
          "$100",
          "Oregon's Business Registry Fee Schedule lists domestic corporation renewal annually at $100."
        ],
        [
          "Foreign business or professional corporation",
          "Annual report",
          "$275",
          "The foreign corporation renewal amount is higher than the domestic amount, so Oregon should not be flattened into one number."
        ],
        [
          "Domestic LLC",
          "Annual report",
          "$100",
          "Domestic LLC renewal appears on the same fee schedule at $100 each year."
        ],
        [
          "Foreign LLC",
          "Annual report",
          "$275",
          "Foreign LLC renewals track the higher foreign-entity amount."
        ],
        [
          "Domestic nonprofit corporation",
          "Annual report",
          "$100",
          "The fee schedule lists annual nonprofit renewal at $100, even though the original incorporation filing fee is lower."
        ],
        [
          "Foreign nonprofit corporation",
          "Annual report",
          "$50",
          "Foreign nonprofit renewal is a lower exception within Oregon's annual-report fee schedule."
        ],
        [
          "Domestic limited partnership",
          "Annual report",
          "$100",
          "Domestic LP renewal is listed at $100 annually."
        ],
        [
          "Foreign limited partnership",
          "Annual report",
          "$275",
          "Foreign LP renewal is listed at $275 annually."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Timing",
      title: "Oregon ties the annual report to the original filing anniversary",
      headers: ["Question", "Official guidance used here"],
      rows: [
        [
          "When is the annual report due?",
          "The Oregon Secretary of State FAQ says all business entity types other than assumed business names renew annually, and the renewal is due on the anniversary date of the original filing."
        ],
        [
          "Will Oregon send a reminder?",
          "Yes. Oregon says renewal notices are sent automatically about 45 days before the due date."
        ],
        [
          "Can customers update addresses and officers during the renewal?",
          "Yes. Oregon's update-registration guidance says that when the renewal is available each year, changes can be reported on the annual report while paying the renewal fee."
        ],
        [
          "How do online filings post?",
          "Oregon says online renewal confirmations arrive by email, and renewal transactions filed online are completed within minutes unless there is an issue with the filing."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Why the fee split matters",
      title: "Oregon is simple on timing but not on price",
      cards: [
        {
          title: "Why Oregon is still worth splitting by entity type",
          text: "The due-date rule is simple, but the fee answer changes meaningfully between domestic and foreign filings. A customer looking at a foreign corporation or foreign LLC should not be shown the domestic $100 figure as though it were universal."
        },
        {
          title: "What happens after a missed annual report",
          text: "Oregon's reinstatement page says a business that is administratively dissolved for failure to file an annual report can seek reinstatement if eligible. The state says the filing requires correcting business information as needed and paying a reinstatement fee along with the missed annual fee or fees."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Oregon filing details",
      headers: ["Question", "Oregon answer"],
      rows: [
        [
          "Where do you renew?",
          "Oregon directs filers to Oregon Business Registry renewal tools, either online or by generating the annual report form from the public business record."
        ],
        [
          "Can you confirm the next renewal date publicly?",
          "Yes. Oregon says the business registry public record shows the next renewal date and the filing history."
        ],
        [
          "Does Oregon allow updates outside the annual report?",
          "Yes. The update-registration page gives a separate information-change path for office, registered-agent, officer, member, manager, and address updates."
        ],
        [
          "Who is commonly eligible to reinstate online?",
          "Oregon says LLCs, business corporations, nonprofits, and limited partnerships are usually able to reinstate online if the entity is otherwise eligible."
        ]
      ]
    }
  ],
  "tools/maine/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee table",
      title: "Maine keeps the deadline simple but splits the fee by filing status",
      headers: ["Entity lane", "Annual report fee", "What to watch"],
      rows: [
        [
          "Domestic business entity",
          "$85",
          "The Maine reminders page lists $85 for domestic business entities using the annual report system."
        ],
        [
          "Foreign business entity",
          "$150",
          "Foreign-qualified business entities use the higher $150 annual report fee."
        ],
        [
          "Domestic or foreign nonprofit corporation",
          "$35",
          "Nonprofit corporations use a lower $35 annual report fee."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Timing and reminders",
      title: "Maine expects the filing between January 1 and June 1",
      headers: ["Question", "Official Maine answer"],
      rows: [
        [
          "When is the first annual report due?",
          "The first annual report is due between January 1 and June 1 of the year after the entity was incorporated, formed, or qualified."
        ],
        [
          "When are later reports due?",
          "Subsequent annual reports are due every year between January 1 and June 1."
        ],
        [
          "Will Maine remind you by mail?",
          "No. Maine says it does not mail annual report reminders, but it sends courtesy email reminders to the address on file."
        ],
        [
          "How do you file?",
          "Maine directs customers to its online filing system through SOSonline.org, and it also provides preprinted paper annual report forms."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "If you are late",
      title: "Why Maine still needs calendar discipline",
      cards: [
        {
          title: "Late filing is not just a warning",
          text: "Maine says a late filing penalty is assessed if the report is not received by the filing deadline. If the penalty is not paid, the entity can be administratively dissolved or revoked."
        },
        {
          title: "The online late-payment service is separate",
          text: "Maine's late filing penalty payment service is only for situations where the annual report has already been filed and the remaining late penalty still has to be cleared."
        },
        {
          title: "Courtesy email is not a guarantee",
          text: "Because Maine does not mail annual report reminders, the safest practice is to keep the filing email current and set an internal reminder before the June 1 deadline."
        }
      ]
    }
  ],
  "tools/maryland/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee table",
      title: "Maryland's 2026 Form 1 shows the main filing fee split",
      headers: ["Entity type", "Form 1 filing fee", "What this means"],
      rows: [
        [
          "Domestic or foreign stock corporation",
          "$300",
          "Maryland's 2026 Form 1 lists the common $300 filing fee for stock corporations."
        ],
        [
          "Domestic or foreign LLC",
          "$300",
          "Maryland LLCs use Form 1 and the same $300 filing fee."
        ],
        [
          "Domestic or foreign LP, LLP, REIT, or statutory trust",
          "$300",
          "Limited partnerships, LLPs, REITs, and statutory trusts stay in the main $300 Form 1 lane."
        ],
        [
          "Domestic or foreign non-stock corporation",
          "$0",
          "Non-stock corporations still file, but the 2026 Form 1 shows a zero-dollar filing fee."
        ],
        [
          "SDAT certified family farm",
          "$100",
          "Maryland's 2026 fee chart includes a reduced $100 filing fee for an SDAT certified family farm."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Timing and scope",
      title: "The April 15 date is only the first step",
      headers: ["Question", "Official Maryland answer"],
      rows: [
        [
          "When is the first filing due?",
          "Maryland Business Express says the first filing is due the year after the business starts, even if the business had no revenue, has not started operating, or only has one employee."
        ],
        [
          "What is the regular deadline?",
          "Maryland's Form 1 is due April 15."
        ],
        [
          "Is an extension available?",
          "Yes. Maryland says the entity may request a 60-day extension."
        ],
        [
          "When must Form 1 also include the personal property return?",
          "For filing years 2023 and after, Maryland says LLCs and corporations must include the personal property return if the business owns, leases, or uses Maryland personal property with an original cost of $20,000 or more."
        ],
        [
          "What if the business has less than $20,000 of Maryland personal property?",
          "The 2026 Form 1 says that answering No means you are attesting to owning less than $20,000 of Maryland personal property as of January 1, 2026."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Good standing risk",
      title: "Why Maryland annual filings quickly become a status problem",
      cards: [
        {
          title: "Out-of-good-standing is the real pain point",
          text: "Maryland Business Express says a business falls out of good standing when it has not met the state's criteria, and missing an annual report or personal property return is one of the listed reasons."
        },
        {
          title: "Late filing can block cleanup",
          text: "Maryland's good-standing pages say the business record will show whether required annual reports were filed and whether late fees are owed. Until those issues are fixed, the business can remain outside good standing."
        },
        {
          title: "Certificate of status depends on cleared filings",
          text: "Maryland's certificate of status guidance says the state only certifies good standing when all required documents and fees have been received and no other agency has reported a delinquency."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Maryland filing details",
      headers: ["Question", "Maryland answer"],
      rows: [
        [
          "Can every entity file online?",
          "No. Maryland says some entities still have to use paper forms, including government entities, financial institutions, certain co-operatives, public utilities, and some other specialized filers."
        ],
        [
          "Where is the fastest filing path?",
          "Maryland Business Express is the state's main online filing path for annual reports, personal property returns, and related status checks."
        ],
        [
          "What should you save after filing?",
          "Use the business record and certificate-of-status tools to confirm that the annual filing posted and that the entity returned to active and good-standing status if cleanup was needed."
        ]
      ]
    }
  ],
  "tools/wyoming/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee table",
      title: "Wyoming splits the annual charge between a license-tax lane and flat-fee lanes",
      headers: ["Entity type", "Annual report fee", "What to watch"],
      rows: [
        [
          "Profit corporation, LLC, LP, or LLP",
          "$60 or $.0002 of Wyoming assets, whichever is greater",
          "Most profit entities use Wyoming's annual license tax rather than a flat universal filing fee."
        ],
        [
          "Nonprofit corporation",
          "$25",
          "Wyoming treats nonprofits as a flat-fee annual report filing."
        ],
        [
          "Statutory trust or statutory foundation",
          "$100",
          "Wyoming's FAQ and fee schedule put statutory trusts and statutory foundations in the $100 flat-fee lane."
        ]
      ]
    },
    {
      type: "table",
      eyebrow: "Timing and reminders",
      title: "Wyoming ties the report to the anniversary month, not a single calendar deadline",
      headers: ["Question", "Official Wyoming answer"],
      rows: [
        [
          "When is the annual report due?",
          "For most registered entities, Wyoming says the annual report is due on the first day of the anniversary month of formation or qualification."
        ],
        [
          "When is the first report due?",
          "Wyoming's What's Next guide says the first annual report is not due until the first anniversary year."
        ],
        [
          "Can you file early?",
          "Yes. Wyoming says the annual report may be filed up to 120 days before the due date."
        ],
        [
          "Will Wyoming remind you?",
          "Yes. Courtesy email reminders are sent 60, 30, and 10 days before the due date."
        ],
        [
          "Can active entities file online?",
          "Yes. Wyoming says active registered business entities can use the Annual Report Wizard online, although e-filing is not permitted if the annual report fee is greater than $500."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "If you are late",
      title: "Wyoming moves from delinquent to dissolved quickly",
      cards: [
        {
          title: "The delinquent clock starts fast",
          text: "Wyoming says the entity becomes delinquent on the second day of the month following the due date. If the annual report is still not filed within 60 days after the due date, the entity is administratively dissolved."
        },
        {
          title: "Reinstatement means catching up on more than one fee",
          text: "Wyoming's reinstatement form says a company dissolved for failure to file annual reports must submit each delinquent annual report, each delinquent annual report fee, and the separate $100 reinstatement fee."
        },
        {
          title: "Watch for scam notices",
          text: "Wyoming's business alerts and What's Next guide warn customers about fraudulent texts, invoices, and private solicitations that look official but do not come from the Secretary of State."
        }
      ]
    }
  ]
};

export const structuredStateContentByFilePath = {
  ...baseStructuredStateContentByFilePath,
  ...expansionStructuredStateContentByFilePath
};
