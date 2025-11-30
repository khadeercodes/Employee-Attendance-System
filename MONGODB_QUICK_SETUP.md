# 🚀 Quick MongoDB Setup (5 Minutes)

## The Problem:
You're getting "buffering timed out" because MongoDB isn't connected. The server is running, but it needs MongoDB for database operations.

## ✅ Solution: MongoDB Atlas (Cloud - FREE)

This is the easiest way - no installation needed!

### Step 1: Create MongoDB Atlas Account
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create account

### Step 2: Create Free Cluster
1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** (Free tier)
3. Select a **Cloud Provider** (AWS is fine)
4. Choose a **Region** (closest to you)
5. Click **"Create"**
6. Wait 2-3 minutes for cluster to be created

### Step 3: Create Database User
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username:** `attendance_user` (or any username)
   - **Password:** Create a strong password (save it!)
5. Click **"Add User"**

### Step 4: Allow Network Access
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or click "Add Current IP Address"
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Backend Configuration
1. Open `backend/.env` file
2. Replace the `MONGODB_URI` line with:
   ```
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
   ```
   **Important:** 
   - Replace `YOUR_USERNAME` with the username from Step 3
   - Replace `YOUR_PASSWORD` with the password from Step 3
   - Replace `cluster0.xxxxx` with your actual cluster address
   - Keep `/attendance_system` at the end (database name)

### Step 7: Restart Backend Server
1. Go to the backend PowerShell window
2. Press **Ctrl+C** to stop the server
3. Run: `npm run dev`
4. You should see: **✅ Connected to MongoDB**

### Step 8: Seed the Database (Optional)
```powershell
cd backend
npm run seed
```

This creates sample users for testing.

## ✅ Verify It's Working:

1. Check backend terminal - should show: `✅ Connected to MongoDB`
2. Try registration again at http://localhost:3000
3. It should work now! 🎉

## 🔍 Troubleshooting:

### "Authentication failed"
- Check username and password in `.env` file
- Make sure there are no extra spaces
- Password might have special characters - URL encode them

### "Network access denied"
- Go to Network Access in Atlas
- Make sure your IP is allowed (or "Allow from anywhere")

### Still timing out?
- Check the connection string format
- Make sure database name is included: `/attendance_system`
- Restart the backend server after changing `.env`

---

## Alternative: Local MongoDB

If you prefer local MongoDB:

1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service
4. Keep `MONGODB_URI=mongodb://localhost:27017/attendance_system` in `.env`
5. Restart backend

---

**Need help?** Check the backend terminal for specific error messages!

