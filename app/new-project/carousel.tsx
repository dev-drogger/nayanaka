"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import AnimatedImage from "./animated-image";

export default function NewCarousel() {
  const imageData = [
    {
      url: "/pictures/DSC00128.webp",
      position: { top: 55, left: 32 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/DSC09892.webp",
      position: { top: 158, left: 54 },
      size: { width: 250, height: 570 },
    },
    {
      url: "/pictures/img6.webp",
      position: { top: 157, left: 23 },
      size: { width: 550, height: 350 },
    },
    {
      url: "/pictures/img3.webp",
      position: { top: 177, left: 78 },
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
      position: { top: 452, left: 33 },
      size: { width: 700, height: 850 },
    },
    {
      url: "/pictures/IMG_5501.webp",
      position: { top: 534, left: 32 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/IMG_1867.webp",
      position: { top: 557, left: 85 },
      size: { width: 650, height: 450 },
    },
    {
      url: "/pictures/IMG_5299.webp",
      position: { top: 584, left: 23 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/IMG_1868.webp",
      position: { top: 634, left: 32 },
      size: { width: 550, height: 330 },
    },
    {
      url: "/pictures/DSC09949.webp",
      position: { top: 644, left: 77 },
      size: { width: 550, height: 550 },
    },
  ];

  // Global ScrollTrigger optimization
  useEffect(() => {
    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({
      limitCallbacks: true, // Limit callback frequency
      syncInterval: 150, // Reduce sync frequency for better performance
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
  }, []);

  return (
    <>
      {imageData.map((image, index) => (
        <AnimatedImage
          key={`image-${index}`}
          src={image.url}
          position={{ top: image.position.top, left: image.position.left }}
          alt={`Project image ${index + 1}`}
          size={image.size}
          scale={1}
        />
      ))}
    </>
    // <div className="h-[700vh] w-full py-0">
    //   <div className="container mx-auto relative w-full h-full px-4">
    //   </div>
    // </div>
  );
}
