"use client";

import { motion } from "framer-motion";
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
      className="relative w-screen bg-jet rounded-bl-[3rem] rounded-br-[3rem] lg:rounded-bl-[5rem] lg:rounded-br-[5rem] mb-12 lg:mb-0"
    >
      <div className="container mx-auto p-4 w-full">
        <motion.div
          className=" mb-16 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="font-medium text-8xl mb-8">PRICING</h1>
          <p className=" min-w-[50vw] lg:w-[30vw]">
            Create everything all in once with just a click. Whether you need a
            professional website or a beautiful digital invitation, we’ve got
            you covered. No coding needed! Simple, fast, and hassle-free.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row mb-10 items-center justify-between gap-10 lg:gap-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
            <p className="mb-6 text-4xl text-white font-medium">
              Web Development
            </p>
            <div className="flex w-fit rounded-full bg-muted p-1 mt-4">
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onMouseEnter={() => dispatch(setCursorType("text"))}
            onMouseLeave={() => dispatch(setCursorType("default"))}
            className="grid bg-red-500  col-span-10 lg:col-span-9 grid-cols-2 col-start-2 lg:grid-cols-4 gap-2 lg:gap-4 overflow-hidden"
          >
            {PRICING_TIERS.map((tier) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                paymentFrequency={selectedFrequency}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
