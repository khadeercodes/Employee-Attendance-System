# Employee Attendance System

Hey there! This is an Employee Attendance Management System I built from scratch. It's a full-stack web application that helps companies track employee attendance, manage check-ins/check-outs, and generate reports.

I built this using React for the frontend and Node.js with Express for the backend. The UI uses a neumorphism design (soft shadows, clean look) that I really like. It's fully functional and ready to use.

### Application Features

- **Login & Registration Pages** - Clean authentication interface with neumorphism design
- **Employee Dashboard** - Personal attendance tracking with charts and statistics
- **Manager Dashboard** - Comprehensive team overview with analytics
- **Attendance Management** - Easy check-in/check-out functionality
- **Reports & Analytics** - Detailed attendance reports with export capabilities
- **Team Calendar View** - Visual calendar representation of team attendance

Visit the live application to see the UI in action: [https://zippy-licorice-414082.netlify.app](https://zippy-licorice-414082.netlify.app)

---

## What It Does

### For Employees
- Register and login to your account
- Check in and check out daily
- See your attendance history in a calendar view
- View monthly stats (how many days present, absent, late)
- Check your dashboard with charts and summaries
- Update your profile

### For Managers
- Login to manager account
- View all employees' attendance records
- Filter by employee, date, or status
- See team attendance summaries
- Export reports to CSV
- View department-wise analytics
- Check weekly trends and patterns

## Tech Stack

I used these technologies:

**Frontend:**
- React 18.2.0
- Redux Toolkit for state management
- React Router for navigation
- Recharts for data visualization
- Axios for API calls

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password security

## Getting Started

### What You Need
- Node.js installed (version 14 or higher)
- MongoDB (you can use MongoDB Atlas free tier - that's what I did)
- npm (comes with Node.js)

### Backend Setup

1. Go to the backend folder:
```bash
cd backend
```

2. Install all the packages:
```bash
npm install
```

3. Create a `.env` file. You can copy the example:
```bash
# On Windows PowerShell
Copy-Item .env.example .env
```

4. Open the `.env` file and add your MongoDB connection string. If you're using MongoDB Atlas (free), paste your connection string here:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=make_this_a_random_string
JWT_EXPIRE=7d
NODE_ENV=development
```

5. (Optional) Add some sample data:
```bash
npm run seed
```

6. Start the server:
```bash
node server.js
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and go to the frontend folder:
```bash
cd frontend
```

2. Install packages:
```bash
npm install
```

3. Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Default Login Credentials

After running the seed script, you can login with these credentials:

### Manager Account

**Email:** `manager@example.com`  
**Password:** `manager123`

**Details:**
- Name: Manager User
- Employee ID: MGR001
- Department: Management
- Role: Manager

### Employee Accounts

You can use any of these employee accounts:

**Employee 1:**
- Email: `john@example.com`
- Password: `employee123`
- Name: John Doe
- Employee ID: EMP001
- Department: Engineering

**Employee 2:**
- Email: `jane@example.com`
- Password: `employee123`
- Name: Jane Smith
- Employee ID: EMP002
- Department: Engineering

**Employee 3:**
- Email: `bob@example.com`
- Password: `employee123`
- Name: Bob Johnson
- Employee ID: EMP003
- Department: Sales

**Employee 4:**
- Email: `alice@example.com`
- Password: `employee123`
- Name: Alice Williams
- Employee ID: EMP004
- Department: Marketing

**Employee 5:**
- Email: `charlie@example.com`
- Password: `employee123`
- Name: Charlie Brown
- Employee ID: EMP005
- Department: Engineering

**Note:** All employees use the same password (`employee123`) for easy testing. You can also register new accounts through the registration page.

## Project Structure

The code is organized like this:

```
├── backend/          # Node.js server
│   ├── controllers/ # Business logic
│   ├── models/      # Database schemas
│   ├── routes/      # API endpoints
│   └── server.js    # Main server file
│
└── frontend/         # React app
    ├── src/
    │   ├── pages/    # All the pages (Login, Dashboard, etc.)
    │   ├── store/    # Redux store
    │   └── utils/    # Helper functions
    └── public/       # Static files
```

## API Endpoints

Here are the main API routes:

**Auth:**
- POST `/api/auth/register` - Sign up
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user info

**Attendance:**
- POST `/api/attendance/checkin` - Check in
- POST `/api/attendance/checkout` - Check out
- GET `/api/attendance/my-history` - My attendance history
- GET `/api/attendance/all` - All employees (manager only)

**Dashboard:**
- GET `/api/dashboard/employee` - Employee dashboard data
- GET `/api/dashboard/manager` - Manager dashboard data

## Features I'm Proud Of

- **Clean UI**: Used neumorphism design - soft shadows, modern look
- **Real-time Updates**: Dashboard updates when you check in/out
- **Charts & Graphs**: Visual representation of attendance data
- **Role-based Access**: Employees and managers see different things
- **Secure**: Passwords are hashed, JWT tokens for auth
- **Responsive**: Works on desktop and mobile

## Deployment

I deployed this on:
- **Backend**: Render.com (free tier)
- **Frontend**: Vercel.com (free tier)
- **Database**: MongoDB Atlas (free tier)

Check the `DEPLOYMENT.md` file for step-by-step instructions.

## Issues I Faced (and Fixed)

- MongoDB connection issues - fixed by using MongoDB Atlas
- CORS errors - fixed by configuring Express properly
- React hooks errors - fixed by following React rules
- Port conflicts - added error handling

## Future Improvements

Things I might add later:
- Email notifications
- Leave management
- Shift scheduling
- Mobile app
- More detailed reports

## License

This project is open source. Feel free to use it, modify it, or learn from it.

## Contact

**Developer Information:**
- **Name:** Shaik Khadeer
- **College:** Rise Krishna Sai Gandhi Group of Institutions
- **Contact Number:** +91 7981961646

If you have questions or find bugs, feel free to open an issue on GitHub.

---

**Note**: Make sure to change the JWT_SECRET to something secure before deploying to production. Also, use a strong MongoDB connection string and keep it safe.

Thanks for checking out my project! 🚀
