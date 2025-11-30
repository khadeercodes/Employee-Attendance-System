# 🚀 Start Deployment Here!

## Quick Start - 3 Steps

### Step 1: Push to GitHub

**Option A: Use PowerShell Script**
```powershell
# Run in project root
.\PUSH_TO_GITHUB.ps1
```

**Option B: Manual Commands**
```powershell
git init
git add .
git commit -m "Employee Attendance System"
# Then create repo on GitHub and:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

---

### Step 2: Deploy Backend (5 minutes)

1. Go to **[render.com](https://render.com)** → Sign up
2. **New +** → **Web Service**
3. Connect GitHub → Select repo
4. **Settings:**
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `node server.js`
5. **Add Environment Variables:**
   - `MONGODB_URI` (from MongoDB Atlas)
   - `JWT_SECRET` (any random string)
   - `FRONTEND_URL` (will add after frontend deploy)
6. **Deploy** → Copy URL

---

### Step 3: Deploy Frontend (3 minutes)

1. Go to **[vercel.com](https://vercel.com)** → Sign up
2. **Add New** → **Project**
3. Import from GitHub → Select repo
4. **Settings:**
   - Root Directory: `frontend`
   - Build: `npm run build`
5. **Add Environment Variable:**
   - `REACT_APP_API_URL` = your backend URL + `/api`
6. **Deploy** → Copy URL

---

### Step 4: Update Backend

1. Go back to Render
2. Update `FRONTEND_URL` = your Vercel URL
3. Redeploy

---

## 📚 Detailed Guides

- **GitHub Setup:** See `GITHUB_SETUP.md`
- **Full Deployment:** See `DEPLOYMENT.md`
- **Quick Deploy:** See `QUICK_DEPLOY.md`

---

## 🎯 What You'll Get

- ✅ Frontend: `https://your-app.vercel.app`
- ✅ Backend: `https://your-backend.onrender.com`
- ✅ MongoDB: Free Atlas cluster

**All FREE! 🎉**

---

## ⚡ Need Help?

1. Check `DEPLOYMENT.md` for detailed steps
2. Check `QUICK_DEPLOY.md` for quick reference
3. Verify environment variables are set correctly
4. Check MongoDB Atlas connection string

---

**Ready? Start with Step 1! 🚀**

