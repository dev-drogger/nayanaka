"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X, MousePointer } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import 3D components to avoid SSR issues
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });
const FloatingObjects = dynamic(() => import("@/components/FloatingObjects"), {
  ssr: false,
});
const TextGeometry = dynamic(() => import("@/components/TextGeometry"), {
  ssr: false,
});
const BackgroundShader = dynamic(
  () => import("@/components/BackgroundShader"),
  { ssr: false }
);

export default function page() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState("default");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const prevPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Calculate mouse speed for effects
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      setMouseSpeed(speed);
      prevPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      const sections = ["hero", "about", "services", "pricing", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Simulate loading assets
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const getCursorClasses = () => {
    switch (cursorType) {
      case "link":
        return "w-20 h-20 bg-white rounded-full mix-blend-difference flex items-center justify-center";
      case "text":
        return "w-4 h-16 bg-white mix-blend-difference";
      case "3d":
        return "w-16 h-16 border-2 border-white rounded-full mix-blend-difference flex items-center justify-center";
      default:
        return `w-4 h-4 bg-white rounded-full mix-blend-difference transition-all duration-300 ${
          mouseSpeed > 10 ? "scale-150 opacity-50" : ""
        }`;
    }
  };

  return (
    <main className="min-h-screen w-full bg-black overflow-x-hidden font-sans">
      {/* Custom cursor */}
      <motion.div
        className={`fixed pointer-events-none z-50 transition-all duration-200 hidden md:flex items-center justify-center ${getCursorClasses()}`}
        animate={{
          x: cursorPos.x,
          y: cursorPos.y,
          scale: mouseSpeed > 15 ? 1.5 : 1,
          opacity: mouseSpeed > 15 ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {cursorType === "link" && (
          <span className="text-black text-xs uppercase tracking-widest">
            View
          </span>
        )}
        {cursorType === "3d" && <MousePointer className="h-4 w-4" />}
      </motion.div>

      {/* 3D Background for entire site */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <BackgroundShader />
        </Suspense>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              setCursorType={setCursorType}
              activeSection={activeSection}
            />

            <div
              className={`transition-all duration-700 ${
                menuOpen ? "opacity-20 blur-sm" : "opacity-100"
              }`}
            >
              <Hero setCursorType={setCursorType} />
              <About setCursorType={setCursorType} />
              <Services setCursorType={setCursorType} />
              <Pricing setCursorType={setCursorType} />
              <Footer setCursorType={setCursorType} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="h-screen w-full flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative h-full w-full">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-[20vw] font-bold text-white leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              NAYA
            </motion.div>
            <motion.div
              className="text-[20vw] font-bold text-white leading-none tracking-tighter"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              NAKA
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function Navigation({
  menuOpen,
  setMenuOpen,
  setCursorType,
  activeSection,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setCursorType: (type: string) => void;
  activeSection: string;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto flex justify-between items-center py-6">
          <Link
            href="/"
            className="text-xl uppercase tracking-tighter font-bold"
            onMouseEnter={() => setCursorType("link")}
            onMouseLeave={() => setCursorType("default")}
          >
            Nayanaka
          </Link>

          <div className="hidden md:flex space-x-8">
            {["hero", "about", "services", "pricing", "contact"].map(
              (section, index) => (
                <motion.a
                  key={index}
                  href={`#${section}`}
                  className={`text-sm uppercase tracking-widest ${
                    activeSection === section ? "opacity-100" : "opacity-50"
                  }`}
                  onMouseEnter={() => setCursorType("link")}
                  onMouseLeave={() => setCursorType("default")}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: activeSection === section ? -5 : 0,
                    opacity: activeSection === section ? 1 : 0.5,
                  }}
                >
                  {section === "hero"
                    ? "Home"
                    : section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.a>
              )
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50 md:hidden"
            onMouseEnter={() => setCursorType("link")}
            onMouseLeave={() => setCursorType("default")}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="text-center">
              <ul className="space-y-8">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About", href: "#about" },
                  { name: "Services", href: "#services" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Contact", href: "#contact" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-7xl md:text-9xl font-bold uppercase tracking-tighter hover:italic transition-all"
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setCursorType("link")}
                      onMouseLeave={() => setCursorType("default")}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero({ setCursorType }: { setCursorType: (type: string) => void }) {
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

function About({ setCursorType }: { setCursorType: (type: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center py-32"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <motion.div
              className="sticky top-32"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => setCursorType("text")}
              onMouseLeave={() => setCursorType("default")}
            >
              <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8">
                About
                <br />
                Us
              </h2>
              <p className="text-lg mb-6">
                Nayanaka Creative Studio is a collective of designers,
                developers, and strategists passionate about crafting memorable
                digital experiences.
              </p>
              <p className="text-lg mb-6">
                We blend aesthetics with functionality to create websites that
                not only look stunning but also deliver results.
              </p>
              <div className="mt-8">
                <Button
                  className="bg-white text-black hover:bg-white/90 text-sm uppercase tracking-widest"
                  onMouseEnter={() => setCursorType("link")}
                  onMouseLeave={() => setCursorType("text")}
                >
                  Our Process
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-7 order-1 md:order-2 mb-8 md:mb-0">
            <div className="space-y-32">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="relative"
                  style={{ y: y }}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div
                    className="aspect-[4/3] overflow-hidden"
                    onMouseEnter={() => setCursorType("3d")}
                    onMouseLeave={() => setCursorType("default")}
                  >
                    <Image
                      src={`/placeholder.svg?height=800&width=1000&text=Project${item}`}
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
                      onMouseEnter={() => setCursorType("link")}
                      onMouseLeave={() => setCursorType("default")}
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

function Services({
  setCursorType,
}: {
  setCursorType: (type: string) => void;
}) {
  return (
    <section id="services" className="relative min-h-screen w-full py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
            Our
            <br />
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Digital Design",
              description:
                "We create visually stunning and functional designs that elevate your brand and engage your audience.",
              services: [
                "UI/UX Design",
                "Brand Identity",
                "Motion Design",
                "Art Direction",
              ],
            },
            {
              title: "Development",
              description:
                "Our development team builds robust, scalable, and performant websites and applications.",
              services: [
                "Frontend Development",
                "Backend Systems",
                "E-commerce",
                "CMS Integration",
              ],
            },
            {
              title: "Strategy",
              description:
                "We develop comprehensive strategies that align with your business goals and drive results.",
              services: [
                "Digital Strategy",
                "Content Strategy",
                "SEO & Analytics",
                "User Research",
              ],
            },
            {
              title: "Production",
              description:
                "From concept to launch, we manage the entire production process to ensure quality and efficiency.",
              services: [
                "Project Management",
                "Quality Assurance",
                "Performance Optimization",
                "Maintenance",
              ],
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="border-t border-white/20 pt-8 pb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setCursorType("text")}
              onMouseLeave={() => setCursorType("default")}
            >
              <motion.h3
                className="text-4xl font-bold mb-4"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.title}
              </motion.h3>
              <p className="text-lg mb-8 max-w-md">{service.description}</p>
              <ul className="space-y-2">
                {service.services.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing({ setCursorType }: { setCursorType: (type: string) => void }) {
  return (
    <section
      id="pricing"
      className="relative min-h-screen w-full py-32 bg-white text-black"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter">
            Pricing
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Essential",
              price: "$3,600",
              description:
                "Perfect for small businesses looking to establish their digital presence.",
              features: [
                "Custom design (5 sections)",
                "Responsive development",
                "Basic SEO setup",
                "1 month of support",
              ],
            },
            {
              name: "Professional",
              price: "$7,200",
              description:
                "Comprehensive solution for growing businesses with specific requirements.",
              features: [
                "Advanced design (up to 10 sections)",
                "Complex animations and interactions",
                "Advanced SEO optimization",
                "CMS integration",
                "3 months of support",
              ],
              featured: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              description:
                "Tailored solutions for established businesses with complex needs.",
              features: [
                "Premium design (unlimited sections)",
                "Custom functionality",
                "Full-scale SEO strategy",
                "Custom integrations",
                "6 months of support",
              ],
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 ${
                plan.featured
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setCursorType("text")}
              onMouseLeave={() => setCursorType("default")}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.name !== "Enterprise" && (
                  <span className="text-sm mb-1">/ project</span>
                )}
              </div>
              <p className="text-sm mb-6">{plan.description}</p>
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 h-1 w-1 rounded-full bg-current"></div>
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto">
                <Button
                  className={`w-full ${
                    plan.featured
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/90"
                  } text-sm uppercase tracking-widest`}
                  onMouseEnter={() => setCursorType("link")}
                  onMouseLeave={() => setCursorType("text")}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ setCursorType }: { setCursorType: (type: string) => void }) {
  return (
    <footer id="contact" className="relative w-full py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <motion.h2
              className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Let's
              <br />
              Connect
            </motion.h2>
            <motion.p
              className="text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to start your next project? Get in touch with us to discuss
              how we can help bring your vision to life.
            </motion.p>
          </div>
          <div className="space-y-8">
            <motion.div
              className="border-t border-white/20 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onMouseEnter={() => setCursorType("text")}
              onMouseLeave={() => setCursorType("default")}
            >
              <p className="text-sm text-white/60">Email</p>
              <a
                href="mailto:hello@nayanaka.com"
                className="text-xl hover:underline"
                onMouseEnter={() => setCursorType("link")}
                onMouseLeave={() => setCursorType("text")}
              >
                hello@nayanaka.com
              </a>
            </motion.div>
            <motion.div
              className="border-t border-white/20 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setCursorType("text")}
              onMouseLeave={() => setCursorType("default")}
            >
              <p className="text-sm text-white/60">Phone</p>
              <a
                href="tel:+1234567890"
                className="text-xl hover:underline"
                onMouseEnter={() => setCursorType("link")}
                onMouseLeave={() => setCursorType("text")}
              >
                +1 (234) 567-890
              </a>
            </motion.div>
            <motion.div
              className="border-t border-white/20 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              onMouseEnter={() => setCursorType("text")}
              onMouseLeave={() => setCursorType("default")}
            >
              <p className="text-sm text-white/60">Follow</p>
              <div className="flex gap-4 mt-2">
                {["Instagram", "Twitter", "LinkedIn", "Dribbble"].map(
                  (social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="hover:underline"
                      onMouseEnter={() => setCursorType("link")}
                      onMouseLeave={() => setCursorType("text")}
                    >
                      {social}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-32 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © 2025 Nayanaka Creative Studio. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm hover:underline"
              onMouseEnter={() => setCursorType("link")}
              onMouseLeave={() => setCursorType("default")}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm hover:underline"
              onMouseEnter={() => setCursorType("link")}
              onMouseLeave={() => setCursorType("default")}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
