document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const billInput = $("bill");
  const sizeInput = $("size");
  const calculateBtn = $("calculate");
  const annualEl = $("annual");
  const costEl = $("cost");
  const paybackEl = $("payback");
  const money = (value) => "PKR " + Math.round(value).toLocaleString("en-PK");

  function calculate() {
    if (!billInput || !sizeInput || !annualEl || !costEl || !paybackEl) return;
    const bill = Math.max(0, Number(billInput.value) || 0);
    const size = Number(sizeInput.value);
    const coverage = { 3: 0.45, 5: 0.65, 10: 0.85, 15: 0.95 }[size] || 0;
    const annualSavings = bill * 12 * coverage;
    const estimatedCost = size * 150000;
    const payback = annualSavings > 0 ? estimatedCost / annualSavings : 0;
    annualEl.textContent = money(annualSavings);
    costEl.textContent = money(estimatedCost);
    paybackEl.textContent = payback ? payback.toFixed(1) + " years" : "—";
  }

  if (calculateBtn) calculateBtn.addEventListener("click", calculate);
  if (billInput) billInput.addEventListener("input", calculate);
  if (sizeInput) sizeInput.addEventListener("change", calculate);

  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuToggle = $("menuToggle");
  const siteMenu = $("siteMenu");
  const menuClose = $("menuClose");
  const menuOverlay = $("menuOverlay");

  function closeMenu() {
    if (!siteMenu) return;
    siteMenu.classList.remove("open");
    if (menuOverlay) menuOverlay.classList.remove("open");
    siteMenu.setAttribute("aria-hidden", "true");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open website menu");
    }
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!siteMenu) return;
    siteMenu.classList.add("open");
    if (menuOverlay) menuOverlay.classList.add("open");
    siteMenu.setAttribute("aria-hidden", "false");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close website menu");
    }
    document.body.classList.add("menu-open");
  }

  closeMenu();
  if (menuToggle) menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    siteMenu && siteMenu.classList.contains("open") ? closeMenu() : openMenu();
  });
  if (menuClose) menuClose.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
  });
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
  if (siteMenu) siteMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const searchToggle = $("searchToggle");
  const searchPanel = $("searchPanel");
  const siteSearch = $("siteSearch");
  const searchClear = $("searchClear");
  const searchStatus = $("searchStatus");
  const menuSearch = $("menuSearch");
  const articleCards = [...document.querySelectorAll(".article-card")];
  const emptySearch = $("emptySearch");

  function closeSearch() {
    if (!searchPanel) return;
    searchPanel.classList.remove("open");
    searchPanel.setAttribute("aria-hidden", "true");
    if (searchToggle) {
      searchToggle.setAttribute("aria-expanded", "false");
      searchToggle.setAttribute("aria-label", "Open search");
    }
  }

  function openSearch() {
    if (!searchPanel) return;
    searchPanel.classList.add("open");
    searchPanel.setAttribute("aria-hidden", "false");
    if (searchToggle) {
      searchToggle.setAttribute("aria-expanded", "true");
      searchToggle.setAttribute("aria-label", "Close search");
    }
    requestAnimationFrame(() => siteSearch && siteSearch.focus());
  }

  let filterFrame = 0;
  function filterArticles(query) {
    cancelAnimationFrame(filterFrame);
    filterFrame = requestAnimationFrame(() => {
      const q = query.trim().toLowerCase();
      let shown = 0;
      articleCards.forEach((card) => {
        const text = ((card.dataset.search || "") + " " + card.textContent).toLowerCase();
        const match = !q || text.includes(q);
        card.hidden = !match;
        if (match) shown++;
      });
      if (emptySearch) emptySearch.hidden = shown !== 0 || !q;
      if (searchStatus) searchStatus.textContent = q
        ? shown + " article" + (shown === 1 ? "" : "s") + " found."
        : "Search the latest solar guides and categories.";
    });
  }

  if (searchToggle) searchToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    searchPanel && searchPanel.classList.contains("open") ? closeSearch() : openSearch();
  });
  if (siteSearch) siteSearch.addEventListener("input", (event) => filterArticles(event.target.value));
  if (searchClear) searchClear.addEventListener("click", () => {
    if (!siteSearch) return;
    siteSearch.value = "";
    filterArticles("");
    siteSearch.focus();
  });

  if (menuSearch && siteMenu) {
    menuSearch.addEventListener("input", (event) => {
      const q = event.target.value.trim().toLowerCase();
      siteMenu.querySelectorAll(".menu-section a").forEach((link) => {
        link.hidden = !!q && !link.textContent.toLowerCase().includes(q);
      });
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeSearch();
    }
  });

  window.addEventListener("pageshow", () => {
    closeMenu();
    closeSearch();
  });

  // Latest Inverters section: injected without replacing the existing homepage content.
  const homeMain = document.querySelector("main#home");
  const latestSection = document.querySelector("#latest");
  if (homeMain && latestSection && !document.querySelector("#latest-inverters")) {
    const section = document.createElement("section");
    section.id = "latest-inverters";
    section.className = "section";
    section.innerHTML = `
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">LATEST INVERTERS</p>
            <h2>Solar Inverters: Brands & Models</h2>
          </div>
          <p>Browse inverter brands and models with specifications and USA price references.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px">
          <a href="/inverters.html#eg4" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;padding:22px;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)">
            <span class="tag">EG4</span><h3>EG4 6000XP</h3><p>6kW off-grid inverter · 48V · dual MPPT · 8kW PV input</p><strong style="color:#16834b">$1,449.99 USD reference</strong><p style="color:#16834b;font-weight:700">View EG4 models →</p>
          </a>
          <a href="/inverters.html#goodwe" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;padding:22px;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)">
            <span class="tag">GoodWe</span><h3>GoodWe ES Uniq</h3><p>ES Uniq hybrid inverter family with model-by-model specifications.</p><strong style="color:#16834b">USA price reference</strong><p style="color:#16834b;font-weight:700">View GoodWe models →</p>
          </a>
          <a href="/inverters.html#inverex" style="text-decoration:none;color:inherit;border:1px solid #e5eae7;border-radius:18px;padding:22px;background:#fff;box-shadow:0 8px 28px rgba(20,35,29,.05)">
            <span class="tag">Inverex</span><h3>Nitrox 10kW</h3><p>Nitrox hybrid inverter family with model and specification references.</p><strong style="color:#16834b">USA price reference</strong><p style="color:#16834b;font-weight:700">View Inverex models →</p>
          </a>
        </div>
        <div style="margin-top:18px"><a class="primary-btn" href="/inverters.html">Open Inverter Hub →</a></div>
      </div>`;
    latestSection.insertAdjacentElement("afterend", section);
  }

  calculate();
});
