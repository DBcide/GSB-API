// src/models/Visite.ts
import mongoose, { Schema, Model, Document } from 'mongoose';
import { IVisite } from './interfaces/IVisite';

export type IVisiteDocument = IVisite & Document;

const visiteSchema = new Schema<IVisiteDocument>(
  {
    dateVisite: {
      type: Date,
      required: [true, 'La date de la visite est obligatoire']
    },
    commentaire: {
      type: String,
      required: [true, 'Le commentaire est obligatoire'],
      trim: true,
      maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
    },
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est obligatoire']
    },
    praticien: {
      type: String,
      required: [true, 'Le praticien est obligatoire'],
      trim: true
    },
    motif: {
      type: String,
      required: [true, 'Le motif est obligatoire'],
      trim: true
    },
    dateCreation: {
      type: Date,
      default: Date.now
    }
  } as any,
  {
    versionKey: false
  }
);

export const VisiteModel: Model<IVisiteDocument> = mongoose.model<IVisiteDocument>(
  'Visite',
  visiteSchema
);
