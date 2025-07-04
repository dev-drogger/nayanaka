"use client";

import { motion, circIn } from "framer-motion";
import { useAppSelector } from "@/hooks/redux-hooks";
import { BackgroundPaths } from "@/components/background-paths";
import HeroTitle from "@/components/hero/hero-title";
import { HeroGraphic } from "@/components/hero/hero-graphic";

export default function Hero() {
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);
  const pageVariants = {
    hidden: { y: 100 },
    visible: {
      y: 0,
      transition: { duration: 0.6, ease: circIn },
    },
  };
  const page2Variants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { duration: 0.6, ease: circIn },
    },
  };

  return (
    <section className="py-0 bg-jet">
      <BackgroundPaths>
        <div id="hero" className="h-screen z-2 flex items-center w-screen">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-12 gap-4 z-50">
              <HeroTitle state={isContentVisible} />
              <HeroGraphic state={isContentVisible} />
            </div>
          </div>
        </div>
      </BackgroundPaths>

      <motion.div
        className="bg-jet w-full z-4 absolute bottom-0 h-[10vh] lg:h-[13vh]"
        initial="hidden"
        animate={isContentVisible ? "visible" : "hidden"}
        variants={pageVariants}
      ></motion.div>
      <motion.div
        className="bg-jet w-full z-4 absolute top-0 h-[10vh] lg:h-[13vh]"
        initial="hidden"
        animate={isContentVisible ? "visible" : "hidden"}
        variants={page2Variants}
      ></motion.div>
    </section>
  );
}
