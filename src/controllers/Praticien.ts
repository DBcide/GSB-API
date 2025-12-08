import { Request, Response } from 'express';
import PraticienService from '../services/Praticien';

class PraticienController {

    async create(req: Request, res: Response) {
        try {
            const praticien = await PraticienService.createPraticien(req.body);
            res.status(201).json(praticien);
        } catch (error) {
            res.status(500).json({ message: "Erreur création praticien", error });
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const praticiens = await PraticienService.getPraticiens();
            res.status(200).json(praticiens);
        } catch (error) {
            res.status(500).json({ message: "Erreur récupération praticiens", error });
        }
    }
}

export default new PraticienController();
