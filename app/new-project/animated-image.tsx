"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import gsap from "gsap";

type AnimatedImageProps = {
  src: string;
  alt: string;
  size: {
    width: number;
    height: number;
  };
  scale?: number;
  className?: string;
  position: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
};

export default function AnimatedImage({
  src,
  alt,
  size: { width, height },
  scale = 1,
  className = "",
  position: { top = 0, left = 0, right = 0, bottom = 0 },
}: AnimatedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Set initial state on mount
  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!container || !imageWrapper) return;

    gsap.set(container, {
      y: 100,
      opacity: 0,
      force3D: true,
    });

    gsap.set(imageWrapper, {
      scale: 1.5,
      transformOrigin: "center center",
      force3D: true,
    });
  }, []);

  // Animate based on inView
  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!container || !imageWrapper) return;

    if (isInView) {
      // Animate in
      const tl = gsap.timeline();
      tl.to(container, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        force3D: true,
        delay: 0.7,
      }).to(
        imageWrapper,
        {
          scale: scale,
          duration: 1.2,
          ease: "power2.out",
          force3D: true,
          delay: 0.7,
        },
        0
      );
    } else {
      // Animate out
      const tl = gsap.timeline();
      tl.to(container, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        force3D: true,
        delay: 0.7,
      }).to(
        imageWrapper,
        {
          scale: 1.5,
          duration: 0.8,
          ease: "power2.in",
          force3D: true,
          delay: 0.7,
        },
        0
      );
    }
  }, [isInView, scale]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="absolute"
      style={{
        top: `${top}vh`,
        left: `${left}%`,
        right: right ? `${right}%` : "auto",
        bottom: bottom ? `${bottom}vh` : "auto",
        width: `${width}px`,
        height: `${height}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${className}`}
      >
        <div ref={imageWrapperRef} className="w-full h-full">
          {!imageError ? (
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              style={{
                objectFit: "cover",
              }}
              onError={handleImageError}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm opacity-70">Image unavailable</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
