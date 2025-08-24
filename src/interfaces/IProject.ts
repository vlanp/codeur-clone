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

export type { IProject };
