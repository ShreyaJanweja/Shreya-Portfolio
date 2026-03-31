import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { sendContact } from '../utils/contactApi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      console.log('🔄 Submitting contact form...')
      await sendContact(formData)
      console.log('✅ Contact form submitted successfully')
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      console.error('❌ Contact form error:', error)
      setStatus('error')
      
      // Keep error message visible until user clicks send again
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section relative z-10">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="mt-8 text-xl text-white/70 max-w-2xl mx-auto">
            Let's build something amazing together. Send me a message and I'll respond within 24 hours.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {status === 'success' && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-8 rounded-3xl mb-8 text-center border-2 border-neon-blue/50 bg-blue-500/10 backdrop-blur-md"
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Message Sent!</h3>
              <p className="text-blue-200">Thank you! I'll get back to you soon.</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-8 rounded-3xl mb-8 text-center border-2 border-red-400/50 bg-red-500/10"
            >
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">Something went wrong</h3>
              <p className="text-red-200">Please try again or email me directly.</p>
            </motion.div>
          )}

          <motion.form 
            onSubmit={handleSubmit}
            className="glass p-10 lg:p-12 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-neon-glow transition-all duration-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-white/80 font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-5 rounded-2xl bg-dark-surface/50 border border-white/20 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/30 transition-all duration-300 text-lg backdrop-blur-sm placeholder-white/40"
                  placeholder="Shreya"
                />
              </div>
              
              <div>
                <label className="block text-white/80 font-semibold mb-3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-5 rounded-2xl bg-dark-surface/50 border border-white/20 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/30 transition-all duration-300 text-lg backdrop-blur-sm placeholder-white/40"
                  placeholder="shreya@example.com"
                />
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-white/80 font-semibold mb-3">Message</label>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-5 rounded-3xl bg-dark-surface/50 border border-white/20 focus:border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple/30 transition-all duration-300 text-lg backdrop-blur-sm resize-none placeholder-white/40"
                placeholder="Tell me about your project, job opportunity, or just say hi!"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full lg:w-auto px-12 lg:px-16 py-6 bg-gradient-to-r from-neon-purple to-neon-blue text-dark-bg font-bold text-xl rounded-3xl hover:shadow-neon-glow hover:shadow-purple-500/50 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>
        </motion.div>

 
      </div>
    </section>
  )
}

export default Contact

