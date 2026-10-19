"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Sparkles } from "lucide-react";

const taunts = [
  "Too fast on my paws! 🐾",
  "Nice try, can't catch me! 🧀",
  "Scurrying away! 💨",
  "Catch rate: 0.00% ⚡",
  "Almost grabbed my tail! 😂",
  "Squeak! Dodged again! 🚀",
  "My little legs are too fast! 🏃",
  "404: Mouse not caught 💻",
  "Sprint mode activated! 🏎️",
];

export default function RatGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [position, setPosition] = useState({ x: 200, y: 250 });
  const [rotation, setRotation] = useState(0);
  const [dodges, setDodges] = useState(0);
  const [currentTaunt, setCurrentTaunt] = useState("Catch me if you can! 🐭");
  const [isSprinting, setIsSprinting] = useState(false);
  const ratRef = useRef<HTMLDivElement>(null);
  const isMoving = useRef(false);

  // Pick random coordinates strictly within visible screen bounds on any device
  const dodge = useCallback(() => {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsSprinting(true);

    const mouseWidth = 58;
    const paddingX = Math.min(25, window.innerWidth * 0.06);
    const topBarHeight = 85;
    const bottomPadding = 35;

    const minX = paddingX + mouseWidth / 2;
    const maxX = Math.max(window.innerWidth - paddingX - mouseWidth / 2, minX + 20);
    const minY = topBarHeight + 25;
    const maxY = Math.max(window.innerHeight - bottomPadding - mouseWidth / 2, minY + 20);

    const newX = minX + Math.random() * (maxX - minX);
    const newY = minY + Math.random() * (maxY - minY);

    setPosition((prev) => {
      // Natural angle calculation with slight organic wiggle (+/- 5 deg)
      const baseAngle = Math.atan2(newY - prev.y, newX - prev.x) * (180 / Math.PI);
      const naturalAngle = baseAngle + (Math.random() * 10 - 5);
      setRotation(naturalAngle);
      return { x: newX, y: newY };
    });

    setDodges((d) => d + 1);
    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    setCurrentTaunt(randomTaunt);

    // Natural scurrying burst timing
    setTimeout(() => {
      setIsSprinting(false);
    }, 280);

    setTimeout(() => {
      isMoving.current = false;
    }, 320);
  }, []);

  // Listen for mouse movements and touch: if user approaches within 105px, mouse escapes!
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rat = ratRef.current;
      if (!rat) return;

      const rect = rat.getBoundingClientRect();
      const ratCenterX = rect.left + rect.width / 2;
      const ratCenterY = rect.top + rect.height / 2;

      const distance = Math.hypot(e.clientX - ratCenterX, e.clientY - ratCenterY);

      // Natural evasion sensitivity radius
      if (distance < 105) {
        dodge();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const touch = e.touches[0];
      const rat = ratRef.current;
      if (!rat) return;

      const rect = rat.getBoundingClientRect();
      const ratCenterX = rect.left + rect.width / 2;
      const ratCenterY = rect.top + rect.height / 2;

      const distance = Math.hypot(touch.clientX - ratCenterX, touch.clientY - ratCenterY);
      if (distance < 115) {
        dodge();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dodge, onClose]);

  // Reset position and score when opened without triggering effect cascading renders
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen && !prevIsOpen) {
    setPrevIsOpen(true);
    setDodges(0);
    setPosition({
      x: typeof window !== "undefined" ? Math.max(window.innerWidth / 2, 100) : 200,
      y: typeof window !== "undefined" ? Math.max(window.innerHeight / 2, 150) : 250,
    });
    setCurrentTaunt("I'm too fast for human reflexes! ⚡");
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">
      {/* Natural Organic Movement & Trot Keyframes */}
      <style>{`
        /* Natural diagonal rodent trot (Front-Left + Rear-Right pair, Front-Right + Rear-Left pair) */
        @keyframes trotPairA {
          0% { transform: rotate(-28deg); }
          100% { transform: rotate(28deg); }
        }
        @keyframes trotPairB {
          0% { transform: rotate(28deg); }
          100% { transform: rotate(-28deg); }
        }
        /* Flexible spine ripple & breathing */
        @keyframes spineRipple {
          0% { transform: scale(1, 1) translateY(0); }
          50% { transform: scale(1.03, 0.96) translateY(-1.5px); }
          100% { transform: scale(1, 1) translateY(0); }
        }
        /* Sinuous flexible tail undulation */
        @keyframes organicTail {
          0% { transform: rotate(-8deg) scaleY(1); }
          50% { transform: rotate(14deg) scaleY(1.08); }
          100% { transform: rotate(-8deg) scaleY(1); }
        }
        /* Nose & whisker twitching */
        @keyframes whiskerTwitch {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-4deg); }
          75% { transform: rotate(3deg); }
        }
        /* Small scamper dust puff */
        @keyframes miniDust {
          0% { opacity: 0.7; transform: scale(0.5) translateX(0); }
          100% { opacity: 0; transform: scale(1.4) translateX(-18px); }
        }
      `}</style>

      {/* Top Game Banner */}
      <div className="pointer-events-auto fixed top-3 inset-x-0 mx-auto max-w-md px-3">
        <div className="glass flex items-center justify-between gap-3 rounded-2xl border border-violet-400/40 bg-[#121216]/95 p-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300 text-lg">
              🐭
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-300 truncate">
                  Catch the Little Mouse!
                </span>
                <span className="flex items-center gap-1 rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] text-violet-200 shrink-0">
                  <Sparkles size={10} /> Escapes: {dodges}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate">
                Watch its little paws sprint—try to catch it!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Exit game"
            title="Exit game (Esc)"
            className="flex items-center gap-1.5 rounded-full border border-pink-400/30 bg-pink-500/15 px-3.5 py-1.5 text-xs font-semibold text-pink-200 transition hover:bg-rose-500 hover:border-rose-400 hover:text-white shrink-0 shadow-md"
          >
            <X size={14} aria-hidden="true" />
            <span>Exit (Esc)</span>
          </button>
        </div>
      </div>

      {/* Free-roaming, Lifelike Mouse (Compact, organic, fluid curves) */}
      <div
        ref={ratRef}
        onMouseEnter={dodge}
        onTouchStart={dodge}
        onPointerDown={dodge}
        className="pointer-events-auto fixed cursor-pointer"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          /* Fluid, organic muscle burst curve: explosive start with natural soft deceleration */
          transition: "left 320ms cubic-bezier(0.16, 1, 0.3, 1), top 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1)",
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${isSprinting ? "1.08, 0.92" : "1, 1"})`,
          filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45))",
        }}
      >
        {/* Taunt Speech Bubble (Always upright and readable) */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-violet-400/50 bg-[#1b192e] px-2.5 py-1 text-[11px] font-bold text-pink-300 shadow-xl pointer-events-none"
          style={{
            transform: `rotate(${-rotation}deg)`,
            transition: "transform 240ms cubic-bezier(0.2, 0.9, 0.3, 1)",
          }}
        >
          {currentTaunt}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-violet-400/50 bg-[#1b192e]" />
        </div>

        {/* Sprint dust puff behind paws */}
        {isSprinting && (
          <div
            className="absolute -left-4 top-1/2 -translate-y-1/2 pointer-events-none flex gap-0.5"
            style={{ animation: "miniDust 0.28s ease-out forwards" }}
          >
            <span className="h-2 w-2 rounded-full bg-violet-400/40 blur-[1px]" />
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400/40 blur-[1px]" />
          </div>
        )}

        {/* Compact, Realistic Field Mouse SVG (Width ~58px, lifelike anatomy) */}
        <svg
          width="58"
          height="32"
          viewBox="0 0 76 42"
          className="overflow-visible"
          style={{
            animation: isSprinting
              ? "spineRipple 0.09s infinite alternate ease-in-out"
              : "spineRipple 0.16s infinite alternate ease-in-out",
          }}
        >
          <defs>
            {/* Natural warm brown/taupe field mouse fur */}
            <linearGradient id="warmMouseFur" x1="0%" y1="0%" x2="100%" y2="60%">
              <stop offset="0%" stopColor="#7a685b" />
              <stop offset="55%" stopColor="#5c4d43" />
              <stop offset="100%" stopColor="#443932" />
            </linearGradient>

            {/* Soft cream underside belly */}
            <linearGradient id="warmMouseBelly" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b5a798" />
              <stop offset="100%" stopColor="#8d7f72" />
            </linearGradient>
          </defs>

          {/* Far Rear Leg (Trot Pair B) */}
          <g
            style={{
              transformOrigin: "21px 22px",
              animation: isSprinting
                ? "trotPairB 0.09s infinite alternate ease-in-out"
                : "trotPairB 0.16s infinite alternate ease-in-out",
            }}
          >
            <line x1="21" y1="22" x2="16" y2="35" stroke="#3b322b" strokeWidth="2.8" strokeLinecap="round" />
            <ellipse cx="15.5" cy="35.5" rx="2.5" ry="1.5" fill="#f8a5a5" />
          </g>

          {/* Far Front Leg (Trot Pair A) */}
          <g
            style={{
              transformOrigin: "48px 21px",
              animation: isSprinting
                ? "trotPairA 0.09s infinite alternate ease-in-out"
                : "trotPairA 0.16s infinite alternate ease-in-out",
            }}
          >
            <line x1="48" y1="21" x2="45" y2="33" stroke="#3b322b" strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="44.5" cy="33.5" rx="2.2" ry="1.4" fill="#f8a5a5" />
          </g>

          {/* Sinuous Flexible Pink Tail (Curving with organic wave) */}
          <g
            style={{
              transformOrigin: "12px 20px",
              animation: "organicTail 0.36s infinite ease-in-out",
            }}
          >
            <path
              d="M 12 20 C 5 19, 1 12, 3 6 C 5 2, 2 0, 0 0"
              stroke="#f472b6"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.95"
            />
          </g>

          {/* Realistic Muscular Mouse Body with Arched Back & Haunch */}
          <path
            d="M 12 20 C 10 11, 20 5, 36 6 C 50 7, 59 13, 66 17 C 60 22, 51 27, 36 27 C 21 27, 13 25, 12 20 Z"
            fill="url(#warmMouseFur)"
          />

          {/* Soft Cream Lighter Underbelly */}
          <path
            d="M 22 23 C 28 19, 44 18, 54 21 C 50 26, 35 26, 22 23 Z"
            fill="url(#warmMouseBelly)"
            opacity="0.9"
          />

          {/* Near Rear Thigh Haunch Curve */}
          <ellipse cx="20" cy="19" rx="6.5" ry="5.5" fill="#5c4d43" opacity="0.6" />

          {/* Near Rear Leg (Trot Pair A with pink paw) */}
          <g
            style={{
              transformOrigin: "20px 24px",
              animation: isSprinting
                ? "trotPairA 0.09s infinite alternate ease-in-out"
                : "trotPairA 0.16s infinite alternate ease-in-out",
            }}
          >
            <line x1="20" y1="24" x2="24" y2="37" stroke="#4f4239" strokeWidth="3.2" strokeLinecap="round" />
            <ellipse cx="25" cy="38" rx="3" ry="1.7" fill="#fb7185" />
          </g>

          {/* Near Front Leg (Trot Pair B with pink paw) */}
          <g
            style={{
              transformOrigin: "47px 22px",
              animation: isSprinting
                ? "trotPairB 0.09s infinite alternate ease-in-out"
                : "trotPairB 0.16s infinite alternate ease-in-out",
            }}
          >
            <line x1="47" y1="22" x2="51" y2="35" stroke="#4f4239" strokeWidth="2.8" strokeLinecap="round" />
            <ellipse cx="52" cy="36" rx="2.6" ry="1.5" fill="#fb7185" />
          </g>

          {/* Translucent Soft Rounded Mouse Ear */}
          <ellipse cx="34" cy="7" rx="6" ry="7.5" fill="#443932" transform="rotate(-12 34 7)" />
          <ellipse cx="34" cy="7" rx="3.8" ry="5.2" fill="#fca5a5" transform="rotate(-12 34 7)" />

          {/* Glossy Black Mouse Eye with Natural White Sheen */}
          <circle cx="53" cy="12.5" r="2.4" fill="#0b0a09" />
          <circle cx="52.2" cy="11.8" r="0.85" fill="#ffffff" />

          {/* Delicate Pink Snout Tip */}
          <circle cx="67" cy="17" r="2" fill="#f43f5e" />

          {/* Whisker Twitching Group */}
          <g style={{ animation: "whiskerTwitch 0.25s infinite ease-in-out", transformOrigin: "65px 17px" }}>
            <line x1="64" y1="16" x2="74" y2="11" stroke="#e2e8f0" strokeWidth="0.85" opacity="0.85" />
            <line x1="65" y1="17.5" x2="76" y2="17.5" stroke="#e2e8f0" strokeWidth="0.85" opacity="0.85" />
            <line x1="64" y1="18.5" x2="73" y2="23" stroke="#e2e8f0" strokeWidth="0.85" opacity="0.85" />
          </g>
        </svg>
      </div>

      {/* Floating Bottom Quick Exit Button */}
      <div className="pointer-events-auto fixed bottom-5 inset-x-0 mx-auto w-fit z-50">
        <button
          type="button"
          onClick={onClose}
          aria-label="Exit game"
          className="flex items-center gap-2 rounded-full border border-pink-400/40 bg-[#16122a]/95 px-5 py-2.5 text-xs font-bold text-pink-200 shadow-2xl backdrop-blur-md transition hover:border-rose-400 hover:bg-rose-500 hover:text-white cursor-pointer active:scale-95"
        >
          <X size={15} aria-hidden="true" />
          <span>Exit Game</span>
          <kbd className="ml-1 rounded bg-white/15 px-1.5 py-0.5 text-[10px] text-pink-200 font-mono">Esc</kbd>
        </button>
      </div>
    </div>
  );
}
