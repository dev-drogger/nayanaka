"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function FloatingPaths({ position }: { position: number }) {
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

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#cfae70"
            strokeWidth={path.width}
            strokeOpacity={0.8 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 2,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export function BackgroundPaths({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className=" absolute -bottom-60 inset-0 w-[200vw] md:w-screen bg-jet transform scale-y-[-1]">
        <FloatingPaths position={1} />
        <div className="hidden md:block">
          <FloatingPaths position={-1} />
        </div>
      </div>

      <div className="flex-col-center md:flex-row-center md:gap-0 w-full">
        {children}
      </div>
    </div>
  );
}
