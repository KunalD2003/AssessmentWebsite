import React from 'react'
import { AssessmentQuestionHeading, AssessmentProblemStatement, AssessmentInputExample } from '../../index'
import './AssessmentCodingQuestion.css'

function AssessmentCodingQuestion({codingQuestion, questionIndex}) {
  console.log(codingQuestion);
  return (
    <div className='assessment-coding-question'>
      <AssessmentQuestionHeading number={questionIndex}/>
      <div className='coding-question-description'>
        <AssessmentProblemStatement question={codingQuestion}/>
        <div>
         
          {/* <AssessmentInputExample isInput={false} /> */}
        </div>
      </div>
    </div>
  )
}

export default AssessmentCodingQuestion