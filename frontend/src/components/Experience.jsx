import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import * as THREE from 'three'

// ─── Experience Data ───────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    id: 'cn',
    index: '01',
    role: 'Technical Team Executive',
    company: 'Coding Ninjas CUIET',
    date: 'Oct 2025 – Present',
    type: 'Full-time · On-site',
    color: '#a78bfa',
    glowColor: '#7c3aed',
    icon: '⬡',
    description:
      'Developed and maintained websites for technical events, workshops, and community initiatives. Collaborated with peers to organize hackathons, coding competitions, and technical sessions while fostering a strong coding culture within the community.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Git', 'GitHub', 'Canva'],
    offerLetter: '/assets/offerLetterCN.png',
  },
  {
    id: 'sc',
    index: '02',
    role: 'Web Development Intern',
    company: 'SkillCraft Technology',
    date: 'Sep 1 – Sep 30, 2025',
    type: 'Internship · Remote',
    color: '#22d3ee',
    glowColor: '#0891b2',
    icon: '◈',
    description:
      'Built and styled responsive web applications using modern frameworks and tools. Focused on creating user-friendly interfaces, implementing responsive design, and optimizing performance for better user experience.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    offerLetter: '/assets/offerLetterSkillCraft.png',
  },
  {
    id: 'os',
    index: '03',
    role: 'Open Source Contributor',
    company: 'Open Source India Connect',
    date: 'Aug 1 – Aug 15, 2025',
    type: 'Contributor · Remote',
    color: '#34d399',
    glowColor: '#059669',
    icon: '✦',
    description:
      'Collaborated on open-source projects with a team of developers. Contributed code, fixed bugs, documented features, and participated in discussions to improve project quality and community engagement.',
    technologies: ['Git', 'GitHub', 'JavaScript', 'Python'],
    offerLetter: '/assets/Contributer.png',
  },
]

// ─── 3D Background: Floating geometric fragments ───────────────────────────────

function Fragment({ position, color, speed, rotSpeed, shape }) {
  const ref = useRef()
  const [init] = useState(() => [...position])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current) return
    ref.current.position.y = init[1] + Math.sin(t * speed + init[0]) * 0.4
    ref.current.rotation.x = t * rotSpeed
    ref.current.rotation.y = t * rotSpeed * 0.7
    ref.current.rotation.z = t * rotSpeed * 0.4
  })

  const geo = useMemo(() => {
    if (shape === 'oct') return new THREE.OctahedronGeometry(0.18, 0)
    if (shape === 'ico') return new THREE.IcosahedronGeometry(0.15, 0)
    return new THREE.TetrahedronGeometry(0.16, 0)
  }, [shape])

  return (
    <mesh ref={ref} position={position} geometry={geo}>
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={0.9}
        roughness={0.1} metalness={0.95} transparent opacity={0.75}
      />
    </mesh>
  )
}

function GridLines() {
  const ref = useRef()
  const geo = useMemo(() => {
    const pts = []
    for (let x = -14; x <= 14; x += 2) {
      pts.push(new THREE.Vector3(x, -4, -8))
      pts.push(new THREE.Vector3(x, -4, 8))
    }
    for (let z = -8; z <= 8; z += 2) {
      pts.push(new THREE.Vector3(-14, -4, z))
      pts.push(new THREE.Vector3(14, -4, z))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02
  })

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#a78bfa" transparent opacity={0.07} />
    </lineSegments>
  )
}

function StarDust() {
  const ref = useRef()
  const pos = useMemo(() => {
    const a = new Float32Array(900)
    for (let i = 0; i < 900; i++) a[i] = (Math.random() - 0.5) * 60
    return a
  }, [])
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.004 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /></bufferGeometry>
      <pointsMaterial size={0.07} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function ExperienceScene() {
  const fragments = useMemo(() => {
    const shapes = ['oct', 'ico', 'tet']
    const colors = ['#a78bfa', '#22d3ee', '#34d399', '#f472b6', '#fb923c']
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      position: [(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8 - 3],
      color: colors[i % colors.length],
      speed: 0.3 + Math.random() * 0.5,
      rotSpeed: 0.2 + Math.random() * 0.4,
      shape: shapes[i % 3],
    }))
  }, [])

  return (
    <>
      <ambientLight intensity={0.25} color="#c4b5fd" />
      <pointLight position={[0, 6, 4]} color="#a78bfa" intensity={3} distance={20} decay={2} />
      <pointLight position={[8, -3, 0]} color="#22d3ee" intensity={2} distance={16} decay={2} />
      <pointLight position={[-8, 2, -2]} color="#34d399" intensity={1.5} distance={14} decay={2} />
      <StarDust />
      <GridLines />
      {fragments.map(f => <Fragment key={f.id} {...f} />)}
    </>
  )
}

