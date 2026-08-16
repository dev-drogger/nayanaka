"use client";

import CustomCursor from "@/components/ui/custom-cursor";
import BrowserCheck from "@/components/browser-check";
import ReactLenis from "lenis/react";
import Hero from "./hero-section";
import Projects from "./projects-section";
import About from "./about-section";
import Services from "./services-section";

export default function MainContent() {
  return (
    <>
      <BrowserCheck />
      {/* <CustomCursor /> */}
      <ReactLenis
        root
        options={{
          duration: 2,
          lerp: 0.06,
          smoothWheel: true,
          wheelMultiplier: 0.7,
        }}
        className="relative w-screen min-h-screen overflow-x-auto"
      >
        <>
          <Hero />
          <About />
          {/* <Projects /> */}
          <Services />
        </>
      </ReactLenis>
    </>
  );
}
