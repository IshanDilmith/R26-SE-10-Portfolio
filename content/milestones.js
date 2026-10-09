// Project timeline. `start` / `end` are ISO dates (YYYY-MM-DD).
// Status is worked out from today's date unless you set `status`
// ("completed" | "upcoming") explicitly.
// `marks` is optional, e.g. "18/20" — leave "" to hide.

const MILESTONES = [
  {
    title: "Project Proposal",
    start: "2026-03-15",
    end: "2026-03-18",
    description:
      "Topic assessment, proposal report submission (15 March) and proposal presentation (16-18 March) defining the research problem, objectives and architecture.",
    marks: "",
  },
  {
    title: "Progress Presentation 1",
    start: "2026-05-11",
    end: "2026-05-13",
    description:
      "Checklist submission and demonstration of around 50% completion: environment set-up, unimodal pipelines, emotion classifier and core data flows.",
    marks: "",
  },
  {
    title: "Progress Presentation 2",
    start: "2026-08-31",
    end: "2026-09-02",
    description:
      "Demonstration of around 90% completion: affect fusion, NPC emotional memory, DDA engine and analytics dashboards integrated end to end.",
    marks: "",
  },
  {
    title: "Draft Thesis & Website",
    start: "2026-10-11",
    end: "2026-10-11",
    description: "Submission of the draft thesis and this project website.",
    marks: "",
  },
  {
    title: "Final Checklist",
    start: "2026-10-14",
    end: "2026-10-14",
    description: "Final checklist submission before the viva.",
    marks: "",
  },
  {
    title: "Final Presentation & Viva",
    start: "2026-10-19",
    end: "2026-10-21",
    description:
      "Final demonstration and individual viva, together with website evaluation and logbook submission.",
    marks: "",
  },
  {
    title: "Research Paper",
    start: "2026-10-23",
    end: "2026-10-23",
    description: "Submission of the research paper describing the platform and its findings.",
    marks: "",
  },
  {
    title: "Final Thesis",
    start: "2026-10-28",
    end: "2026-10-28",
    description: "Submission of the final group and individual theses.",
    marks: "",
  },
  {
    title: "Publication Evidence",
    start: "2026-12-01",
    end: "2026-12-01",
    description: "Submission of research paper publication evidence.",
    marks: "",
  },
];
