import { Request, Response } from 'express';
import service from '../services/Visiteur';

class VisiteurController {

    create = async (req: Request, res: Response) => {
        try {
            const visiteur = await service.createVisiteur(req.body);
            res.status(201).json(visiteur);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getAll = async (_req: Request, res: Response) => {
        try {
            const visiteurs = await service.getAllVisiteurs();
            res.status(200).json(visiteurs);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const visiteur = await service.getVisiteurById((req.params as any).id);
            res.status(200).json(visiteur);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const visiteur = await service.updateVisiteur((req.params as any).id, req.body);
            res.status(200).json(visiteur);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            await service.deleteVisiteur((req.params as any).id);
            res.status(204).send();
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // -------------------------------
    // AJOUTER UN PRATICIEN AU PORTEFEUILLE
    addPraticien = async (req: Request, res: Response) => {
        try {
            const { idVisiteur, idPraticien } = req.body;

            if (!idVisiteur || !idPraticien) {
                return res.status(400).json({ error: 'idVisiteur et idPraticien sont obligatoires' });
            }

            const visiteur = await service.addPraticienToPortefeuille(idVisiteur, idPraticien);

            if (!visiteur) {
                return res.status(404).json({ error: 'Visiteur ou praticien introuvable' });
            }

            res.status(200).json(visiteur);
        } catch (error: any) {
            // Retourner l'erreur complète pour le debug
            console.error('Erreur addPraticien:', error);
            res.status(500).json({ message: "Erreur ajout praticien", error: error.message });
        }
    }

    // -------------------------------
    // RÉCUPÉRER LE PORTEFEUILLE D'UN VISITEUR
    getPortefeuille = async (req: Request, res: Response) => {
        try {
            const { idVisiteur } = req.params;

            if (!idVisiteur) {
                return res.status(400).json({ error: 'idVisiteur est obligatoire' });
            }

            const portefeuille = await service.getPortefeuille(idVisiteur);

            if (!portefeuille) {
                return res.status(404).json({ error: 'Visiteur introuvable' });
            }

            res.status(200).json(portefeuille.portefeuille); // on renvoie seulement le portefeuille
        } catch (error: any) {
            console.error('Erreur getPortefeuille:', error);
            res.status(500).json({ message: "Erreur récupération portefeuille", error: error.message });
        }
    }

    // Retirer un praticien du portefeuille
    removePraticien = async (req: Request, res: Response) => {
    try {
        const { idVisiteur, idPraticien } = req.body;

        if (!idVisiteur || !idPraticien) {
            return res.status(400).json({ error: 'idVisiteur et idPraticien sont obligatoires' });
        }

        const visiteur = await service.removePraticienFromPortefeuille(idVisiteur, idPraticien);

        if (!visiteur) {
            return res.status(404).json({ error: 'Visiteur ou praticien introuvable' });
        }

        res.status(200).json({ 
            message: 'Praticien supprimé du portefeuille', 
            portefeuille: visiteur.portefeuille 
        });
    } catch (error: any) {
        console.error('Erreur removePraticien:', error);
        res.status(500).json({ message: "Erreur suppression praticien", error: error.message });
    }
}
}

export default new VisiteurController();
