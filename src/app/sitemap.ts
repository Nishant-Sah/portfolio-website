import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { experienceData } from "@/data/experience";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const experienceEntries = experienceData.map((e) => ({
    url: `${site.url}/experience/${e.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: site.url, lastModified: new Date() },
    ...projectEntries,
    ...experienceEntries,
  ];
}

