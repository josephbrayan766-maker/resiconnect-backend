const express = require('express')
const router = express.Router()
const db = require('../database')
const auth = require('../middleware/auth')

// Récupérer les paiements de l'utilisateur connecté
router.get('/', auth, (req, res) => {
    try {
        const paiements = db.prepare('SELECT * FROM paiements WHERE user_id = ?').all(req.user.id)
        res.json(paiements)
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

// Récupérer tous les paiements (gestionnaire)
router.get('/all', auth, (req, res) => {
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Accès refusé' })

    try {
        const paiements = db.prepare(`
      SELECT p.*, u.nom, u.email 
      FROM paiements p 
      JOIN users u ON p.user_id = u.id
    `).all()
        res.json(paiements)
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router