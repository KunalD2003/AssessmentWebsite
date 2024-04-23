import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

const Sidebar = () => {
  return (

    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height:'100%'}}>
    <div className='profile '>

         <a href="#" className="d-flex justify-content-center align-items-center text-white text-decoration-none d-flex">
      <div className='user-icon d-flex justify-content-center align-items-center'>
        <i class='bx bx-user'></i>
        </div>
      </a>
      <span className="fs-4">Priyanka Parihar</span>
      </div>
      <hr />
      
      <ul className="nav nav-pills flex-column mb-auto"> 
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Dashboard</a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">User Data</a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Schedule Exam</a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">User Data</a> 
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-white">Question bank</a> 
        </li>
      </ul>
      <button className="button" style={{ color: "black"}}> 
      Log Out
    </button>
    </div>
  );
};

export default Sidebar;
