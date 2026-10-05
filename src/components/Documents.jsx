import { useState } from "react";
import { FileText, Download, Clock } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { DOCUMENT_GROUPS } from "../constants/documents.js";

const ALL = "All";

export default function Documents() {
  const [filter, setFilter] = useState(ALL);
  const groups = filter === ALL ? DOCUMENT_GROUPS : DOCUMENT_GROUPS.filter((g) => g.group === filter);

  return (
    <section id="documents" className="section section-tinted">
      <div className="container">
        <SectionHeader
          eyebrow="Documents"
          title="Reports & submissions"
          subtitle="Proposals, checklists, theses and the research paper."
        />

        <div className="filters reveal">
          {[ALL, ...DOCUMENT_GROUPS.map((g) => g.group)].map((name) => (
            <button
              key={name}
              className={filter === name ? "is-active" : ""}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {groups.map((group) => (
          <div key={group.group} className="doc-group">
            <h3 className="group-title">{group.group}</h3>
            <div className="grid grid-3">
              {group.items.map((doc) => {
                const available = Boolean(doc.link);
                return (
                  <article key={doc.title} className={`doc-card ${available ? "" : "is-pending"}`}>
                    <div className="doc-icon"><FileText size={22} /></div>
                    <div className="doc-info">
                      <h4>{doc.title}</h4>
                      <p>{doc.description}</p>
                    </div>
                    {available ? (
                      <a href={doc.link} target="_blank" rel="noreferrer" className="doc-action">
                        <Download size={16} /> {doc.type || "View"}
                      </a>
                    ) : (
                      <span className="doc-action disabled"><Clock size={16} /> Coming soon</span>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
