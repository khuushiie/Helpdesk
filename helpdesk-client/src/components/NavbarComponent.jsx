import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <nav className="navbar-custom d-flex align-items-center justify-content-between px-4">
      <h5 className="mb-0 fw-bold text-white fs-2"><i>Helpdesk </i></h5>
      <div className="d-flex align-items-center gap-4">
        <p className='bm-bi'><span className="bm">BM</span><span className="bi ">BI</span></p>
        <i className="fa-solid fa-bell icon"></i>
        <Link to="/edit-profile"><i className="fa-solid fa-user icon"></i></Link>
        <Link to="/"><i className="fa-solid fa-right-from-bracket icon"></i></Link>
      </div>
    </nav>
  );
};

export default NavbarComponent;
