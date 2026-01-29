import { ProjectText } from "@/components/projects/project-text";
import { ProjectsSlider } from "@/components/projects/projects-slider";
import React from "react";
import NewCarousel from "../../new-project/scroll-trigger-carousel";

export default function Projects() {
  return (
    <>
      <section
        id="projects"
        className="h-[450vh] lg:h-[720vh] w-screen bg-gray-200  py-0 overflow-hidden"
      >
        {/* <ProjectsSlider /> */}
        <NewCarousel />
        <ProjectText />
      </section>
    </>
  );
}
