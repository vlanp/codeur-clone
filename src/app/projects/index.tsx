import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import html from "./index.html?raw";
import projectsString from "../../assets/projects.json?raw";
import type { IProject } from "../../interfaces/IProject";
import ProjectCard from "../components/projectCard.tsx";

// See issue with dangerouslySetInnerHTML and React 19 https://github.com/facebook/react/issues/31600
const ProjectsPage = () => {
  const projects = useRef<IProject[]>(JSON.parse(projectsString));
  const htmlContainerRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    if (htmlContainerRef.current) {
      htmlContainerRef.current.innerHTML = html;
    }
    const element = document.getElementById("search-content");
    if (!element) {
      throw new Error('An element with id "search-content" should exist.');
    }
    setPortalContainer(element);
  }, []);

  const projectsJsx = projects.current.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <>
      <div ref={htmlContainerRef} />
      {portalContainer && createPortal(projectsJsx, portalContainer)}
    </>
  );
};

export default ProjectsPage;
