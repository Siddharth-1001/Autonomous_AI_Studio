import asyncio
import os
import re
import sys
import time

from database import SessionLocal
from playwright.sync_api import sync_playwright

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
from datetime import datetime

from models import Post


class LinkedInScraper:
    def __init__(self, email: str, password: str, username: str):
        self.email = email
        self.password = password
        # Construct profile URL from username if it's just a username, otherwise treat as full URL
        if "linkedin.com" in username:
            self.profile_url = username
        else:
            self.profile_url = f"https://www.linkedin.com/in/{username}/"
            
        self.db = SessionLocal()

    def login(self, page):
        print("Logging in...")
        page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
        time.sleep(2)  # Wait for page to stabilize

        page.fill("#username", self.email)
        page.fill("#password", self.password)
        page.click("button[type='submit']")

        # Don't wait for load state - instead poll for the result
        # This handles both direct login AND verification scenarios
        print("Waiting for login to complete...")

        login_timeout = 180  # 3 minutes total
        poll_interval = 2
        elapsed = 0

        verification_prompted = False
        login_success = False

        while elapsed < login_timeout and not login_success:
            time.sleep(poll_interval)
            elapsed += poll_interval

            try:
                # Get current URL
                current_url = page.url

                # Debug: Print URL every 10 seconds to see what's happening
                if elapsed % 10 == 0:
                    print(f"[DEBUG] Current URL: {current_url}")

                # FIRST: Check for feed/logged-in page elements (regardless of URL)
                # LinkedIn sometimes doesn't change the URL immediately after verification
                feed_element_selectors = [
                    ".global-nav",
                    ".feed-shared-update-v2",
                    ".share-box-feed-entry__trigger",
                    ".feed-identity-module",
                    ".scaffold-layout__main",
                    "[data-control-name='feed_post']",
                    ".search-global-typeahead",
                ]

                for selector in feed_element_selectors:
                    try:
                        element = page.query_selector(selector)
                        if element:
                            print(f"[DEBUG] Found logged-in element: {selector}")
                            print(
                                "Login/verification completed - detected feed elements!"
                            )
                            login_success = True
                            break
                    except:
                        continue

                if login_success:
                    break

                # Check if we're on a verification page (by URL)
                verification_indicators = [
                    "checkpoint",
                    "challenge",
                    "two-step-verification",
                    "add-phone",
                    "security-verification",
                ]

                if any(
                    indicator in current_url for indicator in verification_indicators
                ):
                    if not verification_prompted:
                        print("=" * 50)
                        print("VERIFICATION REQUIRED!")
                        print("Please complete the verification in the browser window.")
                        print("(Check your LinkedIn app, SMS, or email)")
                        print("Waiting up to 3 minutes for verification...")
                        print("=" * 50)
                        verification_prompted = True

                    # Progress update every 30 seconds
                    if elapsed % 30 == 0:
                        remaining = login_timeout - elapsed
                        print(
                            f"Still waiting for verification... {remaining} seconds remaining"
                        )
                    continue

                # Check if we made it past login (by URL patterns)
                success_url_patterns = [
                    "/feed",
                    "/in/",
                    "/mynetwork",
                    "/jobs",
                    "/messaging",
                    "/notifications",
                ]

                # Also check if we're on linkedin.com homepage (not login/checkpoint)
                is_on_main_site = (
                    "linkedin.com" in current_url
                    and "login" not in current_url
                    and "checkpoint" not in current_url
                    and "challenge" not in current_url
                    and "security" not in current_url
                )

                if (
                    any(pattern in current_url for pattern in success_url_patterns)
                    or is_on_main_site
                ):
                    print(f"Login/verification completed - reached: {current_url}")
                    login_success = True
                    break

                # Still on login page - might be loading or have an error
                if "login" in current_url:
                    # Check for error messages
                    try:
                        error_el = page.query_selector(
                            ".form__label--error, #error-for-username, #error-for-password"
                        )
                        if error_el:
                            error_text = error_el.inner_text()
                            raise Exception(f"Login error: {error_text}")
                    except:
                        pass

                    if elapsed > 10:  # Give it 10 seconds before warning
                        print(f"Still on login page after {elapsed}s...")

            except Exception as e:
                if "Login error" in str(e):
                    raise e
                # Other errors - page might be navigating, continue polling
                print(f"Polling check encountered: {e}")
                continue

        if not login_success:
            raise Exception("Login timeout - verification may not have been completed")

        # Give the page a moment to fully load after successful navigation
        time.sleep(3)

        # Verify we're actually logged in by checking for nav elements
        try:
            page.wait_for_selector(
                ".global-nav, .feed-shared-update-v2, .share-box", timeout=15000
            )
            print("Login verified - navigation elements found")
        except:
            print("Warning: Could not verify login elements, but URL suggests success")

    def scrape_posts(self, limit=10):
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=False
            )  # Headless=False for debugging/safety
            context = browser.new_context(
                viewport={"width": 1280, "height": 900},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            )
            page = context.new_page()

            # Set longer default timeout
            page.set_default_timeout(60000)

            try:
                self.login(page)

                # Navigate to profile page
                print(f"Navigating to profile: {self.profile_url}")
                page.goto(
                    self.profile_url, wait_until="domcontentloaded", timeout=60000
                )
                time.sleep(3)

                # Scroll down to find the Activity section
                print("Looking for Activity section...")
                page.evaluate("window.scrollTo(0, 500)")
                time.sleep(2)

                # Try to find and click "Show all posts" button
                show_all_selectors = [
                    "text=Show all posts",
                    "a:has-text('Show all posts')",
                    "[href*='recent-activity/all']",
                    ".pvs-navigation__text:has-text('Show all')",
                    "span:has-text('Show all posts')",
                ]

                clicked = False
                for selector in show_all_selectors:
                    try:
                        element = page.locator(selector).first
                        if element.is_visible(timeout=5000):
                            element.click()
                            clicked = True
                            print(f"Clicked 'Show all posts' using: {selector}")
                            break
                    except:
                        continue

                if not clicked:
                    # Fallback: directly navigate to the posts URL
                    print(
                        "Could not find 'Show all posts' button, navigating directly..."
                    )
                    posts_url = self.profile_url.rstrip("/") + "/recent-activity/all/"
                    page.goto(posts_url, wait_until="domcontentloaded", timeout=60000)

                time.sleep(3)  # Let the posts page load
                print(f"On posts page: {page.url}")

                # Wait for posts to load - try multiple selectors
                post_container_selectors = [
                    ".feed-shared-update-v2",
                    ".profile-creator-shared-feed-update__container",
                    ".occludable-update",
                    "[data-urn*='activity']",
                ]

                posts_found = False
                for selector in post_container_selectors:
                    try:
                        page.wait_for_selector(selector, timeout=15000)
                        posts_found = True
                        print(f"Posts container found using selector: {selector}")
                        break
                    except:
                        continue

                if not posts_found:
                    print(
                        "Warning: Could not find posts with known selectors, attempting to continue..."
                    )

                scraped_count = 0
                posts_data = []
                seen_contents = set()  # To avoid duplicates

                while scraped_count < limit:
                    # Parse current posts - try multiple selectors
                    posts = page.query_selector_all(".feed-shared-update-v2")
                    if not posts:
                        posts = page.query_selector_all(
                            ".profile-creator-shared-feed-update__container"
                        )
                    if not posts:
                        posts = page.query_selector_all(".occludable-update")
                    if not posts:
                        posts = page.query_selector_all("[data-urn*='activity']")

                    print(f"Found {len(posts)} post elements on page")

                    for post in posts:
                        if scraped_count >= limit:
                            break

                        try:
                            # Extract post content - try multiple selectors
                            content = ""
                            content_selectors = [
                                ".feed-shared-update-v2__description",
                                ".feed-shared-text",
                                ".break-words",
                                ".feed-shared-update-v2__commentary",
                                "span[dir='ltr']",
                            ]

                            for sel in content_selectors:
                                text_element = post.query_selector(sel)
                                if text_element:
                                    content = text_element.inner_text().strip()
                                    if content:
                                        break

                            # Skip if no content or already seen
                            if not content or content in seen_contents:
                                continue

                            seen_contents.add(content)

                            # Truncate content for display (first 500 chars)
                            display_content = (
                                content[:500] + "..." if len(content) > 500 else content
                            )

                            # Type detection (heuristic)
                            post_type = "text"
                            if post.query_selector(
                                ".feed-shared-article, .update-components-article"
                            ):
                                post_type = "article"
                            elif post.query_selector(
                                ".feed-shared-image, .update-components-image"
                            ):
                                post_type = "image"
                            elif post.query_selector(
                                ".feed-shared-linkedin-video, .update-components-video, video"
                            ):
                                post_type = "video"
                            elif post.query_selector(
                                ".feed-shared-document, .update-components-document"
                            ):
                                post_type = "document"

                            # Extract reactions count - Activity page shows reactions differently
                            reactions = 0
                            reactions_selectors = [
                                ".social-details-social-counts__reactions-count",
                                ".social-details-social-counts__count-value",
                                "span.reactions-count",
                                # Activity page specific selectors
                                ".social-details-social-counts__social-proof-fallback-number",
                                "[data-test-id='social-actions__reaction-count']",
                                ".feed-shared-social-action-bar__social-counts-reactions span",
                            ]
                            for sel in reactions_selectors:
                                reactions_el = post.query_selector(sel)
                                if reactions_el:
                                    try:
                                        reactions_text = (
                                            reactions_el.inner_text()
                                            .replace(",", "")
                                            .strip()
                                        )
                                        # Extract just the number
                                        nums = re.findall(r"\d+", reactions_text)
                                        if nums:
                                            reactions = int(nums[0])
                                            break
                                    except:
                                        continue

                            # Also try to find reactions from the entire post text containing reaction emojis
                            if reactions == 0:
                                try:
                                    # Look for elements that might show "7" or similar near reaction icons
                                    all_spans = post.query_selector_all("span")
                                    for span in all_spans:
                                        text = span.inner_text().strip()
                                        if text.isdigit() and 0 < int(text) < 10000:
                                            # Check if this span is near social counts area
                                            parent = span.evaluate(
                                                "el => el.parentElement?.className || ''"
                                            )
                                            if (
                                                "social" in parent.lower()
                                                or "reaction" in parent.lower()
                                                or "count" in parent.lower()
                                            ):
                                                reactions = int(text)
                                                break
                                except:
                                    pass

                            # Extract comments count
                            comments = 0
                            comments_el = post.query_selector(
                                "button[aria-label*='comment'], .social-details-social-counts__comments"
                            )
                            if comments_el:
                                try:
                                    comments_text = (
                                        comments_el.inner_text()
                                        .replace(",", "")
                                        .strip()
                                    )
                                    # Extract number from text like "5 comments"
                                    nums = re.findall(r"\d+", comments_text)
                                    if nums:
                                        comments = int(nums[0])
                                except:
                                    pass

                            # Generate a unique URL/ID for the post
                            post_id = (
                                f"post_{datetime.now().timestamp()}_{scraped_count}"
                            )

                            new_post = Post(
                                content=content,
                                post_type=post_type,
                                reactions=reactions,
                                comments=(
                                    comments if hasattr(Post, "comments") else None
                                ),
                                url=post_id,
                            )
                            self.db.add(new_post)
                            posts_data.append(new_post)
                            scraped_count += 1

                            print(
                                f"[{scraped_count}/{limit}] Scraped: {display_content[:80]}... | Type: {post_type} | Reactions: {reactions}"
                            )

                        except Exception as e:
                            print(f"Error extracting post: {e}")
                            continue

                    if scraped_count >= limit:
                        break

                    # Scroll down to load more posts
                    prev_count = len(posts)
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                    time.sleep(2)

                    # Check if we got new posts after scrolling
                    new_posts = page.query_selector_all(
                        ".feed-shared-update-v2, .occludable-update"
                    )
                    if len(new_posts) <= prev_count:
                        print("No more posts to load")
                        break

                self.db.commit()
                print(f"\n{'='*50}")
                print(f"Successfully scraped {len(posts_data)} posts!")
                print(f"{'='*50}")
                return len(posts_data)

            except Exception as e:
                print(f"Scraping failed: {e}")
                import traceback

                traceback.print_exc()
                return 0
            finally:
                try:
                    context.close()
                    browser.close()
                except:
                    pass
                self.db.close()


if __name__ == "__main__":
    from dotenv import load_dotenv

    load_dotenv()
    scraper = LinkedInScraper()
    scraper.scrape_posts()
