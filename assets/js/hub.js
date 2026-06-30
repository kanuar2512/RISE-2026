/* ============================================================
   RISE FRAMEWORK — HUB
   Lists every deck registered in window.RISE_DECKS as a card.
   Add a deck = add its data file; it appears here automatically.
   ============================================================ */
(function () {
  "use strict";
  const reg = window.RISE_DECKS || {};
  const grid = document.getElementById("hubGrid");
  if (!grid) { return; }

  const ids = Object.keys(reg);
  if (!ids.length) {
    grid.innerHTML = '<p class="hub-empty">Tiada deck didaftarkan.</p>';
    return;
  }

  ids.forEach((id) => {
    const d = reg[id];
    const count = (d.slides || []).length;
    const card = document.createElement("a");
    card.className = "hub-card";
    card.href = d.externalUrl || ("present.html?deck=" + encodeURIComponent(id));
    if (d.externalUrl) { card.target = "_blank"; card.rel = "noopener"; }
    const countLabel = d.externalUrl ? "Panduan Interaktif" : (count + " slaid");
    card.innerHTML =
      '<span class="hub-eyebrow">' + ((d.meta && d.meta.event) || "RISE 2026") + "</span>" +
      '<h2 class="hub-title">' + (d.title || id) + "</h2>" +
      '<p class="hub-sub">' + (d.subtitle || "") + "</p>" +
      '<div class="hub-foot"><span class="hub-count">' + countLabel + "</span>" +
      '<span class="hub-go">Buka &rarr;</span></div>';
    grid.appendChild(card);
  });
})();
