# 🚀 How to Start the Application

## Current Issue: Backend Server Not Running

The error "Unable to connect to server" means the backend isn't running.

## ✅ Solution: Start the Backend Server

### Method 1: Using Batch File (Easiest)
1. **Double-click** `START_BACKEND.bat` in the project folder
2. A window will open - **keep it open**
3. Wait for: `Server running on port 5000`

### Method 2: Manual Start
1. **Open PowerShell** (new window)
2. **Navigate to backend:**
   ```powershell
   cd "C:\Users\NARENDRA KOLLIBOINA\Desktop\task1\backend"
   ```
3. **Start server:**
   ```powershell
   npm run dev
   ```
4. **Keep this window open!**

## ⚠️ MongoDB Required

The backend needs MongoDB. You'll see one of these:

### ✅ If MongoDB is connected:
```
Connected to MongoDB
Server running on port 5000
```
**Great! Server is running.**

### ❌ If MongoDB is NOT connected:
```
MongoDB connection error: connect ECONNREFUSED
```

**You need to set up MongoDB:**

#### Quick Option: MongoDB Atlas (Cloud - Free)
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0)
4. Get connection string
5. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
   ```
6. Restart backend: `npm run dev`

See `QUICK_FIX.md` for detailed MongoDB setup.

## ✅ Verify Backend is Running

1. **Check in browser:** http://localhost:5000/api/health
   - Should show: `{"status":"OK","message":"Server is running"}`

2. **Or test in PowerShell:**
   ```powershell
   curl http://localhost:5000/api/health
   ```

## 🎯 Once Backend is Running:

1. ✅ Backend: http://localhost:5000 (running)
2. ✅ Frontend: http://localhost:3000 (should already be running)
3. ✅ Try registration again - it should work!

## 📝 Summary:

```
┌─────────────────────────────────────┐
│  1. Start Backend Server            │
│     (see methods above)             │
│                                     │
│  2. Set up MongoDB                  │
│     (if not already done)           │
│                                     │
│  3. Backend running on :5000       │
│     Frontend running on :3000      │
│                                     │
│  4. Register/Login should work!     │
└─────────────────────────────────────┘
```

---

**Keep the backend terminal window open while using the app!**

