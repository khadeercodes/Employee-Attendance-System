# Fix: Port 5000 Already in Use

## The Problem:
You're seeing: `Error: listen EADDRINUSE: address already in use :::5000`

This means another process is using port 5000.

## ✅ Quick Fix:

### Option 1: Kill Process on Port 5000 (PowerShell)
```powershell
Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force
```

### Option 2: Find and Kill Manually
```powershell
# Find what's using port 5000
netstat -ano | findstr ":5000"

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F
```

### Option 3: Use Different Port
1. Edit `backend/.env`
2. Change: `PORT=5001`
3. Edit `frontend/.env`
4. Change: `REACT_APP_API_URL=http://localhost:5001/api`
5. Restart both servers

## After Fixing:

1. Restart backend: `npm run dev`
2. Should start without errors
3. Then set up MongoDB (see START_HERE.md)

