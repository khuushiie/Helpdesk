import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { getTicketStats } from '../utils/tickets';
import '../styles/operationdashboard.css';

const OperationDashboard = () => {
  const [stats, setStats] = useState({
    technicalSupportTickets: 0,
    operationTeamTickets: 0,
    averageRating: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTicketStats();
        setStats({
          technicalSupportTickets: data.technicalSupportTickets,
          operationTeamTickets: data.operationTeamTickets,
          averageRating: data.averageRating,
        });
        setError('');
      } catch (err) {
        setError('Failed to load dashboard stats. Please check if the backend server is running.');
        console.error('Fetch stats error:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="operation-dashboard px-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="operation-lower d-flex flex-wrap gap-4 mt-4">
        {/* Left Chart Box */}
        <div className="chart-box p-4 rounded shadow d-flex align-items-center justify-content-center bg-white">
          <i className="fa-solid fa-chart-simple chart-icon"></i>
        </div>

        {/* Right Column */}
        <div className="right-column d-flex flex-column gap-4">
          <div className="d-flex gap-3 flex-wrap">
            <div className="counter-box flex-fill p-4 rounded shadow text-center">
              <FontAwesomeIcon icon={faUserGear} className="mb-2 fs-2 text-primary" />
              <h6 className="fw-bold mb-1">Technical Support</h6>
              <div className="fs-4 fw-bold">{stats.technicalSupportTickets}</div>
            </div>

            <div className="counter-box flex-fill p-4 rounded shadow text-center">
              <FontAwesomeIcon icon={faUserGear} className="mb-2 fs-2 text-success" />
              <h6 className="fw-bold mb-1">Operation Team</h6>
              <div className="fs-4 fw-bold">{stats.operationTeamTickets}</div>
            </div>
          </div>

          {/* Feedback */}
          <div className="feedback-box p-4 rounded shadow text-center">
            <h6 className="fw-bold mb-3">Customer Feedback</h6>
            <div className="d-flex justify-content-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`fs-4 star ${i < Math.round(stats.averageRating) ? 'text-warning' : 'text-muted'}`}
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
