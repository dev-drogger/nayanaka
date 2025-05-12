"use client";

import { useRef, useEffect, useState } from "react";
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import type * as THREE from "three";
import { easing } from "maath";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setInView } from "@/state/slices/viewSlice";

export function Square() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const scroll = useScroll();
  const [size, setSize] = useState({ width: 1, height: 1 });
  const dispatch = useAppDispatch();

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
    const positionFactor = -7.1 + scrollOffset * 70;

    if (meshRef.current) {
      // First phase (0 to 0.5): Only scale X
      if (scrollOffset <= 0.095) {
        // Map 0-0.5 to 1-0.5 for x scale
        const xScaleFactor = Math.max(0.75, 1.5 - scrollOffset * 14);
        const yScaleFactor = Math.max(0.6, 1.1 - scrollOffset * 12);

        easing.damp3(
          meshRef.current.scale,
          [xScaleFactor, yScaleFactor, meshRef.current.scale.z],
          0.05
        );
        // easing.damp3(meshRef.current.position, [0, positionFactor, 0], 0.05);
        meshRef.current.position.y = positionFactor;
      } else {
        // After scrollOffset > 0.2, keep position.y fixed
        meshRef.current.position.y = meshRef.current.position.y;
        dispatch(setInView(true));
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[size.width, size.height]} />
      <meshBasicMaterial color="rgb(46, 46, 46)" />
    </mesh>
  );
}
