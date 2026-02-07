import React from "react";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import Hero from "./hero-section";

import Projects from "./projects-section";
import About from "./about-section";
// Lazy load heavy sections
// const Hero = dynamic(() => import("./hero-section"), {
//   loading: () => <div className="h-screen" />,
// });
const About = dynamic(() => import("./about-section"), {
  ssr: false,
});
// const Projects = dynamic(() => import("./projects-section"), {
//   loading: () => <div className="h-screen" />,
// });

export default function MainContent() {
  return (
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
      <Hero />
      <About />
      <Projects />
    </ReactLenis>
  );
}
