import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Sphere, 
  Torus, 
  MeshDistortMaterial, 
  Float, 
  Stars,
  Trail,
  MeshWobbleMaterial,
  Icosahedron
} from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────
// 3D Scene Components
// ─────────────────────────────────────────────

/** Animated neon ring */
const NeonRing = ({ position, rotation, color, speed = 0.3, scale = 1 }) => {
  const mesh = useRef()
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x += speed * 0.01
    mesh.current.rotation.y += speed * 0.007
  })
  return (
    <Torus ref={mesh} position={position} rotation={rotation} args={[1.2 * scale, 0.04, 16, 100]} scale={scale}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        toneMapped={false}
      />
    </Torus>
  )
}

/** Distorted floating orb */
const FloatingOrb = ({ position, color, size = 1, distort = 0.4, speed = 0.5 }) => {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          distort={distort}
          speed={3}
          roughness={0}
          metalness={0.1}
          transparent
          opacity={0.55}
        />
      </Sphere>
    </Float>
  )
}

/** Wireframe icosahedron with glow */
const GlowIco = ({ position, color, size = 0.7, speed = 0.4 }) => {
  const mesh = useRef()
  useFrame(() => {
    if (!mesh.current) return
    mesh.current.rotation.x += 0.004 * speed
    mesh.current.rotation.y += 0.006 * speed
  })
  return (
    <Icosahedron ref={mesh} args={[size, 1]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        wireframe
        toneMapped={false}
      />
    </Icosahedron>
  )
}

/** Floating particle field */
const ParticleField = ({ count = 120 }) => {
  const points = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.015
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#a78bfa"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

/** Camera parallax from mouse */
const CameraRig = ({ mouseX, mouseY }) => {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04
    camera.position.y += (-mouseY * 0.7 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** Full 3D scene */
const Scene = ({ mouseX, mouseY, isMobile }) => {
  return (
    <>
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      
      {/* Ambient + point lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#a78bfa" intensity={3} distance={20} />
      <pointLight position={[-5, -3, 3]} color="#06b6d4" intensity={3} distance={20} />
      <pointLight position={[0, 3, -4]} color="#3b82f6" intensity={2} distance={15} />

      {/* Stars background */}
      <Stars radius={60} depth={30} count={isMobile ? 600 : 1200} factor={3} saturation={0.7} fade speed={0.8} />

      {/* Particles */}
      <ParticleField count={isMobile ? 60 : 130} />

      {/* Floating orbs */}
      <FloatingOrb position={[-3.5, 1.5, -2]} color="#a78bfa" size={0.9} distort={0.45} speed={0.6} />
      <FloatingOrb position={[3.8, -1.2, -3]} color="#06b6d4" size={1.1} distort={0.35} speed={0.4} />
      <FloatingOrb position={[0.5, -2.8, -4]} color="#3b82f6" size={0.7} distort={0.55} speed={0.7} />

      {/* Neon rings - reduced */}
      {!isMobile && (
        <NeonRing position={[4.2, 1.8, -6]} rotation={[1.2, 0.1, 0.8]} color="#06b6d4" speed={0.35} scale={0.9} />
      )}

      {/* Wireframe ico */}
      <GlowIco position={[3, 2.5, -3]} color="#e879f9" size={0.55} speed={0.6} />
      <GlowIco position={[-3, -2, -4]} color="#06b6d4" size={0.4} speed={0.9} />
    </>
  )
}

// ─────────────────────────────────────────────
// Typing Subtitle
// ─────────────────────────────────────────────
const TypingSubtitle = () => {
  const phrases = [
    'AI Enthusiast',
    'Full Stack Developer',
    'Problem Solver',
    'Open Source Contributor',
  ]
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = phrases[idx]
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % phrases.length)
    }
  }, [displayed, deleting, idx])

  return (
    <div className="flex items-center justify-center gap-1 font-mono text-base sm:text-xl md:text-2xl text-white/60 tracking-widest mb-10">
      <span className="text-[#a78bfa]">&lt;</span>
      <span className="min-w-[220px] text-center">{displayed}</span>
      <span className="w-[2px] h-5 sm:h-6 bg-[#a78bfa] animate-pulse rounded-full" />
      <span className="text-[#a78bfa]">/&gt;</span>
    </div>
  )
}

