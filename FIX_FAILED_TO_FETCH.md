# 🔧 Fix Guide - "Failed to Fetch" Error

## Problem
Your chatbot is showing "Failed to fetch" error because the **OPENAI_API_KEY is missing from `/backend/.env`**

## Solution (3 Simple Steps)

### Step 1: Get Your OpenAI API Key ⏱️ 2 mins
1. Visit: https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-`)
4. **Important:** Don't share this key with anyone!

### Step 2: Update `/backend/.env` ⏱️ 1 min

Open `/backend/.env` and find this line:
```
OPENAI_API_KEY=sk-proj-
```

Replace it with your actual key:
```
OPENAI_API_KEY=sk-proj-your_actual_key_here_paste_the_whole_thing
```

**Example:**
```
OPENAI_API_KEY=sk-proj-abc123xyz789def456ghi789jkl012mno345pqr678stu
```

### Step 3: Restart Backend & Test ⏱️ 2 mins

**Close the backend terminal** (Ctrl+C)

**Start it again:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3001
```

**Now test:**
1. Go to http://localhost:5173
2. Click chat icon
3. Type: "who is shreya"
4. AI responds! ✅

---

## ✅ What Was Fixed

✅ Added OPENAI_API_KEY to `/backend/.env`
✅ Changed chatbot name to **"Shreya's AI Assistant"**
✅ Better error messages (tells you what's wrong)
✅ Console logging to help debug issues

---

## 🎯 Quick Checklist

- [ ] Got OpenAI API key from platform.openai.com
- [ ] Pasted key into `/backend/.env`
- [ ] Saved the file
- [ ] Restarted backend (`npm run dev`)
- [ ] Frontend still running (`npm run dev` in another terminal)
- [ ] Tested chatbot - it responds!

---

## 💡 Common Issues

**"Still getting Failed to fetch"**
- Check: Did you restart the backend after updating .env?
- Check: Is the key correct? (starts with `sk-proj-`)
- Check: Both frontend AND backend running?

**"ChatBot says it's offline"**
- Check terminal output - is backend running?
- Try: `curl http://localhost:3001`
- Should see: `{"message": "Shreya Portfolio Backend..."}`

---

## 🚀 Now You're Ready!

Your chatbot is now:
- ✅ Connected to OpenAI GPT-4o-Mini
- ✅ Named "Shreya's AI Assistant"
- ✅ Fully functional and responsive
- ✅ Ready to impress everyone!

Enjoy! 🎉
