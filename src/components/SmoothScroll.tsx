"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useHeroIntro } from "@/context/HeroIntroContext";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const prevPath = useRef<string | null>(null);
  const { state } = useHeroIntro();
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.25, wheelMultiplier: 0.9, smoothWheel: true });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -72 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (state === "done") lenisRef.current?.start();
    else lenisRef.current?.stop();
  }, [state]);

  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) lenisRef.current?.scrollTo(0, { immediate: true });
    prevPath.current = pathname;
  }, [pathname]);

  return null;
}
