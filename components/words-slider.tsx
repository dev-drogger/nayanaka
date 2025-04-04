"use client";

import { motion } from "framer-motion";
import React from "react";
import { InfiniteSlider } from "./infinite-slider";

const WordsSlider = () => {
  return (
    <>
      <motion.div
        className="absolute uppercase  bottom-25 md:-bottom-0 z-50 text-white text-xl w-full flex-row-center gap-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <InfiniteSlider reverse className="opacity-70 text-8xl">
          <div>House of Digital Aesthetic - </div>

          <div>where your vision meets our perfection - </div>
          <div>Transforming visions into well-crafted digital realities - </div>
          <div>every click is designed to inspire - </div>
        </InfiniteSlider>
      </motion.div>
      {/* <motion.div
        className="absolute uppercase top-25 md:top-40 z-50 text-white text-xl w-full flex-row-center gap-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
      >
        <InfiniteSlider>
          <h2>every page tells a story - </h2>
          <h2>Crafting digital experiences that captivate and convert - </h2>
          <h2>realm of digital perfection - </h2>
        </InfiniteSlider>
      </motion.div> */}
    </>
  );
};

export default WordsSlider;
