import React from 'react'
import './AssessmentBody.css'
import { AssessmentCodingQuestion, AssessmentCodeEditor } from '../../index'
import useQuestionData from '../../../Hooks/useQuestionData'
import { setCodingQuestion, resetCodingScore } from '../../../Store/assessmentData'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

function AssessmentBody() {
  const temp = useQuestionData()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [codingQuestionLength, setCodingQuestionLength] = useState();
  const [codingScore, setCodingScore] = useState()
  const [currentQuestion, setcurrentQuestion] = useState()
  const [submitStatus, setSubmitStatus] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { assessmentid } = useParams()
  const AssessmentData = useSelector((state) => {
    return state.getAssessment;
  });
  console.log(AssessmentData);
  const handleConfirm = async () => {
    // console.log(AssessmentData.codingScore);
    console.log(codingScore);
    // dispatch(disableWebcam())
    console.log(AssessmentData.userDetails.userId);
    console.log(assessmentid);
    const passData = AssessmentData.resultData
    // await axios.put(`https://assessmentwebsite-4-3u7s.onrender.com/result/`, {
    //   UcodingScore: AssessmentData.codingScore
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    // const response = await fetch(`https://assessmentwebsite-4-3u7s.onrender.com/result/${AssessmentData.userDetails.userId}/${assessmentid}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(passData)
    // });
    const response = await fetch('https://assessmentwebsite-4-3u7s.onrender.com/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passData)
    }).then((response) => {
      console.log(response);
      navigate(`/${assessmentid}/result`)
    }).catch((error) => {
      
    })
  }
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (temp) {
      setCodingQuestionLength(temp.length)
      setcurrentQuestion(temp[currentQuestionIndex])
      // dispatch(setCodingQuestion(temp));
    }
    setCodingScore(AssessmentData.codingScore)
  }, [dispatch, temp, AssessmentData]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Programming Test Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Submit This Section ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='assessment-body'>
        <div className='assessment-body-first-half assessment-grid'>
          <AssessmentCodingQuestion codingQuestion={currentQuestion} questionIndex={currentQuestionIndex} />
        </div>
        <div className='assessment-body-second-half assessment-grid'>
          <AssessmentCodeEditor questionIndex={currentQuestionIndex} />
        </div>
      </div>
      <div className='question-navigation-btn'>
        <div className='question-navigation' style={{ paddingBottom: '1%' }}>
          <button onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
            setcurrentQuestion(temp[currentQuestionIndex])
          }} disabled={currentQuestionIndex === 0} className='btn btn-outline-primary'>Previous</button>
          <button onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setcurrentQuestion(temp[currentQuestionIndex + 1])
          }} disabled={currentQuestionIndex === codingQuestionLength - 1} className='btn btn-outline-primary'>Next</button>
          <button className='btn btn-success' onClick={() => {
            setShow(true)
          }}>Submit</button>
        </div>
        {/* <div className='questions-staticstics'>
          <div>
            <div className='questions-count'>{0}</div>
            <div>Answered</div>
          </div>
          <div className='questions-count'>
            <div>0</div>
            <div>Flag</div>
          </div>
          <div className='questions-count'>
            <div>{0}</div>
            <div>Unanswered</div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default AssessmentBody