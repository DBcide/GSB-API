import { Request, Response } from 'express';
import service from '../services/Portefeuille';

class PortefeuilleController {

    // Suivre un praticien
    addPraticien = async (req: Request, res: Response): Promise<void> => {
        try {
            const { idVisiteur, idPraticien } = req.body;

            if (!idVisiteur || !idPraticien) {
                res.status(400).json({ error: 'idVisiteur et idPraticien sont obligatoires' });
                return;
            }

            const visiteur = await service.addPraticien(idVisiteur, idPraticien);

            res.status(200).json(visiteur.portefeuille);
        } catch (error: any) {
            console.error('Erreur addPraticien:', error.message);
            res.status(400).json({ error: error.message });
        }
    };

    // Récupérer le portefeuille
    getPortefeuille = async (req: Request, res: Response) => {
        try {
            const { idVisiteur } = req.params;

            const portefeuille = await service.getPortefeuille(idVisiteur);

            res.status(200).json(portefeuille);
        } catch (error: any) {
            console.error('Erreur getPortefeuille:', error.message);
            res.status(404).json({ error: error.message });
        }
    };

    // Ne plus suivre un praticien (USER STORY)
    stopSuiviPraticien = async (req: Request, res: Response) => {
        try {
            const { idVisiteur, idPraticien } = req.params;

            const portefeuille = await service.removePraticien(idVisiteur, idPraticien);

            res.status(200).json({
                message: 'Le praticien a été retiré du portefeuille',
                portefeuille
            });
        } catch (error: any) {
            console.error('Erreur stopSuiviPraticien:', error.message);
            res.status(400).json({ error: error.message });
        }
    };
}

export default new PortefeuilleController();
