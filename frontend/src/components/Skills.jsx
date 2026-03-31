import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    id: 'lang', label: 'Languages', color: '#a78bfa', glowColor: '#7c3aed',
    hex: 0xa78bfa, glowHex: 0x7c3aed, orbitRadius: 3.5, orbitSpeed: 0.20, orbitTilt: 0.3, icon: '{ }',
    skills: [{ name: 'Java', level: 90 }, { name: 'C++', level: 85 }, { name: 'Python', level: 88 }, { name: 'JavaScript', level: 95 }, { name: 'TypeScript', level: 85 }, { name: 'SQL', level: 82 }],
  },
  {
    id: 'frontend', label: 'Frontend', color: '#22d3ee', glowColor: '#0891b2',
    hex: 0x22d3ee, glowHex: 0x0891b2, orbitRadius: 5.5, orbitSpeed: 0.13, orbitTilt: -0.5, icon: '◈',
    skills: [{ name: 'React.js', level: 95 }, { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 92 }, { name: 'Tailwind', level: 90 }, { name: 'Bootstrap', level: 85 }],
  },
  {
    id: 'backend', label: 'Backend', color: '#34d399', glowColor: '#059669',
    hex: 0x34d399, glowHex: 0x059669, orbitRadius: 7.2, orbitSpeed: 0.09, orbitTilt: 0.65, icon: '⬡',
    skills: [{ name: 'Node.js', level: 85 }, { name: 'Express.js', level: 82 }, { name: 'REST APIs', level: 80 }],
  },
  {
    id: 'database', label: 'Database', color: '#fb923c', glowColor: '#ea580c',
    hex: 0xfb923c, glowHex: 0xea580c, orbitRadius: 8.8, orbitSpeed: 0.065, orbitTilt: -0.25, icon: '◎',
    skills: [{ name: 'MongoDB', level: 80 }, { name: 'MySQL', level: 82 }],
  },
  {
    id: 'tools', label: 'Tools & DevOps', color: '#f472b6', glowColor: '#db2777',
    hex: 0xf472b6, glowHex: 0xdb2777, orbitRadius: 10.4, orbitSpeed: 0.048, orbitTilt: 0.5, icon: '⚙',
    skills: [{ name: 'Git', level: 90 }, { name: 'GitHub', level: 90 }, { name: 'Vercel', level: 85 }, { name: 'Figma', level: 80 }, { name: 'VS Code', level: 95 }, { name: 'Canva', level: 85 }],
  },
]

// ─── 3D Components ────────────────────────────────────────────────────────────

function StarField() {
  const ref = useRef()
  const positions = useMemo(() => { const a = new Float32Array(1800); for (let i = 0; i < 1800; i++) a[i] = (Math.random() - 0.5) * 120; return a }, [])
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.008 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function CoreSphere() {
  const outerRef = useRef(), innerRef = useRef(), pulseRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outerRef.current) outerRef.current.rotation.y = t * 0.2
    if (innerRef.current) { innerRef.current.rotation.y = -t * 0.35; innerRef.current.rotation.x = t * 0.15 }
    if (pulseRef.current) { pulseRef.current.scale.setScalar(1.1 + Math.sin(t * 1.5) * 0.08); pulseRef.current.material.opacity = 0.05 + Math.sin(t * 1.5) * 0.03 }
  })
  return (
    <group>
      <mesh ref={pulseRef}><sphereGeometry args={[1.8, 32, 32]} /><meshBasicMaterial color="#6d28d9" transparent opacity={0.06} side={THREE.BackSide} /></mesh>
      <mesh ref={outerRef}><icosahedronGeometry args={[1.1, 1]} /><meshStandardMaterial color="#1e0a3c" emissive="#6d28d9" emissiveIntensity={0.8} roughness={0.2} metalness={0.9} /></mesh>
      <mesh ref={innerRef}><icosahedronGeometry args={[0.6, 0]} /><meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={2.5} roughness={0} metalness={1} /></mesh>
      <mesh><sphereGeometry args={[0.28, 16, 16]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <pointLight color="#a78bfa" intensity={6} distance={20} decay={2} />
      <pointLight color="#22d3ee" intensity={2.5} distance={14} decay={2} />
    </group>
  )
}

