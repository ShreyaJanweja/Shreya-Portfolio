import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Portfolio knowledge base
  const knowledgeBase = {
    'shreya': 'I am Shreya, a Computer Science Engineering student at Chitkara University (2024-2028). Passionate about frontend development, open source, and AI.',
    'skills': "I know Java, C++, Python, JavaScript/TypeScript, React, Node.js, Tailwind, MongoDB/MySQL, DSA, OOP, OS, Networks, AI. Check the Skills section!",
    'projects': "Featured projects: Suraksha Sathi (women safety app), Plan & Go (trip planner), this portfolio, Sparkathon website. See Projects section for details.",
    'experience': "Technical Team Executive at Coding Ninjas CUIET, Open Source Contributor, Web Dev Intern at SkillCraft. Timeline in Experience section.",
    'hackathons': "Participated in Build with India, Smart India Hackathon, SAP Hackfest, VaultHeist, SwiftUI Challenge. Check Hackathons!",
    'contact': "Use the contact form or email shreya@example.com. I'll respond within 24 hours!",
    'resume': "Download my resume from the button in navbar or contact section.",
    'github': "Find my code at github.com/shreya",
    'linkedin': "Connect on linkedin.com/in/shreya"
  }

  const keywords = {
    shreya: ['shreya', 'who are you', 'about', 'name'],
    skills: ['skills', 'technologies', 'tech stack', 'languages'],
    projects: ['projects', 'work', 'what have you built'],
    experience: ['experience', 'work experience', 'jobs'],
    hackathons: ['hackathon', 'hackathons', 'competitions'],
    contact: ['contact', 'email', 'reach', 'message'],
    resume: ['resume', 'cv', 'download resume'],
    github: ['github', 'code', 'repo'],
    linkedin: ['linkedin', 'connect', 'network']
  }

  const getResponse = (message) => {
    const lowerMsg = message.toLowerCase()
    
    for (const [topic, kws] of Object.entries(keywords)) {
      if (kws.some(kw => lowerMsg.includes(kw))) {
        return knowledgeBase[topic]
      }
    }

    // Default responses
    const defaults = [
      "That's cool! Check my projects section for more.",
      "Tell me more about what you're building!",
      "I'm passionate about React and AI. What about you?",
      "Thanks for asking! See my skills for tech stack."
    ]
    return defaults[Math.floor(Math.random() * defaults.length)]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const botMsg = { role: 'bot', content: getResponse(input) }
      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    }, 800 + Math.random() * 1200)
  }

  const closeChat = () => setIsOpen(false)

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full glass border-2 border-neon-purple bg-gradient-to-r from-neon-purple/20 p-4 shadow-2xl hover:shadow-neon-glow z-50 backdrop-blur-md hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.05, rotate: 360 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 300 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 300 }}
            className="fixed bottom-24 right-8 w-80 lg:w-96 h-96 glass rounded-3xl border border-white/20 shadow-2xl z-50 backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-blue rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-dark-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Portfolio Assistant</h3>
                    <p className="text-neon-purple/80 text-sm">Ask me about Shreya!</p>
                  </div>
                </div>
                <motion.button
                  onClick={closeChat}
                  className="p-2 hover:bg-white/10 rounded-xl transition-all"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bot text-neon-cyan/90 text-sm">
                  Hi! I'm Shreya's portfolio assistant 🤖 Ask me about her skills, projects, experience, or anything else!
                </div>
              </motion.div>
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-dark-bg shadow-lg' : 'glass text-white shadow-lg border border-white/20 backdrop-blur-md'}`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="glass px-4 py-3 rounded-2xl border border-white/20 max-w-xs">
                    <div className="flex items-center gap-2 text-neon-cyan/80">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                      </div>
                      Typing...
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-dark-card/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 glass border border-white/20 rounded-2xl backdrop-blur-md focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30 transition-all text-white placeholder-white/50"
                  disabled={loading}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-12 h-12 glass border border-neon-purple rounded-2xl flex items-center justify-center hover:bg-neon-purple/20 transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.05, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot

