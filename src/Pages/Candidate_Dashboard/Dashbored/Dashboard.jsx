import React from 'react';
import './Dashbored.css';
import Footer from './Footer';
import Hero_section from './Hero_section';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
function Dashboard() {
   

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
                        <div className='col-12 bgcolor-skyblue vh-100 py-3'>
                           <Hero_section></Hero_section>
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


 

export default Dashboard