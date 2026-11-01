import Link from "next/link";
import { ProjectCards } from "@/features/projects/ProjectsIndex";
import { featuredProjects, projects } from "@/features/projects/projectData";
import { AmbientBackground } from "./AmbientBackground";
import { PortfolioNavigation } from "./PortfolioNavigation";

const skillGroups = [
  {
    title: "Programming languages",
    skills: ["Python", "Java", "C++", "SQL"],
  },
  {
    title: "AI engineering",
    skills: [
      "Agentic AI",
      "Retrieval-Augmented Generation",
      "Large Language Models",
      "Multi-Agent Systems",
      "Model Context Protocol",
      "Prompt Engineering",
      "LLM Fine-tuning",
      "AI Automation",
    ],
  },
  {
    title: "Machine learning & data",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "TF-IDF",
      "Recommendation Systems",
      "Data Processing and Evaluation",
    ],
  },
  {
    title: "Frameworks & development",
    skills: [
      "FastAPI",
      "Streamlit",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "FastMCP",
    ],
  },
  {
    title: "Speech AI",
    skills: [
      "Whisper / faster-whisper",
      "pyannote.audio",
      "Speech-to-Text",
      "Speaker Diarization",
      "WER / DER Evaluation",
    ],
  },
  {
    title: "Databases & tools",
    skills: [
      "SQLite",
      "MySQL",
      "DuckDB",
      "Supabase / pgvector",
      "Git / GitHub",
      "Selenium",
      "Ollama",
      "n8n",
    ],
  },
];

const certifications = [
  {
    title: "Build Secure RAG Applications with AWS Serverless Data Lakes",
    issuer: "AWS Training and Certification",
    issued: "August 2026",
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    issued: "July 2026",
    credentialId: "rapbzeoahm42",
  },
  {
    title: "Create Your First Gemini Enterprise Application",
    issuer: "Google",
    issued: "July 2026",
    credentialId: "25458668",
  },
  {
    title: "AI Boost Bites: Automate Tasks with Gemini and Apps Script",
    issuer: "Google",
    issued: "June 2026",
    credentialId: "25174287",
  },
  {
    title: "Finetuning Large Language Models",
    issuer: "DeepLearning.AI",
    issued: "June 2026",
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic",
    issued: "June 2026",
    credentialId: "tbaqq3966bfg",
  },
  {
    title: "AI Fluency for Small Businesses",
    issuer: "Anthropic",
    issued: "June 2026",
    credentialId: "ydujx3b3cw5j",
  },
  {
    title: "Agentic AI — Skill Up",
    issuer: "GeeksforGeeks",
    issued: "April 2026",
  },
  {
    title: "Introduction to MongoDB",
    issuer: "MongoDB",
    issued: "May 2026",
    credentialId: "MDBplctpw4060",
  },
  {
    title: "Machine Learning",
    issuer: "Coursera",
  },
];

const sectionHeading =
  "text-3xl font-medium tracking-[-0.05em] text-[#D8D0BE] sm:text-4xl";

const sectionLabel =
  "font-mono text-[10px] uppercase tracking-[0.22em] text-[#C18A49]";

const sectionClasses =
  "archive-section scroll-mt-20 border-b border-[#343732]";

const contentGrid =
  "mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[220px_1fr] lg:gap-16 lg:px-12";

const flagshipProject = projects.find((project) => project.badge);

