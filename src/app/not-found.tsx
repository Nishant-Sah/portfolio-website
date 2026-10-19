import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Home } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#121216] text-[#f4f4f7]">
      <Navbar />
      <main id="main" className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="glass max-w-md rounded-3xl p-8 md:p-10">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-400">
            Error 404
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            Sorry, the page you are looking for doesn&apos;t exist, has been removed, or the link may be broken.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <Home size={16} aria-hidden />
              Return home
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-violet-400 hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden />
              View projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
