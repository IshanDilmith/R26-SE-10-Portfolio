function initials(name) {
  return name
    .replace(/^(Mr|Ms|Mrs|Dr|Prof)\.?\s+/i, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

// size: "sm" | "md" | "portrait"
export default function Avatar({ name, image, size = "md" }) {
  return (
    <div className={`avatar avatar-${size}`}>
      {image ? <img src={image} alt={name} loading="lazy" /> : <span aria-hidden="true">{initials(name)}</span>}
    </div>
  );
}
