import React from 'react';
import '../styles/closeticket.css';

const CloseTicket = ({ ticket, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="close-ticket-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h4 className="modal-title text-center mb-3">My Tickets - Close Ticket</h4>

                <div className="row">
                    <div className="col-md-6 d-flex flex-column gap-3">
                        <div>
                            <label>Ticket No.</label>
                            <input type="text" className="form-control" value={ticket?.id || ''} readOnly />
                        </div>
                        <div>
                            <label>Team Name</label>
                            <input type="text" className="form-control" placeholder="Team Alpha" />
                        </div>
                        <div>
                            <label>Team Members</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Add members" />
                                <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label>Remarks</label>
                        <textarea className="form-control" rows="8" placeholder="Add remarks..."></textarea>
                    </div>
                </div>

                <div className="mt-4 text-end">
                    <button className="btn btn-danger">Close Ticket</button>
                </div>
            </div>
        </div>
    );
};

export default CloseTicket;
