import React from "react";
import ReactLenis from "lenis/react";
import Hero from "./hero-section";
import About from "./about-section";
import Projects from "./projects-section";

export default function MainConten() {
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      <Hero />
      <About />
      <Projects />
    </ReactLenis>
  );
}
