---
title: Portails
description: Ajout d'éléments JSX dans un noeud du DOM
nav: 4
id: 381bf47413da81160b1e3481b1c05e0d
---

## Introduction

Par soucis de gain de temps, les pages du site [codeur.com](https://www.codeur.com/) n'ont pas été recréées entièrement avec des composants (React)[https://fr.react.dev/]. À la place, le DOM généré pour chaque page a été récupéré et stocké au format HTML. Une partie du DOM a ensuite été supprimé pour être remplacé par le JSX généré par des composants (React)[https://fr.react.dev/] afin d'avoir un meilleur contrôle sur la liste des projets de la page d'accueil "/", ainsi que sur le projet, le formulaire de dépôt d'une nouvelle offre, et la liste des offres de la page d'un projet "/projects/:id". Cet ajout de JSX dans le DOM a nécessité l'utilisation des [portails React](https://react.dev/reference/react-dom/createPortal).

## Utilisation des portails

Lors du montage de la page, une référence au conteneur est stockée via **_useRef_**. Un **_useEffect_** déclenche l'injection du contenu HTML brut (importé précédemment) dans ce conteneur. Une fois le HTML inséré, l'élément ayant l'id souhaité est sélectionné et stocké dans un état. Lorsque cet élément cible est disponible, la page est de nouveau rendu, et React utilise **_createPortal_** pour rendre les composants JSX directement dans ce nœud DOM spécifique, permettant ainsi d'intégrer du contenu React dans une structure HTML statique.

```tsx
import html from "./index.html?raw";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { IOffer } from "../../../interfaces/IOffer";
import OfferCard from "../../components/OfferCard";

const ProjectPage = () => {
  const htmlContainerRef = useRef<HTMLDivElement | null>(null);
  const [offersPortalContainer, setOffersPortalContainer] =
    useState<HTMLElement | null>(null);
  const offers: IOffer[] = ...

  useEffect(() => {
    if (htmlContainerRef.current) {
      htmlContainerRef.current.innerHTML = html;
    }
    const offersElement = document.getElementById("offers_placeholder");
    if (!offersElement) {
      throw new Error('An element with id "offers_placeholder" should exist.');
    }
    setOffersPortalContainer(offersElement);
  }, []);

  return (
    <>
      <div ref={htmlContainerRef} />
      {offersPortalContainer &&
        createPortal(
          offers.map((offer) => <OfferCard key={offer.id} offer={offer} />),
          offersPortalContainer
        )}
    </>
  );
};
```

## Problème rencontré

La première approche consistait à utiliser **_dangerouslySetInnerHTML_** pour injecter le HTML brut. Bien que l'injection du JSX via un portail React fonctionnait avec cette méthode, un nouveau rendu du composant semblait être effectué faisant disparaitre les éléments injectés dans le DOM.

```tsx
import html from "./index.html?raw";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { IOffer } from "../../../interfaces/IOffer";
import OfferCard from "../../components/OfferCard";

const ProjectPage = () => {
  const [offersPortalContainer, setOffersPortalContainer] =
    useState<HTMLElement | null>(null);
  const offers: IOffer[] = ...

  useEffect(() => {
    const offersElement = document.getElementById("offers_placeholder");
    if (!offersElement) {
      throw new Error('An element with id "offers_placeholder" should exist.');
    }
    setOffersPortalContainer(offersElement);
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {offersPortalContainer &&
        createPortal(
          offers.map((offer) => <OfferCard key={offer.id} offer={offer} />),
          offersPortalContainer
        )}
    </>
  );
};
```

Ce problème est documenté [ici](https://github.com/facebook/react/issues/31600).
