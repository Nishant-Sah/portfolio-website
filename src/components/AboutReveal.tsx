"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { site } from "@/data/site";

const word =
  "absolute left-1/2 top-1/2 z-10 select-none font-black uppercase leading-none tracking-tight text-white text-[clamp(1.6rem,6.2vw,5.5rem)] [text-shadow:0_0_28px_rgba(255,255,255,0.35)]";
const shift = "(var(--bh) + 0.3em + 50%) * var(--p)";

export default function AboutReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const split = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);
  const boxScale = useTransform(scrollYProgress, [0, 0.5], [1.5, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const vars = { "--p": reduce ? 1 : split, "--bh": "calc(clamp(150px, 28vw, 300px) / 2)" } as unknown as MotionStyle;

  return (
    <section id="about">
      <h2 className="sr-only">About</h2>
      <div ref={ref} className={reduce ? "" : "h-[220svh]"}>
        <motion.div
          style={vars}
          className={`${reduce ? "relative h-[70svh]" : "sticky top-0 h-svh"} flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,rgba(129,117,255,0.12),transparent_65%)]`}
        >
          <motion.div
            style={reduce ? undefined : { scale: boxScale }}
            className="relative aspect-[4/5] w-[clamp(150px,28vw,300px)] overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(ellipse_at_30%_0%,rgba(129,117,255,0.35),#0b0b0f_70%)] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          >
            {site.photo && (
              <motion.div style={reduce ? undefined : { opacity: photoOpacity }} className="absolute inset-0">
                <Image src={site.photo} alt={`Portrait of ${site.name}`} fill sizes="300px" className="object-cover object-top" />
              </motion.div>
            )}
          </motion.div>
          <span
            aria-hidden
            className={word}
            style={{ transform: `translate(calc(-50% - ${shift}), calc(-50% - 0.55em + 0.25em * var(--p)))` }}
          >
            About
          </span>
          <span
            aria-hidden
            className={word}
            style={{ transform: `translate(calc(-50% + ${shift}), calc(-50% + 0.55em + 0.35em * var(--p)))` }}
          >
            Me
          </span>
        </motion.div>
      </div>
      <div className="mx-auto max-w-3xl space-y-3 px-6 pb-14 pt-6 leading-7 text-zinc-300">{children}</div>
    </section>
  );
}
