import React from 'react';
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Navbar = () => {
 
  return (
    <div className="bg-dark text-white navbar">
    <div className='note mx-auto'>
      <h4 className='welnote '>Welcome to Candidate Assessment Test</h4>
    </div>
   
      <div className='profile justify-content-center align-items-center'>

<a href="#" className="d-flex justify-content-center align-items-center text-white text-decoration-none d-flex">
<div className='user-icon d-flex justify-content-center align-items-center'>
<i class='bx bx-user'></i>
</div>
</a>
</div>
    </div>
  );
};

export default Navbar;