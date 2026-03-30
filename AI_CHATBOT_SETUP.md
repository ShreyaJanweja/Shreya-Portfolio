# 🤖 AI Chatbot Setup Guide

This guide explains how to set up and deploy the AI-powered chatbot using OpenAI's API.

## Prerequisites

1. **OpenAI API Key**
   - Go to https://platform.openai.com/account/api-keys
   - Create a new API key
   - Keep it safe (don't share or commit to git)

2. **Node.js** (v18+)
   - Already installed on your system

## Local Development Setup

### Backend Configuration

1. **Update .env file in `backend/` folder:**
   ```
   PORT=3001
   NODE_ENV=development
   OPENAI_API_KEY=your_actual_openai_api_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   OWNER_EMAIL=recipient@gmail.com
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server should run on `http://localhost:3001`

### Frontend Configuration

1. **Create/Update `.env.local` in `frontend/` folder:**
   ```
   VITE_API_URL=http://localhost:3001
   ```

2. **Install dependencies (if not already done):**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   Frontend should run on `http://localhost:5173`

4. **Test the chatbot:**
   - Open http://localhost:5173 in browser
   - Click the chat icon at bottom-right
   - Try asking questions about Shreya!

## How It Works

### Frontend (Chatbot.jsx)
- User types message and sends it
- Message is sent to `/api/chat` endpoint with conversation history
- Displays AI response with support for links and formatting
- Maintains full conversation context for better responses

### Backend (/api/chat)
- Receives user message and conversation history
- Creates a system prompt with all of Shreya's information
- Sends to OpenAI's GPT model
- Returns AI response

### Supported Features
- ✅ Natural conversation with context
- ✅ Multi-language support (English, Hindi, Hinglish)
- ✅ Automatic link detection and new-tab opening
- ✅ Conversation history maintained
- ✅ Typing animation
- ✅ Error handling
- ✅ Fast responses with gpt-4o-mini model

## Deployment

### Vercel Deployment (Frontend)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add AI chatbot with OpenAI integration"
   git push origin main
   ```

2. **Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-domain.com`
   - Note: The backend must be accessible from frontend

### Backend Deployment (Heroku, Railway, or any Node.js hosting)

**Example with Railway or Heroku:**

1. **Set Environment Variables:**
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-portfolio-domain.com`
   - Same email config as local

2. **Update CORS in server.js** (for production):
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? ['https://shreya-portfolio.vercel.app'] 
     : ['http://localhost:5173']
   ```

3. **Deploy backend** and get the deployed URL

4. **Update frontend** with backend URL:
   - In Vercel, set environment variable:
   - `VITE_API_URL=https://your-deployed-backend.com`

## API Endpoint

### POST /api/chat

**Request:**
```json
{
  "message": "Tell me about yourself",
  "conversationHistory": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help?" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "I'm Shreya, a Computer Science student...",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 100,
    "total_tokens": 250
  }
}
```

## Cost Management

- **GPT-4o Mini** is the most cost-effective model
- Typical conversation: ~50-200 tokens
- Estimated cost: ~$0.0001-0.0005 per message
- Current model: `gpt-4o-mini` (replace with `gpt-4` if higher quality needed)

### Tips to Reduce Costs:
1. Keep `max_tokens: 500` in chat.js
2. Avoid unnecessary API calls
3. Implement rate limiting in production
4. Monitor usage on OpenAI dashboard

## Troubleshooting

**Issue: "OPENAI_API_KEY not configured"**
- ✅ Check .env file in backend folder
- ✅ Restart backend server after updating .env
- ✅ Verify key format (should start with `sk-`)

**Issue: CORS errors in browser console**
- ✅ Check that CORS origin matches your frontend URL
- ✅ Restart backend after changing CORS settings

**Issue: "Failed to get response from AI"**
- ✅ Check OpenAI API status: https://status.openai.com/
- ✅ Verify API key has sufficient credits
- ✅ Check network tab in browser dev tools for actual error

**Issue: Slow responses**
- ✅ This is normal for first API call (~2-3 seconds)
- ✅ Subsequent calls are faster
- ✅ Consider implementing rate limiting

## Testing Checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 5173
- [ ] Can open chatbot in browser
- [ ] Message sends to backend (check Network tab)
- [ ] Response receives from OpenAI
- [ ] Chat displays properly
- [ ] Links in responses are clickable
- [ ] Conversation context works (follow-up questions understood)
- [ ] Supports multiple languages

## Production Checklist

- [ ] OPENAI_API_KEY is secured (never commit to git)
- [ ] Backend URL configured correctly in frontend
- [ ] CORS settings updated for production domains
- [ ] Both frontend and backend deployed
- [ ] SSL/HTTPS enabled
- [ ] Error handling working properly
- [ ] Rate limiting implemented (optional)
- [ ] Monitor API costs on OpenAI dashboard

## Support

If you encounter issues:

1. Check backend logs: `npm run dev`
2. Check browser DevTools Network tab
3. Verify OpenAI API key is valid
4. Check environment variables are set correctly
5. Ensure both frontend and backend are running on correct ports

## Next Steps (Optional Advanced Features)

1. **Rate Limiting:** Add `express-rate-limit` to prevent abuse
2. **Chat History:** Store conversations in database (MongoDB)
3. **Analytics:** Track popular questions and topics
4. **Advanced Models:** Switch to `gpt-4` for higher quality (costs more)
5. **Streaming:** Use streaming responses for real-time output
6. **Sentiment Analysis:** Analyze user emotions and adjust responses

---

**Version:** 1.0.0  
**Last Updated:** 2026-03-30  
**Model:** gpt-4o-mini
