"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { MathUtils } from "three";
import type * as THREE from "three";

export default function FloatingObjects() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <ObjectsGroup />
      </Canvas>
    </div>
  );
}

function ObjectsGroup() {
  const objects = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10) - 5,
      ] as [number, number, number],
      scale: MathUtils.randFloat(0.5, 1.5),
      rotation: MathUtils.randFloat(0, Math.PI * 2),
      speed: MathUtils.randFloat(0.1, 0.5),
      type:
        Math.random() > 0.7 ? "text" : Math.random() > 0.5 ? "box" : "sphere",
    }));
  }, []);

  return (
    <>
      {objects.map((props, i) => (
        <Float
          key={i}
          speed={props.speed}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <FloatingObject {...props} />
        </Float>
      ))}
    </>
  );
}

function FloatingObject({
  position,
  scale,
  rotation,
  type,
}: {
  position: [number, number, number];
  scale: number;
  rotation: number;
  type: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  if (type === "text") {
    const words = ["DESIGN", "CODE", "CREATE", "INNOVATE", "EXPLORE"];
    const word = words[Math.floor(Math.random() * words.length)];

    return (
      <Text
        position={position}
        scale={scale * 0.5}
        rotation={[rotation, rotation, rotation]}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontSize={0.5}
        font="/fonts/Inter_Regular.json"
        opacity={0.1}
      >
        {word}
      </Text>
    );
  }

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      rotation={[rotation, rotation, rotation]}
    >
      {type === "box" ? (
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      ) : (
        <sphereGeometry args={[0.3, 16, 16]} />
      )}
      <meshStandardMaterial color="white" transparent opacity={0.1} />
    </mesh>
  );
}
