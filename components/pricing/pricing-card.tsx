"use client";

import * as React from "react";
import { BadgeCheck } from "lucide-react";
import NumberFlow from "@number-flow/react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { PrimaryCard } from "../ui/card";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
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
        "relative flex flex-col gap-3 sm:gap-4 lg:gap-5 overflow-hidden",
        "p-4 lg:p-5 w-full mx-auto",
        "min-h-[420px] lg::h-full", // Ensure consistent height
        isHighlighted
          ? "bg-foreground text-background"
          : "bg-background text-foreground",
        isPopular && "ring-2 sm:ring-4 ring-gold border-none"
      )}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start">
          <h2
            className={cn(
              "text-lg sm:text-xl lg:text-2xl lg:text-3xl font-medium capitalize leading-tight",
              isHighlighted ? "text-background" : "text-foreground"
            )}
          >
            {tier.name}
          </h2>
          {isPopular && (
            <Badge variant="secondary" className="ml-2 mt-2 shrink-0 px-2 py-1">
              <span className="text-black text-[10px] sm:text-xs font-normal whitespace-nowrap">
                🔥 Popular
              </span>
            </Badge>
          )}
        </div>
      </div>

      {/* Price Section */}
      <div className="py-2 sm:py-3 lg:py-0">
        {typeof price === "number" ? (
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-muted-foreground text-xs sm:text-sm">
                From
              </span>
              <NumberFlow
                format={{
                  style: "currency",
                  currency: "IDR",
                  trailingZeroDisplay: "stripIfInteger",
                }}
                value={price + 200000}
                className="text-xs sm:text-sm text-muted-foreground line-through"
              />
            </div>
            <NumberFlow
              format={{
                style: "currency",
                currency: "IDR",
                trailingZeroDisplay: "stripIfInteger",
                
              }}
              value={price}
              className="text-xl sm:text-2xl lg:text-[1.7rem] font-medium leading-none"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-background">Build your own</p>
            <h2 className="font-medium text-lg sm:text-xl lg:text-2xl leading-tight">
              {price}
            </h2>
          </div>
        )}
      </div>

      {/* Description and Features */}
      <div className="flex-1 space-y-3 sm:space-y-4">
        <p
          className={cn(
            "font-normal text-xs sm:text-sm lg:text-base leading-relaxed",
            isHighlighted ? "text-background" : "text-foreground"
          )}
        >
          {tier.description}
        </p>

        <ul className="space-y-2 sm:space-y-3">
          {tier.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className={cn(
                "flex items-start gap-2 text-xs sm:text-sm font-medium leading-relaxed",
                isHighlighted ? "text-background" : "text-muted-foreground"
              )}
            >
              <BadgeCheck className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
              <span className="break-words">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-3 sm:pt-4">
        <InteractiveHoverButton
          text={tier.cta}
          className={cn(
            "w-full text-white bg-jet rounded-none",
            "py-2.5 sm:py-3 lg:py-4",
            "text-sm sm:text-base font-medium",
            "min-h-[44px]" // Ensure touch-friendly button height
          )}
          onMouseEnter={() => dispatch(setCursorType("link"))}
          onMouseLeave={() => dispatch(setCursorType("text"))}
        />
      </div>
    </PrimaryCard>
  );
}
