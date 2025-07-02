import React from 'react';
import '../styles/dashboard.css';
import DashboardCards from '../components/DashboardCards';

const Dashboard = () => {
  return (
    <div>
      <h2 className="dashboard-header">Dashboard</h2>
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
