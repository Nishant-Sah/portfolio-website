import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Layers,
  FolderGit2
} from "lucide-react";
import { experienceData } from "@/data/experience";
import { site } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return experienceData.map((e) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = experienceData.find((e) => e.slug === slug);
  if (!item) return { title: "Experience Not Found" };

  return {
    title: `${item.title} | ${site.name}`,
    description: item.summary,
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const itemIndex = experienceData.findIndex((e) => e.slug === slug);
  const item = experienceData[itemIndex];

  if (!item) {
    notFound();
  }

  const prevItem = itemIndex > 0 ? experienceData[itemIndex - 1] : null;
  const nextItem = itemIndex < experienceData.length - 1 ? experienceData[itemIndex + 1] : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#121216] text-[#f4f4f7]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10 md:py-16">
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-6">
          <Link
            href="/#experience"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:border-violet-400 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-1" />
            Back to Experience & Achievements
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Link href="/" className="hover:text-zinc-200">Portfolio</Link>
            <ChevronRight size={12} />
            <Link href="/#experience" className="hover:text-zinc-200">Experience</Link>
            <ChevronRight size={12} />
            <span className="text-violet-300 truncate max-w-[150px] sm:max-w-none">{item.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              <Calendar size={13} className="text-violet-400" />
              {item.date}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <MapPin size={13} className="text-pink-400" />
                {item.location}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            {item.title}
          </h1>

          <div className="flex items-center gap-2 text-base text-zinc-300">
            <Building2 size={18} className="text-violet-400 shrink-0" />
            <span className="font-medium text-white">{item.organization}</span>
            <span className="text-zinc-500">·</span>
            <span className="text-violet-300">{item.roleOrAward}</span>
          </div>

          <p className="max-w-3xl text-lg leading-relaxed text-zinc-300">
            {item.summary}
          </p>
        </section>

        {/* Certificate Section if Available */}
        {item.certificate && (
          <section className="mt-12 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent p-6 md:p-8 backdrop-blur shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_24px_rgba(245,158,11,0.3)]">
                <Award size={32} />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Official Certificate & Honors
                  </span>
                  {item.certificate.date && (
                    <span className="text-xs text-zinc-400">· {item.certificate.date}</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {item.certificate.title}
                </h3>
                {item.certificate.award && (
                  <p className="text-base font-semibold text-amber-300">
                    🏆 {item.certificate.award}
                  </p>
                )}
                <p className="text-xs text-zinc-400">
                  Issuing Authority: <span className="text-zinc-200 font-medium">{item.certificate.issuer}</span>
                </p>
                {item.certificate.verificationNote && (
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300 italic border-l-2 border-amber-500/50 pl-3">
                    &ldquo;{item.certificate.verificationNote}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* About the Event / Experience */}
        <section className="glass mt-12 rounded-3xl p-6 md:p-10 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles size={20} className="text-violet-400" />
            About this Event & Participation
          </h2>
          <p className="text-base leading-8 text-zinc-300 md:text-lg">
            {item.about}
          </p>
        </section>

        {/* Key Works & Contributions */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CheckCircle2 size={20} className="text-violet-400" />
            Works Executed & Responsibilities
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {item.worksDone.map((work, idx) => (
              <div
                key={idx}
                className="glass group rounded-2xl p-5 transition-all duration-300 hover:border-violet-400/50 hover:bg-white/[0.06] hover:translate-x-1"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-300">
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-6 text-zinc-200">
                    {work}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competencies & Skills Gained */}
        <section className="glass mt-12 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-xl font-bold text-white">Skills & Competencies Gained</h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {item.skillsGained.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Photo Gallery Views */}
        <section className="mt-16 space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers size={20} className="text-violet-400" />
              Event Gallery & Documentation Photos
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Photographs, certificates, and on-ground captures from {item.title}.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {item.gallery.map((g, idx) => (
              <div
                key={idx}
                className="glass group overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[0_16px_36px_rgba(129,117,255,0.18)]"
              >
                {/* Frame */}
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950/40 via-zinc-900 to-black p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(#8175ff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  <div className="relative z-10 flex flex-col items-center text-center transition duration-300 group-hover:scale-105">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/15 text-violet-300 shadow-[0_0_20px_rgba(129,117,255,0.25)]">
                      <FolderGit2 size={24} />
                    </div>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Event Photo #{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-semibold text-white group-hover:text-violet-200 transition">
                    {g.title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-zinc-300">
                    {g.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-400 italic text-center pt-2">
            Tip: You can add official event snapshots to <code className="text-violet-300">public/images/events/{item.slug}/</code> to display live event photos.
          </p>
        </section>

        {/* Previous & Next Navigation */}
        <section className="mt-20 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevItem ? (
            <Link
              href={`/experience/${prevItem.slug}`}
              className="glass group flex w-full sm:w-auto items-center gap-3 rounded-2xl px-5 py-3 transition hover:border-violet-400/50"
            >
              <ArrowLeft size={16} className="text-violet-300 transition group-hover:-translate-x-1" />
              <div className="text-left">
                <span className="block text-[11px] text-zinc-400 uppercase tracking-wider">Previous Event</span>
                <span className="text-sm font-semibold text-white">{prevItem.title}</span>
              </div>
            </Link>
          ) : <div />}

          {nextItem ? (
            <Link
              href={`/experience/${nextItem.slug}`}
              className="glass group flex w-full sm:w-auto items-center justify-end gap-3 rounded-2xl px-5 py-3 transition hover:border-violet-400/50"
            >
              <div className="text-right">
                <span className="block text-[11px] text-zinc-400 uppercase tracking-wider">Next Event</span>
                <span className="text-sm font-semibold text-white">{nextItem.title}</span>
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
