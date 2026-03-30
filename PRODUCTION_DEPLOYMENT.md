# 🌍 Production Deployment Guide

Deploy your AI-powered chatbot to the world!

---

## Overview

```
┌──────────────────────────────────────┐
│  Frontend (React + Vite)             │  
│  Deploy to: Vercel                   │  ✅ Easy, free tier available
└──────────────────────────────────────┘
          ↓
   API URL Environment Variable
          ↓
┌──────────────────────────────────────┐
│  Backend (Express + OpenAI)          │
│  Deploy to: Railway or Heroku        │  ✅ Simple, supports Node.js
└──────────────────────────────────────┘
```

---

##🚀 Frontend Deployment (Vercel)

### Step 1: Connect GitHub

1. Push your code to GitHub:
   ```bash
   cd frontend
   git add .
   git commit -m "AI chatbot with OpenAI integration"
   git push origin main
   ```

2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Choose `frontend` folder as root

### Step 2: Add Environment Variables

In Vercel project settings:

1. Go to **Settings → Environment Variables**
2. Add:
   ```
   Key: VITE_BACKEND_URL
   Value: https://your-backend-domain.com
   (e.g., https://shreya-api.railway.app)
   ```

3. Click "Save"
4. Redeploy to apply changes

### Step 3: Deploy

1. Click **Deploy**
2. Wait 1-2 minutes
3. You get a live URL like: `https://shreya-portfolio.vercel.app`

✅ Frontend is live!

---

## 🔌 Backend Deployment (Railway - Recommended)

Railway is perfect for Node.js apps. Free tier includes:
- 5GB storage
- Unlimited outbound bandwidth
- Good uptime SLA

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign in with GitHub (easiest)
3. Create new project

### Step 2: Deploy Backend

1. Click **+ New**
2. Select **GitHub repo**
3. Choose `Shreya-Portfolio` repo
4. Configure:
   - **Base Directory:** `backend`
   - **Start Command:** `npm start`
5. Click "Deploy"

### Step 3: Add Environment Variables

1. In Railway dashboard, go to **Variables**
2. Add these environment variables:
   ```
   KEY: OPENAI_API_KEY
   VALUE: sk-proj-your-actual-key-here
   
   KEY: PORT
   VALUE: 3001
   
   KEY: NODE_ENV
   VALUE: production
   
   KEY: FRONTEND_URL
   VALUE: https://shreya-portfolio.vercel.app
   ```

3. Save changes
4. Railway auto-redeploys with new env vars

### Step 4: Get Backend URL

1. In Railway, go to **Deployments**
2. Find your domain under "Public URL"
3. It looks like: `https://shreya-api.railway.app`
4. Copy this URL

### Step 5: Update Frontend

1. Go to Vercel settings
2. Update `VITE_BACKEND_URL`:
   ```
   https://your-backend-railway-url
   ```
3. Redeploy frontend
4. Test it!

✅ Backend is live!

---

## 🔧 Alternative Backend Deployment

### Option A: Heroku

Heroku is shutting down free tier, but you can still use it:

1. Create account at https://heroku.com
2. Install Heroku CLI
3. Deploy:
   ```bash
   heroku create shreya-api
   heroku config:set OPENAI_API_KEY=sk-proj-...
   heroku config:set FRONTEND_URL=https://shreya-portfolio.vercel.app
   git push heroku main
   # Get URL: heroku open
   ```

### Option B: Render

Render is Heroku alternative:

1. Go to https://render.com
2. Create new "Web Service"
3. Connect GitHub repo
4. Set:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables
6. Deploy

### Option C: Your Own Server

If you have a server:

