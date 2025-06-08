import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "framer-motion";

export const useOptimizedAnimation = (options: {
  trigger?: boolean;
  threshold?: number;
  animation?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: options.threshold || 0.1,
  });

  useEffect(() => {
    if (isInView && options.animation) {
      const ctx = gsap.context(options.animation, ref);
      return () => ctx.revert();
    }
  }, [isInView, options.animation]);

  return ref;
};

export const useScrollAnimation = (options: {
  trigger?: boolean;
  threshold?: number;
  animation?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    threshold: options.threshold || 0.1,
  });

  useEffect(() => {
    if (isInView && options.animation) {
      const ctx = gsap.context(options.animation, ref);
      return () => ctx.revert();
    }
  }, [isInView, options.animation]);

  return ref;
};
