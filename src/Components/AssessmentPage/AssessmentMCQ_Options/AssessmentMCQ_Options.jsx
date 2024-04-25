import React from 'react'
import './AssessmentMCQ_Options.css'

function AssessmentMCQ_Options({ mcqOptions }) {
    console.log(mcqOptions);
    return (
        <div className='mcq-options'>
            {mcqOptions.map((index) => (
                <button className='mcq-option-btn' onClick={() => {
                    mcqOptions.map((index1) => {
                        index1.optionSelected = false
                    })
                    index.optionSelected = true
                    console.log(mcqOptions);
                }}>{index.optionName}</button>
            ))}
        </div>
    )
}

export default AssessmentMCQ_Options