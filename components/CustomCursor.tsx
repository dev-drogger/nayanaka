"use client";

import { useEffect, useRef } from "react";
import { MousePointer } from "lucide-react";
import { useAppSelector } from "@/hooks/redux-hooks";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const { type, mouseSpeed } = useAppSelector((state) => state.cursor);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });

  // Handle cursor position updates with requestAnimationFrame for smooth animation
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
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
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle cursor visibility when mouse leaves window
    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Clean up
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  });

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
      className={`fixed pointer-events-none z-50 hidden md:flex items-center justify-center will-change-transform ${getCursorClasses()}`}
      style={{
        top: -10, // Offset to center the cursor
        left: -10, // Offset to center the cursor
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
