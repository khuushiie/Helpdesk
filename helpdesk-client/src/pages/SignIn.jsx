import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../utils/auth';
import '../styles/signin.css';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const validRoles = ['user', 'technicalsupport', 'operationteam', 'admin'];
      if (!validRoles.includes(role.toLowerCase())) {
        throw new Error('Invalid role selected');
      }
      const payload = { email, password };
      console.log('Signin payload:', payload);
      const data = await signIn(email, password);
      localStorage.setItem('role', role.toLowerCase());
      localStorage.setItem('username', username);
      localStorage.setItem('token', data.token);
      console.log('Signin: Stored role in localStorage:', role.toLowerCase());
      window.dispatchEvent(new Event('storage'));
      navigate('/dashboard');
    } catch (err) {
      console.error('Signin error:', err);
      setError('Invalid email or password. If you recently changed your password, use the new one.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center signin-container">
      <div className="signin-card shadow">
        <h3 className="text-center fw-bold fst-italic mb-4">Helpdesk System</h3>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <input
              type="text"
              className="form-control signin-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control signin-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control signin-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="technicalsupport">Technical Support</option>
              <option value="operationteam">Operation Team</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn signin-button">Sign In</button>
          </div>
          <div className="d-flex justify-content-between mt-2 px-1">
            <Link to="/forgot-password" className="text-danger signin-link">Forgot password</Link>
            <Link to="/signup" className="text-dark signin-link">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;