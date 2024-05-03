import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
import './Hero_Section.css';
import clockIcon from '../../../assets/img/time-icon.svg';
import fileIcon from '../../../assets/img/file-icon.svg';
import { nanoid } from '@reduxjs/toolkit';
import { Key } from '@mui/icons-material';
import assessmentData from '../../../Hooks/assessmentData'


const AssessmentCard = [
  {
    id: nanoid(),
    title: "Web Developer",
    totalQuestions: 45,
    duration: "1 hour",
    startDate: "4/27/2024",
    startTime: "12:30 PM",
    endDate: "4/27/2024",
    endTime: "1:50 PM"
  },
  {
    id: nanoid(),
    title: "Andorid Developer",
    totalQuestions: 45,
    duration: "1 hour",
    startDate: "4/28/2024",
    startTime: "12:30 PM",
    endDate: "4/27/2024",
    endTime: "1:50 PM"
  },
  {
    id: nanoid(),
    title: "Frontend Developer",
    totalQuestions: 50,
    duration: "45 min",
    startDate: "4/27/2024",
    startTime: "12:30 PM",
    endDate: "4/27/2024",
    endTime: "1:50 PM"
  },
  {
    id: nanoid(),
    title: "React Developer",
    totalQuestions: 60,
    duration: "1:30 hour",
    startDate: "4/27/2024",
    startTime: "12:30 PM",
    endDate: "4/27/2024",
    endTime: "1:50 PM"
  },
]

function Hero_section() {
  // const navigate = useNavigate(); 
  const date = new Date();
  const [usedDate,setDate] = useState(new Date().toLocaleDateString())
  const assessments = assessmentData()
  console.log(assessments);
  useEffect (() => {
    setDate(new Date().toLocaleDateString())
    console.log(new Date().toLocaleDateString());
  },[])

  return (
<<<<<<< HEAD
    <div className="herosection">
      {assessments.map((index) => (
        <div className="card user-dashboard-card"key={index.id}>
          <div className='assessment-role-title'>
            <h1>{index.AssessmentTitle}</h1>
=======
    <div className="col-12 herosection">

      {/* <div className="container pt-3">  */}
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
              Start Test
            </button>

>>>>>>> c439e6e247c65f8908f755472512a46f84a83fa4
          </div>

        </div>
        <div className='col'>
          <div className="asses-card">

            <div className="card-content-with-background">

              <div className="content-with-background bgimg ">
                <h2 className='test'>Back-End Developer</h2>
              </div>
              <p>45 Questions</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-stopwatch assessment-details-icon'></i>
                <p>Duration:</p>
              </div>
              <p>1 hour</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-calendar assessment-details-icon'></i>
                <p>Start on:</p>
              </div>
              <p>{index.AssessmentStartDate}</p>
            </div>

            {/* Navigation button */}
            <button onClick={() => navigate('/TermsAndCondition')} className="start-button">
              Start Test
            </button>

          </div>

        </div>
        <div className='col'>
          <div className="asses-card">

            <div className="card-content-with-background">

              <div className="content-with-background bgimg ">
                <h2 className='test'>Front-End Developer</h2>
              </div>
              <p>{index.AssessmentEndDate}</p>
            </div>
            <div className='start-assesment-btn'>
              {(index.startDate === usedDate
              ) ? <button type="button" className="btn btn-primary">Start Assessment</button> : <button type="button" className="btn btn-primary" disabled>Start Assessment</button>}

            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Hero_section