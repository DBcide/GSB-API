import { Router } from 'express';
import PraticienController from '../controllers/Praticien';

const router = Router();

router.post('/', PraticienController.create);
router.get('/', PraticienController.getAll);
router.get('/:id', PraticienController.getById);

export default router;
