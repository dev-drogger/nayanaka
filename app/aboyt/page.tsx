"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState("default");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading assets
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const getCursorClasses = () => {
    switch (cursorType) {
      case "link":
        return "w-20 h-20 bg-white rounded-full mix-blend-difference flex items-center justify-center";
      case "text":
        return "w-4 h-16 bg-white mix-blend-difference";
      default:
        return "w-4 h-4 bg-white rounded-full mix-blend-difference";
    }
  };

  return (
    <main className="min-h-screen w-full bg-black overflow-x-hidden font-sans">
      {/* Custom cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-300 hidden md:block ${getCursorClasses()}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {cursorType === "link" && (
          <span className="text-black text-xs uppercase tracking-widest">
            View
          </span>
        )}
      </div>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navigation
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setCursorType={setCursorType}
          />

          <div
            className={`transition-all duration-700 ${
              menuOpen ? "opacity-20" : "opacity-100"
            }`}
          >
            <Hero setCursorType={setCursorType} />
            <About setCursorType={setCursorType} />
            <Services setCursorType={setCursorType} />
            <Pricing setCursorType={setCursorType} />
            <Footer setCursorType={setCursorType} />
          </div>
        </>
      )}
    </main>
  );
}

function LoadingScreen() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
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
  );
}

function Navigation({
  menuOpen,
  setMenuOpen,
  setCursorType,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setCursorType: (type: string) => void;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto flex justify-between text-white items-center py-6">
          <Link
            href="/"
            className="text-xl uppercase tracking-tighter font-bold"
            onMouseEnter={() => setCursorType("link")}
            onMouseLeave={() => setCursorType("default")}
          >
            Nayanaka
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-50"
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

      <div
        className={`fixed inset-0 bg-black z-40 flex items-center justify-center transition-all duration-700 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="text-center">
          <ul className="space-y-8">
            {[
              { name: "Home", href: "#" },
              { name: "About", href: "#about" },
              { name: "Services", href: "#services" },
              { name: "Pricing", href: "#pricing" },
              { name: "Contact", href: "#contact" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-7xl md:text-9xl text-white font-bold uppercase tracking-tighter hover:italic transition-all"
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={() => setCursorType("link")}
                  onMouseLeave={() => setCursorType("default")}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
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
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center pt-32 pb-16"
    >
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[15vw] md:text-[10vw] font-bold leading-[0.8] uppercase tracking-tighter">
                Creative
                <br />
                Studio
              </h1>
              <div className="mt-4 pt-4">
                <p className="text-lg md:text-xl">
                  We create digital experiences that blend art, technology, and
                  strategy.
                </p>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-6 md:pl-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square overflow-hidden">
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
                animate={{ x: 0, opacity: 1 }}
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
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
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
                  <div className="aspect-[4/3] overflow-hidden">
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
              <h3 className="text-4xl font-bold mb-4">{service.title}</h3>
              <p className="text-lg mb-8 max-w-md">{service.description}</p>
              <ul className="space-y-2">
                {service.services.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                    <span>{item}</span>
                  </li>
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
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-1 w-1 rounded-full bg-current"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
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
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8">
              Let's
              <br />
              Connect
            </h2>
            <p className="text-lg max-w-md">
              Ready to start your next project? Get in touch with us to discuss
              how we can help bring your vision to life.
            </p>
          </div>
          <div className="space-y-8">
            <div
              className="border-t border-white/20 pt-4"
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
            </div>
            <div
              className="border-t border-white/20 pt-4"
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
            </div>
            <div
              className="border-t border-white/20 pt-4"
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
            </div>
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
