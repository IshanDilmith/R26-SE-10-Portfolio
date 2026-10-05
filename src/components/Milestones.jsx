import { useRef } from "react";
import { Check } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { MILESTONES } from "../constants/milestones.js";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap.js";

const DAY = 24 * 60 * 60 * 1000;
const parse = (iso) => new Date(`${iso}T00:00:00`);
const fmt = (iso) => parse(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function dateLabel({ start, end }) {
  const year = start.slice(0, 4);
  return start === end ? `${fmt(start)} ${year}` : `${fmt(start)} - ${fmt(end)} ${year}`;
}

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function statusOf(m) {
  if (m.status) return m.status;
  return parse(m.end) < today() ? "completed" : "upcoming";
}

function countdown(iso) {
  const days = Math.round((parse(iso) - today()) / DAY);
  if (days <= 0) return "In progress";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

export default function Milestones() {
  const items = MILESTONES.map((m) => ({ ...m, status: statusOf(m) }));
  const done = items.filter((m) => m.status === "completed").length;
  const next = items.find((m) => m.status !== "completed");
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Summary card: the count ticks up while the segments fill in order.
        const count = root.current.querySelector(".progress-count strong");
        const tally = { n: 0 };
        count.textContent = "0";
        gsap
          .timeline({ scrollTrigger: { trigger: ".progress", start: "top 85%", once: true } })
          .to(tally, {
            n: done,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => (count.textContent = Math.round(tally.n)),
          })
          .from(".progress-segments i", {
            scaleX: 0,
            transformOrigin: "left center",
            stagger: 0.07,
            duration: 0.8,
          }, 0)
          .from(".progress-next > *", { y: 14, autoAlpha: 0, stagger: 0.08 }, 0.5);

        // Each connector draws downwards as you scroll past its milestone.
        gsap.utils.toArray(".timeline-item", root.current).forEach((item) => {
          const line = item.querySelector(".timeline-line");
          if (line) {
            gsap.from(line, {
              scaleY: 0,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: { trigger: item, start: "top 65%", end: "bottom 65%", scrub: true },
            });
          }
          gsap
            .timeline({ scrollTrigger: { trigger: item, start: "top 80%", once: true } })
            .from(item.querySelector(".timeline-dot"), { scale: 0, ease: "back.out(3)", duration: 0.7 })
            .from(item.querySelector(".timeline-body"), { x: 36, autoAlpha: 0 }, 0.1);
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="milestones" className="section" ref={root}>
      <div className="container milestones">
        <div className="milestones-aside">
          <SectionHeader
            eyebrow="Milestones"
            title="Project timeline"
            subtitle="Key assessments of the 2026 research project, from proposal to publication."
          />
          <div className="progress">
            <p className="progress-count">
              <strong>{done}</strong>
              <span>of {items.length} milestones completed</span>
            </p>
            <div className="progress-segments" aria-hidden="true">
              {items.map((m) => (
                <i key={m.title} className={m.status} />
              ))}
            </div>
            {next && (
              <div className="progress-next">
                <span>Next up</span>
                <strong>{next.title}</strong>
                <em>
                  {dateLabel(next)}. {countdown(next.start)}
                </em>
              </div>
            )}
          </div>
        </div>

        <ol className="timeline">
          {items.map((m) => (
            <li
              key={m.title}
              className={`timeline-item ${m.status} ${m === next ? "is-next" : ""}`}
            >
              <span className="timeline-line" aria-hidden="true" />
              <span className="timeline-dot" aria-hidden="true">
                {m.status === "completed" && <Check size={13} strokeWidth={3} />}
              </span>
              <div className="timeline-body">
                <div className="timeline-meta">
                  <time dateTime={m.start}>{dateLabel(m)}</time>
                  <span className={`badge ${m.status}`}>
                    {m.status === "completed" ? "Completed" : m === next ? "Next" : "Upcoming"}
                  </span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                {m.marks && (
                  <p className="marks">
                    Marks <strong>{m.marks}</strong>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
