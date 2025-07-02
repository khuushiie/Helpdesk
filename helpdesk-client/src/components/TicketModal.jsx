import React from 'react';
import '../styles/ticketmodal.css';

const TicketModal = ({ ticket, onClose, onCloseClick, onUpdateClick, showActions = false }) => {
  if (!ticket) return null;

  return (
    <div className="modal-overlay">
      <div className="ticket-modal">
        {/* Close Modal */}
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Modal Title */}
        <h4 className="modal-title text-center mb-4">Ticket Details</h4>

        {/* Ticket Information */}
        <div className="modal-content">
          <p><strong>Ticket No:</strong> {ticket.id}</p>
          <p><strong>Date:</strong> {ticket.date}</p>
          <p><strong>Name:</strong> {ticket.name || 'N/A'}</p>
          <p><strong>Department:</strong> {ticket.dept || 'N/A'}</p>
          <p><strong>Title:</strong> {ticket.subject}</p>
          <p><strong>Description:</strong> {ticket.description || 'No description provided.'}</p>
          <p><strong>Category:</strong> {ticket.category || 'General'}</p>
          <p><strong>Type:</strong> {ticket.type || 'Issue'}</p>
          <p><strong>Priority:</strong> {ticket.priority || 'Medium'}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Attachment:</strong> {ticket.attachment || 'None'}</p>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="modal-actions d-flex justify-content-between mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={onUpdateClick}
            >
              Update Ticket
            </button>
            <button
              className="btn btn-danger"
              onClick={onCloseClick}
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
