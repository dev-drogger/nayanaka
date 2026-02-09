"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export default function HeroTitle({
  timeline,
}: {
  timeline: gsap.core.Timeline;
}) {
  const el = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (!el.current || !timeline) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(el.current!, {
          type: "lines, chars",
          mask: "lines",
        });

        timeline.from(split.lines, {
          duration: 0.6,
          y: 20,
          autoAlpha: 0,
          stagger: 0.05,
        });
      });
    },
    { dependencies: [timeline], scope: el },
  );

  return (
    <div className="col-span-12 lg:col-span-8 flex-center">
      <div className="flex-col flex">
        <h1
          ref={el}
          className="text-4xl lg:text-6xl uppercase font-bold text-black"
        >
          blend art
          <br />
          and technology
          <br />
          into digital aesthetic
        </h1>
      </div>
    </div>
  );
}
