# MongoDB Setup Guide

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation:

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows version
   - Download and run the installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation:**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   
   # Start MongoDB service if not running
   Start-Service -Name MongoDB
   ```

4. **Test Connection:**
   ```powershell
   # Open MongoDB shell
   mongosh
   ```

5. **Update .env file:**
   The connection string should be:
   ```
   MONGODB_URI=mongodb://localhost:27017/attendance_system
   ```

## Option 2: Use MongoDB Atlas (Cloud - Free Tier Available)

1. **Create MongoDB Atlas Account:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Cluster:**
   - Choose free tier (M0)
   - Select a region close to you
   - Wait for cluster to be created (2-3 minutes)

3. **Configure Database Access:**
   - Go to "Database Access"
   - Create a database user
   - Set username and password
   - Save credentials

4. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `attendance_system`

6. **Update backend/.env:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/attendance_system?retryWrites=true&w=majority
   ```

## Option 3: Use Docker (If Docker is Installed)

```powershell
# Run MongoDB in Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps
```

## After MongoDB is Running:

1. **Seed the database:**
   ```powershell
   cd backend
   npm run seed
   ```

2. **Restart the backend server:**
   - Stop the current server (Ctrl+C)
   - Run: `npm run dev`

## Verify Everything is Working:

1. Backend should show: "Connected to MongoDB"
2. Frontend should open at: http://localhost:3000
3. You can login with:
   - Manager: manager@example.com / manager123
   - Employee: john@example.com / employee123

## Troubleshooting:

### MongoDB Connection Error:
- Make sure MongoDB service is running
- Check if port 27017 is not blocked by firewall
- Verify connection string in .env file

### Port Already in Use:
- Change PORT in backend/.env
- Update REACT_APP_API_URL in frontend/.env

### Cannot Connect to MongoDB:
- Check MongoDB service status
- Verify connection string
- Check firewall settings
- For Atlas: Verify IP whitelist

