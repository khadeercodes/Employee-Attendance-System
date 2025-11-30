const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Get employee dashboard stats
// @route   GET /api/dashboard/employee
// @access  Private (Employee)
exports.getEmployeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Today's status
    const todayAttendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    // Current month stats
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);

    const monthAttendance = await Attendance.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const stats = {
      present: 0,
      absent: 0,
      late: 0,
      totalHours: 0,
    };

    monthAttendance.forEach((record) => {
      if (record.status === 'present') stats.present++;
      else if (record.status === 'absent') stats.absent++;
      else if (record.status === 'late') stats.late++;
      stats.totalHours += record.totalHours || 0;
    });

    // Recent attendance (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentAttendance = await Attendance.find({
      userId,
      date: { $gte: sevenDaysAgo, $lte: today },
    })
      .sort({ date: -1 })
      .limit(7);

    res.json({
      todayStatus: {
        checkedIn: !!todayAttendance?.checkInTime,
        checkedOut: !!todayAttendance?.checkOutTime,
        checkInTime: todayAttendance?.checkInTime,
        checkOutTime: todayAttendance?.checkOutTime,
        status: todayAttendance?.status || 'absent',
        totalHours: todayAttendance?.totalHours || 0,
      },
      monthlyStats: stats,
      recentAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get manager dashboard stats
// @route   GET /api/dashboard/manager
// @access  Private (Manager)
exports.getManagerDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Total employees
    const totalEmployees = await User.countDocuments({ role: 'employee' });

    // Today's attendance
    const todayAttendance = await Attendance.find({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    }).populate('userId', 'name employeeId department');

    const todayStats = {
      present: 0,
      absent: totalEmployees - todayAttendance.length,
      late: 0,
    };

    const absentEmployees = [];
    const allEmployees = await User.find({ role: 'employee' });
    const attendanceMap = new Map();
    todayAttendance.forEach((record) => {
      attendanceMap.set(record.userId._id.toString(), record);
      if (record.status === 'present') todayStats.present++;
      if (record.status === 'late') todayStats.late++;
    });

    allEmployees.forEach((employee) => {
      if (!attendanceMap.has(employee._id.toString())) {
        absentEmployees.push({
          _id: employee._id,
          name: employee.name,
          employeeId: employee.employeeId,
          department: employee.department,
        });
      }
    });

    // Weekly attendance trend (last 7 days)
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyAttendance = await Attendance.find({
      date: { $gte: sevenDaysAgo, $lte: today },
    });

    const weeklyTrend = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weeklyTrend[dateStr] = { present: 0, absent: 0, late: 0 };
    }

    weeklyAttendance.forEach((record) => {
      const dateStr = new Date(record.date).toISOString().split('T')[0];
      if (weeklyTrend[dateStr]) {
        if (record.status === 'present') weeklyTrend[dateStr].present++;
        else if (record.status === 'absent') weeklyTrend[dateStr].absent++;
        else if (record.status === 'late') weeklyTrend[dateStr].late++;
      }
    });

    // Department-wise attendance
    const departmentStats = {};
    todayAttendance.forEach((record) => {
      const dept = record.userId?.department || 'Unknown';
      if (!departmentStats[dept]) {
        departmentStats[dept] = { present: 0, absent: 0, late: 0, total: 0 };
      }
      departmentStats[dept].total++;
      if (record.status === 'present') departmentStats[dept].present++;
      else if (record.status === 'late') departmentStats[dept].late++;
    });

    // Add absent count for each department
    allEmployees.forEach((employee) => {
      const dept = employee.department;
      if (!departmentStats[dept]) {
        departmentStats[dept] = { present: 0, absent: 0, late: 0, total: 0 };
      }
      if (!attendanceMap.has(employee._id.toString())) {
        departmentStats[dept].absent++;
      }
      departmentStats[dept].total++;
    });

    res.json({
      totalEmployees,
      todayStats,
      absentEmployees,
      weeklyTrend,
      departmentStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

