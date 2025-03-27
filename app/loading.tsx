import Scene3D from "@/components/Scene3D";
import { motion } from "framer-motion";
import { Suspense } from "react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-full w-full">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-[20vw] font-bold text-white leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              NAYA
            </motion.div>
            <motion.div
              className="text-[20vw] font-bold text-white leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              NAKA
            </motion.div>

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
