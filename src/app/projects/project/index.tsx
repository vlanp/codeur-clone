import { useLocation } from "react-router";
import html from "./index.html?raw";
import projectsString from "../../../assets/projects.json?raw";
import { useEffect, useRef, useState } from "react";
import type { IProject } from "../../../interfaces/IProject";
import { createPortal } from "react-dom";
import ProjectCardExtended from "../../components/ProjectCardExtended";
import NewOfferForm from "../../components/NewOfferForm";
import { useLocalStorage } from "usehooks-ts";
import type { IOffer, IParsedOffer } from "../../../interfaces/IOffer";
import OfferCard from "../../components/OfferCard";

// See issue with dangerouslySetInnerHTML and React 19 https://github.com/facebook/react/issues/31600
const ProjectPage = () => {
  const projects = useRef<IProject[]>(JSON.parse(projectsString));
  const htmlContainerRef = useRef<HTMLDivElement | null>(null);
  const [projectPortalContainer, setProjectPortalContainer] =
    useState<HTMLElement | null>(null);
  const [newOfferPortalContainer, setNewOfferPortalContainer] =
    useState<HTMLElement | null>(null);
  const [offersPortalContainer, setOffersPortalContainer] =
    useState<HTMLElement | null>(null);

  const location = useLocation();
  const project = projects.current.find((p) => p.url === location.pathname);
  const [offers, setOffers] = useLocalStorage<IOffer[]>(
    `offers-${project?.id}`,
    [],
    {
      deserializer: (value) => {
        const parsed = JSON.parse(value);
        return parsed.map((offer: IParsedOffer) => ({
          ...offer,
          publicationDate: new Date(offer.publicationDate),
        }));
      },
    }
  );
  document.title = project ? project.titre : "Projet introuvable";

  useEffect(() => {
    if (htmlContainerRef.current) {
      htmlContainerRef.current.innerHTML = html;
    }
    const projectElement = document.getElementById("project_datas");
    if (!projectElement) {
      throw new Error('An element with id "project_datas" should exist.');
    }
    setProjectPortalContainer(projectElement);
    const newOfferElement = document.getElementById("new_offer_card");
    if (!newOfferElement) {
      throw new Error('An element with id "new_offer_card" should exist.');
    }
    setNewOfferPortalContainer(newOfferElement);
    const offersElement = document.getElementById("offers_placeholder");
    if (!offersElement) {
      throw new Error('An element with id "offers_placeholder" should exist.');
    }
    setOffersPortalContainer(offersElement);
  }, []);

  return (
    <>
      <div ref={htmlContainerRef} />
      {projectPortalContainer &&
        project &&
        createPortal(
          <ProjectCardExtended project={project} />,
          projectPortalContainer
        )}
      {newOfferPortalContainer &&
        createPortal(
          <NewOfferForm setOffers={setOffers} />,
          newOfferPortalContainer
        )}
      {offersPortalContainer &&
        createPortal(
          offers.map((offer) => <OfferCard key={offer.id} offer={offer} />),
          offersPortalContainer
        )}
    </>
  );
};

export default ProjectPage;
