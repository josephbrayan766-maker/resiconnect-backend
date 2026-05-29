# Resiconnect — Backend

API REST pour l'application de gestion de résidence Resiconnect.

## Technologies
- Node.js + Express
- better-sqlite3
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

## Lancer le projet

```bash
npm install
node src/seed.js
node src/index.js
```

## Variables d'environnement

Crée un fichier `.env` à la racine :

```
PORT=5000
JWT_SECRET=resiconnect_secret_2026
```

## Routes API

### Auth
- `POST /api/auth/login` — Connexion
- `POST /api/auth/register` — Inscription

### Paiements
- `GET /api/paiements` — Paiements du résident connecté
- `GET /api/paiements/all` — Tous les paiements (gestionnaire)

### Tickets
- `GET /api/tickets` — Tickets du résident connecté
- `GET /api/tickets/all` — Tous les tickets (gestionnaire)
- `POST /api/tickets` — Créer un ticket
- `PUT /api/tickets/:id` — Mettre à jour le statut

### Annonces
- `GET /api/annonces` — Toutes les annonces
- `POST /api/annonces` — Créer une annonce (gestionnaire)
- `DELETE /api/annonces/:id` — Supprimer une annonce (gestionnaire)

## Frontend
Le frontend est disponible sur : https://github.com/josephbrayan766-maker/resiconnect-frontend