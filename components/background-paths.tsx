"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function FloatingPaths({ position }: { position: number }) {
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);
  const pathsRef = useRef<SVGPathElement[]>([]);
  gsap.registerPlugin(useGSAP);

  const paths = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
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
  }, [position]);

  useGSAP(() => {
    pathsRef.current.forEach((path, i) => {
      const length = path.getTotalLength();

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
  }, [isContentVisible]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
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

export function BackgroundPaths({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative size-full bg-gray-200 z-3 flex items-center justify-center overflow-hidden">
      <div className=" absolute -bottom-60 inset-0 w-[200vw] lg:w-screen scale-200 transform scale-y-[-1]">
        <FloatingPaths position={1} />
        <div className="lg:block">
          <FloatingPaths position={-1} />
        </div>
      </div>

      <div className="flex-col-center lg:flex-row-center lg:gap-0 w-full">
        {children}
      </div>
    </div>
  );
}
