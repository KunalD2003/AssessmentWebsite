import React from 'react'
import './AssessmentBody.css'
import { AssessmentCodingQuestion, AssessmentCodeEditor } from '../../index'
import useQuestionData from '../../../Hooks/useQuestionData'
import {setCodingQuestion,disableWebcam} from '../../../Store/assessmentData'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'


function AssessmentBody() {
  const temp = useQuestionData()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [codingQuestionLength, setCodingQuestionLength] = useState();
  const [currentQuestion, setcurrentQuestion] = useState()
  const [submitStatus, setSubmitStatus] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {assessmentid} = useParams()
  useEffect(() => {
    if (temp) {
      setCodingQuestionLength(temp.length)
      setcurrentQuestion(temp[currentQuestionIndex])
      // dispatch(setCodingQuestion(temp));
    }
  }, [dispatch, temp]);
  return (
    <>
      <div className='assessment-body'>
        <div className='assessment-body-first-half assessment-grid'>
          <AssessmentCodingQuestion codingQuestion={currentQuestion} questionIndex={currentQuestionIndex} />
        </div>
        <div className='assessment-body-second-half assessment-grid'>
          <AssessmentCodeEditor />
        </div>
      </div>
      <div className='question-navigation-btn'>
        <div className='question-navigation' style={{paddingBottom:'1%'}}>
          <button onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
            setcurrentQuestion(temp[currentQuestionIndex])
          }} disabled={currentQuestionIndex === 0} className='btn btn-outline-primary'>Previous</button>
          <button onClick={() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setcurrentQuestion(temp[currentQuestionIndex + 1])
          }} disabled={currentQuestionIndex === codingQuestionLength - 1} className='btn btn-outline-primary'>Next</button>
          <button className='btn btn-success' onClick={() => {
            alert('Do you want to submit the exam?')
            dispatch(disableWebcam())
            navigate(`/${assessmentid}/result`)
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