import type { MetadataRoute } from "next";
import { projects } from "@/features/projects/projectData";

const BASE_URL = "https://asgharali2049.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
    },
    {
      url: `${BASE_URL}/projects`,
    },
    ...projects.map(({ slug }) => ({
      url: `${BASE_URL}/projects/${slug}`,
    })),
  ];
}