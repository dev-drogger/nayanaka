"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { BackgroundPaths } from "@/components/background-paths";
import useHeroAnimation from "@/hooks/animation/use-hero-animation";

export default function Hero() {
  const { sectionRef, pathRef, videoRef, descRef, heroTitle, letterBoxRef } =
    useHeroAnimation();
  const dispatch = useAppDispatch();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative size-screen py-0 bg-jet z-2"
      style={{ opacity: 0 }}
    >
      <div
        id="hero-overlay"
        ref={letterBoxRef}
        style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" }}
        className="hero-clip size-full bg-jet z-20"
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
                  src="/heroes2.webm"
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
          </div>
        </div>
      </div>
    </section>
  );
}
