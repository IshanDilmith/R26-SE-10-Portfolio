import { useState } from "react";
import { Check, Minus, X } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import Icon from "./Icon.jsx";
import {
  DOMAIN_TABS,
  LITERATURE_SURVEY,
  RESEARCH_GAP,
  RESEARCH_PROBLEM,
  OBJECTIVES,
  METHODOLOGY,
  TECHNOLOGIES,
} from "../constants/domain.js";

function Literature() {
  return (
    <>
      <p className="lead">{LITERATURE_SURVEY.intro}</p>
      <div className="grid grid-3">
        {LITERATURE_SURVEY.cards.map((card) => (
          <article key={card.title} className="card">
            <div className="card-icon"><Icon name={card.icon} size={20} /></div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function Cell({ value }) {
  if (value === true) return <span className="mark yes"><Check size={16} /></span>;
  if (value === "partial") return <span className="mark partial"><Minus size={16} /></span>;
  return <span className="mark no"><X size={16} /></span>;
}

function Gap() {
  const { intro, points, comparisonColumns, comparisonRows } = RESEARCH_GAP;
  return (
    <>
      <p className="lead">{intro}</p>
      <ol className="numbered">
        {points.map((point, i) => (
          <li key={i}><span>{String(i + 1).padStart(2, "0")}</span>{point}</li>
        ))}
      </ol>
      {comparisonRows.length > 0 && (
        <div className="table-wrap">
          <table className="compare">
            <thead>
              <tr>
                <th>System</th>
                {comparisonColumns.map((col) => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.system} className={row.highlight ? "highlight" : ""}>
                  <th scope="row">{row.system}</th>
                  {row.values.map((v, i) => <td key={i}><Cell value={v} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="legend">
            <Cell value={true} /> Supported <Cell value="partial" /> Partial <Cell value={false} /> Not supported
          </p>
        </div>
      )}
    </>
  );
}

function Problem() {
  return (
    <>
      <blockquote className="statement">{RESEARCH_PROBLEM.statement}</blockquote>
      <div className="grid grid-2">
        {RESEARCH_PROBLEM.subProblems.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function Objectives() {
  return (
    <>
      <div className="main-objective">
        <span className="eyebrow">Main objective</span>
        <p>{OBJECTIVES.main}</p>
      </div>
      <div className="grid grid-2">
        {OBJECTIVES.specific.map((item, i) => (
          <article key={item.title} className="card card-numbered">
            <span className="num">{i + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Methodology() {
  return (
    <>
      <p className="lead">{METHODOLOGY.intro}</p>
      <ol className="steps">
        {METHODOLOGY.steps.map((step, i) => (
          <li key={step.title}>
            <span className="step-num">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      {METHODOLOGY.architectureImage && (
        <figure className="figure">
          <img src={METHODOLOGY.architectureImage} alt={METHODOLOGY.architectureCaption} loading="lazy" />
          <figcaption>{METHODOLOGY.architectureCaption}</figcaption>
        </figure>
      )}
    </>
  );
}

function Technologies() {
  return (
    <div className="grid grid-3">
      {TECHNOLOGIES.map((group) => (
        <article key={group.group} className="card">
          <h3>{group.group}</h3>
          <ul className="chips">
            {group.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}

const PANELS = {
  literature: Literature,
  gap: Gap,
  problem: Problem,
  objectives: Objectives,
  methodology: Methodology,
  technologies: Technologies,
};

export default function Domain() {
  const [tab, setTab] = useState(DOMAIN_TABS[0].id);
  const Panel = PANELS[tab];

  return (
    <section id="domain" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Research domain"
          title="Why this research matters"
          subtitle="The literature, the gap we found, and how we set out to close it."
        />
        <div className="tabs reveal" role="tablist">
          {DOMAIN_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? "is-active" : ""}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="tab-panel" role="tabpanel" key={tab}>
          <Panel />
        </div>
      </div>
    </section>
  );
}
