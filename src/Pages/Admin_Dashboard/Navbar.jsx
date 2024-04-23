import React from 'react';
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Navbar = () => {
  return (
    <div className="bg-dark text-white">
      <div className='d-flex justify-content-center align-items-center heading'>
        <h3>Welcome to candidate assesment website</h3>
      </div>
    </div>
  );
};

export default Navbar;