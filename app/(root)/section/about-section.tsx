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
        end: "center+=2700 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: true,
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
        end: "+=600 center",
        scrub: 0.5,
        markers: true,
        id: "clip from center",
      },
    });

    gsap.to(boxRef2.current, {
      scale: 0.7,
      ease: "power4.out",
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center+=600 center",
        end: "bottom+=500 center",
        scrub: 0.5,
        markers: true,
        id: "box scaling down",
      },
    });

    gsap.to(boxRef2.current, {
      clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
      immediateRender: false,
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center+=1700 center",
        end: "+=900",
        scrub: 0.5,
        markers: true,
        id: "box swipe up",
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "center center",
          end: "+=400 center",
          scrub: 0.5,
          markers: true,
          id: "title scaled down",
        },
      })
      .from(titleRef.current, {
        scale: 3,
      })
      .to("#background", { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "center+=550 center",
          end: "center+=580 center",
          scrub: 0.5,
          markers: true,
          id: "title scaled down",
        },
      })
      .to(titleRef.current, {
        opacity: 0,
      });

    const textEnterAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "center+=885 center",
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
        start: "center+=1425 center",
        end: "+=800",
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
    <section
      ref={boxRef}
      className="about h-screen overflow-x-hidden relative bg-gray-200 py-0"
    >
      <div id="background">
        <div className="absolute top-20 w-screen flex-center">
          <h1 className="text-jet font-amie italic">introducing</h1>
        </div>
        <div className="absolute px-40 top-40 w-screen flex flex-col items-center justify-center">
          <h1 className="text-jet text-9xl font-medium uppercase">Nayanaka</h1>
          <h1 className="text-jet font-amie tracking-widest uppercase">
            Creative Studio
          </h1>
        </div>

        <div className="bg-jet w-screen flex gap-8 whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden">
          {Array.from({ length: 22 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center leading-none"
            >
              <p className="text-xs m-0 p-0">なやなか</p>
              <p className="text-xs m-0 p-0 -translate-x-8">なやなか</p>
            </div>
          ))}
        </div>
        <div className="absolute font-secondary bottom-30 flex-col-center w-screen">
          <h3 className="text-jet">
            Making your contribution to innovation and development is a true
            miracle
          </h3>
          <h3 className="text-jet">
            Each of us capable of it. you are invited to participate in
          </h3>
          <h3 className="text-jet">turning dreams into reality</h3>
        </div>
      </div>

      <div
        ref={boxRef2}
        className="about min-h-screen relative bg-jet flex-center"
      >
        <h1 ref={titleRef} className="text-white text-9xl font-medium absolute">
          about <span className="font-amie italic">us</span>
        </h1>

        <div ref={textRef} className="">
          {textContent.map((text, index) => (
            <h2
              key={index}
              className="uppercase font-medium text-justify text-white text-6xl leading-20"
            >
              {text}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
