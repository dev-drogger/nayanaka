"use client";

import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";

import { PRICING_TIERS } from "@/constant";
import { PricingCard } from "@/components/pricing/pricing-card";
import { Tab } from "@/components/pricing/pricing-tab";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const PAYMENT_FREQUENCIES = ["1 years", "2 years"];

export default function Pricing() {
  const [selectedFrequency, setSelectedFrequency] = useState(
    PAYMENT_FREQUENCIES[0],
  );

  const titleAnimationRef = useRef(null);
  const cardAnimationRef = useRef(null);

  const titleTl = useRef<gsap.core.Timeline>(null);
  const cardTl = useRef<gsap.core.Timeline>(null);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    titleTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        titleAnimationRef,
        { opacity: 0, y: 50, duration: 0.6, ease: "circ.inOut" },
        { opacity: 1, y: 0, ease: "circ.inOut" },
      );
    cardTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        cardAnimationRef,
        { opacity: 0, y: 50, duration: 0.6, ease: "circ.inOut" },
        { opacity: 1, y: 0, ease: "circ.inOut" },
      );
  });

  const dispatch = useAppDispatch();

  return (
    <section
      id="pricing"
      className="relative w-screen bg-jet rounded-bl-[3rem] rounded-br-[3rem] lg:rounded-bl-[5rem] lg:rounded-br-[5rem] mb-12 lg:mb-0"
    >
      <div className="container mx-auto p-4 w-full">
        <div className=" mb-16 text-white" ref={titleAnimationRef}>
          <h1 className="font-medium text-8xl mb-8">PRICING</h1>
          <p className=" min-w-[50vw] lg:w-[30vw]">
            Create everything all in once with just a click. Whether you need a
            professional website or a beautiful digital invitation, we’ve got
            you covered. No coding needed! Simple, fast, and hassle-free.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row mb-10 items-center justify-between gap-10 lg:gap-2 overflow-hidden">
          <div className="w-[450px] flex flex-col items-center justify-center lg:justify-start">
            <p className="mb-6 text-4xl text-white font-medium text-center">
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

          <div
            ref={cardAnimationRef}
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
          </div>
        </div>
      </div>
    </section>
  );
}
