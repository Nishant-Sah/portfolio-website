"use client";

import { useEffect, useRef } from "react";
import { useHeroIntro } from "@/context/HeroIntroContext";
import { sfx } from "@/lib/sfx";

type Letter = { ch: string; x: number; w: number; y: number; y0: number; vy: number; r0: number; state: 0 | 1 | 2; ts: number; sy: number; delay: number; col: string };
type Part = { x: number; y: number; vx: number; vy: number; s: number; life: number; age: number; c: string; d: boolean; rot: number; vr: number };
type Cloud = { x: number; y: number; r: number; vr: number; vx: number; vy: number; life: number; age: number };
type Ring = { x: number; r: number; life: number; age: number };

const GHOST_OPACITY = "0.2";
const SAND = ["#e6cfa3", "#cfae7c", "#b08f62", "#8d7250", "#f3e3bf"];
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const lerpCol = (t: number) => {
  const a = [129, 117, 255];
  const b = [255, 79, 163];
  return "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",") + ")";
};

export default function CinematicIntro({ name = "Nishant Sah" }: { name?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ play: () => void; skip: () => void; settle: () => void } | null>(null);
  const { state } = useHeroIntro();
  const started = state !== "idle";
  const initialState = useRef(state);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!wrap || !cv || !ctx) return;
    const text = name.toUpperCase();
    const space = text.indexOf(" ");
    let family = "Impact, sans-serif";
    let W = 0, H = 0, dpr = 1, gy = 0, fs = 0, shake = 0, flash = 0, t0 = 0, last = 0, raf = 0, CH = 0, settled = false, fading = false;
    const timers: number[] = [];
    let ground: HTMLCanvasElement | null = null;
    let gctx: CanvasRenderingContext2D | null = null;
    let letters: Letter[] = [], parts: Part[] = [], rings: Ring[] = [], clouds: Cloud[] = [];

    const buildGround = () => {
      ground = document.createElement("canvas");
      ground.width = Math.ceil(W * dpr);
      ground.height = Math.ceil((CH - gy) * dpr);
      gctx = ground.getContext("2d");
      if (!gctx) return;
      gctx.scale(dpr, dpr);
      const g = gctx.createLinearGradient(0, 0, 0, CH - gy);
      g.addColorStop(0, "#3a322a");
      g.addColorStop(1, "#14110e");
      gctx.fillStyle = g;
      gctx.fillRect(0, 0, W, CH - gy);
      for (let i = 0; i < (W * (CH - gy)) / 90; i++) {
        gctx.fillStyle = SAND[(Math.random() * SAND.length) | 0];
        gctx.globalAlpha = rnd(0.04, 0.22);
        gctx.fillRect(Math.random() * W, Math.random() * (CH - gy), rnd(1, 2.4), rnd(1, 2));
      }
      gctx.globalAlpha = 1;
    };
    const layout = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = window.innerHeight;
      const slot = document.getElementById("hero-name-slot");
      const hero = slot?.closest("section");
      let slotBottom = H * 0.72, slotH = H * 0.2, heroBottom = H;
      if (slot) { const r = slot.getBoundingClientRect(); slotBottom = r.bottom + window.scrollY; slotH = r.height; }
      if (hero) heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
      CH = Math.round(Math.max(H, heroBottom + 40));
      gy = Math.round(settled ? slotBottom : Math.min(slotBottom, H * 0.95));
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(CH * dpr);
      cv.style.width = W + "px";
      cv.style.height = CH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "700 100px " + family;
      fs = Math.min(slot ? slotH * 1.15 : 260, ((W * 0.86) / ctx.measureText(text).width) * 100, 260);
      ctx.font = "700 " + fs + "px " + family;
      let x = (W - ctx.measureText(text).width) / 2;
      letters = [];
      [...text].forEach((ch, i) => {
        const w = ctx.measureText(ch).width;
        if (ch !== " ") {
          const y = -fs * rnd(1.2, 3);
          const k = space >= 0 && i > space ? (i - space - 1) / Math.max(1, text.length - space - 2) : -1;
          letters.push({ ch, x: x + w / 2, w, y, y0: y, vy: 0, r0: rnd(-0.7, 0.7), state: 0, ts: 0, sy: 1, delay: letters.length * 0.17 + rnd(0, 0.06), col: k >= 0 ? lerpCol(k) : "#f4f4f7" });
        }
        x += w;
      });
      buildGround();
    };
    const crater = (l: Letter) => {
      if (!gctx) return;
      gctx.fillStyle = "rgba(0,0,0,.32)";
      gctx.beginPath();
      gctx.ellipse(l.x, 4, l.w * 0.75, 9, 0, 0, 7);
      gctx.fill();
      gctx.strokeStyle = "rgba(0,0,0,.35)";
      gctx.lineWidth = 1;
      for (let k = 0; k < 3; k++) {
        gctx.beginPath();
        let x = l.x, y = 3;
        gctx.moveTo(x, y);
        for (let s = 0; s < 4; s++) { x += rnd(-1, 1) * l.w * 0.35; y += rnd(3, 10); gctx.lineTo(x, y); }
        gctx.stroke();
      }
    };
    const maskImg = "linear-gradient(to bottom, black calc(100% - 120px), transparent)";
    const place = () => {
      settled = true;
      wrap.style.display = "block";
      wrap.style.position = "absolute";
      wrap.style.top = "0";
      wrap.style.left = "0";
      wrap.style.right = "auto";
      wrap.style.bottom = "auto";
      wrap.style.width = "100%";
      wrap.style.height = CH + "px";
      wrap.style.zIndex = "0";
      wrap.style.pointerEvents = "none";
      wrap.style.willChange = "opacity";
      wrap.style.filter = "none";
      wrap.style.setProperty("mask-image", maskImg);
      wrap.style.setProperty("-webkit-mask-image", maskImg);
    };
    const settle = () => {
      cancelAnimationFrame(raf);
      settled = true;
      layout();
      place();
      wrap.style.transition = "none";
      wrap.style.opacity = GHOST_OPACITY;
      letters.forEach((l) => { l.y = gy; l.state = 2; l.sy = 1; l.r0 = 0; crater(l); });
      parts = []; rings = []; clouds = []; shake = 0; flash = 0;
      draw();
    };
    const skip = () => {
      if (settled) return;
      settle();
      document.documentElement.classList.remove("cinematic-lock");
    };
    const handover = () => {
      if (settled) return;
      place();
      wrap.style.transition = "none";
      wrap.style.opacity = "1";
      void wrap.offsetWidth;
      wrap.style.transition = "opacity 3s cubic-bezier(0.45, 0, 0.2, 1) 0.4s";
      wrap.style.opacity = GHOST_OPACITY;
      document.documentElement.classList.remove("cinematic-lock");
    };
    const impact = (l: Letter) => {
      const p = Math.min(1.6, Math.max(0.6, l.vy / (H * 1.5))), sc = fs / 110;
      sfx.impact(p, Math.max(-0.7, Math.min(0.7, (l.x / W - 0.5) * 1.6)), letters.indexOf(l), letters.length);
      if (letters.every((x) => x === l || x.state !== 0)) sfx.finale();
      shake = Math.min(14, shake + 8 * p);
      flash = Math.min(0.4, flash + 0.15 * p);
      for (let k = 0, n = (60 * p) | 0; k < n; k++) {
        const a = -Math.PI * rnd(0.08, 0.92), sp = rnd(120, 620) * p * sc;
        parts.push({ x: l.x + rnd(-l.w / 2, l.w / 2), y: gy, vx: Math.cos(a) * sp * 1.1, vy: Math.sin(a) * sp, s: rnd(1, 3.2), life: rnd(0.7, 1.5), age: 0, c: SAND[(Math.random() * 5) | 0], d: false, rot: 0, vr: 0 });
      }
      for (let k = 0; k < 5; k++) parts.push({ x: l.x + rnd(-l.w / 2, l.w / 2), y: gy - rnd(0, fs * 0.5), vx: rnd(-380, 380) * p, vy: rnd(-700, -200) * p * sc, s: rnd(4, 9), life: rnd(0.9, 1.6), age: 0, c: l.col, d: true, rot: rnd(0, 6), vr: rnd(-9, 9) });
      for (let k = 0; k < 5; k++) clouds.push({ x: l.x + rnd(-l.w, l.w), y: gy - rnd(0, 10), r: rnd(14, 30), vr: rnd(40, 90) * sc, vx: rnd(-60, 60), vy: rnd(-30, -8), life: rnd(1.1, 1.9), age: 0 });
      rings.push({ x: l.x, r: l.w * 0.3, life: 0.7, age: 0 });
      crater(l);
      if (parts.length > 1200) parts.splice(0, parts.length - 1200);
    };
    const draw = () => {
      if (!ground) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#08080d";
      ctx.fillRect(0, 0, W, CH);
      ctx.save();
      if (shake > 0.3) ctx.translate(rnd(-shake, shake), rnd(-shake, shake));
      const sky = ctx.createLinearGradient(0, 0, 0, gy);
      sky.addColorStop(0, "#08080d");
      sky.addColorStop(1, "#1a1626");
      ctx.fillStyle = sky;
      ctx.fillRect(-30, -30, W + 60, gy + 30);
      const hg = ctx.createRadialGradient(W / 2, gy, 10, W / 2, gy, W * 0.5);
      hg.addColorStop(0, "rgba(129,117,255,.28)");
      hg.addColorStop(1, "rgba(129,117,255,0)");
      ctx.fillStyle = hg;
      ctx.fillRect(0, 0, W, gy + 4);
      ctx.drawImage(ground, 0, gy, W, CH - gy);
      ctx.fillStyle = "rgba(243,227,191,.35)";
      ctx.fillRect(0, gy, W, 1);
      ctx.font = "700 " + fs + "px " + family;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      for (const l of letters) {
        if (l.y < -fs * 2) continue;
        const pr = l.state ? 1 : Math.min(1, Math.max(0, (l.y - l.y0) / (gy - l.y0)));
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.r0 * (1 - pr));
        ctx.scale(1 + (1 - l.sy) * 0.5, l.sy);
        ctx.fillStyle = l.col;
        if (l.state) { ctx.shadowColor = "rgba(129,117,255,.45)"; ctx.shadowBlur = 20; }
        ctx.fillText(l.ch, 0, 0);
        ctx.restore();
      }
      for (const c of clouds) {
        const a = 1 - c.age / c.life, g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        g.addColorStop(0, "rgba(214,188,148," + 0.3 * a + ")");
        g.addColorStop(1, "rgba(214,188,148,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 7);
        ctx.fill();
      }
      for (const r of rings) {
        ctx.strokeStyle = "rgba(243,227,191," + 0.55 * (1 - r.age / r.life) + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(r.x, gy + 2, r.r, r.r * 0.16, 0, 0, 7);
        ctx.stroke();
      }
      for (const p of parts) {
        ctx.globalAlpha = Math.min(1, (1 - p.age / p.life) * 1.5);
        ctx.fillStyle = p.c;
        if (p.d) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.7); ctx.restore(); }
        else ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
      ctx.restore();
      if (flash > 0.01) { ctx.fillStyle = "rgba(255,240,215," + flash * 0.3 + ")"; ctx.fillRect(0, 0, W, CH); }
    };
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033), t = (now - t0) / 1000, G = H * 3.2;
      last = now;
      for (const l of letters) {
        if (l.state === 0) {
          if (t < l.delay) continue;
          if (l.vy === 0) sfx.whoosh(Math.max(-0.7, Math.min(0.7, (l.x / W - 0.5) * 1.6)));
          l.vy += G * dt;
          l.y += l.vy * dt;
          if (l.y >= gy) { l.y = gy; impact(l); l.state = 1; l.ts = 0; }
        } else if (l.state === 1) {
          l.ts += dt;
          l.sy = 1 - 0.2 * Math.exp(-l.ts * 8) * Math.cos(l.ts * 26);
          if (l.ts > 0.9) { l.sy = 1; l.state = 2; }
        }
      }
      for (const p of parts) {
        p.age += dt; p.vy += 1500 * dt; p.vx *= 1 - 1.2 * dt; p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.d) p.rot += p.vr * dt;
        if (p.y > gy && p.vy > 0) { p.y = gy; p.vy *= -0.3; p.vx *= 0.6; }
      }
      for (const c of clouds) { c.age += dt; c.r += c.vr * dt; c.x += c.vx * dt; c.y += c.vy * dt; }
      for (const r of rings) { r.age += dt; r.r += fs * 4 * dt; }
      parts = parts.filter((p) => p.age < p.life);
      clouds = clouds.filter((c) => c.age < c.life);
      rings = rings.filter((r) => r.age < r.life);
      shake *= Math.exp(-6 * dt);
      flash *= Math.exp(-9 * dt);
      draw();
      const landed = letters.every((l) => l.state === 2);
      if (landed && !fading) { fading = true; timers.push(window.setTimeout(handover, 700)); }
      if (landed && !parts.length && !clouds.length && !rings.length && shake < 0.3) { draw(); return; }
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      wrap.style.display = "block";
      wrap.style.transition = "none";
      wrap.style.filter = "none";
      wrap.style.opacity = "1";
      wrap.style.pointerEvents = "auto";
      document.documentElement.classList.add("cinematic-lock");
      cancelAnimationFrame(raf);
      settled = false;
      layout();
      parts = []; rings = []; clouds = []; shake = 0; flash = 0; fading = false;
      t0 = last = performance.now();
      sfx.intro();
      raf = requestAnimationFrame(tick);
    };
    api.current = { play, skip, settle };

    const css = getComputedStyle(document.body).getPropertyValue("--font-display").trim();
    if (css) family = css + ", Impact, sans-serif";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !settled && wrap.style.display === "block") skip();
    };
    window.addEventListener("keydown", onKey);
    let rt = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = window.setTimeout(() => { if (settled && (Math.abs(wrap.clientWidth - W) > 2 || window.innerHeight !== H)) settle(); }, 150);
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      clearTimeout(rt);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      timers.forEach((id) => clearTimeout(id));
      document.documentElement.classList.remove("cinematic-lock");
      api.current = null;
    };
  }, [name]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || initialState.current === "done") {
      const id = requestAnimationFrame(() => api.current?.settle());
      void document.fonts?.ready.then(() => api.current?.settle());
      return () => cancelAnimationFrame(id);
    }
    if (!started) return;
    api.current?.play();
  }, [started]);

  return (
    <div ref={wrapRef} data-lenis-prevent style={{ display: "none" }} className="fixed inset-0 z-[200] overflow-hidden bg-[#08080d]">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute left-0 top-0" />
    </div>
  );
}
