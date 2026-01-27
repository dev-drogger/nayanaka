"use client";

import { useRef } from "react";
import { BackgroundPaths } from "@/components/background-paths";
import HeroTitle from "@/components/hero/hero-title";
import { HeroGraphic } from "@/components/hero/hero-graphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef(null);
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.set(heroRef.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    gsap.to(heroRef.current, {
      clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
      duration: 2,
      delay: 1,
      ease: "power4.out",
    });
  });

  return (
    <section ref={heroRef} className="py-0 bg-jet z-2">
      {/* <BackgroundPaths>
      </BackgroundPaths> */}
      <div
        id="hero"
        className="h-screen z-2 flex items-center w-screen bg-gray-200"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-12 gap-4 z-50">
            <HeroTitle />
            <HeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
