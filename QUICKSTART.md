# ⚡ Quick Start - AI Chatbot (5 Minutes to Live)

## Step 1: Get API Key (2 mins)

1. Visit: https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-`)
4. Don't share it! Keep it safe.

## Step 2: Configure Backend (1 min)

Update `/backend/.env`:
```
OPENAI_API_KEY=sk-proj-your_actual_key_here_
PORT=3001
NODE_ENV=development
```

## Step 3: Install & Start (2 mins)

**Terminal 1 - Backend:**
```bash
cd backend
npm install openai    # Already done but just in case
npm run dev
```
✅ You should see: `🚀 Server running on port 3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ You should see: `Local: http://localhost:5173`

## Step 4: Test It! (30 secs)

1. Open http://localhost:5173 in browser
2. Click the purple chat icon (bottom-right)
3. Ask: "Who is Shreya?"
4. Watch the AI respond! 🤖

---

## 🎉 You're Done!

The chatbot now uses real AI! Try:
- "Tell me about Shreya"
- "What projects have you built?"
- "How can I contact you?"
- "What's your tech stack?"
- Ask a follow-up question to see context awareness!

---

## 🚀 Deploy to Production

### Frontend → Vercel
```bash
git add . && git commit -m "AI chatbot" && git push
# Auto-deploys!
```

### Backend → Railway (Easiest for Node.js)
1. Go to https://railway.app
2. Create new project → GitHub repo
3. Add environment variables:
   - `OPENAI_API_KEY=sk-...`
   - `NODE_ENV=production`
4. Deploy!
5. Copy your backend URL from Railway
6. Update Vercel env: `VITE_BACKEND_URL=https://your-railway-url`

---

## 💡 Pro Tips

✅ The chatbot maintains conversation history - follow-ups work great!
✅ It speaks English, Hindi, and Hinglish
✅ Links in responses are clickable
✅ It redirects unknown questions intelligently

---

## ⚠️ Important Notes

1. **Never commit `.env` to git** - Add to `.gitignore`
2. **API key is precious** - keep it secret
3. **First response: ~2-3 seconds** (OpenAI latency, normal)
4. **Costs $0.0001-0.0005 per message** (very cheap)

---

## ❓ Something Wrong?

**Backend not starting?**
```bash
# Check if port 3001 is free
netstat -ano | findstr :3001  # Windows

# Or use different port in .env
PORT=3002
```

**Frontend can't reach backend?**
```
Check: VITE_BACKEND_URL in /frontend/.env
Should be: http://localhost:3001 (local) or https://... (production)
```

**API calls failing?**
- Click F12 → Network tab
- Look for failed requests
- Check backend console for errors
- Verify OPENAI_API_KEY is set correctly

---

**Ready to go? Visit http://localhost:5173 and start chatting! 🚀**