// ─── HUD Corner decoration ─────────────────────────────────────────────────────

function HUDCorners({ color }) {
  const c = color + '88'
  return (
    <>
      {/* TL */}
      <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
        style={{ borderTop: `2px solid ${c}`, borderLeft: `2px solid ${c}` }} />
      {/* TR */}
      <div className="absolute top-0 right-0 w-5 h-5 pointer-events-none"
        style={{ borderTop: `2px solid ${c}`, borderRight: `2px solid ${c}` }} />
      {/* BL */}
      <div className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none"
        style={{ borderBottom: `2px solid ${c}`, borderLeft: `2px solid ${c}` }} />
      {/* BR */}
      <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
        style={{ borderBottom: `2px solid ${c}`, borderRight: `2px solid ${c}` }} />
    </>
  )
}

// ─── Offer Letter Modal ────────────────────────────────────────────────────────

function OfferModal({ src, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden max-w-3xl w-full"
        style={{ border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 80px rgba(167,139,250,0.3)' }}
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <HUDCorners color="#a78bfa" />
        <motion.button
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg"
          style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.35)', color: '#a78bfa' }}
          whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >×</motion.button>
        <img src={src} alt="Offer Letter" className="w-full h-auto max-h-[82vh] object-contain" style={{ background: '#0a0514' }} />
      </motion.div>
    </motion.div>
  )
}

// ─── Single Experience Card ────────────────────────────────────────────────────

function ExperienceCard({ exp, index, isActive, onToggle, onOfferClick }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Floating card */}
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        animate={{ y: [0, isEven ? -6 : -4, 0] }}
        transition={{ duration: 3.5 + index * 0.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.8 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
        onClick={onToggle}
        style={{
          background: `linear-gradient(135deg, ${exp.color}0e 0%, rgba(4,2,12,0.97) 65%)`,
          border: `1px solid ${isActive ? exp.color + '55' : exp.color + '20'}`,
          boxShadow: isActive
            ? `0 0 60px ${exp.glowColor}35, 0 0 120px ${exp.glowColor}12, inset 0 1px 0 ${exp.color}20`
            : `0 8px 40px rgba(0,0,0,0.5), 0 0 20px ${exp.glowColor}10`,
          transition: 'border 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Top accent shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${exp.color}${isActive ? 'cc' : '44'}, transparent)` }} />

        {/* HUD corners */}
        <HUDCorners color={exp.color} />

        {/* Scan line sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 40%, ${exp.color}06 50%, transparent 60%)`,
            backgroundSize: '100% 200%',
          }}
          animate={{ backgroundPositionY: ['0%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        <div className="p-6 lg:p-7">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Index badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs"
                style={{
                  background: `${exp.color}18`,
                  border: `1px solid ${exp.color}30`,
                  color: exp.color,
                  boxShadow: `0 0 16px ${exp.glowColor}25`,
                  fontFamily: 'monospace',
                }}>
                {exp.index}
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: `${exp.color}88` }}>
                  {exp.type}
                </p>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{exp.date}</p>
              </div>
            </div>

            {/* Icon + expand indicator */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl" style={{ color: exp.color }}>{exp.icon}</span>
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}25`, color: exp.color }}
              >▼</motion.div>
            </div>
          </div>

          {/* Role + company */}
          <div className="mb-4">
            <h3 className="text-xl lg:text-2xl font-black text-white leading-tight mb-1">{exp.role}</h3>
            <p className="text-base font-bold" style={{ color: exp.color }}>{exp.company}</p>
          </div>

          {/* Tech pills always visible */}
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}25`, color: `${exp.color}cc` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Expandable section */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${exp.color}20` }}>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {exp.description}
                  </p>

                  {/* Offer letter button */}
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${exp.glowColor}44` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={e => { e.stopPropagation(); onOfferClick(exp.offerLetter) }}
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-sm"
                    style={{
                      background: `${exp.color}14`,
                      border: `1px solid ${exp.color}40`,
                      color: exp.color,
                      boxShadow: `0 0 16px ${exp.glowColor}15`,
                    }}
                  >
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.span>
                    View Offer Letter
                    <span style={{ opacity: 0.6 }}>↗</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Drop shadow glow under card */}
      <div className="absolute -bottom-3 left-8 right-8 h-6 rounded-full blur-xl pointer-events-none"
        style={{ background: `${exp.glowColor}${isActive ? '30' : '15'}`, transition: 'background 0.3s' }} />
    </motion.div>
  )
}



// ─── Main Experience Component ─────────────────────────────────────────────────

const Experience = () => {
  const [activeId, setActiveId] = useState(null)
  const [modalSrc, setModalSrc] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })
  const sectionRef = useRef()

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const r = sectionRef.current.getBoundingClientRect()
    setCursorPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  const toggle = (id) => setActiveId(p => p === id ? null : id)

  return (
    <>
      <section
        id="experience"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="section relative overflow-hidden"
        style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '6rem' }}
      >
        {/* ── 3D canvas background ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 12], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
            dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}
          >
            <ExperienceScene />
          </Canvas>
        </div>

        {/* ── Ambient blobs ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div style={{ position: 'absolute', top: '10%', left: '-8%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '15%', right: '-5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', top: '55%', left: '40%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>

        {/* ── Cursor glow ── */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none" style={{ zIndex: 2 }}>
          <div style={{
            position: 'absolute', left: cursorPos.x, top: cursorPos.y,
            width: 400, height: 400, transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, rgba(34,211,238,0.04) 45%, transparent 70%)',
            borderRadius: '50%', transition: 'left 0.07s ease-out, top 0.07s ease-out',
          }} />
        </div>

        <div className="container mx-auto relative" style={{ zIndex: 3 }}>

          {/* ── Heading ── */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            <p className="text-xs tracking-[0.35em] uppercase font-bold mb-3"
              style={{ color: 'rgba(167,139,250,0.55)' }}>— My Journey —</p>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #34d399 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              Experience
            </h2>
            <div className="w-24 h-px mx-auto mt-4"
              style={{ background: 'linear-gradient(to right, transparent, #a78bfa, transparent)' }} />
            <p className="text-xs tracking-widest uppercase mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Click any card to expand details
            </p>
          </motion.div>

          {/* ── Cards layout ── */}
          <div className="max-w-5xl mx-auto">

            {/* ── Desktop: alternating left/right with centered spine ── */}
            <div className="hidden lg:block relative">

              {/* Absolute spine line */}
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
                style={{ background: 'linear-gradient(to bottom, #a78bfa66, #22d3ee66, #34d39966)', zIndex: 0 }} />

              <div className="flex flex-col gap-12">
                {EXPERIENCES.map((exp, i) => {
                  const isLeft = i % 2 === 0
                  return (
                    <div key={exp.id} className="relative flex items-start gap-0">

                      {/* LEFT SLOT */}
                      <div className="w-[calc(50%-28px)]">
                        {isLeft && (
                          <ExperienceCard exp={exp} index={i} isActive={activeId === exp.id}
                            onToggle={() => toggle(exp.id)} onOfferClick={setModalSrc} />
                        )}
                      </div>

                      {/* CENTER DOT */}
                      <div className="w-14 flex-shrink-0 flex justify-center items-start pt-7 relative z-10">
                        <motion.div
                          className="w-4 h-4 rounded-full"
                          style={{ background: exp.color, boxShadow: `0 0 14px ${exp.color}, 0 0 28px ${exp.glowColor}55` }}
                          animate={{ scale: [1, 1.35, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                      </div>

                      {/* RIGHT SLOT */}
                      <div className="w-[calc(50%-28px)]">
                        {!isLeft && (
                          <ExperienceCard exp={exp} index={i} isActive={activeId === exp.id}
                            onToggle={() => toggle(exp.id)} onOfferClick={setModalSrc} />
                        )}
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── Mobile: single column ── */}
            <div className="flex flex-col gap-6 lg:hidden">
              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i}
                  isActive={activeId === exp.id}
                  onToggle={() => toggle(exp.id)}
                  onOfferClick={setModalSrc} />
              ))}
            </div>

          </div>

          {/* ── Bottom stat bar ── */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {[
              { val: '3+', label: 'Roles', color: '#a78bfa' },
              { val: '1yr+', label: 'Experience', color: '#22d3ee' },
              { val: '5+', label: 'Technologies', color: '#34d399' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{ background: `${s.color}0d`, border: `1px solid ${s.color}22`, backdropFilter: 'blur(12px)' }}>
                <span className="text-2xl font-black" style={{ color: s.color, textShadow: `0 0 20px ${s.color}88` }}>
                  {s.val}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Offer Modal ── */}
      <AnimatePresence>
        {modalSrc && <OfferModal src={modalSrc} onClose={() => setModalSrc(null)} />}
      </AnimatePresence>
    </>
  )
}

export default Experience
