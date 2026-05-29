const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, '../resiconnect.db'))

// Création des tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'resident'
  );

  CREATE TABLE IF NOT EXISTS paiements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    mois TEXT NOT NULL,
    montant REAL NOT NULL,
    statut TEXT NOT NULL DEFAULT 'Non payé',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    statut TEXT NOT NULL DEFAULT 'En cours',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS annonces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    date TEXT NOT NULL
  );
`)

module.exports = db