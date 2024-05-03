import React from 'react';
import './AssessmentMCQ_Options.css';

function AssessmentMCQ_Options({ mcqOptions, handleOptionSelect, currentQuestionIndex,userAnswers }) {
  return (
    <div className='mcq-options'>
      {mcqOptions.map((option, index) => (
        <button
          key={index}
          className='mcq-option-btn btn btn-outline-dark'
          onClick={() => {
            handleOptionSelect(option)
          }}
          style={{backgroundColor: userAnswers[currentQuestionIndex] === option ? 'green' : '',
            color: userAnswers[currentQuestionIndex] === option ? 'white' : '',}}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default AssessmentMCQ_Options;
