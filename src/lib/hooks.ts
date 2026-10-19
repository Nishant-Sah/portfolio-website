"use client";
import { useSyncExternalStore } from "react";

export function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => server,
  );
}

let webgl: boolean | undefined;
function detectWebGL() {
  if (webgl === undefined) {
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}
export function useWebGL() {
  return useSyncExternalStore(() => () => {}, detectWebGL, () => true);
}
