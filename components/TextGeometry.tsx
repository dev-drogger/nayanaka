"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";
import { MathUtils } from "three";
import type * as THREE from "three";

export default function TextGeometry() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Center>
            <AnimatedText />
          </Center>
        </Float>
      </Canvas>
    </div>
  );
}

function AnimatedText() {
  const textRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (textRef.current) {
      // Follow mouse with slight lag
      textRef.current.rotation.x = MathUtils.lerp(
        textRef.current.rotation.x,
        mouse.y * 0.2,
        0.05
      );
      textRef.current.rotation.y = MathUtils.lerp(
        textRef.current.rotation.y,
        mouse.x * 0.5,
        0.05
      );

      // Subtle animation
      textRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={textRef}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-4.5, 0.5, 0]}
      >
        CREATIVE
        <meshStandardMaterial
          color="white"
          roughness={0.1}
          metalness={0.8}
          emissive="white"
          emissiveIntensity={0.2}
        />
      </Text3D>

      <Text3D
        font="/fonts/Inter_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-3.5, -1.5, 0]}
      >
        STUDIO
        <meshStandardMaterial
          color="white"
          roughness={0.1}
          metalness={0.8}
          emissive="white"
          emissiveIntensity={0.2}
        />
      </Text3D>
    </group>
  );
}
