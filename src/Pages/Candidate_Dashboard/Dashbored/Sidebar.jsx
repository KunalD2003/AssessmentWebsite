import React from 'react';
import './Sidebar.css'; // Ensure this CSS file has the correct styles
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center"> {/* Corrected class name */}
        <div className="col-12 side-navbar"> {/* Main sidebar container */}
          <div className="profile-pic"> {/* Profile section */}
            <img
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="profile-pic"
              className="user-profile-pic"
            />
            <h4>Priyanka Parihar</h4>
          </div>
          <div className="sidebar-nav"> {/* Navigation links */}
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link">Archived Exams</a>
            <a href="#" className="nav-link">Support</a>
            <a href="#" className="nav-link">Settings</a>
          </div>
          <div className="actions"> {/* Action buttons */}
            <button className="logout-button">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
