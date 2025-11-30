const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Attendance = require('../models/Attendance');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance_system');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Attendance.deleteMany({});
    console.log('Cleared existing data');

    // Create manager
    const manager = await User.create({
      name: 'Manager User',
      email: 'manager@example.com',
      password: 'manager123',
      role: 'manager',
      employeeId: 'MGR001',
      department: 'Management',
    });
    console.log('Created manager:', manager.email);

    // Create employees
    const employees = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'employee123',
        role: 'employee',
        employeeId: 'EMP001',
        department: 'Engineering',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'employee123',
        role: 'employee',
        employeeId: 'EMP002',
        department: 'Engineering',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'employee123',
        role: 'employee',
        employeeId: 'EMP003',
        department: 'Sales',
      },
      {
        name: 'Alice Williams',
        email: 'alice@example.com',
        password: 'employee123',
        role: 'employee',
        employeeId: 'EMP004',
        department: 'Marketing',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'employee123',
        role: 'employee',
        employeeId: 'EMP005',
        department: 'Engineering',
      },
    ]);
    console.log(`Created ${employees.length} employees`);

    // Create sample attendance data for the last 30 days
    const attendanceRecords = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      // Skip weekends (Saturday = 6, Sunday = 0)
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      for (const employee of employees) {
        // Randomly decide if employee was present (80% chance)
        if (Math.random() > 0.2) {
          const checkInTime = new Date(date);
          // Check in between 8:00 AM and 10:00 AM
          const checkInHour = 8 + Math.floor(Math.random() * 2);
          const checkInMinute = Math.floor(Math.random() * 60);
          checkInTime.setHours(checkInHour, checkInMinute, 0, 0);

          let status = 'present';
          if (checkInHour > 9 || (checkInHour === 9 && checkInMinute > 30)) {
            status = 'late';
          }

          const checkOutTime = new Date(checkInTime);
          // Work between 6 to 9 hours
          const workHours = 6 + Math.random() * 3;
          checkOutTime.setHours(checkInTime.getHours() + Math.floor(workHours));
          checkOutTime.setMinutes(checkInTime.getMinutes() + Math.floor((workHours % 1) * 60));

          const totalHours = Math.round((workHours * 100) / 100);

          if (totalHours < 4) {
            status = 'half-day';
          }

          attendanceRecords.push({
            userId: employee._id,
            date,
            checkInTime,
            checkOutTime,
            status,
            totalHours,
          });
        }
      }
    }

    await Attendance.insertMany(attendanceRecords);
    console.log(`Created ${attendanceRecords.length} attendance records`);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nLogin credentials:');
    console.log('Manager: manager@example.com / manager123');
    console.log('Employee: john@example.com / employee123');
    console.log('Employee: jane@example.com / employee123');
    console.log('Employee: bob@example.com / employee123');
    console.log('Employee: alice@example.com / employee123');
    console.log('Employee: charlie@example.com / employee123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

