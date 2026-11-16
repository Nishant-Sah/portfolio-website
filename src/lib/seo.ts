import { site } from "@/data/site";
import type { Project } from "@/data/projects";
import type { ExperienceDetail } from "@/data/experience";

export const siteUrl = site.url.replace(/\/$/, "");
export const abs = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const clip = (text: string, max = 155) => {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\-]+$/, "") + "…";
};

export const OG_IMAGE = {
  url: "/og/nishant-sah-og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role} at ${site.university}`,
};

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const sameAs = [site.linkedin, site.github].filter((u): u is string => Boolean(u));

const knowsAbout = [
  "Computer engineering",
  "C++",
  "C programming",
  "Data structures and algorithms",
  "Internet of Things",
  "Arduino",
  "ESP32",
  "Robotics",
  "Edge AI",
  "NVIDIA Jetson",
];

const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: siteUrl,
  image: abs(site.photo),
  jobTitle: site.role,
  description: `${site.name} is a ${site.role.toLowerCase()} at ${site.university} building robotics, IoT and software projects.`,
  affiliation: { "@type": "CollegeOrUniversity", name: site.university },
  address: { "@type": "PostalAddress", addressCountry: "NP" },
  knowsAbout,
  sameAs,
};

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": personId },
};

const profilePage = {
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: siteUrl,
  name: `${site.name} | ${site.role}`,
  inLanguage: "en",
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": personId },
};

type Crumb = { name: string; path: string };
const breadcrumb = (items: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const homeGraph = () => ({ "@context": "https://schema.org", "@graph": [person, website, profilePage] });

export const projectGraph = (p: Project) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": p.repo ? "SoftwareSourceCode" : "CreativeWork",
      "@id": `${abs(`/projects/${p.slug}`)}#project`,
      url: abs(`/projects/${p.slug}`),
      name: p.title,
      description: p.description,
      keywords: p.tags.join(", "),
      inLanguage: "en",
      author: { "@id": personId },
      isPartOf: { "@id": websiteId },
      ...(p.repo ? { codeRepository: p.repo } : {}),
    },
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#projects" },
      { name: p.title, path: `/projects/${p.slug}` },
    ]),
  ],
});

export const experienceGraph = (e: ExperienceDetail) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${abs(`/experience/${e.slug}`)}#page`,
      url: abs(`/experience/${e.slug}`),
      name: e.title,
      description: e.summary,
      inLanguage: "en",
      author: { "@id": personId },
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
    },
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Experience", path: "/#experience" },
      { name: e.title, path: `/experience/${e.slug}` },
    ]),
  ],
});
