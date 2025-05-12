import { TextEffect } from "@/components/text-effect";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="about" className="flex-center py-0">
      <div className="h-full w-full">
        <div className="sticky top-10 w-full h-screen flex-center">
          <motion.div
            className="bg-jet px-8 h-[55vh] w-[75vw] sticky top-10 flex-center"
            ref={ref}
          >
            <TextEffect
              per="line"
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
                      staggerChildren: 0.25,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
