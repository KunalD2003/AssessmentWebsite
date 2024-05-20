import React, { useEffect, useState } from 'react';
import './Hero_Section.css';
import clockIcon from '../../../assets/img/time-icon.svg';
import fileIcon from '../../../assets/img/file-icon.svg';
import { nanoid } from '@reduxjs/toolkit';
import { Key } from '@mui/icons-material';
import assessmentData from '../../../Hooks/assessmentData'
import useQuestionData from '../../../Hooks/useQuestionData'
import mcqQuestion from '../../../Hooks/mcqQuestion'
import { useNavigate } from 'react-router';
import archievedexamresult from '../../../Hooks/archievedExamsData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { setCurrentAssessment } from '../../../Store/assessmentData';

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
  const navigate = useNavigate();
  const date = new Date();
  const temp = useQuestionData()
  const mcq = mcqQuestion()
  const [usedDate, setDate] = useState(new Date().toLocaleDateString())
  const [archievedList, setArchievedList] = useState([])
  const [codingQuestionLength, setCodingQuestionLength] = useState();
  const [mcqQuestionLength, setmcqQuestionLength] = useState();
  const tempData = archievedexamresult();
  const [show, setShow] = useState(false);
  const assessments = assessmentData()
  const dispatch = useDispatch()

  useEffect(() => {
    setDate(new Date().toLocaleDateString())
    
    console.log(new Date().toLocaleDateString());
    if (temp && mcq) {
      setCodingQuestionLength(temp.length + mcq.length)
    }
    if(tempData){
      setArchievedList(tempData)
    }
  }, [temp,mcq])
  function attemptedStatus(assessmentId) {
    let attemptedStatus = false
    archievedList.find((index) => {
      if(index.assessmentid === assessmentId){
        attemptedStatus = true
      }
    })
    if(attemptedStatus){
      setShow(true)
    }
    else{
      dispatch(setCurrentAssessment(assessmentId))
      navigate(`/${assessmentId}/termsandcondition`)
    }
  }

  const handleClose = () => setShow(false);

  return (
    <div className="herosection" >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey! you already attempted this exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>If you think this is a mistake, confirm it with admin.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {assessments.map((index) => (
        <div className="card user-dashboard-card" key={index.id}>
          {/* console.log(index.id) */}
          <div className='assessment-role-title'>
            <h1 className='headTest'>{index.AssessmentTitle}</h1>
          </div>
          <div className="card-body assessment-start-card-body">
            <div className='assessment-details'>
              <div>
                <i className='bx bx-question-mark assessment-details-icon'></i>
                <p>Questions:</p>
              </div>
              <p>{codingQuestionLength}</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-stopwatch assessment-details-icon'></i>
                <p>Duration:</p>
              </div>
              <p>{index.AssessmentDuration} Min</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-calendar assessment-details-icon'></i>
                <p>Assessment Date:</p>
              </div>
              <p>{index.AssessmentDate}</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bxs-watch assessment-details-icon'></i>
                <p>Start Time:</p>
              </div>
              <p>{index.AssessmentStartTime}</p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bxs-watch assessment-details-icon'></i>
                <p>End Time:</p>
              </div>
              <p>{index.AssessmentEndTime}</p>
            </div>
            <div className='start-assesment-btn'>
              {(index.startDate === usedDate
              ) ? <button type="button" className="btn btn-primary" onClick={() => {
                attemptedStatus()
                navigate(`/${index._id}/termsandcondition`)
                }}>Start Assessment</button> : <button type="button" className="btn btn-primary" onClick={() => {
                  attemptedStatus(index._id)
                }}>Start Assessment</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Hero_section