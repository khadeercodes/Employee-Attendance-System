# 🚀 Start Servers - Quick Guide

## Problem: "ERR_CONNECTION_REFUSED"

This means the frontend server (port 3000) is not running.

## ✅ Solution: Start Both Servers

### STEP 1: Start Backend Server

1. **Open a NEW PowerShell window**
2. Navigate to backend:
   ```powershell
   cd "C:\Users\NARENDRA KOLLIBOINA\Desktop\task1\backend"
   ```
3. Start server:
   ```powershell
   npm run dev
   ```
4. **Keep this window open!**
5. Wait for: `✅ Connected to MongoDB` (once cluster is ready)

### STEP 2: Start Frontend Server

1. **Open ANOTHER NEW PowerShell window**
2. Navigate to frontend:
   ```powershell
   cd "C:\Users\NARENDRA KOLLIBOINA\Desktop\task1\frontend"
   ```
3. Start server:
   ```powershell
   npm start
   ```
4. **Keep this window open!**
5. Browser should open automatically at http://localhost:3000

---

## ✅ Quick Start (Using Batch File)

**Or double-click:** `START_SERVERS.bat` in the project folder

This will start both servers in separate windows.

---

## 📊 Check Server Status:

### Backend (Port 5000):
- Open: http://localhost:5000/api/health
- Should show: `{"status":"OK","message":"Server is running","database":"Connected"}`

### Frontend (Port 3000):
- Open: http://localhost:3000
- Should show the login page

---

## ⚠️ Important:

- **Keep both PowerShell windows open** while using the app
- Backend must be running for frontend to work
- Frontend needs backend to be running

---

## 🆘 Troubleshooting:

### "Port already in use"
- Kill the process: `Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force`
- Or use different port

### "Cannot find module"
- Run: `npm install` in both frontend and backend folders

### Frontend shows connection errors
- Make sure backend is running on port 5000
- Check `frontend/.env` has: `REACT_APP_API_URL=http://localhost:5000/api`

---

**Both servers must be running for the app to work!**

