// Content for the "Domain" section. Each constant maps to one tab.
// `icon` is any Lucide icon name in PascalCase (https://lucide.dev/icons).

const DOMAIN_TABS = [
  { id: "literature", label: "Literature Survey", blurb: "Prior work we studied" },
  { id: "gap", label: "Research Gap", blurb: "What existing systems miss" },
  { id: "problem", label: "Research Problem", blurb: "The question we answer" },
  { id: "objectives", label: "Objectives", blurb: "What we set out to build" },
  { id: "methodology", label: "Methodology", blurb: "How we built and evaluated it" },
  { id: "technologies", label: "Technologies", blurb: "Tools, models and datasets" },
];

const LITERATURE_SURVEY = {
  intro:
    "Employers consistently rank communication and interpersonal skills among the most important attributes of new hires, yet these are the skills graduates most often lack. Gen Z is highly comfortable with technology but has had fewer face-to-face interactions, and soft skills are learned mainly through practice and feedback. Our survey covered six areas of prior work.",
  cards: [
    {
      title: "Passive e-learning",
      icon: "BookOpen",
      body: "Course libraries such as Coursera and LinkedIn Learning offer high-quality videos and quizzes, but a multiple-choice question cannot measure how a person speaks, listens and reacts under pressure.",
    },
    {
      title: "VR role-play simulations",
      icon: "Glasses",
      body: "Tools such as Talespin, Bodyswaps and Mursion provide immersive practice, but they need headsets and setup, and their scenarios are mostly scripted branches that cannot respond to what the learner says.",
    },
    {
      title: "Affective computing & MER",
      icon: "ScanFace",
      body: "Multimodal affect-detection systems could observe delivery, but most are research prototypes that either upload video or rely on facial-expression classification, whose validity for inferring emotion is contested.",
    },
    {
      title: "LLMs & conversational agents",
      icon: "MessagesSquare",
      body: "Language models can play a workplace character convincingly, and research coaches such as MACH and Rehearsal showed the value of automated conversational practice, but each covers one skill or one interaction style, with no measured model of the learner.",
    },
    {
      title: "Adaptive learning & DDA",
      icon: "Gauge",
      body: "Aptitude-treatment interaction research shows the best teaching method depends on the learner, and practice works best just beyond the learner's current ability. Most digital training still gives everyone the same content at the same difficulty.",
    },
    {
      title: "Feedback & self-perception",
      icon: "ChartNoAxesCombined",
      body: "Feedback improves performance only when the learner accepts it and can act on it, yet people are poor judges of their own competence, so a score that contradicts a learner's self-view is easily dismissed.",
    },
  ],
};

const RESEARCH_GAP = {
  intro:
    "Existing approaches trade personalisation against realism. No existing solution combines a measured learner model, realistic responsive practice, behavioural sensing and analytics that close the loop. The gap is an integration gap.",
  points: [
    "Instruction is uniform: most digital training gives every learner the same content at the same difficulty, and never recalibrates it from evidence.",
    "Behaviour is not observed: e-learning measures knowledge, not delivery, and affect-detection prototypes either upload video or rely on contested facial-expression classification.",
    "Realistic practice does not scale: scripted simulations cannot respond to the learner, and human role-play is costly and depends on scheduling.",
    "Feedback is not reconciled with self-perception: no system shows learners where their own view of their performance differs from what was measured.",
  ],
  // Comparison table — set to [] to hide
  comparisonColumns: [
    "Measured learner model",
    "Responsive live practice",
    "Behavioural sensing",
    "Closed-loop analytics",
  ],
  comparisonRows: [
    { system: "E-learning course libraries", values: [false, false, false, false] },
    { system: "Personality-aware e-learning", values: ["partial", false, false, false] },
    { system: "Human coaching & role-play", values: [false, true, "partial", false] },
    { system: "VR soft-skills simulations", values: [false, "partial", "partial", false] },
    { system: "Speech-coaching tools", values: [false, false, true, false] },
    { system: "General LLM chat assistants", values: [false, true, false, false] },
    { system: "EmpowerZ (ours)", values: [true, true, true, true], highlight: true },
  ],
};

const RESEARCH_PROBLEM = {
  statement:
    "Early-career Generation Z employees have no scalable way to rehearse difficult workplace conversations and to receive feedback that is timely, personal to them, grounded in how they actually behaved, and connected across sessions so that each practice builds on the last.",
  subProblems: [
    {
      title: "SP1 Personalisation (APM)",
      body: "How can personality, measured baseline evidence and session outcomes be turned into a teaching strategy, difficulty and scenario that adapt over time while remaining auditable?",
    },
    {
      title: "SP2 Sensing (MCA)",
      body: "How can facial and vocal behaviour be sensed in real time on commodity hardware, fused into coachable observations and scored fairly, without sending video off the device?",
    },
    {
      title: "SP3 Practice (RPE)",
      body: "How can an LLM-driven character hold an open conversation fast enough to speak with, while the engine keeps explicit, bounded and inspectable relationship state?",
    },
    {
      title: "SP4 Interpretation (FSPA)",
      body: "How can self-assessment be compared with measured performance, future performance be forecast, and evidence-grounded advice be generated safely?",
    },
  ],
};

