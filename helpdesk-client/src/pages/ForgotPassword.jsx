import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../utils/auth';
import '../styles/signin.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const data = await forgotPassword(email);
      setMessage(data.message || 'Password reset link sent to email.');
    } catch (err) {
      setError(err.message || 'Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center signin-container">
      <div className="signin-card shadow">
        <h3 className="text-center fw-bold fst-italic mb-4">Helpdesk System</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          <div className="mb-3">
            <input
              type="text"
              className="form-control signin-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn signin-button">Send Reset Link</button>
          </div>
          <div className="d-flex justify-content-between mt-2 px-1">
            <Link to="/" className="text-dark signin-link">Sign In</Link>
            <Link to="/signup" className="text-dark signin-link">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;