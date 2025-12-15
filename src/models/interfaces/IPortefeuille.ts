import { Types } from "mongoose";

export interface IPortefeuille {
    visiteur: string; // ObjectId de Visiteur
    praticien: string; // ObjectId de Praticien
    dateDebutSuivi: Date;
    dateFinSuivi?: Date;
    praticienId: Types.ObjectId;
    visiteurId: Types.ObjectId;
}

export interface ICreatePortefeuille {
    visiteur: string; // ID du visiteur
    praticien: string; // ID du praticien
    dateDebutSuivi: Date;
    dateFinSuivi?: Date;
}
