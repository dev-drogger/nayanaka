"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SupermarketBarcodeLoader from "./loading";

interface CurtainRevealProps {
  children: React.ReactNode;
  minimumLoadTime?: number; // Optional minimum time to show loading screen
}

const CurtainReveal: React.FC<CurtainRevealProps> = ({
  children,
  minimumLoadTime = 1000, // Default minimum loading time
}) => {
  const [loading, setLoading] = useState(true);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const startTimeRef = useRef(Date.now());
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Record starting time
    startTimeRef.current = Date.now();

    // Function to handle when everything is loaded
    const handleFullyLoaded = () => {
      const timeElapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, minimumLoadTime - timeElapsed);

      // Ensure we show the loading screen for at least minimumLoadTime
      setTimeout(() => {
        // Start opening the curtain
        setCurtainOpen(true);

        // After curtain is fully open, show the content
        setTimeout(() => {
          setContentVisible(true);

          // After content is visible, remove the loading overlay
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }, 1000); // Wait for curtain animation to complete
      }, remainingTime);
    };

    // Create an observer to detect when images and other resources are loaded
    if (window && "IntersectionObserver" in window) {
      // Wait for the next tick to ensure children are rendered
      setTimeout(() => {
        if (!childrenRef.current) return;

        // Create a promise that resolves when window.onload fires
        const windowLoadPromise = new Promise<void>((resolve) => {
          if (document.readyState === "complete") {
            resolve();
          } else {
            window.addEventListener("load", () => resolve(), { once: true });
          }
        });

        // Create a promise that resolves when all images in the children are loaded
        const imagesPromise = new Promise<void>((resolve) => {
          const images = childrenRef.current?.querySelectorAll("img") || [];

          if (images.length === 0) {
            resolve();
            return;
          }

          let loadedCount = 0;
          const imageLoadHandler = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              resolve();
            }
          };

          images.forEach((img) => {
            if (img.complete) {
              imageLoadHandler();
            } else {
              img.addEventListener("load", imageLoadHandler, { once: true });
              img.addEventListener("error", imageLoadHandler, { once: true });
            }
          });
        });

        // When both window and images are loaded, consider the site fully loaded
        Promise.all([windowLoadPromise, imagesPromise])
          .then(handleFullyLoaded)
          .catch(handleFullyLoaded); // Still proceed even if there was an error
      }, 0);
    } else {
      // Fallback for browsers without IntersectionObserver
      window.addEventListener("load", handleFullyLoaded, { once: true });
    }

    // Cleanup listeners
    return () => {
      window.removeEventListener("load", handleFullyLoaded);
    };
  }, [minimumLoadTime]);

  // Animation variants for the curtains
  const topCurtainVariants = {
    closed: { y: 0, height: "50vh" },
    open: {
      y: "-0%",
      height: "15vh",
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const bottomCurtainVariants = {
    closed: { y: 0, height: "50vh" },
    open: {
      y: "0%",
      height: "15vh",
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  // Animation variants for the content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {loading && (
        <div
          key="hidden-content"
          ref={childrenRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          {children}
        </div>
      )}

      <div className=" inset-0 overflow-hidden z-60">
        {/* Loader component - only shown before curtain opens */}
        {!curtainOpen && (
          <div key="loader" className="absolute w-screen z-30">
            <SupermarketBarcodeLoader />
          </div>
        )}
        {/* Top curtain */}
        <motion.div
          key="top-curtain"
          className="absolute hidden md:block top-0 left-0 w-full bg-jet"
          initial="closed"
          animate={curtainOpen ? "open" : "closed"}
          variants={topCurtainVariants}
        />
        {/* Bottom curtain */}
        <motion.div
          key="bottom-curtain"
          className="absolute hidden md:block bottom-0 left-0 w-full bg-jet"
          initial="closed"
          animate={curtainOpen ? "open" : "closed"}
          variants={bottomCurtainVariants}
        />

        <motion.div
          key="content"
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
          variants={contentVariants}
        >
          {children}
        </motion.div>
        {/* <div key="content">{children}</div> */}
      </div>
    </>
  );
};

export default CurtainReveal;
