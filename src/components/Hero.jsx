import { ArrowRight, Github, PlayCircle, Mic, Eye, Activity } from "lucide-react";
import { HERO_STATS, SITE } from "../constants/site.js";

function PlatformPreview() {
  // Illustrative mock of a live coaching session, shown until a hero image is set.
  return (
    <div className="preview" aria-hidden="true">
      <div className="preview-window">
        <div className="preview-bar">
          <span /><span /><span />
          <em>Live session · Salary negotiation</em>
        </div>
        <div className="preview-body">
          <div className="preview-cam">
            <div className="face-ring">
              <div className="face" />
            </div>
            <div className="nudge">
              <Activity size={14} /> Slow down a little, 172 wpm
            </div>
          </div>
          <div className="preview-side">
            <div className="meter">
              <label><Eye size={13} /> Eye contact</label>
              <div><i style={{ width: "78%" }} /></div>
            </div>
            <div className="meter">
              <label><Mic size={13} /> Vocal energy</label>
              <div><i style={{ width: "62%" }} /></div>
            </div>
            <div className="meter">
              <label>NPC trust</label>
              <div><i className="warm" style={{ width: "54%" }} /></div>
            </div>
            <div className="chat-bubble">
              "I hear you. Let's look at the numbers together."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <span className="pill">
            {SITE.projectId} · {SITE.researchGroup}
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
