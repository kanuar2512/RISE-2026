/* ============================================================
   RISE FRAMEWORK — SHARED PRESENTATION ENGINE (Cara B)
   ------------------------------------------------------------
   Generic, deck-agnostic engine. The slide manifest is supplied
   per deck via `window.RISE_DECK.slides`; component logic lives
   in components.js (shared) and content in each deck's data file.
   Any HTML entry point can reuse this single engine.
   ============================================================ */
(function () {
  "use strict";

  const RISE = window.RISE || {};
  // Pick the active deck from the registry via ?deck=<id>; fall back to the
  // first registered deck, then to a legacy singular RISE_DECK if present.
  const REG = window.RISE_DECKS || {};
  const wanted = new URLSearchParams(location.search).get("deck");
  const DECK = (wanted && REG[wanted]) ? REG[wanted]
    : (window.RISE_DECK || (Object.keys(REG).length ? REG[Object.keys(REG)[0]] : { slides: [] }));
  const SLIDES = DECK.slides || [];
  const META = DECK.meta || RISE.meta || { event: "RISE 2026", brandLine: "" };

  const stage = document.getElementById("stage");
  const progress = document.getElementById("progress");
  const nav = document.getElementById("nav");
  let index = 0;
  const total = SLIDES.length;

  /* ---------- build DOM ---------- */
  SLIDES.forEach((s, i) => {
    const section = document.createElement("section");
    section.className = "slide" + (s.cls ? " " + s.cls : "");
    section.dataset.index = i;
    section.innerHTML =
      s.render() +
      `<footer class="deck-footer">
         <span class="brand">${META.event} · ${META.brandLine}</span>
         <span class="pg">${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
       </footer>`;
    stage.appendChild(section);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", "Slaid " + (i + 1));
    dot.addEventListener("click", () => go(i));
    nav.appendChild(dot);
  });

  const slides = Array.from(stage.querySelectorAll(".slide"));
  const dots = Array.from(nav.querySelectorAll(".dot"));

  /* ---------- navigation ---------- */
  function go(n) {
    n = Math.max(0, Math.min(total - 1, n));
    if (n === index) { return; }
    slides[index].classList.remove("is-active");
    slides[index].classList.toggle("is-past", n > index);
    index = n;
    render();
  }
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  function render() {
    slides.forEach((sl, i) => {
      sl.classList.toggle("is-active", i === index);
      if (i !== index) { sl.classList.remove("is-past"); }
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    progress.style.width = ((index + 1) / total) * 100 + "%";
    requestAnimationFrame(() => setTimeout(() => animate(slides[index]), 60));
  }

  /* ---------- per-slide motion ---------- */
  const done = new WeakSet();
  function animate(slide) {
    if (done.has(slide)) { return; }
    done.add(slide);
    countUp(slide);
    growBars(slide);
    drawDonut(slide);
  }

  function countUp(slide) {
    slide.querySelectorAll("[data-count]").forEach((node) => {
      const target = parseFloat(node.dataset.count);
      const dur = 1100, start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(target * eased);
        if (p < 1) { requestAnimationFrame(tick); }
        else { node.textContent = target; }
      }
      requestAnimationFrame(tick);
    });
  }

  function growBars(slide) {
    slide.querySelectorAll(".bar-fill").forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.w + "%"; }, 180 + i * 130);
    });
  }

  function drawDonut(slide) {
    slide.querySelectorAll(".donut-seg").forEach((seg, i) => {
      setTimeout(() => {
        seg.style.strokeDashoffset = seg.dataset.offset;
        seg.setAttribute("stroke-dasharray", `${seg.dataset.dash} ${seg.dataset.gap}`);
      }, 200 + i * 220);
    });
  }

  /* ---------- interactive: criterion cards (click to expand) ---------- */
  stage.addEventListener("click", (e) => {
    const card = e.target.closest(".crit-card");
    if (card) { card.classList.toggle("open"); }
  });

  /* ---------- network graph hover: highlight connected nodes/edges ---------- */
  stage.addEventListener("mouseover", (e) => {
    const g = e.target.closest(".net-node");
    if (!g) { return; }
    const svg = g.closest(".net-svg"); if (!svg) { return; }
    const id = g.dataset.id, nbr = new Set([id]);
    svg.querySelectorAll(".net-edge").forEach((ln) => {
      const on = ln.dataset.a === id || ln.dataset.b === id;
      ln.classList.toggle("on", on);
      if (on) { nbr.add(ln.dataset.a); nbr.add(ln.dataset.b); }
    });
    svg.classList.add("focus");
    svg.querySelectorAll(".net-node").forEach((nd) => nd.classList.toggle("dim", !nbr.has(nd.dataset.id)));
  });
  stage.addEventListener("mouseout", (e) => {
    const g = e.target.closest(".net-node");
    if (!g) { return; }
    const svg = g.closest(".net-svg"); if (!svg) { return; }
    svg.classList.remove("focus");
    svg.querySelectorAll(".net-edge.on").forEach((ln) => ln.classList.remove("on"));
    svg.querySelectorAll(".net-node.dim").forEach((nd) => nd.classList.remove("dim"));
  });

  /* ---------- map tooltip (only present on map slides) ---------- */
  stage.addEventListener("mousemove", (e) => {
    const tip = document.getElementById("mapTip");
    if (!tip) { return; }
    const g = e.target.closest(".mstate");
    if (g) {
      const host = tip.parentElement.getBoundingClientRect();
      tip.innerHTML = `${g.dataset.name} · <b>${g.dataset.value}</b>`;
      tip.style.left = (e.clientX - host.left + 14) + "px";
      tip.style.top = (e.clientY - host.top + 14) + "px";
      tip.classList.add("show");
    } else {
      tip.classList.remove("show");
    }
  });

  /* ---------- input bindings ---------- */
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case " ": case "PageDown":
        e.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); go(0); break;
      case "End": e.preventDefault(); go(total - 1); break;
      case "f": case "F": toggleFs(); break;
    }
  });

  let wheelLock = false;
  window.addEventListener("wheel", (e) => {
    if (wheelLock || Math.abs(e.deltaY) < 18) { return; }
    wheelLock = true;
    (e.deltaY > 0 ? next : prev)();
    setTimeout(() => { wheelLock = false; }, 700);
  }, { passive: true });

  let touchY = null, touchX = null;
  window.addEventListener("touchstart", (e) => {
    touchY = e.touches[0].clientY; touchX = e.touches[0].clientX;
  }, { passive: true });
  window.addEventListener("touchend", (e) => {
    if (touchY === null) { return; }
    const dy = e.changedTouches[0].clientY - touchY;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.max(Math.abs(dy), Math.abs(dx)) > 50) {
      (Math.abs(dy) > Math.abs(dx) ? dy < 0 : dx < 0) ? next() : prev();
    }
    touchY = touchX = null;
  }, { passive: true });

  function toggleFs() {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen?.(); }
    else { document.exitFullscreen?.(); }
  }
  document.getElementById("fsBtn")?.addEventListener("click", toggleFs);
  document.getElementById("prevBtn")?.addEventListener("click", prev);
  document.getElementById("nextBtn")?.addEventListener("click", next);

  /* ---------- start ---------- */
  render();
})();
