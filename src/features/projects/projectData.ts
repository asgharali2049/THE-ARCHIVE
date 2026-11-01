export type ProjectDiagram = {
  title: string;
  steps: string[];
};

export type ProjectEvaluation = {
  summary: string;
  columns?: string[];
  rows?: string[][];
  notes?: string[];
};

export type ProjectVisualKind =
  | "retrieval"
  | "business"
  | "behavior"
  | "recommendation"
  | "research"
  | "video"
  | "speech"
  | "knowledge";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  problem: string;
  approach: string;
  features: string[];
  architecture: string;
  diagrams: ProjectDiagram[];
  technologies: string[];
  decisions: string[];
  evaluation: ProjectEvaluation;
  status: string;
  badge?: string;
  githubUrl?: string;
  visual: {
    kind: ProjectVisualKind;
    accent: string;
    index: string;
    caption: string;
  };
};

export const projects: Project[] = [
  {
    slug: "holographic-rag",
    number: "01",
    title: "Holographic RAG",
    category: "Retrieval Systems / Deep Learning Research",
    summary:
      "A controlled comparison of conventional dense retrieval with FAISS and Hyperdimensional Computing using TorchHD.",
    description:
      "A comparative retrieval system investigating whether Hyperdimensional Computing can offer practical advantages over conventional dense vector retrieval.",
    problem:
      "Hyperdimensional Computing is often motivated by compact representations and efficient similarity operations. This research tests that expectation against a conventional dense-retrieval baseline instead of assuming it holds.",
    approach:
      "Two independent pipelines use identical 512-token chunking with 50-token overlap and the same Ollama llama3.2 generation path. Sentence Transformers all-MiniLM-L6-v2 produces 384-dimensional embeddings. The FAISS baseline uses IndexFlatL2; the HDC path randomly projects embeddings into 10,000 dimensions, binarizes them, and retrieves with TorchHD similarity search.",
    features: [
      "Side-by-side FAISS and TorchHD retrieval pipelines.",
      "Streamlit dashboard for retrieval comparison and benchmarking.",
      "Concept-arithmetic demonstrations using bound shared base concepts.",
      "Identical chunking and generation settings for the two retrieval paths.",
    ],
    architecture:
      "The shared chunker feeds independent retrieval implementations. FAISS indexes sentence embeddings with IndexFlatL2; the HDC path projects and binarizes those embeddings before TorchHD similarity search. Both paths use Ollama llama3.2 for generation and can be compared in the Streamlit dashboard.",
    diagrams: [
      {
        title: "Controlled retrieval comparison",
        steps: [
          "Shared documents + queries",
          "FAISS IndexFlatL2",
          "Shared llama3.2 generation",
        ],
      },
      {
        title: "HDC retrieval path",
        steps: [
          "all-MiniLM-L6-v2 · 384D",
          "Random projection · 10,000D",
          "Binarization / TorchHD similarity",
        ],
      },
    ],
    technologies: [
      "Python",
      "Sentence Transformers",
      "FAISS",
      "TorchHD",
      "Ollama",
      "Streamlit",
    ],
    decisions: [
      "Held chunking, corpus, queries, and generation constant so retrieval approaches could be compared on the same workload.",
      "Rebuilt a near-random hash encoder, improving observed similarity from 0.017 to 0.586.",
      "Fixed concept arithmetic by binding shared base concepts.",
      "Identified and corrected three benchmark measurement bugs before interpreting results.",
    ],
    evaluation: {
      summary:
        "On the documented 50-query, 40-document benchmark, both methods achieved Hit@5 of 1.0. HDC was approximately 17% slower in this experiment and did not demonstrate the anticipated efficiency advantage.",
      columns: ["Metric", "FAISS", "HDC"],
      rows: [
        ["Mean retrieval latency", "18.66 ms", "21.82 ms"],
        ["Index memory", "0.059 MB", "0.153 MB"],
        ["Hit@5", "1.0", "1.0"],
      ],
      notes: [
        "The measured TorchHD path used float32 vector storage and ordinary floating-point cosine-style similarity rather than bit-packed XOR/popcount. Based on the displayed memory figures, HDC used about 2.6× the index memory (0.153 / 0.059); this does not match the separately supplied estimate of approximately 26×.",
        "Future work: true bit-packing, a hard-negative evaluation corpus, further experiments, and potential research-paper development. These are proposed next steps, not completed results.",
      ],
    },
    status: "Flagship research project · comparative benchmark",
    badge: "Flagship research project",
    githubUrl: "https://github.com/asgharali2049/Holographic-RAG",
    visual: {
      kind: "retrieval",
      accent: "#89aeb2",
      index: "RETRIEVAL STUDY / 01",
      caption: "Two retrieval paths · shared generation",
    },
  },
  {
    slug: "bizbridge-ai",
    number: "02",
    title: "BizBridge AI",
    category: "Agentic AI / Business Analytics / MCP",
    summary:
      "A business analytics platform that keeps the LLM agent separate from read-only SQLite data access through MCP tools.",
    description:
      "An AI-powered business analytics platform combining a custom Model Context Protocol server, multi-provider LLM agents, and a real-time inventory dashboard.",
    problem:
      "Business questions need answers grounded in structured records, while language models should not have unrestricted access to the underlying database. BizBridge places a narrow, read-only MCP interface between the agent and business data.",
    approach:
      "A user asks a natural-language question in the Streamlit application. The configured LLM agent selects an MCP tool; the server runs an allowed read-only analytics operation against SQLite; the result returns to the agent for a grounded response. Provider integrations include Ollama, Gemini, and OpenAI.",
    features: [
      "Natural-language business queries.",
      "Sales summaries, top-product analysis, and low-stock detection.",
      "Top-customer analysis and customer order history.",
      "Read-only analytics tools exposed through a custom FastMCP server.",
      "Offline evaluation with 27 repeatable database-grounded test cases.",
    ],
    architecture:
      "The agent and the business-data access layer are separate. The agent communicates with a local MCP server; only that server calls registered read-only analytics tools against SQLite. The dashboard can display business analytics independently of initializing an agent.",
    diagrams: [
      {
        title: "Grounded analytics request",
        steps: [
          "User question",
          "LLM agent",
          "MCP tool selection",
          "Read-only SQLite analytics",
          "Grounded response",
        ],
      },
    ],
    technologies: [
      "Python",
      "FastMCP / MCP",
      "SQLite",
      "Streamlit",
      "Ollama",
      "Gemini",
      "OpenAI",
    ],
    decisions: [
      "Kept business analytics behind a purpose-built MCP server instead of exposing unrestricted database access to the agent.",
      "Registered read-only tools for a bounded set of analytics queries.",
      "Made provider and model selection explicit rather than silently switching providers or models.",
      "Kept offline evaluation independent from live LLM calls; live evaluation is opt-in.",
    ],
    evaluation: {
      summary:
        "The repository documents 27 repeatable, database-grounded evaluation cases. Offline tests use mocked providers; live evaluation is opt-in.",
      notes: [
        "The included shop data is fictional and synthetic; it does not represent a real client or business.",
      ],
    },
    status: "Repository-backed business analytics application",
    githubUrl: "https://github.com/asgharali2049/BizBridge-AI",
    visual: {
      kind: "business",
      accent: "#c18a49",
      index: "DATA ACCESS / 02",
      caption: "Agent separated from business data",
    },
  },
  {
    slug: "lecassist",
    number: "06",
    title: "LecAssist",
    category: "Speech AI / Deep Learning / Assistive Technology",
    summary:
      "An offline Urdu-English lecture assistant for code-switched transcription and speaker-aware processing.",
    description:
      "LecAssist is a group final-year project: an offline Windows lecture assistant designed to support Urdu-English code-switched transcription and speaker-aware processing. My contribution is the audio pipeline.",
    problem:
      "Lecture audio can include code-switching, background noise, and multiple speakers. The project explores an offline processing pipeline for recording, preparing, transcribing, and evaluating this audio.",
    approach:
      "My audio-pipeline work covers audio recording, noise cleaning and preprocessing, faster-whisper large-v3-turbo transcription, pyannote.audio 3.1 speaker diarization, and WER/DER evaluation with jiwer.",
    features: [
      "Audio recording and preprocessing pipeline.",
      "Noise cleaning for captured lecture audio.",
      "Code-switched speech transcription with faster-whisper large-v3-turbo.",
      "Speaker diarization with pyannote.audio 3.1.",
      "WER and DER evaluation using jiwer.",
    ],
    architecture:
      "The audio path records lecture audio, cleans and preprocesses it, then applies speech recognition and speaker diarization. Evaluation uses word error rate and diarization error rate. This is my contribution within a group project, not a claim of sole project ownership.",
    diagrams: [
      {
        title: "Audio pipeline contribution",
        steps: [
          "Audio recording",
          "Noise cleaning + preprocessing",
          "faster-whisper transcription",
          "pyannote speaker diarization",
          "WER / DER evaluation",
        ],
      },
    ],
    technologies: [
      "Python",
      "faster-whisper large-v3-turbo",
      "pyannote.audio 3.1",
      "jiwer",
      "Windows",
    ],
    decisions: [
      "Designed for offline use on Windows.",
      "Focused my contribution on the audio pipeline within the group final-year project.",
      "Included WER and DER evaluation rather than presenting transcription quality without measured evaluation.",
    ],
    evaluation: {
      summary:
        "The project is at prototype stage. Evaluation metrics are part of the planned audio pipeline; no quantitative LecAssist result is claimed here.",
    },
    status: "Ongoing group final-year project · prototype stage",
    badge: "Ongoing final-year project",
    visual: {
      kind: "speech",
      accent: "#a9c2b5",
      index: "SPEECH PIPELINE / 06",
      caption: "Recording · transcription · diarization",
    },
  },
  {
    slug: "digital-behavior-mirror",
    number: "03",
    title: "Digital Behavior Mirror",
    category: "Full-Stack Development / Personal Analytics / AI",
    summary:
      "A personal analytics system that tracks browser activity and turns sessions into focus statistics and behavioral insights.",
    description:
      "A browser activity analytics application designed to turn passive browsing data into understandable focus patterns and productivity insights.",
    problem:
      "People move between browser tasks throughout the day, making it difficult to see how time is distributed or how often sessions are interrupted. The application brings activity capture, session storage, and review into one connected workflow.",
    approach:
      "A Chrome extension captures browsing activity and communicates with the FastAPI service. The backend validates API data with Pydantic and stores sessions and activity in SQLite. A Next.js/React dashboard presents focus statistics, charts, session history, and insight content.",
    features: [
      "Browser activity tracking through a Chrome extension.",
      "Activity categorization, including local AI-based URL categorization.",
      "Daily session summaries and session history.",
      "Focus and distraction statistics with interactive charts.",
      "Session-switching analysis and AI-generated insights.",
    ],
    architecture:
      "The extension is the activity-capture layer, FastAPI is the API and persistence boundary, and the Next.js dashboard is the review interface. SQLite stores the data; Python and Pydantic support backend behavior and request/response validation.",
    diagrams: [
      {
        title: "Three connected application layers",
        steps: [
          "Chrome extension\nActivity capture",
          "FastAPI + SQLite\nSession and API layer",
          "Next.js dashboard\nInsights and charts",
        ],
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQLite",
      "Next.js",
      "React",
      "Chrome Extension",
    ],
    decisions: [
      "Separated browser capture, API/storage, and dashboard responsibilities into distinct parts.",
      "Used local SQLite persistence for session and activity records.",
      "Organized captured activity into categories and daily sessions so summary statistics can be presented coherently.",
      "Included categorization and insights in the application workflow rather than treating the dashboard as a static report.",
    ],
    evaluation: {
      summary:
        "The repository documents application capabilities and API workflows, but does not publish a quantitative product or model benchmark.",
    },
    status: "Repository-backed full-stack application",
    githubUrl:
      "https://github.com/asgharali2049/Digital-Behavior-Mirror-App",
    visual: {
      kind: "behavior",
      accent: "#84a9a0",
      index: "ACTIVITY RECORD / 03",
      caption: "Capture · session · reflection",
    },
  },
  {
    slug: "research-crew",
    number: "05",
    title: "Research Crew",
    category: "Agentic AI / Research Automation",
    summary:
      "A lightweight CrewAI system that researches a configurable topic and writes a structured Markdown report.",
    description:
      "A lightweight multi-agent research system that researches a topic and generates structured Markdown reports.",
    problem:
      "A research run needs both information gathering and a useful written result. This project separates those responsibilities into a researcher and reporting analyst with configurable task definitions.",
    approach:
      "The Researcher agent gathers relevant information for the supplied topic. The Reporting Analyst transforms the research into a structured report. YAML files define agents and tasks; the topic can be changed in the Python entry point. The repository documents OpenAI and local Ollama support.",
    features: [
      "Researcher and Reporting Analyst agent roles.",
      "Agent and task definitions stored in YAML.",
      "Configurable research topic through the Python entry point.",
      "Structured Markdown report output.",
      "OpenAI support and local Ollama configuration.",
    ],
    architecture:
      "The Python entry point provides topic input to a CrewAI crew. YAML agent configuration defines the Researcher and Reporting Analyst; YAML task configuration describes research and reporting work; the reporting task writes a Markdown output file.",
    diagrams: [
      {
        title: "Configured research crew",
        steps: [
          "Topic input",
          "Researcher agent",
          "Reporting Analyst",
          "Markdown report",
        ],
      },
    ],
    technologies: [
      "Python",
      "CrewAI",
      "OpenAI",
      "Ollama",
      "YAML",
      "Markdown",
    ],
    decisions: [
      "Kept agent roles and task definitions in separate YAML configuration files to make the workflow easier to adjust.",
      "Made the topic a runtime input in the entry point, so a new research run can target a different subject.",
      "Supports provider configuration rather than hard-coding a single model path.",
    ],
    evaluation: {
      summary:
        "The README describes usage and includes CrewAI test commands, but does not publish quantitative research-quality results.",
    },
    status: "Repository-backed multi-agent research system",
    githubUrl: "https://github.com/asgharali2049/research-crew",
    visual: {
      kind: "research",
      accent: "#a9a0c1",
      index: "RESEARCH SEQUENCE / 05",
      caption: "Two roles · one structured report",
    },
  },
  {
    slug: "master-ai-vault",
    number: "07",
    title: "Master AI Vault",
    category: "AI Knowledge Systems / Productivity",
    summary:
      "A structured Notion-based AI knowledge product built through Notion MCP integration.",
    description:
      "Master AI Vault is a Notion-based knowledge product organized through Notion MCP integration. It brings repositories, learning paths, tool references, and reusable prompts into one structured workspace.",
    problem:
      "AI learning and implementation references can become scattered across repositories, notes, and prompt collections. This product organizes those resources into a single Notion-based system.",
    approach:
      "The knowledge product is structured in Notion and was built through Notion MCP integration. It is presented as an organized knowledge workspace, not a standalone software application.",
    features: [
      "19-tool matrix.",
      "14 repository references.",
      "3 learning roadmaps.",
      "12 production prompts.",
    ],
    architecture:
      "Notion provides the product workspace and organization layer; Notion MCP integration supported building the structured knowledge system. This is a Notion-based product rather than an independently running application.",
    diagrams: [
      {
        title: "Knowledge product contents",
        steps: [
          "Notion workspace",
          "Tool matrix + repositories",
          "Learning roadmaps",
          "Reusable prompts",
        ],
      },
    ],
    technologies: ["Notion", "Notion MCP"],
    decisions: [
      "Organized the resource collection into a tool matrix, repository references, roadmaps, and prompts.",
      "Kept the deliverable in Notion rather than describing it as standalone software.",
    ],
    evaluation: {
      summary:
        "The product contents are documented as 19 tools, 14 repositories, 3 learning roadmaps, and 12 prompts. No software benchmark is applicable to this Notion-based product.",
    },
    status: "Notion-based knowledge product",
    visual: {
      kind: "knowledge",
      accent: "#c5ad85",
      index: "KNOWLEDGE SYSTEM / 07",
      caption: "Tools · references · learning paths",
    },
  },
  {
    slug: "movie-vibe-recommender",
    number: "04",
    title: "Movie Vibe Recommender",
    category: "Machine Learning / Recommendation Systems",
    summary:
      "An interactive content-based recommender that ranks films by description and genre similarity.",
    description:
      "A content-based movie recommendation application that recommends similar films using textual descriptions and genre information.",
    problem:
      "A title-based search does not help when someone wants a movie with a similar tone, description, genre, or director. The project explores content-based recommendations from the information available in a movie dataset.",
    approach:
      "The application loads a movie dataset, transforms descriptions into TF-IDF vectors, computes cosine similarity against the selected movie, and returns ranked recommendations. Genre and director filters provide additional ways to narrow discovery.",
    features: [
      "Movie search by title.",
      "Description-based similarity and ranked, item-based recommendations.",
      "Genre filtering for mood-specific exploration.",
      "Director-based filtering.",
      "Interactive Streamlit interface.",
    ],
    architecture:
      "A Pandas-loaded movie dataset supplies titles, genres, and descriptions. Scikit-learn TF-IDF vectorization converts text into feature vectors; cosine similarity ranks candidate items; Streamlit exposes search, filters, and recommendations.",
    diagrams: [
      {
        title: "Content-based recommendation path",
        steps: [
          "Movie dataset",
          "TF-IDF text vectors",
          "Cosine similarity",
          "Ranked recommendations",
        ],
      },
    ],
    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "TF-IDF",
      "Streamlit",
    ],
    decisions: [
      "Used content-based item similarity, so recommendations are derived from movie metadata rather than collaborative user histories.",
      "Applied TF-IDF to descriptions and cosine similarity to rank candidates.",
      "Kept genre and director filtering as complementary discovery controls.",
    ],
    evaluation: {
      summary:
        "The README documents the recommendation workflow and application features, but does not report a quantitative recommendation-quality evaluation.",
    },
    status: "Repository-backed recommendation application",
    githubUrl: "https://github.com/asgharali2049/Movie-Vibe-Recommender",
    visual: {
      kind: "recommendation",
      accent: "#d0a76e",
      index: "CONTENT SIGNAL / 04",
      caption: "Text vectors · similarity ranking",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
