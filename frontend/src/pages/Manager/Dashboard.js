import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManagerDashboard, getTodayStatusManager } from '../../store/slices/attendanceSlice';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const COLORS = ['#28a745', '#dc3545', '#ffc107', '#17a2b8'];

function ManagerDashboard() {
  const dispatch = useDispatch();
  const { managerDashboard, todayStatusManager, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getManagerDashboard());
    dispatch(getTodayStatusManager());
  }, [dispatch]);

  if (loading || !managerDashboard) {
    return <div className="loading">Loading...</div>;
  }

  const { totalEmployees, todayStats, absentEmployees, weeklyTrend, departmentStats } = managerDashboard;

  // Prepare weekly trend data
  const weeklyData = Object.entries(weeklyTrend).map(([date, stats]) => {
    const dateObj = new Date(date);
    return {
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      present: stats.present,
      absent: stats.absent,
      late: stats.late,
      total: stats.present + stats.absent + stats.late,
    };
  });

  // Prepare department data
  const departmentData = Object.entries(departmentStats).map(([name, stats]) => ({
    name,
    present: stats.present,
    absent: stats.absent,
    late: stats.late,
  }));

  const pieData = [
    { name: 'Present', value: todayStats.present },
    { name: 'Absent', value: todayStats.absent },
    { name: 'Late', value: todayStats.late },
  ];

  return (
    <div className="dashboard">
      <h1>Manager Dashboard</h1>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <h3>Total Employees</h3>
          <div className="stat-number">{totalEmployees}</div>
        </div>
        <div className="card stat-card">
          <h3>Today's Attendance</h3>
          <div className="stat-details">
            <div className="stat-item">
              <span className="stat-label">Present:</span>
              <span className="stat-value present">{todayStats.present}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Absent:</span>
              <span className="stat-value absent">{todayStats.absent}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Late:</span>
              <span className="stat-value late">{todayStats.late}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card chart-card">
          <h3>Today's Attendance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                formatter={(value, name) => {
                  const total = pieData.reduce((sum, item) => sum + item.value, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return [`${value} employees (${percentage}%)`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h3>Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: '#666', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                formatter={(value, name) => {
                  const labels = {
                    present: '✅ Present',
                    absent: '❌ Absent',
                    late: '⚠️ Late'
                  };
                  return [value, labels[name] || name];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return `📅 ${payload[0].payload.fullDate || label}`;
                  }
                  return `📅 ${label}`;
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '15px' }}
                formatter={(value) => {
                  const labels = {
                    present: '✅ Present',
                    absent: '❌ Absent',
                    late: '⚠️ Late'
                  };
                  return labels[value] || value;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="present" 
                stroke="#28a745" 
                name="present"
                strokeWidth={3}
                dot={{ fill: '#28a745', r: 5 }}
                animationDuration={800}
              />
              <Line 
                type="monotone" 
                dataKey="absent" 
                stroke="#dc3545" 
                name="absent"
                strokeWidth={3}
                dot={{ fill: '#dc3545', r: 5 }}
                animationDuration={800}
              />
              <Line 
                type="monotone" 
                dataKey="late" 
                stroke="#ffc107" 
                name="late"
                strokeWidth={3}
                dot={{ fill: '#ffc107', r: 5 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card chart-card">
        <h3>Department-wise Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              cursor={{ fill: 'rgba(102, 126, 234, 0.1)' }}
              formatter={(value, name) => {
                const labels = {
                  present: '✅ Present',
                  absent: '❌ Absent',
                  late: '⚠️ Late'
                };
                return [value, labels[name] || name];
              }}
              labelFormatter={(label) => `🏢 Department: ${label}`}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '15px' }}
              formatter={(value) => {
                const labels = {
                  present: '✅ Present',
                  absent: '❌ Absent',
                  late: '⚠️ Late'
                };
                return labels[value] || value;
              }}
            />
            <Bar 
              dataKey="present" 
              fill="#28a745" 
              name="present"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
            <Bar 
              dataKey="absent" 
              fill="#dc3545" 
              name="absent"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
            <Bar 
              dataKey="late" 
              fill="#ffc107" 
              name="late"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {absentEmployees && absentEmployees.length > 0 && (
        <div className="card">
          <h3>Absent Employees Today</h3>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {absentEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;

