# PowerShell Script to Push to GitHub

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  GitHub Setup & Push Script" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit
}

# Check if already a git repository
if (Test-Path .git) {
    Write-Host "✅ Git repository already initialized`n" -ForegroundColor Green
} else {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized`n" -ForegroundColor Green
}

# Add all files
Write-Host "📝 Adding files to staging..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added`n" -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
    git commit -m "Initial commit: Employee Attendance System with Neumorphism UI"
    Write-Host "✅ Commit created`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No changes to commit`n" -ForegroundColor Cyan
}

# Check remote
$remote = git remote -v
if ($remote -match "origin") {
    Write-Host "✅ Remote 'origin' already configured" -ForegroundColor Green
    Write-Host "   $remote`n" -ForegroundColor Gray
} else {
    Write-Host "`n⚠️  No remote repository configured" -ForegroundColor Yellow
    Write-Host "`nTo add your GitHub repository:" -ForegroundColor Cyan
    Write-Host "1. Go to https://github.com and create a new repository" -ForegroundColor White
    Write-Host "2. Copy the repository URL" -ForegroundColor White
    Write-Host "3. Run this command:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Yellow
    Write-Host "4. Then run: git push -u origin main`n" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Next Steps:" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "1. Create repository on GitHub.com" -ForegroundColor White
Write-Host "2. Add remote: git remote add origin YOUR_REPO_URL" -ForegroundColor White
Write-Host "3. Push: git push -u origin main" -ForegroundColor White
Write-Host "4. Follow DEPLOYMENT.md for hosting`n" -ForegroundColor White

Write-Host "📖 See GITHUB_SETUP.md for detailed instructions`n" -ForegroundColor Cyan

