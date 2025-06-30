"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppSelector } from "@/hooks/redux-hooks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const ref = useRef(null);
  const boxRef = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isContentVisible } = useAppSelector((state) => state.contentVisible);

  useGSAP(() => {
    if (!isContentVisible) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "top center",
        end: "center center",
        scrub: 1,
        markers: true,
      },
    });

    scrollTl.fromTo(
      boxRef.current,
      { scaleX: 3, scaleY: 5 },
      { scaleX: 1, scaleY: 1 }
    );

    return () => {
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, [isContentVisible]);

  return (
    <section id="about" className="about relative py-0 px-6 h-[300vh] w-screen">
      {/* <div className="h-full w-full flex-center">
        <motion.div
          className="bg-jet h-[35vh] lg:h-[55vh] w-full lg:w-[75vw] flex-center"
          ref={boxRef}
        ></motion.div>
      </div> */}
      <div className="bg-cardinal h-[40vh] w-full">ABOUT US</div>

      <div
        ref={ref}
        className="absolute bottom-0 right-0 left-0 top-0 flex-center"
      >
        <TextEffect
          per="line"
          preset="slide"
          trigger={inView}
          delay={2}
          className="text-lg lg:text-5xl text-white text-justify"
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            },
          }}
        >
          {isMobile
            ? `Nayanaka Creative Studio is a dynamic
collective of designers, developers, and
strategists, united by a shared passion for
creating exceptional digital experiences.
We seamlessly blend creativity with
functionality, crafting websites that are
not only visually captivating but also
strategically designed to drive
meaningful results.`
            : `Nayanaka Creative Studio is a dynamic collective
of designers, developers, and strategists, united by
a shared passion for creating exceptional digital 
experiences. We seamlessly blend creativity with
functionality, crafting websites that are not only 
visually captivating but also strategically designed 
to drive meaningful results.`}
          {/* {`Nayanaka Creative Studio is a dynamic collective
of designers, developers, and strategists, united by
a shared passion for creating exceptional digital 
experiences. We seamlessly blend creativity with
functionality, crafting websites that are not only 
visually captivating but also strategically designed 
to drive meaningful results.`} */}
        </TextEffect>
      </div>
    </section>
  );
}
