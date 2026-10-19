"use client";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-full w-full rounded-full bg-white/[0.03]" />,
});

export default function HeroSceneLoader() {
  return <HeroScene />;
}
