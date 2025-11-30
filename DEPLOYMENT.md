# 🚀 Deployment Guide

## Step 1: Push to GitHub

### 1. Initialize Git (if not already done)
```bash
git init
```

### 2. Add all files
```bash
git add .
```

### 3. Create initial commit
```bash
git commit -m "Initial commit: Employee Attendance System"
```

### 4. Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `employee-attendance-system`
5. Make it **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

### 5. Connect and Push
```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/employee-attendance-system.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 2: Deploy Backend (Render/Railway)

### Option A: Render (Recommended - Free Tier Available)

1. **Sign up at [Render](https://render.com)**

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Backend**
   - **Name:** `attendance-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

4. **Environment Variables**
   Add these in Render dashboard:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the URL (e.g., `https://attendance-backend.onrender.com`)

### Option B: Railway

1. **Sign up at [Railway](https://railway.app)**

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Select `backend` folder
   - Add environment variables (same as Render)
   - Deploy

---

## Step 3: Deploy Frontend (Vercel - Recommended)

### Vercel Deployment (Free & Easy)

1. **Sign up at [Vercel](https://vercel.com)**

2. **Import Project**
   - Click "Add New" → "Project"
   - Import from GitHub
   - Select your repository

3. **Configure Frontend**
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

4. **Environment Variables**
   Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your actual backend URL)

5. **Deploy**
   - Click "Deploy"
   - Wait for build
   - Get your frontend URL (e.g., `https://employee-attendance.vercel.app`)

### Alternative: Netlify

1. **Sign up at [Netlify](https://netlify.com)**

2. **New Site from Git**
   - Connect GitHub
   - Select repository

3. **Build Settings**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`

4. **Environment Variables**
   - Add `REACT_APP_API_URL` with your backend URL

5. **Deploy**

---

## Step 4: Update Frontend API URL

After backend is deployed, update frontend environment variable:

1. Go to Vercel/Netlify dashboard
2. Project Settings → Environment Variables
3. Update `REACT_APP_API_URL` to your backend URL
4. Redeploy frontend

---

## Step 5: MongoDB Atlas Setup (If not done)

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create Cluster** (Free tier available)

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

4. **Network Access**
   - Add IP: `0.0.0.0/0` (allow all - for production)
   - Or add specific IPs for security

5. **Use in Backend**
   - Add connection string to backend environment variables

---

## Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed (Render/Railway)
- [ ] Backend URL copied
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Frontend environment variable updated
- [ ] MongoDB Atlas configured
- [ ] Test login/registration
- [ ] Test all features

---

## Post-Deployment

### Update CORS (if needed)
In `backend/server.js`, update CORS origin:
```javascript
origin: process.env.FRONTEND_URL || 'https://your-frontend-url.vercel.app'
```

### Security Notes
- ✅ Change JWT_SECRET to a strong random string
- ✅ Use MongoDB Atlas (not local)
- ✅ Enable HTTPS (automatic on Vercel/Render)
- ✅ Keep environment variables secret

---

## Troubleshooting

### Backend not connecting
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check environment variables

### Frontend can't reach backend
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings
- Ensure backend is running

### Build errors
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Check build logs for errors

---

## URLs After Deployment

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **API:** `https://your-backend.onrender.com/api`

---

**Your app is now live! 🎉**

