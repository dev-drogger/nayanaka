"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { SERVICES } from "@/constant";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  const headingAnimationRef = useRef(null);

  const headingTl = useRef<gsap.core.Timeline>(null);
  const cardTl = useRef<gsap.core.Timeline>(null);
  const listTl = useRef<gsap.core.Timeline>(null);

  const dispatch = useAppDispatch();

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "top-=500 center",
          end: "top-=150 center",
          scrub: 0.5,
          id: "services-bg",
        },
      })
      .fromTo(
        "body",
        { backgroundColor: "#E5E7EB" },
        { backgroundColor: "#2E2E2E", overwrite: "auto" },
      );

    headingTl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "top center",
          end: "top center",
          scrub: 0.5,
          id: "services-heading",
        },
      })
      .fromTo(
        headingAnimationRef,
        { opacity: 0, y: 50, duration: 0.6 },
        { opacity: 1, y: 0, ease: "circ.inOut" },
      );

    cardTl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "start+=70 center",
          end: "bottom bottom+=120",
          scrub: 0.5,
          id: "services-card",
        },
      })
      .fromTo(
        ".card-animation",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "circ.inOut",
          stagger: 0.2,
        },
      );
    listTl.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".services",
          start: "start+=55 center",
          end: "bottom bottom+=90",
          scrub: 0.5,
          id: "services-list",
        },
      })
      .fromTo(
        ".list-animation",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "circ.inOut",
          stagger: 0.2,
        },
      );
  }, [isContentVisible]);

  return (
    <section id="services" className="services w-screen" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div
          className="mb-16"
          ref={headingAnimationRef}
          style={{
            willChange: "opacity, transform",
            transform: "translateZ(0)",
          }}
        >
          <h2 className="text-6xl lg:text-8xl font-bold uppercase tracking-tighter">
            Our
            <br />
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="card-animation border-t border-white/20 pt-8 pb-16"
              onMouseEnter={() => dispatch(setCursorType("text"))}
              onMouseLeave={() => dispatch(setCursorType("default"))}
            >
              <h3 className="text-4xl font-bold mb-4">{service.title}</h3>
              <p className="text-lg mb-8 max-w-md">{service.description}</p>
              <ul className="space-y-2">
                {service.services.map((item, i) => (
                  <li
                    key={i}
                    className="list-animation flex items-center gap-2"
                  >
                    <div className="h-1 w-1 bg-white rounded-full"></div>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
