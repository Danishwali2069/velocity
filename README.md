# VELOCITY — Premium Racing Experience

A cinematic, full-stack racing car showcase built with React + Node + MongoDB.

## 📁 Project Structure

```
velocity/
├── frontend/          # React + Vite + Tailwind + Framer Motion + GSAP
└── backend/           # Node.js + Express + MongoDB
```

## ⚡ Quick Start

### 1. Clone & Install

```bash
# Backend
cd backend
npm install
cp .env.example .env   # Fill in your values

# Frontend
cd ../frontend
npm install
```

### 2. Start MongoDB
```bash
mongod --dbpath /data/db
```
Or use MongoDB Atlas — paste your URI in `backend/.env`.

### 3. Seed Database
```bash
cd backend
npm run seed
```

### 4. Run Development Servers

**Backend** (port 5000):
```bash
cd backend && npm run dev
```

**Frontend** (port 5173):
```bash
cd frontend && npm run dev
```

## 🔑 Environment Variables

See `backend/.env.example` and `frontend/.env.example`.

## 🚀 Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```
