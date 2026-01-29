"use client";

import { useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ABOUT_TEXT } from "@/constant";

gsap.registerPlugin(useGSAP);

export default function About() {
  const boxRef = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textContent = useMemo(() => ABOUT_TEXT, []);

  const getH2Elements =
    useCallback((): NodeListOf<HTMLHeadingElement> | null => {
      if (!textRef.current) return null;
      const elements =
        textRef.current.querySelectorAll<HTMLHeadingElement>("h2");
      return elements.length > 0 ? elements : null;
    }, []);

  useGSAP(() => {
    const h2Elements = getH2Elements();
    if (!h2Elements) return;

    gsap.set(h2Elements, {
      y: 20,
      opacity: 0,
    });

    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top+=395 center",
        end: "center+=1200 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        id: "pin",
      },
    });

    gsap.set(boxRef2.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    gsap.to(boxRef2.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
      ease: "power4.out",
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center center",
        end: "+=300 center",
        scrub: 0.5,
        markers: true,
        id: "firstpath",
      },
    });

    gsap.to(boxRef2.current, {
      scale: 0.7,
      ease: "power4.out",
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center+=300 center",
        end: "bottom+=200 center",
        scrub: 0.5,
        id: "boxScaleYsecond",
      },
    });

    gsap.to(boxRef2.current, {
      clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
      immediateRender: false,
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center+=900 center",
        end: "+=490",
        scrub: 0.5,
      },
    });

    gsap.from(titleRef.current, {
      scale: 3,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "center center",
        end: "+=200 center",
        scrub: 0.5,
      },
    });

    gsap.fromTo(
      titleRef.current,
      { y: 0 },
      {
        y: -600,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "center+=200 center",
          end: "+=125",
          scrub: 0.5,
          id: "scalePhase2",
        },
      },
    );

    const textEnterAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "center+=485 center",
        end: "+=200",
        scrub: 0.5,
        id: "h2Enter",
        fastScrollEnd: true,
        preventOverlaps: "textSequence",
      },
    });

    const textExitAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "center+=625 center",
        end: "+=475",
        scrub: 0.5,
        id: "h2Exit",
        fastScrollEnd: true,
        preventOverlaps: "textSequence",
      },
    });

    h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
      const reverseIndex = h2Elements.length - 1 - index;

      textEnterAnimation.to(
        h2,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          immediateRender: false,
        },
        index * 0.3,
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
        reverseIndex * 0.3,
      );
    });
  }, []);

  return (
    <section ref={boxRef} className="about h-[150vh] relative bg-jet py-0">
      <div
        ref={boxRef2}
        className="about min-h-screen relative bg-gray-200 flex-center"
      >
        <h1 ref={titleRef} className="text-jet text-8xl font-medium absolute">
          ABOUT
        </h1>

        <div ref={textRef} className="">
          {textContent.map((text, index) => (
            <h2
              key={index}
              className="uppercase font-medium text-justify text-jet text-6xl leading-20"
            >
              {text}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
