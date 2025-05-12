import { TextEffect } from "@/components/text-effect";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import type * as THREE from "three";
import { easing } from "maath";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const scroll = useScroll();
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Calculate the initial size to fill the viewport
  useEffect(() => {
    // Set initial size to fill viewport
    setSize({
      width: viewport.width,
      height: viewport.height,
    });
  }, [viewport.width, viewport.height]);

  // Update on each frame
  useFrame(() => {
    const scrollOffset = scroll.offset; // Value between 0 and 1

    if (meshRef.current) {
      // First phase (0 to 0.5): Only scale X
      if (scrollOffset <= 0.06) {
        // Map 0-0.5 to 1-0.5 for x scale
        const xScaleFactor = Math.max(0.8, 1 - scrollOffset * 6);
        const yScaleFactor = Math.max(0.6, 1 - scrollOffset * 6);
        const positionFactor = -5 + scrollOffset * 10;

        easing.damp3(
          meshRef.current.scale,
          [xScaleFactor, yScaleFactor, meshRef.current.scale.z],
          0.05
        );
        easing.damp3(meshRef.current.position, [0, positionFactor, 0], 0.05);
      }
    }
  });

  return (
    <section id="about" className="flex-center py-0 h-[500vh]">
      <div className="h-full w-full">
        <div className="sticky top-10 w-full h-screen flex-center">
          <motion.div
            className="bg-jet px-8 h-[55vh] w-[75vw] sticky top-10 flex-center"
            ref={ref}
          >
            <TextEffect
              per="line"
              preset="slide"
              trigger={inView}
              delay={2.5}
              className="text-2xl md:text-5xl text-white text-justify"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.25,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                },
              }}
            >
              {`Nayanaka Creative Studio is a dynamic collective
of designers, developers, and strategists, united by
a shared passion for creating exceptional digital 
experiences. We seamlessly blend creativity with
functionality, crafting websites that are not only 
visually captivating but also strategically designed 
to drive meaningful results.`}
            </TextEffect>
            <p className="text-2xl md:text-5xl text-white text-justify"></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
