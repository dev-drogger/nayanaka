"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

function MovingBoxWithBoundary() {
  const [position, setPosition] = useState(0);
  const animationRef = useRef(null);
  const boxRef = useRef(null);

  const animate = useCallback(() => {
    if (position < window.innerWidth - 50) {
      // stop before reaching the edge
      setPosition((prevPosition) => prevPosition + 2);
      animationRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
  }, [position]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [position, animate]);

  return (
    <div ref={boxRef} style={{ transform: `translateX(${position}px)` }}>
      🚀 Moving Box
    </div>
  );
}

export default MovingBoxWithBoundary;