const OBJECTIVES = {
  main: "To design, build and evaluate an integrated, web-based soft-skills training platform in which personalised role-play practice, real-time multimodal feedback and longitudinal analytics form one closed and explainable adaptation loop for early-career employees.",
  specific: [
    {
      title: "Personalised, bounded adaptation (APM)",
      body: "Personalise practice from measured learner traits and evidence through documented, bounded rules.",
    },
    {
      title: "Real-time, privacy-preserving feedback (MCA)",
      body: "Provide real-time feedback on vocal and facial delivery without transmitting video.",
    },
    {
      title: "Responsive role-play (RPE)",
      body: "Deliver responsive role-play with explicit, bounded relationship state.",
    },
    {
      title: "Visible, safe interpretation (FSPA)",
      body: "Make self-perception gaps, trends and forecasts visible with safe, evidence-grounded advice.",
    },
    {
      title: "One closed adaptation loop",
      body: "Integrate the four components into one closed loop through versioned contracts.",
    },
    {
      title: "Engineering quality",
      body: "Engineer the platform with automated testing, continuous integration and reproducible deployment.",
    },
    {
      title: "Responsible design",
      body: "Protect privacy, bound LLM behaviour and obtain professional review.",
    },
    {
      title: "User acceptance",
      body: "Obtain user acceptance of the platform from the target population.",
    },
  ],
};

const METHODOLOGY = {
  intro:
    "The project follows Design Science Research (DSR), designing, building and evaluating a working artefact across three iterations: vertical slices (April to May 2026), end-to-end contracts (June to August) and integration review and evaluation (August to October).",
  steps: [
    {
      title: "Problem identification",
      body: "Literature and market review in each thesis and supervisor progress reviews identified four root causes and decomposed the common problem into four subproblems.",
    },
    {
      title: "Design",
      body: "One React client and one FastAPI backend, with each component owning its routes and tables and ten versioned contracts defining what crosses each boundary.",
    },
    {
      title: "Development",
      body: "Browser-side face tracking, server-side wav2vec 2.0 speech emotion recognition, deterministic pedagogy rules, structured LLM role-play and predictive analytics, with a fallback for every model path.",
    },
    {
      title: "Demonstration",
      body: "One closed loop: personality survey and baseline, goal-based plan, role-play with live nudges, debrief, reflection and analytics, then recalibration of the next plan.",
    },
    {
      title: "Evaluation",
      body: "827 of 831 backend tests passing, an adaptation-loop integration test, latency and fault-injection measurements, a counselor review, and user acceptance testing with a mean SUS score of 75.5.",
    },
  ],
  // e.g. "images/architecture/overall.png" — null hides the diagram
  architectureImage: null,
  architectureCaption: "Overall system architecture",
};

// Intro line shown above the technology groups — set to "" to hide.
const TECHNOLOGIES_INTRO =
  "One React client and one FastAPI backend, CPU-only models, and external LLM providers with fallbacks, deployed as three Docker containers on a virtual private server.";

const TECHNOLOGIES = [
  { group: "Frontend", items: ["React 18", "Vite 5", "React Router 7", "Tailwind CSS", "shadcn/ui", "Framer Motion"] },
  { group: "Browser & avatar", items: ["MediaPipe Face Mesh", "Web Speech API", "TalkingHead 3D", "three.js"] },
  { group: "Backend", items: ["Python 3.12", "FastAPI", "Uvicorn", "Pydantic", "WebSockets"] },
  { group: "Data & Auth", items: ["PostgreSQL 16", "SQLAlchemy 2.0", "Alembic", "Supabase Auth", "JWT"] },
  { group: "AI / ML", items: ["wav2vec 2.0 (PyTorch)", "librosa", "PyAV", "DistilBERT (Transformers)", "scikit-learn"] },
  { group: "LLMs & voice", items: ["OpenAI gpt-5-mini", "Google Gemini (Flash-Lite)", "Groq gpt-oss-120b", "Google Chirp 3 HD TTS", "Google Cloud STT"] },
  { group: "Datasets", items: ["RAVDESS", "SUBESCO", "Sentiment140", "Glassdoor Job Reviews", "Kaggle Employee Performance"] },
  { group: "Testing & delivery", items: ["pytest", "Vitest", "GitHub Actions", "Docker Compose", "GHCR", "Nginx"] },
];
