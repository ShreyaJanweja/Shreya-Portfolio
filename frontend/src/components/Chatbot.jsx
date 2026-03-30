import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

  const suggestedQuestions = [
    "About Me",
    "My Projects",
    "Tech Skills",
    "Contact Me"
  ]

  const suggestedQuestionsMap = {
    'About Me': 'Tell me about Shreya',
    'My Projects': 'What projects have you built',
    'Tech Skills': 'What technologies do you know',
    'Contact Me': 'How can i contact you'
  }

  // Predefined responses for when API is not available
  const predefinedResponses = {
    'about': `Hi! 👋 I'm Shreya Janweja, a second-year Computer Science Engineering student at Chitkara University (2024-2028).

I'm passionate about web development, AI, and building modern user interfaces. I love creating innovative solutions that solve real-world problems!

My Background:
🎓 **Education:** CSE at Chitkara University
💼 **Experience:** Web Development Intern at SkillCraft Technology, Technical Team Executive at Coding Ninjas CUIET
🌐 **Interests:** React, Node.js, AI/ML, and open-source contributions

Feel free to ask me about my projects, skills, or how to contact me! 😊`,

    'projects': `🚀 Here are some of my projects:

1. **Suraksha Sathi** - Women safety web application with emergency alerts and route optimization
2. **Plan & Go** - Trip planner application for organizing travel plans and budgeting
3. **Personal Portfolio Website** - This portfolio you're viewing right now!
4. **Hackathon Website** - Event management platform for Sparkathon

All my projects showcase my skills in React, Node.js, responsive design, and modern web development practices!

Want to know more about any specific project? 🤔`,

    'skills': `💻 Here are my technical skills:

**Frontend:**
- React, JavaScript, TypeScript
- HTML, CSS, Tailwind CSS
- Responsive Design, UI/UX

**Backend:**
- Node.js, Express.js
- RESTful APIs

**Databases:**
- MongoDB, MySQL

**Tools & Platforms:**
- Git, GitHub, Vercel, Canva

**Currently Learning:**
- Artificial Intelligence
- Machine Learning

I'm always eager to learn new technologies and grow my skillset! 🚀`,

    'contact': `📞 Here's how you can reach me:

📧 **Email:** shreyajanweja26@gmail.com
🔗 **GitHub:** https://github.com/ShreyaJanweja
💼 **LinkedIn:** https://www.linkedin.com/in/shreya-janweja-772a00347/
🧮 **LeetCode:** https://leetcode.com/u/ShreyaJanweja/

Feel free to reach out! I'm always open to opportunities, collaborations, and interesting conversations. Let's connect! 😊`
  }

  // Function to find matching predefined response
  const getPredefinedResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('about') || message.includes('who are you') || message.includes('yourself')) {
      return predefinedResponses['about']
    } else if (message.includes('project') || message.includes('built') || message.includes('work')) {
      return predefinedResponses['projects']
    } else if (message.includes('skill') || message.includes('technology') || message.includes('know')) {
      return predefinedResponses['skills']
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('linkedin')) {
      return predefinedResponses['contact']
    }
    
    // Default response if no match
    return `Thanks for your interest! 😊 I can answer questions about:
• About Me
• My Projects
• My Tech Skills
• How to Contact Me

Feel free to ask any of these! Or you can contact me directly at shreyajanweja26@gmail.com`
  }

  // Send message to AI backend
  const sendMessageToAI = async (userMessage) => {
    try {
      setError(null)
      
      // Prepare conversation history (without the current user message)
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }))

      console.log('Sending to:', `${API_URL}/api/chat`)
      
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP Error: ${response.status}`)
      }

      const data = await response.json()
      return data.response
    } catch (err) {
      console.error('AI Chat Error:', err)
      const errorMessage = err.message === 'Failed to fetch' 
        ? 'Cannot connect to backend. Make sure it\'s running on http://localhost:3001'
        : err.message
      setError(errorMessage)
      throw err
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    const userMsg = { role: 'user', content: userMessage }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const aiResponse = await sendMessageToAI(userMessage)
      const botMsg = { role: 'bot', content: aiResponse }
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      // Fallback to predefined response when API fails
      const fallbackResponse = getPredefinedResponse(userMessage)
      const botMsg = { role: 'bot', content: fallbackResponse }
      setMessages(prev => [...prev, botMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question) => {
    const questionText = suggestedQuestionsMap[question]
    setInput(questionText)
    
    const userMsg = { role: 'user', content: questionText }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    setError(null)

    sendMessageToAI(questionText).then(aiResponse => {
      const botMsg = { role: 'bot', content: aiResponse }
      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    }).catch(err => {
      // Fallback to predefined response when API fails
      const fallbackResponse = getPredefinedResponse(questionText)
      const botMsg = { role: 'bot', content: fallbackResponse }
      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    })
  }

  const handleLinkClick = (url) => {
    window.open(url, '_blank')
  }

  const renderMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = content.split(urlRegex)

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <motion.a
            key={index}
            onClick={() => handleLinkClick(part)}
            className="text-neon-cyan hover:text-neon-blue underline cursor-pointer transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            {part}
          </motion.a>
        )
      }
      return (
        <span key={index} className="whitespace-pre-wrap break-words">
          {part}
        </span>
      )
    })
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
            className="fixed bottom-24 right-8 w-80 lg:w-96 h-[500px] glass rounded-3xl border border-white/20 shadow-2xl z-50 backdrop-blur-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-blue rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-dark-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Shreya's AI Assistant</h3>
                    <p className="text-neon-purple/80 text-sm">Ask me anything! 🤖</p>
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
            <div 
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 scroll-smooth"
              style={{ overflowY: 'auto', scrollBehavior: 'smooth' }}
            >
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="glass p-4 rounded-2xl border border-white/20">
                    <p className="text-neon-cyan/90 text-sm mb-4">
                      Hi! 👋 I'm Shreya's AI Assistant powered by advanced AI. Ask me anything about her skills, projects, experience, or how to reach out. I'll give you personalized responses! 🤖
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((q, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleSuggestedQuestion(q)}
                          disabled={loading}
                          className="px-3 py-2 bg-neon-purple/20 border border-neon-purple/50 rounded-full text-xs text-neon-purple hover:bg-neon-purple/40 transition-all disabled:opacity-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass p-3 rounded-2xl border border-red-500/50 bg-red-500/10"
                >
                  <p className="text-red-400/90 text-sm">
                    ⚠️ {error}
                  </p>
                </motion.div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-dark-bg shadow-lg font-medium' : 'glass text-white shadow-lg border border-white/20 backdrop-blur-md'}`}>
                    {message.role === 'bot' ? renderMessageContent(message.content) : message.content}
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
            <div className="p-4 border-t border-white/10 bg-dark-card/50 flex-shrink-0">
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

