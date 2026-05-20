import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const useAboutAnimation = () => {
  const backgroundTimeline = useRef<gsap.core.Timeline>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const assetRef = useRef<HTMLDivElement>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textEnterTimeline = useRef<gsap.core.Timeline>(null);
  const textExitTimeline = useRef<gsap.core.Timeline>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | undefined>(undefined);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (context) => {
        const { isMobile, isDesktop } = context.conditions as {
          isMobile: boolean;
          isDesktop: boolean;
        };

        const h2Elements = isMobile
          ? mobileTextRef.current?.querySelectorAll<HTMLHeadingElement>("h3")
          : textRef.current?.querySelectorAll<HTMLHeadingElement>("h2");

        if (!h2Elements || !h2Elements.length) return;
        if (!h2Elements) return;

        gsap.set(h2Elements, {
          y: 20,
          opacity: 0,
        });

        gsap.set(backgroundRef.current, {
          clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
        });
        backgroundTimeline.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionPinRef.current,
              start: "center center",
              end: "center+=3750 center",
              scrub: 0.5,
              pin: true,
            },
          })
          .to(backgroundRef.current, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
            duration: 1.2,
            delay: 0.4,
          })
          .from(
            titleRef.current,
            {
              scale: isMobile ? 1.5 : 2.8,
              duration: 1,
            },
            "<",
          )
          .to("#curtain", { opacity: 0, duration: 1 }, "<")
          .to(titleRef.current, {
            opacity: 0,
            delay: 2,
            duration: 0.5,
          })
          .to(assetRef.current, { opacity: 0, duration: 0.5 }, "<");

        // Add a label here to mark where scale animation should start
        backgroundTimeline.current.addLabel("scaleStart");

        backgroundTimeline.current.to(backgroundRef.current, {
          scaleX: isMobile ? 0.8 : 0.7,
          duration: 2,
          delay: 0.3,
          scaleY: isMobile ? 0.3 : 0.7,
        });

        // Add label after scale completes
        backgroundTimeline.current.addLabel("textEnterStart");

        // Create enter timeline
        textEnterTimeline.current = gsap.timeline();
        h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
          textEnterTimeline.current!.to(
            h2,
            {
              y: 0,
              opacity: 1,
              duration: 1,
              immediateRender: false,
            },
            index * 0.3,
          );
        });

        // Add enter timeline
        backgroundTimeline.current.add(
          textEnterTimeline.current,
          "textEnterStart",
        );

        // Add label for exit animations
        backgroundTimeline.current.addLabel("textExitStart", "+=3.5");

        // Create exit timeline
        textExitTimeline.current = gsap.timeline();
        h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
          const reverseIndex = h2Elements.length - 1 - index;
          textExitTimeline.current!.fromTo(
            h2,
            { y: 0, opacity: 1 },
            {
              y: -20,
              opacity: 0,
              duration: 1,
              immediateRender: false,
            },
            reverseIndex * 0.3,
          );
        });

        // Add exit timeline
        backgroundTimeline.current.add(
          textExitTimeline.current,
          "textExitStart",
        );

        backgroundTimeline.current.to(
          backgroundRef.current,
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
            immediateRender: false,
            duration: 1.5,
          },
          "<+=1.5",
        );

        scrollTriggerRef.current = backgroundTimeline.current.scrollTrigger;
      },
    );

    return () => {
      if (textEnterTimeline.current) {
        textEnterTimeline.current.kill();
      }
      if (textExitTimeline.current) {
        textExitTimeline.current.kill();
      }
      if (backgroundTimeline.current) {
        backgroundTimeline.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      // Clear refs
      backgroundTimeline.current = null;
      textEnterTimeline.current = null;
      textExitTimeline.current = null;
      scrollTriggerRef.current = undefined;
    };
  }, []);

  return {
    backgroundRef,
    sectionPinRef,
    titleRef,
    assetRef,
    mobileTextRef,
    textRef,
  };
};

export default useAboutAnimation;
