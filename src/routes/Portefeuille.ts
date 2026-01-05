import { Router } from 'express';
import controller from '../controllers/Portefeuille';

const router = Router();

router.post('/', controller.addPraticien);
router.get('/:idVisiteur', controller.getPortefeuille);
router.delete('/:idVisiteur/praticien/:idPraticien', controller.stopSuiviPraticien);

export default router;
