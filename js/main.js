/* ==========================================================================
   EmpowerZ portfolio
   Builds every section from the data in content/*.js, then adds the motion.
   You should not need to edit this file to change text, links or images.
   ========================================================================== */

(() => {
  "use strict";

  const HAS_GSAP = typeof gsap !== "undefined";
  const MOTION_OK = "(prefers-reduced-motion: no-preference)";
  const FINE_POINTER = "(hover: hover) and (pointer: fine)";
  const motionAllowed = () => HAS_GSAP && window.matchMedia(MOTION_OK).matches;
  // Entrances play once. Used instead of `once: true`, which can crash ScrollTrigger when the
  // page loads already scrolled down (e.g. a refresh mid-page) because the trigger kills itself mid-refresh.
  const PLAY_ONCE = "play none none none";

  // Shared SplitText class names; masks become `split-line-mask` etc. (styled in style.css).
  const SPLIT_CLASSES = { linesClass: "split-line", wordsClass: "split-word", charsClass: "split-char" };

  if (HAS_GSAP) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrambleTextPlugin, DrawSVGPlugin, Flip);
    gsap.defaults({ ease: "expo.out", duration: 1 });
  }

  /* ---------- Helpers ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ENTITIES[c]);
  const pad = (n) => String(n).padStart(2, "0");
  const EXTERNAL = 'target="_blank" rel="noreferrer"';
  const list = (items, fn) => items.map(fn).join("");

  // Lucide icon by PascalCase name ("ArrowUpRight"), rendered as an inline SVG string.
  function icon(name, size = 24, extra = {}) {
    if (typeof lucide === "undefined") return "";
    const node = lucide.icons[name] || lucide.icons.Sparkles;
    const kebab = name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    const { class: className, ...rest } = extra;
    const attrs = {
      ...node[1],
      width: size,
      height: size,
      ...rest,
      "aria-hidden": "true",
      class: ["lucide", `lucide-${kebab}`, className].filter(Boolean).join(" "),
    };
    const toAttrs = (a) => Object.entries(a).map(([k, v]) => `${k}="${esc(v)}"`).join(" ");
    return `<svg ${toAttrs(attrs)}>${list(node[2], ([tag, a]) => `<${tag} ${toAttrs(a)}/>`)}</svg>`;
  }

  function initials(name) {
    return name
      .replace(/^(Mr|Ms|Mrs|Dr|Prof)\.?\s+/i, "")
      .split(/[\s.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  // size: "sm" | "md" | "portrait"
  function avatar(name, image, size = "md") {
    const inner = image
      ? `<img src="${esc(image)}" alt="${esc(name)}" loading="lazy" />`
      : `<span aria-hidden="true">${esc(initials(name))}</span>`;
    return `<div class="avatar avatar-${size}">${inner}</div>`;
  }

  /* ---------- Navbar ---------- */

  function renderNavbar() {
    $("#brand").innerHTML =
      (SITE.logo
        ? `<img src="${esc(SITE.logo)}" alt="" class="brand-logo" />`
        : `<span class="brand-mark" aria-hidden="true">${esc(SITE.name.charAt(0))}</span>`) +
      `<span class="brand-text">${esc(SITE.name)}</span>`;
    $("#nav-links").innerHTML = list(NAV_LINKS, (link) => `<a href="#${esc(link.id)}">${esc(link.label)}</a>`);
  }

  function initNavbar() {
    const header = $(".navbar");
    const toggle = $("#nav-toggle");
    const themeButton = $("#theme-toggle");
    const links = $$("#nav-links a");

    // Scrolled state: watch a 1px sentinel instead of listening to scroll events.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:16px;pointer-events:none;";
    document.body.prepend(sentinel);
    new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(
      sentinel
    );

    // Active link: the section currently in the middle of the viewport.
    const setActive = (id) =>
      links.forEach((a) => {
        const on = a.getAttribute("href") === `#${id}`;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    setActive(NAV_LINKS[0].id);
    const sections = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) sections.observe(el);
    });

    // Mobile menu.
    let open = false;
    const setOpen = (value) => {
      open = value;
      header.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = icon(open ? "X" : "Menu", 20);
    };
    setOpen(false);
    toggle.addEventListener("click", () => setOpen(!open));
    $$(".brand, .nav-links a", header).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => open && e.key === "Escape" && setOpen(false));

    // Light / dark theme that follows the OS until the visitor picks one.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const current = () => {
      const set = document.documentElement.dataset.theme;
      if (set === "light" || set === "dark") return set;
      return media.matches ? "dark" : "light";
    };
    const paintTheme = () => {
      const dark = current() === "dark";
      themeButton.innerHTML = icon(dark ? "Sun" : "Moon", 18);
      themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    };
    paintTheme();
    media.addEventListener("change", () => !document.documentElement.dataset.theme && paintTheme());
    themeButton.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Storage can be unavailable (private mode); the choice still applies for this visit.
      }
      paintTheme();
    });
  }

  function animateNavbar(mm) {
    mm.add(MOTION_OK, () => {
      // Page progress, scrubbed to the whole document.
      gsap.fromTo(
        ".scroll-progress",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
      );
      gsap.from(".navbar-inner", { y: -24, autoAlpha: 0, duration: 1.2, delay: 0.1 });
    });
  }

  /* ---------- Hero: face-landmark field ---------- */

  // Generative face-landmark field: an abstract take on the in-browser
  // MediaPipe face mesh used by the MCA component.
  function faceField() {
    const CX = 200;
    const CY = 236;

    const rng = (seed) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const outline = (k, n) => {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const chin = Math.max(0, -Math.cos(t)) ** 1.6;
        pts.push([CX + 118 * k * Math.sin(t) * (1 - 0.24 * chin), CY - 158 * k * Math.cos(t)]);
      }
      return pts;
    };
    const arc = (x0, x1, y, lift, n) => {
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const u = i / n;
        pts.push([x0 + (x1 - x0) * u, y - lift * Math.sin(Math.PI * u)]);
      }
      return pts;
    };
    const ring = (cx, cy, rx, ry, n) => {
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
      }
      return pts;
    };

    const FEATURES = [
      ...ring(156, 212, 24, 10, 14),
      ...ring(244, 212, 24, 10, 14),
      ...arc(126, 184, 186, 10, 7),
      ...arc(216, 274, 186, 10, 7),
      ...[0, 1, 2, 3, 4, 5].map((i) => [CX, 206 + i * 13]),
      ...arc(180, 220, 290, -7, 6),
      ...arc(164, 236, 334, 7, 8),
      ...arc(164, 236, 334, -14, 8).slice(1, -1),
    ];
    const IRIS = [
      [156, 212],
      [244, 212],
    ];
    const INTERIOR = [];
    const rand = rng(42);
    for (let y = 92; y < 388; y += 17) {
      for (let x = 92; x < 308; x += 17) {
        const px = x + (rand() - 0.5) * 11;
        const py = y + (rand() - 0.5) * 11;
        const dy = (py - CY) / 158;
        const chin = dy > 0 ? 1 - 0.24 * dy ** 1.6 : 1;
        const inside = ((px - CX) / (118 * chin)) ** 2 + dy ** 2 < 0.62;
        const clear = FEATURES.every(([fx, fy]) => Math.hypot(px - fx, py - fy) > 15);
        if (inside && clear) INTERIOR.push([px, py]);
      }
    }
    const CONTOURS = [outline(1, 64), outline(0.9, 52), outline(0.8, 44)];
    const POINTS = [...CONTOURS.flat(), ...FEATURES, ...INTERIOR];

    // Thin wireframe: link each point to its three nearest neighbours.
    const inner = [...FEATURES, ...INTERIOR, ...CONTOURS[2]];
    const seen = new Set();
    const EDGES = [];
    inner.forEach((p, i) => {
      inner
        .map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])])
        .filter(([j, d]) => j !== i && d < 30)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3)
        .forEach(([j]) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            EDGES.push([p, inner[j]]);
          }
        });
    });

    const toPath = (pts, close) =>
      pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + (close ? "Z" : "");

    return `
      <svg viewBox="0 0 400 480" class="face-field" role="img" aria-label="Face landmark tracking illustration">
        <defs>
          <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--accent)" stop-opacity="0" />
            <stop offset="0.85" stop-color="var(--accent)" stop-opacity="0.18" />
            <stop offset="1" stop-color="var(--accent)" stop-opacity="0.6" />
          </linearGradient>
          <clipPath id="frame"><rect x="40" y="40" width="320" height="400" rx="6" /></clipPath>
        </defs>
        <g class="ff-brackets">
          <path d="M40 76V40h36" />
          <path d="M324 40h36v36" />
          <path d="M360 404v36h-36" />
          <path d="M76 440H40v-36" />
        </g>
        <g class="ff-mesh">
          ${list(CONTOURS, (c) => `<path d="${toPath(c, true)}" class="ff-contour" />`)}
          ${list(EDGES, ([a, b]) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="ff-edge" />`)}
          ${list(
            POINTS,
            ([x, y], i) =>
              `<circle cx="${x}" cy="${y}" r="1.6" class="ff-dot" data-d="${Math.hypot(x - CX, y - 250).toFixed(0)}" style="--i:${i % 24}" />`
          )}
          <g class="ff-irises">${list(IRIS, ([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" class="ff-iris" />`)}</g>
        </g>
        <g clip-path="url(#frame)">
          <rect class="ff-scan" x="40" y="-60" width="320" height="100" fill="url(#scan)" />
        </g>
      </svg>`;
  }

  /* ---------- Hero ---------- */

  function renderHero() {
    $("#hero-eyebrow").textContent = `${SITE.projectId} · ${SITE.researchGroup}`;
    $("#hero-sub").textContent = SITE.tagline;

    const actions = [`<a href="#components" class="btn btn-primary">Explore the research ${icon("ArrowRight", 18)}</a>`];
    if (SITE.links.demo) {
      actions.push(`<a href="${esc(SITE.links.demo)}" class="btn btn-ghost" ${EXTERNAL}>${icon("Globe", 18)} Live platform</a>`);
    }
    actions.push(
      SITE.links.github
        ? `<a href="${esc(SITE.links.github)}" class="btn btn-ghost" ${EXTERNAL}>${icon("Github", 18)} Source</a>`
        : `<a href="#team" class="btn btn-ghost">Meet the team</a>`
    );
    $("#hero-actions").innerHTML = actions.join("");

    $("#hero-visual").insertAdjacentHTML(
      "afterbegin",
      SITE.heroImage
        ? `<img src="${esc(SITE.heroImage)}" alt="${esc(SITE.name)} platform" class="hero-image" />`
        : `<div class="hero-stage"><div class="hero-canvas">${faceField()}</div></div>`
    );

    $("#hero-facts").innerHTML = `
      <div class="hero-title">
        ${icon("ArrowDownRight", 28, { class: "hero-title-icon" })}
        <div>
          <p>${esc(SITE.fullTitle)}</p>
          <span>${esc(SITE.institution)}, ${esc(SITE.year)}</span>
        </div>
      </div>
      <dl class="stats">
        ${list(HERO_STATS, (stat) => `<div class="stat"><dt>${esc(stat.label)}</dt><dd>${esc(stat.value)}</dd></div>`)}
      </dl>`;
  }

  // Counts the numeric part of a stat up from zero ("<200ms" keeps its prefix and suffix).
  function countUp(el) {
    const match = el.textContent.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return gsap.from(el, { autoAlpha: 0, y: 12, duration: 0.8 });
    const [, prefix, number, suffix] = match;
    const value = { n: 0 };
    return gsap.to(value, {
      n: Number(number),
      duration: 1.6,
      ease: "power3.out",
      onUpdate: () => (el.textContent = `${prefix}${Math.round(value.n)}${suffix}`),
    });
  }

  function animateHero(mm) {
    const root = $("#home");
    const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    mm.add(MOTION_OK, () => {
      // Headline: words rise out of line masks. Re-runs on re-split after fonts load.
      SplitText.create($("h1", root), {
        ...SPLIT_CLASSES,
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => gsap.from(self.words, { yPercent: 115, duration: 1.3, stagger: 0.07, delay: 0.35 }),
      });

      const eyebrow = $(".hero-eyebrow", root);
      gsap
        .timeline({ defaults: { duration: 1.1 } })
        .to(
          eyebrow,
          {
            duration: 1.4,
            scrambleText: { text: eyebrow.textContent, chars: SCRAMBLE_CHARS, revealDelay: 0.25, speed: 0.6 },
          },
          0.15
        )
        .from(".hero-sub", { y: 24, autoAlpha: 0 }, 0.8)
        .from(".hero-actions .btn", { y: 24, autoAlpha: 0, stagger: 0.08 }, 0.95)
        // The face mesh assembles itself: frame, contours, landmarks, then the eyes.
        .from(".hero-canvas", { scale: 0.94, autoAlpha: 0, duration: 1.4 }, 0.2)
        .from(".ff-brackets path", { drawSVG: 0, duration: 0.9, ease: "power3.inOut" }, 0.6)
        .from(".ff-contour", { drawSVG: "50% 50%", duration: 1.6, stagger: 0.12, ease: "power3.inOut" }, 0.7)
        .from(
          ".ff-dot",
          {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.6,
            ease: "back.out(3)",
            stagger: (i, el) => Number(el.dataset.d) * 0.006,
          },
          0.9
        )
        .from(".ff-edge", { autoAlpha: 0, duration: 0.8, stagger: { each: 0.002, from: "random" } }, 1.3)
        .from(".ff-iris", { scale: 0, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.45)", duration: 1.4 }, 2)
        .from(".hero-visual figcaption", { autoAlpha: 0, y: 10 }, 2.2);

      // Scroll away: copy and visual drift at different speeds.
      const scrub = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-copy", { yPercent: -18, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-visual", { yPercent: -8, ease: "none", scrollTrigger: { ...scrub } });

      // Stats count up the first time they come into view.
      const stats = gsap.timeline({ scrollTrigger: { trigger: ".stats", start: "top 92%", toggleActions: PLAY_ONCE } });
      gsap.utils.toArray(".stat dd", root).forEach((el, i) => stats.add(countUp(el), i * 0.12));
    });

    // Pointer: the eyes keep "eye contact" with the cursor, the card tilts, CTAs are magnetic.
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const canvas = $(".hero-canvas", root);
      const irises = $(".ff-irises", root);
      if (!canvas || !irises) return;

      const eyeX = gsap.quickTo(irises, "x", { duration: 0.5, ease: "power3" });
      const eyeY = gsap.quickTo(irises, "y", { duration: 0.5, ease: "power3" });
      const tiltX = gsap.quickTo(canvas, "rotationX", { duration: 1, ease: "power3" });
      const tiltY = gsap.quickTo(canvas, "rotationY", { duration: 1, ease: "power3" });

      const onMove = (e) => {
        const r = canvas.getBoundingClientRect();
        const dx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2));
        const dy = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2));
        eyeX(dx * 7);
        eyeY(dy * 4);
        tiltY(dx * 6);
        tiltX(-dy * 6);
      };
      window.addEventListener("pointermove", onMove);

      const handlers = gsap.utils.toArray(".hero-actions .btn", root).map((btn) => {
        const x = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3" });
        const y = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3" });
        const move = (e) => {
          const r = btn.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * 0.3);
          y((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        return { btn, move, leave };
      });

      return () => {
        window.removeEventListener("pointermove", onMove);
        handlers.forEach(({ btn, move, leave }) => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      };
    });
  }

  /* ---------- Domain ---------- */

  function cell(value) {
    if (value === true) return `<span class="mark yes">${icon("Check", 16)}</span>`;
    if (value === "partial") return `<span class="mark partial">${icon("Minus", 16)}</span>`;
    return `<span class="mark no">${icon("X", 16)}</span>`;
  }

  const DOMAIN_PANELS = {
    literature: () => `
      <blockquote class="statement">${esc(LITERATURE_SURVEY.intro)}</blockquote>
      <div class="panel-grid">
        ${list(
          LITERATURE_SURVEY.cards,
          (card) => `
          <article class="panel-card">
            <div class="card-icon">${icon(card.icon, 20)}</div>
            <h4>${esc(card.title)}</h4>
            <p>${esc(card.body)}</p>
          </article>`
        )}
      </div>`,

    gap: () => {
      const { intro, points, comparisonColumns, comparisonRows } = RESEARCH_GAP;
      const table = comparisonRows.length
        ? `
        <div class="table-wrap">
          <table class="compare">
            <thead>
              <tr><th>System</th>${list(comparisonColumns, (col) => `<th>${esc(col)}</th>`)}</tr>
            </thead>
            <tbody>
              ${list(
                comparisonRows,
                (row) => `
                <tr class="${row.highlight ? "highlight" : ""}">
                  <th scope="row">${esc(row.system)}</th>
                  ${list(row.values, (v) => `<td>${cell(v)}</td>`)}
                </tr>`
              )}
            </tbody>
          </table>
          <p class="legend">${cell(true)} Supported ${cell("partial")} Partial ${cell(false)} Not supported</p>
        </div>`
        : "";
      return `
        <blockquote class="statement">${esc(intro)}</blockquote>
        <ol class="numbered">${list(points, (point, i) => `<li><span>${pad(i + 1)}</span>${esc(point)}</li>`)}</ol>
        ${table}`;
    },

    problem: () => `
      <blockquote class="statement">${esc(RESEARCH_PROBLEM.statement)}</blockquote>
      <div class="panel-grid">
        ${list(
          RESEARCH_PROBLEM.subProblems,
          (item) => `<article class="panel-card"><h4>${esc(item.title)}</h4><p>${esc(item.body)}</p></article>`
        )}
      </div>`,

    objectives: () => `
      <blockquote class="statement">${esc(OBJECTIVES.main)}</blockquote>
      <div class="panel-grid">
        ${list(
          OBJECTIVES.specific,
          (item, i) => `
          <article class="panel-card card-numbered">
            <span class="num">${pad(i + 1)}</span>
            <div><h4>${esc(item.title)}</h4><p>${esc(item.body)}</p></div>
          </article>`
        )}
      </div>`,

    methodology: () => `
      <blockquote class="statement">${esc(METHODOLOGY.intro)}</blockquote>
      <ol class="steps">
        ${list(
          METHODOLOGY.steps,
          (step, i) => `
          <li>
            <span class="step-num">${pad(i + 1)}</span>
            <div><h4>${esc(step.title)}</h4><p>${esc(step.body)}</p></div>
          </li>`
        )}
      </ol>
      ${
        METHODOLOGY.architectureImage
          ? `<figure class="figure">
              <img src="${esc(METHODOLOGY.architectureImage)}" alt="${esc(METHODOLOGY.architectureCaption)}" loading="lazy" />
              <figcaption>${esc(METHODOLOGY.architectureCaption)}</figcaption>
            </figure>`
          : ""
      }`,

    technologies: () => `
      ${typeof TECHNOLOGIES_INTRO === "string" && TECHNOLOGIES_INTRO ? `<blockquote class="statement">${esc(TECHNOLOGIES_INTRO)}</blockquote>` : ""}
      <div class="panel-grid">
        ${list(
          TECHNOLOGIES,
          (group) => `
          <article class="panel-card">
            <h4>${esc(group.group)}</h4>
            <ul class="chips">${list(group.items, (item) => `<li>${esc(item)}</li>`)}</ul>
          </article>`
        )}
      </div>`,
  };

  // Leaf blocks inside a panel, in reading order, for the tab-change stagger.
  const PANEL_ITEMS =
    ".panel-title, .statement, .panel-card, .numbered li, .steps li, .table-wrap, .figure";

  function initDomain() {
    const nav = $("#domain-nav");
    const indicator = $(".tab-indicator", nav);
    const panel = $("#domain-panel");

    nav.insertAdjacentHTML(
      "beforeend",
      list(
        DOMAIN_TABS,
        (t) => `
        <button type="button" id="domain-tab-${esc(t.id)}" role="tab" aria-controls="domain-panel">
          <span class="label"><strong>${esc(t.label)}</strong><small>${esc(t.blurb)}</small></span>
          ${icon("ChevronRight", 18, { class: "chev" })}
        </button>`
      )
    );
    const buttons = $$("button", nav);
    let index = -1;

    const placement = () => {
      const btn = buttons[index];
      return { x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight };
    };

    // The highlight glides to the selected tab, then the new panel's blocks cascade in.
    const select = (next, animate) => {
      if (next === index) return;
      index = next;
      const tab = DOMAIN_TABS[index];
      buttons.forEach((btn, i) => {
        const on = i === index;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-selected", String(on));
        btn.tabIndex = on ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", `domain-tab-${tab.id}`);
      const render = DOMAIN_PANELS[tab.id];
      panel.innerHTML = `<h3 class="panel-title">${esc(tab.label)}</h3>${render ? render() : ""}`;
      // The new panel has a different height, so scroll positions below need re-measuring.
      if (HAS_GSAP && animate) requestAnimationFrame(() => ScrollTrigger.refresh());

      if (!HAS_GSAP) return;
      if (!animate || !motionAllowed()) {
        gsap.set(indicator, placement());
        return;
      }
      gsap.to(indicator, { ...placement(), duration: 0.7, ease: "expo.out", overwrite: true });
      gsap.from(panel.querySelectorAll(`:is(${PANEL_ITEMS})`), { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.05 });
    };

    buttons.forEach((btn, i) => btn.addEventListener("click", () => select(i, true)));
    nav.addEventListener("keydown", (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = (index + step + DOMAIN_TABS.length) % DOMAIN_TABS.length;
      select(next, true);
      buttons[next].focus();
    });

    // Keep the highlight attached when the tab list reflows (breakpoints, font load).
    if (HAS_GSAP) new ResizeObserver(() => gsap.set(indicator, placement())).observe(nav);
    select(0, false);
  }

  function animateDomain(mm) {
    // The open panel's blocks cascade in every time the section scrolls into view, from either direction.
    mm.add(MOTION_OK, () => {
      const play = () =>
        gsap.fromTo(
          $$(`#domain-panel :is(${PANEL_ITEMS})`),
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.05, overwrite: true }
        );
      ScrollTrigger.create({
        trigger: "#domain-panel",
        start: "top 85%",
        end: "bottom 15%",
        onEnter: play,
        onEnterBack: play,
      });
    });
  }

  /* ---------- Research components ---------- */

  function renderComponents() {
    const loop = [...COACHING_LOOP, ...COACHING_LOOP, ...COACHING_LOOP];
    $("#loop-track").innerHTML = list(
      loop,
      (word, i) => `<span${i % 2 ? ' class="is-outline"' : ""}>${esc(word)}${icon("ArrowRight", 24, { class: "loop-arrow" })}</span>`
    );

    $("#component-index").innerHTML = list(
      RESEARCH_COMPONENTS,
      (c) => `<a href="#component-${esc(c.id)}">${icon(c.icon, 20)}<strong>${esc(c.code)}</strong><span>${esc(c.title)}</span></a>`
    );

    const membersById = Object.fromEntries(TEAM_MEMBERS.map((m) => [m.id, m]));
    $("#components-list").innerHTML = list(RESEARCH_COMPONENTS, (c) => {
      const member = membersById[c.memberId];
      return `
        <article id="component-${esc(c.id)}" class="component">
          <div class="component-aside">
            <span class="component-code" aria-hidden="true">${esc(c.code)}</span>
            <h3>${esc(c.title)}</h3>
            <p class="component-tagline">${esc(c.tagline)}</p>
            ${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy" class="component-image" />` : ""}
            ${
              member
                ? `<div class="owner">
                    ${avatar(member.name, member.image, "sm")}
                    <div><strong>${esc(member.name)}</strong><span>${esc(member.studentId)}</span></div>
                  </div>`
                : ""
            }
          </div>
          <div class="component-body">
            <p class="component-desc">${esc(c.description)}</p>
            <div class="novelty">
              ${icon("Lightbulb", 20)}
              <div><h4>Novelty</h4><p>${esc(c.novelty)}</p></div>
            </div>
            <h4 class="mini-title">Key features</h4>
            <ul class="features">${list(c.features, (f) => `<li>${esc(f)}</li>`)}</ul>
            <ul class="chips" aria-label="Technologies">${list(c.tech, (t) => `<li>${esc(t)}</li>`)}</ul>
          </div>
        </article>`;
    });
  }

  function animateComponents(mm) {
    const root = $("#components");
    mm.add(MOTION_OK, () => {
      // The coaching loop slides sideways with scroll, so the cycle reads as movement.
      gsap.fromTo(
        ".loop-track",
        { xPercent: 0 },
        {
          xPercent: -33.333,
          ease: "none",
          scrollTrigger: { trigger: ".loop-band", start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );

      gsap.utils.toArray(".component", root).forEach((row) => {
        // Code letters rise out of their masks as the row scrolls into place.
        const split = SplitText.create($(".component-code", row), { ...SPLIT_CLASSES, type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 105,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 88%", end: "top 40%", scrub: 0.8 },
        });

        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 72%", toggleActions: PLAY_ONCE } })
          .from($$(".component-aside > :not(.component-code)", row), { y: 28, autoAlpha: 0, stagger: 0.08 })
          .from($(".component-desc", row), { y: 28, autoAlpha: 0 }, 0.1)
          .from($(".novelty", row), { x: 48, autoAlpha: 0, duration: 1.2 }, 0.25)
          .from($$(".mini-title, .features li", row), { y: 16, autoAlpha: 0, stagger: 0.05 }, 0.4)
          .from(
            $$(".chips li", row),
            { scale: 0.6, autoAlpha: 0, stagger: 0.05, ease: "back.out(2.5)", duration: 0.7 },
            0.7
          );
      });
    });
  }

  /* ---------- Milestones ---------- */

  const DAY = 24 * 60 * 60 * 1000;
  const parseDate = (iso) => new Date(`${iso}T00:00:00`);
  const fmt = (iso) => parseDate(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  function dateLabel({ start, end }) {
    const year = start.slice(0, 4);
    return start === end ? `${fmt(start)} ${year}` : `${fmt(start)} - ${fmt(end)} ${year}`;
  }

  function today() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function countdown(iso) {
    const days = Math.round((parseDate(iso) - today()) / DAY);
    if (days <= 0) return "In progress";
    if (days === 1) return "Tomorrow";
    return `In ${days} days`;
  }

  function renderMilestones() {
    const items = MILESTONES.map((m) => ({
      ...m,
      status: m.status || (parseDate(m.end) < today() ? "completed" : "upcoming"),
    }));
    const done = items.filter((m) => m.status === "completed").length;
    const next = items.find((m) => m.status !== "completed");

    $("#progress").innerHTML = `
      <p class="progress-count">
        <strong>${done}</strong>
        <span>of ${items.length} milestones completed</span>
      </p>
      <div class="progress-segments" aria-hidden="true">${list(items, (m) => `<i class="${m.status}"></i>`)}</div>
      ${
        next
          ? `<div class="progress-next">
              <span>Next up</span>
              <strong>${esc(next.title)}</strong>
              <em>${esc(dateLabel(next))}. ${countdown(next.start)}</em>
            </div>`
          : ""
      }`;

    // Each milestone is a drop-down: the header (date, status, title) opens its details.
    // The next milestone starts open.
    $("#timeline").innerHTML = list(items, (m, i) => {
      const completed = m.status === "completed";
      const isNext = m === next;
      const status = completed ? "Completed" : isNext ? "Next" : "Upcoming";
      return `
        <li class="timeline-item ${m.status} ${isNext ? "is-next is-open" : ""}">
          <span class="timeline-line" aria-hidden="true"></span>
          <span class="timeline-dot" aria-hidden="true">${completed ? icon("Check", 13, { "stroke-width": 3 }) : ""}</span>
          <div class="timeline-body">
            <h3>
              <button type="button" class="timeline-toggle" id="milestone-${i}" aria-expanded="${isNext}" aria-controls="milestone-panel-${i}">
                <span>
                  <span class="timeline-meta">
                    <time datetime="${esc(m.start)}">${esc(dateLabel(m))}</time>
                    <span class="badge ${m.status}">${status}</span>
                  </span>
                  <span class="timeline-title">${esc(m.title)}</span>
                </span>
                <span class="chev">${icon("ChevronDown", 18)}</span>
              </button>
            </h3>
            <div class="timeline-panel" id="milestone-panel-${i}" role="region" aria-labelledby="milestone-${i}">
              <div>
                <p>${esc(m.description)}</p>
                <div class="timeline-details">
                  <span>Date: <strong>${esc(dateLabel(m))}</strong></span>
                  <span>Status: <strong>${status}</strong></span>
                  ${m.marks ? `<span>Marks: <strong>${esc(m.marks)}</strong></span>` : ""}
                </div>
              </div>
            </div>
          </div>
        </li>`;
    });

    return done;
  }

  function initMilestoneToggles() {
    const timeline = $("#timeline");
    const toggleAll = $("#timeline-toggle-all");
    const items = $$(".timeline-item", timeline);

    // Page height changes as panels open, so scroll animations below need re-measuring.
    let refreshTimer;
    const refreshScroll = () => {
      if (!HAS_GSAP) return;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 480);
    };

    const setOpen = (item, open) => {
      item.classList.toggle("is-open", open);
      $(".timeline-toggle", item).setAttribute("aria-expanded", String(open));
    };
    const paintToggleAll = () => {
      const allOpen = items.every((item) => item.classList.contains("is-open"));
      toggleAll.textContent = allOpen ? "Collapse all" : "Expand all";
      toggleAll.setAttribute("aria-pressed", String(allOpen));
    };

    items.forEach((item) =>
      $(".timeline-toggle", item).addEventListener("click", () => {
        setOpen(item, !item.classList.contains("is-open"));
        paintToggleAll();
        refreshScroll();
      })
    );
    toggleAll.addEventListener("click", () => {
      const open = !items.every((item) => item.classList.contains("is-open"));
      items.forEach((item) => setOpen(item, open));
      paintToggleAll();
      refreshScroll();
    });
    paintToggleAll();

    // Main drop-down: choosing a milestone opens it and scrolls it into view.
    const select = $("#milestone-select");
    $("#milestone-select-chev").innerHTML = icon("ChevronDown", 16);
    select.innerHTML =
      `<option value="">Jump to a milestone…</option>` +
      list(MILESTONES, (m, i) => `<option value="${i}">${esc(m.title)} · ${esc(dateLabel(m))}</option>`);
    select.addEventListener("change", () => {
      const item = items[Number(select.value)];
      select.value = "";
      if (!item) return;
      setOpen(item, true);
      paintToggleAll();
      const toggle = $(".timeline-toggle", item);
      // Wait for the panel to finish opening so the scroll lands in the right place.
      setTimeout(() => {
        if (HAS_GSAP) {
          ScrollTrigger.refresh();
          gsap.to(window, {
            duration: motionAllowed() ? 1 : 0,
            ease: "power3.inOut",
            scrollTo: { y: item, offsetY: 96, autoKill: true },
            onComplete: () => toggle.focus({ preventScroll: true }),
          });
        } else {
          item.scrollIntoView({ block: "start" });
          toggle.focus({ preventScroll: true });
        }
      }, motionAllowed() ? 460 : 0);
    });
  }

  function animateMilestones(mm, done) {
    const root = $("#milestones");
    mm.add(MOTION_OK, () => {
      // Summary card: the count ticks up while the segments fill in order.
      const count = $(".progress-count strong", root);
      const tally = { n: 0 };
      count.textContent = "0";
      gsap
        .timeline({ scrollTrigger: { trigger: ".progress", start: "top 85%", toggleActions: PLAY_ONCE } })
        .to(tally, {
          n: done,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => (count.textContent = Math.round(tally.n)),
        })
        .from(".progress-segments i", { scaleX: 0, transformOrigin: "left center", stagger: 0.07, duration: 0.8 }, 0)
        .from(".progress-next > *", { y: 14, autoAlpha: 0, stagger: 0.08 }, 0.5);

      // Each connector draws downwards as you scroll past its milestone.
      gsap.utils.toArray(".timeline-item", root).forEach((item) => {
        const line = $(".timeline-line", item);
        if (line) {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 65%", end: "bottom 65%", scrub: true },
          });
        }
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: "top 80%", toggleActions: PLAY_ONCE } })
          .from($(".timeline-dot", item), { scale: 0, ease: "back.out(3)", duration: 0.7 })
          .from($(".timeline-body", item), { x: 36, autoAlpha: 0 }, 0.1);
      });
    });
  }

  /* ---------- Documents ---------- */

  const DOC_ICONS = { Folder: "FolderOpen", Video: "Video", Repo: "Github" };

  function docCard(doc) {
    const available = Boolean(doc.link);
    const tag = available ? "a" : "div";
    const linkAttrs = available ? ` href="${esc(doc.link)}" ${EXTERNAL}` : "";
    const action = available
      ? `${esc(doc.type || "View")} ${icon("ArrowUpRight", 16)}`
      : `${icon("Clock", 14)} Coming soon`;
    return `
      <${tag} class="doc ${available ? "is-available" : "is-pending"}"${linkAttrs}>
        <span class="doc-icon">${icon(DOC_ICONS[doc.type] || "FileText", 20)}</span>
        <span class="doc-info"><strong>${esc(doc.title)}</strong><span>${esc(doc.description)}</span></span>
        <span class="doc-action">${action}</span>
      </${tag}>`;
  }

  function initDocuments() {
    const ALL = "All";
    const filters = $("#doc-filters");
    const groupsEl = $("#doc-groups");
    let filter = ALL;

    filters.innerHTML = list([ALL, ...DOCUMENT_GROUPS.map((g) => g.group)], (name) => `<button type="button">${esc(name)}</button>`);
    groupsEl.innerHTML = list(
      DOCUMENT_GROUPS,
      (group) => `
      <div class="doc-group reveal">
        <h3 class="doc-group-title">${esc(group.group)}<span>${group.items.length}</span></h3>
        <div class="doc-list">${list(group.items, docCard)}</div>
      </div>`
    );

    const buttons = $$("button", filters);
    const groups = $$(".doc-group", groupsEl);
    const paint = () => {
      buttons.forEach((btn) => {
        const on = btn.textContent === filter;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", String(on));
      });
      groups.forEach((el, i) => {
        el.style.display = filter === ALL || DOCUMENT_GROUPS[i].group === filter ? "" : "none";
      });
    };
    paint();

    // Record where every card is, apply the filter, then glide the survivors and fade the newcomers in.
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => {
        if (btn.textContent === filter) return;
        const targets = $$(".doc-group, .doc", groupsEl);
        const state = motionAllowed() ? Flip.getState(targets) : null;
        filter = btn.textContent;
        paint();
        if (!state) {
          if (HAS_GSAP) ScrollTrigger.refresh();
          return;
        }
        Flip.from(state, {
          targets,
          duration: 0.75,
          ease: "power3.inOut",
          nested: true,
          stagger: 0.015,
          onEnter: (els) =>
            gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.04, delay: 0.15 }),
          onComplete: () => ScrollTrigger.refresh(),
        });
      })
    );
  }

  /* ---------- Presentations ---------- */

  function renderPresentations() {
    $("#deck-grid").innerHTML = list(
      PRESENTATIONS,
      (p) => `
      <article class="deck">
        <div class="deck-thumb">
          ${
            p.thumbnail
              ? `<img src="${esc(p.thumbnail)}" alt="${esc(p.title)}" loading="lazy" />`
              : `<div class="deck-cover" aria-hidden="true">
                  <span>${esc(SITE.name)}</span>
                  <strong>${esc(p.title)}</strong>
                  <span>${esc(SITE.projectId)}</span>
                </div>`
          }
        </div>
        <div class="deck-body">
          <time>${esc(p.date)}</time>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          ${
            p.link
              ? `<a href="${esc(p.link)}" ${EXTERNAL} class="text-link">View slides ${icon("ArrowUpRight", 16)}</a>`
              : `<span class="text-link is-disabled">${icon("Clock", 14)} Coming soon</span>`
          }
        </div>
      </article>`
    );
  }

  function animatePresentations(mm) {
    // Decks rise in one after another the first time the grid scrolls into view.
    mm.add(MOTION_OK, () => {
      gsap.from("#deck-grid .deck", {
        y: 64,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: "#deck-grid", start: "top 85%", toggleActions: PLAY_ONCE },
      });
    });
  }

  /* ---------- Team ---------- */

  function socials(person, withEmail = true) {
    const links = [
      withEmail && person.email && { href: `mailto:${person.email}`, icon: "Mail", label: "Email" },
      person.linkedin && { href: person.linkedin, icon: "Linkedin", label: "LinkedIn" },
      person.github && { href: person.github, icon: "Github", label: "GitHub" },
    ].filter(Boolean);
    if (!links.length) return "";
    return `<div class="socials">${list(
      links,
      (l) =>
        `<a href="${esc(l.href)}" ${l.label === "Email" ? "" : EXTERNAL} aria-label="${esc(person.name)} ${l.label}" title="${esc(
          l.label === "Email" ? person.email : l.label
        )}">${icon(l.icon, 16)}</a>`
    )}</div>`;
  }

  function renderTeam() {
    $("#members").innerHTML = list(
      TEAM_MEMBERS,
      (m) => `
      <article class="member" data-member="${esc(m.id)}">
        ${avatar(m.name, m.image, "portrait")}
        <div class="member-body">
          <h3>${esc(m.name)}</h3>
          <p class="member-role">${esc(m.role)}</p>
          <p class="member-id">${esc(m.studentId)}</p>
          ${socials(m)}
        </div>
        <span class="member-plus" aria-hidden="true">${icon("Plus", 16)}</span>
        <button type="button" class="member-open" aria-haspopup="dialog" aria-label="Open profile of ${esc(m.name)}"></button>
      </article>`
    );

    $("#supervisors").innerHTML = list(
      SUPERVISORS,
      (s) => `
      <article class="member supervisor reveal">
        ${avatar(s.name, s.image, "portrait")}
        <div class="member-body">
          <h4>${esc(s.name)}</h4>
          <p class="member-role">${esc(s.role)}</p>
          <p class="member-id">${esc(s.affiliation)}</p>
          ${socials(s)}
        </div>
      </article>`
    );
  }

  function animateTeam(mm) {
    const root = $("#team");

    // The team comes together as equals: every card moves at the same moment, mirrored
    // (1st and 3rd rise, 2nd and 4th descend), meets in one row, then all portraits open together.
    mm.add({ desktop: "(min-width: 1025px)", motion: MOTION_OK }, ({ conditions }) => {
      if (!conditions.motion) return;
      const grid = $(".members", root);
      const cards = gsap.utils.toArray(".member", grid);
      const portraits = cards.map((card) => $(".avatar", card));
      const media = cards.map((card) => $(".avatar > img, .avatar > span", card));
      const text = (card) => $$(".member-body > *", card);

      if (conditions.desktop) {
        gsap
          .timeline({
            defaults: { ease: "power3.inOut" },
            scrollTrigger: { trigger: grid, start: "top 95%", end: "center 45%", scrub: 1 },
          })
          .from(cards, { y: (i) => (i % 2 ? -1 : 1) * 140, autoAlpha: 0, duration: 1 })
          .from(portraits, { clipPath: "inset(48% 0% 48% 0%)", duration: 0.9 }, 0.45)
          .from(media, { scale: 1.4, duration: 1.1, ease: "power2.out" }, 0.45)
          .from(
            cards.flatMap(text),
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.5,
              // Same rhythm inside every card, so all four finish together.
              stagger: (i, el) => [...el.parentElement.children].indexOf(el) * 0.06,
            },
            1.05
          );
        return;
      }

      // Smaller screens: each card tips up into place as it scrolls in.
      cards.forEach((card, i) => {
        gsap
          .timeline({ scrollTrigger: { trigger: card, start: "top 95%", end: "top 50%", scrub: 1 } })
          .from(card, {
            rotationX: 50,
            y: 80,
            transformPerspective: 900,
            transformOrigin: "50% 100%",
            autoAlpha: 0.2,
            ease: "power2.out",
          })
          .from(media[i], { scale: 1.4, ease: "power2.out" }, 0)
          .from(text(card), { y: 18, autoAlpha: 0, stagger: 0.1 }, 0.4);
      });
    });

    // Hover: the card tilts toward the pointer under a soft light, and initials decode.
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const offs = gsap.utils.toArray(".member", root).map((card) => {
        const initialsEl = $(".avatar > span", card);
        const label = initialsEl?.textContent;
        const onEnter = () => {
          if (!initialsEl) return;
          gsap.to(initialsEl, {
            duration: 0.7,
            overwrite: "auto",
            scrambleText: { text: label, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", speed: 0.8 },
          });
        };
        gsap.set(card, { transformPerspective: 900 });
        const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        const setX = gsap.quickSetter(card, "--mx", "%");
        const setY = gsap.quickSetter(card, "--my", "%");
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          tiltY((px - 0.5) * 12);
          tiltX((0.5 - py) * 12);
          setX(px * 100);
          setY(py * 100);
        };
        const onLeave = () => {
          tiltX(0);
          tiltY(0);
        };
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        return () => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => offs.forEach((off) => off());
    });
  }

  /* ---------- Profile dialog ---------- */

  const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  // Transform that makes the panel sit exactly over the card it was opened from.
  function overCard(card, panel) {
    const a = card.getBoundingClientRect();
    const b = panel.getBoundingClientRect();
    return {
      x: a.left + a.width / 2 - (b.left + b.width / 2),
      y: a.top + a.height / 2 - (b.top + b.height / 2),
      scaleX: a.width / b.width,
      scaleY: a.height / b.height,
    };
  }

  function profileMarkup(member, component) {
    const links = [
      member.github && { href: member.github, icon: "Github", label: "GitHub" },
      member.linkedin && { href: member.linkedin, icon: "Linkedin", label: "LinkedIn" },
      member.email && { href: `mailto:${member.email}`, icon: "Mail", label: "Email", text: member.email },
    ].filter(Boolean);

    return `
      <div class="profile-backdrop"></div>
      <div class="profile-panel">
        <div class="profile-inner">
          <div class="profile-photo">${avatar(member.name, member.image, "portrait")}</div>
          <div class="profile-info">
            <p class="profile-meta">
              ${component ? `<span class="profile-code">${esc(component.code)}</span>` : ""}
              <span>${esc(member.studentId)}</span>
            </p>
            <h3 id="profile-name" class="profile-name">${esc(member.name)}</h3>
            <p class="profile-role">${esc(member.role)}</p>
            ${component ? `<p class="profile-tagline">${esc(component.tagline)}</p>` : ""}
            <div class="profile-links">
              ${
                links.length
                  ? list(
                      links,
                      (l) => `
                      <a href="${esc(l.href)}" class="profile-link" ${l.label === "Email" ? 'rel="noreferrer"' : EXTERNAL}>
                        <span class="profile-link-icon">${icon(l.icon, 20)}</span>
                        <span class="profile-link-text">
                          <strong>${l.label}</strong>
                          <small>${esc(l.text || shortUrl(l.href))}</small>
                        </span>
                        ${icon("ArrowUpRight", 18, { class: "profile-link-arrow" })}
                      </a>`
                    )
                  : `<p class="profile-link profile-empty">Profile links will be added soon.</p>`
              }
            </div>
          </div>
          <button type="button" class="profile-close" aria-label="Close profile">${icon("X", 18)}</button>
        </div>
      </div>`;
  }

  // Profile pop-up for a team member. The card morphs into the panel, then the content builds in.
  function initProfileDialog() {
    const dialog = $("#profile-dialog");
    const q = HAS_GSAP ? gsap.utils.selector(dialog) : null;
    let origin = null;
    let openTl = null;
    let closing = false;

    const requestClose = () => {
      if (closing || !dialog.open) return;
      closing = true;
      const panel = $(".profile-panel", dialog);

      const finish = () => {
        dialog.close();
        dialog.innerHTML = "";
        document.documentElement.classList.remove("has-dialog");
        $(".member-open", origin)?.focus({ preventScroll: true });
      };

      if (!motionAllowed() || !origin) return finish();
      openTl?.progress(1);
      gsap
        .timeline({ onComplete: finish })
        .to(q(".profile-inner"), { autoAlpha: 0, duration: 0.2, ease: "power1.out" })
        .to(panel, { ...overCard(origin, panel), duration: 0.6, ease: "expo.inOut" }, 0.1)
        .to(q(".profile-backdrop"), { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 0.25);
    };

    const open = (member, card) => {
      origin = card;
      closing = false;
      openTl = null;
      const component = RESEARCH_COMPONENTS.find((c) => c.memberId === member.id);
      dialog.innerHTML = profileMarkup(member, component);
      $(".profile-backdrop", dialog).addEventListener("click", requestClose);
      $(".profile-close", dialog).addEventListener("click", requestClose);

      document.documentElement.classList.add("has-dialog");
      dialog.showModal();
      $(".profile-close", dialog).focus({ preventScroll: true });
      if (!motionAllowed()) return;

      const panel = $(".profile-panel", dialog);
      const name = SplitText.create($(".profile-name", dialog), { ...SPLIT_CLASSES, type: "words,chars", mask: "chars" });
      openTl = gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(q(".profile-backdrop"), { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 0)
        .from(panel, { ...overCard(origin, panel), duration: 0.85, ease: "expo.inOut" }, 0)
        .from(q(".profile-photo"), { clipPath: "inset(0% 0% 100% 0%)", duration: 1 }, 0.45)
        .from(q(".profile-photo > *"), { scale: 1.35, duration: 1.3 }, 0.45)
        .from(name.chars, { yPercent: 110, stagger: 0.02, duration: 0.8 }, 0.6)
        .from(q(".profile-meta, .profile-role, .profile-tagline"), { y: 16, autoAlpha: 0, stagger: 0.07, duration: 0.6 }, 0.65)
        .from(q(".profile-link"), { x: 40, autoAlpha: 0, stagger: 0.08, duration: 0.7 }, 0.8)
        .from(q(".profile-close"), { scale: 0, rotation: -90, duration: 0.6, ease: "back.out(2)" }, 0.7);
    };

    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      requestClose();
    });

    $$("#members .member").forEach((card) => {
      const member = TEAM_MEMBERS.find((m) => m.id === card.dataset.member);
      $(".member-open", card).addEventListener("click", () => open(member, card));
    });
  }

  /* ---------- Contact ---------- */

  function renderContact() {
    const root = $("#contact-inner");
    root.classList.toggle("contact-single", !CONTACT.email);

    const rows = `
      <div class="contact-rows reveal">
        ${CONTACT.email ? `<a href="mailto:${esc(CONTACT.email)}" class="contact-row">${icon("Mail", 20)}<span>${esc(CONTACT.email)}</span></a>` : ""}
        ${CONTACT.phone ? `<a href="tel:${esc(CONTACT.phone)}" class="contact-row">${icon("Phone", 20)}<span>${esc(CONTACT.phone)}</span></a>` : ""}
        <a href="${esc(CONTACT.mapLink)}" ${EXTERNAL} class="contact-row">
          ${icon("MapPin", 20)}
          <span>${esc(CONTACT.address)}</span>
          ${icon("ArrowUpRight", 18, { class: "contact-row-arrow" })}
        </a>
      </div>`;

    const form = `
      <form class="contact-form reveal">
        <div class="field">
          <label for="cf-name">Name</label>
          <input id="cf-name" name="name" autocomplete="name" required />
        </div>
        <div class="field">
          <label for="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autocomplete="email" required />
        </div>
        <div class="field">
          <label for="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="5" required></textarea>
          <small>Opens your email app with the message filled in.</small>
        </div>
        <button type="submit" class="btn btn-primary">Send message ${icon("Send", 17)}</button>
      </form>`;

    root.innerHTML = `
      <div class="contact-intro">
        <h2>${esc(CONTACT.heading)}</h2>
        <p>${esc(CONTACT.blurb)}</p>
        ${CONTACT.email ? rows : ""}
      </div>
      ${CONTACT.email ? form : rows}`;

    $(".contact-form", root)?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const name = data.get("name");
      const subject = encodeURIComponent(`${SITE.name} enquiry from ${name}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${name} (${data.get("email")})`);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    });
  }

  function animateContact(mm) {
    const root = $("#contact");
    // Closing headline: letters rise in a wave, then the supporting copy settles.
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".contact-intro", start: "top 80%", toggleActions: PLAY_ONCE } });
      SplitText.create($(".contact-intro h2", root), {
        ...SPLIT_CLASSES,
        type: "words, chars",
        mask: "words",
        autoSplit: true,
        onSplit: (self) => {
          const wave = gsap.from(self.chars, { yPercent: 110, rotation: 8, duration: 1.1, stagger: 0.035 });
          tl.add(wave, 0);
          return wave;
        },
      });
      tl.from(".contact-intro > p", { y: 24, autoAlpha: 0 }, 0.5);
    });
  }

  /* ---------- Footer ---------- */

  function renderFooter() {
    $("#footer").innerHTML = `
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="footer-wordmark">${esc(SITE.name)}</span>
          <p>${esc(SITE.fullTitle)}</p>
        </div>
        <div class="footer-cols">
          <div>
            <h4>Project</h4>
            <p>${esc(SITE.projectId)}</p>
            <p>${esc(SITE.researchGroup)}</p>
            ${SITE.links.demo ? `<a href="${esc(SITE.links.demo)}" ${EXTERNAL}>Live platform: ${esc(SITE.links.demo.replace(/^https?:\/\/|\/$/g, ""))}</a>` : ""}
          </div>
          <div>
            <h4>Institution</h4>
            <p>${esc(SITE.institution)}</p>
            <p>${esc(SITE.department)}</p>
          </div>
          <nav aria-label="Footer">
            <h4>Sections</h4>
            ${list(NAV_LINKS, (link) => `<a href="#${esc(link.id)}">${esc(link.label)}</a>`)}
          </nav>
        </div>
      </div>
      <div class="container footer-bottom">© ${esc(SITE.year)} ${esc(SITE.name)} research team. All rights reserved.</div>`;
  }

  function animateFooter(mm) {
    const root = $("#footer");
    mm.add(MOTION_OK, () => {
      const split = SplitText.create($(".footer-wordmark", root), { ...SPLIT_CLASSES, type: "chars", mask: "chars" });
      gsap.from(split.chars, {
        yPercent: 100,
        stagger: 0.04,
        duration: 1,
        scrollTrigger: { trigger: root, start: "top 90%", toggleActions: PLAY_ONCE },
      });
    });
  }

  /* ---------- Shared motion ---------- */

  function animateSectionHeaders(mm) {
    mm.add(MOTION_OK, () => {
      $$(".section-header").forEach((header) => {
        const eyebrow = $(".eyebrow", header);
        const sub = $(".section-sub", header);
        const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: "top 85%", toggleActions: PLAY_ONCE } });

        if (eyebrow) {
          tl.to(
            eyebrow,
            { duration: 1.1, scrambleText: { text: eyebrow.textContent, chars: "upperCase", revealDelay: 0.2, speed: 0.6 } },
            0
          );
        }
        if (sub) tl.from(sub, { y: 20, autoAlpha: 0 }, 0.35);

        // Lines rise out of masks; re-split (and re-synced) if fonts change the line breaks.
        SplitText.create($("h2", header), {
          ...SPLIT_CLASSES,
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            const rise = gsap.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 });
            tl.add(rise, 0.05);
            return rise;
          },
        });
      });
    });
  }

  function animateReveals(mm) {
    // Generic entrance for blocks marked `.reveal`, batched so neighbours stagger together.
    mm.add(MOTION_OK, () => {
      const blocks = $$(".reveal");
      gsap.set(blocks, { autoAlpha: 0, y: 48 });
      ScrollTrigger.batch(blocks, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09, overwrite: "auto" }),
      });
    });
  }

  // Smooth in-page navigation that lands below the floating navbar.
  function initSmoothLinks() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        duration: motionAllowed() ? 1.2 : 0,
        ease: "power3.inOut",
        scrollTo: { y: target, offsetY: hash === "#home" ? 0 : 72, autoKill: true },
      });
      history.replaceState(null, "", hash);
    });
  }

  /* ---------- Start ---------- */

  renderNavbar();
  renderHero();
  renderComponents();
  const milestonesDone = renderMilestones();
  renderPresentations();
  renderTeam();
  renderContact();
  renderFooter();

  initNavbar();
  initDomain();
  initMilestoneToggles();
  initDocuments();
  initProfileDialog();

  if (!HAS_GSAP) return;

  // Every animation is registered under MOTION_OK, so reduced-motion users get static content.
  const mm = gsap.matchMedia();
  animateNavbar(mm);
  animateHero(mm);
  animateSectionHeaders(mm);
  animateDomain(mm);
  animateComponents(mm);
  animateMilestones(mm, milestonesDone);
  animatePresentations(mm);
  animateTeam(mm);
  animateContact(mm);
  animateFooter(mm);
  animateReveals(mm);
  initSmoothLinks();

  // Web fonts change line breaks and section heights once loaded.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
