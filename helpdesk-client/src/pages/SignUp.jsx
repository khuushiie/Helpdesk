import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../utils/auth';
import '../styles/signin.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const roleMap = {
        user: 'user',
        technicalsupport: 'technicalsupport',
        operationteam: 'operationteam',
        admin: 'admin',
      };
      const backendRole = roleMap[role.toLowerCase()];
      if (!backendRole) throw new Error('Invalid role selected');

      if (!username || !email || !password) {
        throw new Error('All fields are required');
      }

      const payload = { name: username, username, email, password, role: backendRole };
      console.log('Signup payload:', payload);

      const data = await signUp(username, username, email, password, backendRole);
      localStorage.setItem('role', role.toLowerCase());
      localStorage.setItem('username', username);
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
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
              type="text"
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
            <button type="submit" className="btn signin-button">Sign Up</button>
          </div>
          <div className="d-flex justify-content-between mt-2 px-1">
            <Link to="/forgot-password" className="text-danger signin-link">Forgot password</Link>
            <Link to="/" className="text-dark signin-link">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;