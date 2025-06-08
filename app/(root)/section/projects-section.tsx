import { ProjectText } from "@/components/projects/project-text";
import { ProjectsSlider } from "@/components/projects/projects-slider";
import React from "react";

export default function Projects() {
  return (
    <>
      <section id="projects" className="h-[450vh] lg:h-[720vh] w-screen py-0">
        <ProjectsSlider />
      </section>
      <ProjectText />
    </>
  );
}
