import { useRef, useState } from "react";
import { Check, ChevronRight, Minus, X } from "lucide-react";
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

const pad = (n) => String(n).padStart(2, "0");

function Literature() {
  return (
    <>
      <p className="lead">{LITERATURE_SURVEY.intro}</p>
      <div className="panel-grid">
        {LITERATURE_SURVEY.cards.map((card) => (
          <article key={card.title} className="panel-card">
            <div className="card-icon"><Icon name={card.icon} size={20} /></div>
            <h4>{card.title}</h4>
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
          <li key={i}><span>{pad(i + 1)}</span>{point}</li>
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
      <div className="panel-grid">
        {RESEARCH_PROBLEM.subProblems.map((item) => (
          <article key={item.title} className="panel-card">
            <h4>{item.title}</h4>
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
      <div className="panel-grid">
        {OBJECTIVES.specific.map((item, i) => (
          <article key={item.title} className="panel-card card-numbered">
            <span className="num">{i + 1}</span>
            <div>
              <h4>{item.title}</h4>
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
            <div>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
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
    <div className="panel-grid">
      {TECHNOLOGIES.map((group) => (
        <article key={group.group} className="panel-card">
          <h4>{group.group}</h4>
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
  const buttons = useRef([]);
  const index = DOMAIN_TABS.findIndex((t) => t.id === tab);
  const Panel = PANELS[tab];

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (index + step + DOMAIN_TABS.length) % DOMAIN_TABS.length;
    setTab(DOMAIN_TABS[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <section id="domain" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Research domain"
          title="Why this research matters"
          subtitle="The literature, the gap we found, and how we set out to close it."
        />
        <div className="domain reveal">
          <div className="domain-nav" role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {DOMAIN_TABS.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => (buttons.current[i] = el)}
                id={`domain-tab-${t.id}`}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls="domain-panel"
                tabIndex={tab === t.id ? 0 : -1}
                className={tab === t.id ? "is-active" : ""}
                onClick={() => setTab(t.id)}
              >
                <span className="idx">{pad(i + 1)}</span>
                <span className="label">
                  <strong>{t.label}</strong>
                  <small>{t.blurb}</small>
                </span>
                <ChevronRight size={16} className="chev" />
              </button>
            ))}
          </div>

          <div
            className="domain-panel"
            id="domain-panel"
            role="tabpanel"
            aria-labelledby={`domain-tab-${tab}`}
            key={tab}
          >
            <header className="panel-head">
              <span className="eyebrow">{pad(index + 1)} / {pad(DOMAIN_TABS.length)}</span>
              <h3>{DOMAIN_TABS[index].label}</h3>
            </header>
            <Panel />
          </div>
        </div>
      </div>
    </section>
  );
}
