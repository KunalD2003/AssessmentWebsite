import React from 'react';
import './Dashboard.css';
import Footer from './Footer';
import Hero_section from './Hero_section';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
function Dashboard() {

<<<<<<< HEAD
  return (
<>
    {/* <div className='container-fluid'>
        <div className='col'>
            <div className='row justify-content-center'>
            <div className='col-12 bg-dark '>
                            <Navbar/>
                        </div>
                        </div>
            <div className='row justify-content-center align-items-center '>            
                <div className='col-2  px-0'>
                 <Sidebar></Sidebar>
                </div>
                <div className='col-10 '>
                        <div className='col-12 bgcolor-skyblue py-3'>
                            <Outlet />
                        </div>
=======
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
>>>>>>> ae154594bf3d5e6ff24a2d5a385a09bef357b03e
                </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-12 position-sticky-bottom bg-dark'>
                        <Footer/>
                    </div>
                    </div>
        
            
        </div>
<<<<<<< HEAD
    </div> */}
    {/* <div class="container">
  <div class="row">
    <Navbar/>
  </div>
  <div class="row">
    <div class="col-sm-2"><Sidebar/></div>
    <div class="col-sm"><Outlet/></div>
    
  </div>
  <div class= "row">
  <div class="col-sm"><Footer/></div>
  </div>
</div> */}

{/* <div className="container-fluid d-flex flex-column  dash-bg"> 
      <div className="row px-0">
        <Navbar />
      </div>
      <div className="row "> 
        <div className="col-sm-2 px-0"> 
          <Sidebar />
        </div>
        <div className="col-sm px-0"> 
          <Outlet />
        </div>
      </div>
      <div className="row "> 
        <div className="col-sm px-0">
          <Footer />
        </div>
      </div>
    </div> */}

    <div className="dashboard d-flex flex-column min-vh-100"> {/* Root container */}
      <div className="navbar"> {/* Navbar section */}
        <Navbar />
      </div>
      <div className="content d-flex flex-row flex-grow-1"> {/* Main content area with sidebar */}
        <div className="sidebar"> {/* Sidebar */}
          <Sidebar />
        </div>
        <div className="main-content"> {/* Main content */}
          <Outlet />
        </div>
      </div>
      <div className="footer"> {/* Footer section */}
        <Footer />
      </div>
    </div>


    </>
  )
=======
    )
>>>>>>> ae154594bf3d5e6ff24a2d5a385a09bef357b03e
}




export default Dashboard