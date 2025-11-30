# Quick Setup Guide

## Step 1: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# Create .env file with these contents:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Make sure MongoDB is running on your system

5. Seed the database:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on: http://localhost:5000

## Step 2: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# Create .env file with these contents:
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend:
```bash
npm start
```

Frontend will run on: http://localhost:3000

## Step 3: Login

Use these credentials after seeding:

**Manager:**
- Email: manager@example.com
- Password: manager123

**Employee:**
- Email: john@example.com
- Password: employee123

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is installed and running
- Check if the connection string in `.env` is correct
- For MongoDB Atlas, use the connection string from your cluster

### Port Already in Use
- Change the PORT in backend `.env` file
- Update `REACT_APP_API_URL` in frontend `.env` accordingly

### CORS Errors
- Make sure backend is running before starting frontend
- Check that `REACT_APP_API_URL` points to the correct backend URL

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

