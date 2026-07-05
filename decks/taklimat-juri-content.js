/* ============================================================
   DECK: Taklimat Juri Poster R&D — RISE 2026
   ------------------------------------------------------------
   Audience: Panel penilai (juri).
   Slide 1–3 unik kepada deck ini; slide 4–9 berkongsi
   data rubrik dari penjurian-content.js (window.RISE.*).
   Data unik disimpan dalam window.RISE_JURI untuk elak konflik.
   ============================================================ */
window.RISE_JURI = window.RISE_JURI || {};
Object.assign(window.RISE_JURI, {

  /* ---- Slide 1: cover juri ---- */
  cover: {
    eyebrow: "RISE 2026 · Panel Penilai",
    title: "Taklimat Juri",
    subtitle: "Panduan Penilaian Poster R&D · RISE 2026"
  },

  /* ---- Slide 2: proses penilaian dari perspektif juri ---- */
  workflow: {
    title: "Proses Penilaian Poster R&D",
    steps: [
      { label: "Terima Borang Penilaian" },
      { label: "Lawati Ruang Poster" },
      { label: "Nilai Mengikut Rubrik" },
      { label: "Markah Individu" },
      { label: "Serahkan Borang" },
      { label: "Purata Dikira" }
    ]
  },

  /* ---- Slide 3: senarai juri ---- */
  juriList: {
    eyebrow: "Panel Penilai",
    title: "Senarai Juri Poster R&D",
    subtitle: "RISE 2026 · Simposium Penyelidikan dan Pembangunan Penguatkuasaan Farmasi",
    judges: [
      {
        honorific: "YBrs.",
        name: "Dr. Azlinda binti Abdul Samad",
        post: "Ketua Cawangan Penguatkuasaan Farmasi",
        org: "Jabatan Kesihatan Negeri Perak"
      },
      {
        honorific: "",
        name: "En. Manzatul Azrul Azrie bin Sulaiman",
        post: "Ketua Penolong Pengarah Kanan",
        org: "Bahagian Penguatkuasaan Farmasi, KKM"
      },
      {
        honorific: "YBrs.",
        name: "Dr. Nurul Liyana binti Zainal Abidin",
        post: "Ketua Penolong Pengarah Kanan",
        org: "Bahagian Amalan & Perkembangan Farmasi, KKM"
      }
    ]
  }

});

/* ---- Register deck ---- */
window.RISE_DECKS = window.RISE_DECKS || {};
window.RISE_DECKS["taklimat-juri"] = {
  id: "taklimat-juri",
  title: "Taklimat Juri Poster R&D",
  subtitle: "Panduan penilaian dan rubrik untuk panel penilai RISE 2026",
  meta: { event: "RISE 2026" },
  slides: [
    /* Slide 1 — Cover juri (diubah suai) */
    { key: "juri-cover",    cls: "hero",       render: () => window.RISE.components.divider(window.RISE_JURI.cover) },
    /* Slide 2 — Workflow dari perspektif juri (diubah suai) */
    { key: "juri-workflow",                    render: () => window.RISE.components.workflow(window.RISE_JURI.workflow) },
    /* Slide 3 — Senarai Juri (baharu) */
    { key: "juri-panel",                       render: () => window.RISE.components.juriPanel(window.RISE_JURI.juriList) },
    /* Slide 4–9 — Sama seperti penjurian-rnd */
    { key: "structure",                        render: () => window.RISE.components.structure(window.RISE.structure) },
    { key: "scoring",       cls: "slide--top", render: () => window.RISE.components.scoringScale(window.RISE.scoring) },
    { key: "technical",     cls: "slide--top", render: () => window.RISE.components.criteriaCards(window.RISE.technical) },
    { key: "presentation",                     render: () => window.RISE.components.criteriaCards(window.RISE.presentation) },
    { key: "ranking",       cls: "slide--top", render: () => window.RISE.components.weightRanking(window.RISE.ranking) },
    { key: "dashboard",                        render: () => window.RISE.components.rubricDashboard(window.RISE.dashboard) }
  ]
};
