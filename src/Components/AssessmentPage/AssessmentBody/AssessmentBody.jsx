import React from 'react'
import './AssessmentBody.css'
import {AssessmentCodingQuestion, AssessmentCodeEditor} from '../../index'
import useQuestionData from '../../../Hooks/useQuestionData'
// import setCodingQuestion from '../../../Store/assessmentData'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


function AssessmentBody() {
  const temp = useQuestionData()
  const dispatch = useDispatch()
  useEffect(() => {
    if (temp) {
      console.log('Fetched data:', temp);
      // dispatch(setCodingQuestion(temp));
    }
  }, [dispatch, temp]);
  return (
    <div className='assessment-body'>
        <div className='assessment-body-first-half assessment-grid'>
          <AssessmentCodingQuestion/>
        </div>
        <div className='assessment-body-second-half assessment-grid'>
          <AssessmentCodeEditor />
        </div>
    </div>
  )
}

export default AssessmentBody