# EmpowerZ — Research Portfolio (R26-SE-010)

**Live site:** [empowerz.netlify.app](https://empowerz.netlify.app/)

[![Netlify](https://img.shields.io/badge/deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://empowerz.netlify.app/)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)

The portfolio website for the SLIIT 2026 final-year research project
**_Workplace Soft Skills Training and Feedback Platform for Gen Z Employees_**.

EmpowerZ is an AI-driven multimodal coach that watches, listens, role-plays and mentors, helping Gen Z
professionals build the soft skills the workplace expects. This repository holds the public site that
presents the research: domain, components, milestones, documents, presentations and team.

> This repository is the **portfolio website**, not the EmpowerZ platform itself.

---

## About the research

Gen Z employees are technically strong but often enter the workplace without the communication,
conflict-handling and emotional intelligence skills employers expect. Existing tools either teach
passively (video courses, quizzes) or require costly VR hardware, and none combine personalisation,
real-time non-verbal feedback, emotionally persistent role-play and unified analytics in a browser.

EmpowerZ addresses this with four research components:

| Code | Component | What it does |
|------|-----------|--------------|
| **APM** | Adaptive Pedagogical Module | Maps a learner's Big Five (OCEAN) personality to a teaching strategy, generates LLM training plans and adjusts difficulty dynamically. |
| **MCA** | Multimodal Communication Analysis | Tracks face landmarks in the browser (MediaPipe) and analyses voice prosody and emotion, fusing both into real-time coaching nudges, with no raw video leaving the browser. |
| **RPE** | Role-Play Simulation Engine | Voice-driven role-play with AI characters that keep emotional memory (trust, escalation, mood) across turns. |
| **FSPA** | Feedback System & Predictive Analytics | Builds a Skill-Twin profile, analyses peer-feedback sentiment, detects blind spots and generates mentoring recommendations. |

The project follows **Design Science Research (DSR)** and supports **SDG 4 (Quality Education)** and
**SDG 8 (Decent Work and Economic Growth)**.

## Site sections

- **Home**: project title, tagline and key figures
- **Domain**: literature survey, research gap (with comparison table), research problem, objectives, methodology and technologies
- **Components**: the four research components in detail
- **Milestones**: assessment timeline, with status worked out from the current date
- **Documents**: proposals, checklists, theses and the research paper
- **Presentations**: slide decks for each assessment
- **About Us**: team members and supervisors
- **Contact**: contact details and a `mailto:` contact form

## Team

**Supervision**

- Mr. Vishan Jayasinghearachchi — Supervisor, Faculty of Computing, SLIIT
- Ms. Kaushalya Rajapakse — Co-Supervisor, Faculty of Computing, SLIIT
- Dr. W. J. Stanley Fernando — External Supervisor

**Members**

| Name | Student ID | Component |
|------|------------|-----------|
| Ranasinghe S.D. | IT22135216 | Adaptive Pedagogical Module |
| Thilakarathna Y.I.D. | IT22137364 | Multimodal Communication Analysis |
| Thamel W.M.A. | IT22195234 | Role-Play Simulation Engine |
| Ambegoda A.L.A.S.K. | IT22208880 | Feedback System & Predictive Analytics |

Department of Software Engineering, Faculty of Computing, Sri Lanka Institute of Information Technology.

---

## Tech stack (website)

- **React 18** + **Vite 5**: client-side single-page app, no backend
- **GSAP** (ScrollTrigger, SplitText, ScrambleText, Flip) with `@gsap/react`: scroll and hover animations, all disabled under `prefers-reduced-motion`
- **lucide-react**: icons
- **Fontsource**: self-hosted Bricolage Grotesque, Geist and Geist Mono
- Plain CSS with design tokens and light/dark themes (`src/styles/global.css`)

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Editing content

All text, cards, links and image paths live in `src/constants/`, so you should not need to edit the components.

| File | Controls |
|------|----------|
| `site.js` | Project name, title, tagline, logo, hero image, hero stats, nav items, GitHub/demo links |
| `domain.js` | Literature survey, research gap (+ comparison table), problem, objectives, methodology, technologies |
| `components.js` | The four research component cards |
| `milestones.js` | Timeline dates, descriptions, optional marks |
| `documents.js` | Document groups and download links |
| `presentations.js` | Slide decks and thumbnails |
| `team.js` | Supervisors and members (photos, emails, LinkedIn, GitHub) |
| `contact.js` | Contact email, phone, address |

- **Images:** put files in `public/images/` and reference them as e.g. `image: "/images/team/ishan.jpg"`. `null` shows a placeholder.
- **Links:** an empty string `""` shows "Coming soon" (documents/slides) or hides the button/icon.
- **Milestone status** is worked out from today's date; force it with `status: "completed"`.
- **Contact form** opens the visitor's email app (`mailto:`) and only appears when `CONTACT.email` is set.

## Project structure

```
src/
├── components/   # One component per section (Hero, Domain, Team, …)
├── constants/    # All site content (edit these)
├── hooks/        # Active section, scroll state, theme
├── lib/gsap.js   # GSAP setup and shared motion helpers
└── styles/       # Global stylesheet and design tokens
public/images/    # Team photos and other static images
```

## Deployment

The site is deployed on **Netlify** at [empowerz.netlify.app](https://empowerz.netlify.app/).
`netlify.toml` sets the build command (`npm run build`), publish directory (`dist`) and the SPA
redirect. Any static host (Vercel, GitHub Pages) also works with the same build settings.

---

© 2026 EmpowerZ (R26-SE-010), Sri Lanka Institute of Information Technology.
