---
title: Stockage
description: Gestion du stockage des données du site
nav: 3
id: b04db2b04916125a6439dbc732350698
---

## Introduction

Ce site a été conçu pour être utilisé conjointement avec l'application [codeur automate](https://github.com/vlanp/CodeurAutomate) afin de démontrer comment récupérer une liste de projets depuis un site web et publier automatiquement des offres rédigées par une IA générative.

Pour cela, seule une quantité limitée de projets est nécessaire, sans avoir besoin de pouvoir en ajouter de nouveaux. Par conséquent, aucun serveur back-end n'est requis. Les données sont initialement stockées dans les fichiers du projet, et des informations complémentaires peuvent être sauvegardées dans le stockage local du navigateur.

## Stockage de tous les projets

Les projets sont stockés dans un fichier JSON situé dans les assets du projet. Le format du JSON est le suivant :

```json
[
  {
    "url": "/projects/395427-ameliorer-le-logiciel-de-pause-workrave",
    "id": "395427",
    "titre": "Améliorer le logiciel de pause workrave",
    "statut": "Ouvert",
    "budget": null,
    "offres": "8 offres",
    "vues": "815 vues",
    "interactions": "19 interactions",
    "description": "Travailler sans arrêt sur l’ordinateur peut nous rendre las et nous faire négliger l’activité physique. Pour éviter cela, le logiciel Workrave peut nous aider. C’est un outil qui nous propose de faire des pauses régulières et de pratiquer quelques exercices.\n\nJe trouve que les pause pourrait être plus personnalisées\n\nJ'aimerais bien étudier ce project avec une équipe intéressée \n\nFaire un cahier des charges et lancer un crowdfunding\n\nAu plaisir de faire connaissance Alexandre",
    "date_publication": "08 octobre 2023 à 12h01",
    "budget_detaille": "Moins de 500 €",
    "profils_recherches": [
      {
        "nom": "Développeur PHP",
        "url": "/users/c/developpement/sc/php-mysql"
      }
    ],
    "competences": null,
    "localisation": null
  }
  // ...
]
```

Les données du fichier JSON sont importées au format **_string_** grâce à l'utilisation du suffixe ?raw, fournit par [vite](https://vite.dev/), dans la directive d'import tel qu'indiqué dans la [documentation](https://vite.dev/guide/assets).

```tsx
import projectsString from "../../assets/projects.json?raw";

interface IProject {
  url: string;
  id: string;
  titre: string;
  statut: "Ouvert" | "En travail" | "Fermé";
  budget: null;
  offres: string;
  vues: string;
  interactions: string;
  description: string;
  date_publication: string;
  budget_detaille: string;
  profils_recherches: {
    nom: string;
    url: string;
  }[];
  competences: null;
  localisation: null;
}

const projects: IProject[] = JSON.parse(projectsString);
```

## Stockage des offres publiées

Les offres sont regroupées pour un projet, puis transformer au format **_string_**, à l'aide de **_JSON.stringify()_** afin d'être enregistrées dans le stockage local du navigateur. Le hook [useLocalStorage](https://usehooks-ts.com/react-hook/use-local-storage) est utilisé pour que les offres affichées sur le site internet correspondent toujours à ce qui est enregistrer dans le stockage local.

Lors de la déserialisation des offres, **_JSON.parse()_** est utilisé par défaut par le hook. Cette fonction est adaptée lorsque toutes les propriétés ont des types primitifs. Dans ce cas-ci, **_publicationDate_** à le format **_Date_**, qui n'est pas un type primitif. Lors de la désérialisation, **_publicationDate_** va avoir le type **_string_** au lieu du type **_Date_**.

```ts
interface IOffer {
  id: string;
  price: number;
  duration: number;
  message: string;
  publicationDate: Date;
}
interface IParsedOffer {
  id: string;
  price: number;
  duration: number;
  message: string;
  publicationDate: string;
}
```

Afin de résoudre ce problème, il faut fournir un déserialiser personnalisé, qui va retransformer **_publicationDate_** en **_Date_**.

```tsx
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
```
