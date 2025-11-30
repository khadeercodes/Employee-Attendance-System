@echo off
echo Starting Employee Attendance System...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo Servers are starting in separate windows
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo NOTE: Backend will show MongoDB connection error until MongoDB is set up
echo See MONGODB_SETUP.md for instructions
echo.
pause