1. Install Node.js
2. Clone repo
3. Install dependencies: `npm install`
4. Set environment variables
5. Use PM2: `npm install -g pm2 && pm2 start server.js`
6. Set up reverse proxy (nginx/Apache)
7. Enable HTTPS (Let's Encrypt)

---

## ✅ Production Deployment Checklist

### Before Deploying:

- [ ] Code pushed to GitHub
- [ ] `.env` NOT committed (check `.gitignore`)
- [ ] All tests pass locally
- [ ] No console errors
- [ ] Environment variables documented
- [ ] CORS settings reviewed for production domains

### Backend (Railway):

- [ ] Backend deployed on Railway
- [ ] Environment variables set:
  - [ ] `OPENAI_API_KEY` (your actual key)
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` set to Vercel domain
- [ ] Backend URL obtained
- [ ] API responds on `/api/chat`
- [ ] CORS allows frontend domain

### Frontend (Vercel):

- [ ] Frontend deployed on Vercel
- [ ] Environment variables set:
  - [ ] `VITE_BACKEND_URL` points to Railway
- [ ] Site loads without errors
- [ ] Chat icon visible
- [ ] Can open chat window

### Integration Tests:

- [ ] Open chatbot on production domain
- [ ] Chat sends message
- [ ] AI response appears (may take 2-3s)
- [ ] Follow-up questions work
- [ ] Links are clickable
- [ ] No console errors
- [ ] Mobile responsive

### Monitoring:

- [ ] Set up OpenAI usage alerts
- [ ] If using Railway, watch app logs
- [ ] Monitor deployment health

---

## 🔐 Production Security

### Secrets Management

```
NEVER commit or expose:
- OPENAI_API_KEY ❌
- Email passwords ❌
- Database credentials ❌
```

✅ Store in:
- Railway/Heroku environment variables
- Vercel environment variables
- Never in code/git

### CORS Configuration

Update `/backend/server.js` for production:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://shreya-portfolio.vercel.app'] // Your production domain
    : ['http://localhost:5173']
}))
```

Deploy and test!

### SSL/HTTPS

✅ Automatically enabled on:
- Vercel (always HTTPS)
- Railway (automatically HTTPS)
- Heroku (automatically HTTPS)

No extra setup needed!

---

## 📊 Performance Optimization

### Frontend (Vercel):
- Automatically optimized
- Edge caching enabled
- Automatic minification
- No additional setup needed

### Backend (Railway):
- Keep response time under 2 seconds
- Current: ~2-3 seconds (normal for first API call)
- Verify on Railway metrics dashboard

### Cost Optimization:
- Keep `max_tokens: 500` in chat.js
- Monitor OpenAI usage monthly
- Set spending limit on OpenAI dashboard

---

## 📈 Monitoring & Maintenance

### Railway Dashboard
- Check app status
- View logs: Click app → "Logs"
- Monitor CPU/memory
- View incoming requests

### Vercel Dashboard
- Check deployment status
- View function logs
- Monitor page loads
- Check analytics

### OpenAI Dashboard
- Monitor API usage: https://platform.openai.com/usage/overview
- Set spending limits: https://platform.openai.com/account/billing/limits
- Check rate limits
- View cost breakdown

### Email Alerts

Set up notifications for:
- Railway: App crashes
- Vercel: Deployment failures
- OpenAI: Usage approaching limit

---

## 🆘 Troubleshooting Production

### Issue: "Cannot connect to backend"

**Check:**
1. Backend URL in Vercel env vars
2. Backend is running on Railway
3. CORS allows your frontend domain
4. No typos in URLs

**Fix:**
```bash
# Test backend directly
curl https://your-backend-url/
# Should return: {"message": "..."}
```

### Issue: "API key invalid"

**Check:**
1. Key is set in Railway env vars
2. Key hasn't expired (check OpenAI dashboard)
3. No extra spaces/quotes around key
4. Key starts with `sk-`

### Issue: "Slow responses"

**Normal:** First response ~2-3 seconds (OpenAI latency)
**Not Normal:** Responses >5 seconds

**Check:**
1. OpenAI service status
2. Railway app CPU/memory usage
3. API key has sufficient credits

### Issue: "CORS errors"

**Check:**
1. Frontend domain in CORS whitelist
2. Backend deployed with updated CORS code
3. Backend redeployed after code changes

---

## 🚀 Deployment Scripts

### Quick Deploy Frontend:
```bash
cd frontend
git add .
git commit -m "deployment"
git push origin main
# Vercel auto-deploys!
```

### Quick Deploy Backend:
```bash
cd backend
git add .
git commit -m "deployment"
git push origin main
# If using Railway/GitHub integration, auto-deploys!
```

### Manual Deploy (if needed):
```bash
# On your server
cd /path/to/shreya-portfolio/backend
git pull origin main
npm install
npm start
```

---

## 📞 Support Links

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://railway.app/docs
- **OpenAI API:** https://platform.openai.com/docs
- **Express Deployment:** https://expressjs.com/en/advanced/best-practice-security.html

---

## Final Checklist Before Going Live

- [ ] Both backend and frontend deployed
- [ ] Environment variables set on both services
- [ ] CORS configured for production
- [ ] SSL/HTTPS enabled (automatic)
- [ ] Tested from production URLs
- [ ] Chatbot works end-to-end
- [ ] Error handling works
- [ ] Links open correctly
- [ ] Mobile responsive
- [ ] Performance acceptable (~2-3s)
- [ ] Monitoring set up
- [ ] Team/stakeholders notified

---

## 🎉 You're Live!

Your AI chatbot is now live for the world to see!

Share your portfolio:
- GitHub: https://github.com/ShreyaJanweja
- LinkedIn: https://linkedin.com/in/shreya-janweja-772a00347

Monitor and maintain:
- Review logs regularly
- Check API usage
- Collect feedback
- Plan improvements

---

**Deployment Status:** Ready
**Estimated Setup Time:** 15-30 minutes
**Cost:** ~$5-15/month (depending on usage)

🌍 **Your portfolio is ready to impress the world!**
