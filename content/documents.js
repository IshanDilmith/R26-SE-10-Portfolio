// Downloadable documents grouped by category.
// Set `link` to a URL (Google Drive, OneDrive, or "docs/file.pdf" in this folder).
// An empty link ("") shows the card as "Coming soon".
// `type` is the label on the button. "Folder", "Video" and "Repo" also change the card icon.

const DOCUMENT_GROUPS = [
  {
    group: "Topic Assessment",
    items: [
      {
        title: "Topic Assessment Form",
        description: "Approved TAF (R26-SE-010) with research problem, solution and objectives.",
        type: "PDF",
        link: "https://1drv.ms/b/c/b696d72d5cc053a2/IQCGckGNVHrGQLBhexsahWzNAYQRQAdhn0NZqQB_oyLY0B0?e=gjhTIB",
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
        link: "https://1drv.ms/b/c/b696d72d5cc053a2/IQByhLJfj92hQqJ2xKlmPybfAVDH-cYHf3Iy-saeCDOx2j8?e=dK6RhF",
      },
      {
        title: "Proposal: Multimodal Communication Analysis Module",
        description: "IT22137364 · Thilakarathna Y.I.D.",
        type: "PDF",
        link: "https://1drv.ms/b/c/b696d72d5cc053a2/IQBiLDIumg02Sp6j4huWHjnzAZORByJamcaBf3CevU-UYcQ?e=UwfGVW",
      },
      {
        title: "Proposal: Role-Play Simulation Engine",
        description: "IT22195234 · Thamel W.M.A.",
        type: "PDF",
        link: "https://1drv.ms/b/c/b696d72d5cc053a2/IQCefZO1-tkfQpdlNaGIMXcFASOPbHzBpY56SJ-pHic481Q?e=m1xoHv",
      },
      {
        title: "Proposal: Feedback System & Predictive Analytics",
        description: "IT22208880 · Ambegoda A.L.A.S.K.",
        type: "PDF",
        link: "https://1drv.ms/b/c/b696d72d5cc053a2/IQAoJgQQ_wd6SZb7RQe6zYa7AYOgrRQv_XbtRw-GDGIz2ZA?e=9tD9Kp",
      },
    ],
  },
  {
    group: "Checklists",
    items: [
      {
        title: "Checklist 1",
        description: "Git repository of the EmpowerZ platform.",
        type: "Repo",
        link: "https://github.com/SakinduD/R26-SE-010",
      },
      {
        title: "Checklist 2",
        description: "Demo video of the working platform.",
        type: "Video",
        link: "https://1drv.ms/v/c/b696d72d5cc053a2/IQB_BehVoTT9RIaj9jMKJRqnAdwOFgMuTnywZZrMpIi6X5Q?e=jdakXY",
      },
      {
        title: "Checklist 3",
        description: "Final checklist submission before the viva.",
        type: "Folder",
        link: "https://1drv.ms/f/c/b696d72d5cc053a2/IgBrLKOoIYKZSbShFPJPHwnQAWKLD8JuJj5gL61HeON8m0c?e=doZDAK",
      },
    ],
  },
  {
    group: "Thesis",
    items: [
      {
        title: "Draft Thesis",
        description: "Draft group and individual theses submitted for review.",
        type: "Folder",
        link: "https://1drv.ms/f/c/b696d72d5cc053a2/IgDTxLVgFGOrSLCRcOgir0EzAZPQkbwC41YCNGXwKhmZJK4?e=Ileavg",
      },
      {
        title: "Final Report",
        description: "Final group and individual theses for the integrated platform.",
        type: "Folder",
        link: "https://1drv.ms/f/c/b696d72d5cc053a2/IgAHFCLSLXO8RqyR0nauES4PAS6If2lEdN58y9Ts42DMV3c?e=1zjuk3",
      },
    ],
  },
  {
    group: "Research Paper",
    items: [
      {
        title: "Research Paper",
        description: "Paper submitted for publication.",
        type: "Folder",
        link: "https://1drv.ms/f/c/b696d72d5cc053a2/IgBJqD1hWMucTbPFJ0kL-v5iAVfp_0AICFxbHmu4SMlYyXI?e=0bm7mM",
      },
    ],
  },
];
