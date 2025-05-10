"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setMouseSpeed } from "@/state/slices/cursorSlice";
import { setLoading } from "@/state/slices/loadingSlice";

// Components
import CustomCursor from "@/components/custom-cursor";
import LoadingScreen from "@/components/3d/lo";
import Navigation from "@/components/navigation";
import Hero from "./section/hero-section";
import About from "./section/about-section";
import Services from "./section/service-section";
import Pricing from "./section/pricing-section";
import Projects from "./section/projects-section";
import BrowserCheck from "@/components/browser-check";
import Footer from "@/components/footer";
import { ScrollControls, Scroll } from "@react-three/drei";
import ReduxProvider from "@/state/redux-provider";

import { ProjectCarousel } from "@/components/projects/project-carousel";
import OptimizedCanvas from "@/components/optimized-canvas";
import { useRafCallback } from "@/hooks/use-raf-callback";
import { useThrottledEffect } from "@/hooks/use-throttled-effect";

function MainContent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const [contentVisible, setContentVisible] = useState(false);
  const prevPos = useRef({ x: 0, y: 0 });
  const minimumLoadTime = 3000;
  const loadStartTime = useRef(Date.now());
  const childrenRef = useRef<HTMLDivElement>(null);
  const mouseSpeedRef = useRef(0);

  // Inside the MainContent component, replace the current mouse movement effect with:
  useEffect(() => {
    loadStartTime.current = Date.now();

    // Track mouse position without immediate state updates
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Store the speed in a ref to avoid re-renders
      mouseSpeedRef.current = speed;
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    // Add passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dispatch]);

  // Add this after the useEffect:
  useRafCallback(() => {
    // Only dispatch if speed changed significantly to reduce Redux updates
    if (Math.abs(mouseSpeedRef.current) > 2) {
      dispatch(setMouseSpeed(mouseSpeedRef.current));
      mouseSpeedRef.current = 0;
    }
  }, !isLoading); // Only run when not loading

  // Replace the loading part of the effect with:
  useThrottledEffect(
    () => {
      if (isLoading) {
        const timeElapsed = Date.now() - loadStartTime.current;
        const remainingTime = Math.max(0, minimumLoadTime - timeElapsed);

        if (timeElapsed >= minimumLoadTime) {
          setContentVisible(true);

          setTimeout(() => {
            dispatch(setLoading(false));
          }, 1000);
        }
      }
    },
    100,
    [isLoading]
  );

  // Optimized animation variants with hardware acceleration hints
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <BrowserCheck />
      <CustomCursor />

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
            overflow: "hidden", // Prevent any layout impact
          }}
        >
          {children}
        </div>
      )}

      <div>
        {isLoading && (
          <AnimatePresence>
            <LoadingScreen key="loading" />
          </AnimatePresence>
        )}

        <motion.div
          key="content"
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
          exit={{ opacity: 0 }}
          variants={contentVariants}
          className="h-screen w-full"
          style={{
            willChange: "opacity, transform", // Hint for hardware acceleration
            transform: "translateZ(0)", // Force GPU acceleration
          }}
        >
          <Navigation />
          <OptimizedCanvas className="main-canvas">
            <color attach="background" args={["#e5e7eb"]} />
            <ScrollControls pages={12.4} damping={0.2}>
              <ProjectCarousel />
              <Scroll html>
                <ReduxProvider>{children}</ReduxProvider>
              </Scroll>
            </ScrollControls>
          </OptimizedCanvas>
        </motion.div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <MainContent>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Pricing />
      <Footer />
    </MainContent>
  );
}
