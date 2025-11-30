import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import { getMyHistory, getMySummary } from '../../store/slices/attendanceSlice';
import 'react-calendar/dist/Calendar.css';
import './AttendanceHistory.css';

function AttendanceHistory() {
  const dispatch = useDispatch();
  const { history, summary, loading } = useSelector((state) => state.attendance);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(getMyHistory({ month: selectedMonth, year: selectedYear }));
    dispatch(getMySummary({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const getTileClassName = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    const record = history.find((h) => {
      const recordDate = new Date(h.date).toISOString().split('T')[0];
      return recordDate === dateStr;
    });

    if (record) {
      return `calendar-day ${record.status}`;
    }
    return '';
  };

  const getDateDetails = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return history.find((h) => {
      const recordDate = new Date(h.date).toISOString().split('T')[0];
      return recordDate === dateStr;
    });
  };

  const selectedRecord = getDateDetails(selectedDate);

  return (
    <div className="attendance-history">
      <h1>My Attendance History</h1>

      <div className="history-filters">
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

      <div className="history-grid">
        <div className="card">
          <h3>Monthly Summary</h3>
          {summary ? (
            <div className="summary-stats">
              <div className="summary-item">
                <span className="summary-label">Present:</span>
                <span className="summary-value present">{summary.present}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Absent:</span>
                <span className="summary-value absent">{summary.absent}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Late:</span>
                <span className="summary-value late">{summary.late}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Half Day:</span>
                <span className="summary-value">{summary.halfDay}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Hours:</span>
                <span className="summary-value">{summary.totalHours.toFixed(1)}h</span>
              </div>
            </div>
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>

        <div className="card calendar-card">
          <h3>Calendar View</h3>
          <div className="calendar-legend">
            <span className="legend-item">
              <span className="legend-color present"></span> Present
            </span>
            <span className="legend-item">
              <span className="legend-color absent"></span> Absent
            </span>
            <span className="legend-item">
              <span className="legend-color late"></span> Late
            </span>
            <span className="legend-item">
              <span className="legend-color half-day"></span> Half Day
            </span>
          </div>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={getTileClassName}
            className="attendance-calendar"
          />
          {selectedRecord && (
            <div className="selected-date-info">
              <h4>Selected Date Details</h4>
              <p>
                <strong>Date:</strong> {new Date(selectedRecord.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status-badge ${selectedRecord.status}`}>
                  {selectedRecord.status}
                </span>
              </p>
              {selectedRecord.checkInTime && (
                <p>
                  <strong>Check In:</strong>{' '}
                  {new Date(selectedRecord.checkInTime).toLocaleString()}
                </p>
              )}
              {selectedRecord.checkOutTime && (
                <p>
                  <strong>Check Out:</strong>{' '}
                  {new Date(selectedRecord.checkOutTime).toLocaleString()}
                </p>
              )}
              {selectedRecord.totalHours && (
                <p>
                  <strong>Total Hours:</strong> {selectedRecord.totalHours}h
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Attendance Table</h3>
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>Loading...</td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No attendance records</td>
              </tr>
            ) : (
              history.map((record) => (
                <tr key={record._id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    {record.checkInTime
                      ? new Date(record.checkInTime).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td>
                    {record.checkOutTime
                      ? new Date(record.checkOutTime).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td>
                    <span className={`status-badge ${record.status}`}>{record.status}</span>
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

export default AttendanceHistory;

