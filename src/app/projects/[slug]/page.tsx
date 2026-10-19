import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Cpu,
  Code2,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  FolderGit2
} from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | ${site.name}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#121216] text-[#f4f4f7]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-6">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-violet-400 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-1" />
            Back to all projects
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-zinc-200">Portfolio</Link>
            <ChevronRight size={12} />
            <Link href="/#projects" className="hover:text-zinc-200">Projects</Link>
            <ChevronRight size={12} />
            <span className="text-violet-300 truncate max-w-[150px] sm:max-w-none">{project.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {project.category}
            </span>
            {project.semester && (
              <span className="rounded-md border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300">
                🎓 {project.semester}
              </span>
            )}
            {project.certificate && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                <Award size={13} aria-hidden /> Award Winning
              </span>
            )}
            {project.status && (
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                {project.status}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:brightness-110 hover:shadow-violet-600/40"
              >
                <GithubIcon size={16} />
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-violet-400 hover:text-white"
              >
                <ExternalLink size={16} aria-hidden />
                Live Demo
              </a>
            )}
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.07] hover:text-white"
            >
              <Layers size={16} aria-hidden />
              View Gallery & Specs
            </a>
          </div>
        </section>

        {/* Certificate / Recognition Banner if available */}
        {project.certificate && (
          <section className="mt-12 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 md:p-8 backdrop-blur">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_24px_rgba(245,158,11,0.25)]">
                <Award size={28} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Official Recognition
                  </span>
                  {project.certificate.date && (
                    <span className="text-xs text-zinc-400">· {project.certificate.date}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {project.certificate.title}
                </h3>
                {project.certificate.award && (
                  <p className="text-sm font-medium text-amber-200">
                    {project.certificate.award}
                  </p>
                )}
                <p className="text-xs text-zinc-400">
                  Issued by: <span className="text-zinc-300">{project.certificate.issuer}</span>
                </p>
                {project.certificate.note && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300 italic">
                    &ldquo;{project.certificate.note}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Detailed Description */}
        <section className="glass mt-12 rounded-3xl p-6 md:p-10 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles size={20} className="text-violet-400" />
            About the Project
          </h2>
          <p className="text-base leading-8 text-zinc-300 md:text-lg">
            {project.detailedDescription}
          </p>
        </section>

        {/* Key Features */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CheckCircle2 size={20} className="text-violet-400" />
            Key Engineering Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="glass group rounded-2xl p-5 transition-all duration-300 hover:border-violet-400/50 hover:bg-white/[0.06] hover:translate-x-1"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-6 text-zinc-200">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hardware & Software Components Grid */}
        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {project.hardware && project.hardware.length > 0 && (
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu size={20} className="text-violet-400" />
                Hardware & Microcontrollers
              </h3>
              <p className="text-xs text-zinc-400">
                Key physical modules, sensors, and IC components integrated:
              </p>
              <ul className="space-y-2.5 pt-2">
                {project.hardware.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.software && project.software.length > 0 && (
            <div className="glass rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 size={20} className="text-pink-400" />
                Software & Protocols
              </h3>
              <p className="text-xs text-zinc-400">
                Firmware libraries, communication protocols, and control stacks:
              </p>
              <ul className="space-y-2.5 pt-2">
                {project.software.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Gallery / Project Photos Section */}
        <section id="gallery" className="mt-16 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Layers size={20} className="text-violet-400" />
                Project Gallery & Prototype Views
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Snapshots, schematics, and functional bench tests for {project.title}.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((item, idx) => (
              <div
                key={idx}
                className="glass group overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[0_16px_36px_rgba(129,117,255,0.18)]"
              >
                {/* Visual Card Frame */}
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950/40 via-zinc-900 to-black p-6">
                  {/* Subtle technical grid pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#8175ff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center transition duration-300 group-hover:scale-105">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/15 text-violet-300 shadow-[0_0_20px_rgba(129,117,255,0.25)]">
                      <FolderGit2 size={24} />
                    </div>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Photo View #{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-semibold text-white group-hover:text-violet-200 transition">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-zinc-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-400 italic text-center pt-2">
            Tip: You can add your high-res photos to <code className="text-violet-300">public/images/projects/{project.slug}/</code> to display actual build snapshots.
          </p>
        </section>

        {/* Project Navigation */}
        <section className="mt-20 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="glass group flex w-full sm:w-auto items-center gap-3 rounded-2xl px-5 py-3 transition hover:border-violet-400/50"
            >
              <ArrowLeft size={16} className="text-violet-300 transition group-hover:-translate-x-1" />
              <div className="text-left">
                <span className="block text-[11px] text-zinc-400 uppercase tracking-wider">Previous Project</span>
                <span className="text-sm font-semibold text-white">{prevProject.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="glass group flex w-full sm:w-auto items-center justify-end gap-3 rounded-2xl px-5 py-3 transition hover:border-violet-400/50"
            >
              <div className="text-right">
                <span className="block text-[11px] text-zinc-400 uppercase tracking-wider">Next Project</span>
                <span className="text-sm font-semibold text-white">{nextProject.title}</span>
              </div>
              <ChevronRight size={16} className="text-violet-300 transition group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </section>
      </main>

      <Footer />
    </div>
  );
}
