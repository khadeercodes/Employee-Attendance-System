# Interactive GitHub Push Script

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  GitHub Push Setup" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads`n" -ForegroundColor Yellow
    exit
}

# Get GitHub details from user
Write-Host "Please provide your GitHub details:" -ForegroundColor Yellow
Write-Host ""

$githubUsername = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (e.g., employee-attendance-system)"

if ([string]::IsNullOrWhiteSpace($githubUsername) -or [string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "`n❌ Username and repository name are required!" -ForegroundColor Red
    exit
}

$repoUrl = "https://github.com/$githubUsername/$repoName.git"

Write-Host "`n📋 Repository URL: $repoUrl" -ForegroundColor Cyan
Write-Host ""

# Initialize git if needed
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized`n" -ForegroundColor Green
}

# Check current branch
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    Write-Host "🌿 Creating main branch..." -ForegroundColor Yellow
    git checkout -b main
    Write-Host "✅ Main branch created`n" -ForegroundColor Green
} elseif ($currentBranch -ne "main") {
    Write-Host "🌿 Renaming branch to main..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✅ Branch renamed to main`n" -ForegroundColor Green
}

# Add all files
Write-Host "📝 Adding files to staging..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added`n" -ForegroundColor Green

# Check if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Creating commit..." -ForegroundColor Yellow
    git commit -m "Employee Attendance System - Initial commit with Neumorphism UI"
    Write-Host "✅ Commit created`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No changes to commit`n" -ForegroundColor Cyan
}

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $update = Read-Host "Do you want to update it? (y/n)"
    if ($update -eq "y" -or $update -eq "Y") {
        git remote set-url origin $repoUrl
        Write-Host "✅ Remote updated`n" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Keeping existing remote`n" -ForegroundColor Cyan
        $repoUrl = $remoteExists
    }
} else {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "✅ Remote added`n" -ForegroundColor Green
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ready to Push!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "⚠️  IMPORTANT: Make sure you have created the repository on GitHub first!" -ForegroundColor Yellow
Write-Host "   1. Go to https://github.com/new" -ForegroundColor White
Write-Host "   2. Repository name: $repoName" -ForegroundColor White
Write-Host "   3. Choose Public or Private" -ForegroundColor White
Write-Host "   4. DO NOT initialize with README" -ForegroundColor White
Write-Host "   5. Click 'Create repository'`n" -ForegroundColor White

$ready = Read-Host "Have you created the repository on GitHub? (y/n)"
if ($ready -ne "y" -and $ready -ne "Y") {
    Write-Host "`n⏸️  Please create the repository first, then run this script again.`n" -ForegroundColor Yellow
    exit
}

Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   (You may be asked for GitHub credentials)`n" -ForegroundColor Gray

try {
    git push -u origin main
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "   Repository: $repoUrl`n" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ Push failed!" -ForegroundColor Red
    Write-Host "`nCommon issues:" -ForegroundColor Yellow
    Write-Host "1. Repository doesn't exist on GitHub - create it first" -ForegroundColor White
    Write-Host "2. Authentication failed - use Personal Access Token" -ForegroundColor White
    Write-Host "3. Wrong repository URL - check username and repo name`n" -ForegroundColor White
    
    Write-Host "To use Personal Access Token:" -ForegroundColor Cyan
    Write-Host "1. GitHub → Settings → Developer settings → Personal access tokens" -ForegroundColor White
    Write-Host "2. Generate new token (classic)" -ForegroundColor White
    Write-Host "3. Use token as password when pushing`n" -ForegroundColor White
    
    Write-Host "Or try manually:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main`n" -ForegroundColor White
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "1. ✅ Code pushed to GitHub" -ForegroundColor White
Write-Host "2. 📖 Read DEPLOYMENT.md for hosting instructions" -ForegroundColor White
Write-Host "3. 🚀 Deploy backend on Render.com" -ForegroundColor White
Write-Host "4. 🎨 Deploy frontend on Vercel.com`n" -ForegroundColor White

