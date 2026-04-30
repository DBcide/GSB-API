# GSB - Gestion des Rapports de Visites

API REST pour la gestion des rapports de visites médicales des laboratoires pharmaceutiques GSB. Cette application permet de gérer les visiteurs médicaux, les praticiens, leurs portefeuilles et les rapports de visites.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Modèles de données](#modèles-de-données)
- [Sécurité](#sécurité)
- [Scripts disponibles](#scripts-disponibles)

## Fonctionnalités

- Gestion des visiteurs médicaux (création, lecture, mise à jour, suppression)
- Gestion des praticiens (médecins et professionnels de santé)
- Gestion des portefeuilles de praticiens par visiteur
- Création et suivi des rapports de visites
- Limitation du taux de requêtes (rate limiting)
- Validation des données
- Architecture en couches (routes, controllers, services)

## Technologies

- **Backend**: Node.js, Express.js 5.x
- **Langage**: TypeScript 5.x
- **Base de données**: MongoDB avec Mongoose ODM
- **Sécurité**:
  - express-rate-limit (limitation de taux)
  - helmet (sécurisation des headers HTTP)
  - bcrypt (hachage de mots de passe)
  - xss (protection contre les attaques XSS)
  - CORS
- **Développement**: Nodemon, TSX

## Prérequis

- Node.js (version 16.x ou supérieure)
- MongoDB (local ou Atlas)
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone <url-du-depot>
cd GSB-Gestion-rapports-visites
```

2. Installez les dépendances :
```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Configuration MongoDB
DB_USERNAME=votre_nom_utilisateur_mongodb
DB_PASSWORD=votre_mot_de_passe_mongodb
DB_NAME=nom_de_votre_base_de_donnees

# Configuration serveur
PORT=3000
NODE_ENV=development
```

## Démarrage

### Mode développement
```bash
npm run dev
```
Le serveur démarre sur `http://localhost:3000` avec rechargement automatique (nodemon).

### Mode production

1. Compilez le TypeScript :
```bash
npm run build
```

2. Démarrez le serveur :
```bash
npm start
```

## Structure du projet

```
GSB-Gestion-rapports-visites/
├── src/
│   ├── config/           # Configuration (database, etc.)
│   ├── controllers/      # Contrôleurs (logique HTTP)
│   ├── models/           # Modèles Mongoose
│   │   └── interfaces/   # Interfaces TypeScript
│   ├── routes/           # Définition des routes API
│   ├── services/         # Logique métier
│   ├── middlewares/      # Middlewares (rate limiting, etc.)
│   └── server.ts         # Point d'entrée de l'application
├── dist/                 # Fichiers compilés (généré après build)
├── .env                  # Variables d'environnement (à créer)
├── package.json
├── tsconfig.json
└── README.md
```

### Architecture en couches

Le projet suit une architecture en trois couches :

1. **Routes** (`src/routes/`) - Définissent les endpoints API et les mappent aux méthodes des contrôleurs
2. **Controllers** (`src/controllers/`) - Gèrent les requêtes/réponses HTTP et appellent les services
3. **Services** (`src/services/`) - Contiennent la logique métier et interagissent avec les modèles
4. **Models** (`src/models/`) - Schémas Mongoose et définitions de types

## API Endpoints

Tous les endpoints API sont préfixés par `/api` et sont protégés par un rate limiting (10 requêtes/minute/IP).

### Endpoints de santé (non rate-limited)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Informations sur l'API et version |
| GET | `/health` | État de santé du serveur |

### Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users` | Liste tous les utilisateurs |
| GET | `/api/users/:id` | Récupère un utilisateur par ID |
| POST | `/api/users` | Crée un nouvel utilisateur |
| PUT | `/api/users/:id` | Met à jour un utilisateur |
| DELETE | `/api/users/:id` | Supprime un utilisateur |

### Visiteurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/visiteurs` | Liste tous les visiteurs |
| GET | `/api/visiteurs/:id` | Récupère un visiteur par ID |
| POST | `/api/visiteurs` | Crée un nouveau visiteur |
| PUT | `/api/visiteurs/:id` | Met à jour un visiteur |
| DELETE | `/api/visiteurs/:id` | Supprime un visiteur |

### Praticiens

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/praticiens` | Liste tous les praticiens |
| GET | `/api/praticiens/:id` | Récupère un praticien par ID |
| POST | `/api/praticiens` | Crée un nouveau praticien |
| PUT | `/api/praticiens/:id` | Met à jour un praticien |
| DELETE | `/api/praticiens/:id` | Supprime un praticien |

### Portefeuilles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/portefeuilles/:visiteurId` | Récupère le portefeuille d'un visiteur |
| POST | `/api/portefeuilles/:visiteurId/praticiens/:praticienId` | Ajoute un praticien au portefeuille |
| DELETE | `/api/portefeuilles/:visiteurId/praticiens/:praticienId` | Retire un praticien du portefeuille |

### Visites

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/visites` | Liste toutes les visites |
| GET | `/api/visites/:id` | Récupère une visite par ID |
| POST | `/api/visites` | Crée un nouveau rapport de visite |
| PUT | `/api/visites/:id` | Met à jour un rapport de visite |
| DELETE | `/api/visites/:id` | Supprime un rapport de visite |

## Modèles de données

### Visiteur (Visiteur Médical)
```typescript
{
  nom: string,
  prenom: string,
  email: string,
  portefeuille: [
    {
      praticien: ObjectId,        // Référence au Praticien
      dateDebutSuivi: Date,
      dateFinSuivi: Date | null   // null si toujours actif
    }
  ]
}
```

### Praticien (Professionnel de Santé)
```typescript
{
  nom: string,
  prenom: string,
  specialite: string,
  adresse: string,
  telephone: string
}
```

### Visite (Rapport de Visite)
```typescript
{
  visiteur: ObjectId,    // Référence au Visiteur
  praticien: ObjectId,   // Référence au Praticien
  date: Date,
  commentaire: string,
  motif: string
}
```

### Relations
- Un **Visiteur** peut avoir plusieurs **Praticiens** dans son portefeuille
- Une **Visite** référence un **Visiteur** et un **Praticien**
- Le portefeuille est un document embarqué dans le modèle Visiteur

## Sécurité

### Mesures de sécurité implémentées

1. **Rate Limiting** : Limitation à 10 requêtes par minute par IP sur tous les endpoints `/api/*`
2. **CORS** : Configuration pour les requêtes cross-origin
3. **Helmet** : Sécurisation des headers HTTP
4. **XSS Protection** : Protection contre les attaques XSS
5. **Validation des données** : Utilisation d'express-validator
6. **Hachage de mots de passe** : Bcrypt disponible pour l'authentification

### Rate Limiting
- **Fenêtre** : 1 minute
- **Limite** : 10 requêtes par IP
- **Endpoints protégés** : Tous les `/api/*`
- **Endpoints exclus** : `/` et `/health`

## Scripts disponibles

| Script | Commande | Description |
|--------|----------|-------------|
| Développement | `npm run dev` | Lance le serveur en mode développement avec nodemon |
| Build | `npm run build` | Compile TypeScript vers JavaScript dans `dist/` |
| Production | `npm start` | Lance le serveur compilé en production |

## Arrêt gracieux

L'application gère l'arrêt gracieux (SIGINT/Ctrl+C) en :
1. Fermant la connexion MongoDB proprement
2. Terminant le serveur HTTP
3. Affichant un message de confirmation

## Auteur

Adriano74f

## Licence

ISC

---

Pour toute question ou contribution, n'hésitez pas à ouvrir une issue ou une pull request.
