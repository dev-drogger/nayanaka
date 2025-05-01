"use client";

import { useEffect, useRef } from "react";
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
import { Canvas } from "@react-three/fiber";
import ReduxProvider from "@/state/redux-provider";

import { ProjectCarousel } from "@/components/projects/project-carousel";

export default function MainContent() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const prevPos = useRef({ x: 0, y: 0 });
  const minimumLoadTime = 3000;
  const lastUpdateTime = useRef(Date.now());
  const throttleDelay = 16; // ~60fps

  useEffect(() => {
    lastUpdateTime.current = Date.now();
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // Throttle updates to avoid excessive calculations
      if (now - lastUpdateTime.current > throttleDelay) {
        // Calculate mouse speed for effects
        const dx = e.clientX - prevPos.current.x;
        const dy = e.clientY - prevPos.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Only dispatch if speed changed significantly
        if (Math.abs(speed) > 1) {
          dispatch(setMouseSpeed(speed));
        }

        prevPos.current = { x: e.clientX, y: e.clientY };
        lastUpdateTime.current = now;
      }
    };

    const handleFullyLoaded = () => {
      const timeElapsed = Date.now() - lastUpdateTime.current;
      const remainingTime = Math.max(0, minimumLoadTime - timeElapsed);

      setTimeout(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            dispatch(setLoading(false));
          }, 300);
        });
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleFullyLoaded();
    } else {
      window.addEventListener("load", handleFullyLoaded, { once: true });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("load", handleFullyLoaded);
    };
  }, [dispatch, minimumLoadTime]);

  return (
    <>
      <BrowserCheck />

      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-full"
          >
            <Navigation />
            <Canvas
              gl={{
                antialias: true,
                alpha: false,
                stencil: false,
                depth: false,
              }}
              dpr={[1, 2]}
            >
              <color attach="background" args={["#e5e7eb"]} />
              <ScrollControls pages={12.4} damping={1}>
                <ProjectCarousel />
                <Scroll html>
                  <ReduxProvider>
                    <Hero />
                    <About />
                    <Services />
                    <Projects />
                    <Pricing />
                    <Footer />
                  </ReduxProvider>
                </Scroll>
              </ScrollControls>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
