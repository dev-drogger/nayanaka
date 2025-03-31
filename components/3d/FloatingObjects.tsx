"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, type Mesh } from "three";

function FloatingObject({
  position,
  size,
  speed,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={new Color("#ffffff")}
        wireframe
        opacity={0.2}
        transparent
      />
    </mesh>
  );
}

export default function FloatingObjects() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingObject position={[-3, 2, -5]} size={1} speed={0.5} />
        <FloatingObject position={[3, -1, -2]} size={0.7} speed={0.3} />
        <FloatingObject position={[0, 3, -3]} size={1.2} speed={0.2} />
        <FloatingObject position={[-2, -2, -4]} size={0.8} speed={0.4} />
        <FloatingObject position={[4, 0, -6]} size={1.5} speed={0.1} />
      </Canvas>
    </div>
  );
}
