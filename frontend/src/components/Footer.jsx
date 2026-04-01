import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/ShreyaJanweja',
      color: 'hover:text-neon-cyan'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/shreya-janweja-772a00347/',
      color: 'hover:text-neon-blue'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/shreyajanweja?igsh=ZnpmZDBjd2NtYXN1',
      color: 'hover:text-neon-purple'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:shreyajanweja26@gmail.com',
      color: 'hover:text-neon-cyan'
    }
  ]

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' }
  ]

  const footerColumns = [
    { name: 'Portfolio', href: '#' },
    { name: 'Skills', href: '#skills' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Contact', href: '#contact' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const SocialIcon = ({ icon: Icon, url, color, name }) => (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      whileHover={{ scale: 1.2, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`text-white/70 transition-colors duration-300 ${color}`}
    >
      <Icon size={24} />
    </motion.a>
  )

  return (
    <footer className="relative z-10 bg-gradient-to-t from-dark-bg via-dark-card/30 to-transparent overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -mr-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl -ml-48"></div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-16"
        >
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <h3 className="text-2xl font-black bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
                Shreya
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Full-stack developer crafting innovative solutions and building digital experiences.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <MdLocationOn className="text-neon-cyan" size={16} />
                <span>India</span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <h4 className="text-white font-semibold mb-6 text-lg">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-neon-purple transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Portfolio */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <h4 className="text-white font-semibold mb-6 text-lg">Portfolio</h4>
              <ul className="space-y-3">
                {footerColumns.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-neon-cyan transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          ></motion.div>

          {/* Social Icons and Copyright */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Social Links */}
            <motion.div
              variants={containerVariants}
              className="flex items-center gap-6"
            >
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.name}
                  icon={social.icon}
                  url={social.url}
                  color={social.color}
                  name={social.name}
                />
              ))}
            </motion.div>

            {/* Copyright & Links */}
            <motion.div
              variants={itemVariants}
              className="text-center md:text-right text-white/40 text-sm space-y-2"
            >
              <p>
                © {currentYear} Shreya. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-4 text-xs">
                <a href="#" className="hover:text-neon-purple transition-colors">
                  Privacy Policy
                </a>
                <span className="text-white/20">•</span>
                <a href="#" className="hover:text-neon-cyan transition-colors">
                  Terms & Conditions
                </a>
                <span className="text-white/20">•</span>
                <a href="https://github.com/ShreyaJanweja/Shreya-Portfolio.git" target="_blank" rel="noopener noreferrer" className="hover:text-neon-purple transition-colors">
                  Source Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

