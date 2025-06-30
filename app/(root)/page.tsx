"use client";

import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setMouseSpeed } from "@/state/slices/cursorSlice";

import CustomCursor from "@/components/ui/custom-cursor";
import LoadingScreen from "../../components/loading";
import Hero from "./section/hero-section";
import About from "./section/about-section";
import Services from "./section/service-section";
import Pricing from "./section/pricing-section";
import Projects from "./section/projects-section";
import BrowserCheck from "@/components/browser-check";
import { useRafCallback } from "@/hooks/use-raf-callback";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

import useMouseTracking from "@/hooks/use-mouse-tracking";
import useAnimationTiming from "@/hooks/use-animation-timing";
import StickyFix from "./section/new-about";

function MainContent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const { isPageMounted } = useAppSelector((state) => state.pageMounted);
  const minimumLoadTime = 3500;
  const mouseSpeedRef = useMouseTracking();
  const { childrenRef } = useAnimationTiming(minimumLoadTime);

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
  }, [isLoading]);

  const contentVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    []
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
        animate={isPageMounted ? "visible" : "hidden"}
        variants={contentVariants}
        className="w-full"
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </motion.div>

      {/* Loading screen with proper exit animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-container"
            exit={{
              x: 1900,
              transition: { duration: 0.8, ease: "circInOut", delay: 0.5 },
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100, // Higher than content
            }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
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

export default function Page() {
  return (
    <ErrorBoundary>
      <MainContent>
        <Hero />
        {/* <About /> */}
        <StickyFix />
        <Services />
        <Projects />
        <Pricing />
      </MainContent>
    </ErrorBoundary>
  );
}
