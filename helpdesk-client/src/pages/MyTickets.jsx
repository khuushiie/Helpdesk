import React, { useState } from 'react';
import '../styles/mytickets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import TicketModal from '../components/TicketModal';

const TicketList = () => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: 'T001',
      subject: 'Login failed',
      status: 'In Progress',
      support: 'Anita',
      date: '2025-07-01',
      rating: 3,
      name: 'John Doe',
      dept: 'IT',
      description: 'User unable to login due to incorrect password error.',
      category: 'Access',
      type: 'Bug',
      priority: 'High',
      attachment: 'error_screenshot.png'
    },
    {
      id: 'T002',
      subject: 'UI issue',
      status: 'Closed',
      support: 'Rahul',
      date: '2025-06-30',
      rating: 4,
      name: 'Jane Smith',
      dept: 'Design',
      description: 'Navbar overlaps on small screens.',
      category: 'UI',
      type: 'Bug',
      priority: 'Low',
      attachment: 'ui_issue.png'
    },
    {
      id: 'T003',
      subject: 'Password reset',
      status: 'On Hold',
      support: 'Maya',
      date: '2025-06-28',
      rating: 2,
      name: 'Emily Parker',
      dept: 'HR',
      description: 'Unable to reset password through portal.',
      category: 'Access',
      type: 'Support',
      priority: 'Medium',
      attachment: ''
    },
  ];

  const filtered = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ticketlist-container">
      <h2 className="text-center ticketlist-heading">List of Tickets</h2>

      <div className="ticketlist-top d-flex justify-content-between align-items-end flex-wrap gap-3 my-3">
        <div className="d-flex align-items-center gap-2">
          <label className="form-label mb-0">Show</label>
          <select
            className="form-select form-select-sm"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="ms-1">entries</span>
        </div>

        <div className="ticketlist-search">
          <label className="form-label">Find Ticket</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Ticket No.</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Support By</th>
            <th>Date</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, entries).map(ticket => (
            <tr
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              style={{ cursor: 'pointer' }}
            >
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>
                <span className={`status-badge ${ticket.status.replace(/\s/g, '').toLowerCase()}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.support}</td>
              <td>{ticket.date}</td>
              <td>
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < ticket.rating ? 'text-warning' : 'text-muted'}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
};

export default TicketList;
