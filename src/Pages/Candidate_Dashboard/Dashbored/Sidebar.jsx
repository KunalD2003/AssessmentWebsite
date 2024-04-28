import React from 'react';
import './Sidebar.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo.png'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-logo-div'>
                <img src="src/assets/img/logo.png" alt="" className='sidebar-logo' />
            </div>
            <div className='sidebar-naivgation'>
                <div>
                    <h2><NavLink to="">Dashboard</NavLink></h2>
                </div>
                <div>
                    <h2><NavLink to="/archivedexams">Archived Exams</NavLink></h2>
                </div>
                <div>
                    <h2><NavLink to="/support">Support</NavLink></h2>
                </div>
            </div>
        </div>
    );
};



export default Sidebar;
