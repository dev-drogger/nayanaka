"use client";

import { motion, easeOut } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { SERVICES } from "@/constant";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);
  const inView = useInView(sectionRef, { once: true });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Delay animation 1.5s after inView becomes true
  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setShouldAnimate(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  // GSAP background animation
  useGSAP(() => {
    if (!isContentVisible) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "top-=500 center",
          end: "top-=150 center",
          scrub: 1,
          id: "services-bg",
        },
      })
      .fromTo(
        "body",
        { backgroundColor: "#E5E7EB" },
        { backgroundColor: "#2E2E2E", overwrite: "auto" }
      );
  }, [isContentVisible]);

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.2,
        duration: 0.6,
        ease: easeOut,
      },
    }),
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.4,
        ease: easeOut,
      },
    }),
  };

  return (
    <section id="services" className="services w-screen" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={headingVariants}
          style={{
            willChange: "opacity, transform",
            transform: "translateZ(0)",
          }}
        >
          <h2 className="text-6xl lg:text-8xl font-bold uppercase tracking-tighter">
            Our
            <br />
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              className="border-t border-white/20 pt-8 pb-16"
              custom={index}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              variants={cardVariants}
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <motion.h3
                className="text-4xl font-bold mb-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.title}
              </motion.h3>
              <p className="text-lg mb-8 max-w-md">{service.description}</p>
              <ul className="space-y-2">
                {service.services.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    custom={i}
                    initial="hidden"
                    animate={shouldAnimate ? "visible" : "hidden"}
                    variants={listItemVariants}
                  >
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                    <span className="text-white">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
