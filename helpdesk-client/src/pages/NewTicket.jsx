import React from 'react';
import '../styles/newticket.css';

const NewTicket = () => {
  return (
    <div className="container newticket-container my-4">
      <h2 className="text-center mb-5 fw-bold">Create New Ticket</h2>

      {/* Row 1 - Two columns with two fields each */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Ticket No.</label>
          <input type="text" className="form-control mb-3" placeholder="Enter ticket number" />

          <label className="form-label">Name</label>
          <input type="text" className="form-control" placeholder="Enter your name" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input type="date" className="form-control mb-3" />

          <label className="form-label">Department</label>
          <input type="text" className="form-control" placeholder="Enter department" />
        </div>
      </div>

      {/* Row 2 - Subject full width */}
      <div className="mb-4">
        <label className="form-label">Subject</label>
        <input type="text" className="form-control" placeholder="Enter subject" />
      </div>

      {/* Row 3 - Left fields and right textarea */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select className="form-select mb-3">
            <option>Select Category</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Network</option>
          </select>

          <label className="form-label">Type</label>
          <select className="form-select mb-3">
            <option>Select Type</option>
            <option>Bug</option>
            <option>Issue</option>
            <option>Request</option>
          </select>

          <label className="form-label">Priority</label>
          <select className="form-select">
            <option>Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="8"
            placeholder="Describe the issue in detail"
          ></textarea>
        </div>
      </div>

      {/* Row 4 - Bottom row */}
      <div className="row mt-4 align-items-center">
        <div className="col-md-6 d-flex flex-column align-items-start gap-2">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="robotCheck" />
            <label className="form-check-label" htmlFor="robotCheck">
              I'm not a robot
            </label>
          </div>
          <small className="text-muted">By submitting, you agree to our Privacy Terms.</small>
        </div>

        <div className="col-md-6 text-end">
          <button className="btn px-5 submit">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
