import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a ${site.role.toLowerCase()} at ${site.university}, building robotics, IoT and software projects.`,
    "",
    "## Main pages",
    `- [Portfolio home](${abs("/")}): about, skills, projects, experience and contact`,
    "",
    "## Projects",
    ...projects.map((p) => `- [${p.title}](${abs(`/projects/${p.slug}`)}): ${p.description}`),
    "",
    "## Profiles",
    `- [LinkedIn](${site.linkedin})`,
    ...(site.github ? [`- [GitHub](${site.github})`] : []),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
