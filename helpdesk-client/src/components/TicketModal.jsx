import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { updateTicket, closeTicket } from '../utils/tickets';
import '../styles/ticketmodal.css';

const TicketModal = ({ ticket, onClose, onCloseClick, onUpdateClick, showActions = false }) => {
  const [rating, setRating] = useState(ticket?.rating || 0);
  const [error, setError] = useState('');

  if (!ticket || !ticket._id) {
    return (
      <div className="modal-overlay">
        <div className="ticket-modal">
          <button className="close-btn" onClick={onClose}>×</button>
          <h4 className="modal-title text-center mb-4">Error</h4>
          <div className="modal-content">
            <p className="text-danger">No valid ticket data available.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleUpdateTicket = async () => {
    try {
      await updateTicket(ticket._id, { rating });
      onUpdateClick();
      setError('');
    } catch (err) {
      setError('Failed to update ticket rating');
      console.error('Update ticket error:', err);
    }
  };

  const handleCloseTicket = async () => {
    try {
      await closeTicket(ticket._id, rating, '');
      onCloseClick();
      setError('');
    } catch (err) {
      setError('Failed to close ticket');
      console.error('Close ticket error:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="ticket-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4 className="modal-title text-center mb-4">Ticket Details</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="modal-content">
          <p><strong>Ticket No:</strong> {ticket.id || ticket.ticketId || 'N/A'}</p>
          <p><strong>Date:</strong> {ticket.date || 'N/A'}</p>
          <p><strong>Name:</strong> {ticket.name || 'N/A'}</p>
          <p><strong>Department:</strong> {ticket.dept || ticket.department || 'N/A'}</p>
          <p><strong>Title:</strong> {ticket.subject || 'N/A'}</p>
          <p><strong>Description:</strong> {ticket.description || 'No description provided.'}</p>
          <p><strong>Category:</strong> {ticket.category || 'General'}</p>
          <p><strong>Type:</strong> {ticket.type || 'Issue'}</p>
          <p><strong>Priority:</strong> {ticket.priority || 'Medium'}</p>
          <p><strong>Status:</strong> {ticket.status || 'N/A'}</p>
          <p><strong>Attachment:</strong> {ticket.attachment || 'None'}</p>
          <div>
            <strong>Rating:</strong>
            <span>
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={i < rating ? 'text-warning' : 'text-muted'}
                  style={{ cursor: 'pointer', fontSize: '1.5rem', marginLeft: '5px' }}
                  onClick={() => handleRatingClick(i + 1)}
                />
              ))}
            </span>
          </div>
        </div>
        {showActions && (
          <div className="modal-actions d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={handleUpdateTicket}
            >
              Update Ticket
            </button>
            <button
              className="btn btn-danger"
              onClick={handleCloseTicket}
            >
              Close Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
