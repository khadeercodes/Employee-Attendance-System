import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './Layout.css';

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isEmployee = user?.role === 'employee';
  const isManager = user?.role === 'manager';

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h2>Attendance System</h2>
          </div>
          <div className="nav-links">
            {isEmployee && (
              <>
                <Link
                  to="/employee/dashboard"
                  className={location.pathname === '/employee/dashboard' ? 'active' : ''}
                >
                  Dashboard
                </Link>
                <Link
                  to="/employee/mark-attendance"
                  className={location.pathname === '/employee/mark-attendance' ? 'active' : ''}
                >
                  Mark Attendance
                </Link>
                <Link
                  to="/employee/history"
                  className={location.pathname === '/employee/history' ? 'active' : ''}
                >
                  My Attendance History
                </Link>
                <Link
                  to="/employee/profile"
                  className={location.pathname === '/employee/profile' ? 'active' : ''}
                >
                  Profile
                </Link>
              </>
            )}
            {isManager && (
              <>
                <Link
                  to="/manager/dashboard"
                  className={location.pathname === '/manager/dashboard' ? 'active' : ''}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manager/all-employees"
                  className={location.pathname === '/manager/all-employees' ? 'active' : ''}
                >
                  All Employees Attendance
                </Link>
                <Link
                  to="/manager/team-calendar"
                  className={location.pathname === '/manager/team-calendar' ? 'active' : ''}
                >
                  Team Calendar View
                </Link>
                <Link
                  to="/manager/reports"
                  className={location.pathname === '/manager/reports' ? 'active' : ''}
                >
                  Reports
                </Link>
              </>
            )}
            <div className="nav-user">
              <span>{user?.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;


