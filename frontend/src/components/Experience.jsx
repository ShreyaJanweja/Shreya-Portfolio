import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState('')

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
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const activeCardClass = (index) => {
    if (activeIndex === index) {
      return 'scale-[1.03] shadow-[0_0_30px_rgba(167,139,250,0.6),0_0_50px_rgba(59,130,246,0.4)] border-2 !border-neon-purple/70 shadow-2xl transition-all duration-500'
    }
    return ''
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
      <section id="experience" className="section relative z-10 py-24 lg:py-32">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.h2 
              className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent mb-6"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
            >
              Experience
            </motion.h2>
            <motion.div className="w-32 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto" />
          </motion.div>

          {/* Timeline */}
          <motion.div 
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="relative"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-neon-purple/30 to-neon-blue/30 z-0" />
            
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`relative mb-16 lg:mb-24 flex ${index % 2 === 0 ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse'} lg:items-center gap-8 lg:gap-12`}
              >
                {/* Left Card - Role & Date (clickable for odd indices, right for even) */}
                <motion.div 
                  className={`lg:w-1/3 order-1 lg:${index % 2 === 0 ? 'order-1' : 'order-2'} transition-all duration-500 ${activeCardClass(index)} cursor-pointer hover:scale-105`}
                  whileHover={{ y: -8 }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="glass rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-neon-glow transition-all duration-500 max-w-sm">
                    <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-neon-purple bg-clip-text text-transparent mb-3">
                      {exp.role}
                    </h3>
                    <div className="text-neon-cyan font-semibold text-lg mb-4">{exp.company}</div>
                    <div className="text-sm text-white/70 font-mono mb-4">{exp.date}</div>
                    
                    {/* Duration Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium text-white">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right - Description & Tech & Offer Button */}
                <motion.div className="lg:w-2/3 order-2 lg:order-1">
                  <div className="glass rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-neon-glow">
                    <p className="text-lg text-white/90 leading-relaxed mb-6">{exp.description}</p>
                    
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.technologies.map((skill, i) => (
                        <motion.div
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 rounded-full text-sm font-semibold text-neon-purple backdrop-blur-sm shadow-md hover:shadow-neon-glow hover:scale-105 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>

                    {/* Offer Letter Button */}
                    <motion.div 
                      className="glass px-6 py-3 rounded-full border border-neon-cyan/50 text-neon-cyan font-semibold hover:bg-neon-cyan/10 hover:shadow-neon-glow hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-3 max-w-max"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleOfferClick(exp.offerLetter)}
                    >
                      <span className="text-xl">📄</span>
                      <span>View Offer Letter</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto p-8 relative shadow-2xl shadow-neon-purple/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <img 
              src={selectedOffer}
              alt="Offer Letter"
              className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Experience

