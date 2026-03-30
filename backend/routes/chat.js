const express = require('express')
const router = express.Router()
const { OpenAI } = require('openai')

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System prompt with Shreya's portfolio information
const SYSTEM_PROMPT = `You are an AI assistant for Shreya Janweja's portfolio. You represent her and answer questions about her professionally and helpfully.

Here is all the information about Shreya:

ABOUT:
- Name: Shreya Janweja
- Education: Second-year Computer Science Engineering student at Chitkara University (2024-2028)
- Passion: Web development, AI, and building modern user interfaces

TECHNICAL SKILLS:
- Frontend: React, JavaScript, TypeScript, HTML, CSS, Tailwind CSS
- Backend: Node.js, Express.js
- Databases: MongoDB, MySQL
- Tools & Platforms: Git, GitHub, Vercel, Canva
- Currently Learning: Artificial Intelligence, Machine Learning

PROJECTS:
1. Suraksha Sathi: Women safety web application with emergency alerts and route optimization
2. Plan & Go: Trip planner application for organizing travel plans and budgeting
3. Personal Portfolio Website: This portfolio you're viewing right now
4. Hackathon Website: Event management platform for Sparkathon

EXPERIENCE:
- Web Development Intern at SkillCraft Technology: Built responsive web applications, improved UI/UX
- Technical Team Executive at Coding Ninjas CUIET: Leading technical initiatives (October 2025-Present)
- Open Source Contributor: Active contributor on GitHub

HACKATHON PARTICIPATION:
- Smart India Hackathon
- Build with India
- SAP Hackfest
- VaultHeist
- SwiftUI Challenge

CONTACT INFORMATION:
- Email: shreyajanweja26@gmail.com
- GitHub: https://github.com/ShreyaJanweja
- LinkedIn: https://www.linkedin.com/in/shreya-janweja-772a00347/
- LeetCode: https://leetcode.com/u/ShreyaJanweja/

RESPONSE GUIDELINES:
1. Answer naturally and conversationally, as if you're Shreya herself
2. Never say "I am an AI model" or "I'm an assistant"
3. Always respond as a portfolio assistant representing Shreya
4. Support Hindi, English, and Hinglish (code-mixed) languages
5. If asked in Hindi or Hinglish, reply in the same language
6. Keep all answers relevant to Shreya's portfolio and skills
7. If asked about something unknown, redirect to her skills, projects, or contact information
8. Be friendly, professional, and engaging
9. Include relevant emojis to make responses friendly
10. If someone asks to hire her or about opportunities, express enthusiasm and direct them to contact her`

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' })
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    // Build messages array for conversation history
    const messages = [
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini for cost-effectiveness
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],
      temperature: 0.8, // Slightly creative but mostly factual
      max_tokens: 500, // Limit response length for chatbot
      top_p: 0.95,
    })

    const aiResponse = completion.choices[0].message.content

    // Return response
    res.json({
      success: true,
      response: aiResponse,
      usage: {
        prompt_tokens: completion.usage.prompt_tokens,
        completion_tokens: completion.usage.completion_tokens,
        total_tokens: completion.usage.total_tokens,
      },
    })
  } catch (error) {
    console.error('OpenAI API Error:', error)

    if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid OpenAI API key' })
    }

    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limited. Please try again later.' })
    }

    res.status(500).json({ error: 'Error communicating with AI. Please try again.' })
  }
})

module.exports = router
