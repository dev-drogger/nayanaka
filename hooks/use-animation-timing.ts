import { setContentVisible } from "@/state/slices/contentVisibleSlice";
import { setLoading } from "@/state/slices/loadingSlice";
import { setPageMounted } from "@/state/slices/pageMountedSlice";
import { useRef, useCallback, useEffect } from "react";
import { useAppDispatch } from "./redux-hooks";

export default function useAnimationTiming(minimumLoadTime?: number) {
  const dispatch = useAppDispatch();
  const lastUpdateTime = useRef(Date.now());
  const childrenRef = useRef<HTMLDivElement>(null);

  const handleFullyLoaded = useCallback(() => {
    const timeElapsed = Date.now() - lastUpdateTime.current;
    const safeMinimumLoadTime = minimumLoadTime ?? 0;
    const remainingTime = Math.max(0, safeMinimumLoadTime - timeElapsed);

    setTimeout(() => {
      requestAnimationFrame(() => {
        dispatch(setPageMounted(true));

        setTimeout(() => {
          dispatch(setLoading(false));

          setTimeout(() => {
            dispatch(setContentVisible(true));
          }, 1000);
        }, 1000);
      });
    }, remainingTime);
  }, [dispatch, minimumLoadTime]);

  useEffect(() => {
    lastUpdateTime.current = Date.now();

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      setTimeout(() => {
        if (!childrenRef.current) return;

        const windowLoadPromise = new Promise<void>((resolve) => {
          if (document.readyState === "complete") {
            resolve();
          } else {
            window.addEventListener("load", () => resolve(), { once: true });
          }
        });

        Promise.all([windowLoadPromise])
          .then(handleFullyLoaded)
          .catch(handleFullyLoaded);
      }, 0);
    } else if (typeof window !== "undefined") {
      (window as Window).addEventListener("load", handleFullyLoaded, {
        once: true,
      });
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleFullyLoaded);
      }
    };
  }, [handleFullyLoaded]);

  return { childrenRef };
}
