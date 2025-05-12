"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setMenuOpen } from "@/state/slices/navigationSlice";
import { setCursorType } from "@/state/slices/cursorSlice";
import { store } from "@/state/redux";
import { Provider } from "react-redux";

function Page() {
  const dispatch = useAppDispatch();
  const { menuOpen } = useAppSelector((state) => state.navigation);

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
      <header className="fixed top-0 left-0 right-0 z-49 mix-blend-difference">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 10.9 }}
          className="container mx-auto px-10 flex justify-between items-center py-4"
        >
          <Link
            href="/"
            className="text-xl text-white tracking-tighter font-bold"
            onMouseEnter={handleCursorEnter}
            onMouseLeave={handleCursorLeave}
          >
            <div className="flex-center gap-10">
              <div>
                <h2>Nayanaka</h2>
                <p> なやなか</p>
              </div>

              <div className="hidden lg:flex">
                <h3>Creative Studio</h3>
              </div>
              <h3></h3>
            </div>
          </Link>

          <div className="hidden lg:flex space-x-8">
            {[
              "hero",
              "about",
              "services",
              "projects",
              "pricing",
              "contact",
            ].map((section, index) => (
              <motion.a
                key={index}
                href={`#${section}`}
                className={`text-lg font-bold uppercase text-white tracking-widest`}
                onMouseEnter={handleCursorEnter}
                onMouseLeave={handleCursorLeave}
                whileHover={{ scale: 1.1 }}
              >
                {section.toUpperCase()}
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-49 flex items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="text-center text-white">
              <ul className="space-y-8">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About", href: "#about" },
                  { name: "Services", href: "#services" },
                  { name: "Projects", href: "#projects" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Contact", href: "#contact" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ delay: index * 0.3 }}
                    whileHover="hover"
                    animate="initial"
                    // animate={{
                    //   y: activeSection === section ? -5 : 0,
                    //   opacity: activeSection === section ? 1 : 0.5,
                    // }}
                    variants={{
                      initial: { y: 0, opacity: 1 },
                      hover: {
                        x: [0, -2, 2, -2, 2, 0],
                        y: [0, 2, -2, 2, -2, 0],
                        transition: {
                          duration: 0.3,
                        },
                      },
                    }}
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

export default function Navigation() {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}
