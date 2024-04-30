


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssessmentProblemStatement.css';
import AssessmentInputExample from '../AssessmentInputField/AssessmentInputExample';

function AssessmentProblemStatement() {
  const [questionData, setQuestionData] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/codingProblems/${count}`);
        setQuestionData(response.data); // Update state with fetched data
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or count changes
  }, [count]); // Depend on count so that the effect is re-run when count changes

  return (
    <>

  
    <div className='problem-statement-div'>
      <button onClick={() => setCount(count + 1)}>Fetch Next Question</button>
      <br/>
      {questionData && (
        <div>
          <h5>Question {count} : {questionData.question}</h5>
          <br />
          <p>Problem: {questionData.problem}</p>

          {/* {questionData.examples.map((example, index) => (
        <div key={index}>
          <h5>Example {index + 1}:</h5>
          <h6>Input: {example.input}</h6>
          <h6>Output: {example.output}</h6>
        </div>
      ))} */}
      
        </div>
      )}

      
    </div>
    <div>
      {/* Conditionally render AssessmentInputExample only if questionData.examples is not null */}
      {questionData && questionData.examples && (
        <div>
          <AssessmentInputExample examples={questionData.examples}/>
        </div>
      )}
      
    </div>
    </>
  );
}

export default AssessmentProblemStatement;
