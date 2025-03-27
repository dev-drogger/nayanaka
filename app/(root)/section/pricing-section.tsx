import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Pricing({
  setCursorType,
}: {
  setCursorType: (type: string) => void;
}) {
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
