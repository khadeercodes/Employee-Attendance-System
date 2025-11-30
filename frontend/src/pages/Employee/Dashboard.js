import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeDashboard, getTodayStatus } from '../../store/slices/attendanceSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { employeeDashboard, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getEmployeeDashboard());
    dispatch(getTodayStatus());
  }, [dispatch]);

  if (loading || !employeeDashboard) {
    return <div className="loading">Loading...</div>;
  }

  const { todayStatus: today, monthlyStats, recentAttendance } = employeeDashboard || {};
  
  // Ensure we have default values
  const safeMonthlyStats = monthlyStats || {
    present: 0,
    absent: 0,
    late: 0,
    totalHours: 0
  };
  
  const safeRecentAttendance = recentAttendance || [];

  // Prepare chart data for recent attendance with better visualization
  const chartData = safeRecentAttendance && safeRecentAttendance.length > 0 
    ? safeRecentAttendance.map((record) => {
        const date = new Date(record.date);
        const status = record.status || 'absent';
        // Handle half-day as present for chart display
        const isPresent = status === 'present' || status === 'half-day';
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
          checkInTime: record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
          checkOutTime: record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
          present: isPresent ? 1 : 0,
          late: status === 'late' ? 1 : 0,
          absent: status === 'absent' ? 1 : 0,
          halfDay: status === 'half-day' ? 1 : 0,
          hours: record.totalHours || 0,
          status: status,
          rawRecord: record,
        };
      }).reverse() // Reverse to show chronological order
    : [];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Employee Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back! Here's your attendance overview</p>
      </div>

      <div className="dashboard-grid">
        <div className="card status-card">
          <div className="card-header">
            <h3>📅 Today's Status</h3>
          </div>
          <div className="status-info">
            <div className={`status-badge-large ${today?.status || 'absent'}`}>
              {today?.checkedIn ? (today?.checkedOut ? '✅ Checked Out' : '🟢 Checked In') : '⚪ Not Checked In'}
            </div>
            {today?.status && (
              <div className="status-type">
                Status: <strong>{today.status.charAt(0).toUpperCase() + today.status.slice(1)}</strong>
              </div>
            )}
            {today?.checkInTime && (
              <div className="time-info">
                <span className="time-label">🕐 Check In:</span>
                <span className="time-value">{new Date(today.checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
            {today?.checkOutTime && (
              <div className="time-info">
                <span className="time-label">🕐 Check Out:</span>
                <span className="time-value">{new Date(today.checkOutTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}
            {today?.totalHours !== undefined && (
              <div className="time-info">
                <span className="time-label">⏱️ Total Hours:</span>
                <span className="time-value">{today.totalHours.toFixed(2)}h</span>
              </div>
            )}
            {!today?.checkInTime && !today?.checkOutTime && (
              <div className="no-data-message">
                No attendance marked for today
              </div>
            )}
          </div>
        </div>

        <div className="card stats-card">
          <div className="card-header">
            <h3>📈 This Month</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-value present">{safeMonthlyStats.present}</div>
              <div className="stat-label">Present</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">❌</div>
              <div className="stat-value absent">{safeMonthlyStats.absent}</div>
              <div className="stat-label">Absent</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⚠️</div>
              <div className="stat-value late">{safeMonthlyStats.late}</div>
              <div className="stat-label">Late</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⏱️</div>
              <div className="stat-value">{safeMonthlyStats.totalHours.toFixed(1)}h</div>
              <div className="stat-label">Total Hours</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card chart-card">
        <div className="card-header">
          <h3>📊 Recent Attendance (Last 7 Days)</h3>
        </div>
        {chartData.length === 0 ? (
          <div className="no-chart-data">
            <p>No attendance records for the last 7 days</p>
            <p className="hint">Start marking your attendance to see the chart!</p>
          </div>
        ) : (
          <>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#666', fontSize: 13, fontWeight: 500 }}
                    stroke="#999"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fill: '#666', fontSize: 12 }}
                    stroke="#999"
                    domain={[0, 'dataMax']}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(102, 126, 234, 0.1)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length > 0) {
                        const data = payload[0].payload;
                        const statusLabels = {
                          present: '✅ Present',
                          late: '⚠️ Late',
                          absent: '❌ Absent',
                          'half-day': '🕐 Half Day'
                        };
                        const status = data.status || (data.present === 1 ? (data.halfDay === 1 ? 'half-day' : 'present') : data.late === 1 ? 'late' : 'absent');
                        return (
                          <div className="custom-tooltip">
                            <div className="tooltip-header">
                              📅 {data.fullDate || label}
                            </div>
                            <div className="tooltip-status">
                              {statusLabels[status] || status}
                            </div>
                            <div className="tooltip-details">
                              <div>🕐 Check In: {data.checkInTime || 'N/A'}</div>
                              <div>🕐 Check Out: {data.checkOutTime || 'N/A'}</div>
                              <div>⏱️ Hours: {data.hours || 0}h</div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px', fontSize: '14px' }}
                    iconType="circle"
                    formatter={(value) => {
                      const labels = {
                        present: '✅ Present',
                        late: '⚠️ Late',
                        absent: '❌ Absent',
                        'half-day': '🕐 Half Day'
                      };
                      return labels[value] || value;
                    }}
                  />
                  <Bar 
                    dataKey="present" 
                    stackId="a" 
                    fill="#28a745" 
                    name="present"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1000}
                    animationBegin={0}
                  />
                  <Bar 
                    dataKey="late" 
                    stackId="a" 
                    fill="#ffc107" 
                    name="late"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1000}
                    animationBegin={150}
                  />
                  <Bar 
                    dataKey="absent" 
                    stackId="a" 
                    fill="#dc3545" 
                    name="absent"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1000}
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-summary">
              <div className="summary-item present-summary">
                <span className="summary-icon">✅</span>
                <span className="summary-text">
                  Present: <strong>{chartData.filter(d => d.present === 1 && d.halfDay !== 1).length}</strong> days
                </span>
              </div>
              {chartData.filter(d => d.halfDay === 1).length > 0 && (
                <div className="summary-item halfday-summary">
                  <span className="summary-icon">🕐</span>
                  <span className="summary-text">
                    Half Day: <strong>{chartData.filter(d => d.halfDay === 1).length}</strong> days
                  </span>
                </div>
              )}
              <div className="summary-item late-summary">
                <span className="summary-icon">⚠️</span>
                <span className="summary-text">
                  Late: <strong>{chartData.filter(d => d.late === 1).length}</strong> days
                </span>
              </div>
              <div className="summary-item absent-summary">
                <span className="summary-icon">❌</span>
                <span className="summary-text">
                  Absent: <strong>{chartData.filter(d => d.absent === 1).length}</strong> days
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="card table-card">
        <div className="card-header">
          <h3>📋 Recent Attendance Details</h3>
        </div>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {!safeRecentAttendance || safeRecentAttendance.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                  No attendance records found
                </td>
              </tr>
            ) : (
              safeRecentAttendance.map((record) => (
                <tr key={record._id || record.date}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    {record.checkInTime
                      ? new Date(record.checkInTime).toLocaleTimeString()
                      : 'N/A'}
                  </td>
                  <td>
                    {record.checkOutTime
                      ? new Date(record.checkOutTime).toLocaleTimeString()
                      : 'N/A'}
                  </td>
                  <td>
                    <span className={`status-badge ${record.status || 'absent'}`}>
                      {record.status || 'N/A'}
                    </span>
                  </td>
                  <td>{record.totalHours || 0}h</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

