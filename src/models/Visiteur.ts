import mongoose, { Schema, Document, Model } from 'mongoose';
import { IVisiteur } from '../models/interfaces/IVisiteur';

export type IVisiteurDocument = IVisiteur & Document;

const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tel: { type: String, required: true, trim: true },
    dateEmbauche: { type: Date, required: true },
    dateCreation: { type: Date, default: Date.now },
    portefeuille: [{ type: Schema.Types.ObjectId, ref: 'Portefeuille' }] // référence aux portefeuilles
  },
  { versionKey: false }
);

export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>(
  'Visiteur',
  visiteurSchema
);
