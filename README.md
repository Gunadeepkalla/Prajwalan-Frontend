# Prajwalan – Agentic AI Complaint Intake System

A full-stack complaint management platform with AI-powered intake, built with **Express.js** (backend) and **React + TypeScript** (frontend).

## Project Structure

```
prajwalan/
├── backend/
│   └── backend/          # Node.js / Express API  (port 5000)
│       ├── prisma/       # Prisma schema & migrations
│       └── src/          # Routes, middleware, services
├── frontend/             # React + TypeScript SPA  (port 3000)
│   └── src/
├── docker-compose.yml    # Full-stack Docker setup
└── .env.example          # Environment variable reference
```

## Quick Start (Local Development)

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

```bash
# Copy the example and fill in your values
cp .env.example backend/backend/.env
```

### 3. Run database migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start both services

```bash
npm run dev
```

- **Backend API** → http://localhost:5000
- **Frontend App** → http://localhost:3000 (proxies `/api/*` to the backend)

---

## Individual Commands

| Command | Description |
|---|---|
| `npm run dev` | Start backend + frontend together |
| `npm run dev:backend` | Start only the Express API |
| `npm run dev:frontend` | Start only the Vite dev server |
| `npm run build:frontend` | Production build of frontend |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:seed` | Seed the database |

## Docker (Full Stack)

```bash
docker-compose up --build
```

Services:
- `postgres` on port **5432**
- `redis` on port **6379**
- `backend` on port **5000**
- `frontend` on port **3000**

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express 4, Prisma ORM |
| Database | PostgreSQL 16 |
| Cache / Queue | Redis 7, BullMQ |
| AI | Azure OpenAI, Azure Speech Services |
| Auth | JWT (access + refresh tokens) |
