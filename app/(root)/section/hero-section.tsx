"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { BackgroundPaths } from "@/components/background-paths";

const FloatingObjects = dynamic(
  () => import("@/components/3d/FloatingObjects"),
  {
    ssr: false,
  }
);

export default function Hero() {
  const dispatch = useAppDispatch();

  return (
    <BackgroundPaths>
      <section id="hero" className=" flex items-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <FloatingObjects />
          </Suspense>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-12 gap-4 z-50">
            <div className="col-span-12 md:col-span-6 flex-center">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="mt-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="text-4xl md:text-6xl uppercase font-bold">
                    blend art and <br />
                    technology <br />
                    into digital aesthetic
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <div className="col-span-12 md:col-span-6 md:pl-8">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div
                  className="aspect-square overflow-hidden"
                  onMouseEnter={() => dispatch(setCursorType("3d"))}
                  onMouseLeave={() => dispatch(setCursorType("default"))}
                >
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    alt="Creative visual"
                    width={800}
                    height={800}
                    className="object-cover h-full w-full"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-10 right-0 bg-white text-black p-6 max-w-xs"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  onMouseEnter={() => dispatch(setCursorType("text"))}
                  onMouseLeave={() => dispatch(setCursorType("default"))}
                >
                  <p className="text-sm text-black">
                    Nayanaka is a creative agency founded in 2025, specializing
                    in 3D web design and development.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="#about"
                      className="flex items-center gap-2 text-sm uppercase tracking-widest"
                      onMouseEnter={() => dispatch(setCursorType("link"))}
                      onMouseLeave={() => dispatch(setCursorType("text"))}
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </BackgroundPaths>
  );
}
