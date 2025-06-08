"use client";

import { useState, useEffect, useMemo } from "react";

// Optimized media query hook with caching
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  const mediaQuery = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query);
    }
    return null;
  }, [query]);

  useEffect(() => {
    if (!mediaQuery) return;

    const updateMatch = () => setMatches(mediaQuery.matches);

    // Set initial value
    updateMatch();

    // Listen for changes
    mediaQuery.addEventListener("change", updateMatch);

    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, [mediaQuery]);

  return matches;
}
