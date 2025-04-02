"use client";

import * as React from "react";
import { BadgeCheck } from "lucide-react";
import NumberFlow from "@number-flow/react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { PrimaryCard } from "../ui/card";
import { InteractiveHoverButton } from "../interactive-hover-button";
import { motion } from "framer-motion";
import { setCursorType } from "@/state/slices/cursorSlice";
import { useAppDispatch } from "@/hooks/redux-hooks";

export interface PricingTier {
  name: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;
  const dispatch = useAppDispatch();

  return (
    <PrimaryCard
      className={cn(
        "relative flex flex-col gap-2 md:gap-5  overflow-hidden py-6 p-4 w-fit h-96",
        isHighlighted
          ? "bg-foreground text-background"
          : "bg-background text-foreground",
        isPopular && "ring-4 ring-cardinal border-none"
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      <h2
        className={cn(
          "flex items-center gap-3 text-3xl font-medium capitalize",
          isHighlighted ? "text-background" : "text-foreground"
        )}
      >
        {tier.name}
        {isPopular && (
          <Badge variant="secondary">
            <p className="text-black text-[8px] font-normal md:text-sm">
              🔥 Popular
            </p>
          </Badge>
        )}
      </h2>

      <div className="relative h-12">
        {typeof price === "number" ? (
          <>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">
                From
                <NumberFlow
                  format={{
                    style: "currency",
                    currency: "IDR",
                    trailingZeroDisplay: "stripIfInteger",
                  }}
                  value={price + 200000}
                  className="text-xs text-muted-foreground ml-1"
                />
              </p>
              <NumberFlow
                format={{
                  style: "currency",
                  currency: "IDR",
                  trailingZeroDisplay: "stripIfInteger",
                }}
                value={price}
                className="text-xl md:text-3xl -mt-2 font-medium"
              />
            </div>
          </>
        ) : (
          <>
            <p className=" text-xs text-background">Build your own</p>
            <h2 className="font-medium -mt-2">{price}</h2>
          </>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <p
          className={cn(
            "font-normal",
            isHighlighted ? "text-background" : "text-foreground"
          )}
        >
          {tier.description}
        </p>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className={cn(
                "flex items-center gap-2 text-xs font-medium",
                isHighlighted ? "text-background" : "text-muted-foreground"
              )}
            >
              <BadgeCheck className="h-4 w-4" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <InteractiveHoverButton
        text={tier.cta}
        className="w-full text-white bg-cardinal rounded-none"
        onMouseEnter={() => dispatch(setCursorType("link"))}
        onMouseLeave={() => dispatch(setCursorType("text"))}
      />
    </PrimaryCard>
  );
}

const HighlightedBackground = () => (
  <div className=" inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
);

const PopularBackground = () => (
  <div className=" inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
);
