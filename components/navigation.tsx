"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setMenuOpen } from "@/state/slices/navigationSlice";
import { setCursorType } from "@/state/slices/cursorSlice";
import { TextEffect } from "./text-effect";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const { menuOpen, activeSection } = useAppSelector(
    (state) => state.navigation
  );

  const handleCursorEnter = () => {
    dispatch(setCursorType("link"));
  };

  const handleCursorLeave = () => {
    dispatch(setCursorType("default"));
  };

  const toggleMenu = () => {
    dispatch(setMenuOpen(!menuOpen));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto flex justify-between items-center py-6">
          <Link
            href="/"
            className="text-xl text-white tracking-tighter font-bold"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex-row-center gap-14">
                <motion.div className="w-auto">
                  <TextEffect
                    per="char"
                    preset="blur"
                    className="text-2xl md:text-4xl text-white font-light"
                    delay={3}
                  >
                    Nayanaka
                  </TextEffect>

                  <TextEffect
                    per="char"
                    preset="blur"
                    className="text-sm md:text-lg text-white"
                    delay={3}
                  >
                    なやなか
                  </TextEffect>
                </motion.div>
                <div className="w-auto">
                  <TextEffect
                    per="char"
                    preset="fade"
                    delay={4}
                    className="text-lg font-light"
                  >
                    Creative Studio
                  </TextEffect>
                </div>
              </div>
            </motion.div>
          </Link>

          <div className="hidden md:flex space-x-8">
            {["hero", "about", "services", "pricing", "contact"].map(
              (section, index) => (
                <motion.a
                  key={index}
                  href={`#${section}`}
                  className={`text-sm uppercase text-white tracking-widest ${
                    activeSection === section ? "opacity-100" : "opacity-50"
                  }`}
                  onMouseEnter={handleCursorEnter}
                  onMouseLeave={handleCursorLeave}
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
            onClick={toggleMenu}
            className="z-50 md:hidden"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
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
                      onClick={() => dispatch(setMenuOpen(false))}
                      onMouseEnter={handleCursorEnter}
                      onMouseLeave={handleCursorLeave}
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
