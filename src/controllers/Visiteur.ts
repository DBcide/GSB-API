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
}

export default new VisiteurController();
