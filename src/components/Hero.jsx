import { useRef } from "react";
import { ArrowDownRight, ArrowRight, Github, PlayCircle } from "lucide-react";
import { HERO_STATS, SITE } from "../constants/site.js";
import { gsap, SplitText, SPLIT_CLASSES, useGSAP, MOTION_OK, FINE_POINTER } from "../lib/gsap.js";
import FaceField from "./FaceField.jsx";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

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

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Headline: words rise out of line masks. Re-runs on re-split after fonts load.
        SplitText.create(root.current.querySelector("h1"), {
          ...SPLIT_CLASSES,
          type: "lines, words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, { yPercent: 115, duration: 1.3, stagger: 0.07, delay: 0.35 }),
        });

        const eyebrow = root.current.querySelector(".hero-eyebrow");
        const tl = gsap.timeline({ defaults: { duration: 1.1 } });
        tl.to(eyebrow, {
          duration: 1.4,
          scrambleText: { text: eyebrow.textContent, chars: SCRAMBLE_CHARS, revealDelay: 0.25, speed: 0.6 },
        }, 0.15)
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
        const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-copy", { yPercent: -18, ease: "none", scrollTrigger: scrub });
        gsap.to(".hero-visual", { yPercent: -8, ease: "none", scrollTrigger: { ...scrub } });

        // Stats count up the first time they come into view.
        const stats = gsap.timeline({ scrollTrigger: { trigger: ".stats", start: "top 92%", once: true } });
        gsap.utils.toArray(".stat dd", root.current).forEach((el, i) => stats.add(countUp(el), i * 0.12));
      });

      // Pointer: the eyes keep "eye contact" with the cursor, the card tilts, CTAs are magnetic.
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const canvas = root.current.querySelector(".hero-canvas");
        const irises = root.current.querySelector(".ff-irises");
        if (!canvas || !irises) return;

        const eyeX = gsap.quickTo(irises, "x", { duration: 0.5, ease: "power3" });
        const eyeY = gsap.quickTo(irises, "y", { duration: 0.5, ease: "power3" });
        const tiltX = gsap.quickTo(canvas, "rotationX", { duration: 1, ease: "power3" });
        const tiltY = gsap.quickTo(canvas, "rotationY", { duration: 1, ease: "power3" });

        const onMove = contextSafe((e) => {
          const r = canvas.getBoundingClientRect();
          const dx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2));
          const dy = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2));
          eyeX(dx * 7);
          eyeY(dy * 4);
          tiltY(dx * 6);
          tiltX(-dy * 6);
        });
        window.addEventListener("pointermove", onMove);

        const buttons = gsap.utils.toArray(".hero-actions .btn", root.current);
        const handlers = buttons.map((btn) => {
          const x = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3" });
          const y = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3" });
          const move = contextSafe((e) => {
            const r = btn.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.3);
            y((e.clientY - (r.top + r.height / 2)) * 0.4);
          });
          const leave = contextSafe(() => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
          });
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
    },
    { scope: root }
  );

  return (
    <section id="home" className="hero" ref={root}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            {SITE.projectId} · {SITE.researchGroup}
          </p>
          <h1>
            Soft skills, <span className="accent">coached by AI,</span> built for Gen&nbsp;Z.
          </h1>
          <p className="hero-sub">{SITE.tagline}</p>
          <div className="hero-actions">
            <a href="#components" className="btn btn-primary">
              Explore the research <ArrowRight size={18} />
            </a>
            {SITE.links.demo && (
              <a href={SITE.links.demo} className="btn btn-ghost" target="_blank" rel="noreferrer">
                <PlayCircle size={18} /> Live demo
              </a>
            )}
            {SITE.links.github ? (
              <a href={SITE.links.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
                <Github size={18} /> Source
              </a>
            ) : (
              <a href="#team" className="btn btn-ghost">
                Meet the team
              </a>
            )}
          </div>
        </div>

        <figure className="hero-visual">
          {SITE.heroImage ? (
            <img src={SITE.heroImage} alt={`${SITE.name} platform`} className="hero-image" />
          ) : (
            <div className="hero-stage">
              <div className="hero-canvas">
                <FaceField />
              </div>
            </div>
          )}
          <figcaption>
            Face landmarks are tracked in the browser. No raw video leaves the device.
          </figcaption>
        </figure>
      </div>

      <div className="container hero-facts reveal">
        <div className="hero-title">
          <ArrowDownRight size={28} className="hero-title-icon" />
          <div>
            <p>{SITE.fullTitle}</p>
            <span>
              {SITE.institution}, {SITE.year}
            </span>
          </div>
        </div>
        <dl className="stats">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
