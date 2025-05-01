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
import LoadingScreen from "../../components/3d/lo";
import Navigation from "@/components/navigation";
import Hero from "./section/hero-section";
import About from "./section/about-section";
import Services from "./section/service-section";
import Pricing from "./section/pricing-section";
import BrowserCheck from "@/components/BrowserCheck";
import Footer from "@/components/footer";
import { ScrollControls, Scroll, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ReduxProvider from "@/state/redux-provider";
import { Projects } from "./section/projects-section";
import { NewAbout } from "./section/new-about";
import Scene3D from "@/components/3d/Scene3D";
import { Square } from "@/components/3d/scene";
import { Items, ResponsiveText } from "../projects/page";
import Carousel from "../projects/page";

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

    const handleScroll = () => {
      const sections = [
        "hero",
        "new",
        "about",
        "services",
        "projects",
        "pricing",
        "contact",
      ];
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
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleFullyLoaded);
    };
  }, [dispatch, minimumLoadTime]);

  return (
    <>
      <BrowserCheck />

      <CustomCursor />

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <Suspense fallback={null}>
          <BackgroundShader />
        </Suspense>
      </motion.div> */}

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
            {/* <Navigation />
            <Hero />
            <NewAbout />
            <About />
            <Services />
            <Projects />
            <Pricing />
            <Footer /> */}
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
              <ScrollControls pages={12.4} damping={0.25}>
                <Items></Items>
                <Scroll html>
                  <ReduxProvider>
                    <Hero />
                    <NewAbout />
                    {/* <About /> */}
                    <Services />
                    <Projects />
                    <ResponsiveText />
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

export default function Page() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}
