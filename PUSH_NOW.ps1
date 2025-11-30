# Push to GitHub for khadeercodes

$githubUsername = "khadeercodes"
$repoName = "employee-attendance-system"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Pushing to GitHub" -ForegroundColor Green
Write-Host "  Username: $githubUsername" -ForegroundColor Cyan
Write-Host "  Repository: $repoName" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check git
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    exit
}

# Initialize if needed
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized`n" -ForegroundColor Green
}

# Set branch to main
$currentBranch = git branch --show-current 2>$null
if (-not $currentBranch) {
    git checkout -b main 2>$null
} elseif ($currentBranch -ne "main") {
    git branch -M main
}

# Add files
Write-Host "📝 Adding files..." -ForegroundColor Yellow
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
$repoUrl = "https://github.com/$githubUsername/$repoName.git"
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    if ($existingRemote -ne $repoUrl) {
        Write-Host "🔄 Updating remote..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
        Write-Host "✅ Remote updated`n" -ForegroundColor Green
    } else {
        Write-Host "✅ Remote already configured`n" -ForegroundColor Green
    }
} else {
    Write-Host "🔗 Adding remote..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    Write-Host "✅ Remote added`n" -ForegroundColor Green
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IMPORTANT!" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "Before pushing, make sure you have:" -ForegroundColor White
Write-Host "1. Created the repository on GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   Repository name: $repoName" -ForegroundColor Yellow
Write-Host "   DO NOT initialize with README`n" -ForegroundColor Yellow

$ready = Read-Host "Have you created the repository? (y/n)"
if ($ready -ne "y" -and $ready -ne "Y") {
    Write-Host "`n⏸️  Please create the repository first:" -ForegroundColor Yellow
    Write-Host "   https://github.com/new`n" -ForegroundColor Cyan
    Write-Host "Repository name: $repoName" -ForegroundColor Yellow
    Write-Host "Then run this script again.`n" -ForegroundColor White
    exit
}

Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "   Repository: https://github.com/$githubUsername/$repoName`n" -ForegroundColor Cyan
Write-Host "⚠️  You will be asked for credentials:" -ForegroundColor Yellow
Write-Host "   Username: $githubUsername" -ForegroundColor White
Write-Host "   Password: Use Personal Access Token (not your GitHub password)`n" -ForegroundColor White

Write-Host "Need a token? GitHub → Settings → Developer settings → Personal access tokens`n" -ForegroundColor Cyan

$confirm = Read-Host "Ready to push? (y/n)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "`n⏸️  Push cancelled. Run script again when ready.`n" -ForegroundColor Yellow
    exit
}

Write-Host "`n📤 Pushing..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "`n✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "   View at: https://github.com/$githubUsername/$repoName`n" -ForegroundColor Cyan
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Read DEPLOYMENT.md for hosting instructions" -ForegroundColor White
    Write-Host "2. Deploy backend on Render.com" -ForegroundColor White
    Write-Host "3. Deploy frontend on Vercel.com`n" -ForegroundColor White
} catch {
    Write-Host "`n❌ Push failed!" -ForegroundColor Red
    Write-Host "`nCommon issues:" -ForegroundColor Yellow
    Write-Host "1. Repository doesn't exist - create it first" -ForegroundColor White
    Write-Host "2. Wrong credentials - use Personal Access Token" -ForegroundColor White
    Write-Host "3. Network issue - check internet connection`n" -ForegroundColor White
    Write-Host "Try manually: git push -u origin main`n" -ForegroundColor Cyan
}

