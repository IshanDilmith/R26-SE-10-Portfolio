import { useRef } from "react";
import { gsap, SplitText, SPLIT_CLASSES, useGSAP, MOTION_OK } from "../lib/gsap.js";

export default function SectionHeader({ eyebrow, title, subtitle }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const header = root.current;
        const eyebrowEl = header.querySelector(".eyebrow");
        const sub = header.querySelector(".section-sub");
        const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: "top 85%", once: true } });

        if (eyebrowEl) {
          tl.to(eyebrowEl, {
            duration: 1.1,
            scrambleText: { text: eyebrowEl.textContent, chars: "upperCase", revealDelay: 0.2, speed: 0.6 },
          }, 0);
        }
        if (sub) tl.from(sub, { y: 20, autoAlpha: 0 }, 0.35);

        // Lines rise out of masks; re-split (and re-synced) if fonts change the line breaks.
        SplitText.create(header.querySelector("h2"), {
          ...SPLIT_CLASSES,
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            const rise = gsap.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 });
            tl.add(rise, 0.05);
            return rise;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <header className="section-header" ref={root}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </header>
  );
}
