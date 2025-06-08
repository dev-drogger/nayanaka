import { useRef, useCallback, useEffect } from "react";

export default function useMouseTracking() {
  const prevPos = useRef({ x: 0, y: 0 });
  const mouseSpeedRef = useRef(0);
  const lastUpdateTime = useRef(0);
  const THROTTLE_MS = 16; // ~60fps

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < THROTTLE_MS) return;

    const dx = e.clientX - prevPos.current.x;
    const dy = e.clientY - prevPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    mouseSpeedRef.current = speed;
    prevPos.current = { x: e.clientX, y: e.clientY };
    lastUpdateTime.current = now;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return mouseSpeedRef;
}
