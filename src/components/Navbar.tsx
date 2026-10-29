"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useHeroIntro } from "@/context/HeroIntroContext";
import ResumeButton from "@/components/ResumeButton";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isRevealed } = useHeroIntro();

  // Close menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      aria-hidden={!isRevealed}
      className={`sticky top-0 z-40 border-b border-white/5 bg-[#121216]/85 backdrop-blur-md transition-all duration-700 ${
        !isRevealed
          ? "pointer-events-none -translate-y-full opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5"
      >
        {/* Brand logo linked to top */}
        <Link
          href="/#top"
          onClick={() => setIsOpen(false)}
          className="inline-flex items-center transition hover:opacity-90 focus:outline-none"
          aria-label="Nishant Sah portfolio home"
        >
          <Image src="/logo.svg" alt="" width={34} height={32} priority className="h-7 w-auto sm:h-8" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition hover:text-white focus:outline-none"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <ResumeButton variant="nav" />
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-zinc-300 hover:bg-white/[0.05] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[57px] bottom-0 z-50 flex flex-col bg-[#121216]/98 px-6 py-8 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-6 text-lg font-medium text-zinc-200">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 transition hover:text-violet-400 focus:outline-none"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-white/10 pt-6 flex flex-col gap-3">
            <ResumeButton variant="hero" className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400" />
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
