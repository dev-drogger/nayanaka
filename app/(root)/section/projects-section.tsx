import { InfiniteSlider } from "@/components/infinite-slider";
import React from "react";

export const Projects = () => {
  return (
    <section className="relative flex-center overflow-hidden">
      <InfiniteSlider
        reverse
        direction="vertical"
        duration={15}
        gap={230}
        className="absolute border-cardinal border-2 -top-100 left-185 h-[120%] w-[80px] -rotate-45 flex-center text-5xl"
      >
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
      </InfiniteSlider>
      <InfiniteSlider
        reverse
        direction="vertical"
        duration={15}
        gap={230}
        className="absolute border-cardinal border-2 -bottom-40 left-10 h-[30%] w-[80px] -rotate-45 flex-center text-5xl"
      >
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
      </InfiniteSlider>
      <InfiniteSlider
        reverse
        direction="vertical"
        duration={15}
        gap={230}
        className="absolute border-cardinal border-2 -top-40 right-10 h-[30%] w-[80px] -rotate-45 flex-center text-5xl"
      >
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
      </InfiniteSlider>
      <InfiniteSlider
        direction="vertical"
        duration={14}
        gap={230}
        className="absolute border-cardinal border-2 -top-70 right-115 h-[70%] w-[80px] -rotate-45 flex-center text-5xl"
      >
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
      </InfiniteSlider>
      <InfiniteSlider
        direction="vertical"
        duration={13}
        gap={230}
        className="absolute border-cardinal border-2 -bottom-120 left-80 h-[120%] w-[80px] -rotate-45 flex-center text-5xl"
      >
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
        <div className="rotate-90">PROJECTS</div>
      </InfiniteSlider>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-12 grid-rows-5 min-h-screen">
          <div className="h-[400px] bg-jet col-span-3 col-start-1 row-start-2">
            1
          </div>
          <div className="h-[400px] bg-jet col-span-3 col-start-4">2</div>
          <div className="h-[400px] bg-jet col-span-3 col-start-7 row-start-2">
            3
          </div>
          <div className="h-[400px] bg-jet col-span-3 col-start-10">4</div>
          <div className="h-[400px] bg-jet col-span-3 col-start-10 row-start-3">
            5
          </div>
          <div className="h-[400px] bg-jet col-span-3 col-start-4 row-start-4">
            6
          </div>
          <div className="h-[400px] bg-jet col-span-3 col-start-1 row-start-5">
            7
          </div>
        </div>

        {/* <div className="grid grid-cols-13 h-screen">
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4 bg-jet">car 1</div>
            <div className="row-span-4 ">car3</div>
          </div>
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4 bg-jet">car3</div>
            <div className="row-span-4">car2</div>
            <div className="row-span-4">car 1</div>
          </div>

          <div className="col-span-1 bg-silver flex-center h-[50%] sticky top-0">
            <h2 className="rotate-90">projects</h2>
          </div>

          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4">car2</div>
            <div className="row-span-4 bg-jet">car 1</div>
            <div className="row-span-4">car3</div>
          </div>
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4 bg-jet">car3</div>
            <div className="row-span-4">car2</div>
            <div className="row-span-4 bg-jet">car 1</div>
          </div>
        </div>

        <div className="grid grid-cols-13 h-screen">
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4">car 1</div>
            <div className="row-span-4 bg-jet">car2</div>
            <div className="row-span-4 bg-gold">car3</div>
          </div>
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4 bg-jet">car 1</div>
            <div className="row-span-4">car2</div>
            <div className="row-span-4">car3</div>
          </div>

          <div className="col-span-1 bg-silver flex-center ">
            <h2 className="rotate-90">projects</h2>
          </div>
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4">car 1</div>
            <div className="row-span-4">car2</div>
            <div className="row-span-4">car3</div>
          </div>
          <div className="grid col-span-3 grid-rows-12">
            <div className="row-span-4">car2</div>
            <div className="row-span-4">car3</div>
            <div className="row-span-4 bg-jet">car 1</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
