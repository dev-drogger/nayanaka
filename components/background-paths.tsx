"use client";

import type { RefObject } from "@react-three/fiber/dist/declarations/react-reconciler";

import { useMemo, useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PathData {
  id: number;
  d: string;
  color: string;
  width: number;
  length?: number;
}

const generatePaths = (position: number, pathCount: number): PathData[] => {
  return Array.from({ length: pathCount }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 1 + i * 0.03,
  }));
};

function FloatingPaths({ position }: { position: number }) {
  const pathsRef = useRef<SVGPathElement[]>([]);
  const pathLengthsRef = useRef<Map<number, number>>(new Map());
  gsap.registerPlugin(useGSAP);

  const paths = useMemo(() => generatePaths(position, 30), [position]);

  useGSAP(() => {
    pathsRef.current.forEach((path, i) => {
      if (!path) return;
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

const MemoizedFloatingPaths = memo(FloatingPaths, (prev, next) => {
  return prev.position === next.position;
});

export function BackgroundPaths({ ref }: { ref: RefObject }) {
  return (
    <div
      id="background-path"
      ref={ref}
      className="absolute h-full w-[200vw] -bottom-20 md:bottom-0 md:w-screen scale-200 transform scale-y-[-1]"
    >
      <MemoizedFloatingPaths position={1} />
      <div className="lg:block">
        <MemoizedFloatingPaths position={-1} />
      </div>
    </div>
  );
}
