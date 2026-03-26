import { Router } from 'express';
import controller from '../controllers/Visiteur';
import { authMiddleware } from '../middlewares/auth';
import { validateCreerCompte, validateConnexion } from '../middlewares/validation';

const router = Router();

// Routes publiques (pas d'authentification requise)
router.post('/creeruncompte', validateCreerCompte, controller.creerUnCompte);
router.post('/connexion', validateConnexion, controller.seConnecter);

// Routes protégées (authentification requise)
router.post('/', authMiddleware, controller.create);
router.get('/', authMiddleware, controller.getAll);
router.get('/:id', authMiddleware, controller.getById);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
