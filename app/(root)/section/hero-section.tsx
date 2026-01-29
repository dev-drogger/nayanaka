"use client";

import { useRef } from "react";
import { BackgroundPaths } from "@/components/background-paths";
import HeroTitle from "@/components/hero/hero-title";
import { HeroGraphic } from "@/components/hero/hero-graphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Hero() {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  useGSAP(() => {
    gsap.set(heroRef.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        id: "pin",
      },
    });

    gsap.to(heroRef.current, {
      clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
      duration: 2,
      delay: 1,
      ease: "power4.out",
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=500 center",
          scrub: 0.5,
        },
      })
      .fromTo(
        heroRef.current,
        {
          clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          immediateRender: false,
        },
      );
    // .to(titleRef.current, { opacity: 0, duration: 0.5 });

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "+=550 center",
      end: "center center",
      onLeave: () => {
        gsap.to(titleRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
        });
      },
      onEnterBack: () => {
        gsap.to(titleRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
        });
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className=" relative py-0 bg-jet z-2">
      {/* <BackgroundPaths>
      </BackgroundPaths> */}
      <div
        id="hero"
        ref={heroRef}
        className="min-h-screen z-2 flex items-center relative w-screen bg-gray-200"
      >
        <div ref={titleRef} className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-12 gap-4 z-50">
            <HeroTitle />
            <HeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
