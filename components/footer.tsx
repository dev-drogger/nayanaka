"use client";

import { motion } from "framer-motion";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { InfiniteSlider } from "./ui/infinite-slider";

export default function Footer() {
  const dispatch = useAppDispatch();

  return (
    <footer
      id="contact"
      className="relative w-full text-black bg-gray-200 h-[85vh]"
    >
      <div className="container mx-auto px-4">
        <div className="mb-[11rem] py-[2.5rem] lg:mb-[12rem] lg:py-[4rem] grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-4">
          <div className="col-span-2 lg:col-span-1">
            <motion.h2
              className="text-6xl text-black lg:text-8xl font-bold uppercase tracking-tighter mb-4 lg:mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Let&apos;s
              <br />
              Connect
            </motion.h2>
            <motion.p
              className="text-lg max-w-md text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to start your next project? Get in touch with us to discuss
              how we can help bring your vision to life.
            </motion.p>
          </div>
          <div className="space-y-4 lg:space-y-8 col-span-1 ">
            <motion.div
              className="border-t border-black/20 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
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
            </motion.div>
            <motion.div
              className="border-t border-black/20 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
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
            </motion.div>
            <motion.div
              className="border-t border-black/20 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
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
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute uppercase bottom-30 lg:bottom-40 text-white text-xl w-screen flex-row-center">
        <InfiniteSlider
          reverse
          duration={60}
          className="text-8xl text-black w-full"
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

      <div className=" absolute bottom-0 w-full p-4 flex flex-col lg:flex-row justify-between items-center">
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
