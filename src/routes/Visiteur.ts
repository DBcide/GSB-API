import { Router } from 'express';
import VisiteurController from '../controllers/Visiteur';

const router = Router();

router.post('/', VisiteurController.create);
router.get('/', VisiteurController.getAll);
router.get('/:id', VisiteurController.getById);
router.put('/:id', VisiteurController.update);
router.delete('/:id', VisiteurController.delete);
router.post('/add-praticien', VisiteurController.addPraticien);
router.get('/:idVisiteur/portefeuille', VisiteurController.getPortefeuille);


export default router;
