# 🚀 Quick Deployment Guide

## Step-by-Step Deployment

### 1️⃣ Push to GitHub

```bash
# In project root directory
git init
git add .
git commit -m "Employee Attendance System - Ready for deployment"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/employee-attendance-system.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Deploy Backend (Render - Free)

1. **Go to [render.com](https://render.com)** and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select your repository
5. **Settings:**
   - **Name:** `attendance-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
6. **Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_very_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
7. Click **"Create Web Service"**
8. **Copy the URL** (e.g., `https://attendance-backend.onrender.com`)

---

### 3️⃣ Deploy Frontend (Vercel - Free)

1. **Go to [vercel.com](https://vercel.com)** and sign up
2. Click **"Add New"** → **"Project"**
3. Import from GitHub
4. Select your repository
5. **Settings:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
6. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://attendance-backend.onrender.com/api
   ```
   (Use your actual backend URL from Step 2)
7. Click **"Deploy"**
8. **Copy the URL** (e.g., `https://employee-attendance.vercel.app`)

---

### 4️⃣ Update Backend CORS

1. Go back to Render dashboard
2. Update environment variable:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
3. Redeploy backend

---

### 5️⃣ MongoDB Atlas Setup

1. **Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**
2. Sign up (Free tier available)
3. Create a cluster (Free M0)
4. **Database Access:**
   - Create database user
   - Set password (save it!)
5. **Network Access:**
   - Add IP: `0.0.0.0/0` (allow all)
6. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `attendance_system`
7. **Add to Render:**
   - Update `MONGODB_URI` in Render environment variables

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Atlas configured
- [ ] Environment variables set
- [ ] CORS updated
- [ ] Test login/registration
- [ ] Test all features

---

## 🔗 Your Live URLs

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **API:** `https://your-backend.onrender.com/api`

---

## 🎉 Done!

Your Employee Attendance System is now live on the internet!

**Note:** Free tiers may have cold starts (first request takes longer). This is normal.

