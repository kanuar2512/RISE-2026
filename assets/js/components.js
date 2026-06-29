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
    save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>`
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

  /* expose */
  RISE.components = C;
})(window.RISE = window.RISE || {});
