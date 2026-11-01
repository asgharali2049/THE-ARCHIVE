import Link from "next/link";
import type { Project } from "./projectData";
import { ProjectArtwork } from "./ProjectArtwork";

function ProjectFlow({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="mt-6 border border-[#3b3e39] bg-[#151715] p-5 sm:p-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa494]">
        {title}
      </h3>
      <ol className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {steps.map((step, index) => (
          <li key={`${step}-${index}`} className="flex min-w-0 flex-1 items-stretch gap-2 sm:gap-0">
            <div className="flex min-h-16 flex-1 items-center border border-[#41443e] px-3 py-3 font-mono text-[10px] leading-5 text-[#D8D0BE]">
              {step.split("\n").map((line, lineIndex) => (
                <span key={lineIndex} className={lineIndex > 0 ? "text-[#96968d]" : ""}>
                  {lineIndex > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </div>
            {index < steps.length - 1 ? (
              <span className="flex items-center justify-center px-1 font-mono text-sm text-[#C18A49]" aria-hidden="true">
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-[#383b36] py-8 sm:grid-cols-[170px_1fr] sm:gap-8 sm:py-10">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C18A49]">
        <span>{number}</span>
        <h2 className="mt-2 text-[#aaa494]">{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function ProjectDetail({
  project,
  previous,
  next,
}: {
  project: Project;
  previous: Project;
  next: Project;
}) {
  return (
    <main className="min-h-screen bg-[#111211] text-[#D8D0BE]">
      <header className="border-b border-[#3b3e39]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] outline-none focus-visible:ring-2 focus-visible:ring-[#C18A49]">
            THE ARCHIVE
          </Link>
          <Link href="/projects" className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#aaa494] outline-none hover:text-[#D8D0BE] focus-visible:ring-2 focus-visible:ring-[#C18A49]">
            ← All projects
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="py-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#898a82]">
          <Link href="/projects" className="hover:text-[#D8D0BE]">Project index</Link>
          <span className="px-2 text-[#C18A49]" aria-hidden="true">/</span>
          <span className="text-[#D8D0BE]">{project.title}</span>
        </nav>

        <article>
          <header className="grid gap-8 pb-12 pt-5 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12 lg:pb-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#C18A49]">
                Project {project.number} · {project.category}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {project.badge ? (
                  <span className="border border-[#8b673f] bg-[#2a2118] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#e2bd83]">
                    {project.badge}
                  </span>
                ) : null}
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#99998f]">
                  {project.status}
                </span>
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-medium tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#b5b2a7] sm:text-lg sm:leading-8">
                {project.description}
              </p>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center gap-3 border border-[#C18A49]/80 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#e2c99e] outline-none transition-colors hover:bg-[#C18A49]/10 focus-visible:ring-2 focus-visible:ring-[#C18A49] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211]"
                >
                  Source repository
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.12em] text-[#99998f]">
                  Source code not publicly available
                </p>
              )}
            </div>
            <div className="relative aspect-[1.45/1] border border-[#41443e] bg-[#202320] p-2 sm:p-4">
              <ProjectArtwork kind={project.visual.kind} accent={project.visual.accent} />
              <span className="absolute bottom-5 left-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#D8D0BE]/70">
                {project.visual.caption}
              </span>
            </div>
          </header>

          <Section number="01" title="Purpose">
            <p className="max-w-3xl text-sm leading-7 text-[#c0bdb2] sm:text-base sm:leading-8">
              {project.problem}
            </p>
          </Section>

          <Section number="02" title="Technical approach">
            <p className="max-w-3xl text-sm leading-7 text-[#c0bdb2] sm:text-base sm:leading-8">
              {project.approach}
            </p>
          </Section>

          <Section number="03" title="Architecture">
            <p className="max-w-3xl text-sm leading-7 text-[#c0bdb2] sm:text-base sm:leading-8">
              {project.architecture}
            </p>
            {project.diagrams.map((diagram) => (
              <ProjectFlow key={diagram.title} {...diagram} />
            ))}
          </Section>

          <Section number="04" title="Implemented features">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="border-l border-[#C18A49]/70 bg-[#171917] px-4 py-4 text-sm leading-6 text-[#c0bdb2]">
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          <Section number="05" title="Engineering decisions">
            <ul className="space-y-4">
              {project.decisions.map((decision, index) => (
                <li key={decision} className="flex gap-4 text-sm leading-7 text-[#c0bdb2]">
                  <span className="pt-1 font-mono text-[10px] text-[#C18A49]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-3xl">{decision}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section number="06" title="Evaluation / results">
            <div className="max-w-4xl">
              <p className="text-sm leading-7 text-[#c0bdb2] sm:text-base sm:leading-8">
                {project.evaluation.summary}
              </p>
              {project.evaluation.columns && project.evaluation.rows ? (
                <div className="mt-6 overflow-x-auto border border-[#41443e]">
                  <table className="w-full min-w-[520px] border-collapse text-left">
                    <thead className="bg-[#202320] font-mono text-[9px] uppercase tracking-[0.12em] text-[#C18A49]">
                      <tr>
                        {project.evaluation.columns.map((column) => (
                          <th key={column} className="border-b border-[#41443e] px-4 py-3 font-normal">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {project.evaluation.rows.map((row) => (
                        <tr key={row[0]} className="text-sm text-[#D8D0BE]">
                          {row.map((cell, index) => (
                            <td key={`${row[0]}-${index}`} className="border-b border-[#30332f] px-4 py-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {project.evaluation.notes?.length ? (
                <ul className="mt-5 space-y-3">
                  {project.evaluation.notes.map((note) => (
                    <li key={note} className="border-l border-[#69716a] pl-4 text-sm leading-6 text-[#a9a79c]">
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Section>

          <Section number="07" title="Technology stack">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li key={technology} className="border border-[#494c45] bg-[#171917] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#c8c1b2]">
                  {technology}
                </li>
              ))}
            </ul>
          </Section>
        </article>

        <nav aria-label="Project navigation" className="grid gap-3 border-t border-[#383b36] py-8 sm:grid-cols-2 sm:py-10">
          <Link href={`/projects/${previous.slug}`} className="border border-[#383b36] p-5 outline-none hover:border-[#C18A49]/70 focus-visible:ring-2 focus-visible:ring-[#C18A49]">
            <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#8f9087]">← Previous · {previous.number}</span>
            <span className="mt-3 block text-lg text-[#D8D0BE]">{previous.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="border border-[#383b36] p-5 text-left outline-none hover:border-[#C18A49]/70 focus-visible:ring-2 focus-visible:ring-[#C18A49] sm:text-right">
            <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#8f9087]">Next · {next.number} →</span>
            <span className="mt-3 block text-lg text-[#D8D0BE]">{next.title}</span>
          </Link>
        </nav>

        <div className="pb-10 text-center">
          <Link href="/projects" className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C18A49] outline-none hover:text-[#e3bf82] focus-visible:ring-2 focus-visible:ring-[#C18A49]">
            Back to all projects
          </Link>
        </div>
      </div>
    </main>
  );
}
