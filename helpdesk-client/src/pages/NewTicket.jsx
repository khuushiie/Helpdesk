import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../utils/tickets';
import '../styles/newticket.css';

const NewTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ticketId: '',
    name: '',
    date: '',
    department: '',
    subject: '',
    category: '',
    type: '',
    priority: '',
    description: '',
    attachment: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
        department: formData.department,
        type: formData.type,
        attachment: formData.attachment,
      };
      const data = await createTicket(payload);
      setSuccess('Ticket created successfully!');
      setFormData({
        ticketId: '',
        name: '',
        date: '',
        department: '',
        subject: '',
        category: '',
        type: '',
        priority: '',
        description: '',
        attachment: '',
      });
    } catch (err) {
      if (err.message === 'No token provided' || err.message === 'Invalid token') {
        navigate('/');
      } else {
        setError(err.message || 'Failed to create ticket');
        console.error('Create ticket error:', err);
      }
    }
  };

  return (
    <div className="container newticket-container my-4">
      <h2 className="text-center mb-5 fw-bold">Create New Ticket</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Ticket No.</label>
            <input
              type="text"
              name="ticketId"
              className="form-control mb-3"
              placeholder="Auto-generated"
              value={formData.ticketId}
              disabled
            />
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control mb-3"
              value={formData.date}
              onChange={handleChange}
            />
            <label className="form-label">Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Subject</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select mb-3"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Network</option>
              <option>Access</option>
              <option>UI</option>
            </select>

            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select mb-3"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option>Bug</option>
              <option>Issue</option>
              <option>Request</option>
              <option>Support</option>
            </select>

            <label className="form-label">Priority</label>
            <select
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="8"
              placeholder="Describe the issue in detail"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="row mt-4 align-items-center">
          <div className="col-md-6 d-flex flex-column align-items-start gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="robotCheck"
                required
              />
              <label className="form-check-label" htmlFor="robotCheck">
                I'm not a robot
              </label>
            </div>
            <small className="text-muted">By submitting, you agree to our Privacy Terms.</small>
          </div>

          <div className="col-md-6 text-end">
            <button type="submit" className="btn px-5 submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;