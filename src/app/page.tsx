"use client";

import { useRef, useEffect, useState } from "react";
import { Mail, Link2, Code, FileDown, MapPin } from "lucide-react";
import ExperienceStack from "@/components/ExperienceStack";
import Navbar from "@/components/Navbar";
import AboutReveal from "@/components/AboutReveal";
import ProjectStack from "@/components/ProjectStack";
import ContactFooter from "@/components/ContactFooter";
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
    <div id="top" className="min-h-screen overflow-x-clip">
      <Navbar />
      <main id="main">
        {/* Hero Section */}
        <section className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-8 pt-[calc(3.5rem+0.75rem)] text-center md:pb-12 md:pt-[calc(4rem+1rem)]">
          {/* ONE shared square wrapper: aspect-ratio 1/1, centered with mx-auto, relative */}
          <div
            id="hero-orb-wrapper"
            className="relative mx-auto mb-3 sm:mb-4 aspect-square w-[clamp(260px,min(44vw,50vh),440px)]"
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
              Computer Engineering · {site.university} · 2nd year, 1st semester
            </p>
            <h1 className="relative z-10 mt-2 text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl">
              Nishant{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Sah
              </span>
            </h1>
            <p className="relative z-10 mt-3 text-lg text-zinc-300 md:text-xl">
              Computer Engineering Student · Robotics & IoT · Lifelong learner
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
          <AboutReveal>
            <p>I am a second-year, first-semester Computer Engineering student at {site.university}, Dhulikhel. I completed my +2 in Computer Science at Shikshadeep College.</p>
            <p>I enjoy building software that solves real problems, from modern web applications to connected IoT systems. I have a strong command of C and C++, build web interfaces with HTML, CSS and JavaScript, and sharpen my problem-solving through data structures and algorithms. Right now, I am applying it all to an e-commerce website I am building.</p>
            <p>I also explore AI and Edge AI, with NVIDIA certifications in Jetson Nano, Isaac Sim and RAG, alongside Git, Docker and cloud fundamentals. I want to keep growing across web development, AI and modern software tools.</p>
          </AboutReveal>

          {/* Featured Projects Section */}
          <ProjectStack id="projects" title="Featured Projects" intro="Competition robotics, IoT home automation and web applications. Open a project for its architecture, hardware, photos and repository." projects={featuredProjects} />

          {/* Mini Projects Section */}
          <ProjectStack id="mini-projects" title="Mini Projects" intro="Competition robots, workshop builds, sensor experiments and automation prototypes." projects={miniProjects} compact />

          {/* Skills Section */}
          <section id="skills" className={section}>
            {mounted && (
              <>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300 backdrop-blur shadow-sm">
                    Skills
                  </span>
                  <h2 className={`${h2} mt-3 text-white`}>Skills & Technologies</h2>
                  <p className="mt-2 text-sm sm:text-base text-zinc-300">
                    Programming languages, web technologies, embedded platforms and engineering tools I work with.
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
          <ExperienceStack id="experience" title="Experience & achievements" intro="Robotics leadership, national championship wins, youth STEM training, and specialized Edge AI workshops. Open an event to see its certificate, works executed and photo gallery." items={experienceData} />

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

          <ContactFooter />
        </div>
      </main>
    </div>
  );
}
