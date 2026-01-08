import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // 10 requêtes max par IP
    message: {
        error: "Trop de requêtes. Réessayez dans 1 minute."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
