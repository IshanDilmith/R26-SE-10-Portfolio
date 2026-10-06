import { useRef } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, X } from "lucide-react";
import Avatar from "./Avatar.jsx";
import { gsap, SplitText, SPLIT_CLASSES, useGSAP, motionAllowed } from "../lib/gsap.js";

const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Transform that makes the panel sit exactly over the card it was opened from.
function overCard(card, panel) {
  const a = card.getBoundingClientRect();
  const b = panel.getBoundingClientRect();
  return {
    x: a.left + a.width / 2 - (b.left + b.width / 2),
    y: a.top + a.height / 2 - (b.top + b.height / 2),
    scaleX: a.width / b.width,
    scaleY: a.height / b.height,
  };
}

// Profile pop-up for a team member. The card morphs into the panel, then the content builds in.
export default function ProfileDialog({ member, component, origin, onClosed }) {
  const dialog = useRef(null);
  const openTl = useRef(null);
  const closing = useRef(false);
  const { contextSafe } = useGSAP({ scope: dialog });

  useGSAP(
    () => {
      if (!member) return;
      const el = dialog.current;
      closing.current = false;
      document.documentElement.classList.add("has-dialog");
      el.showModal();
      el.querySelector(".profile-close").focus({ preventScroll: true });
      if (!motionAllowed() || !origin) return;

      const panel = el.querySelector(".profile-panel");
      const name = SplitText.create(el.querySelector(".profile-name"), { ...SPLIT_CLASSES, type: "words,chars", mask: "chars" });
      openTl.current = gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".profile-backdrop", { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, 0)
        .from(panel, { ...overCard(origin, panel), duration: 0.85, ease: "expo.inOut" }, 0)
        .from(".profile-photo", { clipPath: "inset(0% 0% 100% 0%)", duration: 1 }, 0.45)
        .from(".profile-photo > *", { scale: 1.35, duration: 1.3 }, 0.45)
        .from(name.chars, { yPercent: 110, stagger: 0.02, duration: 0.8 }, 0.6)
        .from(".profile-meta, .profile-role, .profile-tagline", { y: 16, autoAlpha: 0, stagger: 0.07, duration: 0.6 }, 0.65)
        .from(".profile-link", { x: 40, autoAlpha: 0, stagger: 0.08, duration: 0.7 }, 0.8)
        .from(".profile-close", { scale: 0, rotation: -90, duration: 0.6, ease: "back.out(2)" }, 0.7);
    },
    { dependencies: [member], scope: dialog, revertOnUpdate: true }
  );

  const requestClose = contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    const el = dialog.current;
    const panel = el.querySelector(".profile-panel");

    const finish = () => {
      el.close();
      gsap.set(el.querySelectorAll(".profile-backdrop, .profile-panel, .profile-inner"), {
        clearProps: "transform,opacity,visibility",
      });
      document.documentElement.classList.remove("has-dialog");
      origin?.querySelector(".member-open")?.focus({ preventScroll: true });
      onClosed();
    };

    if (!motionAllowed() || !origin) return finish();
    openTl.current?.progress(1);
    gsap
      .timeline({ onComplete: finish })
      .to(".profile-inner", { autoAlpha: 0, duration: 0.2, ease: "power1.out" })
      .to(panel, { ...overCard(origin, panel), duration: 0.6, ease: "expo.inOut" }, 0.1)
      .to(".profile-backdrop", { autoAlpha: 0, duration: 0.45, ease: "power2.inOut" }, 0.25);
  });

  const links = member
    ? [
        member.github && { href: member.github, icon: Github, label: "GitHub" },
        member.linkedin && { href: member.linkedin, icon: Linkedin, label: "LinkedIn" },
        member.email && { href: `mailto:${member.email}`, icon: Mail, label: "Email", text: member.email },
      ].filter(Boolean)
    : [];

  return (
    <dialog
      ref={dialog}
      className="profile-dialog"
      aria-labelledby="profile-name"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
    >
      {member && (
        <>
          <div className="profile-backdrop" onClick={requestClose} />
          <div className="profile-panel">
            <div className="profile-inner">
              <div className="profile-photo">
                <Avatar name={member.name} image={member.image} size="portrait" />
              </div>

              <div className="profile-info">
                <p className="profile-meta">
                  {component && <span className="profile-code">{component.code}</span>}
                  <span>{member.studentId}</span>
                </p>
                <h3 id="profile-name" className="profile-name">{member.name}</h3>
                <p className="profile-role">{member.role}</p>
                {component && <p className="profile-tagline">{component.tagline}</p>}

                <div className="profile-links">
                  {links.length ? (
                    links.map(({ href, icon: Icon, label, text }) => (
                      <a
                        key={label}
                        href={href}
                        className="profile-link"
                        target={label === "Email" ? undefined : "_blank"}
                        rel="noreferrer"
                      >
                        <span className="profile-link-icon"><Icon size={20} /></span>
                        <span className="profile-link-text">
                          <strong>{label}</strong>
                          <small>{text || shortUrl(href)}</small>
                        </span>
                        <ArrowUpRight size={18} className="profile-link-arrow" />
                      </a>
                    ))
                  ) : (
                    <p className="profile-link profile-empty">Profile links will be added soon.</p>
                  )}
                </div>
              </div>

              <button type="button" className="profile-close" aria-label="Close profile" onClick={requestClose}>
                <X size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
