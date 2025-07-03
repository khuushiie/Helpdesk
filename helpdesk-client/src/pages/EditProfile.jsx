import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../utils/auth';
import '../styles/editprofile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    realName: '',
    accessLevel: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        if (!token || !username) {
          setError('Please sign in to edit your profile');
          navigate('/');
          return;
        }

        const data = await getProfile();
        setFormData({
          username: data.username || username,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          email: data.email || '',
          realName: data.name || '',
          accessLevel: data.role || role || 'user',
        });
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError(err.message || 'Failed to load profile. Using local data.');
        setFormData((prev) => ({
          ...prev,
          username: localStorage.getItem('username') || '',
          accessLevel: localStorage.getItem('role') || 'user',
        }));
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('New password and confirm password do not match');
      }
      if (!formData.currentPassword) {
        throw new Error('Current password is required');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please sign in.');
      }

      const payload = {
        username: formData.username,
        email: formData.email,
        name: formData.realName,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword || undefined,
        role: formData.accessLevel,
      };
      console.log('Update profile payload:', payload);

      const data = await updateProfile(
        payload.username,
        payload.email,
        payload.name,
        payload.currentPassword,
        payload.newPassword,
        payload.role
      );

      localStorage.setItem('username', formData.username);
      localStorage.setItem('role', formData.accessLevel.toLowerCase());
      localStorage.removeItem('token'); // Clear token to force re-login
      window.dispatchEvent(new Event('storage'));

      setSuccess('Profile updated successfully! Please sign in again.');
      setTimeout(() => navigate('/'), 2000); // Redirect to signin after 2s
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.message || 'Failed to update profile. Please check your current password.');
    }
  };

  return (
    <div className="editprofile-container p-5 rounded">
      <h2 className="mb-4">User Profile</h2>
      <h2 className="edit mb-4">Edit Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="row form-layout">
        <div className="col-md-4 d-flex flex-column gap-3">
          <label><strong>Username:</strong></label>
          <label><strong>Current Password:</strong></label>
          <label><strong>New Password:</strong></label>
          <label><strong>Confirm Password:</strong></label>
          <label><strong>Email:</strong></label>
          <label><strong>Real Name:</strong></label>
          <label><strong>Access Level:</strong></label>
        </div>
        <div className="col-md-8 d-flex flex-column gap-3">
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="currentPassword"
            className="form-control"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="realName"
            className="form-control"
            value={formData.realName}
            onChange={handleChange}
            required
          />
          <select
            name="accessLevel"
            className="form-select"
            value={formData.accessLevel}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="technicalsupport">Technical Support</option>
            <option value="operationteam">Operation Team</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="text-end mt-4">
          <button type="submit" className="btn px-4 submit-btn">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;