import { Router } from 'express';
import VisiteurController from '../controllers/Visiteur';

const router = Router();

// Routes classiques CRUD
router.post('/', VisiteurController.create);
router.get('/', VisiteurController.getAll);
router.get('/:id', VisiteurController.getById);
router.put('/:id', VisiteurController.update);
router.delete('/:id', VisiteurController.delete);

// Routes pour le portefeuille
router.post('/add-praticien', VisiteurController.addPraticien); // Ajout praticien au portefeuille
router.get('/:idVisiteur/portefeuille', VisiteurController.getPortefeuille);
router.post('/remove-praticien', VisiteurController.removePraticien); // Suppression praticien du portefeuille

export default router;
