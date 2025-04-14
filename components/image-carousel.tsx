import { motion } from "framer-motion";
import React from "react";
import { ProgressiveBlur } from "./ui/progressive-blur";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type ImageCarouselProps = {
  src: string;
  title: string;
  desc: string;
  alt: string;
};

export const ImageCarousel = ({
  src,
  title,
  desc,
  alt,
}: ImageCarouselProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <motion.div
        className="absolute z-10 w-full h-full"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 z-10 h-[75%] w-full"
          blurIntensity={0.5}
          animate={isHover ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            animate={isHover ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <div className="absolute bottom-5 left-5 flex flex-col gap-1">
              <p className="text-base font-medium text-white">{title}</p>
              <span className="text-base text-zinc-300">{desc}</span>
            </div>
            <div className="absolute bottom-5 right-5 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </motion.div>
        </ProgressiveBlur>
      </motion.div>

      <Image src={src} fill style={{ objectFit: "cover" }} alt={alt} />
    </>
  );
};
