"use client";

import { useEffect } from "react";
import { useHeroIntro } from "@/context/HeroIntroContext";

const IGNORED = new Set(["Tab", "Shift", "Control", "Alt", "Meta", "CapsLock", "Escape", "ContextMenu", "NumLock", "ScrollLock", "Pause", "PrintScreen"]);

export default function KeyToEnter() {
  const { state, triggerReveal } = useHeroIntro();

  useEffect(() => {
    if (state !== "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
      if (IGNORED.has(e.key) || /^F\d+$/.test(e.key)) return;
      if (e.key === " ") e.preventDefault();
      triggerReveal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, triggerReveal]);

  return null;
}
