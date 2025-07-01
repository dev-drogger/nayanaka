"use client";

import { useRef, useCallback, useMemo, useEffect } from "react";
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

  useEffect(() => {
    ScrollTrigger.refresh();
  });

  useGSAP(() => {
    if (!isContentVisible) return;

    // gsap.set(titleRef.current, { scale: 3, top: -50 });
    gsap.set(boxRef.current, { scaleX: 1.13, scaleY: 2.5 });

    gsap.set(h2Elements, {
      y: 20,
      opacity: 0,
    });

    const textExitAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "center+=450 center",
        end: "center+=500 center",
        scrub: 1,
        id: "exit",
      },
    });
    const textEnterAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "center center",
        end: "center+=50 center",
        scrub: 1,
        id: "enter",
      },
    });
    const boxScaleAnimation = gsap.timeline();
    const titleAnimation = gsap.timeline();

    h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
      const reverseIndex = h2Elements.length - 1 - index;

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

      textExitAnimation.fromTo(
        h2,
        { y: 0, opacity: 1 },
        {
          y: -20,
          opacity: 0,
          duration: 1,
          ease: "power2.in",
          immediateRender: false,
        },
        reverseIndex * 0.3
      );
    });

    boxScaleAnimation.to(boxRef.current, {
      scaleY: 1,
      scrollTrigger: {
        trigger: ".about",
        start: "top-=120 center",
        end: "center-=590 center",
        scrub: 1,
        id: "boxScaleY",
      },
    });

    boxScaleAnimation.fromTo(
      boxRef.current,
      { scaleX: 1 },
      {
        scaleX: 0.85,
        immediateRender: false,
        scrollTrigger: {
          trigger: ".about",
          start: "top+=410 center",
          end: "center-=525 center",
          scrub: 1,
          id: "boxScaleX",
        },
      }
    );

    boxScaleAnimation.fromTo(
      boxRef.current,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: "top center",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".about",
          start: "bottom-=600 center",
          end: "bottom-=555 bottom-=550",
          scrub: 1,
          id: "boxScaleExit",
        },
      }
    );

    titleAnimation
      .from(titleRef.current, {
        scale: 3,
        y: -395,
        scrollTrigger: {
          trigger: ".about",
          start: "top-=125 center",
          end: "top+=415 center",
          scrub: 0.5,
        },
      })
      .fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        {
          y: -20,
          opacity: 0,
          immediateRender: false,
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
      boxScaleAnimation,
      titleAnimation
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
        <div className="about h-[300vh] relative">
          <div className="relative flex-center h-[60vh] bg-cardinal mb-30">
            <h1
              ref={titleRef}
              className="absolute top-40 z-1 text-black text-8xl font-medium"
            >
              ABOUT US
            </h1>
          </div>

          <div
            ref={boxRef}
            className="sticky z-2 top-1/2 -translate-y-1/2 bg-jet text-white p-8 text-center font-bold text-xl h-[65vh] min-w-screen"
          ></div>
          <div
            ref={textRef}
            className="sticky z-3 top-1/2 left-[10.5%] -translate-y-1/2 w-fit uppercase text-justify"
          >
            {textContent.map((text, index) => (
              <h2 key={index} className="font-medium text-justify">
                {text}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
