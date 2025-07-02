import React, { useState } from 'react';
import '../styles/userloghistory.css';

const UserLogHistory = () => {
    const [entries, setEntries] = useState(10);
    const [search, setSearch] = useState('');

    const logs = [
        {
            id: 1,
            signin: '2025-07-01 09:00',
            staffId: 'ADM001',
            department: 'IT',
            activity: 'Login',
            signout: '2025-07-01 18:00',
        },
        {
            id: 2,
            signin: '2025-07-01 10:30',
            staffId: 'ADM002',
            department: 'HR',
            activity: 'Login',
            signout: '2025-07-01 17:00',
        },
        {
            id: 3,
            signin: '2025-07-01 11:00',
            staffId: 'ADM003',
            department: 'Support',
            activity: 'Logout',
            signout: '2025-07-01 16:00',
        },
    ];

    const filteredLogs = logs.filter(log =>
        log.staffId.toLowerCase().includes(search.toLowerCase()) ||
        log.department.toLowerCase().includes(search.toLowerCase()) ||
        log.activity.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="userlog-container container-fluid">
            <h2 className="text-center userlog-heading">User Log History</h2>

            <div className="userlog-top row justify-content-between align-items-end flex-wrap gap-3 my-3">
                <div className="col-md-4 d-flex align-items-center gap-2">
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

                <div className="col-md-4 userlog-search">
                    <label className="form-label">Search</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Sign-in Date/Time</th>
                            <th>Staff ID</th>
                            <th>Department</th>
                            <th>Activity</th>
                            <th>Sign-out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.slice(0, entries).map((log, index) => (
                            <tr key={log.id}>
                                <td>{index + 1}</td>
                                <td>{log.signin}</td>
                                <td>{log.staffId}</td>
                                <td>{log.department}</td>
                                <td>{log.activity}</td>
                                <td>{log.signout}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserLogHistory;
