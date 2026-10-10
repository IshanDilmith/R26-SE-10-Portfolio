# EmpowerZ — Research Portfolio (R26-SE-010)

**Portfolio site:** [empowerz.netlify.app](https://empowerz.netlify.app/)  
**Live platform:** [empowerz.online](https://empowerz.online/)

[![Netlify](https://img.shields.io/badge/deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://empowerz.netlify.app/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
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
| **APM** | Adaptive Pedagogical Module | Turns a Big Five (OCEAN) profile, the measured baseline and session outcomes into a teaching strategy, a difficulty level and a scenario brief, using deterministic, auditable rules. |
| **MCA** | Multimodal Communication Analysis Module | Tracks face landmarks in the browser (MediaPipe) and analyses voice with librosa and a wav2vec 2.0 emotion model, returning prioritised real-time nudges and four communication scores, with no video leaving the browser. |
| **RPE** | Role-Play Simulation Engine | Voice-driven role-play with a lip-synced 3D avatar character, where deterministic code tracks trust and escalation. |
| **FSPA** | Feedback System & Predictive Analytics | Compares self-ratings with measured scores to detect blind spots, forecasts trends, reads reflections with DistilBERT and generates safe mentoring advice. |

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
| Thilakarathna Y.I.D. | IT22137364 | Multimodal Communication Analysis Module |
| Thamel W.M.A. | IT22195234 | Role-Play Simulation Engine |
| Ambegoda A.L.A.S.K. | IT22208880 | Feedback System & Predictive Analytics |

Department of Software Engineering, Faculty of Computing, Sri Lanka Institute of Information Technology.

---

## Tech stack (website)

- Plain **HTML**, **CSS** and vanilla **JavaScript**: static site, no build step, no backend
- **GSAP 3.15** (ScrollTrigger, SplitText, ScrambleText, DrawSVG, Flip): scroll and hover animations, all disabled under `prefers-reduced-motion`
- **Lucide 0.460**: icons
- **Self-hosted fonts**: Bricolage Grotesque, Geist and Geist Mono
- Every library and font is stored in the repo (`js/vendor/`, `fonts/`), so the site works fully offline with no CDN
- CSS design tokens and light/dark themes (`css/style.css`)

## Getting started

No install or build needed. Open `index.html` in a browser, or serve the folder locally:

```bash
npx serve .                 # or
python -m http.server 5173  # http://localhost:5173
```

## Editing content

All text, cards, links and image paths live in `content/`, so you should not need to edit `index.html` or `js/main.js`.

| File | Controls |
|------|----------|
| `site.js` | Project name, title, tagline, logo, hero image, hero stats, nav items, GitHub/demo links |
| `domain.js` | Literature survey, research gap (+ comparison table), problem, objectives, methodology, technologies |
| `components.js` | The coaching-loop words and the four research component cards |
| `milestones.js` | Timeline dates, descriptions, optional marks |
| `documents.js` | Document groups and links (TAF, proposals, checklists, theses, research paper) |
| `presentations.js` | Slide deck links and thumbnails |
| `team.js` | Supervisors and members (photos, emails, LinkedIn, GitHub) |
| `contact.js` | Contact email, phone, address |

- **Images:** put files in `images/` and reference them as e.g. `image: "images/team/ishan.jpg"`. `null` shows a placeholder.
- **Links:** an empty string `""` shows "Coming soon" (documents/slides) or hides the button/icon.
- **Icons:** `icon` fields take any [Lucide](https://lucide.dev/icons) name in PascalCase, e.g. `"BookOpen"`.
- **Milestone status** is worked out from today's date; force it with `status: "completed"`. Each milestone is a drop-down showing its details, date and `marks`.
- **Contact form** opens the visitor's email app (`mailto:`) and only appears when `CONTACT.email` is set.
- **Section headings** (e.g. "Why this research matters") are plain text in `index.html`.

## Project structure

```
index.html     # Page layout and section headings
css/style.css  # Stylesheet and design tokens
js/main.js     # Builds each section from content/ and runs the animations
js/vendor/     # GSAP and Lucide (local copies, do not edit)
fonts/         # Self-hosted web fonts
content/       # All site content (edit these)
images/        # Team photos and other static images
```

## Deployment

The site is deployed on **Netlify** at [empowerz.netlify.app](https://empowerz.netlify.app/).
`netlify.toml` publishes the repository root as-is, with no build command. Any static host
(Vercel, GitHub Pages) also works.

---

© 2026 EmpowerZ (R26-SE-010).
