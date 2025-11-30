import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/attendanceSlice';
import { useDispatch } from 'react-redux';
import api from '../../utils/api';
import './Reports.css';

function Reports() {
  const dispatch = useDispatch();
  const { allAttendance, loading } = useSelector((state) => state.attendance);
  const [filters, setFilters] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
  });
  const [exporting, setExporting] = useState(false);

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(newFilters);
    dispatch(getAllAttendance(newFilters));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (filters.employeeId) params.append('employeeId', filters.employeeId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await api.get('/attendance/export', {
        params,
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="reports">
      <h1>Attendance Reports</h1>

      <div className="card filters-card">
        <h3>Report Filters</h3>
        <div className="filters-grid">
          <div className="form-group">
            <label>Employee ID (Optional)</label>
            <input
              type="text"
              name="employeeId"
              value={filters.employeeId}
              onChange={handleFilterChange}
              placeholder="e.g., EMP001 (leave empty for all employees)"
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              required
            />
          </div>
        </div>
        <div className="export-actions">
          <button
            onClick={handleExport}
            className="btn btn-success"
            disabled={exporting || !filters.startDate || !filters.endDate}
          >
            {exporting ? 'Exporting...' : 'Export to CSV'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-header">
          <h3>Attendance Data</h3>
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
                <th>Email</th>
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
                  <td colSpan="9" style={{ textAlign: 'center' }}>Loading...</td>
                </tr>
              ) : allAttendance.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>
                    No attendance records found. Please select date range and click export.
                  </td>
                </tr>
              ) : (
                allAttendance.map((record) => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.userId?.employeeId || 'N/A'}</td>
                    <td>{record.userId?.name || 'N/A'}</td>
                    <td>{record.userId?.email || 'N/A'}</td>
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

export default Reports;


