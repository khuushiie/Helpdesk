import React, { useState } from 'react';
import '../styles/operationdashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faChartPie } from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';

const OperationDashboard = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="operation-dashboard px-4">
      <div className="mb-4">
        <Dashboard />
      </div>

      <div className="operation-lower d-flex flex-wrap gap-4 mt-4">
        {/* Left Chart Box */}
        <div className="chart-box p-4 rounded shadow d-flex align-items-center justify-content-center bg-white">
          <i className="fa-solid fa-chart-simple chart-icon"></i>
        </div>


        {/* Right Column */}
        <div className="right-column d-flex flex-column gap-4">
          {/* Top Row - Technical & Operation Team */}
          <div className="d-flex gap-3 flex-wrap">
            <div className="counter-box flex-fill p-4 rounded shadow text-center">
              <FontAwesomeIcon icon={faUserGear} className="mb-2 fs-2 text-primary" />
              <h6 className="fw-bold mb-1">Technical Support</h6>
              <div className="fs-4 fw-bold">3</div>
            </div>

            <div className="counter-box flex-fill p-4 rounded shadow text-center">
              <FontAwesomeIcon icon={faUserGear} className="mb-2 fs-2 text-success" />
              <h6 className="fw-bold mb-1">Operation Team</h6>
              <div className="fs-4 fw-bold">5</div>
            </div>
          </div>

          {/* Bottom Box - Customer Feedback */}
          <div className="feedback-box p-4 rounded shadow text-center">
            <h6 className="fw-bold mb-3">Customer Feedback</h6>
            <div className="d-flex justify-content-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`fs-4 star ${i < rating ? 'text-warning' : 'text-muted'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleStarClick(i)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationDashboard;
