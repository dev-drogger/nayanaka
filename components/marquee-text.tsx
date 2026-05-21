"use client";

import { useRef, type FC } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export const InfiniteTextMarquee: FC<InfiniteTextMarqueeProps> = ({
  text = "PROJECTS",
  link = "/components",
  speed = 30,
  fontSize = "5rem",
  textColor = "text-champagne",
  hoverColor = "",
  direction = "horizontal",
  className = "",
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const isVertical = direction === "vertical";
  const repeatedText =
    Array(10)
      .fill(text)
      .join(isVertical ? "\n" : " - ") + (isVertical ? "" : " -");

  // Marquee animation
  useGSAP(() => {
    const el = marqueeRef.current;
    if (!el) return;

    tweenRef.current?.kill();

    if (isVertical) {
      gsap.set(el, { y: 0 });
      tweenRef.current = gsap.to(el, {
        y: "-=1000",
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y) => parseFloat(y) % 1000),
        },
      });
    } else {
      gsap.set(el, { x: 0 });
      tweenRef.current = gsap.to(el, {
        x: "-=1000",
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % 1000),
        },
      });
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, isVertical]);

  const spanStyle = {
    fontSize,
    ...(isVertical && {
      writingMode: "vertical-rl" as const,
      textOrientation: "mixed" as const,
    }),
    color: textColor || undefined,
  };

  const spanClass = `marquee-item block cursor-pointer font-bold tracking-tight py-4 m-0`;

  return (
    <>
      {hoverColor && (
        <style>{`.marquee-item:hover { color: ${hoverColor} !important; }`}</style>
      )}

      <div
        className={`relative overflow-hidden ${
          isVertical ? "h-full w-fit" : "w-full"
        } ${className}`}
      >
        <div
          ref={marqueeRef}
          className={isVertical ? "flex flex-col gap-8" : "whitespace-nowrap"}
        >
          {isVertical ? (
            Array(20)
              .fill(text)
              .map((item, i) => (
                // <Link href={link} key={i}>
                //   <span className={spanClass} style={spanStyle}>
                //     {item}
                //   </span>
                // </Link>
                <div key={i} className="bg-black w-10 h-10" />
              ))
          ) : (
            <Link href={link}>
              <span className={spanClass} style={spanStyle}>
                {repeatedText}
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
