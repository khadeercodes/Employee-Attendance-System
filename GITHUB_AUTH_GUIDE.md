# 🔐 GitHub Authentication Guide

## Important: GitHub Password Authentication is Disabled

GitHub **no longer accepts passwords** for HTTPS authentication. You must use a **Personal Access Token** instead.

---

## ✅ Step-by-Step: Create Personal Access Token

### 1. Go to GitHub Settings
- Visit: https://github.com/settings/tokens
- Or: GitHub → Your Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

### 2. Generate New Token
- Click **"Generate new token"**
- Select **"Generate new token (classic)"**

### 3. Configure Token
- **Note:** `attendance-system-push` (or any name you like)
- **Expiration:** Choose 90 days, 1 year, or No expiration
- **Select scopes:** Check **`repo`** (this gives full control of private repositories)

### 4. Generate and Copy
- Click **"Generate token"**
- **IMPORTANT:** Copy the token immediately! You won't see it again.
- It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 5. Use Token as Password
- When Git asks for password, paste the token
- Username: `khadeercodes`
- Password: `[paste your token here]`

---

## 🚀 Quick Push Steps

### Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `employee-attendance-system`
3. Choose Public or Private
4. **DO NOT** check "Initialize with README"
5. Click "Create repository"

### Step 2: Run Push Script
```powershell
.\PUSH_WITH_CREDENTIALS.ps1
```

### Step 3: When Prompted
- **Username:** `khadeercodes`
- **Password:** Paste your Personal Access Token

---

## 🔄 Alternative: Use GitHub Desktop

If you prefer a GUI:

1. **Download:** https://desktop.github.com
2. **Sign in** with your GitHub account
3. **File** → **Add Local Repository**
4. Select: `C:\Users\NARENDRA KOLLIBOINA\Desktop\task1`
5. Click **"Publish repository"**
6. Enter name: `employee-attendance-system`
7. Choose Public/Private
8. Click **"Publish Repository"**

No tokens needed! ✅

---

## 📝 Manual Push Commands

If you prefer to do it manually:

```powershell
# Configure Git
git config user.name "khadeercodes"
git config user.email "khadeershaik.cse@gmail.com"

# Initialize (if needed)
git init
git add .
git commit -m "Employee Attendance System"

# Add remote
git remote add origin https://github.com/khadeercodes/employee-attendance-system.git

# Push (will ask for credentials)
git branch -M main
git push -u origin main
```

When asked for password, use your **Personal Access Token**.

---

## 🔒 Security Tips

1. ✅ **Never share your token** publicly
2. ✅ **Don't commit tokens** to Git
3. ✅ **Use token expiration** for security
4. ✅ **Revoke old tokens** if compromised
5. ✅ **Use different tokens** for different projects

---

## ❓ Troubleshooting

### "Authentication failed"
- Make sure you're using a **token**, not password
- Check token has `repo` scope
- Verify token hasn't expired

### "Repository not found"
- Create repository on GitHub first
- Check repository name matches exactly
- Verify username is correct

### "Permission denied"
- Check token has correct permissions
- Verify you have access to the repository
- Try generating a new token

---

## 🎯 After Successful Push

Once code is on GitHub:
1. ✅ Verify: https://github.com/khadeercodes/employee-attendance-system
2. 📖 Read `DEPLOYMENT.md` for hosting
3. 🚀 Deploy on Render/Vercel

---

**Ready? Run `.\PUSH_WITH_CREDENTIALS.ps1` and follow the prompts!**

