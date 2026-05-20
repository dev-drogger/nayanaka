import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const useProjectAnimation = () => {
  const imageContainerRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement[]>([]);
  const imageTimeline = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = []; // Store triggers created in this component

      imageContainerRef.current.forEach((container, index) => {
        const image = imageRef.current[index];
        if (!image) return;

        gsap.set(container, {
          y: 100,
          opacity: 0,
          force3D: true,
        });

        gsap.set(image, {
          scale: 1.5,
          transformOrigin: "center center",
          force3D: true,
        });

        imageTimeline.current = gsap
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
            {
              y: 100,
              opacity: 0,
            },
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
            {
              scale: 1.5,
            },
            {
              scale: 1,
              duration: 1.2,
              ease: "circ.out",
              force3D: true,
            },
            0,
          );

        // Store the ScrollTrigger instance
        if (imageTimeline.current.scrollTrigger) {
          triggers.push(imageTimeline.current.scrollTrigger);
        }
      });

      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 200,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const refreshTimer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      return () => {
        cancelAnimationFrame(refreshTimer);
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [], scope: imageContainerRef },
  );

  return { imageContainerRef, imageRef };
};

export default useProjectAnimation;
