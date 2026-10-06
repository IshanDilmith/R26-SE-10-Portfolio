import { useRef } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { PRESENTATIONS } from "../constants/presentations.js";
import { SITE } from "../constants/site.js";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap.js";

export default function Presentations() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from(".deck", {
          y: 64,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: ".deck-stage", start: "top 85%", once: true },
        });
      });

      // Desktop: pin the decks and walk through them sideways as the page scrolls.
      mm.add(`(min-width: 1025px) and ${MOTION_OK}`, () => {
        const section = root.current;
        const stage = section.querySelector(".deck-stage");
        const rail = section.querySelector(".deck-rail");
        section.classList.add("is-panning");

        const distance = () => {
          const last = rail.lastElementChild;
          const padEnd = parseFloat(getComputedStyle(rail).paddingRight);
          return Math.max(0, last.offsetLeft + last.offsetWidth + padEnd - rail.clientWidth);
        };

        const pan = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            pin: true,
            start: "center center",
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Slides tilt and settle as they travel in from the right.
        gsap.utils.toArray(".deck", rail).forEach((deck) => {
          gsap.from(deck.querySelector(".deck-thumb"), {
            rotation: 5,
            yPercent: 10,
            scale: 0.88,
            ease: "none",
            scrollTrigger: {
              trigger: deck,
              containerAnimation: pan,
              start: "left right",
              end: "left 50%",
              scrub: true,
            },
          });
        });

        return () => section.classList.remove("is-panning");
      });
    },
    { scope: root }
  );

  return (
    <section id="presentations" className="section section-tinted presentations" ref={root}>
      <div className="container">
        <SectionHeader
          title="Slide decks"
          subtitle="Slides from each assessment stage of the project."
        />
      </div>
      <div className="deck-stage">
        <div className="deck-rail" tabIndex={0} aria-label="Slide decks, scroll horizontally">
          {PRESENTATIONS.map((p) => (
            <article key={p.title} className="deck">
              <div className="deck-thumb">
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} loading="lazy" />
                ) : (
                  <div className="deck-cover" aria-hidden="true">
                    <span>{SITE.name}</span>
                    <strong>{p.title}</strong>
                    <span>{SITE.projectId}</span>
                  </div>
                )}
              </div>
              <div className="deck-body">
                <time>{p.date}</time>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-link">
                    View slides <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="text-link is-disabled">
                    <Clock size={14} /> Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
