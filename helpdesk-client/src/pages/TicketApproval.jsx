import React, { useState } from 'react';
import '../styles/ticketapproval.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const TicketApproval = () => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [tickets, setTickets] = useState([
    {
      id: 'T001',
      subject: 'Network issue',
      category: 'Network',
      priority: 'High',
      date: '2025-07-01',
      assignedTo: '',
    },
    {
      id: 'T002',
      subject: 'Email not working',
      category: 'IT',
      priority: 'Medium',
      date: '2025-06-30',
      assignedTo: '',
    },
    {
      id: 'T003',
      subject: 'Password reset',
      category: 'Access',
      priority: 'Low',
      date: '2025-06-29',
      assignedTo: '',
    },
  ]);

  const handleAssign = (id, value) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, assignedTo: value } : ticket
      )
    );
  };

  const handleApprove = (id) => {
    alert(`Ticket ${id} approved.`);
  };

  const handleReject = (id) => {
    alert(`Ticket ${id} rejected.`);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ticketlist-container">
      <h2 className="text-center ticketlist-heading">Ticket Approval</h2>

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
            <th>Category</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Action</th>
            <th>Assign To</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.slice(0, entries).map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.date}</td>
              <td className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleApprove(ticket.id)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleReject(ticket.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={ticket.assignedTo}
                  onChange={(e) => handleAssign(ticket.id, e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Anita Joshi">Anita Joshi</option>
                  <option value="Rohit Sharma">Rohit Sharma</option>
                  <option value="Karan Patel">Karan Patel</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketApproval;
