import React from 'react'
import {AssessmentQuestionHeading,AssessmentProblemStatement,AssessmentInputExample} from '../../index'
import './AssessmentCodingQuestion.css'

function AssessmentCodingQuestion() {
  return (
    <div className='assessment-coding-question'>
      <AssessmentQuestionHeading />
      <AssessmentProblemStatement />
      <AssessmentInputExample />
      <AssessmentInputExample isInput = {false}/>
    </div>
  )
}

export default AssessmentCodingQuestion