# EmpowerZ — Research Portfolio (R26-SE-010)

Client-side React (Vite) website for the SLIIT 2026 research project
*Workplace Soft Skills Training and Feedback Platform for Gen Z Employees*.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

All text, cards, links and image paths live in `src/constants/`. You should not need to touch the components.

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

- **Images:** put files in `public/images/` and set e.g. `image: "/images/team/ishan.jpg"`. `null` shows a placeholder.
- **Links:** an empty string `""` shows "Coming soon" (documents/slides) or hides the button/icon.
- **Milestone status** is worked out from today's date; you can force it with `status: "completed"`.
- **Contact form** opens the visitor's email app (`mailto:`) and appears only when `CONTACT.email` is set.

## Deploy

Static output: deploy `dist/` to Vercel, Netlify or GitHub Pages (build command `npm run build`, output `dist`).
