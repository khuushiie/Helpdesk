import '../styles/SignIn.css';

function SignIn() {
  return (
    <div className="d-flex justify-content-center align-items-center signin-container">
      <div className="signin-card shadow">
        <h3 className="text-center fw-bold fst-italic mb-4">Helpdesk System</h3>

        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control signin-input"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control signin-input"
              placeholder="Password"
              required
            />
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn signin-button">
              Sign In
            </button>
          </div>

          <div className="d-flex justify-content-between mt-2 px-1">
            <a href="#" className="text-danger signin-link">
              Forgot password
            </a>
            <a href="#" className="text-dark signin-link">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;


