import React from 'react'
import './AssessmentQuestionHeading.css'

function AssessmentQuestionHeading({number}) {
    return (
        <div className='assessment-question-heading'>
            <h6>Question {number+1}</h6>
            <a href="">Mark for Review</a>
        </div>
    )
}

export default AssessmentQuestionHeading