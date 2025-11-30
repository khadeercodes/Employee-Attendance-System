import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../../store/slices/authSlice';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (loading || !user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="card profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Employee ID:</span>
            <span className="detail-value">{user.employeeId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Department:</span>
            <span className="detail-value">{user.department}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{user.role}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

