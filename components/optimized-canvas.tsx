"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

interface OptimizedCanvasProps {
  children: ReactNode;
  className?: string;
}

export default function OptimizedCanvas({
  children,
  className = "",
}: OptimizedCanvasProps) {
  const [dpr, setDpr] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  // Optimize DPR based on device capabilities
  useEffect(() => {
    // Cap DPR at 2 for performance
    const deviceDpr = Math.min(window.devicePixelRatio, 2);
    setDpr(deviceDpr);

    // Detect if this is a low-end device
    const isLowEndDevice =
      navigator.hardwareConcurrency <= 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isLowEndDevice) {
      setDpr(1); // Force lower resolution on low-end devices
    }
  }, []);

  // Use Intersection Observer to pause rendering when not visible
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`.${className}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [className]);

  return (
    <Canvas
      className={className}
      gl={{
        antialias: true,
        alpha: false,
        stencil: false,
        depth: false,
        powerPreference: "high-performance",
        toneMapping: THREE.NoToneMapping,
      }}
      dpr={dpr}
      frameloop={isVisible ? "demand" : "never"}
      performance={{ min: 0.5 }}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        pointerEvents: "none",
      }}
    >
      {children}
    </Canvas>
  );
}
