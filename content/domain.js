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
    "Gen Z employees (born 1997-2012) are technically strong but often arrive in the workplace without the communication, conflict-handling and emotional intelligence skills employers expect. A 2024 LinkedIn study reports that 62% of organisations see the soft skills gap as a barrier to business success, and Gen Z's average job stint is around 1.1 years. Our survey covered four areas of prior work.",
  cards: [
    {
      title: "Passive e-learning",
      icon: "BookOpen",
      body: "Platforms such as Coursera and LinkedIn Learning deliver high-quality video content but measure learning with static quizzes. They cannot evaluate how a person actually communicates, and offer no personalisation by learning style.",
    },
    {
      title: "VR role-play simulations",
      icon: "Glasses",
      body: "Tools such as Talespin, Bodyswaps and Mursion provide immersive practice, but they need costly headsets and are hard to roll out across a corporate IT environment.",
    },
    {
      title: "Affective computing & MER",
      icon: "ScanFace",
      body: "Multimodal Emotion Recognition fuses face, voice and text to infer emotional state. Most models are evaluated in the lab, rely on heavy server-side CNNs and fuse modalities after recording rather than in real time.",
    },
    {
      title: "LLMs & conversational agents",
      icon: "MessagesSquare",
      body: "Transformer LLMs (GPT-4, Gemini) can generate quizzes and hold natural dialogue, and empathetic dialogue systems respond to user emotion. They rarely keep emotional state across turns or adapt to personality traits.",
    },
    {
      title: "Adaptive learning & DDA",
      icon: "Gauge",
      body: "Research on personality-aware learning (Big Five) shows engagement gains when content matches the learner. Dynamic difficulty adjustment keeps learners challenged without overwhelming them, but is seldom tied to psychometric profiles.",
    },
    {
      title: "Feedback analytics",
      icon: "ChartNoAxesCombined",
      body: "NLP sentiment analysis can classify peer feedback, and ML models can forecast performance. Existing tools treat these in isolation instead of combining behavioural, learning and peer data into one profile.",
    },
  ],
};

const RESEARCH_GAP = {
  intro:
    "Existing products either teach passively or need expensive hardware, and none combine personalisation, real-time non-verbal feedback, emotionally persistent role-play and unified analytics in a browser.",
  points: [
    "Real-time multimodal analysis is too slow and too privacy-invasive when video is uploaded to the cloud; sub-200ms feedback in a standard browser is largely unaddressed.",
    "Training content is one-size-fits-all; teaching style is not adapted to personality (e.g. introvert vs. extrovert).",
    "Conversational agents do not keep cross-turn emotional memory, so they cannot model trust erosion, escalation or grudge-holding.",
    "Learning data (quiz results) and behavioural data (video/audio analysis) sit in silos; no system builds a complete “Skill-Twin” or detects blind spots.",
  ],
  // Comparison table — set to [] to hide
  comparisonColumns: [
    "Personality adaptation",
    "Real-time feedback",
    "Emotional memory role-play",
    "Unified skill analytics",
  ],
  comparisonRows: [
    { system: "LinkedIn Learning", values: [false, false, false, false] },
    { system: "Coursera", values: [false, false, false, "partial"] },
    { system: "Moodle", values: [false, "partial", false, false] },
    { system: "VR simulations", values: ["partial", true, "partial", false] },
    { system: "HireVue", values: [false, false, false, "partial"] },
    { system: "EmpowerZ (ours)", values: [true, true, true, true], highlight: true },
  ],
};

const RESEARCH_PROBLEM = {
  statement:
    "How can a browser-based, privacy-preserving AI platform measurably improve Gen Z employees' workplace soft skills by combining personality-aware adaptive learning, real-time non-verbal feedback, emotionally persistent role-play and predictive feedback analytics?",
  subProblems: [
    {
      title: "Personalisation",
      body: "How can teaching style and difficulty adapt to a learner's Big Five personality profile and live performance?",
    },
    {
      title: "Real-time non-verbal feedback",
      body: "How can facial and vocal cues be fused into accurate coaching nudges within 200ms, without sending raw video to a server?",
    },
    {
      title: "Realistic practice",
      body: "How can AI characters remember how they were treated and react with trust, escalation and resistance like real colleagues?",
    },
    {
      title: "Actionable insight",
      body: "How can scattered behavioural, learning and peer-feedback data become a Skill-Twin, blind-spot detection and mentoring advice?",
    },
  ],
};

const OBJECTIVES = {
  main: "To develop an adaptive, multimodal AI platform that assesses and improves workplace soft skills through real-time non-verbal analysis, personalised curriculum generation, interactive role-play simulations and predictive feedback analytics.",
  specific: [
    {
      title: "Adaptive pedagogy",
      body: "Map Big Five (OCEAN) personality traits to teaching strategies, generate LLM-based training content and adjust difficulty dynamically.",
    },
    {
      title: "Multimodal communication analysis Module",
      body: "Detect facial landmarks with MediaPipe, analyse vocal prosody and fuse both streams into real-time coaching nudges.",
    },
    {
      title: "Role-play simulation",
      body: "Build NPCs with cross-turn emotional memory (trust, escalation, mood) for realistic workplace scenarios with outcome evaluation.",
    },
    {
      title: "Feedback & predictive analytics",
      body: "Create a Skill-Twin profile, analyse peer-feedback sentiment, detect blind spots, forecast skill trends and generate mentoring advice.",
    },
  ],
};

const METHODOLOGY = {
  intro:
    "The project follows Design Science Research (DSR): iteratively designing, building and evaluating a working artefact that solves a real organisational problem.",
  steps: [
    {
      title: "Problem identification",
      body: "Literature review and a survey of 25 students, interns and professionals to confirm the soft skills gap and feature priorities.",
    },
    {
      title: "Design",
      body: "Modular architecture with four research components behind a shared FastAPI backend, PostgreSQL (Supabase) data layer and React client.",
    },
    {
      title: "Development",
      body: "Client-side computer vision, server-side audio emotion recognition (SVM / CNN), LLM orchestration, psychometric mapping and analytics pipelines.",
    },
    {
      title: "Demonstration",
      body: "End-to-end flow: baseline assessment → personalised training plan → role-play practice with live coaching → Skill-Twin analytics.",
    },
    {
      title: "Evaluation",
      body: "Model metrics (accuracy, F1, ROC-AUC), latency benchmarks, and user trials measuring confidence, usability and engagement.",
    },
  ],
  // e.g. "images/architecture/overall.png" — null hides the diagram
  architectureImage: null,
  architectureCaption: "Overall system architecture",
};

const TECHNOLOGIES = [
  { group: "Frontend", items: ["React 18", "Vite", "TailwindCSS", "shadcn/ui", "Framer Motion", "Recharts"] },
  { group: "Backend", items: ["Python", "FastAPI", "WebSockets", "SQLAlchemy", "Alembic"] },
  { group: "Data & Auth", items: ["PostgreSQL", "Supabase Auth", "JWT"] },
  { group: "AI / ML", items: ["MediaPipe Face Mesh", "librosa", "scikit-learn (SVM)", "PyTorch (CNN)", "Transformers / BERT", "DistilBERT"] },
  { group: "LLMs", items: ["Google Gemini", "OpenAI", "Groq", "LangChain"] },
  { group: "Datasets", items: ["RAVDESS", "FER-2013", "GoEmotions", "DailyDialog"] },
];
