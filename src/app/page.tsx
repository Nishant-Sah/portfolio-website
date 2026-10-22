"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Link2, Code, FileDown, MapPin, ArrowUpRight, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSceneLoader from "@/components/HeroSceneLoader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import PhotoFloat from "@/components/PhotoFloat";
import TypedText from "@/components/TypedText";
import ContactForm from "@/components/ContactForm";
import SkillLogo from "@/components/SkillLogo";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { useHeroIntro } from "@/context/HeroIntroContext";

// Defined at module level so server and client evaluate the exact same reference
const MINI_SLUGS = new Set([
  "robo-soccer-bot",
  "obstacle-avoidance-robot",
  "smart-blind-stick",
  "u-turn-robot",
  "lpg-gas-temperature-detection",
  "smart-dustbin",
  "mini-weather-monitoring-station",
]);
const featuredProjects = projects.filter((p) => !MINI_SLUGS.has(p.slug));
const miniProjects = projects.filter((p) => MINI_SLUGS.has(p.slug));

const section = "mx-auto max-w-6xl px-6 py-10 md:py-14";
const h2 = "text-3xl font-semibold tracking-tight";
const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition";


export default function Home() {
  const { isRevealed, registerContentContainer } = useHeroIntro();
  const portfolioContentRef = useRef<HTMLDivElement>(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");
  const [mounted, setMounted] = useState(false);

  const allSkills = skillGroups.flatMap((g) => g.items);
  const displayedSkills =
    activeSkillCategory === "All"
      ? allSkills
      : skillGroups.find((g) => g.title === activeSkillCategory)?.items || allSkills;

  useEffect(() => {
    registerContentContainer(portfolioContentRef.current);
    setMounted(true);
  }, [registerContentContainer]);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main id="main">
        {/* Hero Section */}
        <section className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-8 pt-[calc(3.5rem+0.75rem)] text-center md:pb-12 md:pt-[calc(4rem+1rem)]">
          {/* ONE shared square wrapper: aspect-ratio 1/1, centered with mx-auto, relative */}
          <div
            id="hero-orb-wrapper"
            className="relative mx-auto mb-3 sm:mb-4 aspect-square w-[clamp(240px,36vw,340px)]"
          >
            {/* Canvas centered on the wrapper with full-viewport drawing surface for cinematic zoom out */}
            <HeroSceneLoader />
            {/* Portrait fills the wrapper with smooth bottom blend */}
            <PhotoFloat
              priority
              depth={10}
              enableGame={true}
              maskBottom={true}
              className="w-full h-full"
            />
          </div>

          {/* Synchronized Reveal Container: Hidden in idle, fades in with the wireframe expansion */}
          <div
            ref={portfolioContentRef}
            inert={!isRevealed}
            className={`w-full transition-opacity duration-1000 ease-out ${
              !isRevealed
                ? "pointer-events-none opacity-0 select-none"
                : "pointer-events-auto opacity-100 select-auto"
            }`}
          >
            <p className="relative z-10 mt-2 text-sm text-violet-300 sm:mt-3">
              Computer Engineering Â· {site.university} Â· 2nd year, 1st semester
            </p>
            <h1 className="relative z-10 mt-2 text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl">
              Nishant{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Sah
              </span>
            </h1>
            <p className="relative z-10 mt-3 text-lg text-zinc-300 md:text-xl">
              Computer Engineering Student Â· Robotics & IoT Â· Lifelong learner
            </p>
            <p className="relative z-10 mt-2 min-h-6 font-mono text-violet-300">
              Exploring{" "}
              <TypedText
                words={["C++ and DSA", "ESP32 and IoT", "Robotics", "Edge AI on Jetson"]}
              />
            </p>
            <p className="relative z-10 mt-3.5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-zinc-300">
              {site.tagline} Every build teaches me something the classroom cannot.
            </p>
            <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="#projects"
                className={`${btn} bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:brightness-110`}
              >
                View projects
              </a>
              <a
                href="#contact"
                className={`${btn} border border-white/20 hover:border-violet-400`}
              >
                Contact me
              </a>
              {site.resume && (
                <a
                  href={site.resume}
                  download
                  className={`${btn} text-zinc-300 hover:text-white`}
                >
                  <FileDown size={16} aria-hidden /> Download resume
                </a>
              )}
            </div>
            <a
              href="#about"
              aria-label="Scroll to about"
              className="relative z-10 mt-7 inline-flex h-9 w-5.5 justify-center rounded-full border border-white/30 pt-1.5"
            >
              <span className="h-1.5 w-1 animate-bounce rounded-full bg-white/70" />
            </a>
          </div>
        </section>

        {/* Portfolio Content: In the DOM for SEO, revealed during expansion */}
        <div
          inert={!isRevealed}
          className={`transition-opacity duration-1000 ease-out ${
            !isRevealed
              ? "pointer-events-none opacity-0 select-none"
              : "pointer-events-auto opacity-100 select-auto"
          }`}
        >
          {/* About Section */}
          <section id="about" className={section}>
            <div className="grid items-center gap-8 md:grid-cols-[280px_1fr]">
              <PhotoFloat depth={50} enableGame={true} className="glass mx-auto w-56 rounded-3xl p-4 md:w-full" />
              <Reveal>
                <h2 className={h2}>About</h2>
                <div className="mt-4 max-w-2xl space-y-3 leading-7 text-zinc-300">
                  <p>
                    I am a second-year, first-semester Computer Engineering student at {site.university}, Dhulikhel. I did my +2 in Computer Science at Shikshadeep College (GPA 3.75).
                  </p>
                  <p>
                    I like building things that work in the real world: IoT systems, robots and web applications. I know C++, C, HTML and CSS well, I am working through data structures and algorithms, and I am building an e-commerce website.
                  </p>
                  <p>
                    I want to go deeper into embedded systems, Edge AI and autonomous robotics.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Featured Projects Section */}
          <section id="projects" className={section}>
            <div className="max-w-3xl">
              <h2 className={h2}>Featured Projects</h2>
              <p className="mt-2 text-base leading-relaxed text-zinc-300">
                A collection of hardware and software builds spanning competition-grade arena robotics, multi-channel IoT home automation, and modern web applications. Every project is engineered with an emphasis on hardware reliability, real-world utility, and clean code. Click on any project to inspect its architecture, hardware specs, photos, and GitHub repository.
              </p>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </section>

          {/* Mini Projects Section */}
          <section id="mini-projects" className={section}>
            <div className="max-w-3xl">
              <h2 className={h2}>Mini Projects</h2>
              <p className="mt-2 text-base leading-relaxed text-zinc-300">
                Hands-on competition robots, workshop builds, sensor experiments, and automation prototypes.
              </p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {miniProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="glass group flex h-full flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[0_8px_24px_rgba(129,117,255,0.14)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-snug text-white transition group-hover:text-violet-200">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        size={15}
                        className="mt-0.5 shrink-0 text-zinc-500 transition group-hover:text-violet-300"
                        aria-hidden
                      />
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/5 bg-white/[0.05] px-2 py-0.5 text-[11px] font-medium text-violet-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-2 text-[11px]">
                      {p.certificate ? (
                        <span className="inline-flex items-center gap-1 font-medium text-amber-300">
                          <Award size={12} /> Award / Certificate
                        </span>
                      ) : (
                        <span className="text-zinc-500">{p.category}</span>
                      )}
                      {p.repo && (
                        <span className="flex items-center gap-1 font-medium text-zinc-500 transition group-hover:text-violet-300">
                          <Code size={11} aria-hidden /> GitHub
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills Section */}
          <section id="skills" className={section}>
            {mounted && (
              <>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur shadow-sm">
                    Skills
                  </span>
                  <h2 className={`${h2} mt-3 text-white`}>Technical Arsenal & Tools</h2>
                  <p className="mt-2 text-sm sm:text-base text-zinc-300">
                    Languages, frameworks, hardware architectures, and developer tooling I work with.
                  </p>
                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    {["All", ...skillGroups.map((g) => g.title)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveSkillCategory(cat)}
                        className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                          activeSkillCategory === cat
                            ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.45)] border border-violet-400/60"
                            : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Skill Grid */}
                <div className="flex flex-wrap justify-center items-start gap-x-10 sm:gap-x-14 md:gap-x-16 gap-y-14 max-w-5xl mx-auto py-6">
                  {displayedSkills.map((s) => (
                    <div
                      key={s.name}
                      className="group flex flex-col items-center justify-start text-center transition-all duration-300 hover:-translate-y-2 cursor-pointer w-full max-w-[120px]"
                    >
                      <div className="flex h-16 w-16 sm:h-[84px] sm:w-[84px] items-center justify-center transition-transform duration-300 group-hover:scale-115 drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                        <SkillLogo
                          name={s.name}
                          size={65}
                          className="transition-all duration-300 group-hover:brightness-110"
                        />
                      </div>
                      <span
                        title={s.name}
                        className="mt-3 text-sm sm:text-[15px] font-semibold text-white tracking-wide transition group-hover:text-violet-300 leading-tight"
                      >
                        {s.shortName || s.name}
                      </span>
                      {s.note && (
                        <span className="mt-1 text-[11px] font-medium text-violet-400">
                          ({s.note})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
          {/* Experience Section */}
          <section id="experience" className={section}>
            <div className="max-w-3xl">
              <h2 className={h2}>Experience & achievements</h2>
              <p className="mt-2 text-base leading-relaxed text-zinc-300">
                Robotics leadership, national championship wins, youth STEM training, and specialized Edge AI workshops. Hover and click any card to view its official certificate, works executed, and event photo gallery.
              </p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {experienceData.map((item) => (
                <Link
                  key={item.slug}
                  href={`/experience/${item.slug}`}
                  className="glass group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/60 hover:shadow-[0_12px_32px_rgba(129,117,255,0.16)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md border border-white/5 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-violet-300">
                        {item.category}
                      </span>
                      <span className="text-xs text-zinc-400">{item.date}</span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-white transition group-hover:text-violet-200">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-violet-300">
                      {item.organization}
                    </p>

                    <p className="mt-2.5 text-sm leading-6 text-zinc-300 line-clamp-3">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3.5 text-xs font-medium">
                    {item.certificate ? (
                      <span className="inline-flex items-center gap-1 text-amber-300">
                        <Award size={13} /> Certificate
                      </span>
                    ) : (
                      <span className="text-zinc-400 truncate max-w-[120px]">{item.roleOrAward}</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-violet-300 transition group-hover:text-white group-hover:translate-x-0.5">
                      View Event <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className={section}>
            <h2 className={`${h2} text-center`}>Let&apos;s talk</h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-zinc-300">
              Whether you want to collaborate, give feedback on a project, or just say hello from Nepal, I would like to hear from you.
            </p>
            <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div className="space-y-3">
                <PhotoFloat depth={30} enableGame={true} maskBottom={true} className="mx-auto mb-4 w-40" />
                <a
                  href={`mailto:${site.email}`}
                  className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:border-violet-400/50"
                >
                  <Mail size={18} className="text-violet-300" aria-hidden />
                  <span className="min-w-0 break-all text-sm">{site.email}</span>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:border-violet-400/50"
                >
                  <Link2 size={18} className="text-violet-300" aria-hidden />
                  <span className="text-sm">LinkedIn: nishant-sah</span>
                </a>
                {site.github && (
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:border-violet-400/50"
                  >
                    <Code size={18} className="text-violet-300" aria-hidden />
                    <span className="text-sm">GitHub: Nishant-Sah</span>
                  </a>
                )}
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-3 rounded-2xl p-4 transition hover:border-violet-400/50 hover:text-white"
                  title="Open Google Maps"
                >
                  <MapPin size={18} className="text-violet-300" aria-hidden />
                  <span className="text-sm">{site.location}</span>
                </a>
              </div>
              <ContactForm />
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </div>
  );
}
