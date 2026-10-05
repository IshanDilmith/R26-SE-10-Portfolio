import { NAV_LINKS, SITE } from "../constants/site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{SITE.name}</strong> · {SITE.projectId}
          <p>{SITE.institution}</p>
          <p>{SITE.department}</p>
        </div>
        <nav aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`}>{link.label}</a>
          ))}
        </nav>
      </div>
      <div className="container footer-bottom">
        © {SITE.year} {SITE.name} research team. All rights reserved.
      </div>
    </footer>
  );
}
