"use client";

import { motion } from "framer-motion";
import { TextEffect } from "@/components/text-effect";

export default function LoadingScreen() {
  return (
    <motion.div
      className="h-screen z-50 w-full flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-full w-full">
        {/* <Suspense fallback={null}>
          <Scene3D />
        </Suspense> */}

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex-row-center gap-14 mb-4">
              <motion.div className="w-auto">
                <TextEffect
                  per="char"
                  preset="blur"
                  className="text-2xl md:text-6xl text-white font-light"
                >
                  Nayanaka
                </TextEffect>

                <TextEffect
                  per="char"
                  preset="blur"
                  className="text-sm md:text-2xl text-white"
                >
                  なやなか
                </TextEffect>
              </motion.div>
              <div className="w-auto">
                <TextEffect
                  per="char"
                  preset="fade"
                  delay={1}
                  className="text-2xl font-light"
                >
                  Creative Studio
                </TextEffect>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
