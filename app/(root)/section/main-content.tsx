"use client";

import CustomCursor from "@/components/ui/custom-cursor";
// import LoadingScreen from "@/components/loading";
import BrowserCheck from "@/components/browser-check";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import Hero from "./hero-section";
import Projects from "./projects-section";
import About from "./new-about";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Services from "./new-service";
gsap.registerPlugin(ScrollTrigger);

export default function MainContent() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress, isReady]);
  return (
    <>
      <BrowserCheck />
      <CustomCursor />
      <ReactLenis
        root
        options={{
          duration: 1.5, // Reduced duration for snappier feel
          lerp: 0.08, // Slightly increased lerp for better performance
          smoothWheel: true,
          wheelMultiplier: 1,
        }}
        className="relative w-screen min-h-screen overflow-x-auto"
      >
        {/* {!isReady && <LoadingScreen />} */}

        <>
          <Hero />
          <About />
          <Projects />
          <Services />
        </>
      </ReactLenis>
    </>
  );
}
