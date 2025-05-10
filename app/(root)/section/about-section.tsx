import { TextEffect } from "@/components/text-effect";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="about" className="relative flex-center">
      <div className="flex-center">
        {/* <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[135px] md:text-[20rem] text-black">ABOUT US</h1>
        </motion.div> */}

        <div className="bg-jet h-[55vh] w-[75vw] flex-center px-8" ref={ref}>
          <TextEffect
            per="char"
            preset="slide"
            trigger={inView}
            delay={2.5}
            className="text-2xl md:text-5xl text-white text-justify"
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, y: 10, rotateX: 90 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.2 },
                },
              },
            }}
          >
            {`Nayanaka Creative Studio is a dynamic collective
of designers, developers, and strategists, united by
a shared passion for creating exceptional digital 
experiences. We seamlessly blend creativity with
functionality, crafting websites that are not only 
visually captivating but also strategically designed 
to drive meaningful results.`}
          </TextEffect>
          <p className="text-2xl md:text-5xl text-white text-justify"></p>
        </div>
      </div>
    </section>
  );
}
