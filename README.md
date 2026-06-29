# RISE 2026 — Presentation (Phase 1)

Premium keynote-style HTML presentation for **RISE 2026** covering
**Pengenalan · Statistik · Penerbitan**. Built to be extended later
(Judging Rubric, Assessment, Awards) without redesigning existing slides.

## Run
Double-click **`index.html`** (works offline, no server needed).
Fonts load from Google Fonts when online; an elegant serif fallback is used otherwise.

## Controls
- **→ / ↓ / Space / Page Down** — next · **← / ↑ / Page Up** — previous
- **Home / End** — first / last · **F** — fullscreen
- Mouse wheel, touchpad, swipe, bottom dots & arrows

## Structure
```
index.html                  shell + script order
assets/
  css/styles.css            theme tokens + components + motion
  data/content.js           ALL editable content (edit this only)
  js/components.js           reusable render functions (UI primitives)
  js/app.js                  navigation + animation engine
```

## Edit content
Change text/numbers in **`assets/data/content.js`** — no HTML edits needed.
(The data is a JS object rather than `.json` so the deck runs from `file://`,
where browsers block `fetch()` of local JSON.)

## Re-skin
Edit the **DESIGN TOKENS** block at the top of `assets/css/styles.css`
(colours: `--maroon #800000`, `--gold #FACE5C`, `--cream #FFF4D6`; fonts:
Sugo Display → Fraunces fallback, Poppins body).

## Add a future slide
1. Add a content block in `content.js`.
2. Add a render function in `components.js` (reuse `sectionHead`, `card`, etc.).
3. Append one entry to the `SLIDES` array in `app.js`.
Navigation, progress, dots, counters and reveal animations apply automatically.

## Notes
- `Sugo Display` is referenced first; if you have the licensed web font,
  drop a `@font-face` into `styles.css` and it will take over.
- Malaysia map is a stylised choropleth tile map (hover shows the value);
  tile positions live in `components.js`, values live in `content.js`.
```
