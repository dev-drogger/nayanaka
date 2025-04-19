import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const NewAbout = () => {
  const groupRef = useRef(null);

  useGSAP(() => {
    const scrollTi = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".about",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        markers: true,
      },
    });

    scrollTi.from(
      groupRef.current,

      { scale: 1.5, ease: "power2.out" }
    );
  });

  return (
    <section className="about bg-cardinal">
      <div className="min-w-screen h-[20vh] md:h-[50vh] relative flex-center items-start overflow-visible">
        <div className="absolute w-[200vw] flex-center">
          <h1 className="text-[135px] md:text-[400px]">ABOUT US</h1>
        </div>
      </div>

      <div ref={groupRef} className=" flex-center ">
        <div className="bg-jet h-[60vh] w-[80vw] flex-center px-8 justify-start">
          <p className="text-2xl md:text-5xl mb-6 text-white text-justify">
            Nayanaka Creative Studio is a dynamic collective of designers,
            developers, and strategists, united by a shared passion for creating
            exceptional digital experiences. We seamlessly blend creativity with
            functionality, crafting websites that are not only visually
            captivating but also strategically designed to drive meaningful
            results.
          </p>
        </div>
      </div>
    </section>
  );
};
