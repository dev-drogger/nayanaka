import { motion, AnimatePresence } from "framer-motion";
import { Link, X, Menu } from "lucide-react";

export default function Navigation({
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
