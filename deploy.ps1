# deploy.ps1 - Automated Deployment to Google Cloud Run

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
Check-Command "docker"

# 2. Configuration
$ProjectId = $env:PROJECT_ID
if (-not $ProjectId) {
    $ProjectId = Read-Host "Enter your Google Cloud Project ID"
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

# Enable Artifact Registry if not already enabled (this might fail if no permissions, but we try)
Write-Host "Enabling Artifact Registry API..."
cmd /c "gcloud services enable artifactregistry.googleapis.com"

# Create Repository if it doesn't exist
Write-Host "Ensuring Artifact Registry repository exists..."
$RepoExists = cmd /c "gcloud artifacts repositories describe $RepoName --location=$Region 2>&1"
if ($LASTEXITCODE -ne 0) {
    cmd /c "gcloud artifacts repositories create $RepoName --repository-format=docker --location=$Region --description='Docker repository for AI Studio'"
}

# Configure Docker Auth
Write-Host "Configuring Docker authentication..."
cmd /c "gcloud auth configure-docker $RegistryHost"

# 4. Build and Push Backend
Write-Host "Building Backend..." -ForegroundColor Cyan
docker build -t "$ImagePrefix/backend:latest" ./backend
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Pushing Backend..."
docker push "$ImagePrefix/backend:latest"
if ($LASTEXITCODE -ne 0) { exit 1 }

# 5. Build and Push Frontend
Write-Host "Building Frontend..." -ForegroundColor Cyan
docker build -t "$ImagePrefix/frontend:latest" ./frontend
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Pushing Frontend..."
docker push "$ImagePrefix/frontend:latest"
if ($LASTEXITCODE -ne 0) { exit 1 }

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
# Pass Backend URL as env var
cmd /c "gcloud run deploy ai-studio-frontend --image $ImagePrefix/frontend:latest --platform managed --region $Region --allow-unauthenticated --port 8080 --set-env-vars NEXT_PUBLIC_API_URL=$BackendUrl"
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "Deployment Complete!" -ForegroundColor Green
