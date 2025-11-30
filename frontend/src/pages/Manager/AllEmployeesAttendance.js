import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import './AllEmployeesAttendance.css';

function AllEmployeesAttendance() {
  const dispatch = useDispatch();
  const { allAttendance, loading } = useSelector((state) => state.attendance);
  const [filters, setFilters] = useState({
    employeeId: '',
    status: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    dispatch(getAllAttendance(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(newFilters);
    dispatch(getAllAttendance(newFilters));
  };

  const clearFilters = () => {
    const clearedFilters = {
      employeeId: '',
      status: '',
      startDate: '',
      endDate: '',
    };
    setFilters(clearedFilters);
    dispatch(getAllAttendance(clearedFilters));
  };

  return (
    <div className="all-employees-attendance">
      <h1>All Employees Attendance</h1>

      <div className="card filters-card">
        <h3>Filters</h3>
        <div className="filters-grid">
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={filters.employeeId}
              onChange={handleFilterChange}
              placeholder="e.g., EMP001"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="half-day">Half Day</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <button onClick={clearFilters} className="btn btn-secondary">
          Clear Filters
        </button>
      </div>

      <div className="card">
        <div className="table-header">
          <h3>Attendance Records</h3>
          <span className="record-count">
            {loading ? 'Loading...' : `${allAttendance.length} records`}
          </span>
        </div>
        <div className="table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>Loading...</td>
                </tr>
              ) : allAttendance.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>No attendance records found</td>
                </tr>
              ) : (
                allAttendance.map((record) => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.userId?.employeeId || 'N/A'}</td>
                    <td>{record.userId?.name || 'N/A'}</td>
                    <td>{record.userId?.department || 'N/A'}</td>
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
    </div>
  );
}

export default AllEmployeesAttendance;

