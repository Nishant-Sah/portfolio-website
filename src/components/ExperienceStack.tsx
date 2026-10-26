"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, Layers, Shuffle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { ExperienceDetail } from "@/data/experience";

const TILT = [-3, 2.5, -1.5, 3.5, -2.5, 1.5, -3.5, 2];

type CardProps = {
  item: ExperienceDetail;
  i: number;
  n: number;
  progress: MotionValue<number>;
  scattered: boolean;
  reduce: boolean;
  onScatter: () => void;
};

function StackCard({ item, i, n, progress, scattered, reduce, onScatter }: CardProps) {
  const depth = n - 1 - i;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - Math.min(depth, 6) * 0.03]);
  const filter = useTransform(progress, [i / n, 1], ["brightness(1)", `brightness(${Math.max(0.5, 1 - Math.min(depth, 6) * 0.1)})`]);
  const rows: [string, string][] = [["Role / award", item.roleOrAward], ["Date", item.date]];
  if (item.location) rows.splice(1, 0, ["Location", item.location]);
  if (item.skillsGained?.length) rows.push(["Skills", item.skillsGained.slice(0, 3).join(", ")]);

  return (
    <motion.li
      layout={!reduce}
      transition={{ type: "spring", stiffness: 130, damping: 18 }}
      animate={{ rotate: scattered ? TILT[i % TILT.length] : 0 }}
      className={scattered ? "relative" : "sticky mb-[14vh] last:mb-0"}
      style={scattered ? undefined : { top: `calc(5rem + ${(i % 6) * 14}px)` }}
    >
      <motion.article
        onClick={scattered ? undefined : onScatter}
        style={scattered || reduce ? undefined : { scale, filter }}
        whileHover={scattered ? { y: -6 } : undefined}
        className={`rounded-3xl border border-white/10 bg-[#0e0e12] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-colors hover:border-[color:var(--stack-accent)] sm:p-10 ${
          scattered ? "" : "cursor-pointer md:grid md:h-[28rem] md:grid-cols-[1.5fr_1fr] md:items-center md:gap-10"
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[color:var(--stack-accent)]">{"// "}{item.category}</span>
            <span className="text-zinc-400">{item.date}</span>
          </div>
          <h3 className="mt-4 line-clamp-3 text-[clamp(1.9rem,4.6vw,3.4rem)] uppercase leading-[0.98] text-white [font-family:var(--font-display),Impact,sans-serif]">
            {item.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-zinc-200">{item.organization}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-300 sm:text-base">{item.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`/experience/${item.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--stack-accent)] px-4 py-2 font-semibold text-black transition hover:brightness-110"
            >
              View event <ArrowUpRight size={15} aria-hidden />
            </Link>
            {item.certificate && (
              <span className="inline-flex items-center gap-1.5 text-[color:var(--stack-accent)]">
                <Award size={15} aria-hidden /> Certificate
              </span>
            )}
          </div>
        </div>
        {!scattered && (
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

type Props = { id: string; title: string; intro: string; items: ExperienceDetail[] };

export default function ExperienceStack({ id, title, intro, items }: Props) {
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
        {items.map((item, i) => (
          <StackCard key={item.slug} item={item} i={i} n={items.length} progress={scrollYProgress} scattered={scattered} reduce={reduce} onScatter={() => setScattered(true)} />
        ))}
      </ul>
    </section>
  );
}
