import { Mail, Linkedin, Github } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import Avatar from "./Avatar.jsx";
import { SUPERVISORS, TEAM_MEMBERS } from "../constants/team.js";

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
          <I size={17} />
        </a>
      ))}
    </div>
  );
}

function PersonCard({ person, subtitle, detail }) {
  return (
    <article className="person reveal">
      <Avatar name={person.name} image={person.image} />
      <h3>{person.name}</h3>
      <p className="person-role">{subtitle}</p>
      {detail && <p className="person-detail">{detail}</p>}
      <Socials person={person} />
    </article>
  );
}

export default function Team() {
  return (
    <section id="team" className="section section-tinted">
      <div className="container">
        <SectionHeader
          eyebrow="About us"
          title="The team behind EmpowerZ"
          subtitle="Final year Software Engineering undergraduates at SLIIT."
        />

        <h3 className="group-title center">Supervision</h3>
        <div className="people people-2">
          {SUPERVISORS.map((s) => (
            <PersonCard key={s.id} person={s} subtitle={s.role} detail={s.affiliation} />
          ))}
        </div>

        <h3 className="group-title center">Team members</h3>
        <div className="people people-4">
          {TEAM_MEMBERS.map((m) => (
            <PersonCard key={m.id} person={m} subtitle={m.role} detail={m.studentId} />
          ))}
        </div>
      </div>
    </section>
  );
}
