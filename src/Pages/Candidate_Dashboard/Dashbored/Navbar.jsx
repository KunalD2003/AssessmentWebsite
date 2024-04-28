import React from 'react';
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className='navbar-candidate'>
      <h2>Welcome to Candidate Assessment Website</h2>
      <div className='user-btn-div'>
        <Link to="/user"><i className='bx bx-user'></i></Link>
      </div>
    </div>
  );
};

export default Navbar;