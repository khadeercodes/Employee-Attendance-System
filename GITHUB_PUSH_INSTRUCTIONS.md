# 📤 Push to GitHub - Step by Step

## Method 1: Using Interactive Script (Easiest)

### Step 1: Run the Script
```powershell
.\PUSH_TO_GITHUB_INTERACTIVE.ps1
```

### Step 2: Enter Your Details
The script will ask for:
- **GitHub Username:** Your GitHub username
- **Repository Name:** Name for your repo (e.g., `employee-attendance-system`)

### Step 3: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: (use the name you entered)
3. Choose **Public** or **Private**
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**

### Step 4: Push
The script will automatically push your code!

---

## Method 2: Manual Push

### Step 1: Create Repository on GitHub
1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. Name: `employee-attendance-system`
4. Choose Public/Private
5. **DO NOT** initialize with README
6. Click **"Create repository"**

### Step 2: Copy Repository URL
After creating, GitHub will show you the URL:
```
https://github.com/YOUR_USERNAME/employee-attendance-system.git
```

### Step 3: Run These Commands
```powershell
# Initialize git (if not done)
git init

# Add all files
git add .

# Create commit
git commit -m "Employee Attendance System - Initial commit"

# Add remote (replace with YOUR details)
git remote add origin https://github.com/YOUR_USERNAME/employee-attendance-system.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Authentication
When pushing, you'll be asked for credentials:
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (not your password)

**To create Personal Access Token:**
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Select scopes: `repo` (full control)
5. Generate and **copy the token**
6. Use this token as password when pushing

---

## Method 3: Using GitHub Desktop (Easiest for Beginners)

1. **Download:** https://desktop.github.com
2. **Install and sign in** with your GitHub account
3. **File** → **Add Local Repository**
4. Select your project folder: `C:\Users\NARENDRA KOLLIBOINA\Desktop\task1`
5. Click **"Publish repository"**
6. Enter repository name
7. Choose Public/Private
8. Click **"Publish Repository"**

Done! ✅

---

## Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify your username is correct

### "Authentication failed"
- Use Personal Access Token instead of password
- Make sure token has `repo` scope
- Token expires - generate a new one if needed

### "Remote origin already exists"
```powershell
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### "Permission denied"
- Check your GitHub username is correct
- Verify you have access to the repository
- Try using SSH instead of HTTPS

---

## After Pushing

Once code is on GitHub:
1. ✅ Verify files are on GitHub.com
2. 📖 Read `DEPLOYMENT.md` for hosting
3. 🚀 Deploy backend on Render.com
4. 🎨 Deploy frontend on Vercel.com

---

**Need help? Run the interactive script: `.\PUSH_TO_GITHUB_INTERACTIVE.ps1`**

