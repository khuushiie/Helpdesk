import React from 'react';
import '../styles/closeticket.css';

const TeamCreationModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="modal-overlay">
      <div className="close-ticket-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4 className="text-center mb-4">My Ticket - Team Creation</h4>

        <div className="row g-3">
          {/* Left Section */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Ticket No.</label>
              <input
                type="text"
                className="form-control"
                value={ticket.id}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input type="text" className="form-control" placeholder="Enter team name" />
            </div>

            <div className="mb-3">
              <label className="form-label">Team Members</label>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter member name(s)" />
                <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6">
            <div className="mb-3 h-100 d-flex flex-column">
              <label className="form-label">Remarks</label>
              <textarea className="form-control flex-grow-1" placeholder="Write remarks here..."></textarea>
            </div>
          </div>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-success">Create Team</button>
        </div>
      </div>
    </div>
  );
};

export default TeamCreationModal;
