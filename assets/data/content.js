/* ============================================================
   RISE 2026 — EDITABLE CONTENT
   ------------------------------------------------------------
   This single file is the deck's content database. To update
   the presentation, edit the values below — no HTML changes
   are required. Sections mirror the requested data models:
   meta / statistics / categories / states / fields /
   timeline / publications.
   (Kept as a JS object so the deck runs offline via file://,
    where browsers block fetch() of local .json files.)
   ============================================================ */
window.RISE = window.RISE || {};
Object.assign(window.RISE, {

  /* ---- Global deck meta ---- */
  meta: {
    event: "RISE 2026",
    brandLine: "Penguatkuasaan Farmasi · Kementerian Kesihatan Malaysia",
    phase: "Fasa 1 — Pengenalan, Statistik & Penerbitan"
  },

  /* ---- SLIDE 1 : Hero ---- */
  hero: {
    logos: [
      { src: (window.RISE_ASSETS || {}).persidangan, alt: "Persidangan Kebangsaan Penguatkuasaan Jenayah Farmaseutikal", pos: "left" },
      { src: (window.RISE_ASSETS || {}).logo50, alt: "50 Tahun Penguatkuasaan Farmasi", pos: "right" }
    ],
    title: "RISE 2026",
    subtitle: "Simposium Penyelidikan dan Pembangunan (R&D) dan Inisiatif Penambahbaikan Kualiti Penguatkuasaan Farmasi",
    partOfLabel: "Sempena",
    partOf: "Persidangan Kebangsaan Penguatkuasaan Jenayah Farmaseutikal 2026"
  },

  /* ---- SLIDE 2 : Event information ---- */
  eventInfo: {
    eyebrow: "RISE 2026",
    title: "Maklumat Simposium",
    cards: [
      { label: "Tarikh", value: "27–29 Julai 2026" },
      { label: "Tempat", value: "KSL Esplanade Hotel,\nKlang, Selangor" },
      { label: "Anjuran", value: "Bahagian Penguatkuasaan Farmasi,\nKementerian Kesihatan Malaysia" }
    ],
    theme: {
      label: "Tema Persidangan",
      value: "50 Tahun Penguatkuasaan Farmasi: Legasi Menuju Transformasi Digital, Mendepani Jenayah Farmaseutikal Tanpa Sempadan"
    }
  },

  /* ---- SLIDE 2 : KPI statistics ---- */
  statistics: {
    eyebrow: "Statistik",
    title: "Penyertaan RISE 2026",
    kpis: [
      { value: 40, icon: "presentation", label: "Jumlah Pembentangan" },
      { value: 38, icon: "people", label: "Jumlah Pembentang" },
      { value: 24, icon: "research", label: "Kajian Penyelidikan & Pembangunan", sub: "Kategori 1 & 2" },
      { value: 16, icon: "quality", label: "Projek Inisiatif Penambahbaikan Kualiti", sub: "Kategori 3" }
    ]
  },

  /* ---- SLIDE 3 : Category introduction (names only) ---- */
  categoryIntro: {
    eyebrow: "Kategori",
    title: "Kategori RISE 2026",
    items: [
      { no: "01", key: "Kategori 1", name: "Poster Kajian Penyelidikan dan Pembangunan (R&D)", icon: "research", color: "#800000" },
      { no: "02", key: "Kategori 2", name: "Kolokium Poster Kajian Penyelidikan dan Pembangunan (R&D)", icon: "people", color: "#C9952B" },
      { no: "03", key: "Kategori 3", name: "Projek Inisiatif Penambahbaikan Kualiti", icon: "quality", color: "#C77B30" }
    ]
  },

  /* ---- SLIDE 5 : States (Malaysia choropleth) ---- */
  states: {
    eyebrow: "Statistik",
    title: "Penyertaan Mengikut Negeri",
    /* id maps to tile in components.js map layout */
    data: [
      { id: "SWK", name: "Sarawak", value: 6 },
      { id: "JHR", name: "Johor", value: 4 },
      { id: "PLS", name: "Perlis", value: 4 },
      { id: "SBH", name: "Sabah", value: 4 },
      { id: "MLK", name: "Melaka", value: 3 },
      { id: "PHG", name: "Pahang", value: 3 },
      { id: "PNG", name: "Pulau Pinang", value: 3 },
      { id: "SGR", name: "Selangor", value: 3 },
      { id: "KUL", name: "WP Kuala Lumpur & Putrajaya", value: 3 },
      { id: "KDH", name: "Kedah", value: 1 },
      { id: "KTN", name: "Kelantan", value: 1 },
      { id: "NSN", name: "Negeri Sembilan", value: 1 },
      { id: "PRK", name: "Perak", value: 1 },
      { id: "TRG", name: "Terengganu", value: 1 },
      { id: "LBN", name: "WP Labuan", value: 1 },
      { id: "BPF", name: "Ibu Pejabat BPF", value: 1 }
    ]
  },

  /* ---- SLIDE 5 : Fields (horizontal bars) ---- */
  fields: {
    eyebrow: "Statistik",
    title: "Pecahan Pembentangan Mengikut Bidang Penguatkuasaan",
    data: [
      { label: "Pelesenan", value: 11 },
      { label: "Perundangan", value: 11 },
      { label: "Perisikan dan Operasi", value: 8 },
      { label: "Perkembangan Penguatkuasaan Farmasi", value: 6 },
      { label: "Kawalan Iklan", value: 4 }
    ]
  },

  /* ---- SLIDE 6 : Timeline ---- */
  timeline: {
    eyebrow: "Sesi Penilaian",
    title: "Slot Pembentangan dan Penilaian Poster",
    items: [
      {
        date: "28 Julai 2026",
        time: "11.45 pagi – 1.00 tengah hari",
        title: "Lawatan Ruang Simposium",
        chips: [
          { num: 16, text: "Poster Kajian Penyelidikan dan Pembangunan" },
          { num: 8, text: "Kolokium Poster Kajian Penyelidikan dan Pembangunan" }
        ]
      }
    ],
    callout: {
      title: "Makluman Penting kepada Pembentang",
      text: "Semua pembentang hendaklah berada di lokasi poster sepanjang sesi lawatan bagi memberi penerangan kepada panel penilai serta menjawab pertanyaan yang dikemukakan."
    }
  },


  /* ---- SLIDE 8 : NIH Approval ---- */
  nihApproval: {
    eyebrow: "Kelulusan NIH",
    title: "Kelulusan Pembentangan Saintifik",
    letterUrl: "https://drive.google.com/file/d/1sO_JeYLpRHfdBhz09mxunxn8Ta4k1VDm/view?usp=drive_link",
    letter: {
      from:    "Institut Kesihatan Negara (NIH), Kementerian Kesihatan Malaysia",
      ref:     "NIH.800-5/3/1 Jld 166 (22)",
      date:    "11 Jun 2026",
      subject: "Permohonan Kelulusan untuk Pembentangan Saintifik / Hasil Penyelidikan",
      body:    "Permohonan untuk pembentangan seperti di Lampiran 1 telah memperolehi kelulusan daripada <b>Ketua Pengarah Kesihatan Malaysia</b> dan akan diadakan di Persidangan Kebangsaan Penguatkuasaan Jenayah Farmaseutikal 2026 (RISE 2026) — KSL Esplanade Hotel, Klang pada tarikh 27–29 Julai 2026.",
      signatory: { name: "Dr. Fazliana Binti Mansor", role: "Pengurus NIH" }
    },
    stats: [
      { value: "NIH.800-5/3/1", label: "No. Surat", raw: true },
      { value: "11 Jun 2026", label: "Tarikh Kelulusan", raw: true }
    ],
    badge: "Diluluskan oleh Ketua Pengarah Kesihatan Malaysia"
  },

  /* ---- SLIDE: NIH Publication Approval ---- */
  nihPublication: {
    eyebrow: "Kelulusan NIH",
    title: "Kelulusan Penerbitan Artikel",
    letterUrl: "https://drive.google.com/file/d/127VIJITSZNMYstAMwdckoeK0MZVYktI0/view?usp=drive_link",
    letter: {
      from:    "Institut Kesihatan Negara (NIH), Kementerian Kesihatan Malaysia",
      ref:     "NIH.800-4/4/1 Jld. 166 (7)",
      date:    "2 Julai 2026",
      subject: "Kelulusan untuk Penerbitan Artikel",
      body:    "Permohonan <b>En. Norfahmi bin Mohd Yusof</b> telah memperolehi kelulusan daripada <b>Ketua Pengarah Kesihatan Malaysia</b> untuk penerbitan \"Seperti di Lampiran 1\" dalam <i>Pharmacy Research Reports Volume 9 Supplementary Issue (July) 2026</i>.",
      signatory: { name: "Dr. Fazliana Binti Mansor", role: "Pengurus NIH" }
    },
    stats: [
      { value: "NIH.800-4/4/1", label: "No. Surat", raw: true },
      { value: "2 Julai 2026", label: "Tarikh Kelulusan", raw: true }
    ]
  },

  /* ---- SLIDE 7 : Publications ---- */
  publications: {
    eyebrow: "Penerbitan",
    title: "Penerbitan Rasmi RISE 2026",
    cards: [
      {
        badge: "Penerbitan 1",
        title: "Pharmacy Research Report",
        meta: [
          { k: "Volume", v: "9" },
          { k: "Issue", v: "Supplementary (July) 2026" }
        ],
        count: 24,
        countLabel: "Abstrak"
      },
      {
        badge: "Penerbitan 2",
        title: "Journal of Pharmacy Quality Improvement Initiatives (PharmQIIs)",
        meta: [
          { k: "Volume", v: "5" },
          { k: "Issue", v: "1 (Supplementary) 2026" }
        ],
        count: 16,
        countLabel: "Abstrak"
      }
    ],
    total: { value: 40, label: "Jumlah Abstrak Diterbitkan" },
    summary: "Kesemua <b>40 abstrak</b> akan diterbitkan dalam dua penerbitan rasmi RISE 2026 sebagai platform perkongsian ilmu, pengiktirafan akademik dan rujukan dalam bidang penguatkuasaan farmasi."
  }

  /* ---- SLIDE: KPK Visit intro ---- */
  kpkVisit: {
    eyebrow: "Lawatan KPK",
    title: "Lawatan ke Ruang Simposium",
    subtitle: "Dua projek berikut dipilih untuk ditonjolkan semasa lawatan Yang Berhormat Ketua Pengarah Kesihatan Malaysia ke ruang pameran poster RISE 2026.",
    context: "28 Julai 2026 \u00b7 Semasa Majlis Pembukaan",
    projects: [
      { code: "R01", category: "Kajian R&D", title: "A Qualitative Study Exploring and Understanding Non-Compliance Towards Pharmacy Law Among Repeat Offenders in Sabah, Malaysia", state: "Sabah" },
      { code: "Q01", category: "Projek QII", title: "MEDISHRX 2.0", state: "Pulau Pinang" }
    ]
  },

  /* ---- SLIDE: R01 ---- */
  kpkR01: {
    eyebrow: "Kajian R&D Terpilih \u00b7 R01",
    code: "R01",
    category: "Poster Kajian Penyelidikan dan Pembangunan (R&D)",
    title: "A Qualitative Study Exploring and Understanding Non-Compliance Towards Pharmacy Law Among Repeat Offenders in Sabah, Malaysia",
    authors: "Hii Lu Yien, Fashihatul Aini Affandi, Loh Tan Yin et al.",
    state: "Sabah",
    affiliation: "Cawangan Penguatkuasaan Farmasi, Jabatan Kesihatan Negeri Sabah",
    objective: "Meneroka fenomena ketidakpatuhan berulang terhadap undang-undang farmasi \u2014 punca pesalah berulang di Sabah terus menjual ubat tidak berdaftar dan kosmetik tidak dinotifikasi.",
    findings: [
      "Keperluan ekonomi untuk kelangsungan hidup",
      "Obligasi komuniti \u2014 ubat mampu milik di kawasan luar bandar",
      "Kekaburan rantaian bekalan \u2014 pembekal yang mengelirukan",
      "Normalisasi peraturan \u2014 kekeliruan dan impuniti pesaing tanpa lesen"
    ],
    conclusion: "Strategi pelbagai pendekatan: penguatkuasaan progresif, pendidikan disasarkan, dan regulasi pembekal hulu disyorkan untuk meningkatkan pematuhan mampan."
  },

  /* ---- SLIDE: Q01 ---- */
  kpkQ01: {
    eyebrow: "Projek QII Terpilih \u00b7 Q01",
    code: "Q01",
    category: "Projek Inisiatif Penambahbaikan Kualiti",
    title: "MEDISHRX 2.0",
    authors: "Tneh Kor Nin, Leong Wei Luen, Hanafiah Husain, Shahmanazrey Che Dan, Yeap Li San, Calrin Lee Pei Chin, Muhamad Faiz Zakaria",
    state: "Pulau Pinang",
    affiliation: "Cawangan Penguatkuasaan Farmasi, Jabatan Kesihatan Negeri Pulau Pinang",
    objective: "Menambah baik mesin pelupusan bahan psikotropik MediShRx dari versi 1.0 ke 2.0 bagi meningkatkan kecekapan, keselamatan dan keberkesanan pelupusan.",
    findings: [
      "100% pelupusan bahan psikotropik berjaya (daripada 91.1% sebelumnya)",
      "Masa pelupusan berkurang 71.88%",
      "Keperluan tenaga kerja dikurangkan sehingga 90%",
      "Tiada kecederaan (berbanding 6 insiden sebelumnya)",
      "Penjimatan kos RM521,400 setahun di peringkat nasional"
    ],
    conclusion: "MediShRx 2.0 berpotensi diperluaskan sebagai standard pelupusan nasional di semua kemudahan kesihatan dan industri farmaseutikal Malaysia."
  }

});

