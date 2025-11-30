# Secure GitHub Push Script - Prompts for credentials

$githubUsername = "khadeercodes"
$githubEmail = "khadeershaik.cse@gmail.com"
$repoName = "employee-attendance-system"
$repoUrl = "https://github.com/$githubUsername/$repoName.git"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  GitHub Push - Employee Attendance System" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "GitHub Username: $githubUsername" -ForegroundColor Cyan
Write-Host "GitHub Email: $githubEmail" -ForegroundColor Cyan
Write-Host "Repository: $repoName`n" -ForegroundColor Cyan

# Check git
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads`n" -ForegroundColor Yellow
    exit
}

# Configure git user (if not already set)
Write-Host "⚙️  Configuring Git user..." -ForegroundColor Yellow
git config user.name $githubUsername
git config user.email $githubEmail
Write-Host "✅ Git user configured`n" -ForegroundColor Green

# Initialize if needed
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized`n" -ForegroundColor Green
}

# Set branch to main
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    git checkout -b main 2>$null
    Write-Host "🌿 Created main branch`n" -ForegroundColor Green
} elseif ($currentBranch -ne "main") {
    git branch -M main
    Write-Host "🌿 Renamed branch to main`n" -ForegroundColor Green
}

# Add files
Write-Host "📝 Adding files to staging..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added`n" -ForegroundColor Green

# Check for changes
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Creating commit..." -ForegroundColor Yellow
    git commit -m "Employee Attendance System - Initial commit with Neumorphism UI"
    Write-Host "✅ Commit created`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No changes to commit`n" -ForegroundColor Cyan
}

# Set remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    if ($existingRemote -ne $repoUrl) {
        Write-Host "🔄 Updating remote..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
    }
} else {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $repoUrl
}
Write-Host "✅ Remote configured: $repoUrl`n" -ForegroundColor Green

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IMPORTANT - Repository Setup" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "Before pushing, you MUST create the repository on GitHub:" -ForegroundColor White
Write-Host "1. Go to: https://github.com/new" -ForegroundColor Cyan
Write-Host "2. Repository name: $repoName" -ForegroundColor Yellow
Write-Host "3. Choose: PUBLIC (selected)" -ForegroundColor Green
Write-Host "4. DO NOT check 'Initialize with README'`n" -ForegroundColor Yellow

$repoCreated = Read-Host "Have you created the repository on GitHub? (y/n)"
if ($repoCreated -ne "y" -and $repoCreated -ne "Y") {
    Write-Host "`n⏸️  Please create the repository first:" -ForegroundColor Yellow
    Write-Host "   https://github.com/new`n" -ForegroundColor Cyan
    Write-Host "Then run this script again.`n" -ForegroundColor White
    exit
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Authentication Required" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "⚠️  GitHub requires Personal Access Token (NOT password)" -ForegroundColor Yellow
Write-Host "`nOption 1: Use Personal Access Token (Recommended)" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Generate new token (classic)" -ForegroundColor White
Write-Host "3. Select scope: 'repo' (full control)" -ForegroundColor White
Write-Host "4. Generate and copy the token`n" -ForegroundColor White

Write-Host "Option 2: Use GitHub Password (may not work)" -ForegroundColor Cyan
Write-Host "GitHub disabled password authentication for HTTPS`n" -ForegroundColor Yellow

$useToken = Read-Host "Do you have a Personal Access Token? (y/n)"
if ($useToken -ne "y" -and $useToken -ne "Y") {
    Write-Host "`n📖 Creating Personal Access Token:" -ForegroundColor Cyan
    Write-Host "1. Visit: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Click 'Generate new token' → 'Generate new token (classic)'" -ForegroundColor White
    Write-Host "3. Name: 'attendance-system-push'" -ForegroundColor White
    Write-Host "4. Expiration: 90 days (or No expiration)" -ForegroundColor White
    Write-Host "5. Select scope: Check 'repo' (full control)" -ForegroundColor White
    Write-Host "6. Click 'Generate token'" -ForegroundColor White
    Write-Host "7. COPY THE TOKEN (you won't see it again!)`n" -ForegroundColor Yellow
    Write-Host "Press Enter after creating the token..." -ForegroundColor Cyan
    Read-Host
}

Write-Host "`n🚀 Ready to push to GitHub!" -ForegroundColor Green
Write-Host "   Repository: https://github.com/$githubUsername/$repoName`n" -ForegroundColor Cyan

$ready = Read-Host "Ready to push? (y/n)"
if ($ready -ne "y" -and $ready -ne "Y") {
    Write-Host "`n⏸️  Push cancelled. Run script again when ready.`n" -ForegroundColor Yellow
    exit
}

Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   When prompted:" -ForegroundColor White
Write-Host "   Username: $githubUsername" -ForegroundColor Cyan
Write-Host "   Password: Enter your Personal Access Token`n" -ForegroundColor Cyan

try {
    # Push with credential prompt
    git push -u origin main
    
    Write-Host "`n✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "   View repository: https://github.com/$githubUsername/$repoName`n" -ForegroundColor Cyan
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Next Steps - Deployment" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    Write-Host "1. ✅ Code is on GitHub" -ForegroundColor White
    Write-Host "2. 📖 Read DEPLOYMENT.md for hosting" -ForegroundColor White
    Write-Host "3. 🚀 Deploy backend on Render.com" -ForegroundColor White
    Write-Host "4. 🎨 Deploy frontend on Vercel.com`n" -ForegroundColor White
    
} catch {
    Write-Host "`n❌ Push failed!" -ForegroundColor Red
    Write-Host "`nPossible issues:" -ForegroundColor Yellow
    Write-Host "1. Repository doesn't exist - create it first" -ForegroundColor White
    Write-Host "2. Wrong credentials - use Personal Access Token" -ForegroundColor White
    Write-Host "3. Token expired - generate a new one" -ForegroundColor White
    Write-Host "4. Network issue - check internet connection`n" -ForegroundColor White
    
    Write-Host "Try pushing manually:" -ForegroundColor Cyan
    Write-Host "  git push -u origin main`n" -ForegroundColor White
    
    Write-Host "Or use GitHub Desktop:" -ForegroundColor Cyan
    Write-Host "  Download: https://desktop.github.com`n" -ForegroundColor White
}

