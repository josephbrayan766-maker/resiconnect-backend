const bcrypt = require('bcryptjs')
const db = require('./database')

// Créer les utilisateurs
const users = [
    { nom: 'Admin Gestionnaire', email: 'gestionnaire@resiconnect.com', mot_de_passe: 'admin123', role: 'manager' },
    { nom: 'Jean Dupont', email: 'jean@resiconnect.com', mot_de_passe: 'jean123', role: 'resident' },
    { nom: 'Marie Curie', email: 'marie@resiconnect.com', mot_de_passe: 'marie123', role: 'resident' },
    { nom: 'Paul Martin', email: 'paul@resiconnect.com', mot_de_passe: 'paul123', role: 'resident' },
]

users.forEach(u => {
    try {
        const hash = bcrypt.hashSync(u.mot_de_passe, 10)
        db.prepare('INSERT OR IGNORE INTO users (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)').run(u.nom, u.email, hash, u.role)
    } catch (err) { }
})

// Récupérer les IDs
const jean = db.prepare('SELECT id FROM users WHERE email = ?').get('jean@resiconnect.com')
const marie = db.prepare('SELECT id FROM users WHERE email = ?').get('marie@resiconnect.com')
const paul = db.prepare('SELECT id FROM users WHERE email = ?').get('paul@resiconnect.com')

// Paiements
const paiements = [
    { user_id: jean.id, mois: 'Mai 2026', montant: 650, statut: 'Payé' },
    { user_id: jean.id, mois: 'Avril 2026', montant: 650, statut: 'Non payé' },
    { user_id: marie.id, mois: 'Mai 2026', montant: 720, statut: 'Non payé' },
    { user_id: paul.id, mois: 'Mai 2026', montant: 580, statut: 'Non payé' },
]

paiements.forEach(p => {
    db.prepare('INSERT OR IGNORE INTO paiements (user_id, mois, montant, statut) VALUES (?, ?, ?, ?)').run(p.user_id, p.mois, p.montant, p.statut)
})

// Tickets
const tickets = [
    { user_id: jean.id, titre: 'Fuite robinet', description: 'Le robinet de la cuisine fuit', statut: 'En cours' },
    { user_id: marie.id, titre: 'Chauffage en panne', description: 'Le chauffage ne fonctionne plus', statut: 'Résolu' },
    { user_id: paul.id, titre: 'Porte cassée', description: 'La porte d\'entrée ne ferme plus', statut: 'En cours' },
]

tickets.forEach(t => {
    db.prepare('INSERT OR IGNORE INTO tickets (user_id, titre, description, statut) VALUES (?, ?, ?, ?)').run(t.user_id, t.titre, t.description, t.statut)
})

// Annonces
const annonces = [
    { titre: 'Réunion résidents', contenu: 'Réunion générale dans la salle commune', date: '01/06/2026' },
    { titre: 'Travaux ascenseur', contenu: 'L\'ascenseur sera en maintenance du 15 au 17 juin', date: '15/06/2026' },
]

annonces.forEach(a => {
    db.prepare('INSERT OR IGNORE INTO annonces (titre, contenu, date) VALUES (?, ?, ?)').run(a.titre, a.contenu, a.date)
})

console.log('Base de données initialisée avec succès !')