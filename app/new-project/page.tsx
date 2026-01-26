"use client";

import { useAppSelector } from "@/hooks/redux-hooks";
import React from "react";
import { circOut, motion } from "framer-motion";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Page = () => {
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);
  const pageVariants = {
    hidden: { y: 100 },
    visible: {
      y: 0,
      transition: { duration: 0.7, ease: circOut },
    },
  };

  const page2Variants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { duration: 0.7, ease: circOut },
    },
  };

  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ref.current,
      { x: 5, y: 5, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.2,
        delay: 2,
      },
    )
      .fromTo(
        ref.current,
        { x: -5, y: -5, opacity: 0 },
        { x: -0, y: -0, opacity: 1, duration: 0.2, immediateRender: false },
      )
      .fromTo(
        ref.current,
        { x: 10, y: 10, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.2, immediateRender: false },
      );
  });

  return (
    <>
      <div className="h-screen  w-screen flex items-center justify-start bg-cardinal">
        <div className="w-[50vw] ml-30">
          <h2 ref={ref}>BLEND TECHNOLOGY</h2>
        </div>
        <motion.div
          className="bg-jet w-full z-4 absolute bottom-0 h-[10vh] lg:h-[13vh]"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
        ></motion.div>
        <motion.div
          className="bg-jet w-full z-4 absolute top-0 h-[10vh] lg:h-[13vh]"
          initial="hidden"
          animate="visible"
          variants={page2Variants}
        ></motion.div>
      </div>
    </>
  );
};

export default Page;
