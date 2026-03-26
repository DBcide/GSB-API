// src/routes/Visite.ts
import { Router } from 'express';
import VisiteController from '../controllers/Visite';
import { authMiddleware } from '../middlewares/auth';
import { sanitizeTextFields } from '../middlewares/validation';

const router = Router();

// Toutes les routes des visites sont protégées
// Sanitization XSS sur les champs de texte libre (commentaire)
router.post('/', authMiddleware, sanitizeTextFields, VisiteController.create);
router.get('/', authMiddleware, VisiteController.getAll);
router.get('/:id', authMiddleware, VisiteController.getById);
router.put('/:id', authMiddleware, sanitizeTextFields, VisiteController.update);
router.delete('/:id', authMiddleware, VisiteController.delete);

export default router;
