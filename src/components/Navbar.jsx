import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../constants/site.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { useScrolled } from "../hooks/useScrolled.js";
import { useTheme } from "../hooks/useTheme.js";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap.js";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const [theme, toggleTheme] = useTheme();
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Page progress, scrubbed to the whole document.
        gsap.fromTo(
          ".scroll-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          }
        );
        gsap.from(".navbar-inner", { y: -24, autoAlpha: 0, duration: 1.2, delay: 0.1 });
      });
    },
    { scope: root }
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header ref={root} className={`navbar ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <span className="scroll-progress" aria-hidden="true" />
      <div className="navbar-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          {SITE.logo ? (
            <img src={SITE.logo} alt="" className="brand-logo" />
          ) : (
            <span className="brand-mark" aria-hidden="true">E</span>
          )}
          <span className="brand-text">{SITE.name}</span>
        </a>

        <nav className="nav-links" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? "is-active" : ""}
              aria-current={active === link.id ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-tools">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-btn nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
