const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

// Nodemailer transporter
let transporter

const initTransporter = () => {
  transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send contact email
router.post('/', async (req, res) => {
  try {
    if (!transporter) initTransporter()
    
    const { name, email, message } = req.body

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A78BFA;">New message from ${name}</h2>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; border-left: 4px solid #A78BFA;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #333;" />
          <p style="color: #666; font-size: 14px;">
            This email was sent from Shreya's portfolio website.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll reply soon.' 
    })

  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

module.exports = router

