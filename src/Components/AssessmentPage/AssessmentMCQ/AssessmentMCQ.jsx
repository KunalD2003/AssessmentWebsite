import React from 'react'
import './AssessmentMCQ.css'
import {AssessmentQuestionHeading, AssessmentProblemStatement, AssessmentMCQ_Options} from '../../index'

const sampleOptions = [
    {
        optionName: "Option1",
        optionSelected: false,
        isCorrect: true
    },
    {
        optionName: "Option2",
        optionSelected: false,
        isCorrect: false
    },
    {
        optionName: "Option3",
        optionSelected: false,
        isCorrect: false
    },
    {
        optionName: "Option4",
        optionSelected: false,
        isCorrect: false
    },
]
function AssessmentMCQ() {
  return (
    <div className='assessment-mcq'>
        <AssessmentQuestionHeading />
        <AssessmentProblemStatement/>
        <AssessmentMCQ_Options mcqOptions={sampleOptions}/>
    </div>
  )
}

export default AssessmentMCQ