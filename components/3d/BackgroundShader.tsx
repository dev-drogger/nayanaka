"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Color, type Mesh } from "three";
import { Stars } from "@react-three/drei";

function Shader() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshStandardMaterial
        color={new Color("#cfae70")}
        wireframe
        opacity={0.9}
        transparent
      />
    </mesh>
  );
}

export default function BackgroundShader() {
  return (
    <div className="h-full w-full rounded-2xl">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Shader />
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
