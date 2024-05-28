import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../Components/Authentication/images/AveryBit-Full-114.webp'
const Sidebar = () => {
    return (
        <div className='sidebar' style={{position:"fixed",width:'18%'}}>
            <div className='sidebar-logo-div'>
                <img src={logo} alt="" className='sidebar-logo' />
            </div>
            <div className='sidebar-naivgation'>
                <div>
                    <h4><NavLink to="/userid/assessments">Dashboard</NavLink></h4>
                </div>
                <div>
                    <h4><NavLink to="/userid/archivedexams">Archived Exams</NavLink></h4>
                </div>
                <div>
                    <h4><NavLink to="/userid/support">Support</NavLink></h4>
                </div>
            </div>
        </div>
    );
};



export default Sidebar;
