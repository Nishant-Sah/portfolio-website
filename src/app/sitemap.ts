import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { experienceData } from "@/data/experience";
import { abs } from "@/lib/seo";

// No lastModified: it is only useful when it is accurate, and a "now" date on every build is misleading.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: abs("/") },
    ...projects.map((p) => ({ url: abs(`/projects/${p.slug}`) })),
    ...experienceData.map((e) => ({ url: abs(`/experience/${e.slug}`) })),
  ];
}
