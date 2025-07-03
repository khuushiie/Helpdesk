import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUsers, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import TicketModal from '../components/TicketModal';
import CloseTicketModal from '../components/CloseTicketModal';
import TeamCreationModal from '../components/TeamCreationModal';
import { getTickets } from '../utils/tickets';
import '../styles/myticketoperation.css';

const TicketList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closingTicket, setClosingTicket] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamTicket, setTeamTicket] = useState(null);
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
          date: new Date(ticket.createdAt || ticket.date).toISOString().split('T')[0],
          status: ticket.status,
          inCharge: ticket.inCharge || 'Unassigned',
          description: ticket.description,
          rating: ticket.rating || 0,
          name: ticket.createdBy?.username || 'Unknown',
          dept: ticket.department || 'N/A',
          type: ticket.type || 'Issue',
          attachment: ticket.attachment || 'None',
        })));
      } catch (err) {
        setError('Failed to load tickets');
        console.error('Fetch tickets error:', err);
      }
    };
    fetchTickets();
  }, [navigate]);

  const filtered = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleCloseTicketClick = () => {
    setShowCloseModal(true);
  };

  const handleUpdateTicketClick = () => {
    setSelectedTicket(null);
    console.log('Update Ticket clicked for:', closingTicket);
  };

  const handleViewTicketClick = (ticket) => {
    if (ticket) {
      setSelectedTicket(ticket);
      setClosingTicket(ticket);
    }
  };

  return (
    <div className="ticketlist-container">
      <h2 className="text-center ticketlist-heading">My Tickets</h2>
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
            <th>Status</th>
            <th>Person In Charge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, entries).map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.date}</td>
              <td>
                <span className={`status-badge ${ticket.status.replace(/\s/g, '').toLowerCase()}`}>
                  {ticket.status}
                </span>
              </td>
              <td>{ticket.inCharge}</td>
              <td className="d-flex justify-content-center gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewTicketClick(ticket)}
                >
                  <FontAwesomeIcon icon={faFile} />
                </button>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => {
                    setTeamTicket(ticket);
                    setShowTeamModal(true);
                    setSelectedTicket(null);
                    setClosingTicket(null);
                  }}
                >
                  <FontAwesomeIcon icon={faUsers} />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleViewTicketClick(ticket)}
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => {
            setSelectedTicket(null);
            setClosingTicket(null);
          }}
          onUpdateClick={handleUpdateTicketClick}
          onCloseClick={handleCloseTicketClick}
          showActions={true}
        />
      )}

      {showCloseModal && closingTicket && (
        <CloseTicketModal
          ticket={closingTicket}
          onClose={() => {
            setShowCloseModal(false);
            setClosingTicket(null);
          }}
        />
      )}
      {showTeamModal && teamTicket && (
        <TeamCreationModal
          ticket={teamTicket}
          onClose={() => {
            setShowTeamModal(false);
            setTeamTicket(null);
          }}
        />
      )}
    </div>
  );
};

export default TicketList;
