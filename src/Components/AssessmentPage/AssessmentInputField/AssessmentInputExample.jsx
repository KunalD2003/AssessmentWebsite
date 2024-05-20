import React from 'react'
import './AssessmentInputExample.css'

function AssessmentInputExample({ isInput = true }) {
  return (
    <div className='AssementInputExample'>
      {(isInput) ? (
        <>
          <h6>Sample Input:</h6>
          <div>
            <p>2</p>
            <p>0 0 1</p>
            <p>1 1 1</p>
          </div>
        </>
      ) :
        (<>
          <h6>Sample Output:</h6>
          <div>
            <p>2</p>
            <p>0 0 1</p>
            <p>1 1 1</p>
          </div>
        </>
        )}

    </div>
  )
}

export default AssessmentInputExample