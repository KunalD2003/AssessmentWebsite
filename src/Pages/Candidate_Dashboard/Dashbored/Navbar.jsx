import React from 'react';
import './Navbar.css';

const Navbar = ({ user }) => {
  return (
    <div className="container">
        <div className="user-details">
          <span className="user-name">Priyanks Parihar</span>
          <span className="user-email">priyankaparihar421@gmail.com</span>
        </div>  
      
    </div>
  );
};

export default Navbar;
