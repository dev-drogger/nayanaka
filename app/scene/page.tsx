"use client";

import { useRef, useEffect, useState } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import type * as THREE from "three";
import { easing } from "maath";

export function Square() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const scroll = useScroll();
  const [size, setSize] = useState({ width: 1, height: 1 });

  // Calculate the initial size to fill the viewport
  useEffect(() => {
    // Set initial size to fill viewport
    setSize({
      width: viewport.width,
      height: viewport.height,
    });
  }, [viewport.width, viewport.height]);

  // Update on each frame
  useFrame(() => {
    const scrollOffset = scroll.offset; // Value between 0 and 1
    const positionFactor = -7.1 + scrollOffset * 76;
    const xScaleFactor = Math.max(0.5, 1 - scrollOffset * 12);
    const yScaleFactor = Math.max(0.4, 1.2 - scrollOffset * 12);

    if (meshRef.current) {
      // First phase (0 to 0.5): Only scale X
      if (scrollOffset <= 0.06) {
        // Map 0-0.5 to 1-0.5 for x scale

        easing.damp3(
          meshRef.current.scale,
          [meshRef.current.scale.x, yScaleFactor, meshRef.current.scale.z],
          0.05
        );
        // easing.damp3(meshRef.current.position, [0, positionFactor, 0], 0.05);
        meshRef.current.position.y = positionFactor;
      }
      if (scrollOffset <= 0.09) {
        easing.damp3(meshRef.current.position, [0, 0, 0]);
        easing.damp3(
          meshRef.current.scale,
          [xScaleFactor, meshRef.current.scale.y, meshRef.current.scale.z],
          0.05
        );
        // meshRef.current.position.y = 0;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[size.width, size.height]} />
      <meshStandardMaterial color="#f472b6" />
    </mesh>
  );
}
