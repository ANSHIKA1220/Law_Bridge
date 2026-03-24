# LegalMind

LegalMind is a full-stack legal assistance platform with a React frontend and FastAPI backend. It supports user authentication, legal Q&A, document analysis, case exploration, and advocate ticket creation.

## Features

- Role-aware authentication with JWT (`Citizen`, `Advocate`, `Student`, `Admin`)
- Legal Q&A endpoint with case suggestions
- Document upload and analysis pipeline (mock OCR + legal summarization)
- Case search with legal-style ranked results
- Advocate consultation ticket creation and retrieval

## Tech Stack

- Frontend: React + Vite
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL
- Auth: JWT (`python-jose`) + password hashing (`passlib[bcrypt]`)

## Project Structure

- `src/` - React frontend
- `backend/app/` - FastAPI application
- `backend/app/routes/` - API routes
- `backend/app/services/` - service layer (AI/OCR/case logic)
- `backend/app/models/` - SQLAlchemy models
- `backend/app/schemas/` - Pydantic request/response models

## Setup

### 1) Backend setup

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

Update `backend/.env` with your PostgreSQL credentials and a secure `JWT_SECRET`.

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2) Frontend setup

From project root:

```bash
npm install
npm run dev
```

Frontend default URL: [http://localhost:5173](http://localhost:5173)

Optional `.env` for frontend:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

## API Endpoints

Base URL: `http://localhost:8000/api`

- `POST /auth/signup`
- `POST /auth/login`
- `POST /chat` (Bearer token required)
- `POST /document/upload` (Bearer token required, multipart/form-data)
- `GET /cases?query=...`
- `POST /ticket/create` (Bearer token required)
- `GET /ticket/{ticket_id}` (Bearer token required)

## Full Flow Test

1. Signup
2. Login
3. Use token to call chat
4. Upload document
5. Search cases
6. Create ticket and fetch ticket by id

## Deployment Suggestions (Render / Railway)

- Use managed PostgreSQL and set `DATABASE_URL` securely.
- Set `JWT_SECRET` as a strong environment secret.
- Restrict `CORS_ORIGINS` to deployed frontend domain(s) only.
- Add database migrations (Alembic) before production rollout.
- Add centralized logging and health checks (`/health`) for monitoring.
- Use separate environments: dev / staging / production.
