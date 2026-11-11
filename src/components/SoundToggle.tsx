"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useHeroIntro } from "@/context/HeroIntroContext";
import { sfx } from "@/lib/sfx";

export default function SoundToggle() {
  const { state } = useHeroIntro();
  const muted = useSyncExternalStore(sfx.subscribe, sfx.isMuted, () => false);

  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, sfx.unlock, true));
    return () => events.forEach((e) => window.removeEventListener(e, sfx.unlock, true));
  }, []);

  if (state === "idle") return null;
  return (
    <button
      type="button"
      aria-pressed={muted}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      onClick={() => sfx.setMuted(!muted)}
      className="fixed bottom-4 left-4 z-[210] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-zinc-100 backdrop-blur transition hover:border-violet-400 hover:text-white"
    >
      {muted ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
    </button>
  );
}
