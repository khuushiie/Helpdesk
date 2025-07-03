import React from 'react';
import '../styles/dashboard.css';
import DashboardCards from '../components/DashboardCards';
import OperationDashboard from './OperationDashboard';

const Dashboard = () => {
  const role = localStorage.getItem('role');

  return (
    <div>
      <h2 className="dashboard-header">Dashboard</h2>

      {/* Always show cards */}
      <DashboardCards />

      {/* Only show OperationDashboard for non-user roles */}
      {role !== 'user' && (
        <div className="mt-4">
          <OperationDashboard />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

