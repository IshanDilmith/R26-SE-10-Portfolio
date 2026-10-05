import { Presentation, ExternalLink, Clock } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { PRESENTATIONS } from "../constants/presentations.js";

export default function Presentations() {
  return (
    <section id="presentations" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Presentations"
          title="Slide decks"
          subtitle="Slides from each assessment stage of the project."
        />
        <div className="grid grid-4">
          {PRESENTATIONS.map((p, i) => (
            <article key={p.title} className="slide-card reveal">
              <div className="slide-thumb">
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} loading="lazy" />
                ) : (
                  <div className="slide-placeholder">
                    <Presentation size={34} strokeWidth={1.6} />
                    <span>0{i + 1}</span>
                  </div>
                )}
              </div>
              <div className="slide-body">
                <time>{p.date}</time>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-link">
                    View slides <ExternalLink size={15} />
                  </a>
                ) : (
                  <span className="text-link disabled"><Clock size={15} /> Coming soon</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
