"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ImageProps = {
  url: string;
  className?: string;
  position: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  delay?: number;
  size: {
    width: number;
    height: number;
  };
};

export default function NewImage({
  url,
  position: { top = 0, left = 0, right = 0, bottom = 0 },
  delay = 0,
  size: { width, height },
}: ImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={containerRef}
      className="absolute"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        top: `${top}vh`,
        left: `${left}%`,
        right: `${right}%`,
        bottom: `${bottom}vh`,
        width: `${width}px`,
        height: `${height}px`,
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative w-full h-full"
        ref={imageRef}
        style={{
          transformOrigin: "center center",
        }}
      >
        <Image
          src={imageError ? "/placeholder.svg" : url}
          alt="Project image"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
