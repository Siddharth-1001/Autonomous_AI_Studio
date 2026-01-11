# Deployment Guide for Autonomous AI Studio

This guide details how to deploy the application to Google Cloud Run.

## Prerequisites

- Google Cloud SDK (`gcloud`) installed and authenticated.
- Docker installed.
- A Google Cloud Project with billing enabled.

## Automated Deployment (Recommended)

Quickly deploy using the provided PowerShell script.

1.  Open PowerShell.
2.  Run the script:
    ```powershell
    ./deploy.ps1
    ```
3.  Follow the prompts to enter your **Project ID** and **Region**.

## Deployment WITHOUT Local Docker

If you do NOT have Docker installed locally, use this script instead. It builds your containers using Google Cloud Build.

1.  Open PowerShell.
2.  Run:
    ```powershell
    ./deploy_with_cloud_build.ps1
    ```

### Where to find these details?

*   **Project ID**:
    *   Go to the [Google Cloud Console Dashboard](https://console.cloud.google.com/home/dashboard).
    *   Click the project dropdown in the top bar.
    *   The **ID** is in the rightmost column of the project selector (e.g., `my-project-12345`).
    *   *Or run:* `gcloud projects list` in your terminal.
*   **Region**:
    *   This is the physical location of the server. Common choices:
        *   `us-central1` (Iowa)
        *   `us-east1` (South Carolina)
        *   `europe-west1` (Belgium)
        *   `asia-south1` (Mumbai)

---

## Manual Deployment Steps

If you prefer to run commands manually or need to debug steps:

### 1. Setup Environment Variables

Ensure you have a `.env` file in the `backend/` directory with your API keys. Using a `.env` file is for local development. For Cloud Run, you will set these as environment variables during deployment.

**Required Variables:**
- `OPENAI_API_KEY` or `GOOGLE_API_KEY`
- `DATABASE_URL` (if using Cloud SQL, otherwise it defaults to local file)

## 2. Build and Push Docker Images

Replace `[PROJECT_ID]` with your Google Cloud project ID.

```bash
# Set your project ID
export PROJECT_ID=your-project-id
export REGION=us-central1

# Enable Artifact Registry API
gcloud services enable artifactregistry.googleapis.com

# Create a repository (if not exists)
gcloud artifacts repositories create ai-studio-repo --repository-format=docker \
    --location=$REGION --description="Docker repository for AI Studio"

# Configure Docker to authenticate with Google Cloud
gcloud auth configure-docker $REGION-docker.pkg.dev

# --- Backend ---
# Build
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/ai-studio-repo/backend:latest ./backend

# Push
docker push $REGION-docker.pkg.dev/$PROJECT_ID/ai-studio-repo/backend:latest

# --- Frontend ---
# Build
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/ai-studio-repo/frontend:latest ./frontend

# Push
docker push $REGION-docker.pkg.dev/$PROJECT_ID/ai-studio-repo/frontend:latest
```

## 3. Deploy to Cloud Run

### Backend Deployment

```bash
gcloud run deploy ai-studio-backend \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/ai-studio-repo/backend:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080 \
    --memory 1Gi
```
*Note: Add `--set-env-vars KEY=VALUE` to set your API keys.*

### Frontend Deployment

First, get the URL of the deployed backend.

```bash
BACKEND_URL=$(gcloud run services describe ai-studio-backend --platform managed --region $REGION --format 'value(status.url)')
```

Now deploy the frontend, passing the backend URL.

```bash
gcloud run deploy ai-studio-frontend \
    --image $REGION-docker.pkg.dev/$PROJECT_ID/ai-studio-repo/frontend:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 8080 \
    --set-env-vars NEXT_PUBLIC_API_URL=$BACKEND_URL
```

## 4. Verification

Visit the URL provided by the frontend deployment command.
