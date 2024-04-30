import React from 'react';
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="bg-dark text-white navbar">
      <div className='note mx-auto'>
        <h4 className='welnote '>Welcome to Candidate Assessment Website</h4>
      </div>

      <div className='profile justify-content-center align-items-center'>

        <Link to="/admin" className="d-flex justify-content-center align-items-center text-white text-decoration-none d-flex">
          <div className='user-icon d-flex justify-content-center align-items-center'>
            <i className='bx bx-user'></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;