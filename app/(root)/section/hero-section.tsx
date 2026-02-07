"use client";

import { useRef, useState } from "react";
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
  const [contentVisible, setContentVisible] = useState(false);
  const [timeline, setTimeline] = useState<gsap.core.Timeline>(null);
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
      },
    });

    const heroTimeline = gsap.timeline();
    setTimeline(heroTimeline);

    heroTimeline.to(heroRef.current, {
      clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
      duration: 2,
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

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "+=550 center",
      end: "center center",
      onLeave: () => {
        gsap.to(titleRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power4.out",
          force3D: true,
        });
      },
      onEnterBack: () => {
        gsap.to(titleRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
          force3D: true,
        });
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === sectionRef.current ||
          trigger.vars.trigger === heroRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative py-0 bg-jet z-2">
      <div
        ref={heroRef}
        className="h-screen z-2 flex-center relative w-screen bg-gray-200 py-40"
      >
        <BackgroundPaths></BackgroundPaths>
        <div ref={titleRef} className="md:size-screen z-10 grid grid-cols-12">
          <HeroTitle timeline={timeline} />
          <HeroGraphic timeline={timeline} />
        </div>
      </div>
    </section>
  );
}
