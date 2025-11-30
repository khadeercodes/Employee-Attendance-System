# 🚨 URGENT: Set Up MongoDB Now (5 Minutes)

## You're seeing: "Database not connected. Please set up MongoDB."

This means MongoDB is not connected. Here's the **FASTEST** way to fix it:

## ✅ Option 1: MongoDB Atlas (Cloud - FREE) ⭐ RECOMMENDED

**This is the easiest - no installation needed!**

### Step-by-Step (5 minutes):

#### 1. Create Account
- Go to: **https://www.mongodb.com/cloud/atlas/register**
- Click "Try Free" or "Sign Up"
- Use Google/GitHub to sign up quickly

#### 2. Create Free Cluster
- After login, click **"Build a Database"**
- Select **"M0 FREE"** (Free tier - $0 forever)
- Choose **AWS** as provider
- Choose a **Region** (pick closest to you, e.g., `us-east-1`)
- Click **"Create"**
- Wait 2-3 minutes

#### 3. Create Database User
- Click **"Database Access"** (left menu)
- Click **"Add New Database User"**
- Authentication: **"Password"**
- Username: `attendance_user`
- Password: Create a password (e.g., `MySecurePass123!`)
- **SAVE THIS PASSWORD!**
- Click **"Add User"**

#### 4. Allow Network Access
- Click **"Network Access"** (left menu)
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** (for development)
- Click **"Confirm"**

#### 5. Get Connection String
- Click **"Database"** (left menu)
- Click **"Connect"** button on your cluster
- Choose **"Connect your application"**
- Copy the connection string (looks like):
  ```
  mongodb+srv://attendance_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

#### 6. Update Your Backend .env File

**Open:** `backend\.env`

**Replace the MONGODB_URI line with:**
```
MONGODB_URI=mongodb+srv://attendance_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
```

**Important:**
- Replace `YOUR_PASSWORD` with the password from Step 3
- Replace `cluster0.xxxxx` with your actual cluster address
- Keep `/attendance_system` (this is your database name)

**Example:**
```
MONGODB_URI=mongodb+srv://attendance_user:MySecurePass123!@cluster0.abc123.mongodb.net/attendance_system?retryWrites=true&w=majority
```

#### 7. Restart Backend Server

1. Go to the backend PowerShell window
2. Press **Ctrl+C** to stop
3. Run: `npm run dev`
4. You should see: **✅ Connected to MongoDB**

#### 8. Test Registration

Go to http://localhost:3000 and try registering - it should work!

---

## ✅ Option 2: Local MongoDB (If you prefer)

1. Download: https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service
4. Keep `MONGODB_URI=mongodb://localhost:27017/attendance_system` in `.env`
5. Restart backend

---

## 🆘 Need Help?

**Common Issues:**

1. **"Authentication failed"**
   - Check username/password in `.env`
   - Make sure password has no extra spaces
   - Special characters in password might need URL encoding

2. **"Network access denied"**
   - Go to Network Access in Atlas
   - Make sure "Allow from anywhere" is enabled

3. **Connection string format**
   - Must include `/attendance_system` at the end
   - No spaces in the connection string

---

## 📝 Quick Checklist:

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user
- [ ] Allowed network access
- [ ] Copied connection string
- [ ] Updated `backend/.env` file
- [ ] Restarted backend server
- [ ] Saw "✅ Connected to MongoDB" message

---

**Once MongoDB is connected, registration will work instantly!** 🎉

