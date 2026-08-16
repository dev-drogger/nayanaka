"use client";

import { memo, useCallback, useRef } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

function Navigation() {
  const dispatch = useAppDispatch();
  const [showNavbar, setShowNavbar] = useState(true);

  const handleCursorEnter = useCallback(() => {
    dispatch(setCursorType("link"));
  }, [dispatch]);

  const handleCursorLeave = useCallback(() => {
    dispatch(setCursorType("default"));
  }, [dispatch]);

  const lastScrollY = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setShowNavbar(
          currentScrollY <= lastScrollY.current || currentScrollY < 10,
        );
        lastScrollY.current = currentScrollY; // mutate ref, not closure
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference transition-all duration-300"
        style={showNavbar ? { opacity: 1 } : { opacity: 0 }}
      >
        <div className="container mx-auto px-10 flex-center py-4">
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
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}

export default memo(Navigation);
