import logging
import os
import traceback

import uvicorn
from database import Base, engine, get_db
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Post
from sqlalchemy.orm import Session

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Analytics Studio AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to Analytics Studio AI Backend"}


@app.get("/posts")
def get_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = (
        db.query(Post).order_by(Post.scraped_at.desc()).offset(skip).limit(limit).all()
    )
    return posts


from pydantic import BaseModel

class ScrapeRequest(BaseModel):
    email: str
    password: str
    username: str
    limit: int = 10

@app.post("/scrape")
def trigger_scrape(request: ScrapeRequest, db: Session = Depends(get_db)):
    import traceback

    from scraper import LinkedInScraper

    try:
        print(f"Starting scrape for {request.limit} posts...")
        scraper = LinkedInScraper(
            email=request.email, 
            password=request.password, 
            username=request.username
        )
        count = scraper.scrape_posts(limit=request.limit)
        print(f"Scrape finished. Count: {count}")
        return {"message": f"Successfully scraped {count} posts"}
    except Exception as e:
        print("Error during scraping:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/analyze")
def trigger_analysis(db: Session = Depends(get_db)):
    logger.info("Starting analysis endpoint...")
    try:
        from agents import run_analysis

        logger.info("Successfully imported agents module")
    except Exception as e:
        logger.error(f"Failed to import agents: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Import error: {str(e)}")

    # Fetch recent posts for analysis
    posts = db.query(Post).order_by(Post.scraped_at.desc()).limit(10).all()
    logger.info(f"Found {len(posts)} posts")

    if not posts:
        raise HTTPException(status_code=400, detail="No posts found to analyze")

    posts_data = [
        {"content": p.content, "reactions": p.reactions, "type": p.post_type}
        for p in posts
    ]
    logger.info(f"Prepared posts_data with {len(posts_data)} items")

    try:
        logger.info("Calling run_analysis...")
        result = run_analysis(posts_data)
        logger.info(f"Analysis result: {result}")
        return {"analysis": result}
    except Exception as e:
        logger.error(f"Error during analysis: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
