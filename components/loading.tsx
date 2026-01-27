"use client";

import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";

export default function LoadingScreen() {
  return (
    <div className="h-screen fixed inset-0 z-[999] w-full flex flex-col items-center justify-center bg-jet">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative">
          <div className="flex-row-center gap-14 mb-4">
            <motion.div
              className="w-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextEffect
                per="char"
                preset="blur"
                className="text-2xl lg:text-6xl text-white font-light"
              >
                Nayanaka
              </TextEffect>

              <TextEffect
                per="char"
                preset="blur"
                className="text-sm lg:text-2xl text-white"
              >
                なやなか
              </TextEffect>
            </motion.div>
            <motion.div
              className="w-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TextEffect
                per="char"
                preset="fade"
                delay={0.5}
                className="text-2xl font-light"
              >
                Creative Studio
              </TextEffect>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-white"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
