import React from 'react';
import './Admin_Dashboard.css';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
function Admin_Dashboard() {
  return (
    <div className="col-12">
    <div className='container-fluid'>
        <div className='col-12'>
            <div className='row justify-content-center'>
                <div className='col-2 px-0'>
                 <Sidebar></Sidebar>
                </div>
                <div className='col-10'>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-12 bg-dark'>
                            <Navbar/>
                        </div>
                        <div className='col-12 bgcolor-skyblue py-3'>
                            <Outlet/>
                        </div>
                        <div className='col-12 position-sticky-bottom bg-dark'>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}
export default Admin_Dashboard