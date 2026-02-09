import { ProjectText } from "@/components/projects/project-text";
import { ProjectsSlider } from "@/components/projects/projects-slider";
import React from "react";
import Carousel from "@/components/projects/carousel";

export default function Projects() {
  return (
    <>
      <section
        id="projects"
        className="h-[360vh] lg:h-[720vh] w-screen bg-gray-200  py-0 overflow-hidden"
      >
        <ProjectsSlider />
        <Carousel />
        <ProjectText />
      </section>
    </>
  );
}
