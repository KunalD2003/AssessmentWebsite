import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';


function Admin_Dashboard() {
  return (
    <div className="col-12">
    <div className='container'>
        <div className='col-12 '>
            <div className='row justify-content-center'>
                <div className='col-2 px-0  '>
                 <Sidebar></Sidebar>
                </div>
                <div className='col-10 px-0 '>
                
                    <div className='row justify-content-center align-items-center'>
                        <div className='col-12'>
                            <Navbar/>
                        </div>
                        <div className='col-12'>
                            <Hero/>
                        </div>
                        <div className='col-12 '>
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

