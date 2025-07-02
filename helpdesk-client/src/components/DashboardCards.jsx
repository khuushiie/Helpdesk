import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faHourglassHalf,
  faCheckCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import '../styles/dashboard.css';

const cardData = [
  {
    title: 'Total Tickets',
    count: 128,
    icon: faClipboardList,
    style: 'card-total'
  },
  {
    title: 'Open Tickets',
    count: 32,
    icon: faHourglassHalf,
    style: 'card-open'
  },
  {
    title: 'Closed Tickets',
    count: 76,
    icon: faCheckCircle,
    style: 'card-closed'
  },
  {
    title: 'Pending Tickets',
    count: 20,
    icon: faClock,
    style: 'card-pending'
  }
];

const DashboardCards = () => {
  return (
    <div className="dashboard-cards">
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
