# Quick Start Guide

## ✅ What's Been Set Up:

1. ✅ Backend dependencies installed
2. ✅ Frontend dependencies installed  
3. ✅ .env files created for both backend and frontend
4. ✅ Backend server starting on port 5000
5. ✅ Frontend server starting on port 3000

## ⚠️ Important: MongoDB Setup Required

**MongoDB is not currently running.** You need to set it up before the application will work.

### Quick MongoDB Setup Options:

#### Option A: MongoDB Atlas (Easiest - 5 minutes)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env` with your Atlas connection string
5. Run `npm run seed` in backend folder

#### Option B: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Run `npm run seed` in backend folder

See `MONGODB_SETUP.md` for detailed instructions.

## 🚀 Current Status:

- **Backend:** Starting on http://localhost:5000 (will show MongoDB connection error until MongoDB is set up)
- **Frontend:** Starting on http://localhost:3000 (will open automatically in browser)

## 📝 Next Steps:

1. **Set up MongoDB** (see MONGODB_SETUP.md)
2. **Seed the database:**
   ```powershell
   cd backend
   npm run seed
   ```
3. **Restart backend server** (if needed)
4. **Access the application:**
   - Open http://localhost:3000
   - Login with:
     - Manager: manager@example.com / manager123
     - Employee: john@example.com / employee123

## 🔍 Check Server Status:

### Backend:
- Check terminal for "Connected to MongoDB" message
- If you see connection errors, MongoDB needs to be set up

### Frontend:
- Should automatically open in browser
- If not, manually go to http://localhost:3000

## 🛠️ Commands:

```powershell
# Backend (in backend folder)
npm run dev          # Start development server
npm run seed         # Seed database with sample data

# Frontend (in frontend folder)  
npm start            # Start React development server
```

## 📚 Files Created:

- `backend/.env` - Backend environment variables
- `frontend/.env` - Frontend environment variables
- `MONGODB_SETUP.md` - Detailed MongoDB setup guide
- `setup-env.ps1` - Script to recreate .env files if needed

---

**Note:** Both servers are running in the background. Check the terminal windows for any errors or status messages.

