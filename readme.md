# Shreya's Futuristic Developer Portfolio 🚀

## 🎨 Overview
Advanced full-stack portfolio for Shreya (CSE Student @ Chitkara University). Features:
- Futuristic dark theme (neon purple/blue/cyan, glassmorphism)
- 3D interactive hero (React Three Fiber)
- Smooth animations (Framer Motion, GSAP)
- Animated particle bg, custom cursor, parallax
- Full-stack contact form (Express + Nodemailer)
- AI Portfolio Assistant chatbot (local data-driven)
- Responsive, SEO-friendly, deployment-ready

Live Demo: [TBD after deploy]

## 🛠 Tech Stack
**Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Three Fiber (Three.js), GSAP, React Router  
**Backend:** Node.js, Express, Nodemailer  
**Deployment:** Vercel (frontend), Render/Railway (backend)

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- Git (optional)

### 1. Clone & Install
```bash
git clone <repo> shreya-portfolio
cd shreya-portfolio
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env: EMAIL_USER, EMAIL_PASS (Gmail app password), OWNER_EMAIL
npm install
npm start  # or nodemon server.js (dev:3001)
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev  # http://localhost:5173
```

### 4. Test Contact Form
- Fill form → Backend sends email to OWNER_EMAIL
- Check spam if needed

## 🔧 Detailed Setup

### Backend .env
```
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password
OWNER_EMAIL=shreya@example.com
PORT=3001
```

**Gmail Setup:** Enable 2FA → App passwords → Select 'Mail' → Use generated password.

### Run Commands
| Command | Desc |
|---------|------|
| `npm run dev` (frontend) | Dev server (5173) |
| `npm run build` (frontend) | Production build |
| `npm run preview` (frontend) | Preview build |
| `npm start` (backend) | Production server |
| `nodemon server.js` (backend) | Dev server (auto-reload) |

## 🚀 Deployment

### Frontend (Vercel)
1. `cd frontend`
2. `npm i -g vercel`
3. `vercel --prod`
4. Env vars: None needed.

### Backend (Render)
1. Push to GitHub.
2. New Web Service → GitHub repo/backend → 
   - Build: `npm install`
   - Start: `npm start`
   - Env: EMAIL_USER, EMAIL_PASS, OWNER_EMAIL
3. Update frontend contactApi.js with backend URL.

**CORS:** Backend allows frontend origins in dev/prod.

## 📱 Features
- **3D Hero:** Interactive floating developer tools
- **Animations:** Scroll reveals, hovers, typing effect
- **AI Chatbot:** Ask about Shreya/projects/skills
- **Projects:** 4 showcase cards w/ GitHub/live links
- **Contact:** Real email via backend
- **Resume:** Download PDF (assets/resume.pdf)

## 🐛 Troubleshooting
- Tailwind not working? Restart dev server
- Email not sending? Check .env creds/spam
- 3D not loading? Check Three.js deps

## 📁 Structure
```
.
├── README.md
├── TODO.md
├── frontend/     # React/Vite app
├── backend/      # Express API
└── assets/       # Shared (optional)
```

Built with ❤️ by BLACKBOXAI
