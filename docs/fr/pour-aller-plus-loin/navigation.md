---
title: Navigation
description: Gestion des routes avec React Router
nav: 2
id: 59aeed03e519ed28b06d1949871d5026
---

## Déclaration des pages / routes avec React Router

Dans la balise **BrowserRouter** est indiquée une balise **Routes**. Cette dernière contient une liste de balise **Route**, associant chaque route accessible, via l'attribut **_path_**, à chaque composant à afficher, avec l'attribut **_element_**.

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<ProjectsPage />} />
    <Route path="/projects/:id" element={<ProjectPage />} />
  </Routes>
</BrowserRouter>
```

## Présentation des pages

Ce site internet est composé de 2 pages :

- "/" : Affiche la page **ProjectsPage**, correspondant à la page d'accueil du site où est accessible la liste des projets

![Page d'acceuil avec projets](https://res.cloudinary.com/dwuvdquym/image/upload/v1756754067/codeur/docs/Home_Page_gxwbkv.png)

- "/projects/:id" : Affiche la page **ProjectPage** qui permet d'accéder aux informations concernant un projet, d'accéder au formulaire de dépôt d'une offre et d'accéder aux offres existantes

![Page d'un project](https://res.cloudinary.com/dwuvdquym/image/upload/v1756754482/codeur/docs/Project_Page_wzflhc.png)

## Navigation entre les pages

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1756756446/codeur/docs/codeur-clone-navigation-dark-fr_tdis8d.svg" alt="Fonctionnement de la navigation" class="hidden dark:block" />

<img src="https://res.cloudinary.com/dwuvdquym/image/upload/v1756756448/codeur/docs/codeur-clone-navigation-light-fr_hlgz3e.svg" alt="Fonctionnement de la navigation" class="block dark:hidden" />
