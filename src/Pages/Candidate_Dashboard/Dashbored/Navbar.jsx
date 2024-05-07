import React from 'react';
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import logOut from '../../../assets/img/power.png';
import { height, width } from '@fortawesome/free-brands-svg-icons/fa42Group';

const Navbar = () => {

  return (
    <div className='navbar-candidate'>
      <h2>Welcome to Candidate Assessment Website</h2>
      
      <div className='user-btn-div'>
        <Link to="/userid/profile"><i className='bx bx-user'></i></Link>
      </div>
      <Link to="/" className='logOut'>
      
        <h5 className='logOutText'>LogOut</h5>
      
      </Link>
      

    </div>
  );
};

export default Navbar;