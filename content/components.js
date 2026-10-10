// The four individual research components. One card each.
// `memberId` links to TEAM_MEMBERS in team.js.
// `icon` is any Lucide icon name in PascalCase (https://lucide.dev/icons).

// Words in the scrolling band above the components (the practice cycle).
const COACHING_LOOP = ["Plan", "Practise", "Reflect", "Recalibrate"];

const RESEARCH_COMPONENTS = [
  {
    id: "apm",
    code: "APM",
    title: "Adaptive Pedagogical Module",
    tagline: "Decides what the learner practises and how hard it is.",
    memberId: "sakindu",
    accent: "#4f46e5",
    icon: "Brain",
    image: null, // e.g. "images/components/apm.png"
    description:
      "Scores the 44-item Big Five Inventory into OCEAN bands and turns the profile, the measured MCA baseline and session outcomes into a teaching strategy, a difficulty level and a versioned scenario brief for RPE. It recalibrates after every session, closing the adaptation loop.",
    novelty:
      "Deterministic, auditable personalisation: documented rules make every decision, a high-Neuroticism band softens tone and feedback, difficulty moves at most one step per adjustment, and no language model ever decides a pedagogical outcome.",
    features: [
      "BFI-44 scoring to OCEAN percentiles in three bands",
      "Five-dimension teaching strategy: tone, pacing, complexity, persona, feedback style",
      "Additive difficulty on a 1-10 scale, capped at one step per adjustment",
      "Hybrid scenario selection with a Gemini-synthesised fallback",
      "Two-timescale adaptation from RPE outcomes and FSPA's trend signal",
    ],
    tech: ["Python", "FastAPI", "Pydantic", "Google Gemini"],
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
      "Tracks face landmarks in the browser with MediaPipe while streaming three-second audio chunks over an authenticated WebSocket. On the server, librosa prosodic features and a fine-tuned wav2vec 2.0 emotion model feed six acoustic analysers and eight fusion rules, which return prioritised real-time nudges and four communication scores.",
    novelty:
      "Privacy by architecture: video never leaves the device, only five numbers per three-second window are sent, and an arbitration policy shows at most one prioritised nudge at a time.",
    features: [
      "MediaPipe Face Mesh: eye and mouth aspect ratios, head yaw, pitch and roll",
      "wav2vec 2.0 speech emotion recognition: 76.2% speaker-independent accuracy",
      "Six acoustic analysers and eight behaviour-level fusion rules",
      "Acoustic nudges processed in 57-76 ms of server time",
      "Eight-minute AI-guided baseline and four-dimension session scoring",
    ],
    tech: ["MediaPipe", "librosa", "PyTorch (wav2vec 2.0)", "WebSockets"],
  },
  {
    id: "rpe",
    code: "RPE",
    title: "Role-Play Simulation Engine",
    tagline: "An always-available counterpart for rehearsing hard conversations.",
    memberId: "methush",
    accent: "#f97362",
    icon: "Drama",
    image: null, // e.g. "images/components/rpe.png"
    description:
      "Stages a scenario as a spoken conversation with a lip-synced 3D avatar character. Each learner turn is one structured LLM call that returns the character's line plus 17 further schema-validated fields, including its emotion, a coded learner behaviour and an eight-field conversation memory, while deterministic code tracks trust and escalation. Each session ends with a debrief, and the outcome is sent to APM.",
    novelty:
      "Explicit relationship state: the language model only writes the character's line and emotion, and deterministic tables turn that emotion into bounded trust (0-100) and escalation (0-5), so the state stays inspectable.",
    features: [
      "One structured gpt-5-mini call per turn with 18 schema-validated fields",
      "Trust (0-100, starting at 50) and escalation (0-5) from deterministic tables",
      "Conversation memory that holds the learner to commitments made earlier",
      "TalkingHead 3D avatar with Chirp 3 HD voice, reacting 450 ms before it speaks",
      "15-second bound on every call, falling back to Gemini Flash-Lite or Groq, then a static line",
      "Debrief with Thomas-Kilmann conflict style, risks, blind spots and a coaching rewrite",
      "Five library scenarios, plus scenarios generated from APM training plans",
    ],
    tech: ["FastAPI", "OpenAI gpt-5-mini", "TalkingHead 3D", "Chirp 3 HD TTS"],
  },
  {
    id: "fspa",
    code: "FSPA",
    title: "Feedback System & Predictive Analytics",
    tagline: "Shows learners where their self-view differs from what was measured.",
    memberId: "shanika",
    accent: "#e5a50a",
    icon: "ChartSpline",
    image: null, // e.g. "images/components/fspa.png"
    description:
      "Places the learner's self-rating beside the measured scores of the same session, detects blind spots, forecasts skill trends, reads written reflections and generates evidence-grounded mentoring. It returns a longitudinal signal that APM uses to recalibrate the next plan.",
    novelty:
      "Blind spot detection: a gap of at least 10 points between self-rating and measured score is reported as a blind spot, with severity bands at 20 and 30 points, and a counselor-reviewed safety boundary handles distress.",
    features: [
      "Skill Twin: self-rating compared with measured performance",
      "Ridge regression forecasts (RMSE 4.586, never off the 0-100 scale) and random-forest risk classification",
      "Reflection sentiment with fine-tuned DistilBERT: 0.854 accuracy on hand-labelled workplace reflections",
      "Profile-conditioned gpt-5-mini mentoring with a safety boundary",
      "Experience points, levels, streaks and fourteen badges",
      "Counselor-reviewed safety boundary that signposts professional support",
    ],
    tech: ["DistilBERT", "scikit-learn", "OpenAI gpt-5-mini", "FastAPI"],
  },
];
