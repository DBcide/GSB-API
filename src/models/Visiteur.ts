// src/models/Visiteur.ts
import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisiteur } from './interfaces/IVisiteur';

export type IVisiteurDocument = IVisiteur & Document;

/**
 * Schéma Mongoose pour Visiteur
 */
const visiteurSchema = new Schema<IVisiteurDocument>(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est obligatoire'],
      trim: true,
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    tel: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire'],
      trim: true,
      minlength: [5, 'Le numéro de téléphone est trop court'],
      maxlength: [20, 'Le numéro de téléphone est trop long']
    },
    dateEmbauche: {
      type: Date,
      required: [true, 'La date d\'embauche est obligatoire']
    },
    dateCreation: {
      type: Date,
      default: Date.now
    },
    portefeuille: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Praticien" }
    ],
  },
  {
    versionKey: false
  }
);

export const VisiteurModel: Model<IVisiteurDocument> = mongoose.model<IVisiteurDocument>(
  'Visiteur',
  visiteurSchema
);
