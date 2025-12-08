import { Router } from 'express';
import PraticienController from '../controllers/Praticien';

const router = Router();

router.post('/', PraticienController.create);
router.get('/', PraticienController.getAll);

export default router;
