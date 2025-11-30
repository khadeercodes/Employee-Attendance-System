const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Check in
// @route   POST /api/attendance/checkin
// @access  Private (Employee)
exports.checkIn = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    if (existingAttendance && existingAttendance.checkInTime) {
      return res.status(400).json({ message: 'Already checked in today' });
    }

    const checkInTime = new Date();
    const checkInHour = checkInTime.getHours();
    const checkInMinute = checkInTime.getMinutes();

    // Determine status (late if after 9:30 AM)
    let status = 'present';
    if (checkInHour > 9 || (checkInHour === 9 && checkInMinute > 30)) {
      status = 'late';
    }

    if (existingAttendance) {
      existingAttendance.checkInTime = checkInTime;
      existingAttendance.status = status;
      await existingAttendance.save();
      return res.json(existingAttendance);
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkInTime,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check out
// @route   POST /api/attendance/checkout
// @access  Private (Employee)
exports.checkOut = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    if (!attendance || !attendance.checkInTime) {
      return res.status(400).json({ message: 'Please check in first' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ message: 'Already checked out today' });
    }

    attendance.checkOutTime = new Date();
    
    // Calculate total hours
    const diff = attendance.checkOutTime - attendance.checkInTime;
    attendance.totalHours = Math.round((diff / (1000 * 60 * 60)) * 100) / 100;

    // Update status if less than 4 hours (half-day)
    if (attendance.totalHours < 4) {
      attendance.status = 'half-day';
    }

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my attendance history
// @route   GET /api/attendance/my-history
// @access  Private (Employee)
exports.getMyHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query;

    let query = { userId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(100);

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my monthly summary
// @route   GET /api/attendance/my-summary
// @access  Private (Employee)
exports.getMySummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query;

    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    const attendance = await Attendance.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const summary = {
      present: 0,
      absent: 0,
      late: 0,
      halfDay: 0,
      totalHours: 0,
    };

    attendance.forEach((record) => {
      if (record.status === 'present') summary.present++;
      else if (record.status === 'absent') summary.absent++;
      else if (record.status === 'late') summary.late++;
      else if (record.status === 'half-day') summary.halfDay++;
      summary.totalHours += record.totalHours || 0;
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get today's status
// @route   GET /api/attendance/today
// @access  Private (Employee)
exports.getToday = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      userId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    if (!attendance) {
      return res.json({
        checkedIn: false,
        checkedOut: false,
        checkInTime: null,
        checkOutTime: null,
        status: 'absent',
      });
    }

    res.json({
      checkedIn: !!attendance.checkInTime,
      checkedOut: !!attendance.checkOutTime,
      checkInTime: attendance.checkInTime,
      checkOutTime: attendance.checkOutTime,
      status: attendance.status,
      totalHours: attendance.totalHours,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all employees attendance (Manager)
// @route   GET /api/attendance/all
// @access  Private (Manager)
exports.getAllAttendance = async (req, res) => {
  try {
    const { employeeId, status, startDate, endDate } = req.query;

    let query = {};

    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (user) {
        query.userId = user._id;
      } else {
        return res.json([]);
      }
    }

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const attendance = await Attendance.find(query)
      .populate('userId', 'name email employeeId department')
      .sort({ date: -1 })
      .limit(500);

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get specific employee attendance (Manager)
// @route   GET /api/attendance/employee/:id
// @access  Private (Manager)
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, year } = req.query;

    let query = { userId: id };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.find(query)
      .populate('userId', 'name email employeeId department')
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get team summary (Manager)
// @route   GET /api/attendance/summary
// @access  Private (Manager)
exports.getTeamSummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    const attendance = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate('userId', 'name employeeId department');

    const summary = {
      totalEmployees: await User.countDocuments({ role: 'employee' }),
      present: 0,
      absent: 0,
      late: 0,
      halfDay: 0,
      totalHours: 0,
      byDepartment: {},
    };

    attendance.forEach((record) => {
      if (record.status === 'present') summary.present++;
      else if (record.status === 'absent') summary.absent++;
      else if (record.status === 'late') summary.late++;
      else if (record.status === 'half-day') summary.halfDay++;
      summary.totalHours += record.totalHours || 0;

      const dept = record.userId?.department || 'Unknown';
      if (!summary.byDepartment[dept]) {
        summary.byDepartment[dept] = { present: 0, absent: 0, late: 0, halfDay: 0 };
      }
      if (record.status === 'present') summary.byDepartment[dept].present++;
      else if (record.status === 'absent') summary.byDepartment[dept].absent++;
      else if (record.status === 'late') summary.byDepartment[dept].late++;
      else if (record.status === 'half-day') summary.byDepartment[dept].halfDay++;
    });

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export attendance to CSV (Manager)
// @route   GET /api/attendance/export
// @access  Private (Manager)
exports.exportAttendance = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;

    let query = {};

    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (user) {
        query.userId = user._id;
      } else {
        return res.status(404).json({ message: 'Employee not found' });
      }
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const attendance = await Attendance.find(query)
      .populate('userId', 'name email employeeId department')
      .sort({ date: -1 });

    // Generate CSV
    let csv = 'Date,Employee ID,Name,Email,Department,Check In,Check Out,Status,Total Hours\n';

    attendance.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString();
      const checkIn = record.checkInTime
        ? new Date(record.checkInTime).toLocaleString()
        : 'N/A';
      const checkOut = record.checkOutTime
        ? new Date(record.checkOutTime).toLocaleString()
        : 'N/A';

      csv += `${date},${record.userId?.employeeId || 'N/A'},${record.userId?.name || 'N/A'},${record.userId?.email || 'N/A'},${record.userId?.department || 'N/A'},${checkIn},${checkOut},${record.status},${record.totalHours || 0}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=attendance_report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get today's status for all employees (Manager)
// @route   GET /api/attendance/today-status
// @access  Private (Manager)
exports.getTodayStatus = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.find({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    }).populate('userId', 'name email employeeId department');

    const allEmployees = await User.find({ role: 'employee' });

    const result = {
      present: [],
      absent: [],
      late: [],
      checkedIn: [],
      notCheckedIn: [],
    };

    const attendanceMap = new Map();
    attendance.forEach((record) => {
      attendanceMap.set(record.userId._id.toString(), record);
    });

    allEmployees.forEach((employee) => {
      const record = attendanceMap.get(employee._id.toString());
      if (!record) {
        result.absent.push({
          _id: employee._id,
          name: employee.name,
          employeeId: employee.employeeId,
          department: employee.department,
        });
        result.notCheckedIn.push({
          _id: employee._id,
          name: employee.name,
          employeeId: employee.employeeId,
          department: employee.department,
        });
      } else {
        if (record.status === 'present') result.present.push(record);
        if (record.status === 'late') result.late.push(record);
        if (record.checkInTime) {
          result.checkedIn.push({
            ...record.toObject(),
            userId: {
              _id: employee._id,
              name: employee.name,
              employeeId: employee.employeeId,
              department: employee.department,
            },
          });
        } else {
          result.notCheckedIn.push({
            _id: employee._id,
            name: employee.name,
            employeeId: employee.employeeId,
            department: employee.department,
          });
        }
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


