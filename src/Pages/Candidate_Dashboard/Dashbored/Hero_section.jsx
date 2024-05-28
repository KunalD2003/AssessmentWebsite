import React, { useEffect, useState } from 'react';
import './Hero_Section.css';
import assessmentData from '../../../Hooks/assessmentData'
import useQuestionData from '../../../Hooks/useQuestionData'
import mcqQuestion from '../../../Hooks/mcqQuestion'
import { useNavigate } from 'react-router';
import archievedexamresult from '../../../Hooks/archievedExamsData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { setCurrentAssessment } from '../../../Store/assessmentData';



function Hero_section() {
  const navigate = useNavigate();
  const temp = useQuestionData()
  const mcq = mcqQuestion()
  const [usedDate, setDate] = useState(new Date().toLocaleDateString())
  const [archievedList, setArchievedList] = useState([])
  const [codingQuestionLength, setCodingQuestionLength] = useState();
  const tempData = archievedexamresult();
  const [show, setShow] = useState(false);
  const assessments = assessmentData()
  const dispatch = useDispatch()
  const [modalContent, setModalContent] = useState({ header: "", body: "" })
  const [timeStatus, setTimeStatus] = useState()
  useEffect(() => {
    setDate(new Date().toLocaleDateString())
    if (temp && mcq) {
      setCodingQuestionLength(temp.length + mcq.length)
    }
    if (tempData) {
      setArchievedList(tempData)
    }
  }, [temp, mcq])
  function attemptedStatus(assessmentId, assessmentDetails) {
    let attemptedStatus = false
    const startDateStr = assessmentDetails.AssessmentDate; 

    const startTime = assessmentDetails.AssessmentStartTime; 
    const endTime = assessmentDetails.AssessmentEndTime; 

    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/').map(num => parseInt(num, 10));
      return new Date(`20${year}`, month - 1, day);
    };

    const getCurrentDate = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };

    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    const isAfterOrOnDate = (current, start) => {
      return current >= start;
    };

    const isWithinTimeRange = (current, start, end) => {
      return current >= start && current <= end;
    };

    const startDate = parseDate(startDateStr);
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    const dateCheck = isAfterOrOnDate(currentDate, startDate);
    const timeCheck = isWithinTimeRange(currentTime, startTime, endTime);


    archievedList.find((index) => {
      if (index.assessmentid === assessmentId) {
        attemptedStatus = true
      }
    })

    if (attemptedStatus) {
      setModalContent({
        header: "Hey! you already attempted this exam",
        body: "If you think this is a mistake, confirm it with admin."
      })
      setShow(true)
    }
    else if (!dateCheck) {
      setModalContent({
        header: "Assessment not started",
        body: "Hey Candidate! It looks like you are early before the assessment start. Come back later during assessment time."
      })
      setShow(true)
    } else if (currentDate > startDate) {
      setModalContent({
        header: "Assessment Ended",
        body: "Hey Candidate! This exam is ended now."
      })
      setShow(true)
    } else if (dateCheck && !timeCheck) {
      if (currentTime < startTime) {
        setModalContent({
          header: "Assessment not started",
          body: "Hey Candidate! It looks like you are early before the given assessment start time. Come back later during assessment time."
        })
        setShow(true)
      } else if (currentTime > endTime) {
        setModalContent({
          header: "Assessment Ended",
          body: "Hey Candidate! This exam is ended now."
        })
        setShow(true)
      }
    }
    else {
      dispatch(setCurrentAssessment(assessmentId))
      navigate(`/${assessmentId}/termsandcondition`)
    }
  }

  const handleClose = () => setShow(false);

  return (
    <div className="herosection" >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {(assessments) ? (assessments.map((index) => (
        <div className="card user-dashboard-card" key={index.id}>
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
                attemptedStatus(index._id, index)
              }}>Start Assessment</button>}
            </div>
          </div>
        </div>
      ))) : (<h2>Loading.....</h2>)}

    </div>
  )
}

export default Hero_section