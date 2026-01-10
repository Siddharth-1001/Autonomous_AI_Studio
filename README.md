# Autonomous Analytics Studio

An Agentic AI-powered social media analytics dashboard.
Stack: FastAPI, Next.js, Playwright, AutoGen (Gemini).

## Setup

### Backend
1.  Navigate to `/backend`.
2.  Install dependencies: `pip install -r requirements.txt` & `playwright install`.
3.  Set up `.env` with `LINKEDIN_EMAIL`, `LINKEDIN_PASSWORD`, and `GOOGLE_API_KEY`.
4.  Run server: `uvicorn main:app --reload --port 8000`

### Frontend
1.  Navigate to `/frontend`.
2.  Install: `npm install`.
3.  Run dev server: `npm run dev`.
4.  Open `http://localhost:3000`.
