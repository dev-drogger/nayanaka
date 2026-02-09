"use client";

import CustomCursor from "@/components/ui/custom-cursor";
import LoadingScreen from "../../components/loading";
import BrowserCheck from "@/components/browser-check";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import Hero from "./section/hero-section";
import Projects from "./section/projects-section";
import About from "./section/new-about";
// import About from "./section/about-section";
import Services from "./section/new-service";

export default function Page() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);
  return (
    <>
      <BrowserCheck />
      <CustomCursor />
      <ReactLenis
        root
        options={{
          duration: 1.2, // Reduced duration for snappier feel
          lerp: 0.08, // Slightly increased lerp for better performance
          smoothWheel: true,
          wheelMultiplier: 1,
        }}
        className="relative w-screen min-h-screen overflow-x-auto"
      >
        {!isReady ? (
          <LoadingScreen />
        ) : (
          <div
            className={`${
              isReady ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
          >
            <Hero />
            <About />
            <Projects />
            <Services />
          </div>
        )}
      </ReactLenis>
    </>
  );
}
