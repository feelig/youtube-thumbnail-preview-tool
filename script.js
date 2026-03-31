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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const guideCompareRoots = document.querySelectorAll("[data-guide-compare-root]");

guideCompareRoots.forEach((root) => {
  const compareForm = root.querySelector("[data-compare-form]");
  const modeButtons = Array.from(root.querySelectorAll("[data-compare-mode-button]"));
  const compareSelects = Array.from(root.querySelectorAll("[data-compare-select]"));
  const thirdField = root.querySelector("[data-compare-third-field]");
  const compareStatus = root.querySelector("[data-compare-status]");
  const compareTableWrap = root.querySelector("[data-compare-table-wrap]");
  const compareTable = root.querySelector("[data-compare-table]");
  const compareReset = root.querySelector("[data-compare-reset]");
  let compareMode = "2";

  if (
    !compareForm ||
    compareSelects.length < 2 ||
    !compareStatus ||
    !compareTableWrap ||
    !compareTable
  ) {
    return;
  }

  function getRequiredCount() {
    return compareMode === "3" ? 3 : 2;
  }

  function getSelectedEntry(select) {
    const option = select.options[select.selectedIndex];

    if (!option || !option.value) {
      return null;
    }

    return {
      state: option.dataset.state || option.textContent.trim(),
      guideLabel: option.dataset.guideLabel || "",
      obligation: option.dataset.obligation || "",
      entityFocus: option.dataset.entityFocus || "",
      deadline: option.dataset.deadline || "",
      amount: option.dataset.amount || "",
      lateRule: option.dataset.lateRule || "",
      route: option.value
    };
  }

  function hideComparisonTable() {
    compareTableWrap.hidden = true;
    compareTable.innerHTML = "";
  }

  function getActiveSelects() {
    return compareSelects.slice(0, getRequiredCount());
  }

  function getSelectionState() {
    const selectedEntries = getActiveSelects().map(getSelectedEntry).filter(Boolean);
    const uniqueStates = new Set(selectedEntries.map((entry) => entry.state));

    return {
      requiredCount: getRequiredCount(),
      selectedEntries,
      hasDuplicate: uniqueStates.size !== selectedEntries.length,
    };
  }

  function setPendingStatus() {
    const { requiredCount, selectedEntries, hasDuplicate } = getSelectionState();

    if (selectedEntries.length < requiredCount) {
      compareStatus.textContent = hasDuplicate
        ? `Choose ${requiredCount} different states and click Compare states.`
        : `Choose ${requiredCount} states and click Compare states.`;
      hideComparisonTable();
      return;
    }

    if (hasDuplicate) {
      compareStatus.textContent = "Choose different states to compare.";
      hideComparisonTable();
      return;
    }

    compareStatus.textContent = `Ready to compare ${selectedEntries
      .map((entry) => entry.state)
      .join(" vs ")}. Click Compare states.`;
    hideComparisonTable();
  }

  function renderComparisonTable(entries) {
    const rows = [
      { label: "Guide", key: "guideLabel" },
      { label: "Filing label", key: "obligation" },
      { label: "Best for", key: "entityFocus" },
      { label: "Main deadline", key: "deadline" },
      { label: "Main amount", key: "amount" },
      { label: "Late rule", key: "lateRule" },
      { label: "Open guide", key: "route", isLink: true }
    ];

    compareTable.innerHTML = `              <thead>
                <tr>
                  <th>Compare item</th>
${entries
  .map(
    (entry) => `                  <th>${escapeHtml(entry.state)}<span class="compare-col-note">${escapeHtml(
      entry.guideLabel
    )}</span></th>`
  )
  .join("\n")}
                </tr>
              </thead>
              <tbody>
${rows
  .map(
    (row) => `                <tr>
                  <th>${escapeHtml(row.label)}</th>
${entries
  .map((entry) => {
    if (row.isLink) {
      return `                  <td><a class="inline-link" href="${escapeHtml(entry.route)}">Open guide</a></td>`;
    }

    return `                  <td>${escapeHtml(entry[row.key])}</td>`;
  })
  .join("\n")}
                </tr>`
  )
  .join("\n")}
              </tbody>`;
  }

  function updateComparisonUrl(entries) {
    const url = new URL(window.location.href);
    const routeList = entries.map((entry) => entry.route).join(",");

    url.searchParams.set("compareMode", compareMode);
    url.searchParams.set("compare", routeList);
    window.history.pushState({}, "", url);
  }

  function clearComparisonUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("compareMode");
    url.searchParams.delete("compare");
    window.history.pushState({}, "", url);
  }

  function updateCompareModeButtons() {
    modeButtons.forEach((button) => {
      const isActive = button.dataset.mode === compareMode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function syncCompareModeUi() {
    if (thirdField) {
      thirdField.hidden = compareMode !== "3";
    }

    if (compareMode !== "3" && compareSelects[2]) {
      compareSelects[2].value = "";
    }

    updateCompareModeButtons();
  }

  function renderComparison(entries, { updateUrl = true } = {}) {
    compareStatus.textContent = `Comparing ${entries
      .map((entry) => entry.state)
      .join(" vs ")}.`;
    renderComparisonTable(entries);
    compareTableWrap.hidden = false;

    if (updateUrl) {
      updateComparisonUrl(entries);
    }
  }

  function submitComparison() {
    const { requiredCount, selectedEntries, hasDuplicate } = getSelectionState();

    if (selectedEntries.length < requiredCount) {
      compareStatus.textContent = hasDuplicate
        ? `Choose ${requiredCount} different states and click Compare states.`
        : `Choose ${requiredCount} states and click Compare states.`;
      hideComparisonTable();
      return false;
    }

    if (hasDuplicate) {
      compareStatus.textContent = "Choose different states to compare.";
      hideComparisonTable();
      return false;
    }

    renderComparison(selectedEntries);
    return true;
  }

  function hydrateFromUrl() {
    const url = new URL(window.location.href);
    const modeFromUrl = url.searchParams.get("compareMode");
    const compareFromUrl = url.searchParams.get("compare");

    compareSelects.forEach((select) => {
      select.value = "";
    });

    if (modeFromUrl === "3") {
      compareMode = "3";
    } else {
      compareMode = "2";
    }

    syncCompareModeUi();

    if (!compareFromUrl) {
      setPendingStatus();
      return;
    }

    const routes = compareFromUrl
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    getActiveSelects().forEach((select, index) => {
      const route = routes[index];
      if (route && Array.from(select.options).some((option) => option.value === route)) {
        select.value = route;
      }
    });

    const { requiredCount, selectedEntries, hasDuplicate } = getSelectionState();

    if (hasDuplicate || selectedEntries.length < requiredCount) {
      setPendingStatus();
      return;
    }

    renderComparison(selectedEntries, { updateUrl: false });
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      compareMode = button.dataset.mode || "2";
      syncCompareModeUi();
      setPendingStatus();
    });
  });

  compareSelects.forEach((select) => {
    select.addEventListener("change", setPendingStatus);
  });

  compareForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitComparison();
  });

  compareReset?.addEventListener("click", () => {
    compareSelects.forEach((select) => {
      select.value = "";
    });
    compareMode = "2";
    syncCompareModeUi();
    clearComparisonUrl();
    setPendingStatus();
  });

  window.addEventListener("popstate", hydrateFromUrl);

  hydrateFromUrl();
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
