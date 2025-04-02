"use client";

import * as React from "react";
import {
  PricingCard,
  type PricingTier,
} from "@/components/pricing/pricing-card";
import { Tab } from "@/components/pricing/pricing-tab";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";

interface PricingSectionProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  frequencies: string[];
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0]
  );
  const dispatch = useAppDispatch();

  return (
    <section className="flex-row-center min-h-screen gap-10 py-4">
      <motion.div
        className="space-y-7 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="space-y-4">
          <h1 className="font-medium text-8xl">{title}</h1>
          <p className="text-white">{subtitle}</p>
        </div>
        <div className="mx-auto flex w-fit rounded-full bg-muted p-1">
          {frequencies.map((freq) => (
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

      <motion.div
        className="grid w-full px-4 max-w-6xl gap-6 grid-cols-2 xl:grid-cols-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        onMouseEnter={() => dispatch(setCursorType("text"))}
        onMouseLeave={() => dispatch(setCursorType("default"))}
      >
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
          />
        ))}
      </motion.div>
    </section>
  );
}
