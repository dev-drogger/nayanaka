import FloatingObjects from "@/components/FloatingObjects";
import TextGeometry from "@/components/TextGeometry";
import { useScroll, useTransform, motion } from "framer-motion";
import { Link, ArrowRight } from "lucide-react";
import { useRef, Suspense } from "react";

export default function Hero({
  setCursorType,
}: {
  setCursorType: (type: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center pt-32 pb-16"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <FloatingObjects />
        </Suspense>
      </div>

      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-[40vw] font-bold text-white/5 leading-none tracking-tighter">
            N
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[30vh] md:h-[40vh] mb-8">
                <Suspense
                  fallback={<div className="h-full w-full bg-white/5"></div>}
                >
                  <TextGeometry />
                </Suspense>
              </div>

              <motion.div
                className="mt-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-lg md:text-xl">
                  We create digital experiences that blend art, technology, and
                  strategy.
                </p>
              </motion.div>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-6 md:pl-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className="aspect-square overflow-hidden"
                onMouseEnter={() => setCursorType("3d")}
                onMouseLeave={() => setCursorType("default")}
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
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onMouseEnter={() => setCursorType("text")}
                onMouseLeave={() => setCursorType("default")}
              >
                <p className="text-sm">
                  Nayanaka is a creative studio founded in 2018, specializing in
                  digital design and development.
                </p>
                <div className="mt-4 flex justify-end">
                  <Link
                    href="#about"
                    className="flex items-center gap-2 text-sm uppercase tracking-widest"
                    onMouseEnter={() => setCursorType("link")}
                    onMouseLeave={() => setCursorType("text")}
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="mt-32 overflow-hidden">
          <div className="w-[200%] flex animate-marquee">
            <div className="text-[150px] whitespace-nowrap font-bold opacity-10 tracking-tighter">
              DESIGN • DEVELOPMENT • STRATEGY • EXPERIENCE •
            </div>
            <div className="text-[150px] whitespace-nowrap font-bold opacity-10 tracking-tighter">
              DESIGN • DEVELOPMENT • STRATEGY • EXPERIENCE •
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
