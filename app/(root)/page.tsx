"use client";
// import { motion } from "framer-motion";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";

import CustomCursor from "@/components/ui/custom-cursor";
import LoadingScreen from "../../components/loading";
import BrowserCheck from "@/components/browser-check";

// import useMouseTracking from "@/hooks/use-mouse-tracking";
// import useAnimationTiming from "@/hooks/use-animation-timing";
// import { useRafCallback } from "@/hooks/use-raf-callback";
// import { setMouseSpeed } from "@/state/slices/cursorSlice";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import Hero from "./section/hero-section";

import Projects from "./section/projects-section";
import About from "./section/about-section";
import Services from "./section/new-service";

// function MainContent({ children }: { children: React.ReactNode }) {
//   const dispatch = useAppDispatch();
//   const { isLoading } = useAppSelector((state) => state.loading);

//   const minimumLoadTime = 3500;
//   const mouseSpeedRef = useMouseTracking();
//   const { childrenRef } = useAnimationTiming(minimumLoadTime);

//   useRafCallback(() => {
//     if (Math.abs(mouseSpeedRef.current) > 2) {
//       dispatch(setMouseSpeed(mouseSpeedRef.current));
//       mouseSpeedRef.current = 0;
//     }
//   }, !isLoading);

//   const contentVariants = useMemo(
//     () => ({
//       hidden: { opacity: 0 },
//       visible: {
//         opacity: 1,
//         transition: {
//           duration: 0.8,
//           ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
//         },
//       },
//     }),
//     [],
//   );

//   // return (
//   //   <>
//   //     <BrowserCheck />
//   //     <CustomCursor />

//   //     {/* Preload content while hidden */}
//   //     {isLoading && (
//   //       <div
//   //         key="hidden-content"
//   //         ref={childrenRef}
//   //         style={{
//   //           visibility: "hidden",
//   //           position: "absolute",
//   //           pointerEvents: "none",
//   //           width: 0,
//   //           height: 0,
//   //         }}
//   //       >
//   //         {children}
//   //       </div>
//   //     )}

//   //     {/* Main content - always render but control visibility with opacity */}
//   //     <motion.div
//   //       key="content"
//   //       initial="hidden"
//   //       animate={"visible"}
//   //       variants={contentVariants}
//   //       className="w-full"
//   //       style={{
//   //         willChange: "opacity, transform",
//   //         transform: "translateZ(0)",
//   //       }}
//   //     >
//   //       {children}
//   //     </motion.div>
//   //   </>
//   // );
// }

export default function Page() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);
  return (
    <>
      <BrowserCheck />
      <CustomCursor />
      <ReactLenis
        root
        options={{
          duration: 1.2, // Reduced duration for snappier feel
          lerp: 0.08, // Slightly increased lerp for better performance
          smoothWheel: true,
          wheelMultiplier: 1,
        }}
        className="relative w-screen min-h-screen overflow-x-auto"
      >
        {!isReady ? (
          <LoadingScreen />
        ) : (
          <div
            className={`${
              isReady ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
          >
            <Hero />
            <About />
            <Projects />
            <Services />
          </div>
        )}
      </ReactLenis>
    </>
  );
}
