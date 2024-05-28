import React from 'react';
import './Dashboard.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
function Dashboard() {
    return (
        <div className='user-side-dashboard'>
            <div className='sidebar-outer-div'>
                <Sidebar />
            </div>
            <div className='rest-section'>
                <div className='navbar-outer-div'>
                    <Navbar />
                </div>
                <div className='hero-section'>
                    <Outlet />
                </div>
                <div className='footer-outer-div'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}




export default Dashboard