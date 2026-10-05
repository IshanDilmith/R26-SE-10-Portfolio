import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Plus } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import Avatar from "./Avatar.jsx";
import ProfileDialog from "./ProfileDialog.jsx";
import { SUPERVISORS, TEAM_MEMBERS } from "../constants/team.js";
import { RESEARCH_COMPONENTS } from "../constants/components.js";
import { gsap, useGSAP, MOTION_OK, FINE_POINTER } from "../lib/gsap.js";

function Socials({ person }) {
  const links = [
    person.email && { href: `mailto:${person.email}`, icon: Mail, label: "Email" },
    person.linkedin && { href: person.linkedin, icon: Linkedin, label: "LinkedIn" },
    person.github && { href: person.github, icon: Github, label: "GitHub" },
  ].filter(Boolean);
  if (!links.length) return null;
  return (
    <div className="socials">
      {links.map(({ href, icon: I, label }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${person.name} ${label}`}>
          <I size={16} />
        </a>
      ))}
    </div>
  );
}

const componentFor = (memberId) => RESEARCH_COMPONENTS.find((c) => c.memberId === memberId);

export default function Team() {
  const root = useRef(null);
  const [selected, setSelected] = useState(null);
  const origin = useRef(null);
  const member = TEAM_MEMBERS.find((m) => m.id === selected) ?? null;

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();

      // The team comes together as equals: every card moves at the same moment, mirrored
      // (1st and 3rd rise, 2nd and 4th descend), meets in one row, then all portraits open together.
      mm.add({ desktop: "(min-width: 1025px)", motion: MOTION_OK }, ({ conditions }) => {
        if (!conditions.motion) return;
        const grid = root.current.querySelector(".members");
        const cards = gsap.utils.toArray(".member", grid);
        const portraits = cards.map((card) => card.querySelector(".avatar"));
        const media = cards.map((card) => card.querySelector(".avatar > img, .avatar > span"));
        const text = (card) => card.querySelectorAll(".member-body > *");

        if (conditions.desktop) {
          gsap
            .timeline({
              defaults: { ease: "power3.inOut" },
              scrollTrigger: { trigger: grid, start: "top 95%", end: "center 45%", scrub: 1 },
            })
            .from(cards, { y: (i) => (i % 2 ? -1 : 1) * 140, autoAlpha: 0, duration: 1 })
            .from(portraits, { clipPath: "inset(48% 0% 48% 0%)", duration: 0.9 }, 0.45)
            .from(media, { scale: 1.4, duration: 1.1, ease: "power2.out" }, 0.45)
            .from(
              cards.flatMap((card) => [...text(card)]),
              {
                y: 20,
                autoAlpha: 0,
                duration: 0.5,
                // Same rhythm inside every card, so all four finish together.
                stagger: (i, el) => [...el.parentElement.children].indexOf(el) * 0.06,
              },
              1.05
            );
          return;
        }

        // Smaller screens: each card tips up into place as it scrolls in.
        cards.forEach((card, i) => {
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 95%", end: "top 50%", scrub: 1 } })
            .from(card, {
              rotationX: 50,
              y: 80,
              transformPerspective: 900,
              transformOrigin: "50% 100%",
              autoAlpha: 0.2,
              ease: "power2.out",
            })
            .from(media[i], { scale: 1.4, ease: "power2.out" }, 0)
            .from(text(card), { y: 18, autoAlpha: 0, stagger: 0.1 }, 0.4);
        });
      });

      // Hover: the card tilts toward the pointer under a soft light, and initials decode.
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const cards = gsap.utils.toArray(".member", root.current);
        const handlers = cards.map((card) => {
          const initials = card.querySelector(".avatar > span");
          const text = initials?.textContent;
          const onEnter = contextSafe(() => {
            if (!initials) return;
            gsap.to(initials, {
              duration: 0.7,
              overwrite: "auto",
              scrambleText: { text, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", speed: 0.8 },
            });
          });
          gsap.set(card, { transformPerspective: 900 });
          const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
          const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
          const setX = gsap.quickSetter(card, "--mx", "%");
          const setY = gsap.quickSetter(card, "--my", "%");
          const onMove = contextSafe((e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            tiltY((px - 0.5) * 12);
            tiltX((0.5 - py) * 12);
            setX(px * 100);
            setY(py * 100);
          });
          const onLeave = contextSafe(() => {
            tiltX(0);
            tiltY(0);
          });
          card.addEventListener("pointerenter", onEnter);
          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);
          return () => {
            card.removeEventListener("pointerenter", onEnter);
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          };
        });
        return () => handlers.forEach((off) => off());
      });
    },
    { scope: root }
  );

  return (
    <section id="team" className="section section-tinted" ref={root}>
      <div className="container">
        <SectionHeader
          eyebrow="About us"
          title="The team behind EmpowerZ"
          subtitle="Final year Software Engineering undergraduates at SLIIT."
        />

        <div className="members">
          {TEAM_MEMBERS.map((m) => (
            <article key={m.id} className="member">
              <Avatar name={m.name} image={m.image} size="portrait" />
              <div className="member-body">
                <h3>{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-id">{m.studentId}</p>
              </div>
              <span className="member-plus" aria-hidden="true">
                <Plus size={16} />
              </span>
              <button
                type="button"
                className="member-open"
                aria-haspopup="dialog"
                aria-label={`Open profile of ${m.name}`}
                onClick={(e) => {
                  origin.current = e.currentTarget.closest(".member");
                  setSelected(m.id);
                }}
              />
            </article>
          ))}
        </div>

        <h3 className="supervision-title reveal">Supervision</h3>
        <div className="supervisors">
          {SUPERVISORS.map((s) => (
            <article key={s.id} className="supervisor reveal">
              <Avatar name={s.name} image={s.image} size="md" />
              <div>
                <h4>{s.name}</h4>
                <p>
                  {s.role}, {s.affiliation}
                </p>
              </div>
              <Socials person={s} />
            </article>
          ))}
        </div>
      </div>
      <ProfileDialog
        member={member}
        component={member ? componentFor(member.id) : null}
        origin={origin.current}
        onClosed={() => setSelected(null)}
      />
    </section>
  );
}
