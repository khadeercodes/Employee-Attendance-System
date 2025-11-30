# Backend Server Status

## Current Issue: Backend Not Running

The backend server needs to be started manually. Here's how:

## Quick Start Options:

### Option 1: Use the Batch File (Easiest)
1. Double-click `START_BACKEND.bat` in the project root
2. A window will open showing the server status
3. Keep this window open while using the app

### Option 2: Manual Start (PowerShell)
```powershell
cd backend
npm run dev
```

### Option 3: Start in Background
The server needs to stay running. Open a new terminal and run:
```powershell
cd backend
npm start
```

## Expected Output:

When the backend starts successfully, you should see:
```
Connected to MongoDB
Server running on port 5000
```

## Common Issues:

### 1. MongoDB Connection Error
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:** 
- MongoDB is not running
- You have 2 options:

#### Option A: Use MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a cluster (M0 - Free)
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
   ```
6. Restart backend server

#### Option B: Install Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service
4. Restart backend server

### 2. Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update `frontend/.env` to match:
  ```
  REACT_APP_API_URL=http://localhost:5001/api
  ```

### 3. Module Not Found
**Error:** `Cannot find module`

**Solution:**
```powershell
cd backend
npm install
```

## Verify Backend is Running:

1. Check if port 5000 is listening:
   ```powershell
   netstat -ano | findstr ":5000"
   ```

2. Test the health endpoint:
   ```powershell
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

3. Open in browser:
   http://localhost:5000/api/health

## Next Steps:

1. ✅ Start backend server (see options above)
2. ⚠️ Set up MongoDB (if not already done)
3. ✅ Frontend should automatically connect
4. ✅ Try registration again

---

**Important:** The backend server must stay running while you use the application. Keep the terminal window open!

