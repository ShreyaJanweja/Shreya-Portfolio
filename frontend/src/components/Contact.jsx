import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sendContact } from '../utils/contactApi'

// ─── HUD corner brackets ───────────────────────────────────────────────────────
function HUDCorners({ color = '#a78bfa', size = 16 }) {
  const s = `${size}px`
  const b = `2px solid ${color}55`
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: s, height: s, borderTop: b, borderLeft: b, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: s, height: s, borderTop: b, borderRight: b, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: s, height: s, borderBottom: b, borderLeft: b, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: s, height: s, borderBottom: b, borderRight: b, pointerEvents: 'none' }} />
    </>
  )
}

// ─── Animated input ────────────────────────────────────────────────────────────
function FuturisticInput({ label, name, type = 'text', value, onChange, placeholder, required, color = '#a78bfa' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest uppercase mb-2"
        style={{ color: focused ? color : 'rgba(255,255,255,0.35)', transition: 'color 0.3s' }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type} name={name} value={value} onChange={onChange}
          required={required} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white placeholder-white/25 outline-none transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${focused ? color + '66' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: focused ? `0 0 20px ${color}18, inset 0 1px 0 ${color}12` : 'none',
            caretColor: color,
          }}
        />
        <motion.div className="absolute bottom-0 left-0 h-px rounded-full"
          animate={{ width: focused ? '100%' : '0%', opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
      </div>
    </div>
  )
}

// ─── Animated textarea ─────────────────────────────────────────────────────────
function FuturisticTextarea({ label, name, value, onChange, placeholder, required, rows = 5, color = '#22d3ee' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block text-xs font-bold tracking-widest uppercase mb-2"
        style={{ color: focused ? color : 'rgba(255,255,255,0.35)', transition: 'color 0.3s' }}>
        {label}
      </label>
      <div className="relative">
        <textarea
          name={name} rows={rows} value={value} onChange={onChange}
          required={required} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className="w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white placeholder-white/25 outline-none resize-none transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${focused ? color + '66' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: focused ? `0 0 20px ${color}18, inset 0 1px 0 ${color}12` : 'none',
            caretColor: color,
          }}
        />
        <motion.div className="absolute bottom-0 left-0 h-px rounded-full"
          animate={{ width: focused ? '100%' : '0%', opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
      </div>
    </div>
  )
}

// ─── Main Contact Component ────────────────────────────────────────────────────
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })
  const sectionRef = useRef()

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    setCursorPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  // ── BACKEND LOGIC PRESERVED EXACTLY ──────────────────────────────────────────
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
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      console.error('❌ Contact form error:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '-6%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(45px)' }} />
      </div>

      {/* Cursor glow */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{
          position: 'absolute', left: cursorPos.x, top: cursorPos.y,
          width: 380, height: 380, transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, rgba(34,211,238,0.04) 45%, transparent 70%)',
          borderRadius: '50%', transition: 'left 0.06s ease-out, top 0.06s ease-out',
        }} />
      </div>

      <div className="container mx-auto relative" style={{ zIndex: 2 }}>

        {/* Heading */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-xs tracking-[0.35em] uppercase font-bold mb-3"
            style={{ color: 'rgba(167,139,250,0.55)' }}>— Let's Talk —</p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 55%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Get In Touch
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, #a78bfa, transparent)' }} />
          <p className="mt-5 text-sm lg:text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Let's build something amazing together. Send me a message and I'll respond within 24 hours.
          </p>
        </motion.div>

        {/* ── Centered form ── */}
        <div className="max-w-2xl mx-auto">

          {/* Status banners */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div key="success"
                initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.35 }}
                className="relative rounded-2xl p-5 mb-5 overflow-hidden"
                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, #34d39966, transparent)' }} />
                <div className="flex items-center gap-3">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#34d399' }}>Message Sent Successfully!</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Thank you! I'll get back to you soon.</p>
                  </div>
                </div>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div key="error"
                initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }} transition={{ duration: 0.35 }}
                className="relative rounded-2xl p-5 mb-5 overflow-hidden"
                style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)' }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(248,113,113,0.5), transparent)' }} />
                <div className="flex items-center gap-3">
                  <span className="text-2xl"></span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#f87171' }}>Something went wrong</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Please try again or email me directly.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(4,2,12,0.97) 70%)', border: '1px solid rgba(34,211,238,0.14)' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <HUDCorners color="#22d3ee" />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)' }} />

            <form onSubmit={handleSubmit} className="p-7 lg:p-10 space-y-6">
              <p className="text-xs tracking-widest uppercase font-bold mb-2"
                style={{ color: 'rgba(255,255,255,0.28)' }}>Send a Message</p>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <FuturisticInput label="Full Name" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Your name" required color="#a78bfa" />
                <FuturisticInput label="Email Address" name="email" type="email" value={formData.email}
                  onChange={handleChange} placeholder="you@example.com" required color="#22d3ee" />
              </div>

              {/* Message */}
              <FuturisticTextarea label="Message" name="message" value={formData.message}
                onChange={handleChange} required rows={6} color="#34d399"
                placeholder="Tell me about your project, opportunity, or just say hi! " />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase overflow-hidden"
                style={{
                  background: loading
                    ? 'rgba(167,139,250,0.08)'
                    : 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(34,211,238,0.14))',
                  border: '1px solid rgba(167,139,250,0.45)',
                  color: loading ? 'rgba(255,255,255,0.35)' : '#ede9fe',
                  boxShadow: loading ? 'none' : '0 0 30px rgba(167,139,250,0.18)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                whileHover={!loading ? { scale: 1.01, boxShadow: '0 0 50px rgba(167,139,250,0.4)' } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
              >
                {/* Shimmer sweep */}
                {!loading && (
                  <motion.div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }} />
                )}
                <div className="relative flex items-center justify-center gap-2.5">
                  {loading ? (
                    <>
                      <motion.div className="w-4 h-4 rounded-full border-2"
                        style={{ borderColor: 'rgba(167,139,250,0.3)', borderTopColor: '#a78bfa' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                    </>
                  )}
                </div>
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Contact
