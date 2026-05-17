"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useUI } from "@/context/ui-context";
import { circInOut } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";

const MENU_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

function Navigation() {
  const { setCursorType, menuOpen, setMenuOpen } = useUI();
  const [showNavbar, setShowNavbar] = useState(true);

  const handleCursorEnter = useCallback(() => {
    setCursorType("link");
  }, [setCursorType]);

  const handleCursorLeave = useCallback(() => {
    setCursorType("default");
  }, [setCursorType]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [setMenuOpen, menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const containerVariants = {
    hidden: {
      y: -1000,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: circInOut,
      },
    },
    exit: {
      y: 1000,
      transition: {
        duration: 0.5,
        ease: circInOut,
        delay: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: circInOut,
      },
    }),
    exit: (index: number) => ({
      opacity: 0,
      y: 50,
      transition: {
        delay: index * 0.1,
        duration: 0.1,
        ease: circInOut,
      },
    }),
  };

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: circInOut,
      },
    },
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference transition-all duration-300"
        style={showNavbar ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          initial="hidden"
          animate={"visible"}
          exit={{ opacity: 0 }}
          variants={variants}
          className="container mx-auto px-10 flex justify-between items-center py-4"
        >
          <Link
            href="/"
            className="text-xl text-white cursor-pointer tracking-tighter font-bold"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            <div className="flex-center gap-10">
              <div>
                <h2 className="text-4xl">Nayanaka</h2>
                <p> なやなか</p>
              </div>

              <div className="hidden lg:flex">
                <h3>Creative Studio</h3>
              </div>
              <h3></h3>
            </div>
          </Link>

          <div className="hidden lg:flex space-x-8">
            {MENU_ITEMS.map((section, index) => (
              <motion.a
                key={index}
                href={`#${section.href}`}
                className={`text-lg cursor-pointer font-bold uppercase text-white tracking-widest`}
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
                whileHover={{ scale: 1.1 }}
              >
                {section.name.toUpperCase()}
              </motion.a>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="z-49 lg:hidden"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            {menuOpen ? (
              <X size={36} color="#ffffff" />
            ) : (
              <Menu size={36} color="#ffffff" />
            )}
          </button>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-10 flex items-center justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="text-center text-white">
              <ul className="space-y-8">
                {MENU_ITEMS.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className="text-7xl lg:text-9xl font-bold uppercase tracking-tighter hover:italic transition-all"
                      onClick={() => setMenuOpen(false)}
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

export default memo(Navigation);
