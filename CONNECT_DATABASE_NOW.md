# 🔗 Connect Database - Step by Step

## You need MongoDB Atlas (Cloud Database - FREE)

**This takes 5 minutes. Follow these exact steps:**

---

## 📋 STEP 1: Go to MongoDB Atlas

**Click this link or copy to browser:**
```
https://www.mongodb.com/cloud/atlas/register
```

---

## 📋 STEP 2: Sign Up

1. Click **"Try Free"** or **"Sign Up"**
2. Use **Google** or **GitHub** for faster signup
3. Complete registration

---

## 📋 STEP 3: Create Free Database

1. After login, click **"Build a Database"**
2. Select **"M0 FREE"** (Free forever - $0)
3. Provider: Choose **AWS**
4. Region: Choose closest to you (e.g., `N. Virginia`)
5. Click **"Create"**
6. ⏳ Wait 2-3 minutes for cluster to be created

---

## 📋 STEP 4: Create Database User

1. Click **"Database Access"** (left sidebar menu)
2. Click **"Add New Database User"** button
3. Authentication Method: **"Password"**
4. Username: Type `attendance_user`
5. Password: **Create a password** (e.g., `MyPass123!`)
   - **⚠️ SAVE THIS PASSWORD - You'll need it!**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"** button

---

## 📋 STEP 5: Allow Network Access

1. Click **"Network Access"** (left sidebar menu)
2. Click **"Add IP Address"** button
3. Click **"Allow Access from Anywhere"** 
   - This adds `0.0.0.0/0` (allows all IPs)
4. Click **"Confirm"** button

---

## 📋 STEP 6: Get Connection String

1. Click **"Database"** (left sidebar menu)
2. Click **"Connect"** button (on your cluster card)
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://attendance_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

---

## 📋 STEP 7: Update Your .env File

### Option A: Manual Edit

1. Open file: `backend\.env`
2. Find this line:
   ```
   MONGODB_URI=mongodb://localhost:27017/attendance_system
   ```
3. Replace it with your connection string, but ADD `/attendance_system` before the `?`:
   ```
   MONGODB_URI=mongodb+srv://attendance_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
   ```
   
   **Important:**
   - Replace `YOUR_PASSWORD` with the password from Step 4
   - Replace `cluster0.xxxxx` with your actual cluster address
   - Keep `/attendance_system` (this is your database name)

### Option B: Use Helper Script

1. Run this in PowerShell:
   ```powershell
   powershell -ExecutionPolicy Bypass -File UPDATE_ENV.ps1
   ```
2. Paste your connection string when asked
3. It will update the file automatically

---

## 📋 STEP 8: Restart Backend Server

1. Go to your **backend PowerShell window**
2. Press **Ctrl+C** to stop the server
3. Run: `npm run dev`
4. You should see: **✅ Connected to MongoDB**

---

## 📋 STEP 9: Test It!

1. Go to http://localhost:3000
2. Try to register
3. It should work! 🎉

---

## ✅ Example Connection String

**Before:**
```
MONGODB_URI=mongodb://localhost:27017/attendance_system
```

**After (with your MongoDB Atlas):**
```
MONGODB_URI=mongodb+srv://attendance_user:MyPass123!@cluster0.abc123.mongodb.net/attendance_system?retryWrites=true&w=majority
```

**Note:** Replace `MyPass123!` and `cluster0.abc123` with YOUR actual values!

---

## 🆘 Troubleshooting

### "Authentication failed"
- Check username and password in `.env`
- Make sure password matches what you created in Step 4
- No extra spaces in connection string

### "Network access denied"
- Go back to "Network Access" in Atlas
- Make sure "Allow Access from Anywhere" is enabled

### Still not working?
- Check backend terminal for specific error messages
- Make sure connection string includes `/attendance_system` before `?`
- Restart backend after changing `.env`

---

## 📞 Need Help?

If you get stuck:
1. Check backend terminal for error messages
2. Verify connection string format
3. Make sure all steps above are completed

---

**Once you see "✅ Connected to MongoDB" in the backend terminal, your database is connected!** 🚀

