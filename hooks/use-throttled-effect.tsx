"use client";

import type React from "react";

import { useEffect, useRef } from "react";

/**
 * A custom hook that provides throttled effect execution
 * @param callback The function to execute on the throttled interval
 * @param delay The delay in milliseconds between executions
 * @param deps The dependencies array for the effect
 */
export function useThrottledEffect(
  callback: () => void,
  delay: number,
  deps: React.DependencyList = []
) {
  const lastRun = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const execute = () => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback();
        lastRun.current = now;
      } else if (timeoutRef.current === null) {
        const remaining = delay - (now - lastRun.current);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          execute();
        }, remaining);
      }
    };

    execute();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
