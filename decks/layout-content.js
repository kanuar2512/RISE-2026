/* ============================================================
   DECK: Layout & Templat Poster — RISE 2026
   ------------------------------------------------------------
   For poster presenters: poster room layouts (R&D + Quality,
   floor plan + 3D view) and the official A0 poster template
   with a download link.
   Content from LAYOUT.pptx and Final_Templat_Poster_RISE_2026.
   ============================================================ */
window.RISE = window.RISE || {};
Object.assign(window.RISE, {
  meta: {
    event: "RISE 2026",
    brandLine: "Layout & Templat Poster · Penguatkuasaan Farmasi"
  },

  /* ---- Slide 1: cover (maroon divider) ---- */
  layoutCover: {
    eyebrow: "RISE 2026",
    title: "Layout & Templat Poster"
  },

  /* ---- Slide 2: R&D room — floor plan ---- */
  layoutRnd: {
    title: "Ruang Poster R&D",
    image: "assets/img/ruang-rnd.png",
    caption: "Esplanade 1 — 24 poster (R01–R24). R01 bermula di kanan, R24 di kiri."
  },

  /* ---- Slide 3: R&D room — 3D view ---- */
  layoutRnd3d: {
    title: "Pandangan 3D Ruang Poster R&D",
    image: "assets/img/ruang-rnd-3d.jpg",
    caption: "Susun atur sebenar ruang pameran poster R&D."
  },

  /* ---- Slide 4: Quality room — floor plan ---- */
  layoutQi: {
    title: "Ruang Poster Inisiatif Kualiti",
    image: "assets/img/ruang-qi.png",
    caption: "16 poster (Q01–Q16), bersebelahan VIP Room & Glass Window."
  },

  /* ---- Slide 5: Quality room — 3D view ---- */
  layoutQi3d: {
    title: "Pandangan 3D Ruang Poster Kualiti",
    image: "assets/img/ruang-qi-3d.jpg",
    caption: "Susun atur sebenar ruang pameran poster Inisiatif Kualiti."
  },

  /* ---- Slide 6: official template (image only) + download ---- */
  layoutTemplat: {
    title: "Templat Poster Rasmi",
    image: "assets/img/templat-poster.png",
    download: "https://www.canva.com/design/DAHN6Gh8Sjg/mwcr3u7Wxe5bNA6wV2e2ow/edit",
    downloadLabel: "Muat turun templat (Canva)"
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
    { key: "cover",     cls: "hero",       render: () => window.RISE.components.divider(window.RISE.layoutCover) },
    { key: "rnd",       cls: "slide--top", render: () => window.RISE.components.imageSolo(window.RISE.layoutRnd) },
    { key: "rnd3d",     cls: "slide--top", render: () => window.RISE.components.imageSolo(window.RISE.layoutRnd3d) },
    { key: "qi",        cls: "slide--top", render: () => window.RISE.components.imageSolo(window.RISE.layoutQi) },
    { key: "qi3d",      cls: "slide--top", render: () => window.RISE.components.imageSolo(window.RISE.layoutQi3d) },
    { key: "templat",   cls: "slide--top", render: () => window.RISE.components.posterTemplateOnly(window.RISE.layoutTemplat) }
  ]
};
