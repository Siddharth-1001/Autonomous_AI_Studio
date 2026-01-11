FROM python:3.11-slim

WORKDIR /app

# Install system dependencies setup
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browsers and dependencies
# We only install chromium to keep the image size smaller, unless others are needed.
# --with-deps installs system dependencies required by the browser
RUN playwright install --with-deps chromium

COPY . .

# Expose the port (Cloud Run defaults to 8080)
ENV PORT=8080

# Use shell form to expand ${PORT}
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port ${PORT}"
