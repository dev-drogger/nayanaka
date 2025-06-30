"use client";

import { useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppSelector } from "@/hooks/redux-hooks";
import { ABOUT_TEXT } from "@/constant";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StickyFix() {
  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const animationsRef = useRef<(gsap.core.Timeline | gsap.core.Tween)[]>([]);
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);
  const textContent = useMemo(() => ABOUT_TEXT, []);
  const getH2Elements =
    useCallback((): NodeListOf<HTMLHeadingElement> | null => {
      if (!textRef.current) return null;
      const elements =
        textRef.current.querySelectorAll<HTMLHeadingElement>("h2");
      return elements.length > 0 ? elements : null;
    }, []);

  const h2Elements = getH2Elements();

  useGSAP(() => {
    if (!isContentVisible) return;

    gsap.set(boxRef.current, { scaleX: 1.185, scaleY: 2.5 });
    gsap.set(titleRef.current, { scale: 3, top: -53 });
    gsap.set(h2Elements, {
      y: 20,
      opacity: 0,
    });

    const textEnterAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "center center",
        end: "center+=50 center",
        scrub: 1,
        id: "enter",
        markers: true,
      },
    });

    const textExitAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "center+=450 center",
        end: "center+=500 center",
        scrub: 1,
        id: "exit",
        markers: true,
      },
    });

    h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
      const reverseIndex = h2Elements.length - 1 - index;
      textExitAnimation.to(
        h2,
        {
          y: -20,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        reverseIndex * 0.3
      );
      textEnterAnimation.to(
        h2,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        index * 0.3
      );
    });

    const boxScaleXAnimation = gsap.to(boxRef.current, {
      scaleX: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top+=410 center",
        end: "center-=525 center",
        scrub: 1,
        id: "boxScaleX",
      },
    });

    const boxScaleYAnimation = gsap.to(boxRef.current, {
      scaleY: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top-=120 center",
        end: "center-=590 center",
        scrub: 1,
        id: "boxScaleY",
      },
    });
    const boxExitAnimation = gsap.fromTo(
      boxRef.current,
      { scaleY: 1, scaleX: 1 },
      {
        scaleY: 2.2,
        scaleX: 1.185,
        scrollTrigger: {
          trigger: ".about",
          start: "bottom-=600 center",
          end: "bottom-=555 bottom-=550",
          scrub: 1,
          id: "boxScaleExit",
          markers: true,
        },
      }
    );

    const titleEnterAnimation = gsap.to(titleRef.current, {
      scale: 1,
      top: 130,
      scrollTrigger: {
        trigger: ".about",
        start: "top-=125 center",
        end: "top+=325 center",
        scrub: 1,
      },
    });
    const titleExitAnimation = gsap.fromTo(
      titleRef.current,
      { y: 0, opacity: 1 },
      {
        y: -20,
        opacity: 0,
        scrollTrigger: {
          trigger: ".about",
          start: "top+=425 center",
          end: "top+=455 center",
          scrub: 1,
        },
      }
    );

    animationsRef.current.push(
      textEnterAnimation,
      textExitAnimation,
      boxScaleYAnimation,
      boxScaleXAnimation,
      boxExitAnimation,
      titleEnterAnimation,
      titleExitAnimation
    );

    return () => {
      animationsRef.current.forEach((animation) => {
        if (animation && typeof animation.kill === "function") {
          animation.kill();
        }
      });
      animationsRef.current = [];
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isContentVisible]);

  return (
    <div className="w-screen">
      <div className="relative">
        <div className="about h-[300vh] bg-gray-200 relative">
          <div className="flex-center h-[60vh] bg-gray-200 mb-30">
            <h1
              ref={titleRef}
              className="absolute z-1 text-black text-8xl font-medium"
            >
              ABOUT US
            </h1>
          </div>

          <div
            ref={boxRef}
            className="sticky top-1/2 z-2 -translate-y-1/2 bg-jet text-white p-8 text-center font-bold text-xl h-[65vh] max-w-screen mx-20"
          ></div>
          <div
            ref={textRef}
            className="sticky z-3 mx-36 top-1/2 -translate-y-1/2 uppercase "
          >
            {textContent.map((text, index) => (
              <h2 key={index} className="font-medium">
                {text}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
