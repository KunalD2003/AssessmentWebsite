/* import React from 'react'
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

 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AssessmentMCQ.css';
import { AssessmentQuestionHeading, AssessmentMCQ_Options } from '../../index';

function AssessmentMCQ() {
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    // Fetch MCQ questions from the API
    axios.get("/api/mcqquestions")
      .then((response) => {
        setMcqQuestions(response.data.myData); // Update state with fetched questions
      })
      .catch((error) => {
        console.error("Error fetching MCQ questions:", error);
      });
  }, []);

  const handleOptionSelect = (selectedOption) => {
    // Update user's answer in the state
    setUserAnswers(prevState => ({
      ...prevState,
      [currentQuestionIndex]: selectedOption
    }));
  };

  const handleNextQuestion = () => {
    // Go to next question
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    // Fetch next question
    axios.get("/api/mcqquestions")
      .then((response) => {
        setMcqQuestions(prevQuestions => [...prevQuestions, response.data.myData]); // Append new question to existing questions
      })
      .catch((error) => {
        console.error("Error fetching next MCQ question:", error);
      });
  };

  return (
    <div className='assessment-mcq'>
      <AssessmentQuestionHeading number={currentQuestionIndex}/>
      {mcqQuestions.length > 0 && (
        <div>
          <h4>{mcqQuestions[currentQuestionIndex].question}</h4>
          <AssessmentMCQ_Options
            mcqOptions={mcqQuestions[currentQuestionIndex].options}
            handleOptionSelect={handleOptionSelect}
            userAnswers={userAnswers}
            currentQuestionIndex={currentQuestionIndex}
          />
         <button onClick={()=>setCurrentQuestionIndex(currentQuestionIndex-1)} disabled={currentQuestionIndex===0}>prev</button>
         <button onClick={()=>setCurrentQuestionIndex(currentQuestionIndex+1)} disabled={currentQuestionIndex===11}>next</button>
        </div>
      )}
      <button onClick={()=>console.log(userAnswers)}>submit</button>
    </div>
  );
}

export default AssessmentMCQ;
