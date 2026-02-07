"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

type PresetType = "blur" | "shake" | "scale" | "fade" | "slide";

type TextEffectProps = {
  children: string;
  per?: "word" | "char" | "line";
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
  duration?: number;
};

const defaultStaggerTimes: Record<"char" | "word" | "line", number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const presetAnimations: Record<
  PresetType,
  {
    from: gsap.TweenVars;
    to: gsap.TweenVars;
  }
> = {
  blur: {
    from: { opacity: 0, filter: "blur(12px)" },
    to: { opacity: 1, filter: "blur(0px)", ease: "power2.out" },
  },
  shake: {
    from: { x: 0 },
    to: {
      keyframes: {
        x: [-5, 5, -5, 5, 0],
        ease: "power1.inOut",
      },
      duration: 0.5,
    },
  },
  scale: {
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1, ease: "back.out(1.7)" },
  },
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1, ease: "power2.out" },
  },
  slide: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, ease: "power2.out" },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  per: "line" | "word" | "char";
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, per, segmentWrapperClassName }) => {
  const content =
    per === "line" ? (
      <span className="block segment-item">{segment}</span>
    ) : per === "word" ? (
      <span
        aria-hidden="true"
        className="inline-block whitespace-pre segment-item"
      >
        {segment}
      </span>
    ) : (
      <span className="inline-block whitespace-pre">
        {segment.split("").map((char, charIndex) => (
          <span
            key={`char-${charIndex}`}
            aria-hidden="true"
            className="inline-block whitespace-pre segment-item"
          >
            {char}
          </span>
        ))}
      </span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === "line" ? "block" : "inline-block";

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = "AnimationComponent";

export function TextEffect({
  children,
  per = "word",
  as = "p",
  className,
  preset = "fade",
  delay = 0,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
  duration = 0.6,
}: TextEffectProps) {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  let segments: string[];

  if (per === "line") {
    segments = children.split("\n");
  } else if (per === "word") {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split("");
  }

  const Tag = as as keyof JSX.IntrinsicElements;
  const ariaLabel = per === "line" ? undefined : children;
  const stagger = defaultStaggerTimes[per];
  const animation = presetAnimations[preset];

  useGSAP(() => {
    if (!containerRef.current || !trigger) return;

    const items = containerRef.current.querySelectorAll(".segment-item");

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create new timeline
    const tl = gsap.timeline({
      delay,
      onComplete: onAnimationComplete,
    });

    // Set initial state
    gsap.set(items, animation.from);

    // Animate with stagger
    tl.to(items, {
      ...animation.to,
      duration,
      stagger,
    });

    timelineRef.current = tl;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [trigger, delay, preset, duration, stagger, onAnimationComplete]);

  // Handle exit animation when trigger becomes false
  useGSAP(() => {
    if (!containerRef.current || trigger) return;

    const items = containerRef.current.querySelectorAll(".segment-item");

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();

    tl.to(items, {
      ...animation.from,
      duration: duration * 0.5,
      stagger: stagger * 0.5,
    });

    timelineRef.current = tl;
  }, [trigger, duration, stagger, preset]);

  if (!trigger) {
    return null;
  }

  return (
    <Tag
      ref={containerRef}
      aria-label={ariaLabel}
      className={cn("whitespace-pre-wrap", className)}
    >
      {segments.map((segment, index) => (
        <AnimationComponent
          key={`${per}-${index}-${segment}`}
          segment={segment}
          per={per}
          segmentWrapperClassName={segmentWrapperClassName}
        />
      ))}
    </Tag>
  );
}
