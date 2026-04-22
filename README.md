# quarkAI

A full-stack conversational AI web application where users can ask a single question and receive an AI-generated response powered by the Groq API (llama-3.1-8b-instant). All interactions are recorded and stored in MongoDB Atlas.

**Live Demo:** [quark-ai-frontend.vercel.app](https://quark-ai-frontend.vercel.app)

---

## Project Overview

quarkAI is a minimal, clean-architecture web application that:

- Accepts **one question at a time** from the user
- Sends the query to **Groq's llama-3.1-8b-instant** model via REST API
- Displays the **AI-generated response** in a clean user interface
- Stores each question and its corresponding response in **MongoDB Atlas**

The application is designed for single-turn interactions only. It does not maintain chat history, session memory, or user authentication.

---

## Project Structure

```
quark-ai/
├── frontend/          
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/          
│   ├── index.js      
│   ├── routes/
│   │   └── ask.js    
│   ├── models/
│   │   └── Interaction.js  
│   ├── .env.example
│   └── package.json
│
├── .env.example
├── .gitignore
├── vibecoded.md
└── README.md
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite | UI framework and fast bundler |
| Backend | Node.js + Express | Runtime and HTTP server |
| AI Model | Groq API (`llama-3.1-8b-instant`) | LLM inference |
| Database | MongoDB Atlas | Storing Q&A pairs |
| Deployment | Vercel | Hosting both frontend and backend |

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org) installed (v18 or higher recommended)
- A [Groq API key](https://console.groq.com) (free tier)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster with a connection URI

---

### 1. Clone the Repository

```bash
git clone https://github.com/sukrutimogili/quark-ai.git
cd quark-ai
```

---

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in the required values:

```env
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/quark-ai
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Install dependencies and start the server:

```bash
npm install
node index.js
```

The backend will be running at `http://localhost:3000`.

---

### 3. Frontend Setup

```bash
cd ../frontend
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## API Usage

### `POST /api/ask`

Accepts a user question, queries the Groq LLM, saves the interaction to MongoDB, and returns the AI response.

**Request**

```http
POST /api/ask
Content-Type: application/json

{
  "question": "What is quantum computing?"
}
```

**Response**

```json
{
  "answer": "Quantum computing is a type of computation that harnesses quantum mechanical phenomena..."
}
```

**Error Response**

```json
{
  "error": "Question is required"
}
```

| Status Code | Meaning |
|---|---|
| `200` | Success — answer returned |
| `400` | Bad request — missing question |
| `500` | Server error — Groq or DB failure |

---

### Data Stored in MongoDB

Each successful interaction saves the following document to the `interactions` collection:

```json
{
  "_id": "ObjectId(...)",
  "question": "What is quantum computing?",
  "answer": "Quantum computing is...",
  "createdAt": "2025-04-20T10:30:00.000Z"
}
```

---

## Deployment

Both frontend and backend are deployed as **independent Vercel projects** from the same repository.

### Backend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com) and create a **New Project**
2. Import the `sukrutimogili/quark-ai` GitHub repository
3. Set **Root Directory** to `backend`
4. Set **Framework Preset** to `Other`
5. Add the following **Environment Variables** in the Vercel dashboard:
   - `GROQ_API_KEY`
   - `MONGODB_URI`
   - `FRONTEND_URL` → your Vercel frontend URL (add this after the frontend is deployed)
6. Click **Deploy**

### Frontend Deployment (Vercel)

1. Create another **New Project** on Vercel from the same repository
2. Set **Root Directory** to `frontend`
3. Set **Framework Preset** to `Vite`
4. Add the following **Environment Variable**:
   - `VITE_API_URL` → your deployed backend Vercel URL (e.g. `https://quark-ai-backend.vercel.app`)
5. Click **Deploy**

---

## Security Practices

- All secrets (API keys, database URIs) are stored in **environment variables** and are never committed to source code
- `.env` files are listed in `.gitignore`
- CORS is configured on the backend to **only allow requests from the frontend URL** via the `FRONTEND_URL` environment variable
- Input validation on the `/api/ask` endpoint rejects empty or missing questions
- The MongoDB connection uses an **authenticated Atlas URI** with least-privilege user access

---

## Environment Variables Reference

### Backend (`.env`)

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key from [console.groq.com](https://console.groq.com) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Port for local development (default: `3000`) |
| `FRONTEND_URL` | Allowed CORS origin (e.g. `https://quark-ai-frontend.vercel.app`) |

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend (e.g. `https://quark-ai-backend.vercel.app`) |

---
