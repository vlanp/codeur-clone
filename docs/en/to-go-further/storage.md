---
title: Storage
description: Site data storage management
nav: 3
id: b04db2b04916125a6439dbc732350698
---

## Introduction

This site has been designed to be used in conjunction with the [codeur automate](https://github.com/vlanp/CodeurAutomate) application in order to demonstrate how to retrieve a list of projects from a website and automatically publish offers written by generative AI.

For this purpose, only a limited quantity of projects is needed, without requiring the ability to add new ones. Therefore, no back-end server is required. The data is initially stored in the project files, and additional information can be saved in the browser's local storage.

## Storage of all projects

Projects are stored in a JSON file located in the project assets. The JSON format is as follows:

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
    "description": "Travailler sans arrêt sur l'ordinateur peut nous rendre las et nous faire négliger l'activité physique. Pour éviter cela, le logiciel Workrave peut nous aider. C'est un outil qui nous propose de faire des pauses régulières et de pratiquer quelques exercices.\n\nJe trouve que les pause pourrait être plus personnalisées\n\nJ'aimerais bien étudier ce project avec une équipe intéressée \n\nFaire un cahier des charges et lancer un crowdfunding\n\nAu plaisir de faire connaissance Alexandre",
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

The JSON file data is imported as a **_string_** format thanks to the use of the ?raw suffix, provided by [vite](https://vite.dev/), in the import directive as indicated in the [documentation](https://vite.dev/guide/assets).

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

## Storage of published offers

Offers are grouped by project, then transformed to **_string_** format using **_JSON.stringify()_** to be saved in the browser's local storage. The [useLocalStorage](https://usehooks-ts.com/react-hook/use-local-storage) hook is used so that the offers displayed on the website always correspond to what is saved in local storage.

During offer deserialization, **_JSON.parse()_** is used by default by the hook. This function is suitable when all properties have primitive types. In this case, **_publicationDate_** has the **_Date_** format, which is not a primitive type. During deserialization, **_publicationDate_** will have the **_string_** type instead of the **_Date_** type.

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

To solve this problem, you need to provide a custom deserializer, which will transform **_publicationDate_** back into a **_Date_**.

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
