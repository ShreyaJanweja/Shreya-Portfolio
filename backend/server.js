require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const contactRoutes = require('./routes/contact')
const chatRoutes = require('./routes/chat')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://shreya-portfolio.vercel.app'] 
    : ['http://localhost:5173']
}))
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/chat', chatRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Shreya Portfolio Backend - Contact API ready!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'YES' : 'NO - Check .env'}`)
})

module.exports = app

