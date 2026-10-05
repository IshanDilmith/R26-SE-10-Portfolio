// Generative face-landmark field: an abstract take on the in-browser
// MediaPipe face mesh used by the MCA component. Points are computed once.

const CX = 200;
const CY = 236;

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function outline(k, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const chin = Math.max(0, -Math.cos(t)) ** 1.6;
    pts.push([CX + 118 * k * Math.sin(t) * (1 - 0.24 * chin), CY - 158 * k * Math.cos(t)]);
  }
  return pts;
}

function arc(x0, x1, y, lift, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    pts.push([x0 + (x1 - x0) * u, y - lift * Math.sin(Math.PI * u)]);
  }
  return pts;
}

function ring(cx, cy, rx, ry, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return pts;
}

const FEATURES = [
  ...ring(156, 212, 24, 10, 14),
  ...ring(244, 212, 24, 10, 14),
  ...arc(126, 184, 186, 10, 7),
  ...arc(216, 274, 186, 10, 7),
  ...[0, 1, 2, 3, 4, 5].map((i) => [CX, 206 + i * 13]),
  ...arc(180, 220, 290, -7, 6),
  ...arc(164, 236, 334, 7, 8),
  ...arc(164, 236, 334, -14, 8).slice(1, -1),
];

const IRIS = [
  [156, 212],
  [244, 212],
];

const INTERIOR = (() => {
  const rand = rng(42);
  const pts = [];
  for (let y = 92; y < 388; y += 17) {
    for (let x = 92; x < 308; x += 17) {
      const px = x + (rand() - 0.5) * 11;
      const py = y + (rand() - 0.5) * 11;
      const dy = (py - CY) / 158;
      const chin = dy > 0 ? 1 - 0.24 * dy ** 1.6 : 1;
      const inside = ((px - CX) / (118 * chin)) ** 2 + dy ** 2 < 0.62;
      const clear = FEATURES.every(([fx, fy]) => Math.hypot(px - fx, py - fy) > 15);
      if (inside && clear) pts.push([px, py]);
    }
  }
  return pts;
})();

const CONTOURS = [outline(1, 64), outline(0.9, 52), outline(0.8, 44)];
const POINTS = [...CONTOURS.flat(), ...FEATURES, ...INTERIOR];

// Thin wireframe: link each point to its three nearest neighbours.
const EDGES = (() => {
  const inner = [...FEATURES, ...INTERIOR, ...CONTOURS[2]];
  const seen = new Set();
  const edges = [];
  inner.forEach((p, i) => {
    inner
      .map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])])
      .filter(([j, d]) => j !== i && d < 30)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3)
      .forEach(([j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([p, inner[j]]);
        }
      });
  });
  return edges;
})();

const toPath = (pts, close) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + (close ? "Z" : "");

export default function FaceField() {
  return (
    <svg viewBox="0 0 400 480" className="face-field" role="img" aria-label="Face landmark tracking illustration">
      <defs>
        <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="0.85" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.6" />
        </linearGradient>
        <clipPath id="frame">
          <rect x="40" y="40" width="320" height="400" rx="6" />
        </clipPath>
      </defs>

      <g className="ff-brackets">
        <path d="M40 76V40h36" />
        <path d="M324 40h36v36" />
        <path d="M360 404v36h-36" />
        <path d="M76 440H40v-36" />
      </g>

      <g className="ff-mesh">
        {CONTOURS.map((c, i) => (
          <path key={i} d={toPath(c, true)} className="ff-contour" />
        ))}
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="ff-edge" />
        ))}
        {POINTS.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.6"
            className="ff-dot"
            data-d={Math.hypot(x - CX, y - 250).toFixed(0)}
            style={{ "--i": i % 24 }}
          />
        ))}
        <g className="ff-irises">
          {IRIS.map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="4.5" className="ff-iris" />
          ))}
        </g>
      </g>

      <g clipPath="url(#frame)">
        <rect className="ff-scan" x="40" y="-60" width="320" height="100" fill="url(#scan)" />
      </g>
    </svg>
  );
}
