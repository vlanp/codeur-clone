import { useLocation } from "react-router";
import html from "./index.html?raw";
import projectsString from "../../../assets/projects.json?raw";
import { useEffect, useRef, useState } from "react";
import type { IProject } from "../../../interfaces/IProject";
import { createPortal } from "react-dom";

// See issue with dangerouslySetInnerHTML and React 19 https://github.com/facebook/react/issues/31600
const ProjectPage = () => {
  const projects = useRef<IProject[]>(JSON.parse(projectsString));
  const htmlContainerRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  const location = useLocation();
  const project = projects.current.find((p) => p.url === location.pathname);
  document.title = project ? project.titre : "Projet introuvable";

  useEffect(() => {
    if (htmlContainerRef.current) {
      htmlContainerRef.current.innerHTML = html;
    }
    // const element = document.getElementById("search-content");
    // if (!element) {
    //   throw new Error('An element with id "search-content" should exist.');
    // }
    // setPortalContainer(element);
  }, []);

  return (
    <>
      <div ref={htmlContainerRef} />
      {portalContainer && createPortal(projectsJsx, portalContainer)}
    </>
  );
};

export default ProjectPage;
