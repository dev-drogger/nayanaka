"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const HeroGraphic = ({ timeline }: { timeline: gsap.core.Timeline }) => {
  const dispatch = useAppDispatch();
  const el = useRef(null);

  useGSAP(() => {
    if (timeline) {
      timeline.from(el.current, {
        y: 100,
        opacity: 0,
        ease: "power2.out",
      });
    }
  }, [timeline]);

  return (
    <div className="col-span-12 lg:col-span-5 relative" ref={el}>
      <div
        className="aspect-square overflow-hidden"
        onMouseEnter={() => dispatch(setCursorType("3d"))}
        onMouseLeave={() => dispatch(setCursorType("default"))}
      >
        <Image
          src="/placeholder.svg?height=800&width=800"
          alt="Creative visual"
          width={800}
          height={800}
          className="object-cover h-full w-full"
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={85}
        />
      </div>

      <div
        className="absolute -bottom-16 z-6 right-0 bg-white text-black p-6 max-w-xs"
        onMouseEnter={() => dispatch(setCursorType("text"))}
        onMouseLeave={() => dispatch(setCursorType("default"))}
      >
        <p className="text-sm text-black">
          Nayanaka is a creative agency founded in 2025, specializing in 3D web
          design and development.
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
  );
};
