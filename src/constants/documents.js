// Downloadable documents grouped by category.
// Set `link` to a URL (Google Drive, OneDrive, or "/docs/file.pdf" in public/).
// An empty link ("") shows the card as "Coming soon".

export const DOCUMENT_GROUPS = [
  {
    group: "Topic Assessment",
    items: [
      {
        title: "Topic Assessment Form",
        description: "Approved TAF (R26-SE-010) with research problem, solution and objectives.",
        type: "PDF",
        link: "",
      },
    ],
  },
  {
    group: "Project Proposal",
    items: [
      {
        title: "Proposal: Adaptive Pedagogical Module",
        description: "IT22135216 · Ranasinghe S.D.",
        type: "PDF",
        link: "",
      },
      {
        title: "Proposal: Multimodal Communication Analysis Module",
        description: "IT22137364 · Thilakarathna Y.I.D.",
        type: "PDF",
        link: "",
      },
      {
        title: "Proposal: Role-Play Simulation Engine",
        description: "IT22195234 · Thamel W.M.A.",
        type: "PDF",
        link: "",
      },
      {
        title: "Proposal: Feedback System & Predictive Analytics",
        description: "IT22208880 · Ambegoda A.L.A.S.K.",
        type: "PDF",
        link: "",
      },
    ],
  },
  {
    group: "Checklists",
    items: [
      { title: "Checklist (PP1)", description: "Progress checklist submitted with PP1.", type: "PDF", link: "" },
      { title: "Final Checklist", description: "Final checklist before the viva.", type: "PDF", link: "" },
    ],
  },
  {
    group: "Final Reports",
    items: [
      { title: "Group Final Report", description: "Complete thesis for the integrated platform.", type: "PDF", link: "" },
      { title: "Final Report: APM", description: "IT22135216 · Individual thesis.", type: "PDF", link: "" },
      { title: "Final Report: MCA", description: "IT22137364 · Individual thesis.", type: "PDF", link: "" },
      { title: "Final Report: RPE", description: "IT22195234 · Individual thesis.", type: "PDF", link: "" },
      { title: "Final Report: FSPA", description: "IT22208880 · Individual thesis.", type: "PDF", link: "" },
    ],
  },
  {
    group: "Research Paper",
    items: [
      { title: "Research Paper", description: "Paper submitted for publication.", type: "PDF", link: "" },
    ],
  },
];
