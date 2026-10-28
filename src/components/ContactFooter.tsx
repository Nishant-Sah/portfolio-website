import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
const socials = [{ label: "LinkedIn", href: site.linkedin }, ...(site.github ? [{ label: "GitHub", href: site.github }] : [])];

export default function ContactFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-black pt-14" style={{ "--glow": "34 197 94" } as React.CSSProperties}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[75%]"
        style={{ background: "radial-gradient(ellipse 75% 100% at 50% 100%, rgb(var(--glow) / 0.6), rgb(var(--glow) / 0.16) 45%, transparent 72%)" }}
      />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-zinc-300">Connect with me</p>
            <a href={`mailto:${site.email}`} className="mt-2 block break-all text-[clamp(1.35rem,4.4vw,3rem)] font-semibold leading-tight text-white transition hover:text-[rgb(var(--glow))]">
              {site.email}
            </a>
          </div>
          <div className="md:text-right">
            <p className="text-xl font-semibold text-white">Let&apos;s build something</p>
            <p className="mt-1 max-w-xs text-sm text-zinc-300 md:ml-auto">Open to projects, learning opportunities and collaboration.</p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200">
              Get in touch <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-2 border-t border-white/10 pt-6 text-base font-semibold text-white">
          {socials.map((s) => (
            <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-[rgb(var(--glow))]">{s.label}</a></li>
          ))}
        </ul>
        <p aria-hidden className="mt-12 select-none overflow-hidden whitespace-nowrap text-center text-[clamp(2.4rem,11vw,10rem)] font-extrabold uppercase leading-none tracking-tighter text-white [text-shadow:0_0_40px_rgb(var(--glow)/0.5)]">
          {site.name}
        </p>
      </div>
      <div className="mt-8 bg-black/70 px-6 py-4 text-xs text-zinc-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {nav.map((l) => (
                <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
              ))}
              <li><a href="#top" className="transition hover:text-white">Back to top</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
