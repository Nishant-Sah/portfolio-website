import { site } from "@/data/site";
import ResumeButton from "@/components/ResumeButton";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          )}
          <a
            href={`mailto:${site.email}`}
            className="transition hover:text-white"
          >
            Email
          </a>
          <ResumeButton variant="footer" />
        </div>
      </div>
    </footer>
  );
}