function OrbitRing({ radius, tilt, colorHex }) {
  const ref = useRef()
  const points = useMemo(() => { const p = []; for (let i = 0; i <= 128; i++) { const a = (i / 128) * Math.PI * 2; p.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)) } return p }, [radius])
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  useFrame(({ clock }) => { if (ref.current) ref.current.material.opacity = 0.10 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04 })
  return (<group rotation={[tilt, 0, 0]}><line ref={ref} geometry={geo}><lineBasicMaterial color={colorHex} transparent opacity={0.1} /></line></group>)
}

function SkillNode({ skill, category, angleOffset, onHover, hoveredSkill }) {
  const meshRef = useRef(), glowRef = useRef()
  const isHovered = hoveredSkill === skill.name
  const SIZE = 0.22
  const sv = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const angle = angleOffset + t * category.orbitSpeed
    const rawX = Math.cos(angle) * category.orbitRadius
    const z = Math.sin(angle) * category.orbitRadius
    const tX = rawX * Math.cos(category.orbitTilt)
    const tY = rawX * Math.sin(category.orbitTilt) + Math.sin(t * 0.7 + angleOffset) * 0.18
    if (meshRef.current) {
      meshRef.current.position.set(tX, tY, z)
      meshRef.current.rotation.y = t * 1.0; meshRef.current.rotation.x = t * 0.5
      sv.setScalar(isHovered ? 1.7 : 1 + Math.sin(t * 1.8 + angleOffset) * 0.07)
      meshRef.current.scale.lerp(sv, 0.1)
    }
    if (glowRef.current) {
      glowRef.current.position.set(tX, tY, z)
      glowRef.current.scale.setScalar(isHovered ? 2.6 : 1.9 + Math.sin(t * 1.3 + angleOffset) * 0.15)
      glowRef.current.material.opacity = isHovered ? 0.3 : 0.09
    }
  })
  return (
    <group>
      <mesh ref={glowRef}><sphereGeometry args={[SIZE, 16, 16]} /><meshBasicMaterial color={category.hex} transparent opacity={0.09} side={THREE.BackSide} /></mesh>
      <mesh ref={meshRef} onPointerOver={(e) => { e.stopPropagation(); onHover(skill.name) }} onPointerOut={() => onHover(null)}>
        <dodecahedronGeometry args={[SIZE, 0]} />
        <meshStandardMaterial color={isHovered ? 0xffffff : category.hex} emissive={category.glowHex} emissiveIntensity={isHovered ? 4 : 1.2} roughness={0.05} metalness={0.95} />
      </mesh>
    </group>
  )
}

function CameraRig({ mousePos }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mousePos.current.x * 3 - camera.position.x) * 0.035
    camera.position.y += (-mousePos.current.y * 2 - camera.position.y) * 0.035
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene({ onHover, hoveredSkill, mousePos }) {
  return (
    <>
      <ambientLight intensity={0.45} color="#c4b5fd" />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#e0d4ff" />
      <StarField /><CameraRig mousePos={mousePos} /><CoreSphere />
      {SKILL_CATEGORIES.map((cat) => (
        <group key={cat.id}>
          <OrbitRing radius={cat.orbitRadius} tilt={cat.orbitTilt} colorHex={cat.hex} />
          {cat.skills.map((skill, i) => (
            <SkillNode key={skill.name} skill={skill} category={cat}
              angleOffset={(i / cat.skills.length) * Math.PI * 2}
              onHover={onHover} hoveredSkill={hoveredSkill} />
          ))}
        </group>
      ))}
    </>
  )
}

// ─── Detail View Components ───────────────────────────────────────────────────

function SkillBar({ name, level, color, glowColor, index }) {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), index * 80 + 300); return () => clearTimeout(t) }, [index])
  return (
    <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors">{name}</span>
        <span className="text-xs font-bold font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div className="h-full rounded-full"
          initial={{ width: 0 }} animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ background: `linear-gradient(90deg, ${glowColor}, ${color})`, boxShadow: `0 0 10px ${color}88` }} />
      </div>
    </motion.div>
  )
}

