import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIn, checkOut, getTodayStatus, clearError } from '../../store/slices/attendanceSlice';
import './MarkAttendance.css';

function MarkAttendance() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todayStatus, loading, error } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getTodayStatus());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleCheckIn = () => {
    dispatch(checkIn()).then(() => {
      dispatch(getTodayStatus());
    });
  };

  const handleCheckOut = () => {
    dispatch(checkOut()).then(() => {
      dispatch(getTodayStatus());
    });
  };

  return (
    <div className="mark-attendance">
      <h1>Mark Attendance</h1>

      <div className="attendance-card">
        <div className="attendance-header">
          <h2>Today's Attendance</h2>
          <p className="date">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="attendance-status">
          <div className={`status-indicator ${todayStatus?.status || 'absent'}`}>
            <div className="status-circle"></div>
            <span className="status-text">
              {todayStatus?.checkedIn
                ? todayStatus?.checkedOut
                  ? 'Checked Out'
                  : 'Checked In'
                : 'Not Checked In'}
            </span>
          </div>

          {todayStatus?.checkInTime && (
            <div className="time-info">
              <p>
                <strong>Check In:</strong>{' '}
                {new Date(todayStatus.checkInTime).toLocaleTimeString()}
              </p>
            </div>
          )}

          {todayStatus?.checkOutTime && (
            <div className="time-info">
              <p>
                <strong>Check Out:</strong>{' '}
                {new Date(todayStatus.checkOutTime).toLocaleTimeString()}
              </p>
              <p>
                <strong>Total Hours:</strong> {todayStatus.totalHours || 0} hours
              </p>
            </div>
          )}
        </div>

        <div className="attendance-actions">
          {!todayStatus?.checkedIn ? (
            <button
              onClick={handleCheckIn}
              className="btn btn-success btn-large"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Check In'}
            </button>
          ) : !todayStatus?.checkedOut ? (
            <button
              onClick={handleCheckOut}
              className="btn btn-danger btn-large"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Check Out'}
            </button>
          ) : (
            <div className="completed-message">
              <p>You have completed your attendance for today!</p>
              <button
                onClick={() => navigate('/employee/history')}
                className="btn btn-secondary"
              >
                View History
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;

