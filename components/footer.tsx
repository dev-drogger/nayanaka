import { motion } from "framer-motion";

export default function Footer({
  setCursorType,
}: {
  setCursorType: (type: string) => void;
}) {
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
