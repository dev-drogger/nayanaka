"use client";

import { useState, useEffect } from "react";
import AnimatedImage from "./animated-image";

const images = [
  {
    src: "/images/project-1.png",
    alt: "Business Analytics Dashboard",
    width: 600,
    height: 400,
  },
  {
    src: "/images/project-2.jpg",
    alt: "Team Collaboration Tools",
    width: 400,
    height: 500,
  },
  {
    src: "/images/project-3.jpg",
    alt: "Modern Office Space",
    width: 800,
    height: 300,
  },
  {
    src: "/images/project-4.jpg",
    alt: "Creative Workspace",
    width: 500,
    height: 600,
  },
];

export default function ImageGallery() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading animations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            GSAP Image Animations
          </h1>
          <p className="text-lg md:text-xl opacity-70">
            Scroll down to see the magic
          </p>
        </div>
      </section>

      {/* Animated Images Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Image 1 */}
            <div className="flex justify-center">
              <AnimatedImage
                src={images[0].src}
                alt={images[0].alt}
                width={Math.min(images[0].width, 500)}
                height={Math.min(images[0].height, 333)}
                scale={1}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Smooth Animations
              </h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                Each image animates smoothly into view with GSAP's powerful
                animation engine, providing buttery smooth 60fps animations that
                respond to scroll position.
              </p>
            </div>

            {/* Image 2 */}
            <div className="text-white md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Responsive Design
              </h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                The animations work seamlessly across all device sizes, with
                optimized performance for both desktop and mobile experiences.
              </p>
            </div>

            <div className="flex justify-center md:order-1">
              <AnimatedImage
                src={images[1].src}
                alt={images[1].alt}
                width={Math.min(images[1].width, 320)}
                height={Math.min(images[1].height, 400)}
                scale={0.9}
                className="rounded-lg shadow-2xl"
              />
            </div>

            {/* Image 3 */}
            <div className="flex justify-center">
              <AnimatedImage
                src={images[2].src}
                alt={images[2].alt}
                width={Math.min(images[2].width, 600)}
                height={Math.min(images[2].height, 225)}
                scale={1.1}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Performance Optimized
              </h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                Built with Next.js Image optimization and GSAP's efficient
                animation system for maximum performance and minimal bundle size
                impact.
              </p>
            </div>

            {/* Image 4 */}
            <div className="text-white md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Scroll Triggered
              </h2>
              <p className="text-base md:text-lg opacity-80 leading-relaxed">
                Animations are triggered by scroll position using GSAP's
                ScrollTrigger, creating an engaging and interactive user
                experience.
              </p>
            </div>

            <div className="flex justify-center md:order-1">
              <AnimatedImage
                src={images[3].src}
                alt={images[3].alt}
                width={Math.min(images[3].width, 400)}
                height={Math.min(images[3].height, 480)}
                scale={0.8}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">End of Demo</h2>
          <p className="text-base md:text-lg opacity-70">
            Scroll back up to see the reverse animations
          </p>
        </div>
      </section>
    </div>
  );
}
