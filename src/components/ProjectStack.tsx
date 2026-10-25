"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Code, Layers, Shuffle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Project } from "@/data/projects";

const TILT = [-3, 2.5, -1.5, 3.5, -2.5, 1.5, -3.5, 2];
const stop = (e: React.MouseEvent) => e.stopPropagation();

type CardProps = {
  project: Project;
  i: number;
  n: number;
  progress: MotionValue<number>;
  scattered: boolean;
  compact: boolean;
  reduce: boolean;
  onScatter: () => void;
};

function StackCard({ project, i, n, progress, scattered, compact, reduce, onScatter }: CardProps) {
  const depth = n - 1 - i;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - depth * 0.04]);
  const filter = useTransform(progress, [i / n, 1], ["brightness(1)", `brightness(${Math.max(0.45, 1 - depth * 0.14)})`]);
  const wide = !scattered && !compact;
  const rows: [string, string][] = [];
  if (project.status) rows.push(["Status", project.status]);
  rows.push(["Category", project.category]);
  if (project.semester) rows.push(["Semester", project.semester]);
  if (project.hardware?.length) rows.push(["Hardware", project.hardware.slice(0, 3).join(", ")]);
  if (project.software?.length) rows.push(["Software", project.software.slice(0, 3).join(", ")]);

  return (
    <motion.li
      layout={!reduce}
      transition={{ type: "spring", stiffness: 130, damping: 18 }}
      animate={{ rotate: scattered ? TILT[i % TILT.length] : 0 }}
      className={scattered ? "relative" : "sticky mb-[16vh] last:mb-0"}
      style={scattered ? undefined : { top: `calc(5rem + ${i * 14}px)` }}
    >
      <motion.article
        onClick={scattered ? undefined : onScatter}
        style={scattered || reduce ? undefined : { scale, filter }}
        whileHover={scattered ? { y: -6 } : undefined}
        className={`rounded-3xl border border-white/10 bg-[#0e0e12] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-colors hover:border-[color:var(--stack-accent)] sm:p-8 ${
          scattered ? "" : "cursor-pointer"
        } ${wide ? "md:grid md:grid-cols-[1.5fr_1fr] md:gap-8" : ""}`}
      >
        <div className="min-w-0">
          <p className="font-mono text-xs text-[color:var(--stack-accent)]">{"// "}{project.category}</p>
          <h3
            className={`mt-3 uppercase leading-[0.95] text-white [font-family:var(--font-display),Impact,sans-serif] ${
              compact ? "text-[clamp(1.5rem,3.6vw,2.4rem)]" : "text-[clamp(2rem,5.2vw,3.8rem)]"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-zinc-300 sm:text-base">{project.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <li key={t} className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`/projects/${project.slug}`}
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--stack-accent)] px-4 py-2 font-semibold text-black transition hover:brightness-110"
            >
              View project <ArrowUpRight size={15} aria-hidden />
            </Link>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                className="inline-flex items-center gap-1.5 text-zinc-300 transition hover:text-white"
              >
                <Code size={15} aria-hidden /> GitHub
              </a>
            )}
          </div>
        </div>
        {wide && (
          <dl className="mt-6 self-start rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm md:mt-0">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-white/5 py-2 last:border-0">
                <dt className="font-mono text-xs text-zinc-400">{k}</dt>
                <dd className="text-right text-zinc-100">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </motion.article>
    </motion.li>
  );
}

type Props = { id: string; title: string; intro: string; projects: Project[]; compact?: boolean };

export default function ProjectStack({ id, title, intro, projects, compact = false }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [scattered, setScattered] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-10 md:py-14" style={{ "--stack-accent": "#f5c542" } as React.CSSProperties}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-base leading-relaxed text-zinc-300">{intro}</p>
        </div>
        <button
          type="button"
          aria-pressed={scattered}
          onClick={() => setScattered((s) => !s)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:border-[color:var(--stack-accent)]"
        >
          {scattered ? <Layers size={16} aria-hidden /> : <Shuffle size={16} aria-hidden />}
          {scattered ? "Stack again" : "Scatter"}
        </button>
      </div>
      {!scattered && <p className="mt-3 font-mono text-xs text-zinc-400">Scroll to stack. Click a card to scatter.</p>}
      <ul ref={listRef} className={`mt-8 ${scattered ? "grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3" : "block"}`}>
        {projects.map((p, i) => (
          <StackCard
            key={p.slug}
            project={p}
            i={i}
            n={projects.length}
            progress={scrollYProgress}
            scattered={scattered}
            compact={compact}
            reduce={reduce}
            onScatter={() => setScattered(true)}
          />
        ))}
      </ul>
    </section>
  );
}