export function PortfolioHome() {
  return (
    <div className="archive-shell min-h-screen bg-[#111211] text-[#D8D0BE]">
      <AmbientBackground />
      <PortfolioNavigation />

      <main className="relative z-10">
        <section
          aria-labelledby="hero-title"
          className="archive-section archive-hero relative isolate scroll-mt-20 overflow-hidden border-b border-[#343732]"
          data-portfolio-section
          id="home"
        >
          <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-12">
            <div className="max-w-3xl">
              <p className={sectionLabel}>Independent engineering portfolio</p>
              <h1
                className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.07em] sm:text-7xl lg:text-8xl"
                id="hero-title"
              >
                <span>ASGHAR</span>{" "}
                <span className="text-[#C18A49]">ALI</span>
              </h1>
              <p className="mt-7 max-w-2xl font-mono text-xs uppercase leading-6 tracking-[0.16em] text-[#d3c9b5] sm:text-sm">
                AI Automation Engineer
                <span aria-hidden="true" className="px-2 text-[#C18A49]">
                  /
                </span>
                AI Systems Engineer
              </p>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#b8b5aa] sm:text-base sm:leading-8">
                I build intelligent systems that connect AI research with
                practical applications. My work focuses on agentic AI,
                retrieval-augmented generation, workflow automation, and
                Python-based backends — turning complex technical ideas into
                useful software.
              </p>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#99998f]">
                <span>Co-founder, Indus Dynamics</span>
                <span aria-hidden="true" className="text-[#C18A49]">
                  /
                </span>
                <span>Sukkur, Sindh, Pakistan</span>
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-12 items-center justify-center border border-[#C18A49] bg-[#C18A49] px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#171714] outline-none transition-colors hover:bg-[#d19b5c] focus-visible:ring-2 focus-visible:ring-[#D8D0BE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211]"
                  href="#projects"
                >
                  Explore projects
                </a>
                <a
                  aria-label="View Asghar Ali's GitHub profile (opens in a new tab)"
                  className="inline-flex min-h-12 items-center justify-center border border-[#494c45] px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D8D0BE] outline-none transition-colors hover:border-[#C18A49] hover:text-[#e5bd82] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                  href="https://github.com/asgharali2049"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View GitHub <span aria-hidden="true" className="ml-2">↗</span>
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center border border-[#494c45] px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#D8D0BE] outline-none transition-colors hover:border-[#C18A49] hover:text-[#e5bd82] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                  href="#contact"
                >
                  Contact me
                </a>
              </div>
            </div>

            <div className="hidden border-l border-[#454841] pl-8 lg:block">
              <p className={sectionLabel}>Engineering focus</p>
              <ul className="mt-5 space-y-4 font-mono text-xs uppercase tracking-[0.1em] text-[#b8b2a4]">
                <li className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#C18A49]" />
                  Agentic systems &amp; RAG
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#C18A49]" />
                  Intelligent automation
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-px w-7 bg-[#C18A49]" />
                  Python backends &amp; evaluation
                </li>
              </ul>
              <div className="mt-10 border-t border-[#454841] pt-5">
                <p className={sectionLabel}>Education</p>
                <p className="mt-3 text-sm text-[#d0cabb]">
                  Computer Science
                </p>
                <p className="mt-1 text-xs text-[#99998f]">
                  Sukkur IBA University · Class of 2027
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-title"
          className={`${sectionClasses} archive-section--about`}
          data-portfolio-section
          id="about"
        >
          <div className={contentGrid}>
            <div>
              <p className={sectionLabel}>01 / Profile</p>
              <h2 className={`${sectionHeading} mt-4`} id="about-title">
                About
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-[#d0cabb] sm:text-xl sm:leading-9">
                I am a Computer Science student at Sukkur IBA University,
                based in Sukkur, Sindh, Pakistan, and expect to graduate in
                2027. I am also Co-founder of Indus Dynamics, a small AI
                automation studio serving clients in Pakistan and
                internationally.
              </p>
              <p className="mt-5 text-sm leading-7 text-[#aaa99f] sm:text-base sm:leading-8">
                My technical focus spans AI automation and systems engineering,
                agentic and multi-agent workflows, retrieval-augmented
                generation, MCP-based tool integration, Python backends,
                speech processing, and AI-powered business systems. I value
                practical engineering: experimenting with an approach,
                debugging its failure modes, evaluating what it actually
                delivers, and building useful software from the results.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="experience-title"
          className={`${sectionClasses} archive-section--experience`}
          data-portfolio-section
          id="experience"
        >
          <div className={contentGrid}>
            <div>
              <p className={sectionLabel}>02 / Applied work</p>
              <h2 className={`${sectionHeading} mt-4`} id="experience-title">
                Experience
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#98988e]">
                Co-founding, client-facing demonstrations, technical
                consultation, and hands-on lab work.
              </p>
            </div>
            <div className="space-y-5">
              <article className="archive-panel-card border border-[#48483f] bg-[#191a17]/90 p-5 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                      Co-founder
                    </p>
                    <h3 className="mt-2 text-xl text-[#D8D0BE]">
                      Indus Dynamics
                    </h3>
                  </div>
                  <span className="w-fit border border-[#6e593e] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#d4b17f]">
                    AI automation studio
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b3b0a5]">
                  Co-building a small AI automation studio focused on
                  developing intelligent automation solutions and AI-powered
                  applications for clients in Pakistan and internationally.
                  Relevant work includes AI automation, agentic workflows,
                  RAG-based applications, business chatbots, and client-facing
                  software demonstrations.
                </p>
              </article>

              <article className="archive-panel-card border border-[#393c37] bg-[#171917]/85 p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                  Client-facing demonstrations · client work
                </p>
                <h3 className="mt-3 text-lg text-[#D8D0BE]">
                  Hira Medical Centre · Hamza Travel &amp; Tours · River City
                  Hospital
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#aaa99f]">
                  Created demonstration websites featuring WhatsApp chatbot
                  widgets for these organizations. These are demonstration
                  projects; production deployment or ongoing operation is not
                  claimed.
                </p>
              </article>

              <article className="archive-panel-card border border-[#393c37] bg-[#171917]/85 p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                  Speech AI experiment · Hira Hospital
                </p>
                <h3 className="mt-3 text-lg text-[#D8D0BE]">
                  Whisper fine-tuning
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#aaa99f]">
                  Fine-tuned Whisper using a synthetic dataset generated with
                  gTTS. The reported evaluation was 0.0 WER on that synthetic
                  dataset only; it does not establish real-world hospital
                  transcription accuracy.
                </p>
              </article>

              <article className="archive-panel-card border border-[#393c37] bg-[#171917]/85 p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                  Technical consultation · BookMind
                </p>
                <h3 className="mt-3 text-lg text-[#D8D0BE]">
                  RAG question-and-answer application
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#aaa99f]">
                  Consulted with a client during a live Zoom session on a
                  BookMind RAG Q&amp;A application using Lovable, Supabase
                  pgvector, and OpenAI. This was technical consultation, not
                  sole development ownership.
                </p>
              </article>

              <article className="archive-panel-card border border-[#393c37] bg-[#171917]/85 p-5 sm:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                  Technical lab experience
                </p>
                <h3 className="mt-3 text-lg text-[#D8D0BE]">
                  AWS Bedrock AgentCore
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#aaa99f]">
                  Lab work covering Cognito OAuth 2.0, MCP tool routing,
                  Knowledge Bases, memory, VPC networking, and guardrails.
                  These are lab experiences, not a separate certification.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="projects-title"
          className={`${sectionClasses} archive-section--projects`}
          data-portfolio-section
          id="projects"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={sectionLabel}>03 / Selected work</p>
                <h2 className={`${sectionHeading} mt-4`} id="projects-title">
                  Projects
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#aaa99f]">
                  Research, agentic systems, speech AI, and practical
                  applications. Each project page describes its scope, status,
                  technical approach, and available source.
                </p>
              </div>
              <Link
                className="w-fit border-b border-[#C18A49]/70 pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#d7b783] outline-none transition-colors hover:text-[#f0d7ae] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                href="/projects"
              >
                View all projects <span aria-hidden="true">↗</span>
              </Link>
            </div>
            {flagshipProject ? (
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-l border-[#C18A49] bg-[#1a1b18]/75 px-4 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#caa36c]">
                  {flagshipProject.badge}
                </span>
                <Link
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#D8D0BE] outline-none transition-colors hover:text-[#e5bd82] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                  href={`/projects/${flagshipProject.slug}`}
                >
                  {flagshipProject.title} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            ) : null}
            <ProjectCards items={featuredProjects} />
          </div>
        </section>

        <section
          aria-labelledby="skills-title"
          className={`${sectionClasses} archive-section--skills`}
          data-portfolio-section
          id="skills"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <p className={sectionLabel}>04 / Technical toolkit</p>
            <h2 className={`${sectionHeading} mt-4`} id="skills-title">
              Skills
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group, index) => (
                <article
                  className="archive-panel-card border border-[#393c37] bg-[#181a18]/90 p-5 sm:p-6"
                  key={group.title}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                    {String(index + 1).padStart(2, "0")} / {group.title}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        className="archive-interactive-chip border border-[#454841] px-3 py-2 font-mono text-[10px] leading-4 text-[#c8c1b2]"
                        key={skill}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="education-title"
          className={`${sectionClasses} archive-section--education`}
          data-portfolio-section
          id="education"
        >
          <div className={contentGrid}>
            <div>
              <p className={sectionLabel}>05 / Academic background</p>
              <h2 className={`${sectionHeading} mt-4`} id="education-title">
                Education
              </h2>
            </div>
            <article className="archive-panel-card border border-[#48483f] bg-[#191a17]/90 p-5 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49]">
                Expected graduation · 2027
              </p>
              <h3 className="mt-4 text-xl text-[#D8D0BE]">
                Computer Science (BS)
              </h3>
              <p className="mt-2 text-sm text-[#aaa99f]">
                Sukkur IBA University
              </p>
              <p className="mt-1 text-sm text-[#898a82]">
                Sukkur, Sindh, Pakistan
              </p>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="certifications-title"
          className={`${sectionClasses} archive-section--certifications`}
          data-portfolio-section
          id="certifications"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <p className={sectionLabel}>06 / Continuing education</p>
            <h2 className={`${sectionHeading} mt-4`} id="certifications-title">
              Certifications
            </h2>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {certifications.map((certification) => (
                <li
                  className="archive-panel-card flex min-h-36 flex-col border border-[#393c37] bg-[#181a18]/90 p-4 sm:p-5"
                  key={certification.title}
                >
                  <h3 className="text-sm leading-6 text-[#D8D0BE]">
                    {certification.title}
                  </h3>
                  <p className="mt-3 text-xs text-[#b2afa4]">
                    {certification.issuer}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#99998f]">
                    {certification.issued ?? "Issue date not supplied"}
                  </p>
                  {certification.credentialId ? (
                    <p className="mt-auto pt-3 font-mono text-[9px] text-[#898a82]">
                      Credential ID: {certification.credentialId}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-6 text-[#898a82]">
              Credential IDs are shown where supplied. Verification links were
              not provided.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="contact-title"
          className="archive-section archive-section--contact scroll-mt-20"
          data-portfolio-section
          id="contact"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className={sectionLabel}>07 / Get in touch</p>
                <h2 className={`${sectionHeading} mt-4`} id="contact-title">
                  Contact
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#aaa99f] sm:text-base">
                  For conversations about AI systems, automation, or software,
                  you can reach me by email or through my professional profiles.
                </p>
              </div>
              <a
                aria-label="Email Asghar Ali at asgharali.workplace@gmail.com"
                className="inline-flex min-h-12 w-fit items-center border border-[#C18A49] px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#e2c99e] outline-none transition-colors hover:bg-[#C18A49]/10 focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                href="mailto:asgharali.workplace@gmail.com"
              >
                Email me <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </div>

            <p className="mt-7 break-all font-mono text-sm text-[#D8D0BE] sm:text-base">
              <a
                className="underline decoration-[#C18A49]/60 underline-offset-4 outline-none transition-colors hover:text-[#e5bd82] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                href="mailto:asgharali.workplace@gmail.com"
              >
                asgharali.workplace@gmail.com
              </a>
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <li>
                <a
                  aria-label="GitHub profile (opens in a new tab)"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#b8b2a4] outline-none transition-colors hover:text-[#C18A49] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                  href="https://github.com/asgharali2049"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#b8b2a4] outline-none transition-colors hover:text-[#C18A49] focus-visible:ring-2 focus-visible:ring-[#C18A49]"
                  href="https://www.linkedin.com/in/asghar-ali-47626b273/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#343732]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.14em] text-[#777a72] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>THE ARCHIVE · ASGHAR ALI · SUKKUR, PAKISTAN</span>
          <a className="hover:text-[#D8D0BE]" href="#home">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
