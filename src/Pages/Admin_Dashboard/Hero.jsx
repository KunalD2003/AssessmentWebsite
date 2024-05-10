import React from 'react';
// import { useNavigate } from 'react-router-dom'; 
import { nanoid } from '@reduxjs/toolkit';
import './Hero.css';
import clockIcon from '../../assets/img/time-icon.svg';
import fileIcon from '../../assets/img/file-icon.svg';
import assessmentData from '../../Hooks/assessmentData'

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

function Hero() {
  // const navigate = useNavigate(); 
  const assessment = assessmentData()
  console.log(assessment);
  return (
    <div className="herosection">
      {assessment.map((index) => (
        <div className="card user-dashboard-card" key={index.id}>
          <div className='assessment-role-title' style={{justifyContent:'center',alignItems:'center'}}>
            <h2 style={{textAlign:'center'}}>{index.AssessmentTitle}</h2>
          </div>
          <div className="card-body assessment-start-card-body">
            <div className='assessment-details'>
              <div>
                <i className='bx bx-question-mark assessment-details-icon'></i>
                <p>Questions:</p>
              </div>
              <p> Questions</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-stopwatch assessment-details-icon'></i>
                <p>Duration:</p>
              </div>
              <p>min</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-calendar assessment-details-icon'></i>
                <p>Start on:</p>
              </div>
              <p>{index.AssessmentStartDate} <span className='start-assessment-time'></span></p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-calendar assessment-details-icon'></i>
                <p>End on:</p>
              </div>
              <p>{index.AssessmentEndDate} <span className='start-assessment-time'></span></p>
            </div>
            <div className='start-assesment-btn'>
              <button type="button" className="btn btn-info" >View Results</button>
              <button type="button" className="btn btn-primary" >Edit</button>
              <button type="button" className="btn btn-danger" >Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    // </div>
  )
}

export default Hero