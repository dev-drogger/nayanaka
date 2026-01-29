"use client";

import Image from "next/image";

type AnimatedImageProps = {
  src: string;
  alt: string;
  size: {
    width: number;
    height: number;
  };
  imageContainerRef: (el: HTMLDivElement | null) => void;
  imageRef: (el: HTMLDivElement | null) => void;
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
  imageContainerRef,
  imageRef,
  className = "",
  position: { top = 0, left = 0, right = 0, bottom = 0 },
}: AnimatedImageProps) {
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
        ref={imageContainerRef}
        className={`relative w-full h-full overflow-hidden ${className}`}
      >
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            quality={85}
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
