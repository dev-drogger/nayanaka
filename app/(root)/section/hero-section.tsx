"use client";

import { useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/redux-hooks";
import { BackgroundPaths } from "@/components/background-paths";
import HeroTitle from "@/components/hero/hero-title";
import { HeroGraphic } from "@/components/hero/hero-graphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  gsap.registerPlugin(useGSAP);
  const pageRef = useRef(null);
  const page2Ref = useRef(null);

  const pageTl = useRef<gsap.core.Timeline | null>(null);
  const page2Tl = useRef<gsap.core.Timeline | null>(null);

  const { isContentVisible } = useAppSelector((state) => state.contentVisible);

  useGSAP(() => {
    pageTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        pageRef.current,
        { y: 100 },
        { y: 0, duration: 0.6, ease: "circ.inOut" },
      );

    page2Tl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        page2Ref.current,
        { y: -100 },
        { y: 0, duration: 0.6, ease: "circ.inOut" },
      );
  });

  useEffect(() => {
    if (isContentVisible) {
      pageTl.current?.play();
      page2Tl.current?.play();
    } else {
      pageTl.current?.reverse();
      page2Tl.current?.reverse();
    }
  }, [isContentVisible]);

  return (
    <section className="py-0 bg-jet">
      <BackgroundPaths>
        <div id="hero" className="h-screen z-2 flex items-center w-screen">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-12 gap-4 z-50">
              <HeroTitle state={isContentVisible} />
              <HeroGraphic state={isContentVisible} />
            </div>
          </div>
        </div>
      </BackgroundPaths>

      <div
        className="bg-jet w-full z-4 absolute bottom-0 h-[10vh] lg:h-[13vh]"
        ref={pageRef}
      ></div>
      <div
        className="bg-jet w-full z-4 absolute top-0 h-[10vh] lg:h-[13vh]"
        ref={page2Ref}
      ></div>
    </section>
  );
}
