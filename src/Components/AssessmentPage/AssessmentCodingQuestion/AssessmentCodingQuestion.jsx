import React from 'react'
import { AssessmentQuestionHeading, AssessmentProblemStatement, AssessmentInputExample } from '../../index'
import './AssessmentCodingQuestion.css'

function AssessmentCodingQuestion() {
  return (
    <div className='assessment-coding-question'>
      <AssessmentQuestionHeading />
      <div className='coding-question-description'>
        <AssessmentProblemStatement />
        <div>
          <AssessmentInputExample />
          <AssessmentInputExample isInput={false} />
        </div>
      </div>
    </div>
  )
}

export default AssessmentCodingQuestion