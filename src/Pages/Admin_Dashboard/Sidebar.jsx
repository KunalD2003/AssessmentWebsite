

import React from 'react';
import './Sidebar.css'; // Ensure this CSS file has the correct styles
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/Alogo.png';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 text-white bg-dark" style={{ height: '100%' }}>
        {/* Center the logo horizontally */}
        <div className="d-flex justify-content-center"> {/* Flexbox for horizontal centering */}
          <img src={logo} alt="Company Logo" className="logo" /> {/* Adjust width as needed */}
        </div>

        <ul className="nav nav-pills flex-column mb-auto justify-content-center align-items-center">
          <li className="nav-item">
            <Link to="" className="nav-link text-white"><h4>Dashboard</h4></Link>
          </li>

          <li className="nav-item">
            <Link to="/userdata" className="nav-link text-white"><h4>User Data</h4></Link>
          </li>
          <li className="nav-item">
            <Link to="/scheduleexam" className="nav-link text-white"><h4>Schedule Exam</h4></Link>
          </li>
          <li className="nav-item">
            <Link to="/questionbank" className="nav-link text-white"><h4>Question bank</h4></Link>
          </li>
          <li className="nav-item">
            <Link to="/supportDesk" className="nav-link text-white"><h4>Support Desk</h4></Link>
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