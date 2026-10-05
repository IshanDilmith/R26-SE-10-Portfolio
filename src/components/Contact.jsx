import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeader from "./SectionHeader.jsx";
import { CONTACT } from "../constants/contact.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`EmpowerZ enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader eyebrow="Contact" title={CONTACT.heading} subtitle={CONTACT.blurb} />
        <div className={`contact ${CONTACT.email ? "" : "contact-single"}`}>
          <div className="contact-info reveal">
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="contact-row">
                <Mail size={20} /><span>{CONTACT.email}</span>
              </a>
            )}
            {CONTACT.phone && (
              <a href={`tel:${CONTACT.phone}`} className="contact-row">
                <Phone size={20} /><span>{CONTACT.phone}</span>
              </a>
            )}
            <a href={CONTACT.mapLink} target="_blank" rel="noreferrer" className="contact-row">
              <MapPin size={20} /><span>{CONTACT.address}</span>
            </a>
          </div>

          {CONTACT.email && (
            <form className="contact-form reveal" onSubmit={submit}>
              <label>
                Name
                <input name="name" value={form.name} onChange={update} required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={update} required />
              </label>
              <label>
                Message
                <textarea name="message" rows={5} value={form.message} onChange={update} required />
              </label>
              <button type="submit" className="btn btn-primary">
                Send message <Send size={17} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
