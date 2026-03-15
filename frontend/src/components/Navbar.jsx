import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? 'top-4' : 'top-6'
      }`}
    >
      {/* The Pill Container */}
      <div
        className={`flex items-center justify-center gap-8 md:gap-12 px-8 md:px-12 py-3 md:py-4 
          glass backdrop-blur-lg border border-white/10 shadow-2xl 
          ${scrolled ? 'shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] scale-[1.02]' : 'shadow-lg'}
          rounded-full w-fit mx-auto transition-all duration-500`}
      >
        {/* Desktop Links (centered now since no Resume button) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative group text-base lg:text-lg font-medium text-white/80 hover:text-neon-purple transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-purple to-neon-cyan group-hover:w-full transition-all duration-300 rounded-full"
                initial={false}
                whileHover={{ width: '100%' }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden p-2 text-white/80"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed top-[4.5rem] left-4 right-4 z-40 mt-2"
        >
          <div className="glass backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
            <div className="flex flex-col py-4 px-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-3 text-lg font-medium text-white/90 hover:text-neon-purple transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar