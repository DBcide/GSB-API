/**
 * Interface représentant un visiteur
 */
export interface IVisiteur {
  _id?: string;
  nom: string;              // {{lastVisiteurNom}}
  prenom: string;           // {{lastVisiteurPrenom}}
  email: string;            // {{lastVisiteurEmail}}
  password: string;         // Mot de passe hashé
  tel: string;              // {{lastVisiteurTel}}
  dateEmbauche: Date;       // {{lastVisiteurDatePast}}
  dateCreation?: Date;
  portefeuille?: string[]; // Liste des IDs des praticiens dans le portefeuille
}

/**
 * Interface pour la création d'un visiteur
 */
export interface ICreateVisiteur {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  tel: string;
  dateEmbauche: Date;
}
