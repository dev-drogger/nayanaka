"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";

export default function About() {
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Adjust the scrollYProgress value to move the images
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="about" ref={containerRef} className=" flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <motion.div
              className="sticky top-32"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <h2 className="text-6xl md:text-8xl text-black font-bold uppercase tracking-tighter mb-8">
                About
                <br />
                Us
              </h2>
              <p className="text-lg mb-6 text-black">
                Nayanaka Creative Studio is a dynamic collective of designers,
                developers, and strategists, united by a shared passion for
                creating exceptional digital experiences.
              </p>
              <p className="text-lg mb-6 text-black">
                We seamlessly blend creativity with functionality, crafting
                websites that are not only visually captivating but also
                strategically designed to drive meaningful results.
              </p>
              <div className="mt-8">
                <Button
                  className="bg-white text-black hover:bg-white/90 text-sm uppercase tracking-widest"
                  onMouseEnter={() => dispatch(setCursorType("link"))}
                  onMouseLeave={() => dispatch(setCursorType("text"))}
                >
                  Our Process
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-7 order-1 md:order-2 mb-8 md:mb-0">
            <div className="space-y-32">
              {[1, 2, 3].map((item, index) => (
                <motion.div
                  key={item}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }} // Start below the final position
                  animate={{ opacity: 1, y: 0 }} // End at normal position
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2, // Delay each card slightly
                  }}
                  style={{
                    zIndex: 3 - index, // Stack the cards with z-index for proper layering
                    transform: `translateY(${index * 20}px)`, // Apply different vertical offset to simulate stacking
                  }}
                >
                  <div
                    className="aspect-[4/3] overflow-hidden"
                    onMouseEnter={() => dispatch(setCursorType("3d"))}
                    onMouseLeave={() => dispatch(setCursorType("default"))}
                  >
                    <Image
                      src="/pictures/DSC00128.webp"
                      alt={`Project ${item}`}
                      width={1000}
                      height={800}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold">Project {item}</h3>
                      <p className="text-sm text-white/70">
                        Design & Development
                      </p>
                    </div>
                    <Link
                      href="#"
                      className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center"
                      onMouseEnter={() => dispatch(setCursorType("link"))}
                      onMouseLeave={() => dispatch(setCursorType("default"))}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
