/* ============================================================
   RISE 2026 — PENDIGITALAN DECK
   Self-contained: data + render functions + hub registration.
   Mirrors components.js conventions; no external deps required.
   ============================================================ */
(function () {
  "use strict";

  /* ---- Local helpers (mirrors components.js private scope) ---- */
  const el = (tag, cls, html) =>
    `<${tag}${cls ? ` class="${cls}"` : ""}>${html != null ? html : ""}</${tag}>`;
  const reveal = (i, html) =>
    `<div data-reveal style="--i:${i}">${html}</div>`;
  const sectionHead = (eyebrow, title, i) => {
    i = i || 0;
    return el("header", "section-head",
      (eyebrow ? reveal(i, el("span", "eyebrow", eyebrow)) : "") +
      reveal(i + 1, el("h2", "slide-title", title)) +
      reveal(i + 1, el("span", "gold-rule"))
    );
  };

  const LINK_IC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;flex-shrink:0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

  function featureList(items) {
    return el("div", "dig-features",
      items.map(function(f) {
        return '<div class="dig-feat"><span class="dig-feat-dot"></span><span class="dig-feat-text">' + f + '</span></div>';
      }).join("")
    );
  }

  function urlCard(url) {
    return el("div", "dig-url-card",
      el("div", "dig-url-label", "URL") +
      el("div", "dig-url-val", url) +
      '<a class="nih-link-btn" href="' + url + '" target="_blank" rel="noopener">' +
        '<span class="nih-link-ic">' + LINK_IC + '</span>' +
        '<span>Buka Pautan</span>' +
      '</a>'
    );
  }

  /* ----------------------------------------------------------------
     SLAID 1 — Pengenalan
  ---------------------------------------------------------------- */
  function renderSlide1() {
    var platforms = [
      { ic: "🌐", key: "Laman Web Rasmi", name: "Maklumat pembentangan, jadual, e-poster dan abstrak" },
      { ic: "🗳️", key: "Sistem e-Undi", name: "Pengundian dalam talian bagi Projek Inisiatif Penambahbaikan Kualiti" },
      { ic: "📋", key: "e-Penjurian", name: "Penilaian poster R&D secara digital oleh panel juri yang dilantik" }
    ];
    var cards = platforms.map(function(p, i) {
      return reveal(3 + i,
        el("article", "card cat-card",
          el("div", "dig-platform-ico", p.ic) +
          el("div", "cat-key", p.key) +
          el("div", "cat-name", p.name)
        )
      );
    }).join("");
    return sectionHead("Pendigitalan RISE 2026", "Pendigitalan Simposium RISE 2026") +
      reveal(2, el("p", "slide-sub", "Transformasi digital bagi meningkatkan akses maklumat, kecekapan pengurusan dan pengalaman peserta sepanjang RISE 2026.")) +
      el("div", "cat-grid", cards);
  }

  /* ----------------------------------------------------------------
     SLAID 2 — Laman Web
  ---------------------------------------------------------------- */
  function renderSlide2() {
    var feats = [
      "Maklumat pembentangan",
      "Jadual program",
      "E-Poster",
      "E-Abstrak",
      "Maklumat peserta"
    ];
    return sectionHead("Platform Digital", "Laman Web Rasmi RISE 2026") +
      reveal(2, el("div", "dig-two",
        el("div", "dig-left",
          el("p", "slide-sub", "Portal rasmi yang menyediakan semua maklumat berkaitan RISE 2026 dalam satu platform yang mudah diakses.") +
          featureList(feats)
        ) +
        urlCard("https://go.gov.my/ncpce2026")
      ));
  }

  /* ----------------------------------------------------------------
     SLAID 3 — Sistem e-Undi
  ---------------------------------------------------------------- */
  function renderSlide3() {
    var feats = [
      "Pengundian dalam talian",
      "Anugerah Pilihan RISE 2026",
      "Log masuk menggunakan akaun rasmi KKM",
      "Setiap peserta mengundi sekali sahaja"
    ];
    return sectionHead("Platform Digital", "Sistem e-Undi Projek Inisiatif Penambahbaikan Kualiti") +
      reveal(2, el("div", "dig-two",
        el("div", "dig-left",
          el("p", "slide-sub", "Platform pengundian dalam talian untuk memilih projek Inisiatif Penambahbaikan Kualiti terbaik dalam RISE 2026.") +
          featureList(feats)
        ) +
        urlCard("https://go.gov.my/UNDI-RISE2026")
      ));
  }

  /* ----------------------------------------------------------------
     SLAID 4 — e-Penjurian
  ---------------------------------------------------------------- */
  function renderSlide4() {
    var feats = [
      "Borang penjurian dalam talian",
      "Pemarkahan automatik",
      "Rekod keputusan secara masa nyata",
      "URL hanya diberikan kepada panel juri yang dilantik"
    ];
    return sectionHead("Platform Digital", "Borang e-Penjurian Poster R&D Penguatkuasaan Farmasi") +
      reveal(2, el("p", "slide-sub", "Penilaian dilaksanakan sepenuhnya secara digital oleh panel juri yang dilantik.")) +
      reveal(3, featureList(feats)) +
      reveal(4,
        '<div class="dig-restricted">' +
          '<span>&#128274;</span>' +
          '<span><strong>Akses Terhad</strong> — URL dan kelayakan log masuk hanya diberikan kepada panel juri yang dilantik oleh Jawatankuasa RISE 2026.</span>' +
        '</div>'
      );
  }

  /* ----------------------------------------------------------------
     SLAID 5 — Manfaat Pendigitalan
  ---------------------------------------------------------------- */
  function renderSlide5() {
    var benefits = [
      { ico: "📱", title: "Akses Mudah", desc: "Boleh diakses melalui telefon &amp; komputer" },
      { ico: "⚡", title: "Lebih Pantas", desc: "Pengurusan lebih pantas dan cekap" },
      { ico: "📄", title: "Tanpa Kertas", desc: "Tiada penggunaan borang bercetak" },
      { ico: "📊", title: "Data Sistematik", desc: "Pengumpulan data dan keputusan yang lebih sistematik" }
    ];
    var cards = benefits.map(function(b, i) {
      return reveal(2 + i,
        el("article", "card dig-benefit",
          el("div", "dig-benefit-ico", b.ico) +
          el("div", "dig-benefit-title", b.title) +
          el("div", "dig-benefit-desc", b.desc)
        )
      );
    }).join("");
    return sectionHead("Manfaat", "Manfaat Pendigitalan") +
      el("div", "dig-benefit-grid", cards) +
      reveal(6,
        el("div", "dig-summary",
          "Pendigitalan RISE 2026 memperkukuh pengurusan simposium melalui <b>penyampaian maklumat</b>, <b>pengundian</b> dan <b>penjurian</b> secara bersepadu dalam talian."
        )
      );
  }

  /* ---- Register deck ---- */
  window.RISE_DECKS = window.RISE_DECKS || {};
  window.RISE_DECKS["digital"] = {
    id:       "digital",
    title:    "Pendigitalan Simposium RISE",
    subtitle: "Transformasi digital RISE 2026",
    meta:     { event: "RISE 2026" },
    slides: [
      { key: "digital-1", render: renderSlide1 },
      { key: "digital-2", render: renderSlide2 },
      { key: "digital-3", render: renderSlide3 },
      { key: "digital-4", render: renderSlide4 },
      { key: "digital-5", render: renderSlide5 }
    ]
  };
})();
