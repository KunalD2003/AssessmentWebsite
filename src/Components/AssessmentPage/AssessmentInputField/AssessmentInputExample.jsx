import React from 'react'
import './AssessmentInputExample.css'

function AssessmentInputExample({examples}) {
  return (
    <div className='AssementInputExample'>
      
       
      {examples.map((example, index) => (
        <div key={index}>
          <h5>Example {index + 1}:</h5>
          <h6>Input: {example.input}</h6>
          <h6>Output: {example.output}</h6>
        </div>
      ))}
      

    </div>
  )
}

export default AssessmentInputExample