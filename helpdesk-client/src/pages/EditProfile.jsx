import React, { useState } from 'react';
import '../styles/editprofile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    realName: '',
    accessLevel: '',
    projectAccessLevel: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('User updated!');
  };

  return (
    <div className="editprofile-container p-5 rounded">
      <h2 className=" mb-4">User Profile</h2>
      <h2 className="edit mb-4">Edit Account</h2>

      <form onSubmit={handleSubmit} className="row form-layout">
        {/* Left column: labels */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <label><strong>Username:</strong></label>
          <label><strong>Current Password:</strong></label>
          <label><strong>New Password:</strong></label>
          <label><strong>Confirm Password:</strong></label>
          <label><strong>Email:</strong></label>
          <label><strong>Real Name:</strong></label>
          <label><strong>Access Level:</strong></label>
          <label><strong>Project Access Level:</strong></label>
        </div>

        {/* Right column: inputs */}
        <div className="col-md-8 d-flex flex-column gap-3">
          <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
          <input type="password" name="currentPassword" className="form-control" value={formData.currentPassword} onChange={handleChange} required />
          <input type="password" name="newPassword" className="form-control" value={formData.newPassword} onChange={handleChange} required />
          <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} required />
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          <input type="text" name="realName" className="form-control" value={formData.realName} onChange={handleChange} required />
          <select name="accessLevel" className="form-select" value={formData.accessLevel} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="viewer">Viewer</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>
          <select name="projectAccessLevel" className="form-select" value={formData.projectAccessLevel} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="read">Read Only</option>
            <option value="edit">Read/Write</option>
          </select>
        </div>

        {/* Button below */}
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
