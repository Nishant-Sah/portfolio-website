"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { site } from "@/data/site";
import { useHeroIntro } from "@/context/HeroIntroContext";

export default function ScrollAvatar() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const { isRevealed } = useHeroIntro();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 500));

  if (!site.photo || !show || !isRevealed) return null;

  return (
    <motion.a
      href="/#top"
      aria-label="Back to top"
      className="glass fixed bottom-4 right-4 z-30 block h-14 w-14 overflow-hidden rounded-full"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{ y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }, duration: 0.3 }}
      whileHover={{ scale: 1.15 }}
    >
      <span className="block h-full w-full">
        <Image
          src={site.photo}
          alt=""
          width={site.photoSize.width}
          height={site.photoSize.height}
          className="h-full w-full object-cover object-top"
        />
      </span>
    </motion.a>
  );
}
