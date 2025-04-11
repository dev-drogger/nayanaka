"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Color, type Mesh } from "three";
import { Text, Stars } from "@react-three/drei";

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
    <group>
      {/* <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center w-[600px] max-w-full bg-cardinal p-4">
          <h1 className="text-5xl md:text-6xl font-light text-black leading-tight mb-6">
            we provide end-to-end
            <br />
            <span className="font-normal">web development</span>
            <br />
            and design services
          </h1>
        </div>
      </div> */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* <Shader /> */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {/* <Text
        position={[0, 0, -5]} // Offset in front of the camera
        fontSize={1.5}
        color="black"
        rotation={[0, 0, -Math.PI / 2]}
        anchorX="center"
        anchorY="middle"
      >
        PROJECTS
      </Text> */}
    </group>
  );
}
