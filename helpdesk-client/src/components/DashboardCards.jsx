import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHourglassHalf, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { getTicketStats } from '../utils/tickets';
import '../styles/dashboard.css';

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    closedTickets: 0,
    pendingTickets: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTicketStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard stats');
        console.error('Fetch stats error:', err);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      title: 'Total Tickets',
      count: stats.totalTickets,
      icon: faClipboardList,
      style: 'card-total',
    },
    {
      title: 'Open Tickets',
      count: stats.openTickets,
      icon: faHourglassHalf,
      style: 'card-open',
    },
    {
      title: 'Closed Tickets',
      count: stats.closedTickets,
      icon: faCheckCircle,
      style: 'card-closed',
    },
    {
      title: 'Pending Tickets',
      count: stats.pendingTickets,
      icon: faClock,
      style: 'card-pending',
    },
  ];

  return (
    <div className="dashboard-cards">
      {error && <div className="alert alert-danger">{error}</div>}
      {cardData.map((c) => (
        <div key={c.title} className={`card-custom ${c.style}`}>
          <div>
            <h4>{c.count}</h4>
            <p>{c.title}</p>
          </div>
          <FontAwesomeIcon icon={c.icon} className="card-icon" />
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;