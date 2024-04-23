import React from 'react';
import './Sidebar.css'; // Ensure this CSS file has the correct styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <>
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height:'100%'}}>
    <div className='profile justify-content-center align-items-center'>

         <a href="#" className="d-flex justify-content-center align-items-center text-white text-decoration-none d-flex">
      <div className='user-icon d-flex justify-content-center align-items-center'>
        <i class='bx bx-user'></i>
        </div>
      </a>
      <span className="fs-4 user ">Priyanka Parihar</span>
      </div>
      <hr />
      
      <ul className="nav nav-pills flex-column mb-auto justify-content-center align-items-center"> 
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Dashboard</a> 
        </li>
       
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Archived Exams</a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Support</a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Settings</a> 
        </li>
      </ul>
      <button className="button" style={{ color: "black"}}> 
      Log Out
    </button>
    </div>
    </>
  );
};



export default Sidebar;
