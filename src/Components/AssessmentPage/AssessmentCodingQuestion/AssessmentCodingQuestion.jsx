import React from 'react'
import { AssessmentQuestionHeading, AssessmentProblemStatement } from '../../index'
import './AssessmentCodingQuestion.css'

function AssessmentCodingQuestion({codingQuestion, questionIndex}) {
  return (
    <div className='assessment-coding-question'>
      <AssessmentQuestionHeading number={questionIndex}/>
      <div className='coding-question-description'>
        <AssessmentProblemStatement question={codingQuestion} questionIndex={questionIndex}/>
        <div>
         
          {/* <AssessmentInputExample isInput={false} /> */}
        </div>
      </div>
    </div>
  )
}

export default AssessmentCodingQuestion