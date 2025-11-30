# 📦 GitHub Setup Instructions

## Quick Setup Commands

### 1. Initialize Git Repository
```bash
# Navigate to project root
cd C:\Users\NARENDRA KOLLIBOINA\Desktop\task1

# Initialize git (if not already done)
git init

# Check status
git status
```

### 2. Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository name: `employee-attendance-system`
4. Description: `Full-stack Employee Attendance Management System`
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README"
7. Click **"Create repository"**

### 3. Connect and Push

```bash
# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Employee Attendance System with Neumorphism UI"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/employee-attendance-system.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### 4. If You Get Authentication Error

**Option A: Use Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Copy token
4. Use token as password when pushing

**Option B: Use GitHub Desktop**
1. Download [GitHub Desktop](https://desktop.github.com)
2. Sign in
3. File → Add Local Repository
4. Select your project folder
5. Publish repository

---

## Future Updates

After making changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push
git push
```

---

## Repository Structure

Your GitHub repo will have:
```
employee-attendance-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── .gitignore
├── README.md
└── DEPLOYMENT.md
```

---

**Ready to push! 🚀**

