import { useRef, useState } from "react";
import { ArrowUpRight, Clock, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { DOCUMENT_GROUPS } from "../constants/documents.js";
import { gsap, Flip, ScrollTrigger, useGSAP, motionAllowed } from "../lib/gsap.js";

const ALL = "All";

export default function Documents() {
  const [filter, setFilter] = useState(ALL);
  const groups = filter === ALL ? DOCUMENT_GROUPS : DOCUMENT_GROUPS.filter((g) => g.group === filter);
  const root = useRef(null);
  const flipState = useRef(null);
  const { contextSafe } = useGSAP({ scope: root });

  // Record where every card is before React re-renders the filtered list...
  const choose = contextSafe((name) => {
    if (name === filter) return;
    if (motionAllowed()) flipState.current = Flip.getState(root.current.querySelectorAll(".doc-group, .doc"));
    setFilter(name);
  });

  // ...then glide the survivors to their new spots and fade the newcomers in.
  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      Flip.from(state, {
        targets: root.current.querySelectorAll(".doc-group, .doc"),
        duration: 0.75,
        ease: "power3.inOut",
        nested: true,
        stagger: 0.015,
        onEnter: (els) =>
          gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.04, delay: 0.15 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { dependencies: [filter], scope: root }
  );

  return (
    <section id="documents" className="section section-tinted" ref={root}>
      <div className="container">
        <SectionHeader
          title="Reports & submissions"
          subtitle="Proposals, checklists, theses and the research paper."
        />

        <div className="filters reveal" role="group" aria-label="Filter documents">
          {[ALL, ...DOCUMENT_GROUPS.map((g) => g.group)].map((name) => (
            <button
              key={name}
              className={filter === name ? "is-active" : ""}
              aria-pressed={filter === name}
              onClick={() => choose(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="doc-groups">
          {groups.map((group) => (
            <div key={group.group} className="doc-group reveal">
              <h3 className="doc-group-title">
                {group.group}
                <span>{group.items.length}</span>
              </h3>
              <div className="doc-list">
                {group.items.map((doc) => {
                  const available = Boolean(doc.link);
                  const Tag = available ? "a" : "div";
                  const linkProps = available ? { href: doc.link, target: "_blank", rel: "noreferrer" } : {};
                  return (
                    <Tag
                      key={doc.title}
                      className={`doc ${available ? "is-available" : "is-pending"}`}
                      {...linkProps}
                    >
                      <span className="doc-icon"><FileText size={20} /></span>
                      <span className="doc-info">
                        <strong>{doc.title}</strong>
                        <span>{doc.description}</span>
                      </span>
                      {available ? (
                        <span className="doc-action">
                          {doc.type || "View"} <ArrowUpRight size={16} />
                        </span>
                      ) : (
                        <span className="doc-action">
                          <Clock size={14} /> Coming soon
                        </span>
                      )}
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
