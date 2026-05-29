const express = require('express')
const router = express.Router()
const db = require('../database')
const auth = require('../middleware/auth')

// Récupérer les tickets de l'utilisateur connecté
router.get('/', auth, (req, res) => {
    try {
        const tickets = db.prepare('SELECT * FROM tickets WHERE user_id = ?').all(req.user.id)
        res.json(tickets)
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

// Récupérer tous les tickets (gestionnaire)
router.get('/all', auth, (req, res) => {
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Accès refusé' })

    try {
        const tickets = db.prepare(`
      SELECT t.*, u.nom, u.email 
      FROM tickets t 
      JOIN users u ON t.user_id = u.id
    `).all()
        res.json(tickets)
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

// Créer un ticket (résident)
router.post('/', auth, (req, res) => {
    const { titre, description } = req.body
    try {
        db.prepare('INSERT INTO tickets (user_id, titre, description) VALUES (?, ?, ?)').run(req.user.id, titre, description)
        res.json({ message: 'Ticket créé avec succès' })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

// Mettre à jour le statut d'un ticket (gestionnaire)
router.put('/:id', auth, (req, res) => {
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Accès refusé' })

    const { statut } = req.body
    try {
        db.prepare('UPDATE tickets SET statut = ? WHERE id = ?').run(statut, req.params.id)
        res.json({ message: 'Statut mis à jour' })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router