import mongoose, { Schema, Document, Model } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur';

export type IVisiteurDocument = IVisiteur & Document;

const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    tel: { type: String, required: true, trim: true },
    dateEmbauche: { type: Date, required: true },
    dateCreation: { type: Date, default: Date.now },
     // portefeuille est une liste d'IDs de praticiens
    portefeuille: [
  {
    praticien: { type: Schema.Types.ObjectId, ref: 'Praticien', required: true },
    dateDebutSuivi: { type: Date, default: Date.now },
    dateFinSuivi: { type: Date, default: null } // null si le suivi est actif
  }
]
  },
  {
    timestamps: true
  }
);

 const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>(
  'Visiteur',
  visiteurSchema
);

export default VisiteurModel;