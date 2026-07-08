/* ============================================================
   RISE FRAMEWORK — HUB
   Renders decks from window.RISE_DECKS as cards, grouped into
   sections defined by window.RISE_HUB_SECTIONS.
   Falls back to flat grid if no sections config is present.
   ============================================================ */
(function () {
  "use strict";
  const reg = window.RISE_DECKS || {};
  const container = document.getElementById("hubGrid");
  if (!container) { return; }

  /* ---- build a single card element ---- */
  function makeCard(d) {
    const count = (d.slides || []).length;
    const card = document.createElement("a");
    card.className = "hub-card";
    card.href = d.externalUrl || ("present.html?deck=" + encodeURIComponent(d.id));
    const countLabel = d.externalUrl ? "Panduan Interaktif" : (count + " slaid");
    const lockBadge = d.locked ? '<span class="hub-lock">&#128274; Dikunci</span>' : "";
    card.innerHTML =
      '<span class="hub-eyebrow">' + ((d.meta && d.meta.event) || "RISE 2026") + "</span>" +
      '<h2 class="hub-title">' + (d.title || d.id) + "</h2>" +
      '<p class="hub-sub">' + (d.subtitle || "") + "</p>" +
      '<div class="hub-foot"><span class="hub-count">' + countLabel + "</span>" +
      lockBadge +
      '<span class="hub-go">Buka &rarr;</span></div>';
    return card;
  }

  const sections = window.RISE_HUB_SECTIONS;

  if (sections && sections.length) {
    /* ---- sectioned layout ---- */
    const rendered = new Set();

    sections.forEach(function (sec) {
      const decksInSection = (sec.decks || []).filter(function (id) { return reg[id]; });
      if (!decksInSection.length) { return; }

      const section = document.createElement("section");
      section.className = "hub-section";

      /* section heading */
      const hWrap = document.createElement("div");
      hWrap.className = "hub-section-head";
      const h3 = document.createElement("h3");
      h3.className = "hub-section-label";
      h3.textContent = sec.heading;
      hWrap.appendChild(h3);
      section.appendChild(hWrap);

      /* card grid */
      const grid = document.createElement("div");
      grid.className = "hub-section-grid";

      decksInSection.forEach(function (id) {
        grid.appendChild(makeCard(reg[id]));
        rendered.add(id);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });

    /* any deck not covered by sections — append ungrouped */
    Object.keys(reg).forEach(function (id) {
      if (!rendered.has(id)) { container.appendChild(makeCard(reg[id])); }
    });

  } else {
    /* ---- flat fallback ---- */
    const ids = Object.keys(reg);
    if (!ids.length) {
      container.innerHTML = '<p class="hub-empty">Tiada deck didaftarkan.</p>';
      return;
    }
    ids.forEach(function (id) { container.appendChild(makeCard(reg[id])); });
  }
})();
