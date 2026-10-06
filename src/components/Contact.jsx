import { useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { CONTACT } from "../constants/contact.js";
import { gsap, SplitText, SPLIT_CLASSES, useGSAP, MOTION_OK } from "../lib/gsap.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const root = useRef(null);

  // Closing headline: letters rise in a wave, then the supporting copy settles.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ".contact-intro", start: "top 80%", once: true } });
        SplitText.create(root.current.querySelector(".contact-intro h2"), {
          ...SPLIT_CLASSES,
          type: "words, chars",
          mask: "words",
          autoSplit: true,
          onSplit: (self) => {
            const wave = gsap.from(self.chars, { yPercent: 110, rotation: 8, duration: 1.1, stagger: 0.035 });
            tl.add(wave, 0);
            return wave;
          },
        });
        tl.from(".contact-intro > p", { y: 24, autoAlpha: 0 }, 0.5);
      });
    },
    { scope: root }
  );

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`EmpowerZ enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const rows = (
    <div className="contact-rows reveal">
      {CONTACT.email && (
        <a href={`mailto:${CONTACT.email}`} className="contact-row">
          <Mail size={20} />
          <span>{CONTACT.email}</span>
        </a>
      )}
      {CONTACT.phone && (
        <a href={`tel:${CONTACT.phone}`} className="contact-row">
          <Phone size={20} />
          <span>{CONTACT.phone}</span>
        </a>
      )}
      <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="contact-row">
        <MapPin size={20} />
        <span>{CONTACT.address}</span>
        <ArrowUpRight size={18} className="contact-row-arrow" />
      </a>
    </div>
  );

  return (
    <section id="contact" className="section section-tinted contact-section" ref={root}>
      <div className={`container contact ${CONTACT.email ? "" : "contact-single"}`}>
        <div className="contact-intro">
          <h2>{CONTACT.heading}</h2>
          <p>{CONTACT.blurb}</p>
          {CONTACT.email && rows}
        </div>

        {!CONTACT.email && rows}
        {CONTACT.email && (
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" name="name" autoComplete="name" value={form.name} onChange={update} required />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" name="message" rows={5} value={form.message} onChange={update} required />
              <small>Opens your email app with the message filled in.</small>
            </div>
            <button type="submit" className="btn btn-primary">
              Send message <Send size={17} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
