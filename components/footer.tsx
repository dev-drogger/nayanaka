"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { InfiniteSlider } from "./ui/infinite-slider";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const sliderRef = useRef(null);
  const textRef = useRef(null);
  const animationTimeline = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    animationTimeline.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top center",
        },
      })
      .from(".text", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      })
      .fromTo(
        sliderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power4.out" },
      );

    return () => {
      if (animationTimeline.current) {
        animationTimeline.current.scrollTrigger?.kill();
        animationTimeline.current.kill();
        animationTimeline.current = null;
      }
    };
  }, []);

  const dispatch = useAppDispatch();

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full text-black bg-gray-200 h-[88vh]"
    >
      <div className="container mx-auto px-4">
        <div
          ref={textRef}
          className="mb-[11rem] py-[2.5rem] lg:mb-[12rem] lg:py-[4rem] grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-4"
        >
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text text-6xl text-black lg:text-8xl font-bold uppercase tracking-tighter mb-4 lg:mb-8">
              Let&apos;s
              <br />
              Connect
            </h2>
            <p className="text text-lg max-w-md text-black">
              Ready to start your next project? Get in touch with us to discuss
              how we can help bring your vision to life.
            </p>
          </div>

          <div className="space-y-4 lg:space-y-8 col-span-1 ">
            <div
              className="border-t border-black/20 pt-4 text"
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <p className="text-sm text-black">Email</p>

              <a
                href="mailto:hello@nayanaka.com"
                className="text-xl hover:underline"
                onMouseEnter={() => dispatch(setCursorType("link"))}
                onMouseLeave={() => dispatch(setCursorType("text"))}
              >
                hello@nayanaka.com
              </a>
            </div>
            <div
              className="not-first:border-t border-black/20 pt-4 text"
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <p className="text-sm text-black">Phone</p>

              <a
                href="tel:+1234567890"
                className="text-xl hover:underline"
                onMouseEnter={() => dispatch(setCursorType("link"))}
                onMouseLeave={() => dispatch(setCursorType("text"))}
              >
                +1 (234) 567-890
              </a>
            </div>
            <div
              className="border-t border-black/20 pt-4 text"
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <p className="text-sm text-black">Follow</p>
              <div className="flex gap-4 mt-2">
                {["Instagram", "Twitter", "LinkedIn"].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:underline"
                    onMouseEnter={() => dispatch(setCursorType("link"))}
                    onMouseLeave={() => dispatch(setCursorType("text"))}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="footer"
        ref={sliderRef}
        className="absolute uppercase overflow-hidden bottom-30 lg:bottom-40 text-white text-xl w-screen flex-row-center"
      >
        <InfiniteSlider
          duration={60}
          className=" text-5xl md:text-8xl text-black w-full"
        >
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
          <div>なやなか -</div>
        </InfiniteSlider>
      </div>

      <div className="absolute bottom-0 w-full p-4 flex flex-col lg:flex-row justify-between items-center">
        <p className="text-sm text-black/60">
          © 2025 Nayanaka Creative Studio. All rights reserved.
        </p>
        <div className="flex gap-8 mt-4 lg:mt-0">
          <a
            href="#"
            className="text-sm hover:underline"
            onMouseEnter={() => dispatch(setCursorType("link"))}
            onMouseLeave={() => dispatch(setCursorType("default"))}
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="text-sm hover:underline"
            onMouseEnter={() => dispatch(setCursorType("link"))}
            onMouseLeave={() => dispatch(setCursorType("default"))}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
