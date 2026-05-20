"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AboutCurtain = () => {
  const curtainTimeline = useRef<gsap.core.Timeline>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useGSAP(() => {
    gsap.set(".separator", { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" });

    curtainTimeline.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".nayanaka",
        },
      })
      .from(".intro", {
        y: 20,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 1,
      })
      .from(".nayanaka", {
        y: 20,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 1,
      })
      .from("#corner", {
        opacity: 0,
        ease: "circ.out",
        duration: 1.5,
      })
      .to(
        ".separator",
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 2,
          ease: "power4.out",
        },
        "<",
      )
      .from("#curtain-desc", {
        opacity: 0,
        ease: "circ.out",
        duration: 1,
      });

    return () => {
      curtainTimeline.current?.kill();
      curtainTimeline.current?.scrollTrigger?.kill();
      curtainTimeline.current = null;
    };
  });
  return (
    <div id="curtain" className="bg-gray-200">
      <div id="corner">
        <ChevronDown
          className={
            isMobile
              ? "absolute top-2 left-0 rotate-135"
              : "absolute top-6 left-10 rotate-135"
          }
          size={100}
        />
        <ChevronDown
          className={
            isMobile
              ? "absolute top-2 right-0 rotate-225"
              : "absolute top-6 right-10 rotate-225"
          }
          size={100}
        />
        <ChevronUp
          className={
            isMobile
              ? "absolute bottom-2 left-0 rotate-225"
              : "absolute bottom-6 left-10 rotate-225"
          }
          size={100}
        />
        <ChevronUp
          className={
            isMobile
              ? "absolute bottom-2 right-0 rotate-135"
              : "absolute bottom-6 right-10 rotate-135"
          }
          size={100}
        />
      </div>
      <div className="absolute top-20 w-full flex-center">
        <h1 className="intro text-jet font-amie italic">introducing</h1>
      </div>
      <div className="nayanaka absolute md:px-40 top-40 w-screen flex flex-col items-center justify-center">
        <h1 className="text-jet text-7xl md:text-9xl font-medium uppercase">
          Nayanaka
        </h1>
        <h1 className="text-jet font-amie tracking-widest uppercase w-full text-center">
          Creative Studio
        </h1>
      </div>

      <div className="separator bg-jet w-screen flex gap-8 whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden">
        {Array.from({ length: isMobile ? 6 : 19 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center leading-none">
            <p className="text-xs m-0 p-0">なやなか</p>
            <p className="text-xs m-0 p-0 -translate-x-8">なやなか</p>
          </div>
        ))}
      </div>
      <div
        id="curtain-desc"
        className="absolute font-secondary bottom-30 flex-col-center w-screen"
      >
        <h3 className="text-jet text-center">
          Making your contribution{" "}
          <span className="md:inline block">
            to innovation and development is a true miracle
          </span>
        </h3>
        <h3 className="text-jet text-center">
          Each of us capable of it. you are invited to participate in
        </h3>
        <h3 className="text-jet text-center">turning dreams into reality</h3>
      </div>
    </div>
  );
};

export default AboutCurtain;
