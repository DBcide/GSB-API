import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

/**
 * Middleware pour gérer les erreurs de validation
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.array()
        });
        return;
    }
    next();
};

/**
 * Validation pour la création de compte
 */
export const validateCreerCompte = [
    body('email')
        .isEmail()
        .withMessage('Email invalide')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'),
    body('nom')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Le nom doit contenir entre 2 et 50 caractères')
        .customSanitizer(value => xss(value)),
    body('prenom')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Le prénom doit contenir entre 2 et 50 caractères')
        .customSanitizer(value => xss(value)),
    body('tel')
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage('Le numéro de téléphone doit contenir 10 chiffres'),
    body('dateEmbauche')
        .isISO8601()
        .withMessage('Date d\'embauche invalide'),
    handleValidationErrors
];

/**
 * Validation pour la connexion
 */
export const validateConnexion = [
    body('email')
        .isEmail()
        .withMessage('Email invalide')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Le mot de passe est requis'),
    handleValidationErrors
];

/**
 * Validation pour les champs de texte libre (commentaires, etc.)
 */
export const sanitizeTextFields = [
    body('commentaire')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Le commentaire ne doit pas dépasser 500 caractères')
        .customSanitizer(value => xss(value, {
            whiteList: {}, // Pas de HTML autorisé
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script', 'style']
        })),
    handleValidationErrors
];
