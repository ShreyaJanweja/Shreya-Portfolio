import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ──────────────────────────────────────────────────────────────────────

const TRAITS = [
  { label: 'Curious Learner',  color: '#a78bfa', icon: '◈' },
  { label: 'Problem Solver',   color: '#22d3ee', icon: '⚡' },
  { label: 'Creative Builder', color: '#34d399', icon: '◎' },
  { label: 'AI Explorer',      color: '#fb923c', icon: '⬡' },
  { label: 'UI Obsessed',      color: '#f472b6', icon: '✦' },
]

const INFO_ROWS = [
  { key: 'Name',       val: 'Shreya',                 color: '#a78bfa',
    detail: 'That\'s me — building cool things' },
  { key: 'Role',       val: 'Full Stack Developer',   color: '#22d3ee',
    detail: 'Frontend · Backend · UI/UX' },
  { key: 'University', val: 'Chitkara University',    color: '#34d399',
    detail: 'Punjab, India' },
  { key: 'Batch',      val: '2024 – 2028',            color: '#f472b6',
    detail: 'B.Tech Computer Science Engineering' },
  { key: 'Focus',      val: 'Web · AI · Design',      color: '#fb923c',
    detail: 'React · Node.js · LLMs · Figma' },
]

// ─── Animated counter ──────────────────────────────────────────────────────────

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400, step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ─── Glitch text ───────────────────────────────────────────────────────────────

function GlitchText({ text, color }) {
  const [glitch, setGlitch] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-block" style={{ color }}>
      {text}
      {glitch && (
        <>
          <span className="absolute inset-0 pointer-events-none"
            style={{ color: '#22d3ee', clipPath: 'inset(30% 0 50% 0)', transform: 'translateX(-3px)', opacity: 0.8 }}>{text}</span>
          <span className="absolute inset-0 pointer-events-none"
            style={{ color: '#f472b6', clipPath: 'inset(60% 0 10% 0)', transform: 'translateX(3px)', opacity: 0.7 }}>{text}</span>
        </>
      )}
    </span>
  )
}

// ─── Scan card ─────────────────────────────────────────────────────────────────

