import { Router } from 'express';
import controller from '../controllers/Portefeuille';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Toutes les routes du portefeuille sont protégées
router.post('/', authMiddleware, controller.addPraticien);
router.get('/:idVisiteur', authMiddleware, controller.getPortefeuille);
router.delete('/:idVisiteur/praticien/:idPraticien', authMiddleware, controller.stopSuiviPraticien);

export default router;
