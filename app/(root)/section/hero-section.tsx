"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { useRef } from "react";
import { BackgroundPaths } from "@/components/background-paths";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function Hero() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const videoRef = useRef(null);
  const descRef = useRef(null);
  const heroTitle = useRef(null);
  const scrollTimeline = useRef<gsap.core.Timeline>(null);
  const dispatch = useAppDispatch();

  useGSAP(() => {
    gsap.set("#hero", {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    const split = new SplitText(heroTitle.current!, {
      type: "lines, chars",
      mask: "lines",
    });

    const heroTimeline = gsap.timeline();

    heroTimeline
      .fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(
        "#hero",
        { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
        {
          clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
          duration: 2,
          ease: "power4.out",
        },
      )
      .fromTo(
        split.lines,
        { y: 20, autoAlpha: 0 },
        {
          duration: 0.6,
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
        },
      )
      .fromTo(
        videoRef.current,
        { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: 1,
          ease: "power4.out",
        },
      )
      .fromTo(
        descRef.current,
        { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: 1,
          ease: "power4.out",
        },
        "<+=0.2",
      )
      .to("#hero", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(split.chars, {
        y: -75,
        opacity: 0,
        immediateRender: false,
        force3D: true,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(pathRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(videoRef.current, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=650 top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(descRef.current, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "+=200",
          scrub: 0.5,
        },
      });

    scrollTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 0.5,
        pin: true,
      },
    });

    return () => {
      scrollTimeline.current?.ScrollTrigger.kill();
      heroTimeline.scrollTrigger?.kill();
      heroTimeline.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative size-screen py-0 bg-jet z-2 opacity-0"
    >
      <div className="h-full z-2 flex-center relative w-screen bg-gray-200 overflow-hidden">
        <BackgroundPaths ref={pathRef} />
        <div className="md:size-full z-10 grid grid-cols-12 py-32 container mx-auto">
          <div className="col-span-12 lg:col-span-7 flex-center">
            <div className="flex-col flex">
              <h1
                ref={heroTitle}
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

          <div className="col-span-12 lg:col-span-5 relative flex-center">
            <div
              ref={videoRef}
              className="overflow-hidden w-[80%] h-[80%]"
              onMouseEnter={() => dispatch(setCursorType("3d"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <video
                src="/heroes2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover z-1"
              />
            </div>

            <div
              ref={descRef}
              className="absolute -bottom-2 z-6 right-0 bg-white text-black p-6 max-w-xs"
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <p className="text-sm text-black">
                Nayanaka is a creative agency founded in 2025, specializing in
                3D web design and development.
              </p>
              <div className="mt-4 flex justify-end">
                <Link
                  href="#about"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest"
                  onMouseEnter={() => dispatch(setCursorType("link"))}
                  onMouseLeave={() => dispatch(setCursorType("text"))}
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          {/* <HeroGraphic timeline={timeline} /> */}
        </div>
      </div>
    </section>
  );
}
