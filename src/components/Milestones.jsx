import { CheckCircle2, CircleDashed } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { MILESTONES } from "../constants/milestones.js";

const fmt = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function dateLabel({ start, end }) {
  const year = start.slice(0, 4);
  return start === end ? `${fmt(start)} ${year}` : `${fmt(start)} – ${fmt(end)} ${year}`;
}

function statusOf(m) {
  if (m.status) return m.status;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${m.end}T00:00:00`) < today ? "completed" : "upcoming";
}

export default function Milestones() {
  const items = MILESTONES.map((m) => ({ ...m, status: statusOf(m) }));
  const done = items.filter((m) => m.status === "completed").length;
  const progress = Math.round((done / items.length) * 100);

  return (
    <section id="milestones" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Milestones"
          title="Project timeline"
          subtitle="Key assessments of the 2026 research project, from proposal to publication."
        />

        <div className="progress reveal">
          <div className="progress-head">
            <span>{done} of {items.length} milestones completed</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
        </div>

        <ol className="timeline">
          {items.map((m) => (
            <li key={m.title} className={`timeline-item reveal ${m.status}`}>
              <span className="timeline-dot">
                {m.status === "completed" ? <CheckCircle2 size={20} /> : <CircleDashed size={20} />}
              </span>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <time>{dateLabel(m)}</time>
                  <span className={`badge ${m.status}`}>
                    {m.status === "completed" ? "Completed" : "Upcoming"}
                  </span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
                {m.marks && <p className="marks">Marks: <strong>{m.marks}</strong></p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
