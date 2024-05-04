import React from 'react'
import './AssessmentBody.css'
import {AssessmentCodingQuestion, AssessmentCodeEditor} from '../../index'


function AssessmentBody() {

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