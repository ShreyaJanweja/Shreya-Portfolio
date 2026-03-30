const express = require('express')
const router = express.Router()

// Send contact email
router.post('/', async (req, res) => {
  try {
    const transporter = req.transporter
    
    if (!transporter) {
      console.error('❌ Email transporter not initialized')
      return res.status(500).json({ error: 'Email service not available. Please try again later.' })
    }
    
    const { name, email, message } = req.body

    // Validate input
    if (!name || !email || !message) {
      console.warn('⚠️  Missing required fields:', { name: !!name, email: !!email, message: !!message })
      return res.status(400).json({ error: 'Missing required fields: name, email, message' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn('⚠️  Invalid email format:', email)
      return res.status(400).json({ error: 'Invalid email format' })
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

    console.log('📨 Sending email to:', process.env.OWNER_EMAIL, 'from:', email)
    
    await transporter.sendMail(mailOptions)

    console.log('✅ Email sent successfully from:', email)
    res.json({ 
      success: true, 
      message: 'Message sent successfully! I\'ll reply soon.' 
    })

  } catch (error) {
    console.error('❌ Email sending error:', {
      message: error.message,
      code: error.code,
      command: error.command
    })
    res.status(500).json({ 
      error: 'Failed to send email. Please check backend logs or try again later.' 
    })
  }
})

module.exports = router

