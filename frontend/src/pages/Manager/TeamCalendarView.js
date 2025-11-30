import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import 'react-calendar/dist/Calendar.css';
import './TeamCalendarView.css';

function TeamCalendarView() {
  const dispatch = useDispatch();
  const { allAttendance } = useSelector((state) => state.attendance);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const startDate = new Date(selectedYear, selectedMonth - 1, 1);
    const endDate = new Date(selectedYear, selectedMonth, 0);
    dispatch(
      getAllAttendance({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  const getDateAttendance = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return allAttendance.filter((record) => {
      const recordDate = new Date(record.date).toISOString().split('T')[0];
      return recordDate === dateStr;
    });
  };

  const getTileClassName = ({ date }) => {
    const dateAttendance = getDateAttendance(date);
    if (dateAttendance.length === 0) return '';
    
    const presentCount = dateAttendance.filter((r) => r.status === 'present').length;
    const totalCount = dateAttendance.length;
    const ratio = presentCount / totalCount;

    if (ratio >= 0.8) return 'calendar-day high-attendance';
    if (ratio >= 0.5) return 'calendar-day medium-attendance';
    return 'calendar-day low-attendance';
  };

  const selectedDateAttendance = getDateAttendance(selectedDate);

  return (
    <div className="team-calendar-view">
      <h1>Team Calendar View</h1>

      <div className="calendar-filters">
        <div className="filter-group">
          <label>Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="card calendar-card">
          <h3>Team Attendance Calendar</h3>
          <div className="calendar-legend">
            <span className="legend-item">
              <span className="legend-color high-attendance"></span> High Attendance (≥80%)
            </span>
            <span className="legend-item">
              <span className="legend-color medium-attendance"></span> Medium Attendance (50-79%)
            </span>
            <span className="legend-item">
              <span className="legend-color low-attendance"></span> Low Attendance (&lt;50%)
            </span>
          </div>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={getTileClassName}
            className="team-calendar"
          />
        </div>

        <div className="card date-details-card">
          <h3>Attendance Details for Selected Date</h3>
          <p className="selected-date">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {selectedDateAttendance.length === 0 ? (
            <p className="no-data">No attendance records for this date</p>
          ) : (
            <>
              <div className="date-summary">
                <div className="summary-stat">
                  <span className="stat-label">Total:</span>
                  <span className="stat-value">{selectedDateAttendance.length}</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Present:</span>
                  <span className="stat-value present">
                    {selectedDateAttendance.filter((r) => r.status === 'present').length}
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Absent:</span>
                  <span className="stat-value absent">
                    {selectedDateAttendance.filter((r) => r.status === 'absent').length}
                  </span>
                </div>
                <div className="summary-stat">
                  <span className="stat-label">Late:</span>
                  <span className="stat-value late">
                    {selectedDateAttendance.filter((r) => r.status === 'late').length}
                  </span>
                </div>
              </div>
              <div className="attendance-list">
                <h4>Employee Details</h4>
                <table className="details-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDateAttendance.map((record) => (
                      <tr key={record._id}>
                        <td>
                          {record.userId?.name} ({record.userId?.employeeId})
                        </td>
                        <td>{record.userId?.department}</td>
                        <td>
                          <span className={`status-badge ${record.status}`}>
                            {record.status}
                          </span>
                        </td>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamCalendarView;

