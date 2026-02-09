"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mesh, Group } from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PlanetProps {
  scale: number;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function Planet({ scale, triggerRef }: PlanetProps) {
  const ringContainer = useRef<Mesh>(null);
  const shapeContainer = useRef<Group>(null);
  const { nodes, materials } = useGLTF("/models/Planet.glb");

  const planetMesh = nodes.Ring as Mesh;
  const scrollTriggerRef = useRef<ScrollTrigger | undefined>(undefined);

  useGSAP(() => {
    if (
      !triggerRef?.current ||
      !shapeContainer.current ||
      !ringContainer.current
    )
      return;

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
        scrollTriggerRef.current = undefined;
      }
    };
  }, [triggerRef]);

  return (
    <group ref={shapeContainer} scale={scale} dispose={null}>
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={planetMesh.geometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={1.6}
      />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
