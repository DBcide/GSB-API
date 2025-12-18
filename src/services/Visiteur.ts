// src/services/Visiteur.ts
import { VisiteurModel, IVisiteurDocument } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';

/**
 * Service pour gérer la logique métier des visiteurs
 */
export class VisiteurService {

    /**
     * Créer un nouveau visiteur
     */
    public async createVisiteur(data: ICreateVisiteur): Promise<IVisiteurDocument> {
        try {
            // Vérifier si l'email existe déjà
            const existingVisiteur = await VisiteurModel.findOne({ email: data.email });
            if (existingVisiteur) {
                throw new Error(`Un visiteur avec l'email ${data.email} existe déjà`);
            }

            // Créer et sauvegarder le visiteur
            const visiteur = new VisiteurModel(data);
            await visiteur.save();
            return visiteur;
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation échouée: ${messages.join(', ')}`);
            }
            throw error;
        }
    }

    /**
     * Récupérer tous les visiteurs
     */
    public async getAllVisiteurs(): Promise<Partial<IVisiteurDocument>[]> {
    try {
        const visiteurs = await VisiteurModel.find()
            .sort({ dateCreation: -1 })
            .select('nom prenom email portefeuille') // <--- ici on choisit les champs à afficher
            .populate('portefeuille', 'nom prenom specialite'); // si tu veux les détails des praticiens
        return visiteurs;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des visiteurs');
    }
}


    /**
     * Récupérer un visiteur par son ID
     */
    public async getVisiteurById(id: string): Promise<Partial<IVisiteurDocument> | null> {
    const visiteur = await VisiteurModel.findById(id)
        .select('nom prenom email portefeuille')
        .populate('portefeuille', 'nom prenom specialite');
    if (!visiteur) throw new Error(`Visiteur avec l'ID ${id} introuvable`);
    return visiteur;
}


    /**
     * Mettre à jour un visiteur par son ID
     */
    public async updateVisiteur(id: string, data: Partial<ICreateVisiteur>): Promise<IVisiteurDocument | null> {
        try {
            const visiteur = await VisiteurModel.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            }).exec();

            if (!visiteur) {
                throw new Error(`Visiteur avec l'ID ${id} introuvable`);
            }
            return visiteur;
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new Error(`ID invalide: ${id}`);
            }
            throw error;
        }
    }

    /**
     * Supprimer un visiteur par son ID
     */
    public async deleteVisiteur(id: string): Promise<void> {
        try {
            const visiteur = await VisiteurModel.findByIdAndDelete(id).exec();
            if (!visiteur) {
                throw new Error(`Visiteur avec l'ID ${id} introuvable`);
            }
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new Error(`ID invalide: ${id}`);
            }
            throw error;
        }
    }

    /**
     * Ajouter un praticien au portefeuille d'un visiteur
     */
    async addPraticienToPortefeuille(idVisiteur: string, idPraticien: string) {
    return await VisiteurModel.findByIdAndUpdate(
        idVisiteur,
        { $addToSet: { portefeuille: idPraticien } },
        { new: true }
    );
}

    /**
     * Récupérer le portefeuille d'un visiteur
     */
    async getPortefeuille(idVisiteur: string) {
        return await VisiteurModel.findById(idVisiteur).populate("portefeuille");
    }

    // Supprimer un praticien du portefeuille
    async removePraticienFromPortefeuille(idVisiteur: string, idPraticien: string) {
    return await VisiteurModel.findByIdAndUpdate(
        idVisiteur,
        { $pull: { portefeuille: idPraticien } }, // $pull retire l'élément
        { new: true }
    );
}

}

// Export d'une instance unique
export default new VisiteurService();
