import React from 'react';
import './Sidebar.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../Components/Authentication/images/AveryBit-Full-114.webp'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-logo-div'>
                <img src={logo} alt="" className='sidebar-logo' />
            </div>
            <div className='sidebar-naivgation'>
                <div>
                    <h2><NavLink to="/userid/assessments">Dashboard</NavLink></h2>
                </div>
                <div>
                    <h2><NavLink to="/userid/archivedexams">Archived Exams</NavLink></h2>
                </div>
                <div>
                    <h2><NavLink to="/userid/support">Support</NavLink></h2>
                </div>
            </div>
        </div>
    );
};



export default Sidebar;
