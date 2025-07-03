import React, { useState } from 'react';
import '../styles/mytickets.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/userDatabase.css';

const UserDatabase = () => {
  const [staffSearch, setStaffSearch] = useState('');
  const [staffEntries, setStaffEntries] = useState(10);

  const staff = [
    { id: 'ADM001', name: 'John Doe', department: 'IT', speciality: 'Network Mgmt' },
    { id: 'ADM002', name: 'Jane Smith', department: 'HR', speciality: 'Employee Portal' },
    { id: 'ADM003', name: 'Rahul Mehra', department: 'Support', speciality: 'Hardware Setup' },
  ];

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
    s.department.toLowerCase().includes(staffSearch.toLowerCase())
  );

  return (
    <div className="ticketlist-container">
      <h2 className="text-center ticketlist-heading">Database</h2>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center py-3 shadow-sm">User</div>
        </div>
        <div className="col-md-4">
          <div className="card text-center py-3 shadow-sm">Operation Team</div>
        </div>
        <div className="col-md-4">
          <div className="card text-center py-3 shadow-sm">Technical Support</div>
        </div>
      </div>

      <div className="ticketlist-top d-flex justify-content-between align-items-end flex-wrap gap-3 my-3">
        <div className="d-flex align-items-center gap-2">
          <label className="form-label mb-0">Show</label>
          <select
            className="form-select form-select-sm"
            value={staffEntries}
            onChange={(e) => setStaffEntries(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="ms-1">entries</span>
        </div>

        <div className="ticketlist-search">
          <label className="form-label">Find Staff</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={staffSearch}
            onChange={(e) => setStaffSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th><input type="checkbox" className="form-check-input" /></th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Speciality</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaff.slice(0, staffEntries).map((staff, index) => (
            <tr key={index}>
              <td><input type="checkbox" className="form-check-input" /></td>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.department}</td>
              <td>{staff.speciality}</td>
              <td>
                <a href="/edit-profile" className="text-primary me-2">
                  <FontAwesomeIcon icon={faPen} />
                </a>
                <button className="btn btn-sm btn-link text-danger p-0">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDatabase;
