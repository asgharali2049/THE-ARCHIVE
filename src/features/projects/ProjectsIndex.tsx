import Link from "next/link";
import { projects } from "./projectData";
import { ProjectArtwork } from "./ProjectArtwork";

export function ProjectCards({ items = projects }: { items?: typeof projects } = {}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((project) => (
            <article key={project.slug} className="group min-w-0">
              <Link
                href={`/projects/${project.slug}`}
                prefetch={false}
                className="archive-project-card flex h-full flex-col border border-[#393c37] bg-[#171917] outline-none transition-colors hover:border-[#C18A49]/75 focus-visible:ring-2 focus-visible:ring-[#C18A49] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111211]"
              >
                <div className="relative aspect-[2.05/1] border-b border-[#393c37] bg-[#202320] p-2">
                  <ProjectArtwork
                    kind={project.visual.kind}
                    accent={project.visual.accent}
                    compact
                  />
                  <span className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#D8D0BE]/70">
                    {project.visual.index}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.18em] text-[#C18A49]">
                      FILE {project.number}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#99998f]">
                      Case study ↗
                    </span>
                  </div>
                  <p className="mt-5 font-mono text-[9px] uppercase leading-5 tracking-[0.15em] text-[#aaa494]">
                    {project.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-[#D8D0BE]">
                    {project.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#aaa99f]">
                    {project.summary}
                  </p>
                  <ul aria-label={`${project.title} technologies`} className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <li
                        key={technology}
                        className="archive-project-tag border border-[#454841] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[#b8b2a4]"
                      >
                        {technology}
                      </li>
                    ))}
                    {project.technologies.length > 4 ? (
                      <li className="archive-project-tag px-1 py-1 font-mono text-[9px] text-[#898980]">
                        +{project.technologies.length - 4}
                      </li>
                    ) : null}
                  </ul>
                </div>
              </Link>
            </article>
          ))}
    </div>
  );
}

export function ProjectsIndex() {
  return (
    <main className="min-h-screen bg-[#111211] text-[#D8D0BE]">
      <header className="border-b border-[#3b3e39]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-[#D8D0BE] outline-none focus-visible:ring-2 focus-visible:ring-[#C18A49]"
          >
            THE ARCHIVE
          </Link>
          <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#aaa494]">
            <span>Engineering index</span>
            <span className="px-2 text-[#C18A49]" aria-hidden="true">/</span>
            <span className="text-[#D8D0BE]">Projects</span>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#C18A49]">
            Project files · Selected work
          </p>
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.06em] text-[#D8D0BE] sm:text-6xl lg:text-7xl">
            Selected work
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#aaa99f] sm:text-base">
            Systems, experiments, and tools built across retrieval, agentic workflows,
            personal analytics, and recommendation engineering.
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8c8d86]">
            <span className="h-px w-10 bg-[#C18A49]" />
            Select a file to open its case study
          </div>
        </div>
        <ProjectCards />
      </section>

      <footer className="border-t border-[#3b3e39]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 font-mono text-[9px] uppercase tracking-[0.16em] text-[#777a72] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>THE ARCHIVE · Engineering portfolio</span>
          <Link href="/" className="w-fit text-[#c2baa9] outline-none hover:text-[#C18A49] focus-visible:ring-2 focus-visible:ring-[#C18A49]">
            Return home
          </Link>
        </div>
      </footer>
    </main>
  );
}
