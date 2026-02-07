"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
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
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={isMobile ? "" : "absolute"}
      style={{
        top: isMobile ? "0" : `${top}vh`,
        left: isMobile ? "0" : `${left}%`,
        right: right ? `${right}%` : "auto",
        bottom: bottom ? `${bottom}vh` : "auto",
        width: isMobile ? "100vw" : `${width}px`,
        height: isMobile ? "40vh" : `${height}px`,
        transform: isMobile ? "" : "translate(-50%, -50%)",
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
            quality={75}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>
    </div>
  );
}
