"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale" | "custom";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  customAnimation?: () => void;
}

export const AnimatedElement = ({
  children,
  animation = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.1,
  customAnimation,
}: AnimatedElementProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold,
  });

  useEffect(() => {
    if (isInView && customAnimation) {
      const ctx = gsap.context(customAnimation, ref);
      return () => ctx.revert();
    }
  }, [isInView, customAnimation]);

  const getInitialState = () => {
    switch (animation) {
      case "fade":
        return { opacity: 0 };
      case "slide":
        return {
          opacity: 0,
          x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
          y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
        };
      case "scale":
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateState = () => {
    switch (animation) {
      case "fade":
        return { opacity: 1 };
      case "slide":
        return {
          opacity: 1,
          x: 0,
          y: 0,
        };
      case "scale":
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
