"use client";

import { SERVICES } from "@/constant";
import { ArrowUpRight, Plus } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import useServiceAnimation from "@/hooks/animation/use-service-animation";
import Kanji from "@/components/kanji";

const Services = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    overlayRefs,
    plusRefs,
    nayanakaRef,
    textRefs,
    titleRef,
    handleMouseEnter,
    handleMouseLeave,
  } = useServiceAnimation();

  return (
    <section
      id="services-section"
      className="h-screen bg-jet relative py-20 overflow-x-hidden grid grid-rows-12"
    >
      {!isMobile &&
        [
          "top-20 left-10",
          "top-20 right-10",
          "bottom-20 right-10",
          "bottom-20 left-10",
        ].map((pos, i) => (
          <div
            key={i}
            ref={(el) => {
              plusRefs.current[i] = el;
            }}
            className={`absolute ${pos}`}
          >
            <Plus color="#fff" size={50} />
          </div>
        ))}

      <div className="row-span-6 w-full grid grid-cols-12 container mx-auto px-4">
        <div
          className="col-span-8 md:col-span-7 flex-col-center"
          ref={titleRef}
        >
          <h1 className="text-7xl md:text-8xl font-amie">WHAT</h1>
          <h1 className="italic font-primary font-light text-7xl md:text-8xl">
            WE DO
          </h1>
        </div>

        <div className="col-span-5 col-start-6 md:col-span-4 md:col-start-7 flex-center">
          <h2 id="desc" className="text-justify text-sm md:text-lg">
            We design and build distinctive online solutions that help
            businesses and individuals grow, connect, and make a lasting
            impression.
          </h2>
        </div>
      </div>

      <div className="row-span-6 grid grid-cols-12  w-full">
        <div className="col-span-12 md:col-span-7 w-full relative flex flex-col px-6 md:px-0  md:pl-64 items-start justify-start pt-10 md:justify-center font-light z-5">
          {SERVICES.map((project, index) => (
            <div
              key={index}
              id="service-list"
              className="relative w-full flex flex-col gap-1  cursor-pointer group md:gap-8"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* overlay */}
              <div
                ref={(el) => {
                  overlayRefs.current[index] = el;
                }}
                className="absolute inset-0 hidden md:block duration-200 bg-gray-200 -z-10 clip-path"
              />

              {/* title */}
              <div className="flex justify-between text-white transition-all duration-500 md:group-hover:px-4 md:group-hover:text-black">
                <h2 className="lg:text-[26px] text-[18px] font-medium font-amie uppercase md:group-hover:text-black transition-all duration-500">
                  {project.title}
                </h2>
                <ArrowUpRight
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="md:size-6 size-5"
                />
              </div>
            </div>
          ))}
        </div>

        <Kanji nayanakaRef={nayanakaRef} isMobile={isMobile} />
      </div>
    </section>
  );
};

export default Services;
