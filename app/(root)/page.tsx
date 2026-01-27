"use client";

import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

import CustomCursor from "@/components/ui/custom-cursor";
import LoadingScreen from "../../components/loading";
import Hero from "./section/hero-section";
import Services from "./section/service-section";
import Pricing from "./section/pricing-section";
import Projects from "./section/projects-section";
import About from "./section/about-section";
import BrowserCheck from "@/components/browser-check";

import useMouseTracking from "@/hooks/use-mouse-tracking";
import useAnimationTiming from "@/hooks/use-animation-timing";
import { useRafCallback } from "@/hooks/use-raf-callback";
import { setMouseSpeed } from "@/state/slices/cursorSlice";
import { useState } from "react";
import { useProgress } from "@react-three/drei";
import dynamic from "next/dynamic";

function MainContent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const { isPageMounted } = useAppSelector((state) => state.pageMounted);
  const [isReady, setIsReady] = useState(false);

  const minimumLoadTime = 3500;
  const mouseSpeedRef = useMouseTracking();
  const { childrenRef } = useAnimationTiming(minimumLoadTime);
  const progress = useProgress();

  useRafCallback(() => {
    if (Math.abs(mouseSpeedRef.current) > 2) {
      dispatch(setMouseSpeed(mouseSpeedRef.current));
      mouseSpeedRef.current = 0;
    }
  }, !isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Wait a tick to ensure content is visible
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    }

    if (progress === 100) {
      setIsReady(true);
    }
  }, [isLoading, progress]);

  const contentVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
      },
    }),
    [],
  );

  return (
    <>
      <BrowserCheck />
      <CustomCursor />

      {/* Preload content while hidden */}
      {isLoading && (
        <div
          key="hidden-content"
          ref={childrenRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            pointerEvents: "none",
            width: 0,
            height: 0,
          }}
        >
          {children}
        </div>
      )}

      {/* Main content - always render but control visibility with opacity */}
      <motion.div
        key="content"
        initial="hidden"
        animate={"visible"}
        variants={contentVariants}
        className="w-full"
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </motion.div>

      {!isReady && <LoadingScreen />}
    </>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

const DynamicContent = dynamic(() => import("./section/main-content"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function Page() {
  return <DynamicContent />;
}
