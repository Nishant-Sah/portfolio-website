"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type * as THREE from "three";
import gsap from "gsap";

export type IntroState = "idle" | "expanding" | "revealed" | "contracting" | "done";

interface HeroIntroContextType {
  state: IntroState;
  isRevealed: boolean;
  triggerReveal: () => void;
  registerWireframe: (mesh: THREE.Mesh | null, material: THREE.Material | null) => void;
  registerContentContainer: (el: HTMLElement | null) => void;
}

const HeroIntroContext = createContext<HeroIntroContextType | null>(null);

function getInitialIntroState(): IntroState {
  if (typeof window === "undefined") return "idle";
  if (window.location.hash) return "done";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
  return "idle";
}

export function HeroIntroProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<IntroState>(getInitialIntroState);
  const stateRef = useRef<IntroState>("idle");
  const wireframeMeshRef = useRef<THREE.Mesh | null>(null);
  const wireframeMaterialRef = useRef<THREE.Material | null>(null);
  const contentContainerRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);

  // Initialize stateRef on mount
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Keep stateRef and state synchronized
  const updateState = useCallback((newState: IntroState) => {
    stateRef.current = newState;
    setState(newState);
  }, []);

  // Register Three.js wireframe mesh and material
  const registerWireframe = useCallback(
    (mesh: THREE.Mesh | null, material: THREE.Material | null) => {
      wireframeMeshRef.current = mesh;
      wireframeMaterialRef.current = material;
    },
    []
  );

  // Register content container for synchronized GSAP animation
  const registerContentContainer = useCallback((el: HTMLElement | null) => {
    contentContainerRef.current = el;
  }, []);

  // Manage scroll lock based on state
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (state !== "done") {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.scrollbarGutter = "stable";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.scrollbarGutter = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.scrollbarGutter = "";
    };
  }, [state]);

  // Trigger the reveal sequence (strictly runs once from "idle")
  const triggerReveal = useCallback(() => {
    // Ignore clicks in every state except "idle"
    if (stateRef.current !== "idle") return;

    // Check prefers-reduced-motion dynamically
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateState("done");
      return;
    }

    const mesh = wireframeMeshRef.current;
    const material = wireframeMaterialRef.current;

    // If wireframe is not mounted (e.g. fallback mode), reveal immediately
    if (!mesh) {
      updateState("done");
      return;
    }

    updateState("expanding");

    // Clean up any existing GSAP context
    if (gsapCtxRef.current) {
      gsapCtxRef.current.revert();
    }

    // Calculate expansion scale based on viewport to cover all edges
    const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    const targetScale = Math.max(aspect * 9, 13);

    // Create GSAP context for proper React cleanup
    gsapCtxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          updateState("done");
          if (contentContainerRef.current) {
            contentContainerRef.current.removeAttribute("inert");
          }
        },
      });

      timelineRef.current = tl;

      // 1. EXPAND / ZOOM OUT (1.2s power3.inOut)
      tl.to(
        mesh.scale,
        {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 1.2,
          ease: "power3.inOut",
          onComplete: () => {
            updateState("revealed");
          },
        },
        0
      );

      if (material) {
        tl.to(
          material,
          {
            opacity: 0.55,
            duration: 0.7,
            ease: "power2.out",
          },
          0
        );
      }

      // Synchronize portfolio fade-in with expansion
      if (contentContainerRef.current) {
        tl.fromTo(
          contentContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power3.inOut" },
          0
        );
      }

      // 2. HOLD (0.4s)
      tl.to({}, { duration: 0.4 });

      // 3. CONTRACT back around portrait (1.0s power3.inOut)
      tl.add(() => {
        updateState("contracting");
      });

      tl.to(mesh.scale, {
        x: 1.22,
        y: 1.22,
        z: 1.22,
        duration: 1.0,
        ease: "power3.inOut",
      });

      if (material) {
        tl.to(
          material,
          {
            opacity: 0.3,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<"
        );
      }
    });
  }, [updateState]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (gsapCtxRef.current) {
        gsapCtxRef.current.revert();
      }
    };
  }, []);

  const isRevealed = state !== "idle";

  return (
    <HeroIntroContext.Provider
      value={{
        state,
        isRevealed,
        triggerReveal,
        registerWireframe,
        registerContentContainer,
      }}
    >
      {children}
    </HeroIntroContext.Provider>
  );
}

export function useHeroIntro() {
  const context = useContext(HeroIntroContext);
  if (!context) {
    return {
      state: "done" as IntroState,
      isRevealed: true,
      triggerReveal: () => {},
      registerWireframe: () => {},
      registerContentContainer: () => {},
    };
  }
  return context;
}
