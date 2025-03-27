"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { Vector3, MathUtils } from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import type * as THREE from "three";

export default function Scene3D() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Logo position={[0, 0, 0]} />
        </Float>

        <Environment preset="city" />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration
            offset={new Vector3(0.002, 0.002, 0.002)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={true}
            modulationOffset={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

function Logo({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Follow mouse with slight lag
      meshRef.current.rotation.x = MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * 0.5,
        0.05
      );
      meshRef.current.rotation.y = MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.5,
        0.05
      );

      // Subtle animation
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.9}
        emissive="#ffffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
