import React from 'react';
import './Sidebar.css'; // Ensure this CSS file has the correct styles
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <a href="#" className="nav-link text-white"><h4>Dashboard</h4></a> 
        </li>
       
        <li className="nav-item">
          <a href="#" className="nav-link text-white"><h4>Archived Exams</h4></a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white"><h4>Support</h4></a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white"><h4>Settings</h4></a> 
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
