import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Hero.css';

const Hero = () => {
  return (
    <div className='col-12'>
    <div className="container text-white cards">
     <div className="row justify-content-center align-item-center"> 
     <div className="col-12 col-md-4 p-4">
      <div className="card">
        <div className="card-body text-center">
          {/* Use Bootstrap Icon */}
          <i class='bx bxl-dev-to'></i>
         
          <h5 className="card-title">Web Development</h5> 

          <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
          
        </div>
      </div>
    </div>

        <div className="col-12 col-md-4 p-4"> 
          <div className="card"> 
            <div className="card-body text-center">
            <i class='bx bx-buildings' ></i>

              <h5 className="card-text">Front-End Devloper</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 p-4"> 
          <div className="card"> 
            <div className="card-body text-center">
            <i class='bx bx-data' ></i>
              <h5 className="card-text">Back-End Devloper</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row"> 
        <div className="col-12 col-md-4 p-4"> 
          <div className="card"> 
            <div className="card-body text-center">
            <i class='bx bxs-user-badge' ></i>
              <h5 className="card-text">Human Resource</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 p-4"> 
          <div className="card">
            <div className="card-body text-center">
            <i class='bx bxs-user-badge ' ></i>
              <h5 className="card-text">Bussiness Devlopment Executive</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 p-4"> 
          <div className="card"> 
            <div className="card-body text-center">
            <i class='bx bx-data' ></i>
              <h5 className="card-text">DevOps</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>
    </div>
    <div className="row"> 

        <div className="col-12 col-md-4 p-4"> 
          <div className="card">
            <div className="card-body text-center">
            <i class='bx bxs-business' ></i>
              <h5 className="card-text">Bussiness Devlopment Executive</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 p-4"> 
          <div className="card"> 
            <div className="card-body text-center">
            <i class='bx bx-data' ></i>
              <h5 className="card-text">DevOps</h5>

              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 p-4"> 
          <div className="card"> 
            <div className="card-body text-center">
            <i class='bx bxs-user-badge' ></i>
              <h5 className="card-text">Human Resource</h5>
              <a 
          href="/web-development-detail"  
          className="btn btn-primary mt-3"  
        >
          Learn More 
        </a>
            </div>
          </div>
        </div>
    </div>
    </div>
    </div>
  );
};

export default Hero;