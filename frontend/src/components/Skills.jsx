import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillsCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Java', level: 90, color: 'from-orange-400 to-orange-500' },
        { name: 'C++', level: 85, color: 'from-blue-500 to-blue-600' },
        { name: 'Python', level: 88, color: 'from-yellow-400 to-yellow-500' },
        { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-amber-500' },
        { name: 'TypeScript', level: 80, color: 'from-blue-500 to-indigo-500' },
        { name: 'SQL', level: 82, color: 'from-gray-400 to-gray-500' },
      ]
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React.js', level: 95, color: 'from-blue-400 to-blue-500' },
        { name: 'HTML5', level: 95, color: 'from-orange-400 to-orange-500' },
        { name: 'CSS3', level: 92, color: 'from-blue-400 to-cyan-400' },
        { name: 'Tailwind CSS', level: 90, color: 'from-indigo-400 to-purple-400' },
        { name: 'Bootstrap', level: 85, color: 'from-purple-500 to-pink-500' },
      ]
    },
    {
      category: 'Backend & Tools',
      skills: [
        { name: 'Node.js', level: 85, color: 'from-green-400 to-green-500' },
        { name: 'Express.js', level: 82, color: 'from-gray-400 to-gray-500' },
        { name: 'MongoDB', level: 78, color: 'from-green-600 to-emerald-600' },
        { name: 'MySQL', level: 80, color: 'from-blue-500 to-blue-600' },
        { name: 'Git & GitHub', level: 90, color: 'from-gray-600 to-gray-700' },
      ]
    },
    {
      category: 'Core Concepts',
      skills: [
        { name: 'Data Structures', level: 92, color: 'from-purple-400 to-pink-400' },
        { name: 'Algorithms', level: 90, color: 'from-indigo-400 to-purple-400' },
        { name: 'OOP', level: 88, color: 'from-emerald-400 to-teal-400' },
        { name: 'OS', level: 85, color: 'from-orange-400 to-red-400' },
        { name: 'AI/ML', level: 75, color: 'from-pink-400 to-rose-400' },
      ]
    }
  ]

  return (
    <section id="skills" className="section bg-dark-card/30 relative z-10">
      <div className="container mx-auto">
        <motion.div 
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.15 } }
          }}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent mb-6"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16">
          {skillsCategories.map((category, index) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 lg:p-10 rounded-3xl hover:shadow-neon-glow transition-all duration-500 border border-white/10"
            >
              <h3 className="text-2xl font-bold text-neon-purple mb-8 uppercase tracking-wide">
                {category.category}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white text-lg">{skill.name}</span>
                      <span className="text-neon-cyan font-mono text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-surface rounded-full h-3">
                      <motion.div 
                        className={`h-3 rounded-full shadow-lg`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{
                          background: `linear-gradient(to right, var(--tw-gradient-${skill.color.replace('from-', '').replace(' to-', '')})`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-neon-purple/20 rounded-full blur-xl animate-pulse opacity-30 hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-neon-cyan/20 rounded-full blur-xl animate-pulse delay-1000 opacity-30 hidden xl:block" />
    </section>
  )
}

export default Skills

