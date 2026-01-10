from sqlalchemy import Column, Integer, String, DateTime, Text
from database import Base
from datetime import datetime

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, default="LinkedIn")
    post_type = Column(String) # e.g., 'text', 'image', 'article', 'video'
    content = Column(Text)
    url = Column(String, unique=True, index=True)
    reactions = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    reposts = Column(Integer, default=0)
    scraped_at = Column(DateTime, default=datetime.utcnow)
    
    # Optional: Raw metadata if we want to store JSON blob later
    # raw_data = Column(Text) 
