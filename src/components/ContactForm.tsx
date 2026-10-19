"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { site } from "@/data/site";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; msg: string }
  | { kind: "error"; msg: string }
  | { kind: "mailto"; msg: string };

const inputStyle =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:bg-white/[0.07] focus:outline-none transition";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);

    // Spam honeypot
    if (d.get("_gotcha")) return;

    const name = String(d.get("name") ?? "").trim();
    const email = String(d.get("email") ?? "").trim();
    const subject = String(d.get("subject") ?? "").trim() || "Portfolio inquiry";
    const message = String(d.get("message") ?? "").trim();

    if (!name) {
      return setStatus({ kind: "error", msg: "Please enter your name." });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setStatus({ kind: "error", msg: "Please enter a valid email address." });
    }
    if (!message) {
      return setStatus({ kind: "error", msg: "Please enter a message." });
    }

    if (!endpoint) {
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      return setStatus({
        kind: "mailto",
        msg: "Your default email app has been opened with your message ready to send. Press send there to deliver it.",
      });
    }

    setStatus({ kind: "sending" });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      form.reset();
      setStatus({
        kind: "success",
        msg: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
      });
    } catch {
      setStatus({
        kind: "error",
        msg: `Unable to submit the message right now. Please email me directly at ${site.email}.`,
      });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-2xl p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Name <span className="text-pink-400">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Email <span className="text-pink-400">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={150}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputStyle}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={150}
          placeholder="What is this regarding?"
          className={inputStyle}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
          Message <span className="text-pink-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          placeholder="Your message..."
          className={inputStyle}
        />
      </div>

      {/* Honeypot field for bot protection */}
      <input name="_gotcha" id="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 focus:outline-none"
        >
          <Send size={15} aria-hidden />
          {status.kind === "sending" ? "Sending message..." : "Send message"}
        </button>

        <span className="text-xs text-zinc-400">
          Direct email: <a href={`mailto:${site.email}`} className="text-violet-300 underline hover:text-white">{site.email}</a>
        </span>
      </div>

      {/* Feedback banner */}
      {status.kind !== "idle" && status.kind !== "sending" && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed ${
            status.kind === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : status.kind === "mailto"
              ? "border-violet-500/30 bg-violet-500/10 text-violet-200"
              : "border-rose-500/30 bg-rose-500/10 text-rose-200"
          }`}
        >
          {status.kind === "success" ? (
            <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          ) : status.kind === "mailto" ? (
            <Mail size={18} className="shrink-0 text-violet-400" />
          ) : (
            <AlertCircle size={18} className="shrink-0 text-rose-400" />
          )}
          <span>{status.msg}</span>
        </div>
      )}

      {/* Privacy note */}
      <p className="mt-4 text-[11px] leading-relaxed text-zinc-400 border-t border-white/5 pt-3">
        <strong>Privacy notice:</strong> When you send a message, the details you provide (name, email, message) are delivered solely to Nishant Sah to answer your inquiry. No marketing trackers, third-party analytics, or persistent cookies are stored on your device.
      </p>
    </form>
  );
}