function CategoryCard({ category, index, isExpanded, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onToggle}
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: `linear-gradient(135deg, ${category.color}0e 0%, rgba(8,4,18,0.96) 70%)`,
        border: `1px solid ${isExpanded ? category.color + '44' : category.color + '20'}`,
        boxShadow: isExpanded ? `0 0 50px ${category.glowColor}20, inset 0 1px 0 ${category.color}20` : `0 0 20px ${category.glowColor}08`,
        transition: 'border 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${category.color}${isExpanded ? 'cc' : '44'}, transparent)` }} />

      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ background: `${category.color}18`, border: `1px solid ${category.color}30`, color: category.color, boxShadow: `0 0 20px ${category.glowColor}25` }}>
            {category.icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{category.label}</h3>
            <p className="text-xs mt-0.5" style={{ color: `${category.color}88` }}>{category.skills.length} technologies</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
          style={{ background: `${category.color}15`, border: `1px solid ${category.color}25`, color: category.color }}>
          ▼
        </motion.div>
      </div>

      {/* Skill pills preview */}
      {!isExpanded && (
        <div className="px-5 pb-5 flex flex-wrap gap-1.5">
          {category.skills.map((s) => (
            <span key={s.name} className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: `${category.color}12`, color: `${category.color}cc`, border: `1px solid ${category.color}20` }}>
              {s.name}
            </span>
          ))}
        </div>
      )}

      {/* Expanded bars */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden">
            <div className="px-5 pb-5 space-y-3.5">
              <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${category.color}33, transparent)` }} />
              {category.skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level}
                  color={category.color} glowColor={category.glowColor} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner glow */}
      <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${category.color}10` }} />
    </motion.div>
  )
}

