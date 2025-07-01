"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { BackgroundPaths } from "@/components/background-paths";
import { useMemo } from "react";
import { TextEffect } from "@/components/ui/text-effect";

export default function Hero() {
  const dispatch = useAppDispatch();
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);

  const graphicVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay: 0.3,
        },
      },
    }),
    []
  );

  return (
    <BackgroundPaths>
      <section id="hero" className="h-screen z-2 flex items-center w-screen">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-12 gap-4 z-50">
            <div className="col-span-12 lg:col-span-8 flex-center">
              <div className="flex-col flex">
                <TextEffect
                  per="char"
                  preset="slide"
                  trigger={isContentVisible}
                  className="text-4xl lg:text-6xl uppercase font-bold text-black"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.01,
                        },
                      },
                    },
                    item: {
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    },
                  }}
                >
                  {`BLEND ART`}
                </TextEffect>

                <TextEffect
                  per="char"
                  preset="slide"
                  trigger={isContentVisible}
                  className="text-4xl lg:text-6xl uppercase font-bold text-black"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.01,
                          delay: 0.05,
                        },
                      },
                    },
                    item: {
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    },
                  }}
                >
                  {`AND TECHNOLOGY`}
                </TextEffect>

                <TextEffect
                  per="char"
                  preset="slide"
                  trigger={isContentVisible}
                  className="text-4xl lg:text-6xl uppercase font-bold text-black"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.01,
                          delay: 0.1,
                        },
                      },
                    },
                    item: {
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    },
                  }}
                >
                  {`INTO DIGITAL AESTHETIC`}
                </TextEffect>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:pl-8">
              <motion.div
                initial="hidden"
                animate={isContentVisible ? "visible" : "hidden"}
                variants={graphicVariants}
                viewport={{ once: true }}
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

                <div
                  className="absolute -bottom-45 right-0 bg-white text-black p-6 max-w-xs"
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
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="bg-jet w-full z-2 absolute bottom-0 h-[10vh] lg:h-[13vh]"></div>
        <div className="bg-jet w-full z-2 absolute top-0 h-[10vh] lg:h-[13vh]"></div>
      </section>
    </BackgroundPaths>
  );
}
