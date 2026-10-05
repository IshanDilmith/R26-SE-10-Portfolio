import { useRef } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import Icon from "./Icon.jsx";
import Avatar from "./Avatar.jsx";
import { RESEARCH_COMPONENTS } from "../constants/components.js";
import { TEAM_MEMBERS } from "../constants/team.js";
import { gsap, SplitText, SPLIT_CLASSES, useGSAP, MOTION_OK } from "../lib/gsap.js";

const membersById = Object.fromEntries(TEAM_MEMBERS.map((m) => [m.id, m]));
const LOOP = ["Assess", "Practise", "Coach", "Analyse", "Adapt"];

export default function ResearchComponents() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
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

        gsap.utils.toArray(".component", root.current).forEach((row) => {
          // Code letters rise out of their masks as the row scrolls into place.
          const split = SplitText.create(row.querySelector(".component-code"), { ...SPLIT_CLASSES, type: "chars", mask: "chars" });
          gsap.from(split.chars, {
            yPercent: 105,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 88%", end: "top 40%", scrub: 0.8 },
          });

          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 72%", once: true } })
            .from(row.querySelectorAll(".component-aside > :not(.component-code)"), {
              y: 28,
              autoAlpha: 0,
              stagger: 0.08,
            })
            .from(row.querySelector(".component-desc"), { y: 28, autoAlpha: 0 }, 0.1)
            .from(row.querySelector(".novelty"), { x: 48, autoAlpha: 0, duration: 1.2 }, 0.25)
            .from(row.querySelectorAll(".mini-title, .features li"), { y: 16, autoAlpha: 0, stagger: 0.05 }, 0.4)
            .from(row.querySelectorAll(".chips li"), {
              scale: 0.6,
              autoAlpha: 0,
              stagger: 0.05,
              ease: "back.out(2.5)",
              duration: 0.7,
            }, 0.7);
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="components" className="section" ref={root}>
    <div className="loop-band" aria-hidden="true">
        <div className="loop-track">
          {[...LOOP, ...LOOP, ...LOOP].map((word, i) => (
            <span key={i} className={i % 2 ? "is-outline" : ""}>
              {word}
              <ArrowRight className="loop-arrow" />
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <SectionHeader
          title="Four components, one coaching loop"
          subtitle="Each member owns one component. Together they form a loop: assess → practise → coach → analyse → adapt."
        />
      </div>

      <div className="container">
        <nav className="component-index reveal" aria-label="Research components">
          {RESEARCH_COMPONENTS.map((c) => (
            <a key={c.id} href={`#component-${c.id}`}>
              <Icon name={c.icon} size={20} />
              <strong>{c.code}</strong>
              <span>{c.title}</span>
            </a>
          ))}
        </nav>

        <div className="components">
          {RESEARCH_COMPONENTS.map((c) => {
            const member = membersById[c.memberId];
            return (
              <article key={c.id} id={`component-${c.id}`} className="component">
                <div className="component-aside">
                  <span className="component-code" aria-hidden="true">{c.code}</span>
                  <h3>{c.title}</h3>
                  <p className="component-tagline">{c.tagline}</p>
                  {c.image && <img src={c.image} alt={c.title} loading="lazy" className="component-image" />}
                  {member && (
                    <div className="owner">
                      <Avatar name={member.name} image={member.image} size="sm" />
                      <div>
                        <strong>{member.name}</strong>
                        <span>{member.studentId}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="component-body">
                  <p className="component-desc">{c.description}</p>
                  <div className="novelty">
                    <Lightbulb size={20} />
                    <div>
                      <h4>Novelty</h4>
                      <p>{c.novelty}</p>
                    </div>
                  </div>
                  <h4 className="mini-title">Key features</h4>
                  <ul className="features">
                    {c.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <ul className="chips" aria-label="Technologies">
                    {c.tech.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
