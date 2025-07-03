import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { closeTicket } from '../utils/tickets';
import '../styles/closeticket.css';

const CloseTicket = ({ ticket, onClose }) => {
    const [rating, setRating] = useState(0);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState('');
    const [remarks, setRemarks] = useState('');
    const [error, setError] = useState('');

    if (!ticket) return null;

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleCloseTicket = async () => {
        try {
            await closeTicket(ticket._id, rating, remarks);
            onClose();
        } catch (err) {
            setError('Failed to close ticket');
            console.error('Close ticket error:', err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="close-ticket-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h4 className="modal-title text-center mb-3">My Tickets - Close Ticket</h4>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row">
                    <div className="col-md-6 d-flex flex-column gap-3">
                        <div>
                            <label>Ticket No.</label>
                            <input type="text" className="form-control" value={ticket.id || ''} readOnly />
                        </div>
                        <div>
                            <label>Team Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Team Alpha"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Team Members</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add members (comma-separated)"
                                    value={teamMembers}
                                    onChange={(e) => setTeamMembers(e.target.value)}
                                />
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </div>
                        <div>
                            <label>Rate this ticket:</label>
                            <div>
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={i < rating ? 'text-warning' : 'text-muted'}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '5px' }}
                                        onClick={() => handleRatingClick(i + 1)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label>Remarks</label>
                        <textarea
                            className="form-control"
                            rows="8"
                            placeholder="Add remarks..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="mt-4 text-end">
                    <button className="btn btn-danger" onClick={handleCloseTicket}>
                        Close Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CloseTicket;
