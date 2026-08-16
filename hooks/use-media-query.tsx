"use client";

import { useState, useEffect, useRef } from "react";

export function useMediaQuery(query: string) {
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(query);
    mediaQueryRef.current = mq;

    // sync initial state inside effect to avoid SSR mismatch
    (() => setMatches(mq.matches))();

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]); // re-run only if the query string itself changes

  return matches;
}
