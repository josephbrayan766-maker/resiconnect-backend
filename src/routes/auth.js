const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Register
router.post('/register', (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body

    try {
        const hash = bcrypt.hashSync(mot_de_passe, 10)
        const stmt = db.prepare('INSERT INTO users (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)')
        stmt.run(nom, email, hash, role || 'resident')
        res.json({ message: 'Compte créé avec succès' })
    } catch (err) {
        res.status(400).json({ error: 'Email déjà utilisé' })
    }
})

// Login
router.post('/login', (req, res) => {
    const { email, mot_de_passe } = req.body

    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
        if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' })

        const valid = bcrypt.compareSync(mot_de_passe, user.mot_de_passe)
        if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect' })

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({ token, role: user.role, nom: user.nom })
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router