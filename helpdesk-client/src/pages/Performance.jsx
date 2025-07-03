import React from 'react';
import '../styles/performance.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faScrewdriverWrench, faEnvelopeOpenText, faFolderOpen, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Performance = () => {
  const navigate = useNavigate();

  const operations = [
    { title: 'Operation A' },
    { title: 'Operation B' },
    { title: 'Operation C' },
  ];

  return (
    <div className="container-fluid py-4 min-vh-100">
      <h2 className="mb-4 fw-bold">Performance</h2>

      <div className="row g-4">
        {/* Left Section */}
        <div className="col-md-6">
          {/* Profile Card */}
          <div className="card mb-4">
            <div className="card-body d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white"
                style={{ width: '80px', height: '80px', fontSize: '30px' }}
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="ms-3">
                <h5 className="mb-1">John Doe</h5>
                <p className="mb-0 text-muted">+91 9876543210</p>
                <p className="mb-0 text-muted">IT Department</p>
              </div>
            </div>
          </div>

          {/* Ticket Stats */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Total Tickets:</span>
                <strong>152</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tickets Solved:</span>
                <strong>130</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tickets Pending:</span>
                <strong>10</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>In Progress:</span>
                <strong>12</strong>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Rating:</span>
                <span className="text-warning">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} className="text-secondary" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Operation Cards */}
        <div className="col-md-6">
          {operations.map((op, index) => (
            <div className="card mb-4 operation-card" key={index}>
              <div className="card-body d-flex align-items-center">
                {/* Left - Icon */}
                <div className="fs-3 text-primary me-3">
                  <i className="fa-solid fa-user"></i>
                </div>

                {/* Right - Text + Button */}
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold">{op.title}</h6>
                  <button
                    className="btn btn-link p-0 text-primary details"
                    onClick={() => navigate('/profile')}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Performance;
