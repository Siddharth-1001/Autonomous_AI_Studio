import time
from playwright.sync_api import sync_playwright
from database import SessionLocal
from models import Post
from datetime import datetime

class LinkedInScraper:
    def __init__(self):
        self.email = os.getenv("LINKEDIN_EMAIL")
        self.password = os.getenv("LINKEDIN_PASSWORD")
        self.db = SessionLocal()

    def login(self, page):
        print("Logging in...")
        page.goto("https://www.linkedin.com/login")
        page.fill("#username", self.email)
        page.fill("#password", self.password)
        page.click("button[type='submit']")
        page.wait_for_selector(".global-nav__me-photo", timeout=30000) # Wait for login success
        print("Login successful")

    def scrape_posts(self, limit=10):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=False) # Headless=False for debugging/safety
            context = browser.new_context()
            page = context.new_page()

            try:
                self.login(page)
                
                # Navigate to profile - this needs to be dynamic or set in env, for now we go to 'me'
                page.goto("https://www.linkedin.com/in/me/recent-activity/all/")
                page.wait_for_selector(".feed-shared-update-v2", timeout=30000)

                scraped_count = 0
                posts_data = []

                while scraped_count < limit:
                    # Parse current posts
                    posts = page.query_selector_all(".feed-shared-update-v2")
                    
                    for post in posts:
                        if scraped_count >= limit:
                            break
                        
                        try:
                            # Basic extraction logic - selectors might need tuning based on LI updates
                            text_element = post.query_selector(".feed-shared-update-v2__description-wrapper")
                            content = text_element.inner_text() if text_element else ""
                            
                            # Type detection (heuristic)
                            post_type = "text"
                            if post.query_selector(".feed-shared-article"): 
                                post_type = "article"
                            elif post.query_selector(".feed-shared-image"):
                                post_type = "image"
                            elif post.query_selector(".feed-shared-linkedin-video"):
                                post_type = "video"

                            # Metrics
                            reactions_el = post.query_selector(".social-details-social-counts__reactions-count")
                            reactions = int(reactions_el.inner_text().replace(',', '').strip()) if reactions_el else 0
                            
                            # Comments & Reposts are trickier as they are often inside a button text
                            # Simplified for MVP
                            
                            # Check if already exists? For MVP we just append
                            
                            new_post = Post(
                                content=content,
                                post_type=post_type,
                                reactions=reactions,
                                url=f"scraped_{datetime.now().timestamp()}_{scraped_count}" # Placeholder ID
                            )
                            self.db.add(new_post)
                            posts_data.append(new_post)
                            scraped_count += 1
                            
                        except Exception as e:
                            print(f"Error extracting post: {e}")
                            continue

                    # Scroll down
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                    time.sleep(2) # Human pause
                
                self.db.commit()
                print(f"Scraped {len(posts_data)} posts.")
                return len(posts_data)

            except Exception as e:
                print(f"Scraping failed: {e}")
            finally:
                browser.close()
                self.db.close()

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    scraper = LinkedInScraper()
    scraper.scrape_posts()
