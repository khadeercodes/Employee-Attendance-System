# PowerShell script to create .env files

# Backend .env
$backendEnv = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
NODE_ENV=development
"@

$backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8

# Frontend .env
$frontendEnv = @"
REACT_APP_API_URL=http://localhost:5000/api
"@

$frontendEnv | Out-File -FilePath "frontend\.env" -Encoding utf8

Write-Host ".env files created successfully!" -ForegroundColor Green

