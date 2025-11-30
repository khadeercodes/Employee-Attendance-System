# Employee Attendance System

A comprehensive full-stack Employee Attendance Management System built with React, Redux Toolkit, Node.js, Express, and MongoDB.

## 🚀 Features

### Employee Features
- ✅ User Registration and Login
- ✅ Mark Attendance (Check In / Check Out)
- ✅ View Attendance History (Calendar + Table View)
- ✅ Monthly Summary (Present/Absent/Late days)
- ✅ Dashboard with Statistics
- ✅ Profile Management

### Manager Features
- ✅ Login
- ✅ View All Employees Attendance
- ✅ Filter by Employee, Date, Status
- ✅ Team Attendance Summary
- ✅ Export Attendance Reports (CSV)
- ✅ Dashboard with Team Statistics
- ✅ Team Calendar View
- ✅ Weekly Attendance Trends
- ✅ Department-wise Analytics

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0
- **Redux Toolkit** 2.0.1
- **React Router** 6.20.1
- **Recharts** 2.10.3 (for charts and graphs)
- **React Calendar** 4.6.0
- **Axios** 1.6.2

### Backend
- **Node.js**
- **Express** 4.18.2
- **MongoDB** with Mongoose 8.0.3
- **JWT** (JSON Web Tokens) for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## 📁 Project Structure

```
task1/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── attendanceController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Attendance.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── attendance.js
│   │   └── dashboard.js
│   ├── scripts/
│   │   └── seed.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout/
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   ├── Employee/
│   │   │   └── Manager/
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── store.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
# or
mongod
```

6. Seed the database with sample data:
```bash
npm run seed
```

7. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ('employee' | 'manager'),
  employeeId: String (unique),
  department: String,
  createdAt: Date
}
```

### Attendance Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  date: Date,
  checkInTime: Date,
  checkOutTime: Date,
  status: String ('present' | 'absent' | 'late' | 'half-day'),
  totalHours: Number,
  createdAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Employee Attendance
- `POST /api/attendance/checkin` - Check in (Protected, Employee only)
- `POST /api/attendance/checkout` - Check out (Protected, Employee only)
- `GET /api/attendance/my-history` - Get my attendance history (Protected, Employee only)
- `GET /api/attendance/my-summary` - Get monthly summary (Protected, Employee only)
- `GET /api/attendance/today` - Get today's status (Protected, Employee only)

### Manager Attendance
- `GET /api/attendance/all` - Get all employees attendance (Protected, Manager only)
- `GET /api/attendance/employee/:id` - Get specific employee attendance (Protected, Manager only)
- `GET /api/attendance/summary` - Get team summary (Protected, Manager only)
- `GET /api/attendance/export` - Export attendance to CSV (Protected, Manager only)
- `GET /api/attendance/today-status` - Get today's status for all employees (Protected, Manager only)

### Dashboard
- `GET /api/dashboard/employee` - Get employee dashboard stats (Protected, Employee only)
- `GET /api/dashboard/manager` - Get manager dashboard stats (Protected, Manager only)

## 👤 Default Login Credentials

After running the seed script, you can use these credentials:

### Manager
- **Email:** manager@example.com
- **Password:** manager123

### Employees
- **Email:** john@example.com
- **Password:** employee123

- **Email:** jane@example.com
- **Password:** employee123

- **Email:** bob@example.com
- **Password:** employee123

- **Email:** alice@example.com
- **Password:** employee123

- **Email:** charlie@example.com
- **Password:** employee123

## 🎨 Screenshots

### Employee Dashboard
- Today's attendance status
- Monthly statistics (Present/Absent/Late)
- Recent attendance chart
- Quick check-in/check-out

### Manager Dashboard
- Total employees count
- Today's attendance overview
- Weekly attendance trends
- Department-wise analytics
- Absent employees list

### Attendance History
- Calendar view with color coding
- Table view with detailed records
- Monthly summary statistics
- Filter by month and year

### Reports
- Filter by date range and employee
- Export to CSV functionality
- Detailed attendance table

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- Input validation with express-validator

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Update `REACT_APP_API_URL` in `.env` to point to your backend
2. Build the project: `npm run build`
3. Deploy the `build` folder to platforms like Vercel, Netlify, or AWS S3

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_system
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

To test the application:

1. Start both backend and frontend servers
2. Register a new employee or use seed data
3. Login and test all features
4. Test manager features with manager credentials

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a full-stack project demonstrating modern web development practices.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note:** Make sure to change the JWT_SECRET in production and use a secure MongoDB connection string.

