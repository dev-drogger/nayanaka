import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapInView(callback: () => void, options = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      once: true,
      onEnter: callback,
      ...options,
    });
  }, [callback, options]);

  return ref;
}
