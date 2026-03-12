import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleData {
  x: number;
  y: number;
  z: number;
  speed: number;
  length: number;
  color: THREE.Color;
}

export default function SpeedParticles() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { geometry, particles } = useMemo(() => {
    const count = 200;
    const pts: ParticleData[] = [];
    const positions = new Float32Array(count * 6);
    const colors = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 5;
      const speed = Math.random() * 0.3 + 0.1;
      const length = Math.random() * 2 + 0.5;
      const colorChoice = Math.random();
      const color =
        colorChoice > 0.6
          ? new THREE.Color("#FF4500")
          : colorChoice > 0.3
            ? new THREE.Color("#FF0022")
            : new THREE.Color("#FF8C00");

      pts.push({ x, y, z, speed, length, color });

      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x + length;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z;

      colors[i * 6 + 0] = color.r;
      colors[i * 6 + 1] = color.g;
      colors[i * 6 + 2] = color.b;
      colors[i * 6 + 3] = color.r * 0.1;
      colors[i * 6 + 4] = color.g * 0.1;
      colors[i * 6 + 5] = color.b * 0.1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return { geometry: geo, particles: pts };
  }, []);

  useFrame((_, delta) => {
    if (!linesRef.current) return;
    const positions = linesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particles.length; i++) {
      particles[i].x -= particles[i].speed * delta * 60;
      if (particles[i].x < -15) {
        particles[i].x = 15 + Math.random() * 5;
      }

      positions[i * 6 + 0] = particles[i].x;
      positions[i * 6 + 1] = particles[i].y;
      positions[i * 6 + 2] = particles[i].z;
      positions[i * 6 + 3] = particles[i].x + particles[i].length;
      positions[i * 6 + 4] = particles[i].y;
      positions[i * 6 + 5] = particles[i].z;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.8} />
    </lineSegments>
  );
}
