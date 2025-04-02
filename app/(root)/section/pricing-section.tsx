"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";

import { PRICING_TIERS } from "@/constant";
import { PricingCard } from "@/components/pricing/pricing-card";
import { Tab } from "@/components/pricing/pricing-tab";
import { useState } from "react";

export const PAYMENT_FREQUENCIES = ["1 years", "2 years"];

export default function Pricing() {
  const [selectedFrequency, setSelectedFrequency] = useState(
    PAYMENT_FREQUENCIES[0]
  );
  const dispatch = useAppDispatch();

  return (
    <section
      id="pricing"
      className="relative min-h-screen w-full mb-12 md:mb-0"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          <motion.div
            className="space-y-7 grid mb-16 grid-cols-1 col-span-12 lg:col-span-5 flex-center "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h1 className="font-medium text-8xl">PRICING</h1>
              <p className="text-white">Choose the best plan for your needs</p>
            </div>
            <div className=" flex w-fit rounded-full bg-muted p-1">
              {PAYMENT_FREQUENCIES.map((freq) => (
                <Tab
                  key={freq}
                  text={freq}
                  selected={selectedFrequency === freq}
                  setSelected={setSelectedFrequency}
                  discount={freq === "2 years"}
                />
              ))}
            </div>
          </motion.div>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-2 gap-6">
              {PRICING_TIERS.map((tier) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onMouseEnter={() => dispatch(setCursorType("text"))}
                  onMouseLeave={() => dispatch(setCursorType("default"))}
                >
                  <PricingCard
                    key={tier.name}
                    tier={tier}
                    paymentFrequency={selectedFrequency}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
