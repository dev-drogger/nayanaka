"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  text: string;
  duration?: number;
  staggerDuration?: number;
  ease?: string;
  className?: string;
  charClassName?: string;
  splitBy?: "characters" | "words";
}

export function TextRotate({
  text,
  duration = 0.8,
  staggerDuration = 0.5,
  ease = "back.out",
  className,
  charClassName,
  splitBy = "characters",
}: TextRotateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll("[data-char]");
    if (!chars.length) return;

    // Set initial state
    gsap.set(chars, {
      y: "100%",
      opacity: 0,
    });

    // Animate in with stagger
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration,
      stagger: staggerDuration / chars.length,
      ease,
    });
  }, [text, duration, staggerDuration, ease]);

  const elements = splitBy === "words" ? text.split(" ") : text.split("");

  return (
    <div
      ref={containerRef}
      className={cn("inline-flex flex-wrap gap-1", className)}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          data-char
          className={cn("inline-block", charClassName)}
        >
          {element}
        </span>
      ))}
    </div>
  );
}
