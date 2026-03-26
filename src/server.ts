// src/server.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Database } from './config/database';

// 🔐 Rate limiter
import { apiLimiter } from './middlewares/Ratelimiter';

// 🔹 Chargement des modèles (IMPORTANT pour Mongoose)
import './models/Visiteur';
import './models/Praticien';

// 🔹 Routes
import { UserRoutes } from './routes/User';
import visiteurRoutes from './routes/Visiteur';
import visiteRoutes from './routes/Visite';
import praticienRoutes from './routes/Praticien';
import portefeuilleRoutes from './routes/Portefeuille';

// Chargement des variables d'environnement
dotenv.config();

/**
 * Gère la configuration et le démarrage du serveur Express
 */
class App {
  public app: Application;
  private port: number;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.database = Database.getInstance();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  /**
   * Configure les middlewares Express
   */
  private initializeMiddlewares(): void {
    // Sécurité des headers HTTP avec Helmet
    this.app.use(helmet());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // CORS configuré (à restreindre en production)
    this.app.use(cors({
      origin: process.env.NODE_ENV === 'production'
        ? process.env.ALLOWED_ORIGINS?.split(',')
        : '*',
      credentials: true
    }));
  }

  /**
   * Configure les routes de l'application
   */
  private initializeRoutes(): void {

    // 🔐 Rate limiter appliqué à toute l’API
    this.app.use('/api', apiLimiter);

    // Route racine
    this.app.get('/', (_req: Request, res: Response) => {
      res.json({
        message: 'API REST Express.js + TypeScript + MongoDB',
        version: '1.0.0',
      });
    });

    // Health check (non limité)
    this.app.get('/health', (_req: Request, res: Response) => {
      res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // Routes utilisateurs
    const userRoutes = new UserRoutes();
    this.app.use('/api/users', userRoutes.router);

    // Routes visiteurs
    this.app.use('/api/visiteurs', visiteurRoutes);

    // Routes portefeuille
    this.app.use('/api/portefeuilles', portefeuilleRoutes);

    // Routes visites
    this.app.use('/api/visites', visiteRoutes);

    // Routes praticiens
    this.app.use('/api/praticiens', praticienRoutes);
  }

  /**
   * Démarre la connexion à la base de données
   */
  private async initializeDatabase(): Promise<void> {
    await this.database.connect();
  }

  /**
   * Démarre le serveur Express
   */
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('================================');
      console.log(`Serveur démarré sur le port ${this.port}`);
      console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log('================================');
    });
  }
}

// Lancement du serveur
const app = new App();
app.listen();

// Gestion arrêt serveur
process.on('SIGINT', async () => {
  console.log('\nArrêt du serveur...');
  await Database.getInstance().disconnect();
  process.exit(0);
});
