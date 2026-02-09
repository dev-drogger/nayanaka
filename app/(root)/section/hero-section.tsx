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
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const scrollTimeline = useRef<gsap.core.Timeline>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline>(() =>
    gsap.timeline(),
  );
  useGSAP(() => {
    gsap.set(heroRef.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    // gsap.to(sectionRef.current, {
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top top",
    //     end: "+=800 center",
    //     scrub: 0.5,
    //     pin: true,
    //   },
    // });

    const heroTimeline = gsap.timeline();

    heroTimeline.to(heroRef.current, {
      clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
      duration: 2,
      ease: "power4.out",
    });

    setTimeline(heroTimeline);

    scrollTimeline.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000 center",
          scrub: 0.5,
          pin: true,
        },
      })
      .fromTo(
        heroRef.current,
        {
          clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: 1,
          immediateRender: false,
        },
      )
      .to([pathRef.current, titleRef.current], {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        force3D: true,
      });

    // ScrollTrigger.create({
    //   trigger: heroRef.current,
    //   start: "+=550 center",
    //   end: "center center",
    //   onLeave: () => {
    //     gsap.to(titleRef.current, {
    //       opacity: 0,
    //       duration: 0.5,
    //       ease: "power4.out",
    //       force3D: true,
    //     });
    //   },
    //   onEnterBack: () => {
    //     gsap.to(titleRef.current, {
    //       opacity: 1,
    //       duration: 0.5,
    //       ease: "power4.out",
    //       force3D: true,
    //     });
    //   },
    // });

    // Cleanup function
    return () => {
      scrollTimeline.current?.ScrollTrigger.kill();
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative py-0 bg-jet z-2">
      <div
        ref={heroRef}
        className="h-full z-2 flex-center relative w-screen bg-gray-200"
      >
        <BackgroundPaths ref={pathRef} />
        <div
          ref={titleRef}
          className="md:size-full z-10 grid grid-cols-12 py-32 container mx-auto"
        >
          <HeroTitle timeline={timeline} />
          <HeroGraphic timeline={timeline} />
        </div>
      </div>
    </section>
  );
}
