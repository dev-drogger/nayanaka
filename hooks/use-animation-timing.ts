import { useRef, useCallback, useEffect } from "react";
import { useUI } from "@/context/ui-context";

export default function useAnimationTiming(minimumLoadTime?: number) {
  const { setPageMounted, setLoading, setContentVisible } = useUI();
  const lastUpdateTime = useRef(Date.now());
  const childrenRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const handleFullyLoaded = useCallback(() => {
    const timeElapsed = Date.now() - lastUpdateTime.current;
    const safeMinimumLoadTime = minimumLoadTime ?? 0;
    const remainingTime = Math.max(0, safeMinimumLoadTime - timeElapsed);

    // Consolidate timeline: minimal load time -> page mounted -> loading hidden -> content visible
    const t1 = setTimeout(() => {
      requestAnimationFrame(() => {
        setPageMounted(true);
        setLoading(false);
        
        // Show content after a short delay for animation
        const t2 = setTimeout(() => {
          setContentVisible(true);
        }, 800); // Reduced from 5000ms to 800ms for better UX
        
        timeoutsRef.current.push(t2);
      });
    }, remainingTime);

    timeoutsRef.current.push(t1);
  }, [setPageMounted, setLoading, setContentVisible, minimumLoadTime]);

  useEffect(() => {
    lastUpdateTime.current = Date.now();

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const windowLoadPromise = new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", () => resolve(), { once: true });
        }
      });

      windowLoadPromise
        .then(handleFullyLoaded)
        .catch(handleFullyLoaded);
    } else if (typeof window !== "undefined") {
      window.addEventListener("load", handleFullyLoaded, {
        once: true,
      });
    }

    return () => {
      // Clean up all timeouts on unmount
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, [handleFullyLoaded]);

  return { childrenRef };
}
