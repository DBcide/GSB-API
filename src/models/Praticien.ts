import mongoose, { Schema } from 'mongoose';
import IPraticien from './interfaces/IPraticien';

const PraticienSchema: Schema = new Schema(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        specialite: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IPraticien>('Praticien', PraticienSchema);
