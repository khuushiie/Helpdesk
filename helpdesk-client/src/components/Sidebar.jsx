import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const role = localStorage.getItem('role'); // 'admin', 'technical', 'operation'
  const [showUserSubmenu, setShowUserSubmenu] = useState(false);

  const toggleUserSubmenu = () => setShowUserSubmenu(!showUserSubmenu);

  return (
    <aside className="sidebar p-3">
      <ul className="list-unstyled">

        {/* Common Dashboard */}
        <li>
          <Link to="/dashboard" className="sidebar-link fs-4">
            <i className="fa-solid fa-box"></i> &nbsp; Dashboard
          </Link>
        </li>

        {/* Technical Support Role */}
        {role === 'technical' && (
          <>
            <li>
              <Link to="/tickets" className="sidebar-link fs-4">
                <i className="fa-solid fa-ticket"></i> &nbsp; My Tickets
              </Link>
            </li>
            <li>
              <Link to="/performance" className="sidebar-link fs-4">
                <i className="fa-solid fa-chart-line"></i> &nbsp; Performance
              </Link>
            </li>
          </>
        )}

        {/* Operation Role */}
        {role === 'operation' && (
          <>
            <li>
              <Link to="/ticket-approval" className="sidebar-link fs-4">
                <i className="fa-solid fa-circle-check"></i> &nbsp; Ticket Approval
              </Link>
            </li>
            <li>
              <Link to="/operation/mytickets" className="sidebar-link fs-4">
                <i className="fa-solid fa-ticket"></i>&nbsp; My Tickets
              </Link>

            </li>
            <li>
              <Link to="/performance" className="sidebar-link fs-4">
                <i className="fa-solid fa-chart-line"></i> &nbsp; Performance
              </Link>
            </li>
          </>
        )}

        {/* Admin Role */}
        {role === 'admin' && (
          <>
            <li onClick={toggleUserSubmenu} style={{ cursor: 'pointer' }}>
              <span className="sidebar-link fs-4">
                <i className="fa-solid fa-database"></i> &nbsp; Database
                <i className={`fa-solid float-end ${showUserSubmenu ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </span>
            </li>

            {/* Nested Submenu under Database > User */}
            {showUserSubmenu && (
              <>
                <li className="ms-4">
                  <Link to="/user-database" className="sidebar-link fs-5">
                    <i className="fa-solid fa-user"></i> &nbsp; User
                  </Link>
                </li>
                <li className="ms-5">
                  <Link to="/user-database" className="sidebar-link fs-6">
                    - Operation Team
                  </Link>
                </li>
                <li className="ms-5">
                  <Link to="/user-database" className="sidebar-link fs-6">
                    - Technical Support
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/settings" className="sidebar-link fs-4">
                <i className="fa-solid fa-gear"></i> &nbsp; Settings
              </Link>
            </li>

            <li>
              <Link to="/user-history" className="sidebar-link fs-4">
                <i className="fa-solid fa-clipboard-list"></i> &nbsp; User Log
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
