import React from 'react';
// import { useNavigate } from 'react-router-dom'; 
import './Hero.css'; 
import clockIcon from '../../assets/img/time-icon.svg';
import fileIcon from '../../assets/img/file-icon.svg';


function Hero() {
  // const navigate = useNavigate(); 

  return (
    <div className="col-12 herosection">
    
    
      <div className='row'>
        {/* First Card */}
        <div className='col'>
        <div className="asses-card"> 
     
          <div className="card-content-with-background"> 
          
            <div className="content-with-background bgimg ">
              <h2 className='test'>Web Developer</h2>
            </div>
            </div>
      
            <div className=" question d-flex">
            <div className='d-flex'>
              <img src={fileIcon} alt="File icon" className="file-icon" />
              <h6>Number of question.</h6>
            </div>
            <div>16</div>
            </div>
            
            <div className=" duration">
            <div className='d-flex'>
              <img src={clockIcon} alt="Clock icon" className="clock-icon" />
              <h6>Duration:</h6>
              </div>
              <div> 45 minutes</div>
            </div>

            {/* Navigation button */}
            <button onClick={() => navigate('/TermsAndCondition')} className="start-button">
              Explore
            </button>
          
        </div>

</div>
        <div className='col'>
        <div className="asses-card"> 
     
          <div className="card-content-with-background"> 
          
            <div className="content-with-background bgimg ">
              <h2 className='test'>Back-End Developer</h2>
            </div>
            </div>
      
            <div className=" question d-flex">
            <div className='d-flex'>
              <img src={fileIcon} alt="File icon" className="file-icon" />
              <h6>Number of question.</h6>
            </div>
            <div>16</div>
            </div>
            
            <div className=" duration">
            <div className='d-flex'>
              <img src={clockIcon} alt="Clock icon" className="clock-icon" />
              <h6>Duration:</h6>
              </div>
              <div> 45 minutes</div>
            </div>

            {/* Navigation button */}
            <button onClick={() => navigate('/TermsAndCondition')} className="start-button">
            Explore
            </button>
          
        </div>

</div>
        <div className='col'>
        <div className="asses-card"> 
     
          <div className="card-content-with-background"> 
          
            <div className="content-with-background bgimg ">
              <h2 className='test'>Front-End Developer</h2>
            </div>
            </div>
      
            <div className=" question d-flex">
            <div className='d-flex'>
              <img src={fileIcon} alt="File icon" className="file-icon" />
              <h6>Number of question.</h6>
            </div>
            <div>16</div>
            </div>
            
            <div className=" duration">
            <div className='d-flex'>
              <img src={clockIcon} alt="Clock icon" className="clock-icon" />
              <h6>Duration:</h6>
              </div>
              <div> 45 minutes</div>
            </div>

            {/* Navigation button */}
            <button onClick={() => navigate('/TermsAndCondition')} className="start-button">
            Explore
            </button>
          
        </div>

</div>

    </div>

    
  </div>
  // </div>
  )
}

export default Hero