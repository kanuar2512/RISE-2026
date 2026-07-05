/* ============================================================
   RISE 2026 — REUSABLE UI COMPONENTS
   ------------------------------------------------------------
   Pure render functions. Each returns an HTML string built
   from data in window.RISE. No content is hardcoded here; only
   structure, layout and presentation logic live in this file.
   New slides can be added by composing these primitives.
   ============================================================ */
(function (RISE) {
  "use strict";

  /* ---------- small helpers ---------- */
  const el = (tag, cls, html) =>
    `<${tag}${cls ? ` class="${cls}"` : ""}>${html != null ? html : ""}</${tag}>`;

  // reveal wrapper: staggered entrance via CSS custom prop --i
  const reveal = (i, html) => `<div data-reveal style="--i:${i}">${html}</div>`;

  const sectionHead = (eyebrow, title, i = 0) =>
    el("header", "section-head",
      (eyebrow ? reveal(i, el("span", "eyebrow", eyebrow)) : "") +
      reveal(i + 1, el("h2", "slide-title", title)) +
      reveal(i + 1, el("span", "gold-rule"))
    );

  // colour interpolation cream -> maroon for choropleth
  function shade(t) {
    const a = [243, 225, 176], b = [128, 0, 0]; // #f3e1b0 -> #800000
    const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  const C = {};

  /* ============================================================
     SLIDE 1 — HERO
     ============================================================ */
  C.hero = function (d) {
    const logos = (d.logos || []).map((l) =>
      `<img class="hero-logo hero-logo--${l.pos || "left"}" src="${l.src}" alt="${l.alt}" />`
    ).join("");

    // Logos pinned to top corners; message centred below.
    return logos + el("div", "hero-cover",
      reveal(1, el("h1", "display-xl", d.title)) +
      reveal(2, el("p", "slide-sub", d.subtitle)) +
      reveal(3,
        el("div", "hero-conf",
          el("small", "", d.partOfLabel) + el("b", "", d.partOf)
        )
      )
    );
  };

  /* ============================================================
     SLIDE 2 — EVENT INFORMATION (Maklumat Simposium)
     ============================================================ */
  C.eventInfo = function (d) {
    const cards = d.cards.map((c, i) =>
      reveal(2 + i,
        el("article", "card event-card",
          el("div", "ev-label", c.label) +
          el("div", "ev-value", c.value.replace(/\n/g, "<br>"))
        )
      )
    ).join("");

    const feature = reveal(5,
      el("div", "event-feature",
        el("div", "ev-label", d.theme.label) +
        el("div", "ev-theme", d.theme.value)
      )
    );

    return sectionHead(d.eyebrow, d.title) +
      el("div", "event-grid", cards) +
      feature;
  };

  /* ============================================================
     SLIDE 2 — KPI STATISTICS
     ============================================================ */
  // Inline icon set (stroke = currentColor) for the KPI dashboard.
  const ICONS = {
    presentation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18"/><rect x="4" y="4" width="16" height="11" rx="1"/><path d="M12 15v4"/><path d="M9 21l3-2 3 2"/></svg>`,
    people: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"/><path d="M16 3.4a3 3 0 0 1 0 5.8"/><path d="M18 14.2c2 .5 3.5 2 3.5 4.3"/></svg>`,
    research: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v6.5L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.5V3"/><path d="M7.3 14.5h9.4"/></svg>`,
    quality: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16.5l5.5-5.5 3.5 3.5L21 5.5"/><path d="M21 10.5v-5h-5"/></svg>`
  };

  C.statistics = function (d) {
    const kpis = d.kpis.map((k, i) =>
      reveal(2 + i,
        el("article", "card kpi",
          el("div", "kpi-top",
            el("span", "kpi-ic", ICONS[k.icon] || "") +
            el("div", "num", `<span data-count="${k.value}">0</span>`)) +
          el("div", "kpi-label", k.label) +
          (k.sub ? el("span", "kpi-sub", k.sub) : "")
        )
      )
    ).join("");

    return sectionHead(d.eyebrow, d.title) + el("div", "kpi-grid", kpis);
  };

  /* ============================================================
     SLIDE 3 — CATEGORY INTRODUCTION (names only, style A)
     ============================================================ */
  C.categoryIntro = function (d) {
    const cards = d.items.map((it, i) =>
      reveal(2 + i,
        `<article class="card cat-card" style="--cat:${it.color}">` +
          el("div", "cat-top",
            el("span", "cat-no", it.no) +
            el("span", "cat-ic", ICONS[it.icon] || "")) +
          el("div", "cat-key", it.key) +
          el("div", "cat-name", it.name) +
        `</article>`
      )
    ).join("");

    return sectionHead(d.eyebrow, d.title) + el("div", "cat-grid", cards);
  };

  /* ============================================================
     DONUT (reusable component — retained for future use)
     ============================================================ */
  C.categories = function (d) {
    const total = d.items.reduce((s, x) => s + x.value, 0);
    const r = 120, cx = 150, cy = 150, circ = 2 * Math.PI * r;
    let offset = 0;
    const segs = d.items.map((it) => {
      const frac = it.value / total;
      const dash = frac * circ;
      const seg = `<circle class="donut-seg" cx="${cx}" cy="${cy}" r="${r}"
        fill="none" stroke="${it.color}" stroke-width="46"
        stroke-dasharray="0 ${circ}"
        data-dash="${dash}" data-gap="${circ - dash}"
        data-offset="${-offset}" stroke-dashoffset="0"></circle>`;
      offset += dash;
      return seg;
    }).join("");

    const donut = `<svg class="donut" viewBox="0 0 300 300" width="100%" style="max-width:380px">
        ${segs}
        <g transform="rotate(90 150 150)">
          <text class="donut-center" x="150" y="146" text-anchor="middle"
            font-size="64" fill="#800000">${total}</text>
          <text x="150" y="178" text-anchor="middle" font-size="15"
            fill="#6b5f4d" font-family="Poppins">Pembentangan</text>
        </g>
      </svg>`;

    const legend = d.items.map((it) => {
      const pct = Math.round((it.value / total) * 100);
      return el("div", "legend-item",
        `<span class="swatch" style="background:${it.color}"></span>` +
        el("div", "",
          el("div", "k", `${it.key} · ${pct}%`) +
          el("div", "d", it.desc)) +
        el("div", "v", it.value)
      );
    }).join("");

    return sectionHead(d.eyebrow, d.title) +
      el("div", "split",
        reveal(2, el("div", "donut-wrap", donut)) +
        el("div", "",
          reveal(3, el("div", "legend", legend)) +
          reveal(4, el("div", "summary-pill", d.summary))
        )
      );
  };

  /* ============================================================
     SLIDE 5 — MALAYSIA CHOROPLETH MAP (states)
     Geometry (real state shapes, projected) lives in geo-malaysia.js;
     values come from data. Numbers shown on every state.
     ============================================================ */
  // Label column assignment (layout). Left/right gutters + a centre
  // sea-channel for east-coast Peninsular states — keeps leader lines short.
  const MAP_ZONES = {
    left:   ["PLS", "KDH", "PNG", "PRK", "SGR", "KUL", "NSN", "MLK"],
    center: ["KTN", "TRG", "PHG", "JHR"],
    right:  ["SWK", "SBH", "LBN"]
  };
  const MAP_SHORT = { KUL: "KL & Putrajaya", LBN: "Labuan" };

  C.states = function (d) {
    const geo = window.RISE_GEO || { viewBox: "0 0 100 100", regions: [] };
    const vb = geo.viewBox.split(/\s+/).map(Number);
    const mapW = vb[2], mapH = vb[3];
    const byId = {};
    d.data.forEach((s) => { byId[s.id] = s; });
    const cen = {};
    geo.regions.forEach((r) => { if (!(r.id in cen)) { cen[r.id] = { cx: r.cx, cy: r.cy }; } });
    const max = Math.max.apply(null, d.data.filter((s) => s.id !== "BPF").map((s) => s.value));

    // choropleth fills (numbers now live in external labels)
    const paths = geo.regions.map((r) => {
      const s = byId[r.id];
      const v = s ? s.value : 0;
      const t = max > 0 ? v / max : 0;
      return `<path class="mstate" d="${r.d}" fill="${shade(t)}" ` +
             `data-name="${s ? s.name : r.name}" data-value="${v}"></path>`;
    }).join("");

    // gutter geometry
    const GL = 300, GR = 280, PADT = 18, PADB = 18, CENTERX = 360;
    const top = 10, bot = mapH - 10;
    const rowYs = (n) => n <= 1 ? [(top + bot) / 2]
      : Array.from({ length: n }, (_, i) => Math.round(top + i * (bot - top) / (n - 1)));
    const dotCol = (v) => (max > 0 && v / max > 0.5) ? "#5e0000" : "#C77B30";

    function zone(ids, side) {
      const items = ids.filter((id) => cen[id] && byId[id])
        .map((id) => ({ id, cy: cen[id].cy })).sort((a, b) => a.cy - b.cy);
      const ys = rowYs(items.length);
      let leads = "", labels = "";
      items.forEach((it, i) => {
        const s = byId[it.id], c = cen[it.id], ry = ys[i];
        const nm = MAP_SHORT[it.id] || s.name, v = s.value;
        let lx, anchor, txt, ox;
        if (side === "left") {
          lx = -16; anchor = "end"; ox = lx + 6;
          txt = `<tspan>${nm}</tspan><tspan dx="14" class="mnum">${v}</tspan>`;
        } else if (side === "right") {
          lx = mapW + 16; anchor = "start"; ox = lx - 6;
          txt = `<tspan class="mnum">${v}</tspan><tspan dx="14">${nm}</tspan>`;
        } else {
          lx = CENTERX; anchor = "start"; ox = lx - 6;
          txt = `<tspan class="mnum">${v}</tspan><tspan dx="14">${nm}</tspan>`;
        }
        leads += `<polyline class="mlead" points="${ox},${ry} ${c.cx},${c.cy}"></polyline>` +
                 `<circle class="mdot" cx="${c.cx}" cy="${c.cy}" r="5" fill="${dotCol(v)}"></circle>`;
        labels += `<text class="mlabel" x="${lx}" y="${ry}" text-anchor="${anchor}">${txt}</text>`;
      });
      return leads + labels;
    }

    const annot = zone(MAP_ZONES.left, "left") + zone(MAP_ZONES.center, "center") + zone(MAP_ZONES.right, "right");
    const viewBox = `${-GL} ${-PADT} ${GL + mapW + GR} ${mapH + PADT + PADB}`;
    const svg = `<svg class="cmap" width="100%" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet"
        role="img" aria-label="Peta penyertaan mengikut negeri">${paths}${annot}</svg>`;

    const bpf = byId.BPF;
    const legend = el("div", "map-legend",
      `<div class="scale"><span>1</span><span class="scale-bar"></span><span>${max}</span></div>` +
      (bpf ? `<div class="bpf-note"><span class="dot"></span>${bpf.name} · <b>${bpf.value}</b></div>` : "")
    );

    return sectionHead(d.eyebrow, d.title) +
      el("div", "map-stage",
        reveal(2, `<div class="map-holder">${svg}<div class="map-tooltip" id="mapTip"></div></div>`) +
        reveal(3, legend)
      );
  };

  /* ============================================================
     SLIDE 5 — HORIZONTAL BARS (fields)
     ============================================================ */
  C.fields = function (d) {
    const max = Math.max(...d.data.map((x) => x.value));
    const rows = d.data.map((x, i) =>
      reveal(2 + i,
        el("div", "bar-row",
          el("div", "label", x.label) +
          `<div class="bar-track"><div class="bar-fill" data-w="${(x.value / max) * 100}"></div></div>` +
          el("div", "val", `<span data-count="${x.value}">0</span>`)
        )
      )
    ).join("");
    return sectionHead(d.eyebrow, d.title) + el("div", "bars", rows);
  };

  /* ============================================================
     SLIDE 6 — TIMELINE + CALLOUT
     ============================================================ */
  C.timeline = function (d) {
    const items = d.items.map((it, idx) => {
      const chips = it.chips.map((c) =>
        el("div", "tl-chip",
          el("span", "c-num", c.num) + el("span", "c-txt", c.text))
      ).join("");
      return el("div", "tl-item",
        `<span class="tl-dot"></span>` +
        el("div", "tl-date", it.date) +
        el("div", "tl-time", it.time) +
        el("div", "tl-title", it.title) +
        el("div", "tl-items", chips)
      );
    }).join("");

    const callIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="#FACE5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 9v4"/><path d="M12 17h.01"/>
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>`;

    return sectionHead(d.eyebrow, d.title) +
      el("div", "timeline-layout",
        reveal(2, el("div", "tl", items)) +
        reveal(3,
          el("div", "callout",
            el("div", "ic", callIcon) +
            el("div", "ttl", d.callout.title) +
            el("p", "", d.callout.text)
          )
        )
      );
  };

  /* ============================================================
     SLIDE 7 — PUBLICATIONS
     ============================================================ */
  C.publications = function (d) {
    const cards = d.cards.map((c, i) => {
      const meta = c.meta.map((m) =>
        el("div", "m", el("span", "", m.k) + el("span", "", m.v))
      ).join("");
      return reveal(2 + i,
        el("article", "card pub-card",
          `<span class="spine"></span>` +
          el("span", "pub-badge", c.badge) +
          el("h3", "pub-title", c.title) +
          el("div", "pub-meta", meta) +
          el("div", "pub-count",
            `<span class="n"><span data-count="${c.count}">0</span></span>` +
            el("span", "t", c.countLabel))
        )
      );
    }).join("");

    return sectionHead(d.eyebrow, d.title) +
      el("div", "pub-layout", cards);
  };


  /* ============================================================
     SLIDE 8 — NIH APPROVAL
     ============================================================ */
  const NIH_SHIELD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
  const NIH_LINK   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  C.nihApproval = function (d) {
    const L = d.letter;

    const statsHtml = d.stats.map((s, i) =>
      reveal(4 + i,
        el("div", "nih-stat",
          el("div", "nih-stat-val",
            s.raw ? s.value : `<span data-count="${s.value}">0</span>`
          ) +
          el("div", "nih-stat-label", s.label)
        )
      )
    ).join("");

    const linkBtn = d.letterUrl
      ? reveal(6,
          `<a class="nih-link-btn" href="${d.letterUrl}" target="_blank" rel="noopener">` +
          el("span", "nih-link-ic", NIH_LINK) +
          el("span", "", "Muat Turun Surat") +
          `</a>`)
      : "";

    const letterCard = reveal(2,
      el("div", "card nih-letter",
        el("div", "nih-letter-header",
          el("div", "nih-from", L.from) +
          el("div", "nih-meta-row",
            el("span", "nih-ref", `Ruj: ${L.ref}`) +
            el("span", "nih-date", L.date)
          )
        ) +
        el("div", "nih-subject", L.subject) +
        el("div", "nih-signatory",
          el("div", "nih-sig-name", L.signatory.name) +
          el("div", "nih-sig-role", L.signatory.role)
        )
      )
    );

    const badgePanel =
      el("div", "nih-stats", statsHtml) +
      linkBtn;

    return sectionHead(d.eyebrow, d.title) +
      el("div", "nih-layout",
        letterCard +
        el("div", "nih-right", badgePanel)
      );
  };

  /* ============================================================
     PENJURIAN DECK COMPONENTS (shared library, Cara B)
     Reusable across decks; driven entirely by data.
     ============================================================ */
  const PICON = {
    list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/></svg>`,
    award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="5"/><path d="M8.7 12.6 7 22l5-3 5 3-1.7-9.4"/></svg>`,
    poster: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>`,
    panel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="9" r="2.4"/><circle cx="17" cy="9" r="2.4"/><circle cx="12" cy="7.5" r="2.6"/><path d="M3 19c0-2.4 2-4 4-4 1 0 1.9.3 2.6.9"/><path d="M21 19c0-2.4-2-4-4-4-1 0-1.9.3-2.6.9"/><path d="M7.5 19c0-2.7 2-4.5 4.5-4.5s4.5 1.8 4.5 4.5"/></svg>`,
    flag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4"/><path d="M5 4h11l-1.5 3.5L16 11H5"/></svg>`,
    frame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="1.5"/><rect x="8" y="8" width="8" height="8" rx="0.5"/></svg>`,
    save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>`,
    target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>`,
    network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M6.8 7.2 10.4 16M17.2 7.2 13.6 16M7 6h10"/></svg>`
  };
  const picon = (n) => PICON[n] || ICONS[n] || "";

  /* ---- Section divider (maroon heading slide) ---- */
  C.divider = function (d) {
    return el("div", "hero-cover divider",
      reveal(0, el("span", "eyebrow", d.eyebrow || "")) +
      reveal(1, el("h1", "display-xl", d.title)) +
      (d.subtitle ? reveal(2, el("p", "slide-sub", d.subtitle)) : "") +
      (d.partOf ? reveal(3, el("div", "divider-aud", (d.partOfLabel ? d.partOfLabel + " · " : "") + d.partOf)) : "")
    );
  };

  /* ---- Workflow — serpentine grid; down link joins step 3 → step 4 ---- */
  C.workflow = function (d) {
    const half = Math.ceil(d.steps.length / 2);
    const cols = 2 * half - 1;
    const tmpl = Array.from({ length: cols }, (_, c) => c % 2 === 0 ? "minmax(120px, 1fr)" : "auto").join(" ");
    const node = (s, i) => el("div", "wf-node",
      el("span", "wf-no", String(i + 1).padStart(2, "0")) + el("div", "wf-label", s.label));
    const cell = (i, col, row, html) =>
      `<div data-reveal class="wf-cell" style="--i:${i};grid-row:${row};grid-column:${col}">${html}</div>`;
    const arrow = (col, row, g) => `<div class="wf-arrow" style="grid-row:${row};grid-column:${col}" aria-hidden="true">${g}</div>`;

    let cells = "";
    // top row: left → right
    d.steps.slice(0, half).forEach((s, j) => {
      cells += cell(2 + j, 2 * j + 1, 1, node(s, j));
      if (j < half - 1) { cells += arrow(2 * j + 2, 1, "&rarr;"); }
    });
    // down connector in the last column (step 3 → step 4)
    cells += `<div data-reveal class="wf-down" style="--i:${2 + half};grid-row:2;grid-column:${cols}" aria-hidden="true">&darr;</div>`;
    // bottom row: laid out right → left so step 4 sits directly under step 3
    const row2 = d.steps.slice(half).map((s, j) => ({ s, i: half + j }));
    row2.slice().reverse().forEach((it, k, a) => {
      cells += cell(2 + it.i, 2 * k + 1, 3, node(it.s, it.i));
      if (k < a.length - 1) { cells += arrow(2 * k + 2, 3, "&larr;"); }
    });

    return sectionHead(d.eyebrow, d.title) +
      `<div class="wf-grid" style="grid-template-columns:${tmpl}">${cells}</div>`;
  };

  /* ---- Assessment structure (70 / 30 + total) ---- */
  C.structure = function (d) {
    const cards = d.parts.map((p, i) =>
      reveal(2 + i, `<article class="card struct-card" style="--accent:${p.color}">` +
        el("div", "struct-pct", `${p.pct}<span>%</span>`) +
        el("div", "struct-name", p.name) +
        (p.sub ? el("div", "struct-sub", p.sub) : "") +
      `</article>`)
    ).join("");
    return sectionHead(d.eyebrow, d.title) +
      el("div", "struct-grid", cards);
  };

  /* ---- Scoring scale + how marks are calculated ---- */
  C.scoringScale = function (d) {
    const n = d.scale.length;
    const chips = d.scale.map((s, i) => {
      const t = n > 1 ? i / (n - 1) : 1;
      const fg = t > 0.5 ? "#FFFFFF" : "#5e0000";
      return reveal(2 + i, `<div class="scale-chip" style="--fill:${shade(t)};--fg:${fg}">` +
        el("span", "sc-n", s.n) + el("span", "sc-l", s.label) + `</div>`);
    }).join("");

    const formula = reveal(2 + n, el("div", "formula",
      `<span class="fx-term fx-score">Skor <small>(1–5)</small></span>` +
      `<span class="fx-op">&times;</span>` +
      `<span class="fx-term fx-weight">Pemberat</span>` +
      `<span class="fx-op">=</span>` +
      `<span class="fx-term fx-marks">Markah</span>`));

    const ex = d.examples.map((e, i) =>
      reveal(3 + n + i, el("div", "fx-example",
        el("span", "fxe-crit", e.criterion) +
        `<span class="fxe-calc">Skor ${e.score} &times; Pemberat ${e.weight} = <b>${e.marks} markah</b></span>`))
    ).join("");

    return sectionHead(d.eyebrow, d.title) +
      el("div", "scale-row", chips) +
      formula +
      el("div", "fx-examples", ex) +
      (d.note ? reveal(5 + n + d.examples.length, el("div", "wf-note", el("span", "gold-rule") + el("span", "", d.note))) : "");
  };

  /* ---- Criterion cards (Technical / Presentation) — reusable ---- */
  C.criteriaCards = function (d) {
    const accent = d.accent || "#800000";
    const cards = d.items.map((it, i) =>
      reveal(2 + i, `<article class="card crit-card" style="--accent:${accent}">` +
        el("div", "crit-top",
          el("span", "crit-marks", `<b>${it.max}</b> markah`) +
          el("span", "crit-weight", `×${it.weight}`)) +
        el("h3", "crit-name", it.name) +
        el("p", "crit-desc", it.desc) +
      `</article>`)
    ).join("");
    return sectionHead(d.eyebrow, d.title) +
      (d.intro ? reveal(1, el("p", "slide-sub", d.intro)) : "") +
      el("div", "crit-grid cols-" + (d.cols || 4), cards);
  };

  /* ---- Weight ranking (marks contribution) ---- */
  C.weightRanking = function (d) {
    const tierColor = (m) => m >= 15 ? "#800000" : (m >= 10 ? "#C77B30" : "#C9952B");
    const items = [...d.items].sort((a, b) => b.marks - a.marks);
    const maxM = Math.max(...items.map((x) => x.marks));
    const rows = items.map((it, i) =>
      reveal(2 + i,
        el("div", "rank-row" + (it.marks >= maxM ? " is-top" : ""),
          el("div", "rank-name", it.name) +
          `<div class="rank-track"><div class="bar-fill rank-fill" style="--accent:${tierColor(it.marks)}" data-w="${(it.marks / maxM) * 100}"></div></div>` +
          el("div", "rank-val", it.marks)
        )
      )
    ).join("");
    return sectionHead(d.eyebrow, d.title) +
      el("div", "rank-list", rows) +
      (d.note ? reveal(2 + items.length + 1, el("div", "wf-note", el("span", "gold-rule") + el("span", "", d.note))) : "");
  };

  /* ---- Executive rubric dashboard ---- */
  C.rubricDashboard = function (d) {
    const cards = d.kpis.map((k, i) => {
      const num = /^[0-9]+$/.test(k.value) ? `<span data-count="${k.value}">0</span>` : k.value;
      return reveal(2 + i, el("article", "card dash-card",
        el("span", "dash-ic", picon(k.icon)) +
        el("div", "dash-num", num) +
        el("div", "dash-label", k.label)));
    }).join("");
    return sectionHead(d.eyebrow, d.title) +
      el("div", "dash-grid", cards) +
      (d.message ? reveal(8, el("div", "dash-msg", el("span", "gold-rule") + el("span", "", d.message))) : "");
  };

  /* ============================================================
     LAYOUT & TEMPLATE DECK COMPONENTS (shared library)
     ============================================================ */

  /* ---- Cover with full-bleed background image ---- */
  C.imageCover = function (d) {
    return `<img class="cover-bg" src="${d.bg}" alt="" aria-hidden="true">` +
      `<div class="cover-scrim"></div>` +
      el("div", "hero-cover cover-content",
        reveal(0, el("span", "eyebrow", d.eyebrow || "")) +
        reveal(1, el("h1", "display-xl", d.title)) +
        (d.subtitle ? reveal(2, el("p", "slide-sub", d.subtitle)) : "")
      );
  };

  /* ---- Figure cards (image + caption) ---- */
  C.imageCards = function (d) {
    const cards = d.items.map((it, i) =>
      reveal(2 + i, el("figure", "img-card",
        `<div class="img-wrap"><img src="${it.src}" alt="${it.title}"></div>` +
        el("figcaption", "img-cap",
          el("strong", "", it.title) + (it.caption ? el("span", "", it.caption) : ""))
      ))
    ).join("");
    return sectionHead(d.eyebrow, d.title) +
      (d.intro ? reveal(1, el("p", "slide-sub", d.intro)) : "") +
      el("div", "img-grid cols-" + (d.cols || 2), cards);
  };

  /* ---- Split media (image + spec list) ---- */
  C.splitMedia = function (d) {
    const specs = (d.specs || []).map((s, i) =>
      reveal(3 + i, el("div", "spec-item",
        el("span", "spec-ic", picon(s.icon)) +
        el("div", "", el("div", "spec-k", s.k) + el("div", "spec-v", s.v))))
    ).join("");
    return sectionHead(d.eyebrow, d.title) +
      el("div", "split-media",
        reveal(2, `<figure class="sm-fig"><img src="${d.image}" alt="${d.title}"></figure>`) +
        el("div", "sm-body", specs)
      );
  };

  /* ---- Spec list (label → value rows) ---- */
  C.specList = function (d) {
    const rows = d.items.map((it, i) =>
      reveal(2 + i, el("div", "sl-row",
        el("span", "sl-k", it.k) + el("span", "sl-v", it.v)))
    ).join("");
    return sectionHead(d.eyebrow, d.title) +
      (d.intro ? reveal(1, el("p", "slide-sub", d.intro)) : "") +
      el("div", "sl-list", rows);
  };

  /* ---- Single full-width image slide ---- */
  C.imageSolo = function (d) {
    return sectionHead(d.eyebrow, d.title) +
      (d.intro ? reveal(1, el("p", "slide-sub", d.intro)) : "") +
      el("div", "solo-wrap",
        reveal(2, `<figure class="solo-fig"><img src="${d.image}" alt="${d.title}"></figure>`) +
        (d.caption ? reveal(3, el("p", "solo-cap", d.caption)) : "")
      );
  };

  /* ---- Template image only + download button ---- */
  C.posterTemplateOnly = function (d) {
    return sectionHead(d.eyebrow, d.title) +
      el("div", "tpl-only",
        reveal(2, `<figure class="tpl-fig"><img src="${d.image}" alt="${d.title}"></figure>`) +
        (d.download ? reveal(3, `<a class="tpl-dl" href="${d.download}" target="_blank" rel="noopener">${d.downloadLabel || "Muat turun templat"} &rarr;</a>`) : "")
      );
  };

  /* ---- Chips + note ---- */
  C.chipsNote = function (d) {
    const chips = d.chips.map((c, i) => reveal(2 + i, el("span", "sec-chip", c))).join("");
    return sectionHead(d.eyebrow, d.title) +
      (d.intro ? reveal(1, el("p", "slide-sub", d.intro)) : "") +
      el("div", "sec-chips", chips) +
      (d.note ? reveal(2 + d.chips.length + 1, el("div", "wf-note", el("span", "gold-rule") + el("span", "", d.note))) : "");
  };

  /* ============================================================
     RESEARCH LANDSCAPE DECK COMPONENTS (bibliometric infographics)
     All render dynamically from the `research` data object.
     ============================================================ */
  const PALETTE = ["#800000", "#C77B30", "#E0B43C", "#6B4E2E", "#A33A52", "#9c4a2f"];
  // single-hue maroon ramp: light (low value) -> deep (high value)
  function maroonRamp(t) {
    const a = [214, 150, 150], b = [94, 0, 0];
    const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  // --- slice-and-dice treemap (2 balanced rows) ---
  function treemapTiles(items) {
    const sorted = [...items].sort((a, b) => b.value - a.value);
    const total = sorted.reduce((s, x) => s + x.value, 0);
    const half = total / 2;
    let row1 = [], s1 = 0;
    for (const it of sorted) { if (s1 < half) { row1.push(it); s1 += it.value; } else { break; } }
    let row2 = sorted.slice(row1.length);
    if (!row2.length) { row2 = [row1.pop()]; }
    s1 = row1.reduce((s, x) => s + x.value, 0);
    const s2 = total - s1;
    const mk = (arr) => arr.map((it) =>
      `<div class="tm-tile" style="flex-grow:${it.value};--c:${it.color || "#800000"}">` +
      `<span class="tm-v">${it.value}</span><span class="tm-l">${it.label}</span></div>`).join("");
    return `<div class="tm"><div class="tm-row" style="flex-grow:${s1}">${mk(row1)}</div>` +
      `<div class="tm-row" style="flex-grow:${s2}">${mk(row2)}</div></div>`;
  }

  // --- donut (reuses .donut-seg animation) ---
  function donutSvg(items, sub) {
    const total = items.reduce((s, x) => s + x.value, 0);
    const r = 80, cx = 100, cy = 100, circ = 2 * Math.PI * r;
    let off = 0;
    const segs = items.map((it) => {
      const dash = it.value / total * circ;
      const s = `<circle class="donut-seg" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${it.color}" stroke-width="28" stroke-dasharray="0 ${circ}" data-dash="${dash}" data-gap="${circ - dash}" data-offset="${-off}"></circle>`;
      off += dash; return s;
    }).join("");
    return `<svg class="donut" viewBox="0 0 200 200">${segs}<g transform="rotate(90 100 100)">` +
      `<text x="100" y="95" text-anchor="middle" font-size="42" fill="#800000" font-family="var(--font-display)">${total}</text>` +
      `<text x="100" y="120" text-anchor="middle" font-size="11" fill="#6b5f4d" font-family="var(--font-body)">${sub || ""}</text></g></svg>`;
  }
  function legendList(items) {
    return `<div class="d-leg">` + items.map((it) =>
      `<div class="d-leg-i"><span class="d-sw" style="background:${it.color}"></span>${it.label} <b>${it.value}</b></div>`).join("") + `</div>`;
  }
  function miniBars(items) {
    const vals = items.map((x) => x.value);
    const max = Math.max(...vals), min = Math.min(...vals);
    return items.map((x) => {
      const t = max === min ? 1 : (x.value - min) / (max - min); // normalise for clear light->dark
      const w = (x.value / max * 100).toFixed(1);
      return `<div class="pbar"><span class="pbar-l">${x.label}</span>` +
        `<span class="pbar-t"><span class="bar-fill" data-w="${w}" style="width:${w}%;--accent:${maroonRamp(t)}"></span></span>` +
        `<span class="pbar-v">${x.value}</span></div>`;
    }).join("");
  }

  /* ---- Slide 2: research profile board ---- */
  C.profileBoard = function (d) {
    return sectionHead(d.eyebrow, d.title) +
      el("div", "pb-grid",
        reveal(2, el("article", "card pb-panel", el("div", "pb-head", "Research Themes") + treemapTiles(d.themes))) +
        reveal(3, el("article", "card pb-panel", el("div", "pb-head", "Study Design") +
          el("div", "pb-donut", donutSvg(d.design, "studies") + legendList(d.design)))) +
        reveal(4, el("article", "card pb-panel", el("div", "pb-head", "Study Population") + el("div", "pb-bars", miniBars(d.population)))) +
        reveal(5, el("article", "card pb-panel", el("div", "pb-head", "Enforcement Focus") + el("div", "pb-bars", miniBars(d.enforcement))))
      );
  };

  /* ---- Slide 3: keyword bubble chart + tag chips ---- */
  C.bubbleChart = function (d) {
    const max = d.max;
    // every keyword as a bubble: size + darkness scale with frequency
    const bubbles = d.top.map((t, i) => {
      const tt = t.freq / max;
      const dia = Math.round(62 + tt * 116);
      const fg = tt > 0.42 ? "#FFFFFF" : "#5e0000";
      return reveal(2 + i, `<div class="bub" style="--d:${dia}px;--bg:${maroonRamp(tt)};--fg:${fg}">` +
        `<span class="bub-c"><span class="bub-n">${t.freq}</span></span><span class="bub-l">${t.label}</span></div>`);
    }).join("");
    return sectionHead(d.eyebrow, d.title) + el("div", "bub-field", bubbles);
  };

  /* ---- Slide 4: keyword co-occurrence network (full width) ---- */
  C.networkGraph = function (d) {
    const maxF = Math.max(...d.nodes.map((n) => n.freq));
    const cmap = {}; d.clusters.forEach((c) => { cmap[c.id] = c.color; });
    const pos = {}; d.nodes.forEach((n) => { pos[n.id] = n; });
    const edges = d.edges.map((e) => {
      const A = pos[e.a], B = pos[e.b];
      return `<line class="net-edge" data-a="${e.a}" data-b="${e.b}" x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke-width="${(0.5 + e.w * 0.9).toFixed(1)}"></line>`;
    }).join("");
    const nodes = d.nodes.map((n) => {
      const r = (10 + (n.freq / maxF) * 34).toFixed(1);
      const col = cmap[n.cluster] || "#800000";
      const small = n.freq < 6;
      return `<g class="net-node" data-id="${n.id}"><circle cx="${n.x}" cy="${n.y}" r="${r}" fill="${col}"></circle>` +
        `<text class="net-label${small ? " lab-min" : ""}" x="${n.x}" y="${(n.y - r - 7)}" text-anchor="middle">${n.label}</text></g>`;
    }).join("");
    const legend = el("div", "net-legend net-legend--ov",
      el("div", "nl-title", d.legendTitle || "Clusters") +
      d.clusters.map((c) => `<div class="nl-row"><span class="nl-dot" style="background:${c.color}"></span>${c.label}</div>`).join("") +
      el("div", "nl-meta", `<span>${d.legendSize || "Node size = keyword frequency"}</span><span>${d.legendStrength || "Line thickness = relationship strength"}</span>`));
    const vb = `0 0 ${d.viewW || 1440} ${d.viewH || 760}`;
    return sectionHead(d.eyebrow, d.title) +
      reveal(2, `<div class="net-holder net-holder--full"><svg class="net-svg" viewBox="${vb}">${edges}${nodes}</svg>${legend}</div>`);
  };

  /* ---- Observation cards (e.g. network insights) ---- */
  C.observationCards = function (d) {
    const cards = d.items.map((t, i) =>
      reveal(2 + i, el("article", "card obs-card",
        el("span", "obs-no", String(i + 1).padStart(2, "0")) + el("p", "obs-t", t)))).join("");
    return sectionHead(d.eyebrow, d.title) +
      (d.intro ? reveal(1, el("p", "slide-sub", d.intro)) : "") +
      el("div", "obs-grid", cards);
  };

  /* ---- Slide 5: cluster ecosystem + emerging roadmap + insight ---- */
  function ecoSvg(clusters) {
    const cx = 270, cy = 250, R = 165;
    const maxA = Math.max(...clusters.map((c) => c.abstracts));
    let links = "", bubs = "";
    clusters.forEach((c, i) => {
      const ang = -Math.PI / 2 + i * 2 * Math.PI / clusters.length;
      const x = (cx + R * Math.cos(ang)).toFixed(1), y = (cy + R * 0.9 * Math.sin(ang)).toFixed(1);
      const r = (24 + (c.abstracts / maxA) * 30).toFixed(1);
      links += `<line class="eco-link" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"></line>`;
      bubs += `<g class="eco-node"><circle cx="${x}" cy="${y}" r="${r}" fill="${c.color}"></circle>` +
        `<text class="eco-a" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">${c.abstracts}</text></g>`;
    });
    const hub = `<circle class="eco-hub" cx="${cx}" cy="${cy}" r="40"></circle>` +
      `<text class="eco-hub-t" x="${cx}" y="${cy - 4}" text-anchor="middle">RISE</text>` +
      `<text class="eco-hub-t2" x="${cx}" y="${cy + 14}" text-anchor="middle">R&amp;D</text>`;
    return `<svg class="eco-svg" viewBox="0 0 540 520">${links}${hub}${bubs}</svg>`;
  }
  C.landscapeOutlook = function (d) {
    const eco = ecoSvg(d.clusters) + el("div", "eco-leg",
      d.clusters.map((c) => `<div class="eco-leg-i"><span class="d-sw" style="background:${c.color}"></span>` +
        `<span class="eco-leg-l">${c.label}</span><span class="eco-leg-n">${c.abstracts} abstrak · ${c.size} kata kunci</span></div>`).join(""));
    const road = d.emerging.map((e, i) =>
      reveal(4 + i, el("div", "road-item",
        el("span", "road-tag", e.tag) + el("div", "road-t", e.title) + el("p", "road-d", e.desc)))).join("");
    return sectionHead(d.eyebrow, d.title) +
      el("div", "outlook-grid",
        reveal(2, el("div", "eco-wrap", el("div", "ol-head", "Research Clusters") + eco)) +
        el("div", "road", el("div", "ol-head", "Emerging Research Topics") + road)
      ) +
      reveal(10, el("div", "insight-card", el("span", "ins-ic", picon("flag")) + el("p", "", d.insight)));
  };

  /* expose */
  RISE.components = C;
})(window.RISE = window.RISE || {});
