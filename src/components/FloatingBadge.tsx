"use client";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import TypedText from "./TypedText";
import { useHeroIntro } from "@/context/HeroIntroContext";

const words = ["Hi, I'm Nishant", "Robotics & IoT", "C++ and DSA", "Let's build"];

export default function FloatingBadge() {
  const reduce = useReducedMotion();
  const { isRevealed } = useHeroIntro();
  const { scrollY } = useScroll();
  const [scrolledPast, setScrolledPast] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolledPast(v > 160));

  if (!isRevealed) return null;

  return (
    <motion.a
      href="/#contact"
      aria-label="Jump to contact"
      className={`glass fixed left-3 top-[3.75rem] sm:top-16 z-30 flex items-center gap-2 rounded-full p-1 sm:p-1.5 pr-1.5 sm:pr-4 ${
        scrolledPast ? "pointer-events-none" : "pointer-events-auto"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: scrolledPast ? 0 : 1, scale: scrolledPast ? 0.85 : 1 }}
      whileHover={scrolledPast ? undefined : { scale: 1.08 }}
      whileFocus={scrolledPast ? undefined : { scale: 1.08 }}
      whileTap={scrolledPast ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ transformOrigin: "left top" }}
    >
      <motion.span
        className="relative block h-10 w-10 sm:h-12 sm:w-12 shrink-0"
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="hexg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff4fa3" />
              <stop offset="1" stopColor="#8175ff" />
            </linearGradient>
          </defs>
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            fill="rgba(255,79,163,0.12)"
            stroke="url(#hexg)"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </svg>
        <motion.span
          aria-hidden
          className="absolute -inset-1"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-pink-400 shadow-[0_0_10px_#ff4fa3]" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300" />
        </motion.span>
      </motion.span>
      <span aria-hidden className="hidden min-w-[8.5rem] font-mono text-xs text-pink-200 sm:block">
        <TypedText words={words} />
      </span>
    </motion.a>
  );
}