// ─────────────────────────────────────────────
// Neon Button
// ─────────────────────────────────────────────
const NeonButton = ({ href, download, onClick, children, color = 'purple', className = '' }) => {
  const colors = {
    purple: {
      border: 'border-[#a78bfa]',
      text: 'text-[#a78bfa]',
      hover: 'hover:bg-[#a78bfa]/10',
      shadow: 'hover:shadow-[0_0_32px_rgba(167,139,250,0.55),inset_0_0_20px_rgba(167,139,250,0.07)]',
      glow: 'rgba(167,139,250,0.5)',
    },
    cyan: {
      border: 'border-[#06b6d4]',
      text: 'text-[#06b6d4]',
      hover: 'hover:bg-[#06b6d4]/10',
      shadow: 'hover:shadow-[0_0_32px_rgba(6,182,212,0.55),inset_0_0_20px_rgba(6,182,212,0.07)]',
      glow: 'rgba(6,182,212,0.5)',
    },
  }
  const c = colors[color]
  const base = `relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base border backdrop-blur-xl bg-white/[0.04] transition-all duration-300 cursor-pointer tracking-widest uppercase ${c.border} ${c.text} ${c.hover} ${c.shadow} ${className}`

  const inner = (
    <>
      {/* corner accents */}
      <span className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${c.border} rounded-tl-full opacity-60`} />
      <span className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${c.border} rounded-tr-full opacity-60`} />
      <span className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${c.border} rounded-bl-full opacity-60`} />
      <span className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${c.border} rounded-br-full opacity-60`} />
      {children}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        onClick={onClick}
        className={base}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.96 }}
      >
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button
      onClick={onClick}
      className={base}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
    >
      {inner}
    </motion.button>
  )
}

// ─────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)

  // Mouse parallax
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 })

  const [mouse3D, setMouse3D] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = (e) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    rawX.set(nx * 12)
    rawY.set(ny * 8)
    setMouse3D({ x: nx, y: ny })
  }

  const tiltX = useTransform(springY, [-8, 8], [3, -3])
  const tiltY = useTransform(springX, [-12, 12], [-4, 4])

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020008]"
      onMouseMove={handleMouseMove}
      style={{ fontFamily: "'Rajdhani', 'Orbitron', sans-serif" }}
    >
      {/* Google font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@400;700;900&display=swap');

        .hero-scanlines::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(167,139,250,0.018) 3px,
            rgba(167,139,250,0.018) 4px
          );
          pointer-events: none;
          z-index: 2;
        }
        .hero-vignette::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%);
          pointer-events: none;
          z-index: 2;
        }
        .name-glow {
          text-shadow: none;
        }
        .tag-label {
          font-family: 'Rajdhani', sans-serif;
          letter-spacing: 0.22em;
          font-size: 0.65rem;
          text-transform: uppercase;
          opacity: 0.45;
        }
      `}</style>

      {/* ── Three.js Canvas ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: !isMobile, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene mouseX={mouse3D.x} mouseY={mouse3D.y} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scanlines + vignette overlays */}
      <div className="absolute inset-0 hero-scanlines hero-vignette z-[1] pointer-events-none" />

      {/* ── Hero Content ── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto select-none"
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
      >
        {/* Eyebrow tag */}
        <motion.div
          className="tag-label text-[#06b6d4] mb-5 tracking-[0.3em]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          ✦ &nbsp; Portfolio &nbsp; ✦
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-black text-6xl sm:text-8xl md:text-[7rem] leading-none mb-4 tracking-tight"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-block bg-gradient-to-r from-[#c4b5fd] via-[#818cf8] to-[#67e8f9] bg-clip-text text-transparent name-glow"
          >
            SHREYA
          </span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="mx-auto mb-7 h-px w-24 bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <TypingSubtitle />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.04em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Computer Science Engineering student crafting futuristic web experiences
          with{' '}
          <span className="text-[#a78bfa]">React</span>,{' '}
          <span className="text-[#818cf8]">Three.js</span>, and{' '}
          <span className="text-[#06b6d4]">AI</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          {/* View Projects */}
          <NeonButton href="#projects" color="purple">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            View Projects
          </NeonButton>

          {/* ── DOWNLOAD RESUME – functionality preserved exactly ── */}
          <NeonButton
            href="/assets/Shreya Resume - Final.pdf"
            download="Shreya_Resume.pdf"
            color="cyan"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </NeonButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
        >
          <span className="tag-label">scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#a78bfa] to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero