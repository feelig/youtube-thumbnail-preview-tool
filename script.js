const lookupForms = document.querySelectorAll("[data-state-lookup]");

lookupForms.forEach((lookupForm) => {
  lookupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const select = lookupForm.querySelector("select");
    if (select && select.value) {
      window.location.href = select.value;
    }
  });
});

const nevadaConfig = {
  llc: {
    title: "Nevada LLC",
    annualListFee: 150,
    businessLicenseFee: 200,
    annualListLatePenalty: 75,
    businessLicenseLatePenalty: 100,
    note: "Uses the Nevada LLC annual list fee in NRS 86.263 and the general state business license renewal fee in NRS 76.130.",
  },
  corporation: {
    title: "Nevada corporation",
    annualListFee: 150,
    businessLicenseFee: 500,
    annualListLatePenalty: 75,
    businessLicenseLatePenalty: 100,
    note: "Uses the corporation annual list fee in NRS 78.150 and the corporation renewal fee in NRS 76.130.",
  },
};

const nevadaCalculator = document.querySelector("[data-nevada-calculator]");

if (nevadaCalculator) {
  const radios = nevadaCalculator.querySelectorAll("input[name='nevada-entity']");
  const title = nevadaCalculator.querySelector("[data-nevada-title]");
  const annualListFee = nevadaCalculator.querySelector("[data-annual-list-fee]");
  const businessLicenseFee = nevadaCalculator.querySelector("[data-business-license-fee]");
  const recurringTotal = nevadaCalculator.querySelector("[data-recurring-total]");
  const lateTotal = nevadaCalculator.querySelector("[data-late-total]");
  const note = nevadaCalculator.querySelector("[data-nevada-note]");

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function updateNevadaCalculator(entityKey) {
    const config = nevadaConfig[entityKey] || nevadaConfig.llc;
    const recurring = config.annualListFee + config.businessLicenseFee;
    const late = recurring + config.annualListLatePenalty + config.businessLicenseLatePenalty;

    if (title) {
      title.textContent = config.title;
    }
    if (annualListFee) {
      annualListFee.textContent = formatCurrency(config.annualListFee);
    }
    if (businessLicenseFee) {
      businessLicenseFee.textContent = formatCurrency(config.businessLicenseFee);
    }
    if (recurringTotal) {
      recurringTotal.textContent = formatCurrency(recurring);
    }
    if (lateTotal) {
      lateTotal.textContent = formatCurrency(late);
    }
    if (note) {
      note.textContent = config.note;
    }
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        updateNevadaCalculator(radio.value);
      }
    });
  });

  const checkedRadio = Array.from(radios).find((radio) => radio.checked);
  updateNevadaCalculator(checkedRadio ? checkedRadio.value : "llc");
}

const decisionToolRoots = document.querySelectorAll("[data-decision-tool-root]");

decisionToolRoots.forEach((root) => {
  const caseSelect = root.querySelector("[data-decision-case]");
  const statusSelect = root.querySelector("[data-decision-status]");
  const cards = Array.from(root.querySelectorAll("[data-decision-card]"));

  if (!caseSelect || !statusSelect || cards.length === 0) {
    return;
  }

  function showBestMatch() {
    const selectedCase = caseSelect.value;
    const selectedStatus = statusSelect.value;
    let activeCard = cards.find(
      (card) =>
        card.dataset.case === selectedCase && card.dataset.status === selectedStatus
    );

    if (!activeCard) {
      activeCard = cards.find((card) => card.dataset.case === selectedCase) || cards[0];
    }

    cards.forEach((card) => {
      card.hidden = card !== activeCard;
    });
  }

  caseSelect.addEventListener("change", showBestMatch);
  statusSelect.addEventListener("change", showBestMatch);
  showBestMatch();
});

const guideDirectoryRoots = document.querySelectorAll("[data-guide-directory-root]");

guideDirectoryRoots.forEach((root) => {
  const searchInputs = Array.from(root.querySelectorAll("[data-guide-search-input]"));
  const bucketSelects = Array.from(root.querySelectorAll("[data-guide-bucket-select]"));
  const cards = Array.from(root.querySelectorAll("[data-guide-card]"));
  const emptyStates = Array.from(root.querySelectorAll("[data-guide-empty]"));
  const resultCounts = Array.from(root.querySelectorAll("[data-guide-results-count]"));

  if (cards.length === 0) {
    return;
  }

  function syncValue(elements, source) {
    elements.forEach((element) => {
      if (element !== source) {
        element.value = source.value;
      }
    });
  }

  function updateResults() {
    const query = (searchInputs[0]?.value || "").trim().toLowerCase();
    const selectedBucket = bucketSelects[0]?.value || "";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesQuery = !query || (card.dataset.search || "").includes(query);
      const matchesBucket =
        !selectedBucket || card.dataset.guideBucket === selectedBucket;
      const matches = matchesQuery && matchesBucket;

      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    emptyStates.forEach((emptyState) => {
      emptyState.hidden = visibleCount !== 0;
    });

    resultCounts.forEach((resultCount) => {
      if (visibleCount === cards.length) {
        resultCount.textContent = `Showing all ${cards.length} guides.`;
        return;
      }

      resultCount.textContent = `Showing ${visibleCount} of ${cards.length} guides.`;
    });
  }

  searchInputs.forEach((input) => {
    input.addEventListener("input", () => {
      syncValue(searchInputs, input);
      updateResults();
    });
  });

  bucketSelects.forEach((select) => {
    select.addEventListener("change", () => {
      syncValue(bucketSelects, select);
      updateResults();
    });
  });

  updateResults();
});
