import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'

// 3D Animated Background Component - Lightweight Version
const AnimatedBackground = () => {
  return (
    <Canvas className="absolute inset-0 z-0">
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.5} 
        enableZoom={false} 
        enablePan={false}
      />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3, 2, 0]}>
          <icosahedronGeometry args={[1, 4]} />
          <meshPhongMaterial 
            color="#a78bfa" 
            emissive="#7c3aed"
            shininess={100}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[3, -2, -2]}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshPhongMaterial 
            color="#06b6d4" 
            emissive="#0891b2"
            shininess={100}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[0, 0, -3]}>
          <octahedronGeometry args={[1.1, 2]} />
          <meshPhongMaterial 
            color="#3b82f6" 
            emissive="#1e40af"
            shininess={100}
          />
        </mesh>
      </Float>

      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[-10, -10, 5]} intensity={1} color="#06b6d4" />
    </Canvas>
  )
}

// 3D Card Component
const Card3D = ({ exp, index, isActive, onClick }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      if (isHovered) {
        gsap.to(cardRef.current, {
          rotationX: 5,
          rotationY: 8,
          y: -15,
          duration: 0.6,
          ease: 'power2.out'
        })
      } else {
        gsap.to(cardRef.current, {
          rotationX: 0,
          rotationY: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        })
      }
    }
  }, [isHovered])

  return (
    <motion.div
      ref={cardRef}
      className={`relative transition-all duration-500 cursor-pointer ${isActive ? 'scale-105' : ''}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`glass rounded-3xl p-6 lg:p-8 shadow-2xl overflow-hidden transition-all duration-500 ${
        isActive 
          ? 'shadow-[0_0_60px_rgba(167,139,250,0.8),0_0_100px_rgba(59,130,246,0.6)] border-2 border-neon-purple/70 bg-gradient-to-br from-neon-purple/30 to-neon-blue/20' 
          : 'hover:shadow-[0_0_40px_rgba(167,139,250,0.5)]'
      }`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Animated border glow */}
        <motion.div 
          className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-neon-purple/30 via-neon-blue/30 to-neon-cyan/30 pointer-events-none"
          animate={{ 
            backgroundPosition: isActive ? ['0%', '100%'] : '0%',
            opacity: isActive ? 1 : 0.3
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <motion.h3 
            className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-neon-purple bg-clip-text text-transparent mb-3"
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {exp.role}
          </motion.h3>
          <motion.div 
            className="text-neon-cyan font-semibold text-lg mb-4"
            animate={{ x: isActive ? 5 : 0 }}
          >
            {exp.company}
          </motion.div>
          <div className="text-sm text-white/70 font-mono mb-4">{exp.date}</div>
          
          {/* Duration Tag with animation */}
          <motion.div 
            className="flex flex-wrap gap-2"
            animate={{ opacity: isActive ? 1 : 0.7 }}
          >
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-white hover:bg-white/20 transition-all duration-300">
              {exp.duration}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Main Experience Component
const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState('')
  const sectionRef = useRef(null)

  const experiences = [
    {
      role: "Technical Team Executive",
      company: "Coding Ninjas CUIET",
      date: "October 2025 - Present",
      duration: "Full-time · India · On-site",
      description: "Developed and maintained websites for technical events, workshops, and community initiatives using modern web technologies. Collaborated with peers to organize hackathons, coding competitions, and technical sessions while actively supporting debugging, problem-solving, and fostering a strong coding culture within the community.",
      technologies: ["React", "Node.js", "Express.js","MongoDB","Tailwind CSS", "Git","Github", "Canva"],
      offerLetter: "/assets/offerLetterCN.png"
    },
    {
      role: "Web Development Intern",
      company: "SkillCraft Technology",
      date: "September 1, 2025 - September 30, 2025",
      duration: "Internship · India · Remote",
      description: "Built and styled responsive web applications using modern frameworks and tools. Focused on creating user-friendly interfaces, implementing responsive design, and optimizing performance for better user experience.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"],
      offerLetter: "/assets/offerLetterSkillCraft.png"
    },
    {
      role: "Open Source Contributor",
      company: "Open Source India Connect",
      date: "August 1, 2025 - August 15, 2025",
      duration: "Contributor · Remote",
      description: "Collaborated on open-source projects with a team of developers. Contributed code, fixed bugs, documented features, and participated in discussions to improve project quality and community engagement.",
      technologies: ["Git", "GitHub", "JavaScript", "Python",],
      offerLetter: "/assets/Contributer.png"
    }
  ];

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  const handleOfferClick = (offerPath) => {
    setSelectedOffer(offerPath)
    setModalOpen(true)
  }

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
      setSelectedOffer('')
    }
  }

  return (
    <>
      <section id="experience" className="section relative py-24 lg:py-32 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 h-full opacity-40">
          <AnimatedBackground />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-5 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none" />

        <div className="container mx-auto relative z-10 px-4">
          {/* Header with 3D Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scaleY: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-24"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              animate={{ 
                rotateX: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <h2 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent mb-6 drop-shadow-lg">
                Experience
              </h2>
            </motion.div>
            
            {/* Animated underline */}
            <motion.div 
              className="flex gap-2 justify-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-3 h-1.5 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" />
              <div className="w-2 h-1.5 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full opacity-60" />
              <div className="w-1 h-1.5 bg-neon-cyan rounded-full opacity-40" />
            </motion.div>
          </motion.div>

          {/* Experiences Grid with 3D Layout */}
          <motion.div 
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            className="relative space-y-20 lg:space-y-28"
          >
            {/* Animated connector line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden lg:block">
              <motion.div 
                className="w-full h-full bg-gradient-to-b from-neon-purple/50 via-neon-blue/50 to-neon-cyan/50 rounded-full"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(167,139,250,0.3)',
                    '0 0 30px rgba(167,139,250,0.8)',
                    '0 0 10px rgba(167,139,250,0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* 3D Experience Card */}
                  <div className="lg:w-1/2 flex justify-center">
                    <Card3D 
                      exp={exp} 
                      index={index} 
                      isActive={activeIndex === index}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    />
                  </div>

                  {/* Description & Technologies */}
                  <motion.div 
                    className="lg:w-1/2"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="glass rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-[0_0_50px_rgba(167,139,250,0.6)] transition-all duration-500 backdrop-blur-md border border-white/10">
                      {/* Progress indicator */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center font-bold text-white">
                          {index + 1}
                        </div>
                        <div className="flex-1 h-1 bg-gradient-to-r from-neon-purple/30 to-neon-cyan/30 rounded-full">
                          <motion.div 
                            className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(index + 1) * 30}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                      </div>

                      <motion.p 
                        className="text-base lg:text-lg text-white/85 leading-relaxed mb-6 font-light"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {exp.description}
                      </motion.p>
                      
                      {/* Tech Pills with stagger animation */}
                      <div className="mb-6">
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          {exp.technologies.map((skill, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.5, y: 10 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                              whileHover={{ 
                                scale: 1.1,
                                boxShadow: '0 0 20px rgba(167,139,250,0.8)'
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-neon-purple/30 to-neon-blue/20 border border-neon-purple/40 rounded-full text-sm font-semibold text-neon-purple/90 backdrop-blur-sm shadow-lg hover:shadow-neon-glow transition-all duration-300 cursor-pointer"
                            >
                              {skill}
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Offer Letter Button with 3D effect */}
                      <motion.button 
                        className="relative group px-6 py-3 rounded-full font-semibold overflow-hidden"
                        onClick={() => handleOfferClick(exp.offerLetter)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ perspective: '1000px' }}
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/0 to-neon-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <motion.div 
                          className="absolute inset-0 border border-neon-cyan/50 rounded-full"
                          animate={{ 
                            boxShadow: [
                              '0 0 0px rgba(6,182,212,0)',
                              '0 0 20px rgba(6,182,212,0.8)',
                              '0 0 0px rgba(6,182,212,0)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <div className="relative z-10 flex items-center gap-3 text-neon-cyan">
                          <motion.span 
                            className="text-2xl"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            📄
                          </motion.span>
                          <span>View Offer Letter</span>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Modal with 3D Effect */}
      {modalOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.6, opacity: 0, rotateX: -20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotateX: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto p-8 relative shadow-2xl shadow-neon-purple/50 border border-neon-purple/30"
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: '1200px' }}
          >
            {/* Close button with animation */}
            <motion.button
              className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all border border-white/20"
              onClick={() => setModalOpen(false)}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>

            {/* Image with animation */}
            <motion.img 
              src={selectedOffer}
              alt="Offer Letter"
              className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Experience

