# LegalMind Backend (FastAPI + PostgreSQL)

Production-ready project structure with modular routes/services/models and mock AI/OCR integrations.

## Prerequisites

- Python 3.10+
- PostgreSQL running
- Create a database matching `POSTGRES_DB` in `backend/.env`

## Setup

From the project root:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.\.venv\\Scripts\\activate  # Windows (PowerShell)
pip install -r requirements.txt
```

## Run

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Swagger UI:
- `http://localhost:8000/docs`

## Notes

- All AI/OCR/case retrieval calls are mocked for now (no external APIs).
- File uploads are stored locally under `backend/uploads` and served at `/uploads/...`.

