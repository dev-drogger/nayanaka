import { TextEffect } from "@/components/ui/text-effect";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="about" className="flex-center py-0 px-6 h-[100vh] w-screen">
      <div className="h-full w-full">
        <div className="w-full h-screen flex-center">
          <motion.div
            className="bg-jet h-[35vh] lg:h-[55vh] w-full lg:w-[75vw] flex-center"
            ref={ref}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
