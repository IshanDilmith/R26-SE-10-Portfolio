// The four individual research components. One card each.
// `memberId` links to TEAM_MEMBERS in team.js.
// `icon` is any Lucide icon name in PascalCase (https://lucide.dev/icons).

// Words in the scrolling band above the components.
const COACHING_LOOP = ["Assess", "Practise", "Coach", "Analyse", "Adapt"];

const RESEARCH_COMPONENTS = [
  {
    id: "apm",
    code: "APM",
    title: "Adaptive Pedagogical Module",
    tagline: "Learns who you are, then decides how to teach you.",
    memberId: "sakindu",
    accent: "#4f46e5",
    icon: "Brain",
    image: null, // e.g. "images/components/apm.png"
    description:
      "Maps a learner's Big Five (OCEAN) personality profile and baseline performance to a teaching strategy, generates a personalised training plan with LLMs, and continuously tunes difficulty from role-play results and live coaching signals.",
    novelty:
      "Psychometric scenario mapping: adapts the teaching style, not just the content, to the learner's personality.",
    features: [
      "OCEAN personality survey and profiling",
      "Strategy optimiser driven by traits and skill gaps",
      "Dynamic Difficulty Adjustment (DDA) engine",
      "LLM-generated learning briefs and scenario recommendations",
      "Real-time adjustments from live MCA nudges",
    ],
    tech: ["Python", "FastAPI", "Gemini", "scikit-learn"],
  },
  {
    id: "mca",
    code: "MCA",
    title: "Multimodal Communication Analysis Module",
    tagline: "The eyes and ears of the platform.",
    memberId: "ishan",
    accent: "#0ea5a4",
    icon: "ScanFace",
    image: null, // e.g. "images/components/mca.png"
    description:
      "Tracks face landmarks in the browser with MediaPipe (eye contact, head pose, mouth and eye openness) while streaming audio over WebSocket for prosody and speech emotion recognition. An Affect Fusion engine combines both streams into live coaching nudges.",
    novelty:
      "Client-side real-time affect fusion: no raw video leaves the browser, and conflicting signals such as sarcasm or a tense presenter are resolved in real time.",
    features: [
      "MediaPipe face mesh: EAR, MAR, yaw / pitch / roll",
      "Pitch, pace, volume and clarity analysers (librosa)",
      "Speech emotion recognition: SVM and CNN (RAVDESS)",
      "8 affect fusion rules (e.g. sarcasm, script reader, deer-in-headlights)",
      "Baseline assessment and session scoring",
    ],
    tech: ["MediaPipe", "librosa", "WebSockets", "PyTorch"],
  },
  {
    id: "rpe",
    code: "RPE",
    title: "Role-Play Simulation Engine",
    tagline: "A sparring partner that remembers how you treated it.",
    memberId: "methush",
    accent: "#f97362",
    icon: "Drama",
    image: null, // e.g. "images/components/rpe.png"
    description:
      "Voice-driven role-play against AI characters (an irate customer, a manager in a salary negotiation, a frustrated peer). Each NPC keeps an emotional state across turns and responds with resistance, escalation or cooperation based on how the user communicates.",
    novelty:
      "Cross-turn emotional memory: NPCs hold grudges and rebuild trust, so users must use genuine de-escalation instead of scripted answers.",
    features: [
      "NPC emotional state: trust, escalation and mood",
      "Scenario library by difficulty, skill and conflict type",
      "LLM-driven NPC dialogue with end-of-conversation detection",
      "Outcome evaluation with blind spots and quality curves",
      "Results feed back into the adaptive training plan",
    ],
    tech: ["FastAPI", "Gemini / Groq", "Speech-to-text", "PostgreSQL"],
  },
  {
    id: "fspa",
    code: "FSPA",
    title: "Feedback System & Predictive Analytics",
    tagline: "A data-driven mirror of your professional behaviour.",
    memberId: "shanika",
    accent: "#e5a50a",
    icon: "ChartSpline",
    image: null, // e.g. "images/components/fspa.png"
    description:
      "Brings MCA, RPE and self-assessment data together into a Skill-Twin profile, analyses peer-feedback sentiment with NLP, detects blind spots, forecasts skill trends and generates LLM mentoring recommendations.",
    novelty:
      "Blind spot detection: correlates self-perception with AI-observed behaviour to identify skills a user thinks they have but does not show.",
    features: [
      "Skill-Twin radar against industry standards",
      "Peer-feedback sentiment analysis (Transformer NLP)",
      "Predictive outcome and progress trend models",
      "LLM mentoring recommendations",
      "Post-session reports and gamified progress",
    ],
    tech: ["Transformers", "scikit-learn", "OpenAI", "Recharts"],
  },
];
