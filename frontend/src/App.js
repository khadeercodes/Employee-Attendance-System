import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EmployeeDashboard from './pages/Employee/Dashboard';
import MarkAttendance from './pages/Employee/MarkAttendance';
import AttendanceHistory from './pages/Employee/AttendanceHistory';
import Profile from './pages/Employee/Profile';
import ManagerDashboard from './pages/Manager/Dashboard';
import AllEmployeesAttendance from './pages/Manager/AllEmployeesAttendance';
import TeamCalendarView from './pages/Manager/TeamCalendarView';
import Reports from './pages/Manager/Reports';

function PrivateRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={user?.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard'} replace />;
  }
  
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard'} replace />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      <Route
        path="/employee/*"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="mark-attendance" element={<MarkAttendance />} />
        <Route path="history" element={<AttendanceHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      <Route
        path="/manager/*"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="all-employees" element={<AllEmployeesAttendance />} />
        <Route path="team-calendar" element={<TeamCalendarView />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

