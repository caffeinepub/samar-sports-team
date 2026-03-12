import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import SpeedParticles from "./SpeedParticles";

export default function HeroCanvas() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ alpha: true, antialias: false }}
    >
      <Suspense fallback={null}>
        <SpeedParticles />
      </Suspense>
    </Canvas>
  );
}
