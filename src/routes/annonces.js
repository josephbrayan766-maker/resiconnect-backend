const express = require('express')
const router = express.Router()
const db = require('../database')
const auth = require('../middleware/auth')

// Récupérer toutes les annonces
router.get('/', auth, (req, res) => {
    try {
        const annonces = db.prepare('SELECT * FROM annonces ORDER BY id DESC').all()
        res.json(annonces)
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

// Créer une annonce (gestionnaire)
router.post('/', auth, (req, res) => {
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Accès refusé' })

    const { titre, contenu, date } = req.body
    try {
        db.prepare('INSERT INTO annonces (titre, contenu, date) VALUES (?, ?, ?)').run(titre, contenu, date)
        res.json({ message: 'Annonce créée avec succès' })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

// Supprimer une annonce (gestionnaire)
router.delete('/:id', auth, (req, res) => {
    if (req.user.role !== 'manager') return res.status(403).json({ error: 'Accès refusé' })

    try {
        db.prepare('DELETE FROM annonces WHERE id = ?').run(req.params.id)
        res.json({ message: 'Annonce supprimée' })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router