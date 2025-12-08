/**
 * Interface représentant un visiteur
 */
export interface IVisiteur {
  _id?: string;
  nom: string;              // {{lastVisiteurNom}}
  prenom: string;           // {{lastVisiteurPrenom}}
  email: string;            // {{lastVisiteurEmail}}
  tel: string;              // {{lastVisiteurTel}}
  dateEmbauche: Date;       // {{lastVisiteurDatePast}}
  dateCreation?: Date;
  portefeuille?: string[];
}

/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  dateEmbauche: Date;
}
