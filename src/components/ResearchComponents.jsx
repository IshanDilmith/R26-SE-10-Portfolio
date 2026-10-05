import { Lightbulb } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import Icon from "./Icon.jsx";
import Avatar from "./Avatar.jsx";
import { RESEARCH_COMPONENTS } from "../constants/components.js";
import { TEAM_MEMBERS } from "../constants/team.js";

const membersById = Object.fromEntries(TEAM_MEMBERS.map((m) => [m.id, m]));

export default function ResearchComponents() {
  return (
    <section id="components" className="section section-tinted">
      <div className="container">
        <SectionHeader
          eyebrow="Research components"
          title="Four components, one coaching loop"
          subtitle="Each member owns one component. Together they form a loop: assess → practise → coach → analyse → adapt."
        />
        <div className="components">
          {RESEARCH_COMPONENTS.map((c) => {
            const member = membersById[c.memberId];
            return (
              <article key={c.id} className="component reveal" style={{ "--accent": c.accent }}>
                <div className="component-media">
                  {c.image ? (
                    <img src={c.image} alt={c.title} loading="lazy" />
                  ) : (
                    <div className="component-placeholder">
                      <Icon name={c.icon} size={44} strokeWidth={1.6} />
                      <span>{c.code}</span>
                    </div>
                  )}
                </div>
                <div className="component-body">
                  <span className="code-tag">{c.code}</span>
                  <h3>{c.title}</h3>
                  <p className="component-tagline">{c.tagline}</p>
                  <p>{c.description}</p>
                  <div className="novelty">
                    <Lightbulb size={18} />
                    <p><strong>Novelty:</strong> {c.novelty}</p>
                  </div>
                  <ul className="features">
                    {c.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <ul className="chips">
                    {c.tech.map((t) => <li key={t}>{t}</li>)}
                  </ul>
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
