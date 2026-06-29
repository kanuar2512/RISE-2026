/* ============================================================
   DECK: Layout & Templat Poster — RISE 2026
   ------------------------------------------------------------
   For poster presenters: where posters are placed (floor plan)
   and the official A0 poster template + guidelines.
   Content sourced from LAYOUT.pptx and Final_Templat_Poster_RISE_2026.
   ============================================================ */
window.RISE = window.RISE || {};
Object.assign(window.RISE, {
  meta: {
    event: "RISE 2026",
    brandLine: "Layout & Templat Poster · Penguatkuasaan Farmasi"
  },

  /* ---- Slide 1: cover (render photo background) ---- */
  layoutCover: {
    eyebrow: "RISE 2026",
    title: "Layout & Templat Poster",
    subtitle: "Susun atur ruang poster & templat poster rasmi",
    bg: "assets/img/sesi-poster.jpg"
  },

  /* ---- Slide 2: floor-plan layout ---- */
  layoutRuang: {
    title: "Susun Atur Ruang Poster",
    intro: "Lokasi poster mengikut kod pembentangan — pastikan poster anda berada di lokasi yang betul.",
    cols: 2,
    items: [
      { src: "assets/img/ruang-rnd.png", title: "Ruang Poster R&D — Esplanade 1", caption: "24 poster (R01–R24). R01 bermula di kanan, R24 di kiri." },
      { src: "assets/img/ruang-qi.png", title: "Ruang Poster Inisiatif Kualiti", caption: "16 poster (Q01–Q16), bersebelahan VIP Room & Glass Window." }
    ]
  },

  /* ---- Slide 3: official template + key specs ---- */
  layoutTemplat: {
    title: "Templat Poster Rasmi",
    image: "assets/img/templat-poster.png",
    specs: [
      { icon: "poster", k: "Saiz", v: "A0 Potret (841 × 1189 mm)" },
      { icon: "frame",  k: "Margin", v: "2 cm pada semua sisi" },
      { icon: "list",   k: "Had", v: "Setiap poster MESTI muat dalam SATU slaid" },
      { icon: "save",   k: "Format Simpanan", v: "Simpan sebagai PNG dan PDF" },
      { icon: "award",  k: "Kod Pembentangan", v: "Dipaparkan di sudut atas (100 pt)" }
    ]
  },

  /* ---- Slide 4: font size guide ---- */
  layoutFont: {
    title: "Panduan Saiz Fon",
    intro: "Saiz fon mengikut bahagian poster.",
    items: [
      { k: "Tajuk / Title", v: "60–90 pt" },
      { k: "Nama Penulis / Author", v: "28–32 pt" },
      { k: "Institusi", v: "20 pt (italik)" },
      { k: "Tajuk Seksyen / Section Title", v: "min. 36 pt (bold)" },
      { k: "Kandungan / Body Text", v: "min. 24 pt" },
      { k: "Penghargaan & Rujukan", v: "min. 20 pt" }
    ]
  },

  /* ---- Slide 5: suggested sections ---- */
  layoutBahagian: {
    title: "Cadangan Bahagian Poster",
    intro: "Susun kandungan poster mengikut kreativiti anda. Bahagian yang dicadangkan:",
    chips: ["Pengenalan", "Objektif", "Kaedah", "Keputusan", "Perbincangan", "Potensi Pengembangan", "Kesimpulan", "Penghargaan", "Rujukan"],
    note: "Sila sertakan penghargaan kepada Ketua Pengarah Kesihatan Malaysia atas kebenaran membentangkan poster ini."
  }
});

/* ---- Register this deck into the shared hub registry ---- */
window.RISE_DECKS = window.RISE_DECKS || {};
window.RISE_DECKS["layout-poster"] = {
  id: "layout-poster",
  title: "Layout & Templat Poster",
  subtitle: "Susun atur ruang & templat poster rasmi",
  meta: window.RISE.meta,
  slides: [
    { key: "cover",     cls: "hero cover-img", render: () => window.RISE.components.imageCover(window.RISE.layoutCover) },
    { key: "ruang",                            render: () => window.RISE.components.imageCards(window.RISE.layoutRuang) },
    { key: "templat",   cls: "slide--top",     render: () => window.RISE.components.splitMedia(window.RISE.layoutTemplat) },
    { key: "fontguide", cls: "slide--top",     render: () => window.RISE.components.specList(window.RISE.layoutFont) },
    { key: "bahagian",  cls: "slide--top",     render: () => window.RISE.components.chipsNote(window.RISE.layoutBahagian) }
  ]
};
