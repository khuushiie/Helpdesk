import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signin.css';

function SignUp() {
  const [role, setRole] = useState('user');

  return (
    <div className="d-flex justify-content-center align-items-center signin-container">
      <div className="signin-card shadow">
        <h3 className="text-center fw-bold fst-italic mb-4">Helpdesk System</h3>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control signin-input" placeholder="Username" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control signin-input" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control signin-input" placeholder="Password" required />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="technical">Technical Support</option>
              <option value="operation">Operation Team</option>
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
