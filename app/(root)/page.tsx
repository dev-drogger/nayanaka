"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setMouseSpeed } from "@/state/slices/cursorSlice";
import { setLoading } from "@/state/slices/loadingSlice";

// Components
import CustomCursor from "@/components/custom-cursor";
import LoadingScreen from "../../components/3d/lo";
import Navigation from "@/components/navigation";
import Hero from "./section/hero-section";
import About from "./section/about-section";
import Services from "./section/service-section";
import Pricing from "./section/pricing-section";
import Projects from "./section/projects-section";
import BrowserCheck from "@/components/browser-check";
import Footer from "@/components/footer";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useRafCallback } from "@/hooks/use-raf-callback";
import OptimizedCanvas from "@/components/optimized-canvas";
import ReduxProvider from "@/state/redux-provider";

import { ProjectCarousel } from "@/components/projects/project-carousel";

function MainContent({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const [contentVisible, setContentVisible] = useState(false);
  const prevPos = useRef({ x: 0, y: 0 });
  const minimumLoadTime = 3000;
  const lastUpdateTime = useRef(Date.now());
  const childrenRef = useRef<HTMLDivElement>(null);
  const mouseSpeedRef = useRef(0); // ~60fps

  useEffect(() => {
    lastUpdateTime.current = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mouseSpeedRef.current = speed;
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleFullyLoaded = () => {
      const timeElapsed = Date.now() - lastUpdateTime.current;
      const remainingTime = Math.max(0, minimumLoadTime - timeElapsed);

      setTimeout(() => {
        requestAnimationFrame(() => {
          // First make the content visible
          setContentVisible(true);
          console.log("setContentVisible");

          // Give the content time to render before fading out loading screen
          setTimeout(() => {
            dispatch(setLoading(false));
            console.log("setLoading");
          }, 800); // Reduced from 5000ms for better UX
        });
      }, remainingTime);
    };

    if (window && "IntersectionObserver" in window) {
      setTimeout(() => {
        if (!childrenRef.current) return;

        // Create a promise that resolves when window.onload fires
        const windowLoadPromise = new Promise<void>((resolve) => {
          if (document.readyState === "complete") {
            resolve();
          } else {
            window.addEventListener("load", () => resolve(), { once: true });
          }
        });

        Promise.all([windowLoadPromise])
          .then(handleFullyLoaded)
          .catch(handleFullyLoaded);
      }, 0);
    } else {
      (window as Window).addEventListener("load", handleFullyLoaded, {
        once: true,
      });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("load", handleFullyLoaded);
    };
  }, [dispatch, minimumLoadTime]);

  useRafCallback(() => {
    // Only dispatch if speed changed significantly to reduce Redux updates
    if (Math.abs(mouseSpeedRef.current) > 2) {
      dispatch(setMouseSpeed(mouseSpeedRef.current));
      mouseSpeedRef.current = 0;
    }
  }, !isLoading);

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

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
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      )}

      {/* Main content - always render but control visibility with opacity */}
      <motion.div
        key="content"
        initial="hidden"
        animate={contentVisible ? "visible" : "hidden"}
        variants={contentVariants}
        className="h-screen w-full"
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Navigation />
        <OptimizedCanvas className="main-canvas">
          <color attach="background" args={["#e5e7eb"]} />
          <ScrollControls pages={12.27} damping={1}>
            <ProjectCarousel />
            <Scroll html>
              <ReduxProvider>{children}</ReduxProvider>
            </Scroll>
          </ScrollControls>
        </OptimizedCanvas>
      </motion.div>

      {/* Loading screen with proper exit animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-container"
            exit={{
              opacity: 0,
              transition: { duration: 1, ease: "easeOut" },
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100, // Higher than content
              backgroundColor: "#000", // Or whatever your loading background is
            }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
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
