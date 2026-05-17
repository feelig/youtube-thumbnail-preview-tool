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
    lastReviewed: "May 17, 2026",
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
    lastReviewed: "May 17, 2026",
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
    lastReviewed: "May 17, 2026",
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
  },
  {
    filePath: "tools/minnesota/annual-renewal-deadline/index.html",
    titleTag: "Minnesota Annual Renewal Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Minnesota annual renewal fee and deadline guidance covering the December 31 deadline, mostly zero-dollar renewal lanes, LLP fee exceptions, reminder emails, and reinstatement basics.",
    canonicalUrl: "https://finlogichub5.com/tools/minnesota/annual-renewal-deadline/",
    ogTitle: "Minnesota Annual Renewal Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Minnesota annual renewal timing, common zero-dollar renewal lanes, LLP fee exceptions, reminder emails, and reinstatement rules using official Minnesota Secretary of State sources.",
    state: "Minnesota",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Minnesota annual renewal", href: null }
    ],
    heroTitle: "Minnesota annual renewal fee and deadline",
    heroSubtitle:
      "Use this page if you need the Minnesota annual renewal deadline or fee. Start with the entity type, because many Minnesota renewals are free, but LLP renewals use a paid lane.",
    heroActions: [
      {
        href: "https://www.sos.mn.gov/business-liens/business-help/how-to-renew-your-business-filing/",
        label: "Open annual renewal guide",
        variant: "primary"
      },
      {
        href: "https://www.sos.mn.gov/fees",
        label: "Check official fee schedule",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Office of the Minnesota Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Core due date",
        text: "Must be filed by December 31 each year, beginning in the calendar year after the original filing."
      },
      {
        label: "Common fee lane",
        text: "$0 for many corporations, LLCs, nonprofits, and LPs that are active and in good standing."
      },
      {
        label: "Key exception",
        text: "Minnesota LLP annual renewals cost $135 by mail or $155 for expedited online or in-person filing."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Minnesota is one of the easier states to miss because the common renewal fee is often
              zero dollars. The bigger risk is waiting past December 31 and falling into dissolution,
              termination, or revocation.
            </p>`,
    caseCards: [
      {
        label: "LLC, corporation, nonprofit, or LP",
        title: "Many Minnesota annual renewals stay in the zero-dollar lane",
        text: "Most common Minnesota business renewals can be filed without a renewal fee if the entity is still active and in good standing."
      },
      {
        label: "LLP",
        title: "LLPs do not use the free-renewal lane",
        text: "Minnesota LLPs still renew by December 31, but the official fee schedule uses the higher $135 mail or $155 expedited renewal lane."
      },
      {
        label: "Inactive entity",
        title: "Late renewals become reinstatement work",
        text: "If the entity is already inactive or statutorily dissolved, Minnesota moves the filing into the reinstatement lane and the fee changes."
      },
      {
        label: "Reminders",
        title: "Watch your official email, not the mailbox",
        text: "Minnesota says it sends annual courtesy emails about renewals and does not send renewal notices by mail."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sos.mn.gov/business-liens/business-help/how-to-renew-your-business-filing/",
        label: "Minnesota how to renew your business filing"
      },
      {
        href: "https://www.sos.mn.gov/business-liens/renewals/",
        label: "Minnesota business renewals and record details guide"
      },
      {
        href: "https://www.sos.mn.gov/fees",
        label: "Minnesota business filing and certification fee schedule"
      },
      {
        href: "https://sos.mn.gov/media/1569/llcdomesticforeignrenewal.pdf",
        label: "Minnesota LLC annual renewal PDF"
      },
      {
        href: "https://www.sos.mn.gov/media/1386/dcrenewal.pdf",
        label: "Minnesota business corporation annual renewal PDF"
      },
      {
        href: "https://www.sos.mn.gov/media/1534/nonprofitrenewal.pdf",
        label: "Minnesota nonprofit corporation annual renewal PDF"
      },
      {
        href: "https://sos.mn.gov/media/1761/llprenewal.pdf",
        label: "Minnesota LLP annual renewal PDF"
      },
      {
        href: "https://www.sos.mn.gov/business-liens/mail-solicitations/",
        label: "Minnesota mail solicitations warning"
      },
      {
        href: "https://www.sos.mn.gov/business-liens/business-help/how-to-reinstate-your-business-filing/",
        label: "Minnesota how to reinstate your business filing"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/west-virginia/annual-report-deadline/index.html",
    titleTag: "West Virginia Annual Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "West Virginia annual report fee and deadline guidance covering the January-to-June filing window, $25 filing fee, late-fee rules, January reminders, and the separate LLP annual notice.",
    canonicalUrl: "https://finlogichub5.com/tools/west-virginia/annual-report-deadline/",
    ogTitle: "West Virginia Annual Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review West Virginia annual report timing, filing fees, late-fee rules, good-standing consequences, and the separate LLP annual notice using official West Virginia Secretary of State sources.",
    state: "West Virginia",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "West Virginia annual report", href: null }
    ],
    heroTitle: "West Virginia annual report fee and deadline",
    heroSubtitle:
      "Use this page if you need the West Virginia annual report deadline or fee. Start with the entity type, because standard corporations and LLCs use the $25 annual report lane, while West Virginia LLPs use a separate annual notice.",
    heroActions: [
      {
        href: "https://sos.wv.gov/business/Pages/AnnualReports.aspx",
        label: "Open annual report overview",
        variant: "primary"
      },
      {
        href: "https://business4.wv.gov/Documents/OneStopAnnRepInstr.pdf",
        label: "Check filing instructions",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: West Virginia Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Core filing window",
        text: "January 1 through June 30 each year following the calendar year in which the business was registered."
      },
      {
        label: "Standard fee",
        text: "$25 annual report fee, plus a $1 West Virginia portal fee for online filings."
      },
      {
        label: "Late and status risk",
        text: "Late fees can apply after June 30, and missed reports can lead to noncompliance, administrative dissolution, or revocation."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              West Virginia is mostly straightforward until the entity type changes. Corporations,
              LLCs, nonprofits, LPs, and business trusts generally stay in the standard annual
              report lane, but LLPs use a separate annual notice.
            </p>`,
    caseCards: [
      {
        label: "Profit corporation or LLC",
        title: "Most standard West Virginia filers start with the $25 lane",
        text: "West Virginia corporations and LLCs generally use the standard annual report lane, with the filing window open from January 1 through June 30."
      },
      {
        label: "Nonprofit corporation",
        title: "The filing window stays the same, but the late-fee path is lighter",
        text: "West Virginia nonprofits still file the annual report on the same calendar, but the published late-fee schedule separates nonprofit organizations from profit organizations."
      },
      {
        label: "LLP",
        title: "LLPs do not use this standard annual report lane",
        text: "West Virginia LLPs use an annual notice instead of the standard annual report and the published annual amount is much higher than the typical business filing."
      },
      {
        label: "Already late",
        title: "Good standing starts to disappear once the June window closes",
        text: "West Virginia says late filing is still better than never filing, because missed reports can leave the business out of compliance and exposed to dissolution or revocation."
      }
    ],
    sourceLinks: [
      {
        href: "https://sos.wv.gov/business/updates-and-changes/annual-reports",
        label: "West Virginia annual reports overview"
      },
      {
        href: "https://sos.wv.gov/corporations-limited-partnerships-voluntary-associations-and-business-trusts",
        label: "West Virginia corporations and related entities annual report guidance"
      },
      {
        href: "https://sos.wv.gov/limited-liability-companies",
        label: "West Virginia LLC annual report guidance"
      },
      {
        href: "https://sos.wv.gov/limited-liability-partnerships",
        label: "West Virginia LLP annual notice guidance"
      },
      {
        href: "https://business4.wv.gov/Documents/OneStopAnnRepInstr.pdf",
        label: "West Virginia annual report filing instructions PDF"
      },
      {
        href: "https://sos.wv.gov/business/general-information/copies-and-certificates",
        label: "West Virginia copies and certificates guidance"
      },
      {
        href: "https://sos.wv.gov/certificates-existence-or-certificates-authorization",
        label: "West Virginia certificates of existence and authorization guidance"
      },
      {
        href: "https://apps.wv.gov/SOS/BusinessEntitySearch/",
        label: "West Virginia business entity search"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/montana/annual-report-deadline/index.html",
    titleTag: "Montana Annual Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Montana annual report fee and deadline guidance covering the April 15 deadline, the current $35 post-deadline lane, reinstatement cleanup, and official filing warnings.",
    canonicalUrl: "https://finlogichub5.com/tools/montana/annual-report-deadline/",
    ogTitle: "Montana Annual Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Montana annual report timing, the current post-April 15 filing lane, reinstatement rules, and scam-warning guidance using official Montana Secretary of State sources.",
    state: "Montana",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Montana annual report", href: null }
    ],
    heroTitle: "Montana annual report fee and deadline",
    heroSubtitle:
      "Use this page if you need the Montana annual report deadline or current fee. Start with the April 15 deadline, then confirm whether the business is still active and in the current $35 late-filing lane or already needs reinstatement cleanup.",
    heroActions: [
      {
        href: "https://help.sosmt.gov/en/articles/13265408-how-do-i-file-my-annual-report",
        label: "Open annual report help",
        variant: "primary"
      },
      {
        href: "https://sosmt.gov/Business/Fees/",
        label: "Check official fee table",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Montana Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Core due date",
        text: "Montana annual reports are due April 15."
      },
      {
        label: "Current filing fee",
        text: "$35 for active businesses filing after April 15, 2026."
      },
      {
        label: "Next waiver window",
        text: "Montana has separately announced another fee-waived filing window for reports filed between January 1 and April 15, 2027."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              As of May 17, 2026, the 2026 waived-fee window has closed. The current Montana answer
              is the paid late-filing lane unless you are already in reinstatement or planning ahead
              for the separate 2027 waiver window the state has announced.
            </p>`,
    caseCards: [
      {
        label: "Current filing lane",
        title: "The active-business answer is now the $35 lane",
        text: "Montana's fee table and help center point late but still-active businesses to the $35 annual report lane now that the April 15, 2026 waiver window has ended."
      },
      {
        label: "2027 planning",
        title: "The state has already announced another waived-fee window",
        text: "Montana separately announced that it plans to waive the annual report filing fee again for businesses that file between January 1 and April 15, 2027."
      },
      {
        label: "Reinstating a business",
        title: "Inactive records usually require more than one payment",
        text: "Montana domestic corporations and LLCs that need reinstatement may need to file each missing annual report at $35 and then complete the reinstatement filing."
      },
      {
        label: "Suspicious notice",
        title: "Use the official portal, not a look-alike solicitation",
        text: "Montana warns that deceptive mailings and emails ask for annual report payments even though the official filing path runs through the Secretary of State portal."
      }
    ],
    sourceLinks: [
      {
        href: "https://help.sosmt.gov/en/articles/13265408-how-do-i-file-my-annual-report",
        label: "Montana how to file an annual report help article"
      },
      {
        href: "https://sosmt.gov/secretary-christi-jacobsen-continues-montana-business-support-by-waiving-fees-once-again/",
        label: "Montana 2026 and 2027 annual report fee-waiver announcement"
      },
      {
        href: "https://sosmt.gov/Business/Fees/",
        label: "Montana business services filing fees"
      },
      {
        href: "https://help.sosmt.gov/en/articles/13265665-how-to-reinstate-a-business",
        label: "Montana how to reinstate a business help article"
      },
      {
        href: "https://sosmt.gov/business/scam-alerts/",
        label: "Montana SOS scam alerts"
      },
      {
        href: "https://sosmt.gov/secretary-christi-jacobsen-alerting-montanans-of-deceptive-business-solicitations/",
        label: "Montana deceptive business solicitations alert"
      },
      {
        href: "https://help.sosmt.gov/en/articles/12549898-why-didn-t-i-receive-a-receipt-for-my-annual-report",
        label: "Montana annual report receipt explanation"
      },
      {
        href: "https://biz.sosmt.gov/",
        label: "Montana business filing portal"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/kentucky/annual-report-deadline/index.html",
    titleTag: "Kentucky Annual Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "Kentucky annual report fee and deadline guidance covering the January-to-June filing window, $15 filing fee, online filing, and domestic-versus-foreign late consequences.",
    canonicalUrl: "https://finlogichub5.com/tools/kentucky/annual-report-deadline/",
    ogTitle: "Kentucky Annual Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review Kentucky annual report timing, the $15 filing fee, online filing path, and the different late-state risks for domestic and foreign entities using Kentucky Secretary of State sources.",
    state: "Kentucky",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Kentucky annual report", href: null }
    ],
    heroTitle: "Kentucky annual report fee and deadline",
    heroSubtitle:
      "Use this page if you need the Kentucky annual report deadline or fee. Start with the June 30 deadline and the $15 filing fee, then check whether the record is domestic or foreign because the late-state cleanup path changes after the deadline.",
    heroActions: [
      {
        href: "https://www.sos.ky.gov/bus/business-filings/Pages/Annual-Reports.aspx",
        label: "Open Kentucky annual reports page",
        variant: "primary"
      },
      {
        href: "https://www.sos.ky.gov/bus/business-filings/Pages/Fees.aspx",
        label: "Check Kentucky filing fees",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Kentucky Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Filing window",
        text: "Kentucky annual reports can be filed from January 1 through June 30 each year."
      },
      {
        label: "Standard fee",
        text: "$15 annual report fee."
      },
      {
        label: "Late-state split",
        text: "Domestic entities can be administratively dissolved, while foreign entities can have their certificates of authority revoked."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Kentucky keeps the on-time annual report answer simple, but the cleanup path changes
              quickly once the June 30 window is missed.
            </p>`,
    caseCards: [
      {
        label: "Most domestic entities",
        title: "The common Kentucky answer stays in the $15 lane",
        text: "Domestic corporations, LLCs, partnerships, trusts, and many other registered entities use the same June 30 annual report deadline and $15 filing fee."
      },
      {
        label: "Foreign entity",
        title: "Missing the deadline can cost the authority to do business",
        text: "Kentucky says foreign business entities that fail to timely file annual reports can have their certificates of authority revoked, so the cleanup path is more serious than a routine late filing."
      },
      {
        label: "Need to fix record data",
        title: "Kentucky uses the report to confirm live record details",
        text: "The annual report confirms the principal office, registered agent or office, and the current officers, directors, members, managers, trustees, or partners shown in the state record."
      },
      {
        label: "Already inactive",
        title: "Domestic reinstatement can require more than the missed report",
        text: "If a domestic entity is already administratively dissolved, Kentucky's guidance points to a reinstatement application, delinquent filing fees, and good-standing letters from other agencies for some entity types."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sos.ky.gov/bus/business-filings/Pages/Annual-Reports.aspx",
        label: "Kentucky annual reports page"
      },
      {
        href: "https://www.sos.ky.gov/bus/business-filings/Pages/Fees.aspx",
        label: "Kentucky business filing fees"
      },
      {
        href: "https://www.sos.ky.gov/bus/business-filings/Pages/FAQs.aspx",
        label: "Kentucky business filings FAQs"
      },
      {
        href: "https://www.sos.ky.gov/bus/business-filings/OnlineServices/Pages/default.aspx",
        label: "Kentucky online business filings and records services"
      },
      {
        href: "https://www.sos.ky.gov/bus/businessrecords/Pages/FAQs.aspx",
        label: "Kentucky business records FAQs"
      },
      {
        href: "https://www.sos.ky.gov/bus/businessrecords/Pages/default.aspx",
        label: "Kentucky business records page"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/massachusetts/annual-report-deadline/index.html",
    titleTag: "Massachusetts Annual Report Fee and Due Date | FinLogic Hub",
    metaDescription:
      "Massachusetts annual report fee and due date guidance covering corporation fiscal-year timing, LLC anniversary-date reports, nonprofit November 1 filings, and reinstatement or revocation risk.",
    canonicalUrl: "https://finlogichub5.com/tools/massachusetts/annual-report-deadline/",
    ogTitle: "Massachusetts Annual Report Fee and Due Date | FinLogic Hub",
    ogDescription:
      "Review Massachusetts annual report timing, corporation and LLC fee lanes, nonprofit filing rules, and official reminder or scam-warning guidance using Massachusetts Secretary of the Commonwealth sources.",
    state: "Massachusetts",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "Massachusetts annual report", href: null }
    ],
    heroTitle: "Massachusetts annual report fee and due date",
    heroSubtitle:
      "Use this page if you need the Massachusetts annual report deadline or fee. Start with the entity type, because Massachusetts corporations, LLCs, foreign LLCs, and nonprofits do not all use the same due date or amount.",
    heroActions: [
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/general-information/corporations-filing-fees.htm",
        label: "Open Massachusetts fee schedule",
        variant: "primary"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/corporations/corporations-domestic.htm",
        label: "Check corporation annual report rules",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: Massachusetts Secretary of the Commonwealth",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Corporation due rule",
        text: "Domestic and foreign corporations file within two and one-half months after the close of the fiscal year."
      },
      {
        label: "LLC lane",
        text: "Massachusetts LLCs and foreign LLCs file annual reports on or before the anniversary date, with a $500 filing fee."
      },
      {
        label: "Nonprofit lane",
        text: "Massachusetts nonprofits file by November 1, with the standard nonprofit annual report fee shown at $15."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              Massachusetts is one of the states where a one-line annual report answer is almost
              always wrong. The due date and amount change immediately when the entity type changes.
            </p>`,
    caseCards: [
      {
        label: "Corporation",
        title: "Corporations use the fiscal-year rule, not the anniversary date",
        text: "Massachusetts domestic and foreign corporations file annual reports within two and one-half months after the fiscal year ends, and the state fee schedule separates the paper, electronic, and late lanes."
      },
      {
        label: "LLC or foreign LLC",
        title: "Massachusetts LLCs use the anniversary-date rule and the $500 lane",
        text: "Massachusetts LLCs and foreign LLCs file annual reports on or before the anniversary date of the original organization or registration, and the published annual report fee is $500."
      },
      {
        label: "Nonprofit corporation",
        title: "The nonprofit due date is different from the business-corporation rule",
        text: "Massachusetts nonprofit corporations file annual reports on or before November 1, and the current annual report fee shown on the form set is $15."
      },
      {
        label: "Already delinquent",
        title: "Reinstatement or revocation cleanup can require back reports",
        text: "Massachusetts reinstatement guidance says delinquent corporations may need to file annual reports owed for as many as the last ten years, while foreign LLCs move into revocation rules if the grounds are not corrected after notice."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/general-information/corporations-filing-fees.htm",
        label: "Massachusetts corporations filing fees"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/corporations/corporations-domestic.htm",
        label: "Massachusetts domestic corporation annual report guidance"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/corporations/corporations-domestic-foreign.htm",
        label: "Massachusetts foreign corporation annual report guidance"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/limited-liability/corporations-limited-liability-company.htm",
        label: "Massachusetts LLC annual report guidance"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/limited-liability/corporations-foreign-limited-liability-company.htm",
        label: "Massachusetts foreign LLC annual report guidance"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/filing-by-subject/corporations/corporations-domestic-non-profit.htm",
        label: "Massachusetts nonprofit annual report guidance"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/services/corporations-email-subscription.htm",
        label: "Massachusetts corporation division email notification service"
      },
      {
        href: "https://www.sec.state.ma.us/divisions/corporations/general-information/corporations-mailed-solicitations.htm",
        label: "Massachusetts mailed solicitations warning"
      }
    ],
    scriptSrc: null
  },
  {
    filePath: "tools/north-dakota/annual-report-deadline/index.html",
    titleTag: "North Dakota Annual Report Fee and Deadline | FinLogic Hub",
    metaDescription:
      "North Dakota annual report fee and deadline guidance covering the February 1, May 15, August 1, and November 15 due dates, entity-specific fees, and Not Good Standing risk.",
    canonicalUrl: "https://finlogichub5.com/tools/north-dakota/annual-report-deadline/",
    ogTitle: "North Dakota Annual Report Fee and Deadline | FinLogic Hub",
    ogDescription:
      "Review North Dakota annual report due dates, entity-specific fee lanes, Not Good Standing status, and official FirstStop filing paths using North Dakota Secretary of State sources.",
    state: "North Dakota",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "States", href: "/states.html" },
      { label: "North Dakota annual report", href: null }
    ],
    heroTitle: "North Dakota annual report fee and deadline",
    heroSubtitle:
      "Use this page if you need the North Dakota annual report deadline or fee. Start with the entity type, because North Dakota changes both the due date and the filing amount between nonprofits, corporations, and LLCs.",
    heroActions: [
      {
        href: "https://www.sos.nd.gov/business/business-services/maintain-registration",
        label: "Open North Dakota annual report overview",
        variant: "primary"
      },
      {
        href: "https://firststop.sos.nd.gov/",
        label: "Open FirstStop filing portal",
        variant: "secondary"
      }
    ],
    lastReviewed: "May 17, 2026",
    sourceBadge: "Source: North Dakota Secretary of State",
    summaryTitle: "At a glance",
    metrics: [
      {
        label: "Due-date split",
        text: "North Dakota uses February 1 for nonprofits, May 15 for foreign corporations, August 1 for domestic corporations, and November 15 for LLCs."
      },
      {
        label: "Fee split",
        text: "$10 for nonprofit annual reports, $25 for corporations, and $50 for LLC annual reports."
      },
      {
        label: "Late-state risk",
        text: "A missed report can move the business into Not Good Standing, add a late filing fee, and lead to involuntary termination if the record is not cured."
      }
    ],
    summaryNoteHtml: `<p class="table-note">
              North Dakota is a state where one generic annual report answer is misleading. The
              deadline and fee change immediately when the entity type changes.
            </p>`,
    caseCards: [
      {
        label: "Domestic corporation",
        title: "Domestic corporations use the August 1 lane",
        text: "North Dakota domestic business and professional corporations file annual reports by August 1, and the state lists the corporation annual report fee at $25."
      },
      {
        label: "Foreign corporation",
        title: "Foreign corporations use the earlier May 15 lane",
        text: "North Dakota foreign business and professional corporations do not wait until August. The published annual report deadline for those entities is May 15."
      },
      {
        label: "LLC or PLLC",
        title: "LLCs use the November 15 lane and the higher fee",
        text: "North Dakota LLCs and PLLCs file annual reports by November 15, and the state lists the annual report fee at $50."
      },
      {
        label: "Nonprofit",
        title: "North Dakota nonprofits use the February 1 lane",
        text: "North Dakota nonprofit corporations and nonprofit LLCs file annual reports by February 1, and the state lists the annual report fee at $10."
      }
    ],
    sourceLinks: [
      {
        href: "https://www.sos.nd.gov/business/business-services/maintain-registration",
        label: "North Dakota maintain registration and annual report overview"
      },
      {
        href: "https://www.sos.nd.gov/business/business-services/business-structures/corporation",
        label: "North Dakota corporation annual report requirements"
      },
      {
        href: "https://www.sos.nd.gov/business/business-services/business-structures/limited-liability-company-llc",
        label: "North Dakota LLC annual report requirements"
      },
      {
        href: "https://www.sos.nd.gov/business/nonprofit-services/maintain-nonprofit",
        label: "North Dakota nonprofit annual report requirements"
      },
      {
        href: "https://www.sos.nd.gov/news/secretary-state-warns-misleading-annual-report-letters-third-parties",
        label: "North Dakota misleading annual report letters warning"
      },
      {
        href: "https://firststop.sos.nd.gov/",
        label: "North Dakota FirstStop filing portal"
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
  },
  {
    state: "Minnesota",
    route: "/tools/minnesota/annual-renewal-deadline/",
    guideLabel: "Minnesota annual renewal fee and deadline",
    chipLabel: "Minnesota renewal",
    guideType: "Annual renewal guide",
    coverageBucket: "recurring-fees-and-statements",
    featuredInHomeNav: false,
    homeCardDescription:
      "December 31 renewals, common zero-dollar lanes, the Minnesota LLP fee exception, and email-only reminders.",
    directoryCardDescription:
      "Minnesota annual renewal timing, common free-renewal lanes, LLP fees, reminder-email rules, and reinstatement basics.",
    homeComparison: {
      focus: "Minnesota LLC or corporation",
      deadline: "By December 31 each year",
      fee: "$0 for many entities in good standing",
      lateRule:
        "Missing the renewal can trigger statutory dissolution, termination, or revocation without further notice"
    },
    directoryComparison: {
      obligation: "Annual renewal",
      entityFocus: "Corporations, LLCs, nonprofits, LPs, and LLPs",
      deadline: "By December 31 each year, beginning the year after formation or registration",
      amount:
        "$0 for many common entities, but Minnesota LLP renewals use the $135 mail or $155 expedited lane"
    }
  },
  {
    state: "West Virginia",
    route: "/tools/west-virginia/annual-report-deadline/",
    guideLabel: "West Virginia annual report fee and deadline",
    chipLabel: "West Virginia annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "January-to-June filing window, $25 base fee, late-fee split, and the separate West Virginia LLP annual notice.",
    directoryCardDescription:
      "West Virginia annual report timing, $25 base fee, January reminder notices, good-standing rules, and the separate LLP annual notice.",
    homeComparison: {
      focus: "West Virginia profit corporation or LLC",
      deadline: "January 1 to June 30 each year",
      fee: "$25 plus $1 online portal fee",
      lateRule:
        "$50 late fee for profit organizations or $25 late fee for nonprofits, plus dissolution or revocation risk"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus:
        "Corporations, LLCs, nonprofits, LPs, business trusts, and voluntary associations; LLPs use a separate annual notice",
      deadline:
        "January 1 to June 30 each year following the calendar year in which the business was registered",
      amount: "$25 annual report fee, with late fees after June 30"
    }
  },
  {
    state: "Montana",
    route: "/tools/montana/annual-report-deadline/",
    guideLabel: "Montana annual report fee and deadline",
    chipLabel: "Montana annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "April 15 deadline, current $35 post-deadline lane, and reinstatement cleanup rules after the 2026 waiver window closed.",
    directoryCardDescription:
      "Montana annual report timing, current post-April 15 filing lane, reinstatement fees, and scam-alert guidance.",
    homeComparison: {
      focus: "Montana LLC or corporation",
      deadline: "April 15",
      fee: "$35 after April 15, 2026",
      lateRule:
        "$35 after April 15, plus reinstatement and delinquent-year charges if the entity is inactive"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "LLCs and corporations, including profit and nonprofit entities",
      deadline: "April 15 each year",
      amount: "$35 after April 15, 2026, with a separately announced waiver window for filings made from January 1 through April 15, 2027"
    }
  },
  {
    state: "Kentucky",
    route: "/tools/kentucky/annual-report-deadline/",
    guideLabel: "Kentucky annual report fee and deadline",
    chipLabel: "Kentucky annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "January-to-June filing window, $15 fee, online filing, and domestic-versus-foreign late consequences.",
    directoryCardDescription:
      "Kentucky annual report timing, $15 fee, online filing path, and the domestic dissolution versus foreign revocation split.",
    homeComparison: {
      focus: "Kentucky corporation or LLC",
      deadline: "January 1 to June 30",
      fee: "$15 annual report fee",
      lateRule: "Domestic dissolution or foreign authority revocation after the deadline"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus:
        "Corporations, LLCs, partnerships, trusts, and other entities conducting business in Kentucky",
      deadline: "File between January 1 and June 30 each year",
      amount: "$15 annual report fee"
    }
  },
  {
    state: "Massachusetts",
    route: "/tools/massachusetts/annual-report-deadline/",
    guideLabel: "Massachusetts annual report fee and due date",
    chipLabel: "Massachusetts annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Corporation fiscal-year timing, LLC anniversary-date reports, nonprofit November 1 filings, and reinstatement risk.",
    directoryCardDescription:
      "Massachusetts corporation, LLC, foreign LLC, and nonprofit annual report timing with the current fee lanes and warning notices.",
    homeComparison: {
      focus: "Massachusetts corporation or LLC",
      deadline: "Corporations: 2.5 months after fiscal year end; LLCs: anniversary date",
      fee: "$100 electronic or $125 paper for corporations; $500 for LLCs",
      lateRule:
        "Late corporation filings move into higher-fee or reinstatement lanes, and other entities can face revocation or dissolution cleanup if reports stay missing"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Corporations, LLCs, foreign LLCs, and nonprofit corporations",
      deadline:
        "Varies by entity type, including fiscal-year timing for corporations, anniversary-date timing for LLCs, and November 1 for nonprofits",
      amount:
        "$100 electronic or $125 paper for many corporations, $500 for LLCs, and $15 for nonprofit annual reports"
    }
  },
  {
    state: "North Dakota",
    route: "/tools/north-dakota/annual-report-deadline/",
    guideLabel: "North Dakota annual report fee and deadline",
    chipLabel: "North Dakota annual report",
    guideType: "Annual report guide",
    coverageBucket: "annual-reports",
    featuredInHomeNav: false,
    homeCardDescription:
      "Entity-specific due dates, $10 to $50 fee lanes, Not Good Standing risk, and official FirstStop filing.",
    directoryCardDescription:
      "North Dakota annual report timing for corporations, LLCs, and nonprofits with current fee lanes and late-status cleanup rules.",
    homeComparison: {
      focus: "North Dakota corporation or LLC",
      deadline: "May 15, August 1, or November 15 depending on entity type",
      fee: "$25 for corporations or $50 for LLCs",
      lateRule:
        "Late filing fee, Not Good Standing status, and possible termination if the report is not cured"
    },
    directoryComparison: {
      obligation: "Annual report",
      entityFocus: "Domestic and foreign corporations, LLCs, PLLCs, nonprofits, and similar registered entities",
      deadline:
        "Varies by entity type, including February 1, May 15, August 1, and November 15 annual-report dates",
      amount: "$10 for nonprofits, $25 for corporations, or $50 for LLCs"
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
  ],
  "tools/minnesota/annual-renewal-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Minnesota annual renewal fees depend on the filing type",
      headers: ["Entity type", "Due date", "Common renewal lane", "What to watch"],
      rows: [
        [
          "LLC, business corporation, nonprofit corporation, or LP",
          "December 31",
          "$0 renewal in many active, good-standing lanes",
          "The common risk is missing the deadline, not paying a fee."
        ],
        [
          "LLP",
          "December 31",
          "$135 by mail or $155 expedited online or in person",
          "Minnesota LLPs do not use the common zero-dollar renewal lane."
        ],
        [
          "Inactive entity needing reinstatement",
          "Current year renewal first, then reinstatement",
          "Fee changes by entity type and filing method",
          "Reinstatement is a separate lane once the business is already inactive."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and status risk",
      title: "Minnesota turns missed renewals into status problems quickly",
      cards: [
        {
          title: "The state uses different status language by entity type",
          text: "Minnesota's renewal forms show that a missed December 31 filing can end in dissolution for corporations, termination or revocation for LLCs, administrative dissolution for LPs, and revocation of the statement of qualification for LLPs."
        },
        {
          title: "Reinstatement is possible, but the free-renewal answer disappears",
          text: "Minnesota says a statutorily dissolved or inactive entity may retroactively reinstate by filing the current year's renewal and paying the required reinstatement fee."
        },
        {
          title: "Email reminders matter more than paper mail",
          text: "Minnesota says it does not send renewal notices by mail. The office uses annual courtesy emails and encourages businesses to keep the official email address current."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Minnesota renewal details",
      headers: ["Question", "Minnesota answer used here"],
      rows: [
        [
          "When does the annual renewal cycle start?",
          "Minnesota says the annual renewal begins in the calendar year following the original filing with the Secretary of State."
        ],
        [
          "When can you file the renewal?",
          "Minnesota's renewals page says the due year's renewal can be filed anytime between January 1 and December 31, and the business record page shows the next due date."
        ],
        [
          "How will the office remind you?",
          "Minnesota says it will only send annual courtesy emails about renewing your business and will not send renewal correspondence by mail."
        ],
        [
          "How should you handle private mailers?",
          "Minnesota warns that outside solicitations may overstate renewal fees, so compare any demand for payment against the official renewal and fee pages before you send money."
        ]
      ]
    }
  ],
  "tools/west-virginia/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "West Virginia uses one main annual-report lane and one major exception",
      headers: ["Entity type", "Core timing rule", "Published amount", "What to watch"],
      rows: [
        [
          "Profit corporation, LLC, LP, business trust, or voluntary association",
          "January 1 through June 30 each year",
          "$25 annual report fee, plus $1 online portal fee",
          "Late filing can add a $50 late fee for profit organizations."
        ],
        [
          "Nonprofit corporation",
          "January 1 through June 30 each year",
          "$25 annual report fee, plus $1 online portal fee",
          "The late-fee schedule uses the lower nonprofit late-fee lane."
        ],
        [
          "LLP",
          "Separate annual notice, not the standard annual report",
          "$500 annually",
          "Do not confuse the LLP annual notice with the standard $25 annual report."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and good-standing path",
      title: "Missing the June deadline creates a status problem, not just a fee problem",
      cards: [
        {
          title: "West Virginia starts warning businesses in July",
          text: "West Virginia's annual report overview and company-type annual report pages say businesses that do not file by June 30 can move into monetary penalties, noncompliance, and dissolution or revocation risk."
        },
        {
          title: "Certificates depend on annual-report compliance",
          text: "West Virginia says certificates of existence or authorization are issued only to entities that are registered, active, and have filed annual reports."
        },
        {
          title: "The state still wants the official record updated",
          text: "West Virginia's corporation and LLC annual report pages say the filing updates officers, members, addresses, agents for service of process, and other business-record details the Secretary of State tracks."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful West Virginia annual report details",
      headers: ["Question", "West Virginia answer used here"],
      rows: [
        [
          "When does the annual report first become due?",
          "West Virginia says the filing window applies beginning the year after the calendar year in which the business was registered with the Secretary of State."
        ],
        [
          "Will the state remind you?",
          "West Virginia's corporation and LLC pages say annual report notifications are mailed or emailed in January each year."
        ],
        [
          "Why do many businesses file online?",
          "West Virginia says the One Stop Business Portal gives immediate integration of updates into the Secretary of State database and provides an electronic confirmation when the filing is approved."
        ],
        [
          "What if the entity is really an LLP?",
          "Use the separate West Virginia LLP annual notice page before you rely on the standard annual report answer, because the filing label and annual amount are different."
        ]
      ]
    }
  ],
  "tools/montana/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Current filing lane",
      title: "Montana's current May 2026 answer is the post-April 15 lane",
      headers: ["Entity type", "Due date", "Current filing lane", "What to watch"],
      rows: [
        [
          "Active LLC or corporation filing after April 15, 2026",
          "File as soon as possible",
          "$35 annual report fee",
          "The 2026 waived-fee window is closed."
        ],
        [
          "Business planning ahead for 2027",
          "January 1 through April 15, 2027",
          "$0 if the announced 2027 waiver window stays in effect",
          "Montana has already announced another waived-fee window for early 2027 filings."
        ],
        [
          "Inactive domestic corporation or LLC needing reinstatement",
          "Clear missing reports first, then reinstate",
          "$35 for each missing annual report, plus the reinstatement fee",
          "Late cleanup can involve more than one payment."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and cleanup path",
      title: "Montana's simple annual report becomes more expensive once the record is inactive",
      cards: [
        {
          title: "The official help center separates late filings from reinstatement",
          text: "Montana's help articles show that filing the annual report after April 15 is different from reinstating a business that has already become inactive."
        },
        {
          title: "Reinstatement usually means clearing every missing report",
          text: "Montana says domestic corporations and LLCs eligible for reinstatement must file each missing annual report and then complete the reinstatement filing, so waiting can stack costs quickly."
        },
        {
          title: "The safest filing path is still the state portal",
          text: "Montana's scam alerts and solicitation warnings say businesses should use the Secretary of State portal directly instead of paying a private mailer or email that looks official."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Montana annual report details",
      headers: ["Question", "Montana answer used here"],
      rows: [
        [
          "What does the annual report actually do?",
          "Montana says the annual report keeps the registration current and lets the state know the business is still active. It is not a tax or earnings report."
        ],
        [
          "Can you file a no-change report?",
          "Yes. Montana's help center explains the no-change annual report path in the official online filing portal."
        ],
        [
          "Why might there be no receipt?",
          "Montana says businesses that file during the waived-fee period do not receive a receipt, while filings after April 15 can download a receipt immediately."
        ],
        [
          "How should you handle a notice asking for payment?",
          "Montana warns that deceptive mailings and emails can demand annual report money even when the state has announced a waiver window, so confirm the request on the official portal before paying."
        ]
      ]
    }
  ],
  "tools/kentucky/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Fee and filing window",
      title: "Kentucky keeps the annual report lane simple until the status changes",
      headers: ["Scenario", "When to file", "Published amount", "What to watch"],
      rows: [
        [
          "Domestic corporation, LLC, partnership, trust, or similar entity in good standing",
          "January 1 through June 30",
          "$15 annual report fee",
          "Kentucky uses the same basic annual report lane for many entity types."
        ],
        [
          "Foreign entity in good standing",
          "January 1 through June 30",
          "$15 annual report fee",
          "Missing the deadline can revoke the authority to do business in Kentucky."
        ],
        [
          "Already filed but need a correction",
          "Use the amended annual report or the matching change filing",
          "$15 amended annual report fee",
          "Registered-agent or principal-office changes may need a separate change filing instead of the annual report postcard."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and reinstatement path",
      title: "Kentucky's late answer changes sharply between domestic and foreign entities",
      cards: [
        {
          title: "Domestic entities move into administrative dissolution",
          text: "Kentucky's annual reports page says domestic entities that fail to file by June 30 are administratively dissolved until they reinstate."
        },
        {
          title: "Foreign entities risk losing Kentucky authority",
          text: "Kentucky says foreign business entities that fail to timely file annual reports will have their certificates of authority revoked."
        },
        {
          title: "Reinstatement can require more than the missed report",
          text: "Kentucky's FAQ says reinstatement packets can require the reinstatement application, delinquent annual reports, and good-standing letters from the Revenue Cabinet and, for profit corporations, the Division of Unemployment Insurance."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Kentucky annual report details",
      headers: ["Question", "Kentucky answer used here"],
      rows: [
        [
          "Can you file online?",
          "Yes. Kentucky's online services page includes annual report filing and business-record search tools."
        ],
        [
          "What information does the report confirm?",
          "Kentucky says the annual report confirms the principal office, registered agent or office, and the current officers, directors, members, managers, trustees, or partners on record."
        ],
        [
          "How current are the online records?",
          "Kentucky's business records FAQ says the online records are updated as they are added to the database, with no delay between database entry and online availability."
        ],
        [
          "What does inactive and bad standing usually mean?",
          "Kentucky's business records FAQ says inactive status and bad standing commonly mean the entity did not file the annual report for the year or lost a registered agent without appointing a new one."
        ]
      ]
    }
  ],
  "tools/massachusetts/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "Massachusetts annual report timing changes as soon as the entity type changes",
      headers: ["Entity type", "Due rule", "Published amount", "What to watch"],
      rows: [
        [
          "Domestic or foreign corporation",
          "Within two and one-half months after the fiscal year end",
          "$100 if filed electronically or $125 by paper, with the higher late paper lane listed at $150",
          "Massachusetts corporations use the fiscal year, not the anniversary date."
        ],
        [
          "Domestic LLC",
          "On or before the anniversary date of the original certificate of organization",
          "$500 annual report fee",
          "The LLC lane is much more expensive than the basic corporation annual report lane."
        ],
        [
          "Foreign LLC",
          "On or before the anniversary date of the registration to do business in Massachusetts",
          "$500 annual report fee",
          "Foreign LLCs use the anniversary-date rule tied to the Massachusetts registration."
        ],
        [
          "Nonprofit corporation",
          "On or before November 1",
          "$15 annual report fee",
          "Massachusetts nonprofits do not use the corporation fiscal-year rule."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and reinstatement path",
      title: "Massachusetts can turn missed reports into a reinstatement or revocation project",
      cards: [
        {
          title: "Corporations can owe multiple years before they are fully clean",
          text: "Massachusetts corporation guidance says an administratively dissolved corporation may apply for reinstatement, but all annual reports owed for as many as the last ten fiscal years must be filed to reinstate without limitation."
        },
        {
          title: "Foreign LLCs move into revocation rules if problems are not corrected",
          text: "Massachusetts LLC guidance says a foreign LLC can be administratively revoked if the grounds for revocation are not corrected within 90 days after notice."
        },
        {
          title: "Official emails and fake solicitations can both show up",
          text: "Massachusetts offers an official email subscription for annual-report and dissolution notices, but also warns that private mailed solicitations can look similar to government forms and quote the same annual-fee amounts."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful Massachusetts annual report details",
      headers: ["Question", "Massachusetts answer used here"],
      rows: [
        [
          "How do corporations know the deadline?",
          "Massachusetts says domestic and foreign corporations file within two and one-half months after the close of the fiscal year."
        ],
        [
          "How do LLCs know the deadline?",
          "Massachusetts says LLCs and foreign LLCs file annual reports on or before the anniversary date of the original organization or registration."
        ],
        [
          "Will the state send reminder notices?",
          "Massachusetts lets authorized users subscribe to official communications by email, including annual report due notices and dissolution or revocation notices."
        ],
        [
          "Why should you ignore a look-alike mailer?",
          "Massachusetts warns that private solicitations can mimic official forms and reference the same annual-fee amounts even though they are not state notices."
        ]
      ]
    }
  ],
  "tools/north-dakota/annual-report-deadline/index.html": [
    {
      type: "table",
      eyebrow: "Entity split",
      title: "North Dakota annual reports move between four main due dates",
      headers: ["Entity type", "Due date", "Published amount", "What to watch"],
      rows: [
        [
          "Domestic business corporation or professional corporation",
          "August 1",
          "$25 annual report fee",
          "Domestic corporations do not use the May 15 foreign-corporation lane."
        ],
        [
          "Foreign business corporation or professional corporation",
          "May 15",
          "$25 annual report fee",
          "Foreign corporations file earlier than domestic corporations."
        ],
        [
          "LLC or PLLC",
          "November 15",
          "$50 annual report fee",
          "North Dakota LLCs use the later due date and the higher fee lane."
        ],
        [
          "Nonprofit corporation or nonprofit LLC",
          "February 1",
          "$10 annual report fee",
          "North Dakota nonprofits use the earliest annual-report deadline."
        ]
      ]
    },
    {
      type: "detailCards",
      eyebrow: "Late and status risk",
      title: "North Dakota turns missed annual reports into a status problem quickly",
      cards: [
        {
          title: "Not Good Standing arrives before termination",
          text: "North Dakota says a missed annual report moves the entity into Not Good Standing status, which can interfere with lenders, investors, vendors, and expansions into other states that expect a good-standing record."
        },
        {
          title: "The state expects the report to be fixed within a year",
          text: "North Dakota says a business usually has one year to reinstate and can be involuntarily dissolved, terminated, or revoked if the past-due annual report is not cured."
        },
        {
          title: "Private annual report letters are a known problem",
          text: "North Dakota's warning notice says businesses should be skeptical of third-party annual report letters charging large fees and should file directly through the Secretary of State's own system."
        }
      ]
    },
    {
      type: "table",
      eyebrow: "Practical notes",
      title: "Useful North Dakota annual report details",
      headers: ["Question", "North Dakota answer used here"],
      rows: [
        [
          "When is the first annual report due?",
          "North Dakota says the first annual report is due in the year following the calendar year in which the business was first registered."
        ],
        [
          "What does the report update?",
          "North Dakota says the annual report updates the business mailing address, business activities, and stakeholder information the state keeps on file."
        ],
        [
          "Where do you file?",
          "North Dakota says the annual report is completed through the FirstStop Portal."
        ],
        [
          "Why should you clear a missed report quickly?",
          "North Dakota says businesses in Not Good Standing can have trouble obtaining the good-standing proof often expected by lenders, investors, vendors, and other states."
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
  },
  "/tools/minnesota/annual-renewal-deadline/": {
    filingLabel: [1, 2],
    whoShouldUse: [1, 4, 5, 6, 7],
    headlineDueDate: [1, 2, 4, 5, 6, 7],
    mainAmountShown: [3, 7],
    ifAlreadyLate: [4, 5, 6, 7, 9]
  },
  "/tools/west-virginia/annual-report-deadline/": {
    filingLabel: [1, 2, 3, 4],
    whoShouldUse: [2, 3, 4],
    headlineDueDate: [1, 2, 3],
    mainAmountShown: [1, 2, 3, 4],
    ifAlreadyLate: [1, 2, 3, 7]
  },
  "/tools/montana/annual-report-deadline/": {
    filingLabel: [1, 8],
    whoShouldUse: [1, 3],
    headlineDueDate: [1, 2],
    mainAmountShown: [2, 3, 7],
    ifAlreadyLate: [3, 4, 6]
  },
  "/tools/kentucky/annual-report-deadline/": {
    filingLabel: [1, 4],
    whoShouldUse: [1, 3, 4],
    headlineDueDate: [1],
    mainAmountShown: [1, 2],
    ifAlreadyLate: [1, 2, 3, 5]
  },
  "/tools/massachusetts/annual-report-deadline/": {
    filingLabel: [2, 3, 4, 5, 6],
    whoShouldUse: [2, 3, 4, 5, 6],
    headlineDueDate: [2, 3, 4, 5, 6],
    mainAmountShown: [1, 4, 6],
    ifAlreadyLate: [1, 2, 3, 5, 7, 8]
  },
  "/tools/north-dakota/annual-report-deadline/": {
    filingLabel: [1, 2, 3, 4, 6],
    whoShouldUse: [2, 3, 4],
    headlineDueDate: [1, 2, 3, 4],
    mainAmountShown: [2, 3, 4, 5],
    ifAlreadyLate: [1, 4, 5]
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
  }),
  "/tools/minnesota/annual-renewal-deadline/": decisionTool({
    caseLabel: "Which Minnesota annual renewal lane fits best?",
    intro:
      "Minnesota is simple on the date and tricky on the fee. Many business renewals are free, but LLPs are not, and once the entity is inactive the answer shifts to reinstatement.",
    cases: [
      decisionCase({
        value: "common-zero-dollar-lane",
        label: "LLC, corporation, nonprofit, or LP in good standing",
        deadline: "By December 31 each year",
        amount: "$0 in many common renewal lanes",
        normalRule:
          "Minnesota's common business-renewal lanes for active LLCs, corporations, nonprofits, and LPs are often zero-dollar filings, but the renewal still has to be submitted by December 31.",
        lateRule:
          "Once the renewal is missed, Minnesota's forms show that the entity can move into dissolution, termination, or revocation without further notice, so the free-renewal answer no longer solves the full problem.",
        confirmRule:
          "Confirm that the record is not an LLP and that the business is still active before relying on the zero-dollar answer.",
        nextAction:
          "Use the Minnesota renewal page or the business record details page, then submit the renewal before December 31.",
        sourceIndexes: [1, 2, 3, 4, 5, 6],
        lateSourceIndexes: [4, 5, 6, 9],
        confirmSourceIndexes: [1, 2, 3]
      }),
      decisionCase({
        value: "llp",
        label: "LLP annual renewal",
        deadline: "By December 31 each year",
        amount: "$135 by mail or $155 expedited online or in person",
        normalRule:
          "Minnesota LLPs still renew by December 31, but they do not use the common zero-dollar lane. The LLP form and fee schedule show the paid annual-renewal amount.",
        lateRule:
          "If the LLP renewal is missed, Minnesota warns that the statement of qualification can be revoked, and the filing shifts toward reinstatement work instead of a routine renewal.",
        confirmRule:
          "Confirm that the entity is truly an LLP before using the higher-fee lane, because many other Minnesota business renewals are free.",
        nextAction:
          "Use the Minnesota LLP annual renewal form and fee schedule before paying.",
        sourceIndexes: [1, 3, 7],
        lateSourceIndexes: [7, 9],
        confirmSourceIndexes: [3, 7]
      }),
      decisionCase({
        value: "inactive-or-reinstating",
        label: "Already inactive or reinstating",
        deadline: "Resolve the inactive status as soon as possible",
        amount: "Reinstatement fee changes by entity type and filing method",
        normalRule:
          "Once a Minnesota entity is already inactive or statutorily dissolved, the standard annual-renewal answer is not enough by itself.",
        lateRule:
          "Minnesota says an inactive entity may retroactively reinstate by filing the current year's renewal and paying the required reinstatement fee, which is no longer the common zero-dollar lane.",
        confirmRule:
          "Check the current business status first so you know whether you still need a normal annual renewal or a reinstatement filing.",
        nextAction:
          "Use the Minnesota reinstatement page and the matching fee schedule before submitting payment.",
        sourceIndexes: [1, 3, 9],
        lateSourceIndexes: [4, 5, 6, 7, 9],
        confirmSourceIndexes: [2, 9]
      })
    ]
  }),
  "/tools/west-virginia/annual-report-deadline/": decisionTool({
    caseLabel: "Which West Virginia filing lane fits best?",
    intro:
      "West Virginia's common annual report answer works for many entity types, but the fee and risk change once the business is late, and LLPs use a separate annual notice.",
    cases: [
      decisionCase({
        value: "profit-corporation-or-llc",
        label: "Profit corporation, LLC, LP, trust, or voluntary association",
        deadline: "January 1 through June 30 each year",
        amount: "$25 annual report fee, plus a $1 online portal fee",
        normalRule:
          "West Virginia's standard annual report lane runs from January 1 through June 30, and the common filing amount is the $25 fee plus the portal charge for online filing.",
        lateRule:
          "After June 30, West Virginia's fee schedule adds the larger late-fee lane for profit organizations, and the state warns that missed reports can lead to administrative dissolution or revocation.",
        confirmRule:
          "Confirm that the entity is not an LLP before relying on the standard $25 annual report answer.",
        nextAction:
          "Use the West Virginia annual reports page and the One Stop portal instructions before filing.",
        sourceIndexes: [1, 2, 3, 5],
        lateSourceIndexes: [1, 2, 3],
        confirmSourceIndexes: [2, 3, 5]
      }),
      decisionCase({
        value: "nonprofit-corporation",
        label: "Nonprofit corporation",
        deadline: "January 1 through June 30 each year",
        amount: "$25 annual report fee, plus a $1 online portal fee",
        normalRule:
          "West Virginia nonprofits use the same annual report window, but the late-fee schedule treats nonprofit organizations differently from profit organizations.",
        lateRule:
          "If the nonprofit misses June 30, West Virginia still expects the report and warns that the entity can lose compliance and move toward dissolution or revocation.",
        confirmRule:
          "Confirm that the entity is a nonprofit corporation and not an LLP or some other special filing lane.",
        nextAction:
          "Use the West Virginia corporation annual report page and the One Stop portal before paying.",
        sourceIndexes: [1, 2, 5],
        lateSourceIndexes: [1, 2],
        confirmSourceIndexes: [2, 5]
      }),
      decisionCase({
        value: "llp-annual-notice",
        label: "West Virginia LLP annual notice",
        deadline: "Use the LLP annual notice lane, not the standard annual report",
        amount: "$500 annually",
        normalRule:
          "West Virginia LLPs use an annual notice instead of the standard annual report, so the common $25 annual report answer does not fit.",
        lateRule:
          "If an LLP misses its annual notice, West Virginia says an administrative dissolution or revocation notice may be mailed.",
        confirmRule:
          "Confirm that the entity is registered as an LLP before using the annual-notice answer.",
        nextAction:
          "Open the West Virginia LLP page first so you do not file the wrong document.",
        sourceIndexes: [4],
        lateSourceIndexes: [4],
        confirmSourceIndexes: [4]
      }),
      decisionCase({
        value: "already-late",
        label: "Already late or need good standing restored",
        deadline: "Resolve the annual report issue as soon as possible",
        amount: "Base fee plus the applicable late-fee lane",
        normalRule:
          "Once the West Virginia filing window is missed, the problem becomes more than a routine annual report reminder.",
        lateRule:
          "West Virginia says certificates are issued only to entities that are registered, active, and have filed annual reports, so a missed report can block good-standing requests until the record is cleaned up.",
        confirmRule:
          "Check whether you only need a late annual report or whether the business has already moved into a more serious status problem.",
        nextAction:
          "Use the annual report overview, certificates guidance, and West Virginia business entity search before paying.",
        sourceIndexes: [1, 7, 8],
        lateSourceIndexes: [1, 7],
        confirmSourceIndexes: [7, 8]
      })
    ]
  }),
  "/tools/montana/annual-report-deadline/": decisionTool({
    caseLabel: "Which Montana annual report lane fits best?",
    intro:
      "As of May 17, 2026, Montana's free 2026 filing window is over. The live question is whether the business is still active and paying the current $35 fee, already in reinstatement, or planning ahead for the announced 2027 waiver window.",
    cases: [
      decisionCase({
        value: "active-business-after-april-15-2026",
        label: "Active business filing after April 15, 2026",
        deadline: "File as soon as possible after the missed April 15 deadline",
        amount: "$35 annual report fee",
        normalRule:
          "Montana's fee table and help content point active businesses that file after April 15, 2026 into the current $35 annual-report lane.",
        lateRule:
          "The filing can still be handled as a normal annual report if the record remains active, but waiting longer increases the chance that the business will move into reinstatement work.",
        confirmRule:
          "Confirm that the business is still active before assuming a simple late annual report is enough.",
        nextAction:
          "Use the Montana fee table, receipt guidance, and filing portal before paying.",
        sourceIndexes: [1, 3, 7, 8],
        lateSourceIndexes: [3, 4],
        confirmSourceIndexes: [3, 7]
      }),
      decisionCase({
        value: "planning-for-2027-waiver-window",
        label: "Planning for the announced 2027 waiver window",
        deadline: "January 1 through April 15, 2027",
        amount: "$0 if the announced 2027 waiver window stays in effect",
        normalRule:
          "Montana separately announced that it plans to waive the annual report filing fee again for businesses that file between January 1 and April 15, 2027.",
        lateRule:
          "That future waiver announcement does not change the current 2026 late-filing answer. A business filing now still uses the live 2026 fee lane.",
        confirmRule:
          "Confirm that you are planning for the 2027 filing cycle and not relying on the expired 2026 waived-fee window.",
        nextAction:
          "Use the Montana waiver announcement and the filing portal when the 2027 window opens.",
        sourceIndexes: [2, 8],
        lateSourceIndexes: [3, 4],
        confirmSourceIndexes: [2]
      }),
      decisionCase({
        value: "already-dissolved-or-inactive",
        label: "Already dissolved or inactive",
        deadline: "Clear the inactive record as soon as possible",
        amount: "$35 for each missing annual report, plus the reinstatement fee",
        normalRule:
          "Once the business is already inactive, the Montana annual report answer is no longer just a one-step filing.",
        lateRule:
          "Montana's reinstatement help says domestic corporations and LLCs eligible for reinstatement must file each missing annual report and then complete the reinstatement filing.",
        confirmRule:
          "Check whether the record is still active or whether the business has already moved into the reinstatement path.",
        nextAction:
          "Use the Montana reinstatement article and fee table before sending payment.",
        sourceIndexes: [3, 4],
        lateSourceIndexes: [3, 4],
        confirmSourceIndexes: [4]
      }),
      decisionCase({
        value: "suspicious-mailer",
        label: "Suspicious mailer or email asking for payment",
        deadline: "Verify the notice before paying anything",
        amount: "Use the official fee table and portal instead of the solicitation",
        normalRule:
          "Montana warns that deceptive mailings and emails can look official even when they are not connected to the Secretary of State.",
        lateRule:
          "A private mailer can still ask for money even during the 2026 fee-waiver window, so the payment request alone is not proof that a fee is actually due.",
        confirmRule:
          "Check the official Montana scam-alert pages and the state filing portal before you send money or upload documents.",
        nextAction:
          "Ignore the outside payment request until it matches the official Montana sources.",
        sourceIndexes: [5, 6, 8],
        lateSourceIndexes: [5, 6],
        confirmSourceIndexes: [5, 6, 8]
      })
    ]
  }),
  "/tools/kentucky/annual-report-deadline/": decisionTool({
    caseLabel: "Which Kentucky annual report lane fits best?",
    intro:
      "Kentucky keeps the on-time filing answer simple at June 30 and $15, but the late-state path changes sharply once you separate foreign entities from domestic reinstatement work.",
    cases: [
      decisionCase({
        value: "standard-annual-report",
        label: "Standard Kentucky annual report",
        deadline: "January 1 through June 30 each year",
        amount: "$15 annual report fee",
        normalRule:
          "Kentucky's ordinary annual report lane runs from January 1 through June 30 and commonly uses the $15 filing fee for domestic and foreign entities alike.",
        lateRule:
          "Once June 30 is missed, the issue becomes a status problem instead of a simple reminder, so the business type matters immediately.",
        confirmRule:
          "Confirm the current entity details and filing access through the Kentucky online services page before filing.",
        nextAction:
          "Use the Kentucky annual reports page or online services portal before paying.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [1, 3],
        confirmSourceIndexes: [3, 4, 5]
      }),
      decisionCase({
        value: "foreign-entity-already-late",
        label: "Foreign entity already late",
        deadline: "Resolve the record as soon as possible after June 30",
        amount: "$15 annual report fee, plus the risk that authority may already be revoked",
        normalRule:
          "Foreign entities use the same ordinary June 30 annual report lane and $15 fee while the record is still current.",
        lateRule:
          "Kentucky says foreign business entities that fail to timely file annual reports will have their certificates of authority revoked.",
        confirmRule:
          "Confirm whether the foreign entity is still active or already revoked before you assume a normal annual report filing is enough.",
        nextAction:
          "Use Kentucky's annual reports page, FAQ, and online services tools first so you know whether the business still has active authority.",
        sourceIndexes: [1, 2, 4],
        lateSourceIndexes: [1, 3, 5],
        confirmSourceIndexes: [3, 5, 6]
      }),
      decisionCase({
        value: "domestic-entity-reinstating",
        label: "Domestic entity reinstating after dissolution",
        deadline: "Clear the dissolved record as soon as possible",
        amount: "Delinquent $15 report fees plus reinstatement paperwork and agency good-standing steps for some entities",
        normalRule:
          "Once a Kentucky domestic entity is already administratively dissolved, the ordinary annual report answer is no longer enough by itself.",
        lateRule:
          "Kentucky's annual reports page and FAQ say domestic entities that miss the filing move into administrative dissolution and may need a reinstatement application, delinquent annual reports, and other good-standing documents.",
        confirmRule:
          "Check whether the business is simply late or already dissolved before you pay, because the reinstatement lane is more involved.",
        nextAction:
          "Use the Kentucky annual reports page, fees page, and FAQ before mailing or uploading a reinstatement packet.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [1, 2, 3, 5],
        confirmSourceIndexes: [3, 5]
      }),
      decisionCase({
        value: "need-record-check",
        label: "Need to confirm the state record first",
        deadline: "Verify the record before filing or ordering certificates",
        amount: "Search first, then file the needed report or amendment",
        normalRule:
          "Kentucky's online services and business-records tools let you confirm the current record before you rely on a postcard or outside reminder.",
        lateRule:
          "If the record already shows inactive and bad standing, Kentucky says the issue is usually a missed annual report or a registered-agent problem, and the cleanup path is no longer a routine filing.",
        confirmRule:
          "Use the live state record before paying so you know whether you need an annual report, an amended annual report, or a separate record-change filing.",
        nextAction:
          "Open Kentucky's online services and business records pages before you submit anything.",
        sourceIndexes: [4, 5, 6],
        lateSourceIndexes: [5, 6],
        confirmSourceIndexes: [4, 5, 6]
      })
    ]
  }),
  "/tools/massachusetts/annual-report-deadline/": decisionTool({
    caseLabel: "Which Massachusetts annual report lane fits best?",
    intro:
      "Massachusetts changes the due date and the fee as soon as the entity type changes, so the right first step is matching the business to the correct corporation, LLC, or nonprofit lane.",
    cases: [
      decisionCase({
        value: "corporation",
        label: "Domestic or foreign corporation",
        deadline: "Within two and one-half months after the fiscal year ends",
        amount: "$100 if filed electronically or $125 by paper, with the higher late paper lane listed at $150",
        normalRule:
          "Massachusetts corporations file annual reports based on the fiscal year rather than an anniversary date, and the fee schedule separates electronic, paper, and late paper lanes.",
        lateRule:
          "If the corporation falls into administrative dissolution, Massachusetts says reinstatement can require annual reports owed for as many as the last ten fiscal years plus tax-clearance steps.",
        confirmRule:
          "Confirm that the entity is a corporation and note the fiscal year end before relying on the corporation deadline.",
        nextAction:
          "Use the Massachusetts fee schedule and corporation annual report guidance before filing.",
        sourceIndexes: [1, 2, 3],
        lateSourceIndexes: [1, 2, 3],
        confirmSourceIndexes: [2, 3, 7]
      }),
      decisionCase({
        value: "llc",
        label: "LLC or foreign LLC",
        deadline: "On or before the anniversary date of the organization or registration",
        amount: "$500 annual report fee",
        normalRule:
          "Massachusetts LLCs and foreign LLCs use the anniversary-date annual-report rule and the published $500 annual report fee.",
        lateRule:
          "Massachusetts says a foreign LLC can be administratively revoked if the grounds for revocation are not corrected within 90 days after notice.",
        confirmRule:
          "Confirm whether the record is a domestic LLC or foreign LLC, then use the anniversary date shown in the state record.",
        nextAction:
          "Use the Massachusetts LLC guidance and fee schedule before paying.",
        sourceIndexes: [1, 4, 5],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [4, 5, 7]
      }),
      decisionCase({
        value: "nonprofit",
        label: "Nonprofit corporation",
        deadline: "On or before November 1",
        amount: "$15 annual report fee",
        normalRule:
          "Massachusetts nonprofit corporations use the November 1 annual-report lane instead of the fiscal-year rule used by business corporations.",
        lateRule:
          "If the nonprofit misses the filing and later needs state notices or status help, Massachusetts still routes official communications through the Corporations Division system.",
        confirmRule:
          "Confirm that the entity is a nonprofit corporation before using the November 1 and $15 answer.",
        nextAction:
          "Use the Massachusetts nonprofit annual report guidance before filing.",
        sourceIndexes: [6],
        lateSourceIndexes: [6, 7],
        confirmSourceIndexes: [6, 7]
      }),
      decisionCase({
        value: "already-delinquent",
        label: "Already delinquent or facing reinstatement or revocation",
        deadline: "Resolve the status issue as soon as possible",
        amount: "Current filing fees plus any required reinstatement or revival filings",
        normalRule:
          "Once a Massachusetts entity is already delinquent, the ordinary annual report due-date answer is no longer enough by itself.",
        lateRule:
          "Massachusetts reinstatement and revocation guidance shows that delinquent corporations can owe back annual reports and foreign LLCs can move into revocation if notices are ignored.",
        confirmRule:
          "Check whether you are dealing with a corporation, LLC, foreign LLC, or nonprofit before you pay, because the cleanup path changes by entity type.",
        nextAction:
          "Use the relevant Massachusetts entity guidance, the fee schedule, and official notice channels before sending payment.",
        sourceIndexes: [1, 2, 3, 5, 7],
        lateSourceIndexes: [1, 2, 3, 5, 7, 8],
        confirmSourceIndexes: [2, 3, 5, 7]
      })
    ]
  }),
  "/tools/north-dakota/annual-report-deadline/": decisionTool({
    caseLabel: "Which North Dakota annual report lane fits best?",
    intro:
      "North Dakota's annual-report answer depends heavily on the entity type because the state moves the deadline between February, May, August, and November and does not use one flat fee.",
    cases: [
      decisionCase({
        value: "domestic-corporation",
        label: "Domestic corporation or professional corporation",
        deadline: "August 1",
        amount: "$25 annual report fee",
        normalRule:
          "North Dakota domestic business and professional corporations file annual reports by August 1 and use the $25 fee lane.",
        lateRule:
          "If the report is missed, North Dakota moves the record into Not Good Standing, adds a late filing fee, and can later terminate the registration if the problem is not cured.",
        confirmRule:
          "Confirm that the record is domestic and not foreign before relying on the August 1 answer.",
        nextAction:
          "Use North Dakota's corporation page and FirstStop portal before filing.",
        sourceIndexes: [1, 2, 6],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [2, 6]
      }),
      decisionCase({
        value: "foreign-corporation",
        label: "Foreign corporation or foreign professional corporation",
        deadline: "May 15",
        amount: "$25 annual report fee",
        normalRule:
          "North Dakota foreign corporations use the earlier May 15 annual-report lane, even though the corporation fee stays at $25.",
        lateRule:
          "North Dakota says foreign businesses that do not cure the past-due annual report can ultimately have their authority revoked.",
        confirmRule:
          "Confirm that the record is foreign-qualified before relying on the May 15 answer.",
        nextAction:
          "Use North Dakota's corporation page and the annual report overview before paying.",
        sourceIndexes: [1, 2, 6],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [2]
      }),
      decisionCase({
        value: "llc",
        label: "LLC or PLLC",
        deadline: "November 15",
        amount: "$50 annual report fee",
        normalRule:
          "North Dakota LLCs and PLLCs file annual reports by November 15 and use the higher $50 fee lane.",
        lateRule:
          "A missed LLC annual report still moves the business into Not Good Standing and can create termination risk if the filing is not cured.",
        confirmRule:
          "Confirm that the entity is an LLC or PLLC before using the November 15 and $50 answer.",
        nextAction:
          "Use North Dakota's LLC page and FirstStop portal before filing.",
        sourceIndexes: [1, 3, 6],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [3, 6]
      }),
      decisionCase({
        value: "nonprofit",
        label: "Nonprofit corporation or nonprofit LLC",
        deadline: "February 1",
        amount: "$10 annual report fee",
        normalRule:
          "North Dakota nonprofits file annual reports by February 1 and use the lower $10 fee lane.",
        lateRule:
          "If the nonprofit misses the report, North Dakota can still move the record into a status problem that eventually requires reinstatement work.",
        confirmRule:
          "Confirm that the record is a nonprofit corporation or nonprofit LLC before using the February 1 answer.",
        nextAction:
          "Use North Dakota's nonprofit maintenance page and FirstStop portal before filing.",
        sourceIndexes: [1, 4, 6],
        lateSourceIndexes: [1, 4, 5],
        confirmSourceIndexes: [4]
      }),
      decisionCase({
        value: "already-not-good-standing",
        label: "Already Not Good Standing or curing a past-due report",
        deadline: "Resolve the status issue as soon as possible",
        amount: "Current filing fee plus the applicable late filing fee",
        normalRule:
          "Once a North Dakota business is already in Not Good Standing, the ordinary entity-type due date answer is no longer enough by itself.",
        lateRule:
          "North Dakota says businesses usually have one year to reinstate, and waiting too long can lead to involuntary dissolution, termination, or revocation.",
        confirmRule:
          "Check the current business status before you pay so you know whether you only need the annual report or also need reinstatement cleanup.",
        nextAction:
          "Use the annual report overview, warning notice, and FirstStop portal before submitting payment.",
        sourceIndexes: [1, 5, 6],
        lateSourceIndexes: [1, 5],
        confirmSourceIndexes: [1, 6]
      })
    ]
  })
};
