# deploy_cloud_build.ps1 - Deploy WITHOUT local Docker
# This script uses Google Cloud Build to build images in the cloud.

$ErrorActionPreference = "Stop"

function Check-Command {
    param ($Cmd)
    if (-not (Get-Command $Cmd -ErrorAction SilentlyContinue)) {
        Write-Error "$Cmd is not installed. Please install it and try again."
    }
}

# 1. Prerequisites Check
Write-Host "Checking prerequisites..." -ForegroundColor Cyan
Check-Command "gcloud"
# NOTE: We DO NOT check for docker here, as we use Cloud Build.

# 2. Configuration
$ProjectId = $env:PROJECT_ID
if (-not $ProjectId) {
    # Try to detect active project
    $ProjectId = cmd /c "gcloud config get-value project 2>&1"
    if ($ProjectId -match "unset") { $ProjectId = $null }
    
    if (-not $ProjectId) {
        $ProjectId = Read-Host "Enter your Google Cloud Project ID"
    }
    else {
        Write-Host "Detected Project ID: $ProjectId"
    }
}

$Region = $env:REGION
if (-not $Region) {
    $Region = Read-Host "Enter target Region (e.g., us-central1)"
}

$RepoName = "ai-studio-repo"
$RegistryHost = "$Region-docker.pkg.dev"
$ImagePrefix = "$RegistryHost/$ProjectId/$RepoName"

Write-Host "Configuration:" -ForegroundColor Green
Write-Host "  Project ID: $ProjectId"
Write-Host "  Region:     $Region"
Write-Host "  Repository: $RepoName"
Write-Host ""

# 3. Setup Google Cloud
Write-Host "Setting up Google Cloud..." -ForegroundColor Cyan
cmd /c "gcloud config set project $ProjectId"
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Enabling Cloud Build & Artifact Registry APIs..."
cmd /c "gcloud services enable artifactregistry.googleapis.com cloudbuild.googleapis.com"

# Create Repository if it doesn't exist
Write-Host "Ensuring Artifact Registry repository exists..."
$RepoCheck = cmd /c "gcloud artifacts repositories describe $RepoName --location=$Region 2>&1"
if ($LASTEXITCODE -ne 0) {
    cmd /c "gcloud artifacts repositories create $RepoName --repository-format=docker --location=$Region --description=AI-Studio-Repo"
}

# 4. Build Backend (In Cloud)
Write-Host "Building Backend (using Cloud Build)..." -ForegroundColor Cyan
cmd /c "gcloud builds submit --tag $ImagePrefix/backend:latest ./backend"
if ($LASTEXITCODE -ne 0) { 
    Write-Error "Backend build failed."
    exit 1 
}

# 5. Build Frontend (In Cloud)
Write-Host "Building Frontend (using Cloud Build)..." -ForegroundColor Cyan
cmd /c "gcloud builds submit --tag $ImagePrefix/frontend:latest ./frontend"
if ($LASTEXITCODE -ne 0) { 
    Write-Error "Frontend build failed."
    exit 1 
}

# 6. Deploy Backend
Write-Host "Deploying Backend to Cloud Run..." -ForegroundColor Cyan
cmd /c "gcloud run deploy ai-studio-backend --image $ImagePrefix/backend:latest --platform managed --region $Region --allow-unauthenticated --port 8080 --memory 1Gi"
if ($LASTEXITCODE -ne 0) { exit 1 }

# Get Backend URL
$BackendUrl = cmd /c "gcloud run services describe ai-studio-backend --platform managed --region $Region --format 'value(status.url)'"
$BackendUrl = $BackendUrl.Trim()
Write-Host "Backend deployed at: $BackendUrl" -ForegroundColor Green

# 7. Deploy Frontend
Write-Host "Deploying Frontend to Cloud Run..." -ForegroundColor Cyan
cmd /c "gcloud run deploy ai-studio-frontend --image $ImagePrefix/frontend:latest --platform managed --region $Region --allow-unauthenticated --port 8080 --set-env-vars NEXT_PUBLIC_API_URL=$BackendUrl"
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Deployment Complete!" -ForegroundColor Green
