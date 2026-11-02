import type { Metadata } from "next";
import { ProjectsIndex } from "@/features/projects/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects — THE ARCHIVE",
  description:
    "Selected engineering projects across retrieval systems, agentic AI, analytics, recommendation systems, and automation.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    siteName: "THE ARCHIVE",
    title: "Projects — THE ARCHIVE",
    description:
      "Selected engineering projects across retrieval systems, agentic AI, analytics, recommendation systems, and automation.",
    url: "/projects",
  },
  twitter: {
    card: "summary",
    title: "Projects — THE ARCHIVE",
    description:
      "Selected engineering projects across retrieval systems, agentic AI, analytics, recommendation systems, and automation.",
  },
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
