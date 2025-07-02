import React, { useState } from 'react';
import '../styles/myticketoperation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUsers, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import TicketModal from '../components/TicketModal';
import CloseTicketModal from '../components/CloseTicketModal';
import TeamCreationModal from '../components/TeamCreationModal';
import { Link } from 'react-router-dom';

const MyTicketsOperation = () => {
    const [search, setSearch] = useState('');
    const [entries, setEntries] = useState(10);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [closingTicket, setClosingTicket] = useState(null);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [teamTicket, setTeamTicket] = useState(null);


    const tickets = [
        {
            id: 'T001',
            subject: 'Login failed',
            category: 'Access',
            priority: 'High',
            date: '2025-07-01',
            status: 'Closed',
            inCharge: 'Rohit Sharma',
            description: 'User unable to login due to incorrect password error.',
        },
        {
            id: 'T002',
            subject: 'UI issue',
            category: 'UI',
            priority: 'Low',
            date: '2025-06-30',
            status: 'In Progress',
            inCharge: 'Anita Joshi',
            description: 'Navbar overlaps on small screens.',
        },
        {
            id: 'T003',
            subject: 'Password reset',
            category: 'Access',
            priority: 'Medium',
            date: '2025-06-28',
            status: 'On Hold',
            inCharge: 'Karan Patel',
            description: 'Unable to reset password through portal.',
        },
    ];

    const filtered = tickets.filter(ticket =>
        ticket.subject.toLowerCase().includes(search.toLowerCase())
    );

    const handleCloseTicketClick = () => {
        setClosingTicket(selectedTicket);   // save ticket for close
        setSelectedTicket(null);            // hide details modal
        setShowCloseModal(true);
    };

    const handleCloseModal = () => {
        setShowCloseModal(false);
    };

    return (
        <div className="ticketlist-container">
            <h2 className="text-center ticketlist-heading">My Tickets</h2>

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

                                <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedTicket(ticket)}>
                                    <FontAwesomeIcon icon={faFile} />
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => {
                                        setTeamTicket(ticket);
                                        setShowTeamModal(true);
                                        setSelectedTicket(null);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUsers} />
                                </button>

                                <button className="btn btn-sm btn-outline-secondary">
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal to view ticket details */}
            {selectedTicket && !showCloseModal && (
                <TicketModal
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    onUpdateClick={() => console.log('Update Ticket')}
                    onCloseClick={handleCloseTicketClick}
                    showActions={true}
                />
            )}

            {showCloseModal && (
                <CloseTicketModal
                    ticket={closingTicket}
                    onClose={() => {
                        setShowCloseModal(false);
                        setClosingTicket(null);
                    }}
                />
            )}
            {showTeamModal && (
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

export default MyTicketsOperation;