function DetailView({ onClose }) {
  const [expandedId, setExpandedId] = useState(null)
  const toggle = (id) => setExpandedId(p => p === id ? null : id)

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-40 overflow-y-auto"
      style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.97) 0%, rgba(8,3,20,0.99) 100%)' }}
    >
      {/* Ambient top glow */}
      <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(109,40,217,0.15) 0%, transparent 70%)' }} />

      {/* Sticky header */}
      <motion.div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(167,139,250,0.10)' }}>
        <div>
          <h3 className="text-white font-bold text-lg">Skills Overview</h3>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Click any card to reveal proficiency levels</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(167,139,250,0.35)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
          style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)', color: '#c4b5fd' }}>
          ← Universe
        </motion.button>
      </motion.div>

      {/* Stats bar */}
      <motion.div className="flex items-center justify-center gap-8 py-5 px-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        {[
          { val: SKILL_CATEGORIES.reduce((a, c) => a + c.skills.length, 0), label: 'Total Skills' },
          { val: SKILL_CATEGORIES.length, label: 'Categories' },
          { val: Math.round(SKILL_CATEGORIES.flatMap(c => c.skills).reduce((a, s) => a + s.level, 0) / SKILL_CATEGORIES.flatMap(c => c.skills).length) + '%', label: 'Avg Proficiency' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl font-black" style={{ color: ['#a78bfa', '#22d3ee', '#34d399'][i] }}>{stat.val}</p>
            <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="mx-6 h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.2), transparent)' }} />

      {/* Cards */}
      <div className="px-6 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILL_CATEGORIES.map((cat, i) => (
          <CategoryCard key={cat.id} category={cat} index={i}
            isExpanded={expandedId === cat.id} onToggle={() => toggle(cat.id)} />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Universe overlays ────────────────────────────────────────────────────────

function SkillTooltip({ hoveredSkill }) {
  const cat = SKILL_CATEGORIES.find(c => c.skills.some(s => s.name === hoveredSkill))
  return (
    <AnimatePresence>
      {hoveredSkill && cat && (
        <motion.div key={hoveredSkill}
          initial={{ opacity: 0, y: 12, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.88 }} transition={{ duration: 0.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-30">
          <div className="px-7 py-3 rounded-2xl text-center"
            style={{ background: `linear-gradient(135deg, ${cat.color}22, rgba(0,0,0,0.75))`, border: `1px solid ${cat.color}55`, boxShadow: `0 0 40px ${cat.glowColor}55`, backdropFilter: 'blur(20px)' }}>
            <p className="text-white font-bold text-xl">{hoveredSkill}</p>
            <p className="text-xs font-bold tracking-widest uppercase mt-1" style={{ color: cat.color }}>{cat.label}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Legend({ hoveredCategory }) {
  return (
    <motion.div className="absolute top-4 right-4 z-20 flex flex-col gap-2"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
      {SKILL_CATEGORIES.map(cat => (
        <div key={cat.id} className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
          style={{ background: `${cat.color}10`, border: `1px solid ${hoveredCategory === cat.id ? cat.color + '66' : cat.color + '20'}`, opacity: hoveredCategory && hoveredCategory !== cat.id ? 0.3 : 1, backdropFilter: 'blur(12px)', transition: 'all 0.3s' }}>
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
          <span className="text-xs font-semibold" style={{ color: cat.color }}>{cat.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function MobileView() {
  return (
    <div className="px-5 space-y-8">
      {SKILL_CATEGORIES.map((cat, ci) => (
        <motion.div key={cat.id} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: cat.color }}>{cat.label}</p>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((s, si) => (
              <motion.span key={s.name} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: ci * 0.08 + si * 0.04 }}
                whileHover={{ scale: 1.07, y: -2 }} className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}44`, color: cat.color }}>
                {s.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const containerRef = useRef()

  const hoveredCategory = useMemo(
    () => SKILL_CATEGORIES.find(c => c.skills.some(s => s.name === hoveredSkill))?.id ?? null,
    [hoveredSkill]
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    mousePos.current = { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 }
  }, [])

  return (
    <section id="skills" className="section relative py-20 overflow-hidden"
      style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(109,40,217,0.10) 0%, transparent 70%)' }}>

      {/* Title */}
      <motion.div className="text-center relative z-10 mb-8"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85 }}>
        <h2 className="text-5xl lg:text-7xl font-black tracking-tight"
          style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Skills Universe
        </h2>
        <p className="mt-3 text-sm tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Hover to explore · Orbiting in 3D space
        </p>
        <div className="w-24 h-px mx-auto mt-4 rounded-full"
          style={{ background: 'linear-gradient(to right, transparent, #a78bfa, transparent)' }} />
      </motion.div>

      {isMobile ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 max-w-2xl mx-auto">
          <MobileView />
        </motion.div>
      ) : (
        <div ref={containerRef} onMouseMove={handleMouseMove} className="relative mx-auto"
          style={{ height: '700px', maxWidth: '1100px' }}>

          {/* Canvas always in background */}
          <Canvas camera={{ position: [0, 5, 24], fov: 48 }} gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
            dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)}>
            <Scene onHover={setHoveredSkill} hoveredSkill={hoveredSkill} mousePos={mousePos} />
          </Canvas>

          {/* Universe UI */}
          <AnimatePresence>
            {!showDetail && (
              <motion.div key="uni-ui" className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <div className="pointer-events-auto"><Legend hoveredCategory={hoveredCategory} /></div>
                <SkillTooltip hoveredSkill={hoveredSkill} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 88% 88% at 50% 50%, transparent 50%, rgba(0,0,0,0.92) 100%)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── EXPLORE BUTTON ── */}
          <AnimatePresence>
            {!showDetail && (
              <motion.div key="explore-btn"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }} transition={{ delay: 0.6, duration: 0.6 }}>
                {/* Animated pulse ring */}
                <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.35), transparent)', filter: 'blur(6px)' }} />
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(167,139,250,0.5), 0 0 120px rgba(167,139,250,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDetail(true)}
                  className="relative flex items-center gap-3 px-9 py-4 rounded-full font-bold text-sm tracking-widest uppercase"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.20) 0%, rgba(34,211,238,0.12) 100%)',
                    border: '1px solid rgba(167,139,250,0.50)',
                    color: '#ede9fe',
                    boxShadow: '0 0 35px rgba(167,139,250,0.28), inset 0 1px 0 rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(20px)',
                  }}>
                  <span style={{ fontSize: '17px' }}>⬡</span>
                  Explore Skills in Detail
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>→</motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── DETAIL OVERLAY ── */}
          <AnimatePresence>
            {showDetail && <DetailView onClose={() => setShowDetail(false)} />}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}

export default Skills
