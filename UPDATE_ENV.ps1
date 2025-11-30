# PowerShell script to update MongoDB connection string
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Connection String Setup" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Please follow these steps:" -ForegroundColor White
Write-Host ""
Write-Host "1. Go to: https://www.mongodb.com/cloud/atlas/register" -ForegroundColor Green
Write-Host "2. Sign up and create a FREE cluster (M0)" -ForegroundColor Green
Write-Host "3. Create database user and allow network access" -ForegroundColor Green
Write-Host "4. Get your connection string" -ForegroundColor Green
Write-Host ""
Write-Host "Your connection string should look like:" -ForegroundColor Yellow
Write-Host "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority" -ForegroundColor Gray
Write-Host ""

$connectionString = Read-Host "Paste your MongoDB Atlas connection string here"

if ($connectionString) {
    # Read current .env file
    $envContent = Get-Content "backend\.env" -ErrorAction SilentlyContinue
    
    if ($envContent) {
        # Replace MONGODB_URI line
        $newContent = $envContent | ForEach-Object {
            if ($_ -match "^MONGODB_URI=") {
                "MONGODB_URI=$connectionString"
            } else {
                $_
            }
        }
        
        # Write updated content
        $newContent | Set-Content "backend\.env"
        
        Write-Host ""
        Write-Host "✅ Updated backend/.env file!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next step: Restart your backend server:" -ForegroundColor Yellow
        Write-Host "1. Go to backend PowerShell window" -ForegroundColor Gray
        Write-Host "2. Press Ctrl+C to stop" -ForegroundColor Gray
        Write-Host "3. Run: npm run dev" -ForegroundColor Gray
        Write-Host ""
    } else {
        Write-Host "❌ Could not read backend/.env file" -ForegroundColor Red
    }
} else {
    Write-Host "❌ No connection string provided" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