/* ---- Register this deck into the shared hub registry ---- */
window.RISE_DECKS = window.RISE_DECKS || {};
window.RISE_DECKS["introduction"] = {
  id: "introduction",
  title: "RISE 2026: Perkembangan Terkini",
  subtitle: "Status semasa dan statistik RISE 2026",
  meta: window.RISE.meta,
  slides: [
    { key: "hero",         cls: "hero",       render: () => window.RISE.components.hero(window.RISE.hero) },
    { key: "eventInfo",                       render: () => window.RISE.components.eventInfo(window.RISE.eventInfo) },
    { key: "categoryIntro",                   render: () => window.RISE.components.categoryIntro(window.RISE.categoryIntro) },
    { key: "statistics",                      render: () => window.RISE.components.statistics(window.RISE.statistics) },
    { key: "states",       cls: "slide--top", render: () => window.RISE.components.states(window.RISE.states) },
    { key: "fields",                          render: () => window.RISE.components.fields(window.RISE.fields) },
    { key: "nihApproval",                     render: () => window.RISE.components.nihApproval(window.RISE.nihApproval) },
    { key: "nihPublication",                  render: () => window.RISE.components.nihApproval(window.RISE.nihPublication) },
    { key: "publications",                    render: () => window.RISE.components.publications(window.RISE.publications) },
    { key: "kpkVisit",   render: () => window.RISE.components.kpkVisit(window.RISE.kpkVisit) },
    { key: "kpkR01",     render: () => window.RISE.components.kpkProject(window.RISE.kpkR01) },
    { key: "kpkQ01",     render: () => window.RISE.components.kpkProject(window.RISE.kpkQ01) }
  ]
};
