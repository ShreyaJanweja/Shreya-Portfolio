import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const categories = [
    {
      title: 'PROGRAMMING LANGUAGES',
      skills: [
        { name: 'Java', level: 90 },
        { name: 'C++', level: 85 },
        { name: 'Python', level: 88 },
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'SQL', level: 82 }
      ]
    },
    {
      title: 'FRONTEND DEVELOPMENT', 
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 92 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Bootstrap', level: 85 }
      ]
    },
    {
      title: 'BACKEND & API DEVELOPMENT',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 82 },
        { name: 'REST APIs', level: 80 }
      ]
    },
    {
      title: 'DATABASE',
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'MySQL', level: 82 }
      ]
    },
    {
      title: 'DEVOPS & CLOUD',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'GitHub', level: 90 },
        { name: 'Vercel', level: 85 }
      ]
    },
    {
      title: 'TOOLS & DESIGN',
      skills: [
        { name: 'VS Code', level: 95 },
        { name: 'Figma', level: 80 },
        { name: 'Canva', level: 85 }
      ]
    }
  ]

  return (
    <section id="skills" className="section py-32 bg-dark-card/10 relative z-10">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-6">
            Skills & Expertise
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              ref={index === 0 ? ref : null}
              className="glass p-8 rounded-3xl border border-white/10 backdrop-blur-xl hover:shadow-[0_0_50px_rgba(167,139,250,0.3)] transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent uppercase tracking-wide mb-8">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-neon-cyan font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-surface rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

