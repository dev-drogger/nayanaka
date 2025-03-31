"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Color, type Mesh } from "three";

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
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color={new Color("#111111")}
        wireframe
        opacity={0.1}
        transparent
      />
    </mesh>
  );
}

export default function BackgroundShader() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Shader />
      </Canvas>
    </div>
  );
}
