# Quick Fix: Backend Server Not Running

## The Problem:
The backend server won't start because it requires MongoDB to be connected first.

## Solution: Start Backend Server

### Step 1: Open a New Terminal/PowerShell Window

### Step 2: Navigate to Backend Folder
```powershell
cd "C:\Users\NARENDRA KOLLIBOINA\Desktop\task1\backend"
```

### Step 3: Start the Server
```powershell
npm run dev
```

## What You'll See:

### If MongoDB is NOT running:
```
MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED
```

**This means you need MongoDB. Choose one:**

### Option A: MongoDB Atlas (Cloud - 5 minutes) ⭐ RECOMMENDED

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Edit `backend/.env` file:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
   ```
   (Replace YOUR_USERNAME and YOUR_PASSWORD with your actual credentials)
7. Restart the server: `npm run dev`

### Option B: Install Local MongoDB

1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service
4. Restart the server: `npm run dev`

### If MongoDB IS running:
```
Connected to MongoDB
Server running on port 5000
```

✅ **Server is now running!**

## Step 4: Test the Connection

Open in browser: http://localhost:5000/api/health

Should show: `{"status":"OK","message":"Server is running"}`

## Step 5: Try Registration Again

Now go back to http://localhost:3000 and try registering. It should work!

---

## Quick Commands:

```powershell
# Start backend
cd backend
npm run dev

# Check if running
curl http://localhost:5000/api/health

# Or use the batch file
# Double-click: START_BACKEND.bat
```

---

**Keep the backend terminal window open while using the app!**

