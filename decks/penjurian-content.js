/* ============================================================
   DECK: Taklimat Penjurian Poster R&D — RISE 2026
   ------------------------------------------------------------
   Audience: poster presenters & participants (NOT judges).
   Rubric values taken directly from the official "Draft Poster
   Scoring Form" (1–5 scale × weightage): max = weightage × 5,
   total 100 (Part A 70 / Part B 30). Criterion descriptions use
   the form's original English "Scoring Criteria" wording.
   ============================================================ */
window.RISE = window.RISE || {};
Object.assign(window.RISE, {
  meta: {
    event: "RISE 2026",
    brandLine: "Taklimat Penjurian Poster R&D · Penguatkuasaan Farmasi"
  },

  /* ---- Slide 1: section divider (maroon heading) ---- */
  cover: {
    eyebrow: "RISE 2026",
    title: "Taklimat Penjurian Poster R&D"
  },

  /* ---- Slide 2: assessment workflow ---- */
  workflow: {
    title: "Bagaimanakah Poster Anda Dinilai?",
    steps: [
      { label: "Poster" },
      { label: "3 Panel Penilai" },
      { label: "Rubrik Penilaian Rasmi" },
      { label: "Markah Individu" },
      { label: "Purata Markah" },
      { label: "Keputusan Akhir" }
    ]
  },

  /* ---- Slide 3: assessment structure ---- */
  structure: {
    title: "Struktur Penilaian",
    parts: [
      { name: "Technical Content", pct: 70, color: "#800000", sub: "Kualiti kandungan penyelidikan" },
      { name: "Presentation", pct: 30, color: "#C77B30", sub: "Keberkesanan penyampaian poster" }
    ]
  },

  /* ---- Slide 4: scoring scale & calculation (1–5 × weightage) ---- */
  scoring: {
    title: "Skala & Pengiraan Markah",
    scale: [
      { n: 1, label: "Very poor" },
      { n: 2, label: "Poor" },
      { n: 3, label: "Acceptable" },
      { n: 4, label: "Good" },
      { n: 5, label: "Very good" }
    ],
    examples: [
      { criterion: "Results", score: 5, weight: 3, marks: 15 },
      { criterion: "Introduction", score: 5, weight: 2, marks: 10 }
    ],
    note: "Setiap kriteria diberi skor 1–5 oleh juri, kemudian didarab dengan pemberat. Markah maksimum = 5 × pemberat."
  },

  /* ---- Slide 5: Technical Content (70%) — 7 criteria ---- */
  technical: {
    title: "Technical Content (70%)",
    accent: "#800000",
    cols: 4,
    items: [
      { name: "Introduction", max: 10, weight: 2, desc: "Clarity in presenting a background supported by literature; rationale and objectives of the study." },
      { name: "Methodology", max: 10, weight: 2, desc: "Proper study design; sampling method, sample size; research tools, data collection; statistical analysis." },
      { name: "Results", max: 15, weight: 3, desc: "Clearly presented in accordance to study objectives; synthesis of finding using appropriate statistical analysis." },
      { name: "Discussion & Conclusion", max: 15, weight: 3, desc: "Findings adequately discussed; discussion supported by available literature." },
      { name: "Reference & Acknowledgement", max: 5, weight: 1, desc: "Proper citation style and acknowledgment of contribution and funding sources." },
      { name: "Significance of Study", max: 5, weight: 1, desc: "Study is important and aligned to pharmacy research priorities." },
      { name: "Impact to Practice", max: 10, weight: 2, desc: "Ability to be adapted into practice and change outcomes." }
    ]
  },

  /* ---- Slide 5: Presentation (30%) — 3 criteria ---- */
  presentation: {
    title: "Presentation (30%)",
    accent: "#C77B30",
    cols: 3,
    items: [
      { name: "Layout & Design", max: 15, weight: 3, desc: "Effective use of graphics, color and fonts to enhance readability and appeal." },
      { name: "Clarity & Organisation", max: 10, weight: 2, desc: "Information is logically organized and easy to follow." },
      { name: "Language", max: 5, weight: 1, desc: "No grammatical and spelling errors." }
    ]
  },

  /* ---- Slide 6: marks contribution ranking ---- */
  ranking: {
    title: "Pemberat Markah Penilaian",
    items: [
      { name: "Results", marks: 15 },
      { name: "Discussion & Conclusion", marks: 15 },
      { name: "Layout & Design", marks: 15 },
      { name: "Introduction", marks: 10 },
      { name: "Methodology", marks: 10 },
      { name: "Impact to Practice", marks: 10 },
      { name: "Clarity & Organisation", marks: 10 },
      { name: "Reference & Acknowledgement", marks: 5 },
      { name: "Significance of Study", marks: 5 },
      { name: "Language", marks: 5 }
    ]
  },

  /* ---- Slide 7: executive summary dashboard ---- */
  dashboard: {
    title: "Ringkasan Rubrik Penilaian",
    kpis: [
      { value: "10", label: "Kriteria Penilaian", icon: "list" },
      { value: "100", label: "Jumlah Markah", icon: "award" },
      { value: "70%", label: "Technical Content", icon: "research" },
      { value: "30%", label: "Presentation", icon: "presentation" },
      { value: "3", label: "Panel Penilai Bebas", icon: "panel" }
    ]
  }
});

/* ---- Register this deck into the shared hub registry ---- */
window.RISE_DECKS = window.RISE_DECKS || {};
window.RISE_DECKS["penjurian-rnd"] = {
  id: "penjurian-rnd",
  title: "Taklimat Penjurian Poster R&D",
  subtitle: "Kriteria dan Skema Pemarkahan Poster R&D",
  meta: window.RISE.meta,
  slides: [
    { key: "cover",        cls: "hero",       render: () => window.RISE.components.divider(window.RISE.cover) },
    { key: "workflow",                        render: () => window.RISE.components.workflow(window.RISE.workflow) },
    { key: "structure",                       render: () => window.RISE.components.structure(window.RISE.structure) },
    { key: "scoring",      cls: "slide--top", render: () => window.RISE.components.scoringScale(window.RISE.scoring) },
    { key: "technical",    cls: "slide--top", render: () => window.RISE.components.criteriaCards(window.RISE.technical) },
    { key: "presentation",                    render: () => window.RISE.components.criteriaCards(window.RISE.presentation) },
    { key: "ranking",      cls: "slide--top", render: () => window.RISE.components.weightRanking(window.RISE.ranking) },
    { key: "dashboard",                       render: () => window.RISE.components.rubricDashboard(window.RISE.dashboard) }
  ]
};
