// src/services/Visiteur.ts
import VisiteurModel, { IVisiteurDocument } from '../models/Visiteur';
import { ICreateVisiteur } from '../models/interfaces/IVisiteur';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
     * Créer un compte visiteur avec mot de passe hashé
     */
    public async creerUnCompte(visiteurData: ICreateVisiteur): Promise<IVisiteurDocument> {
        try {
            // Vérifier si l'email existe déjà
            const existingVisiteur = await VisiteurModel.findOne({ email: visiteurData.email });

            if (existingVisiteur) {
                throw new Error(`Un visiteur avec l'email ${visiteurData.email} existe déjà`);
            }
            // Créer et sauvegarder le visiteur
            const hashedPassword = await bcrypt.hash(visiteurData.password, 10);
            const visiteur = new VisiteurModel({
                email: visiteurData.email,
                password: hashedPassword,
                nom: visiteurData.nom,
                prenom: visiteurData.prenom,
                tel: visiteurData.tel,
                dateEmbauche: visiteurData.dateEmbauche
            });
            await visiteur.save();

            // Ne pas retourner le mot de passe
            const visiteurSansPassword = await VisiteurModel.findById(visiteur._id).select('-password');
            return visiteurSansPassword!;
        } catch (error: any) {
            // Gestion des erreurs de validation Mongoose
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((err: any) => err.message);
                const errorMessage = `Validation échouée: ${messages.join(', ')}`;
                console.error('[ValidationError]', errorMessage);
                throw new Error(errorMessage);
            }
            console.error('[Error]', error);
            throw error;
        }
    }

    /**
     * Se connecter avec email et mot de passe
     */
    public async seConnecter(email: string, password: string): Promise<{ token: string; visiteur: IVisiteurDocument }> {
        try {
            const visiteur = await VisiteurModel.findOne({ email });

            if (!visiteur) {
                throw new Error('Email ou mot de passe incorrect');
            }
            const isPasswordValid = await bcrypt.compare(password, visiteur.password);
            if (!isPasswordValid) {
                throw new Error('Email ou mot de passe incorrect');
            }
            const token = jwt.sign(
                { visiteurId: visiteur._id, role: 'visiteur' },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h', algorithm: 'HS256' }
            );

            // Ne pas retourner le mot de passe
            const visiteurSansPassword = await VisiteurModel.findById(visiteur._id).select('-password');
            return { token, visiteur: visiteurSansPassword! };

        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new Error(`Error lors de la connexion: ${error.message}`);
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

    async stopSuiviPraticien(idVisiteur: string, idPraticien: string) {
    // On cherche le visiteur et on met à jour le praticien ciblé dans le portefeuille
    const visiteur = await VisiteurModel.findOneAndUpdate(
        { _id: idVisiteur, 'portefeuille.praticien': idPraticien },
        { $set: { 'portefeuille.$.dateFinSuivi': null } }, // met fin au suivi
        { new: true }
    ).populate('portefeuille.praticien', 'nom prenom specialite');

    if (!visiteur) throw new Error('Visiteur ou praticien introuvable');

    return visiteur;
  }
}

// Export d'une instance unique
export default new VisiteurService();
