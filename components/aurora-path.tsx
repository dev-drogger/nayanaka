"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      // Create a base hue for this path
      const baseHue = (210 + i * 10) % 360;

      return {
        id: i,
        // Modified path to create aurora-like flowing effect
        d: `M${-100 + i * 40} ${50 + i * 5}
           C${100 + i * 20} ${30 + i * 8 * Math.sin(i * 0.2) * position} 
           ${300 + i * 15} ${80 + i * 6 * Math.cos(i * 0.3) * position} 
           ${500 + i * 25} ${50 + i * 7 * Math.sin(i * 0.4) * position}
           C${650 + i * 10} ${120 + i * 5 * Math.sin(i * 0.5) * position} 
           ${750 - i * 15} ${180 + i * 4 * Math.cos(i * 0.3) * position} 
           ${800 + i * 5} ${250 + i * 6}`,
        // Aurora-like colors
        color: `hsl(${baseHue}, 80%, ${60 + i}%)`,
        width: 3 + i * 0.5,
        opacity: 0.2 + i * 0.04,
      };
    });
  }, [position]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 800 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="aurora-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g filter="url(#aurora-glow)">
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke={path.color}
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, path.opacity, path.opacity * 0.7, path.opacity],
                pathOffset: [0, 0.2 * Math.random()],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 8,
              }}
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

export function BackgroundPaths({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <FloatingPaths position={1} />
        <div className="hidden md:block">
          <FloatingPaths position={-1} />
        </div>
      </div>
      <div className="flex-col-center md:flex-row-center md:gap-0 w-full relative z-10">
        {children}
      </div>
    </div>
  );
}
