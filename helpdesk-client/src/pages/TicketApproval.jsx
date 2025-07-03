import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getTickets, approveTicket, rejectTicket, updateTicket } from '../utils/tickets';
import '../styles/ticketapproval.css';

const TicketApproval = () => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data.map(ticket => ({
          _id: ticket._id,
          id: ticket.ticketId,
          subject: ticket.subject,
          category: ticket.category,
          priority: ticket.priority,
          date: new Date(ticket.date).toISOString().split('T')[0],
          assignedTo: ticket.inCharge || '',
          status: ticket.status,
        })));
      } catch (err) {
        setError('Failed to load tickets');
        console.error('Fetch tickets error:', err);
      }
    };
    fetchTickets();
  }, []);

  const handleAssign = async (id, value) => {
    try {
      await updateTicket(id, { inCharge: value });
      setTickets(prev =>
        prev.map(ticket =>
          ticket.id === id ? { ...ticket, assignedTo: value } : ticket
        )
      );
    } catch (err) {
      setError('Failed to assign ticket');
      console.error('Assign ticket error:', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveTicket(id);
      setTickets(prev =>
        prev.map(ticket =>
          ticket.id === id ? { ...ticket, status: 'In Progress' } : ticket
        )
      );
      alert(`Ticket ${id} approved.`);
    } catch (err) {
      setError('Failed to approve ticket');
      console.error('Approve ticket error:', err);
    }
  };

  const handleReject = async (id) => {
    const rejectionReason = prompt('Enter rejection reason:');
    if (rejectionReason !== null) {
      try {
        await rejectTicket(id, rejectionReason);
        setTickets(prev =>
          prev.map(ticket =>
            ticket.id === id ? { ...ticket, status: 'Rejected' } : ticket
          )
        );
        alert(`Ticket ${id} rejected.`);
      } catch (err) {
        setError('Failed to reject ticket');
        console.error('Reject ticket error:', err);
      }
    }
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ticketlist-container">
      <h2 className="text-center ticketlist-heading">Ticket Approval</h2>
      {error && <div className="alert alert-danger">{error}</div>}

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
                  onClick={() => handleApprove(ticket._id)}
                  disabled={ticket.status !== 'Open'}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleReject(ticket._id)}
                  disabled={ticket.status !== 'Open'}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={ticket.assignedTo}
                  onChange={(e) => handleAssign(ticket._id, e.target.value)}
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
