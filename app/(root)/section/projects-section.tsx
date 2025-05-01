import { ProjectText } from "@/components/projects/project-text";
import { ProjectsSlider } from "@/components/projects/projects-slider";
import React from "react";

export default function Projects() {
  return (
    <>
      <section id="projects" className="h-[700vh] w-full py-0">
        <ProjectsSlider />
      </section>
      <ProjectText />
    </>
  );
}
