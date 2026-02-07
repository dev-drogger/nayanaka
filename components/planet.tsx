"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PlanetProps {
  scale: number;
  triggerRef: React.RefObject<HTMLDivElement>;
}

export function Planet({ scale, triggerRef }: PlanetProps) {
  const ringContainer = useRef(null);
  const shapeContainer = useRef(null);
  const { nodes, materials } = useGLTF("/models/Planet.glb");
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(() => {
    if (!triggerRef?.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.2,
        fastScrollEnd: true,
        preventOverlaps: true,
      },
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    tl.from(shapeContainer.current.position, {
      y: 5,
      duration: 1,
    }).from(
      ringContainer.current.rotation,
      {
        x: 0.8,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      "<",
    );

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [triggerRef]);

  // Clean up scroll trigger on unmount
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <group ref={shapeContainer} scale={scale} dispose={null}>
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={1.6}
      />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
