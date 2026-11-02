import type { Metadata } from "next";
import { PortfolioHome } from "@/features/portfolio/PortfolioHome";

export const metadata: Metadata = {
  title: "ASGHAR ALI — AI Automation Engineer | AI Systems Engineer",
  description:
    "The portfolio of Asghar Ali, an AI automation and systems engineer building agentic AI, RAG applications, workflow automation, and Python-based software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "THE ARCHIVE",
    title: "ASGHAR ALI — AI Automation Engineer | AI Systems Engineer",
    description:
      "The portfolio of Asghar Ali, an AI automation and systems engineer building agentic AI, RAG applications, workflow automation, and Python-based software.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "ASGHAR ALI — AI Automation Engineer | AI Systems Engineer",
    description:
      "The portfolio of Asghar Ali, an AI automation and systems engineer building agentic AI, RAG applications, workflow automation, and Python-based software.",
  },
};

export default function Home() {
  return <PortfolioHome />;
}
