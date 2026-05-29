const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
const authRoutes = require('./routes/auth')
const paiementRoutes = require('./routes/paiements')
const ticketRoutes = require('./routes/tickets')
const annonceRoutes = require('./routes/annonces')

app.use('/api/auth', authRoutes)
app.use('/api/paiements', paiementRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/annonces', annonceRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Resiconnect API fonctionne !' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Serveur Resiconnect démarré sur le port ${PORT}`)
})