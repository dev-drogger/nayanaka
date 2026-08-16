"use no memo";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const useProjectAnimation = () => {
  const imageContainerRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement[]>([]);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]); // store ALL timelines

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = [];
      timelinesRef.current = []; // reset on each run

      imageContainerRef.current.forEach((container, index) => {
        const image = imageRef.current[index];
        if (!image) return;

        gsap.set(container, { y: 100, opacity: 0, force3D: true });
        gsap.set(image, {
          scale: 1.5,
          transformOrigin: "center center",
          force3D: true,
        });

        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "top center",
              end: "bottom top",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            container,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "circ.out",
              force3D: true,
            },
          )
          .fromTo(
            image,
            { scale: 1.5 },
            { scale: 1, duration: 1.2, ease: "circ.out", force3D: true },
            0,
          );

        timelinesRef.current.push(tl); // store every timeline

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      });

      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 200,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const refreshTimer = requestAnimationFrame(() =>
        requestAnimationFrame(() => ScrollTrigger.refresh()),
      );

      return () => {
        cancelAnimationFrame(refreshTimer);
        timelinesRef.current.forEach((tl) => tl.kill()); // kill ALL timelines
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [], scope: imageContainerRef },
  );

  return { imageContainerRef, imageRef };
};

export default useProjectAnimation;
