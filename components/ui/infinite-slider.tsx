"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import useMeasure from "react-use-measure";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [measureRef, { width, height }] = useMeasure();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<any>(null);

  useGSAP(() => {
    const size = direction === "horizontal" ? width : height;
    const track = trackRef.current;
    if (!size || !track) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const distance = (size + gap) / 2;
    const wrap = gsap.utils.wrap(-distance, 0);
    const timelineRef = gsap.timeline({
      scrollTrigger: {
        trigger: "#slider",
        onLeave: () => timelineRef.pause(),
        onEnterBack: () => timelineRef.resume(),
      },
    });

    const ctx = gsap.context(() => {
      tweenRef.current = timelineRef.fromTo(
        track,
        { [axis]: reverse ? -distance : 0 },
        {
          [axis]: reverse ? 0 : -distance,
          duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            [axis]: (value: string) => `${wrap(parseFloat(value))}px`,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [width, height, gap, duration, direction, reverse]);

  const handleHoverStart = () => {
    if (!durationOnHover || !tweenRef.current) return;
    gsap.to(tweenRef.current, {
      timeScale: duration / durationOnHover,
      duration: 0.4,
      ease: "power1.out",
      overwrite: true,
    });
  };

  const handleHoverEnd = () => {
    if (!durationOnHover || !tweenRef.current) return;
    gsap.to(tweenRef.current, {
      timeScale: 1,
      duration: 0.4,
      ease: "power1.out",
      overwrite: true,
    });
  };

  return (
    <div id="slider" className={cn("overflow-hidden", className)}>
      <div
        ref={(node) => {
          measureRef(node);
          trackRef.current = node;
        }}
        className="flex w-max"
        style={{
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
