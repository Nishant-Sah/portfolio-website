"use client";

import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only enable on desktop / devices with fine pointer
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    // For coarse pointers (touch devices), we will use a separate touch listener below.
    // Do not return early so that touch handling can be added.
    // Continue to attach mouse listeners only on fine-pointer devices.
    if (!isFinePointer) {
      // No mouse listeners for touch‑only devices.
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("input") ||
        target?.closest("textarea") ||
        target?.closest("[role='button']")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousemove", checkHover);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);
    }
    // Touch movement support – update dot position on touchmove
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const touch = e.touches[0];
      setPos({ x: touch.clientX, y: touch.clientY });
      // Hide on very small screens (< 350px) to avoid interference
      if (window.innerWidth < 350) setVisible(false);
      else if (!visible) setVisible(true);
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible]);

  // Smooth lerp trailing effect for secondary ring
  useEffect(() => {
    let animId: number;
    const lerp = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle glow ring */}
      <div
        className="fixed rounded-full border border-violet-400/40 transition-transform duration-75 ease-out"
        style={{
          width: hovered ? "40px" : "26px",
          height: hovered ? "40px" : "26px",
          transform: `translate3d(${trail.x - (hovered ? 20 : 13)}px, ${trail.y - (hovered ? 20 : 13)}px, 0)`,
          boxShadow: hovered
            ? "0 0 16px rgba(168, 85, 247, 0.4)"
            : "0 0 10px rgba(129, 117, 255, 0.25)",
        }}
      />
      {/* Core solid glowing dot */}
      <div
        className="fixed rounded-full bg-violet-400 transition-transform duration-75"
        style={{
          width: "7px",
          height: "7px",
          transform: `translate3d(${pos.x - 3.5}px, ${pos.y - 3.5}px, 0)`,
          boxShadow: "0 0 10px #b3acff, 0 0 20px #8175ff",
        }}
      />
    </div>
  );
}
