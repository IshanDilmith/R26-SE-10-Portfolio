import { useRef } from "react";
import { NAV_LINKS, SITE } from "../constants/site.js";
import { gsap, SplitText, SPLIT_CLASSES, useGSAP, MOTION_OK } from "../lib/gsap.js";

export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(root.current.querySelector(".footer-wordmark"), {
          ...SPLIT_CLASSES,
          type: "chars",
          mask: "chars",
        });
        gsap.from(split.chars, {
          yPercent: 100,
          stagger: 0.04,
          duration: 1,
          scrollTrigger: { trigger: root.current, start: "top 90%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <footer className="footer" ref={root}>
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-wordmark">{SITE.name}</span>
          <p>{SITE.fullTitle}</p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Project</h4>
            <p>{SITE.projectId}</p>
            <p>{SITE.researchGroup}</p>
          </div>
          <div>
            <h4>Institution</h4>
            <p>{SITE.institution}</p>
            <p>{SITE.department}</p>
          </div>
          <nav aria-label="Footer">
            <h4>Sections</h4>
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`}>{link.label}</a>
            ))}
          </nav>
        </div>
      </div>
      <div className="container footer-bottom">
        © {SITE.year} {SITE.name} research team. All rights reserved.
      </div>
    </footer>
  );
}
