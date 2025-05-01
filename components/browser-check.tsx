"use client";

import { useEffect } from "react";

export default function BrowserCheck() {
  useEffect(() => {
    // Check if the browser supports the features we need
    const checkBrowserSupport = () => {
      const html = document.documentElement;

      // Check for requestAnimationFrame support
      if (!window.requestAnimationFrame) {
        html.classList.add("no-raf");
      }

      // Check for transform3d support
      const has3d =
        "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix();
      if (!has3d) {
        html.classList.add("no-transform3d");
      }

      // Check if it's a touch device
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        html.classList.add("touch-device");
      }

      // Check for reduced motion preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        html.classList.add("reduced-motion");
      }
    };

    checkBrowserSupport();
  }, []);

  return null;
}
