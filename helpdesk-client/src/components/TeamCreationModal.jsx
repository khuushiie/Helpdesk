import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { createTeam } from '../utils/tickets';
import '../styles/closeticket.css';

const TeamCreationModal = ({ ticket, onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!ticket) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const membersArray = teamMembers.split(',').map(member => member.trim()).filter(member => member);
      await createTeam(ticket._id, { teamName, teamMembers: membersArray });
      setSuccess('Team created successfully!');
      setTeamName('');
      setTeamMembers('');
      setTimeout(onClose, 1000);
    } catch (err) {
      setError('Failed to create team');
      console.error('Create team error:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="close-ticket-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4 className="text-center mb-4">My Ticket - Team Creation</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Team Members</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter member name(s), comma-separated"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    required
                  />
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3 h-100 d-flex flex-column">
                <label className="form-label">Remarks</label>
                <textarea
                  className="form-control flex-grow-1"
                  placeholder="Write remarks here..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="text-end mt-4">
            <button type="submit" className="btn btn-success">Create Team</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamCreationModal;
