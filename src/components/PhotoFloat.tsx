"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { site } from "@/data/site";
import RatGame from "@/components/RatGame";
import { Gamepad2, Sparkles } from "lucide-react";
import { useHeroIntro } from "@/context/HeroIntroContext";

export default function PhotoFloat({
  className,
  depth = 40,
  priority = false,
  enableGame = true,
  maskBottom = true,
}: {
  className?: string;
  depth?: number;
  priority?: boolean;
  enableGame?: boolean;
  maskBottom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { state: introState, triggerReveal } = useHeroIntro();
  const isIntroIdle = introState === "idle";

  const isIntroDone = introState === "done";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  if (!site.photo) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isIntroIdle) {
      triggerReveal();
    } else if (isIntroDone && enableGame) {
      if (gameActive) {
        // If already playing, clicking portrait closes/exits game (prevents duplicacy)
        setGameActive(false);
        setIsHovered(false);
      } else {
        // Start game and immediately clear hover tooltip
        setGameActive(true);
        setIsHovered(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isIntroIdle) {
        triggerReveal();
      } else if (isIntroDone && enableGame) {
        setGameActive((prev) => !prev);
        setIsHovered(false);
      }
    }
  };

  const handleCloseGame = () => {
    setGameActive(false);
    setIsHovered(false);
  };

  return (
    <>
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          ref={ref}
          tabIndex={isIntroIdle ? 0 : -1}
          role={isIntroIdle ? "button" : undefined}
          aria-label={isIntroIdle ? "Open portfolio" : undefined}
          style={reduce ? undefined : { y, rotate }}
          className={`${className ?? ""} group relative flex h-full w-full cursor-pointer select-none items-center justify-center rounded-full outline-none focus:outline-none`}
          onMouseEnter={() => {
            if (isIntroDone && !gameActive) setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          title={
            isIntroIdle
              ? "Click to open portfolio"
              : isIntroDone && enableGame && !gameActive
              ? "Wanna play game? with me! Click to play"
              : isIntroDone && enableGame && gameActive
              ? "Click to exit game"
              : undefined
          }
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-full w-full items-center justify-center overflow-visible"
          >
            {/* Portrait Image centered inside the purple circle with smooth bottom gradient blend */}
            <div
              className={`relative flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-[1.02] ${
                maskBottom
                  ? "[mask-image:linear-gradient(to_bottom,black_0%,black_75%,rgba(0,0,0,0.6)_88%,transparent_98%)]"
                  : ""
              }`}
            >
              <Image
                src={site.photo}
                alt={`Portrait of ${site.name}`}
                width={site.photoSize.width}
                height={site.photoSize.height}
                priority={priority}
                sizes="(max-width: 768px) 70vw, 340px"
                className="h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
              />
            </div>

            {/* "Wanna play game? with me" Prompt - ONLY shown when intro is completely done, not in game, and hovered */}
            {isIntroDone && enableGame && !gameActive && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="pointer-events-none absolute -top-5 left-1/2 z-40 max-w-[90vw] -translate-x-1/2 whitespace-nowrap rounded-full border border-pink-400/60 bg-[#19112e]/95 px-4 py-2 text-xs font-bold text-pink-200 shadow-[0_0_24px_rgba(244,114,182,0.45)] backdrop-blur-md"
                  >
                    <span className="flex items-center gap-2">
                      <Gamepad2 size={15} className="shrink-0 animate-bounce text-pink-400" />
                      <span>Wanna play game? with me 🎮</span>
                    </span>
                    <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-pink-400/60 bg-[#19112e]" />
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Subtle mobile hint on tap for touch devices when revealed and not playing */}
            {mounted && isIntroDone && enableGame && !gameActive && (
              <div className="sm:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] text-pink-300">
                  <Gamepad2 size={12} /> Tap photo to play 🐭
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Accessible "Click to enter" button and visible hint in idle state */}
        {isIntroIdle && (
          <button
            type="button"
            onClick={triggerReveal}
            aria-label="Open portfolio"
            className="absolute -bottom-10 left-1/2 z-30 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-violet-400/50 bg-[#16122c]/95 px-5 py-2 text-xs font-semibold text-violet-200 shadow-[0_0_25px_rgba(129,117,255,0.45)] backdrop-blur-md transition hover:border-violet-300 hover:bg-[#201a40] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121216] animate-pulse"
          >
            <Sparkles size={14} className="text-violet-300" aria-hidden="true" />
            <span>Click to enter</span>
          </button>
        )}
      </div>

      {/* Interactive Rat Game with clean exit callback */}
      <RatGame isOpen={gameActive} onClose={handleCloseGame} />
    </>
  );
}
