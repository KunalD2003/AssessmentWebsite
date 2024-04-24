import React from 'react';
import './Sidebar.css'; // Ensure this CSS file has the correct styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo.png'
const Sidebar = () => {
  return (
    <>
 <div className="d-flex flex-column flex-shrink-0 text-white bg-dark" style={{ height: '100%' }}>
      {/* Center the logo horizontally */}
      <div className="d-flex justify-content-center"> {/* Flexbox for horizontal centering */}
        <img src={logo} alt="Company Logo" className="logo" /> {/* Adjust width as needed */}
      </div>
      <hr />
      
      <ul className="nav nav-pills flex-column mb-auto justify-content-center align-items-center"> 
        <li className="nav-item">
          <NavLink to="" className="nav-link text-white"><h4>Dashboard</h4></NavLink> 
        </li>
       
        <li className="nav-item">
          <NavLink to="/archievedexams" className="nav-link text-white"><h4>Archived Exams</h4></NavLink> 
        </li>
        <li className="nav-item">
          <NavLink to="/support" className="nav-link text-white"><h4>Support</h4></NavLink> 
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link text-white"><h4>Settings</h4></NavLink> 
        </li>
      </ul>
    
      {/* <button className="button" style={{ color: "black"}}> 
      Log Out
    </button> */}
    </div>
    </>
  );
};



export default Sidebar;
