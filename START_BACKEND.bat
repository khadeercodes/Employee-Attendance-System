@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
echo.
cd /d %~dp0backend
echo Current directory: %CD%
echo.
echo Checking Node.js...
node --version
echo.
echo Starting server...
echo.
echo NOTE: If you see MongoDB connection errors, you need to:
echo 1. Install MongoDB, OR
echo 2. Use MongoDB Atlas (cloud) and update .env file
echo.
npm run dev
pause

