"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionStyle } from "motion/react";
import { site } from "@/data/site";

const word =
  "absolute left-1/2 top-1/2 z-10 select-none font-black uppercase leading-none tracking-tight text-white text-[clamp(1.6rem,6.2vw,5.5rem)] [text-shadow:0_0_28px_rgba(255,255,255,0.35)]";
const shift = "(var(--bh) + 0.3em + 50%) * var(--p)";

export default function AboutReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      scrollYProgress.set(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [scrollYProgress]);

  const split = useTransform(scrollYProgress, [0.05, 0.28], [0, 1]);
  const move = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);
  const boxScale = useTransform(scrollYProgress, [0, 0.28], [1.5, 1]);
  const wordsOpacity = useTransform(scrollYProgress, [0.28, 0.38], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.58, 0.7], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.58, 0.7], [40, 0]);

  const vars = {
    "--p": reduce ? 1 : split,
    "--m": reduce ? 1 : move,
    "--bh": "calc(var(--bw) / 2)",
    "--bw": "clamp(150px, 28vw, 300px)",
    "--gap": "3rem",
    "--tw": "min(34rem, 46vw)",
  } as unknown as MotionStyle;

  return (
    <section id="about">
      <div ref={ref} className={reduce ? "" : "h-[240svh]"}>
        <motion.div
          style={vars}
          className={`${reduce ? "relative min-h-svh py-20" : "sticky top-0 h-svh pt-16"} flex items-center justify-center overflow-hidden [--gx:0px] md:[--gx:calc((var(--gap)+var(--tw))/2)]`}
        >
          <div className="grid w-full max-w-5xl grid-cols-1 items-center justify-center gap-6 px-6 md:w-auto md:max-w-none md:grid-cols-[var(--bw)_var(--tw)] md:gap-[var(--gap)]">
            <div className="relative mx-auto" style={{ width: "var(--bw)", transform: "translateX(calc(var(--gx) * (1 - var(--m))))" }}>
              <motion.div
                style={reduce ? undefined : { scale: boxScale }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(ellipse_at_30%_0%,rgba(129,117,255,0.35),#0b0b0f_70%)] shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              >
                {site.photo && (
                  <Image src={site.photo} alt={`Portrait of ${site.name}`} fill priority unoptimized sizes="300px" className="object-cover object-top" />
                )}
              </motion.div>
              <motion.div aria-hidden style={reduce ? { opacity: 0 } : { opacity: wordsOpacity }} className="pointer-events-none absolute inset-0">
                <span className={word} style={{ transform: `translate(calc(-50% - ${shift}), calc(-50% - 0.55em + 0.25em * var(--p)))` }}>
                  About
                </span>
                <span className={word} style={{ transform: `translate(calc(-50% + ${shift}), calc(-50% + 0.55em + 0.35em * var(--p)))` }}>
                  Me
                </span>
              </motion.div>
            </div>
            <motion.div style={reduce ? undefined : { opacity: textOpacity, x: textX }} className="space-y-3 text-sm leading-6 text-zinc-300 md:text-base md:leading-7">
              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">About me</h2>
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
