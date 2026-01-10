from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import Post
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Analytics Studio AI")

@app.get("/")
def read_root():
    return {"message": "Welcome to Analytics Studio AI Backend"}

@app.get("/posts")
def get_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(Post.scraped_at.desc()).offset(skip).limit(limit).all()
    return posts

@app.post("/scrape")
def trigger_scrape(limit: int = 10, db: Session = Depends(get_db)):
    from .scraper import LinkedInScraper
    try:
        scraper = LinkedInScraper()
        count = scraper.scrape_posts(limit=limit)
        return {"message": f"Successfully scraped {count} posts"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
def trigger_analysis(db: Session = Depends(get_db)):
    from .agents import run_analysis
    # Fetch recent posts for analysis
    posts = db.query(Post).order_by(Post.scraped_at.desc()).limit(10).all()
    if not posts:
        raise HTTPException(status_code=400, detail="No posts found to analyze")
    
    posts_data = [{"content": p.content, "reactions": p.reactions, "type": p.post_type} for p in posts]
    
    try:
        result = run_analysis(posts_data)
        return {"analysis": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
