"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * A custom hook that provides a callback executed in requestAnimationFrame
 * for smooth animations and performance optimization
 *
 * @param callback The function to execute on each animation frame
 * @param active Whether the animation loop is active
 */
export function useRafCallback(callback: () => void, active = true) {
  const rafId = useRef<number | null>(null);
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the animation loop
  const startAnimationLoop = useCallback(() => {
    if (!active) return;

    const tick = () => {
      savedCallback.current();
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [active]);

  // Start and stop the animation loop based on active state
  useEffect(() => {
    const cleanup = startAnimationLoop();
    return cleanup;
  }, [startAnimationLoop]);

  // Provide a way to manually stop the animation
  const cancelRaf = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  return cancelRaf;
}
