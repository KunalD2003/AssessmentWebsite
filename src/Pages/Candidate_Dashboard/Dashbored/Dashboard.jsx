import React from 'react';
import Footer from './Footer';
import Hero_section from './Hero_section';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
function Dashboard() {
  return (<>
    <div className='col-12  ' >
        <div className='container'>
        <div className='row justify-content-center align-items-center'>
            <div className='col-md-2 px-0' style={{ overflowY: 'auto' }}>
                <Sidebar></Sidebar>
            </div>
            <div className='col-10 px-0'>
                <div className='col-12'>
                    <div className='row '>
                        <div className='col-12'>
                            <Navbar />
                        </div>
                        <div className='col-12'>
                           <Hero_section></Hero_section>
                        </div>
                        <div className='col-12'>
                            <Footer></Footer>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard