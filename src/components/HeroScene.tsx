"use client";

import { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMedia, useWebGL } from "@/lib/hooks";
import { useHeroIntro } from "@/context/HeroIntroContext";

function ResponsiveCamera({ wrapperSelector = "#hero-orb-wrapper" }: { wrapperSelector?: string }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const updateCamera = () => {
      if (!(camera instanceof THREE.PerspectiveCamera)) return;

      const wrapper = document.querySelector(wrapperSelector);
      const wrapperWidth = wrapper ? wrapper.getBoundingClientRect().width : 320;

      // Exact Three.js perspective math:
      // An object of radius R (diameter 2R) at distance Z will appear on a canvas of height size.height
      // with apparent pixel diameter: px = (2R * size.height) / (2 * Z * tan(fov / 2))
      // Solving for Z: Z = (R * size.height) / (targetPx * tan(fov / 2))
      const fovRad = (camera.fov * Math.PI) / 180;
      const sphereRadius = 1.0;
      const targetPx = wrapperWidth * 0.94; // Sits comfortably inside the wrapper
      const z = (sphereRadius * size.height) / (targetPx * Math.tan(fovRad / 2));

      camera.position.set(0, 0, Math.max(z, 2));
      camera.updateProjectionMatrix();
    };

    updateCamera();
    window.addEventListener("resize", updateCamera);
    return () => window.removeEventListener("resize", updateCamera);
  }, [camera, size.height, size.width, wrapperSelector]);

  return null;
}

function Orb({
  detail,
  animate,
  onRegister,
}: {
  detail: number;
  animate: boolean;
  onRegister: (mesh: THREE.Mesh | null, mat: THREE.Material | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeMeshRef = useRef<THREE.Mesh>(null);
  const wireframeMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useEffect(() => {
    if (wireframeMeshRef.current && wireframeMatRef.current) {
      onRegister(wireframeMeshRef.current, wireframeMatRef.current);
    }
  }, [onRegister]);

  useFrame((_, delta) => {
    if (animate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner purple-blue core sphere */}
      <mesh>
        <icosahedronGeometry args={[1.0, detail]} />
        <meshPhysicalMaterial
          color="#7b68ee"
          roughness={0.28}
          metalness={0.42}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Polyhedral wireframe grid surrounding the sphere */}
      <mesh ref={wireframeMeshRef} scale={1.22}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial
          ref={wireframeMatRef}
          color="#b8b0ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const hasWebGL = useWebGL();
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const small = useMedia("(max-width: 767px)");
  const { registerWireframe, triggerReveal } = useHeroIntro();

  // If WebGL is not supported, reveal the full portfolio immediately
  useEffect(() => {
    if (!hasWebGL) {
      triggerReveal();
    }
  }, [hasWebGL, triggerReveal]);

  if (!hasWebGL) {
    return (
      <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
        <div className="h-[75%] w-[75%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#b3acff,#8175ff_45%,#2a2260)] opacity-80 blur-[1px]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[100dvh] w-screen max-w-[100vw] overflow-visible"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={small ? 1 : [1, 1.5]}
        gl={{ antialias: !small, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={2.8} />
        <pointLight position={[-3, -2, 2]} color="#9384ff" intensity={8} />
        <ResponsiveCamera />
        <Orb
          detail={small ? 8 : 32}
          animate={!reduced}
          onRegister={registerWireframe}
        />
      </Canvas>
    </div>
  );
}
