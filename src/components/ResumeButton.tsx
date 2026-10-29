"use client";

import { useState } from "react";
import { FileDown, FileText, Check, Clock } from "lucide-react";
import { site } from "@/data/site";

type Props = {
  className?: string;
  variant?: "hero" | "nav" | "footer";
};

export default function ResumeButton({ className, variant = "hero" }: Props) {
  const [showNotice, setShowNotice] = useState(false);

  // If user has uploaded a real resume file in /public, directly download or view it
  if (site.resume) {
    if (variant === "nav") {
      return (
        <a
          href={site.resume}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={
            className ??
            "inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/20 hover:text-white"
          }
        >
          <FileDown size={14} aria-hidden /> Resume
        </a>
      );
    }

    if (variant === "footer") {
      return (
        <a
          href={site.resume}
          download
          target="_blank"
          rel="noopener noreferrer"
          className={className ?? "inline-flex items-center gap-1.5 transition hover:text-white"}
        >
          <FileDown size={14} aria-hidden /> Resume
        </a>
      );
    }

    // Default hero button
    return (
      <a
        href={site.resume}
        download
        target="_blank"
        rel="noopener noreferrer"
        className={className ?? "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-violet-400 hover:bg-white/10"}
      >
        <FileDown size={16} aria-hidden /> Download resume
      </a>
    );
  }

  // When resume is not yet uploaded, show an intuitive interactive fallback dialog / toast
  function handleClick() {
    setShowNotice(true);
    setTimeout(() => setShowNotice(false), 4500);
  }

  if (variant === "nav") {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={handleClick}
          className={
            className ??
            "inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/20 hover:text-white"
          }
        >
          <FileText size={13} aria-hidden /> Resume
        </button>

        {showNotice && (
          <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl border border-white/15 bg-[#17171d] p-3 text-left shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Clock size={13} /> Resume Coming Soon
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-300">
              Nishant&apos;s updated resume is being prepared. Feel free to contact directly via email in the meantime!
            </p>
          </div>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <span className="relative inline-block">
        <button
          type="button"
          onClick={handleClick}
          className={className ?? "inline-flex items-center gap-1.5 transition hover:text-white"}
        >
          <FileText size={13} aria-hidden /> Resume
        </button>
        {showNotice && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-60 rounded-xl border border-white/15 bg-[#17171d] p-2.5 text-center text-xs text-zinc-200 shadow-xl">
            <span className="font-semibold text-amber-300">Resume updating soon.</span> Reach out via email anytime!
          </div>
        )}
      </span>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        className={className ?? "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-violet-400 hover:bg-white/[0.08] hover:text-white"}
      >
        <FileDown size={16} aria-hidden /> Download resume
      </button>

      {showNotice && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2.5 z-50 w-72 rounded-2xl border border-amber-500/30 bg-[#16161c]/95 p-3.5 text-center shadow-2xl shadow-black/90 backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-300">
            <Clock size={14} /> Resume Upload in Progress
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
            The updated PDF is currently being finalized. You can request it directly via <a href={`mailto:${site.email}`} className="text-violet-300 underline underline-offset-2 hover:text-white">email</a>!
          </p>
        </div>
      )}
    </div>
  );
}
