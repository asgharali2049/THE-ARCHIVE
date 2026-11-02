import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/features/projects/ProjectDetail";
import { getProject, projects } from "@/features/projects/projectData";

type ProjectPageProps = PageProps<"/projects/[slug]">;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found — THE ARCHIVE" };

  const canonicalPath = `/projects/${slug}`;
  const title = `${project.title} — THE ARCHIVE`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: canonicalPath,
    },
    twitter: {
      card: "summary",
      title,
      description: project.summary,
    },
  };
}

async function ProjectPageContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <ProjectDetail project={project} previous={previous} next={next} />
  );
}

export default function ProjectPage(props: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <main
          aria-live="polite"
          className="flex min-h-screen items-center justify-center bg-[#111211] px-5 text-[#D8D0BE]"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#C18A49]">
            Opening project file...
          </p>
        </main>
      }
    >
      <ProjectPageContent {...props} />
    </Suspense>
  );
}
