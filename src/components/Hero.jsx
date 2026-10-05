import { ArrowRight, Github, PlayCircle, Mic, Eye, Activity, GraduationCap, HeartHandshake } from "lucide-react";
import { HERO_STATS, SITE } from "../constants/site.js";

// Face-mesh style landmark dots for the illustrated camera feed.
const MESH = (() => {
  const pts = [];
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    pts.push([100 + Math.cos(a) * 52, 108 + Math.sin(a) * 66]);
  }
  for (const cx of [80, 120]) {
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      pts.push([cx + Math.cos(a) * 9, 96 + Math.sin(a) * 4.5]);
    }
  }
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    pts.push([82 + t * 36, 146 + Math.sin(t * Math.PI) * 7]);
  }
  for (let i = 0; i < 4; i++) pts.push([100, 104 + i * 8]);
  return pts;
})();

function PlatformPreview() {
  // Illustrative mock of a live coaching session, shown until a hero image is set.
  return (
    <div className="preview" aria-hidden="true">
      <div className="preview-window">
        <div className="preview-bar">
          <span /><span /><span />
          <em>Live session · Salary negotiation</em>
          <b className="rec">REC</b>
        </div>
        <div className="preview-cam">
          <svg viewBox="0 0 200 220" className="mesh">
            <path d="M38 30 V18 H50 M150 18 H162 V30 M162 190 V202 H150 M50 202 H38 V190" />
            {MESH.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" />)}
          </svg>
          <div className="nudge">
            <Activity size={14} /> Slow down a little · 172 wpm
          </div>
        </div>
        <div className="preview-meters">
          <div className="meter">
            <label><Eye size={13} /> Eye contact <b>78%</b></label>
            <div><i style={{ width: "78%" }} /></div>
          </div>
          <div className="meter">
            <label><Mic size={13} /> Vocal energy <b>62%</b></label>
            <div><i style={{ width: "62%" }} /></div>
          </div>
        </div>
      </div>

      <div className="float-card float-trust">
        <span className="float-icon"><HeartHandshake size={16} /></span>
        <div>
          <small>NPC trust</small>
          <strong>54%</strong>
        </div>
      </div>
      <div className="float-card float-chat">
        "I hear you. Let's look at the numbers together."
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <span className="hero-badge">
            <i className="live-dot" />
            {SITE.projectId}
            <span className="sep" />
            {SITE.researchGroup}
          </span>
          <h1>
            Soft skills, <span className="grad">coached by AI</span>, built for Gen Z.
          </h1>
          <p className="hero-title">{SITE.fullTitle}</p>
          <p className="hero-tagline">{SITE.tagline}</p>
          <div className="hero-actions">
            <a href="#components" className="btn btn-primary">
              Explore the research <ArrowRight size={18} />
            </a>
            {SITE.links.demo && (
              <a href={SITE.links.demo} className="btn btn-ghost" target="_blank" rel="noreferrer">
                <PlayCircle size={18} /> Live demo
              </a>
            )}
            {SITE.links.github && (
              <a href={SITE.links.github} className="btn btn-ghost" target="_blank" rel="noreferrer">
                <Github size={18} /> Source
              </a>
            )}
          </div>
          <p className="hero-meta">
            <GraduationCap size={16} /> {SITE.institution} · {SITE.year}
          </p>
        </div>

        <div className="hero-visual reveal">
          {SITE.heroImage ? (
            <img src={SITE.heroImage} alt={`${SITE.name} platform`} className="hero-image" />
          ) : (
            <PlatformPreview />
          )}
        </div>
      </div>

      <div className="container">
        <dl className="stats reveal">
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
