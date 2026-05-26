# SaaS Starter — Vue 3 + FastAPI

Full-stack SaaS boilerplate with auth, billing, and a clean dashboard.

## Stack

| Layer    | Tech                                    |
|----------|-----------------------------------------|
| Frontend | Vue 3 · Vite · TypeScript · Tailwind · Pinia |
| Backend  | FastAPI · SQLAlchemy (async) · PostgreSQL |
| Auth     | JWT (HS256) · bcrypt                    |
| Billing  | Stripe Checkout + Webhooks              |
| Infra    | Docker Compose                          |

## Quick start

```bash
# 1. Clone and copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Start everything
docker compose up --build

# 3. Run DB migrations (first time)
docker compose exec backend alembic upgrade head
```

Ports:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs

## Local dev (no Docker)

```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Stripe setup

1. Create products + prices in the Stripe dashboard
2. Paste price IDs into `backend/app/api/v1/routes/billing.py`
3. Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in `backend/.env`
4. Forward webhooks locally: `stripe listen --forward-to localhost:8000/api/v1/billing/webhook`

## Project structure

```
saas-app/
├── backend/
│   └── app/
│       ├── api/v1/routes/   # auth · users · billing
│       ├── core/            # config · security
│       ├── db/              # async session
│       ├── models/          # SQLAlchemy ORM
│       ├── schemas/         # Pydantic I/O
│       └── services/        # business logic (add here)
└── frontend/
    └── src/
        ├── stores/          # Pinia (auth)
        ├── router/          # Vue Router + guards
        ├── views/           # pages (auth · dashboard · pricing)
        ├── components/      # ui · layout · features
        └── utils/           # axios client
```
