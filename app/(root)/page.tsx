"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "@/state/redux";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setMouseSpeed } from "@/state/slices/cursorSlice";
import { setActiveSection } from "@/state/slices/navigationSlice";
import { setLoading } from "@/state/slices/loadingSlice";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Components
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "../loading";
import Navigation from "@/components/navigation";
import Hero from "./section/hero-section";
import About from "./section/about-section";
import Services from "./section/service-section";
import Pricing from "./section/pricing-section";
import BrowserCheck from "@/components/BrowserCheck";
import { BackgroundPaths } from "@/components/background-paths";

// Dynamically import 3D Background
const BackgroundShader = dynamic(
  () => import("@/components/3d/BackgroundShader"),
  { ssr: false }
);

function MainContent() {
  const dispatch = useAppDispatch();
  const { menuOpen } = useAppSelector((state) => state.navigation);
  const { isLoading } = useAppSelector((state) => state.loading);
  const prevPos = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const throttleDelay = 16; // ~60fps

  useEffect(() => {
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

    const handleScroll = () => {
      const sections = ["hero", "about", "services", "pricing", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            dispatch(setActiveSection(section));
            break;
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Simulate loading assets
    const timer = setTimeout(() => dispatch(setLoading(false)), 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <main className="min-h-screen w-full bg-jet overflow-x-hidden">
      {/* Browser compatibility check */}
      <BrowserCheck />

      {/* Custom cursor */}
      <CustomCursor />

      {/* 3D Background for entire site */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <BackgroundShader />
        </Suspense>
      </div>

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
          >
            <Navigation />

            <div
              className={`transition-all duration-700 ${
                menuOpen ? "opacity-20 blur-sm" : "opacity-100"
              }`}
            >
              <BackgroundPaths>
                <Hero />
              </BackgroundPaths>
              <About />
              <Services />
              <Pricing />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Page() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}
