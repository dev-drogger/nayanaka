"use client";

import React from "react";

import { useMemo, useRef, useCallback, memo } from "react";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PathData {
  id: number;
  d: string;
  color: string;
  width: number;
  length?: number;
}

// Memoized path generation to prevent recalculation
const generatePaths = (position: number, pathCount: number): PathData[] => {
  return Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 1 + i * 0.03,
  }));
};

function FloatingPaths({ position }: { position: number }) {
  // const { isContentVisible } = useAppSelector((state) => state.contentVisible);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const pathLengthsRef = useRef<Map<number, number>>(new Map());
  gsap.registerPlugin(useGSAP);

  // Memoize paths - restore full 30 paths for visual continuity
  const paths = useMemo(() => generatePaths(position, 30), [position]);

  // Stable animation setup with path length caching
  useGSAP(() => {
    pathsRef.current.forEach((path, i) => {
      if (!path) return;

      // Cache path length to avoid repeated DOM queries
      let length = pathLengthsRef.current.get(i);
      if (!length) {
        length = path.getTotalLength();
        pathLengthsRef.current.set(i, length);
      }

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length * 0.7,
        opacity: 0.6,
      });

      gsap.to(path, {
        keyframes: [
          {
            strokeDashoffset: 0,
            opacity: 0.6,
            ease: "power1.inOut",
          },
          {
            strokeDashoffset: length,
            opacity: 0.3,
            ease: "power1.inOut",
          },
          {
            strokeDashoffset: 0,
            opacity: 0.6,
            ease: "power2.inOut",
          },
        ],
        opacity: 0.3,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        delay: 0.8 + i * 0.15,
      });
    });

    return () => {
      pathsRef.current.forEach((path) => gsap.killTweensOf(path));
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path, i) => (
          <path
            key={path.id}
            ref={(el) => {
              if (el) pathsRef.current[i] = el;
            }}
            d={path.d}
            stroke="#cfae70"
            strokeWidth={path.width}
            strokeOpacity={0.8 + path.id * 0.03}
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}

// Memoize FloatingPaths to prevent re-renders from parent
const MemoizedFloatingPaths = memo(FloatingPaths, (prev, next) => {
  // Only re-render if position actually changes
  return prev.position === next.position;
});

export function BackgroundPaths({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="background-path"
      className="absolute h-full scale-200 w-screen transform scale-y-[-1]"
    >
      <MemoizedFloatingPaths position={1} />
      <div className="lg:block">
        <MemoizedFloatingPaths position={-1} />
      </div>
    </div>
  );
}
