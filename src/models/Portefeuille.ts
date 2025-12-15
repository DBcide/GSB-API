import mongoose, { Schema, Document } from 'mongoose';
import { IPortefeuille } from './interfaces/IPortefeuille';

export type IPortefeuilleDocument = IPortefeuille & Document;

const portefeuilleSchema = new Schema<IPortefeuilleDocument>({
    visiteurId: { type: Schema.Types.ObjectId, ref: 'Visiteur', required: true },
    praticienId: { type: Schema.Types.ObjectId, ref: 'Praticien', required: true },
    dateDebutSuivi: { type: Date, required: true },
    dateFinSuivi: { type: Date, required: false },
});

export default mongoose.model<IPortefeuilleDocument>('Portefeuille', portefeuilleSchema);
