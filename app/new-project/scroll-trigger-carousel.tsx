"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedImage from "./scroll-trigger-animated-image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function NewCarousel() {
  const imageData = [
    {
      url: "/pictures/DSC00128.webp",
      position: { top: 55, left: 30 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/DSC09892.webp",
      position: { top: 158, left: 56 },
      size: { width: 250, height: 570 },
    },
    {
      url: "/pictures/img6.webp",
      position: { top: 157, left: 26 },
      size: { width: 550, height: 350 },
    },
    {
      url: "/pictures/img3.webp",
      position: { top: 177, left: 80 },
      size: { width: 350, height: 350 },
    },
    {
      url: "/pictures/img5.webp",
      position: { top: 231, left: 61 },
      size: { width: 350, height: 350 },
    },
    {
      url: "/pictures/IMG_0918.webp",
      position: { top: 255, left: 23 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/IMG_1402.webp",
      position: { top: 316, left: 23 },
      size: { width: 550, height: 350 },
    },
    {
      url: "/pictures/IMG_1849.webp",
      position: { top: 361, left: 73 },
      size: { width: 800, height: 750 },
    },
    {
      url: "/pictures/DSC00212.webp",
      position: { top: 465, left: 33 },
      size: { width: 700, height: 850 },
    },
    {
      url: "/pictures/IMG_5501.webp",
      position: { top: 552, left: 32 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/IMG_1867.webp",
      position: { top: 557, left: 85 },
      size: { width: 650, height: 450 },
    },
    {
      url: "/pictures/IMG_5299.webp",
      position: { top: 640, left: 23 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/DSC09949.webp",
      position: { top: 666, left: 77 },
      size: { width: 550, height: 550 },
    },
  ];

  const imageContainerRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      imageContainerRef.current.forEach((container, index) => {
        const image = imageRef.current[index];
        if (!image) return;

        gsap.set(container, {
          y: 100,
          opacity: 0,
          force3D: true,
        });

        gsap.set(image, {
          scale: 1.5,
          transformOrigin: "center center",
          force3D: true,
        });

        ScrollTrigger.create({
          trigger: container,
          start: "center-=175 center",
          end: "bottom center",
          onEnter: () => {
            gsap
              .timeline()
              .to(container, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                force3D: true,
              })
              .to(
                image,
                {
                  scale: 1,
                  duration: 1.2,
                  ease: "power2.out",
                  force3D: true,
                },
                0,
              );
          },
          onLeave: () => {
            gsap
              .timeline()
              .to(container, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
                force3D: true,
              })
              .to(
                image,
                {
                  scale: 1.5,
                  duration: 0.8,
                  ease: "power2.in",
                  force3D: true,
                },
                0,
              );
          },
          onLeaveBack: () => {
            gsap
              .timeline()
              .to(container, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
                force3D: true,
              })
              .to(
                image,
                {
                  scale: 1.5,
                  duration: 0.8,
                  ease: "power2.in",
                  force3D: true,
                },
                0,
              );
          },
        });
      });
      ScrollTrigger.config({
        limitCallbacks: true, // Limit callback frequency
        syncInterval: 150, // Reduce sync frequency for better performance
        // autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      // Refresh ScrollTrigger after all components mount
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(refreshTimer);
        // Clean up all ScrollTriggers on unmount
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [], scope: imageContainerRef },
  );

  return (
    <>
      {imageData.map((image, index) => (
        <AnimatedImage
          key={`image-${index}`}
          imageContainerRef={(el) => {
            if (el) imageContainerRef.current[index] = el;
          }}
          imageRef={(el) => {
            if (el) imageRef.current[index] = el;
          }}
          src={image.url}
          position={{ top: image.position.top, left: image.position.left }}
          alt={`Project image ${index + 1}`}
          size={image.size}
          className="box"
        />
      ))}
    </>
  );
}
