import type { Metadata } from "next";
import { ProjectsIndex } from "@/features/projects/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects — THE ARCHIVE",
  description:
    "Selected engineering projects across retrieval systems, agentic AI, analytics, recommendation systems, and automation.",
};

export default function ProjectsPage() {
  return <ProjectsIndex />;
}
