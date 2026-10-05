export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="section-header reveal">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
