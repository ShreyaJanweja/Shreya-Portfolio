import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: scrolled ? 0 : 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-md shadow-2xl' : 'glass'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent neon-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Shreya
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative group text-lg font-medium text-white/80 hover:text-neon-purple transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan group-hover:w-full transition-all duration-300"
                  initial={false}
                  animate={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                />
              </motion.a>
            ))}
            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              download
              className="px-6 py-2 glass text-neon-cyan border border-neon-cyan/50 rounded-full text-sm font-semibold hover:bg-neon-cyan hover:text-dark-bg transition-all duration-300 neon-text"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(167, 139, 250, 0.4)' }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg className={`w-6 h-6 transition-transform ${mobileOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden"
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="py-2 text-lg font-medium hover:text-neon-purple transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a href="/resume.pdf" download className="px-6 py-3 glass text-neon-cyan border border-neon-cyan rounded-full font-semibold self-start mt-2">
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar

