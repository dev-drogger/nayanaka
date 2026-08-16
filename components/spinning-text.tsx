"use client";

import { cn } from "@/lib/utils";
import React, { CSSProperties, useRef } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

type SpinningTextProps = {
  children: string;
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
  ease?: string;
};

export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  fontSize = 1,
  radius = 5,
  ease = "none",
}: SpinningTextProps) {
  const letters = children.split("");
  const totalLetters = letters.length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { rotate: 0 });
      gsap.to(el, {
        rotate: reverse ? -360 : 360,
        duration,
        ease,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [duration, reverse, ease]);

  return (
    <div ref={containerRef} className={cn("relative", className)} style={style}>
      {letters.map((letter, index) => (
        <span
          aria-hidden="true"
          key={`${index}-${letter}`}
          className="absolute left-1/2 top-1/2 inline-block"
          style={
            {
              "--index": index,
              "--total": totalLetters,
              "--font-size": fontSize,
              "--radius": radius,
              fontSize: `calc(var(--font-size, 2) * 1rem)`,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center",
            } as React.CSSProperties
          }
        >
          {letter}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </div>
  );
}