function ScanCard({ children, color = '#a78bfa', className = '', style = {} }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color}0a 0%, rgba(5,2,15,0.95) 70%)`,
        border: `1px solid ${color}22`,
        boxShadow: `0 0 30px ${color}10, inset 0 1px 0 ${color}15`,
        ...style,
      }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
        zIndex: 0,
      }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ─── Stat block ────────────────────────────────────────────────────────────────

function StatBlock({ target, suffix, label, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}>
      <ScanCard color={color} className="p-4 text-center">
        <p className="text-3xl font-black tabular-nums" style={{ color, textShadow: `0 0 24px ${color}88` }}>
          <Counter target={target} suffix={suffix} />
        </p>
        <p className="text-xs tracking-widest uppercase mt-1 font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {label}
        </p>
      </ScanCard>
    </motion.div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────

const About = () => {
  const sectionRef = useRef()
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    setCursorPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '15%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Cursor glow */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none" style={{ zIndex: 1 }}>
        <div style={{
          position: 'absolute', left: cursorPos.x, top: cursorPos.y,
          width: 360, height: 360, transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, rgba(34,211,238,0.05) 45%, transparent 70%)',
          borderRadius: '50%', transition: 'left 0.06s ease-out, top 0.06s ease-out', filter: 'blur(1px)',
        }} />
      </div>

      <div className="container mx-auto relative" style={{ zIndex: 2 }}>

        {/* Heading */}
        <motion.div className="mb-14 text-center"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-xs tracking-[0.35em] uppercase font-bold mb-3" style={{ color: 'rgba(167,139,250,0.55)' }}>— Who I Am —</p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight"
            style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 55%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            About Me
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(to right, transparent, #a78bfa, transparent)' }} />
        </motion.div>

        {/* ── 2-col grid — both columns same height ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col gap-6">

            {/* Profile card — flex-1 so it stretches */}
            <motion.div className="flex-1"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
              <ScanCard color="#a78bfa" className="h-full p-6">
                <div className="flex items-center gap-5">
                  {/* Photo */}
                  <div className="relative flex-shrink-0">
                    <motion.div className="absolute -inset-1 rounded-2xl"
                      animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                      style={{ background: 'conic-gradient(from 0deg, #a78bfa, #22d3ee, #34d399, #f472b6, #a78bfa)', borderRadius: 18, padding: 2 }}>
                      <div className="w-full h-full rounded-2xl" style={{ background: '#050210' }} />
                    </motion.div>
                    <div className="relative w-24 h-28 rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(167,139,250,0.25)' }}>
                      <img src="/assets/profilePic.png" alt="Shreya" className="w-full h-full object-cover" />
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.08) 0%, transparent 60%)' }} />
                    </div>
                    {/* Online dot */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black"
                      style={{ background: '#34d399', boxShadow: '0 0 10px #34d399' }}>
                      <motion.div className="w-full h-full rounded-full"
                        animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ background: '#34d399' }} />
                    </div>
                  </div>

                  {/* Name + role */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-2"
                      style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Available
                    </span>
                    <h3 className="text-3xl font-black text-white leading-tight">
                      <GlitchText text="Shreya" color="#a78bfa" />
                    </h3>
                    <p className="text-sm font-semibold mt-1" style={{ color: '#22d3ee' }}>Full Stack Developer</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>CSE @ Chitkara · 2024–2028</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  Passionate about building modern web applications and immersive user experiences. Skilled in{' '}
                  <span style={{ color: '#22d3ee', fontWeight: 600 }}>React</span>,{' '}
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Node.js</span>, and exploring{' '}
                  <span style={{ color: '#fb923c', fontWeight: 600 }}>AI-powered</span>{' '}
                  solutions that push creative boundaries.
                </p>

                {/* Traits */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {TRAITS.map((t, i) => (
                    <motion.span key={t.label}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, color: t.color }}
                      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.06 }}
                      whileHover={{ scale: 1.08, y: -2 }}>
                      {t.icon} {t.label}
                    </motion.span>
                  ))}
                </div>
              </ScanCard>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <StatBlock target={15} suffix="+" label="Tech Stack"  color="#a78bfa" index={0} />
              <StatBlock target={4}  suffix="+" label="Hackathons"  color="#34d399" index={1} />
              <StatBlock target={5}  suffix="+" label="Projects"    color="#f472b6" index={2} />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.55 }}>
              <motion.a href="#contact"
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-bold text-sm tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(34,211,238,0.10))',
                  border: '1px solid rgba(167,139,250,0.40)',
                  color: '#ede9fe',
                  boxShadow: '0 0 30px rgba(167,139,250,0.18)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(167,139,250,0.40)' }}
                whileTap={{ scale: 0.98 }}>
                <span>Let's Connect</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* ══ RIGHT — Identity File fills full height ══ */}
          <motion.div className="flex flex-col"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>

            <ScanCard color="#22d3ee" className="flex-1 flex flex-col">
              <div className="p-6 flex flex-col h-full">

                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs tracking-widest uppercase font-bold" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    Identity File
                  </p>
                  {/* Blinking cursor */}
                  <motion.div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
                    <motion.div className="w-2 h-2 rounded-full"
                      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                      style={{ background: '#22d3ee', boxShadow: '0 0 8px #22d3ee' }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
                  </motion.div>
                </div>

                {/* Rows — evenly spaced to fill card */}
                <div className="flex flex-col flex-1 justify-between">
                  {INFO_ROWS.map((row, i) => (
                    <motion.div key={row.key}
                      className="group relative rounded-xl px-4 py-4 cursor-default"
                      style={{
                        background: `${row.color}08`,
                        border: `1px solid ${row.color}18`,
                        transition: 'all 0.25s',
                      }}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.09 }}
                      whileHover={{
                        borderColor: row.color + '55',
                        backgroundColor: row.color + '12',
                        x: 4,
                      }}>
                      {/* Accent left bar */}
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: row.color, boxShadow: `0 0 8px ${row.color}` }} />

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: row.color, boxShadow: `0 0 8px ${row.color}` }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-bold tracking-widest uppercase"
                              style={{ color: `${row.color}99` }}>
                              {row.key}
                            </span>
                            <span className="text-sm font-bold text-white/85">{row.val}</span>
                          </div>
                          {/* Sub-detail — visible on hover */}
                          <motion.p
                            className="text-xs mt-1 overflow-hidden"
                            style={{ color: `${row.color}77` }}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 'auto', opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 + i * 0.09 }}
                          >
                            {row.detail}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer bar */}
                <div className="mt-6 pt-4"
                  style={{ borderTop: '1px solid rgba(34,211,238,0.12)' }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      Status: Active & Building
                    </p>
                    <motion.div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                      style={{ background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.25)' }}>
                      <motion.div className="w-1.5 h-1.5 rounded-full"
                        animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                        style={{ background: '#34d399' }} />
                      <span className="text-xs font-bold" style={{ color: '#34d399' }}>Online</span>
                    </motion.div>
                  </div>
                </div>

              </div>
            </ScanCard>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default About
