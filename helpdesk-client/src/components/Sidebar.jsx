import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const [showUserSubmenu, setShowUserSubmenu] = useState(false);

  useEffect(() => {
    const updateRole = () => {
      const storedRole = localStorage.getItem('role');
      if (storedRole) {
        setRole(storedRole.toLowerCase());
      }
    };

    updateRole(); 
    window.addEventListener('storage', updateRole);
    return () => window.removeEventListener('storage', updateRole);
  }, []);

  const toggleUserSubmenu = () => setShowUserSubmenu(!showUserSubmenu);

  return (
    <aside className="sidebar p-3">
      <ul className="list-unstyled">
        <li>
          <Link to="/dashboard" className="sidebar-link fs-5">
            <i className="fa-solid fa-box"></i> Dashboard
          </Link>
        </li>
        {role === 'user' && (
          <>
            <li>
              <Link to="/tickets" className="sidebar-link fs-5">
                <i className="fa-solid fa-ticket"></i> My Tickets
              </Link>
            </li>
            <li>
              <Link to="/newticket" className="sidebar-link fs-5">
                <i className="fa-solid fa-file-circle-plus"></i> New Ticket
              </Link>
            </li>
          </>
        )}

        {role === 'technicalsupport' && (
          <>
            <li>
              <Link to="/tickets" className="sidebar-link fs-5">
                <i className="fa-solid fa-ticket"></i> My Tickets
              </Link>
            </li>
            <li>
              <Link to="/performance" className="sidebar-link fs-5">
                <i className="fa-solid fa-chart-line"></i> Performance
              </Link>
            </li>
          </>
        )}

        {role === 'operationteam' && (
          <>
            <li>
              <Link to="/ticket-approval" className="sidebar-link fs-5">
                <i className="fa-solid fa-circle-check"></i> Ticket Approval
              </Link>
            </li>
            <li>
              <Link to="/operation/mytickets" className="sidebar-link fs-5">
                <i className="fa-solid fa-ticket"></i> My Tickets
              </Link>
            </li>
            <li>
              <Link to="/performance" className="sidebar-link fs-5">
                <i className="fa-solid fa-chart-line"></i> Performance
              </Link>
            </li>
          </>
        )}
        {role === 'admin' && (
          <>
            <li onClick={toggleUserSubmenu} style={{ cursor: 'pointer' }}>
              <span className="sidebar-link fs-5">
                <i className="fa-solid fa-database"></i> Database
                <i className={`fa-solid float-end ${showUserSubmenu ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </span>
            </li>
            {showUserSubmenu && (
              <>
                <li className="ms-4">
                  <Link to="/user-database" className="sidebar-link fs-6">
                    <i className="fa-solid fa-user"></i> User
                  </Link>
                </li>
                <li className="ms-4">
                  <Link to="/user-database" className="sidebar-link fs-6">
                    <i class="fa-solid fa-user-plus"></i> Operation Team
                  </Link>
                </li>
                <li className="ms-4">
                  <Link to="/user-database" className="sidebar-link fs-6">
                    <i class="fa-solid fa-phone"></i> Technical Support
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/settings" className="sidebar-link fs-5">
                <i className="fa-solid fa-gear"></i> Settings
              </Link>
            </li>
            <li>
              <Link to="/user-history" className="sidebar-link fs-5">
                <i className="fa-solid fa-clipboard-list"></i> User Log History
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;