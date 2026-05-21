"use client";

import { useEffect, useRef } from "react";
import { MousePointer } from "lucide-react";
import { useAppSelector } from "@/hooks/redux-hooks";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const { type, mouseSpeed } = useAppSelector((state) => state.cursor);
  const animationIdRef = useRef<number | null>(null);
  const throttleIdRef = useRef<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const lastFrameTimeRef = useRef<number>(0);

  // Cleanup all RAF callbacks
  const cleanupAnimations = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    if (throttleIdRef.current) {
      cancelAnimationFrame(throttleIdRef.current);
      throttleIdRef.current = null;
    }
  };

  // Animation loop for cursor position
  const animate = (time: number) => {
    // Calculate cursor position with smooth easing
    cursorPosition.current.x +=
      (mousePosition.current.x - cursorPosition.current.x) * 0.2;
    cursorPosition.current.y +=
      (mousePosition.current.y - cursorPosition.current.y) * 0.2;

    if (cursorRef.current) {
      // Use transform for hardware acceleration
      cursorRef.current.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;

      // Apply scale based on mouse speed
      if (mouseSpeed > 15) {
        cursorRef.current.style.transform += " scale(1.5)";
        cursorRef.current.style.opacity = "0.5";
      } else {
        cursorRef.current.style.opacity = "1";
      }
    }

    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Start animation loop
  const startAnimation = () => {
    if (animationIdRef.current === null) {
      animationIdRef.current = requestAnimationFrame(animate);
    }
  };

  // Stop animation loop
  const stopAnimation = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  };

  // Throttled mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };

    // Only throttle if we haven't already scheduled a frame
    if (throttleIdRef.current === null) {
      throttleIdRef.current = requestAnimationFrame(() => {
        startAnimation();
        throttleIdRef.current = null;
      });
    }
  };

  // Show cursor when mouse enters
  const handleMouseEnter = () => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
    }
    startAnimation();
  };

  // Hide cursor when mouse leaves
  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
    }
    stopAnimation();
  };

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    startAnimation();

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      cleanupAnimations();
    };
  }, []);

  // Get cursor classes based on type
  const getCursorClasses = () => {
    switch (type) {
      case "link":
        return "w-20 h-20 bg-white rounded-full mix-blend-difference flex items-center justify-center";
      case "text":
        return "w-4 h-16 bg-white mix-blend-difference";
      case "3d":
        return "w-16 h-16 border-2 border-white rounded-full mix-blend-difference flex items-center justify-center";
      default:
        return `w-4 h-4 bg-white rounded-full mix-blend-difference transition-transform duration-100`;
    }
  };

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 hidden lg:flex items-center justify-center will-change-transform ${getCursorClasses()}`}
      style={{
        top: -10,
        left: -10,
        transition: "width 0.3s, height 0.3s, border 0.3s, opacity 0.3s",
      }}
    >
      {type === "link" && (
        <span
          ref={cursorTextRef}
          className="text-black text-xs uppercase tracking-widest"
        >
          View
        </span>
      )}
      {type === "3d" && <MousePointer className="h-4 w-4" />}
    </div>
  );
}
