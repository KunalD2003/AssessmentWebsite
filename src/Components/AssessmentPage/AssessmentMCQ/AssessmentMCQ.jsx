// /* import React from 'react'
// import './AssessmentMCQ.css'
// import {AssessmentQuestionHeading, AssessmentProblemStatement, AssessmentMCQ_Options} from '../../index'

// const sampleOptions = [
//     {
//         optionName: "Option1",
//         optionSelected: false,
//         isCorrect: true
//     },
//     {
//         optionName: "Option2",
//         optionSelected: false,
//         isCorrect: false
//     },
//     {
//         optionName: "Option3",
//         optionSelected: false,
//         isCorrect: false
//     },
//     {
//         optionName: "Option4",
//         optionSelected: false,
//         isCorrect: false
//     },
// ]
// function AssessmentMCQ() {
//   return (
//     <div className='assessment-mcq'>
//         <AssessmentQuestionHeading />
//         {/* <AssessmentProblemStatement/>}
//         <AssessmentMCQ_Options mcqOptions={sampleOptions}/>
//     </div>
//   )
// }

// export default AssessmentMCQ

//  */
// /*
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './AssessmentMCQ.css';
// import { AssessmentQuestionHeading, AssessmentMCQ_Options } from '../../index';

// function AssessmentMCQ() {
//   const [mcqQuestions, setMcqQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});

//   useEffect(() => {
//     // Fetch MCQ questions from the API
//     axios.get("/api/mcqquestions")
//       .then((response) => {
//         setMcqQuestions(response.data.myData); // Update state with fetched questions
//       })
//       .catch((error) => {
//         console.error("Error fetching MCQ questions:", error);
//       });
//   }, []);

//   const handleOptionSelect = (selectedOption) => {
//     // Update user's answer in the state
//     setUserAnswers(prevState => ({
//       ...prevState,
//       [currentQuestionIndex]: selectedOption
//     }));
//   };

//   const handleNextQuestion = () => {
//     // Go to next question
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     // Fetch next question
//     axios.get("/api/mcqquestions")
//       .then((response) => {
//         setMcqQuestions(prevQuestions => [...prevQuestions, response.data.myData]); // Append new question to existing questions
//       })
//       .catch((error) => {
//         console.error("Error fetching next MCQ question:", error);
//       });
//   };

//   return (
//     <div className='assessment-mcq'>
//       <AssessmentQuestionHeading number={currentQuestionIndex}/>
//       {mcqQuestions.length > 0 && (
//         <div>
//           <h4>{mcqQuestions[currentQuestionIndex].question}</h4>
//           <AssessmentMCQ_Options
//             mcqOptions={mcqQuestions[currentQuestionIndex].options}
//             handleOptionSelect={handleOptionSelect}
//             userAnswers={userAnswers}
//             currentQuestionIndex={currentQuestionIndex}
//           />
//          <button onClick={()=>setCurrentQuestionIndex(currentQuestionIndex-1)} disabled={currentQuestionIndex===0}>previous</button>
//          <button onClick={()=>setCurrentQuestionIndex(currentQuestionIndex+1)} disabled={currentQuestionIndex===11}>next</button>
//         </div>
//       )}
//       <button onClick={()=>console.log(userAnswers)}>submit</button>
//     </div>
//   );
// }

// export default AssessmentMCQ;
// */
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './AssessmentMCQ.css';
// import { AssessmentQuestionHeading, AssessmentMCQ_Options } from '../../index';

// function AssessmentMCQ() {
//   const [mcqQuestions, setMcqQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [submitStatus, setSubmitStatus] = useState("");
//   const [answeredCount, setAnsweredCount] = useState(0);
//   const [unansweredCount, setUnansweredCount] = useState(12);
//   const [score, setScore] = useState(0);


//   useEffect(() => {
//     // Fetch MCQ questions from the API
//     axios.get("/api/mcqquestions")
//       .then((response) => {
//         console.log(response.data.myData);
//         setMcqQuestions(response.data.myData); // Update state with fetched questions
//       })
//       .catch((error) => {
//         console.error("Error fetching MCQ questions:", error);
//       });
//   }, []);

//   const handleOptionSelect = (selectedOption) => {
//     const isAnswered = userAnswers[currentQuestionIndex] !== undefined;

//     // If not answered, or if the answer is changed
//     if (!isAnswered) {
//       setUserAnswers(prevState => ({
//         ...prevState,
//         [currentQuestionIndex]: selectedOption
//       }));

//       setAnsweredCount(answeredCount + 1);

//       if (mcqQuestions[currentQuestionIndex].correctAnswer === selectedOption) {
//         setScore(score + 1);
//       }
//       setUnansweredCount(unansweredCount - 1);
//     } else {
//       setUserAnswers(prevState => ({
//         ...prevState,
//         [currentQuestionIndex]: selectedOption
//       }));

//     }
//   };

//   const handleSubmit = () => {
//     // Send user answers to the backend
//     axios.post("/api/mcqquestions/", {
//       id: "6631222bac1ba08073756af0",
//       score
//     })
//       .then((response) => {
//         setSubmitStatus(response.data.message);
//       })
//       .catch((error) => {
//         console.error("Error submitting MCQ answer:", error);
//         setSubmitStatus("Error submitting MCQ answer");
//       });
//   };

//   const handleNextQuestion = () => {
//     // Go to next question
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     // Fetch next question
//     axios.get("/api/mcqquestions")
//       .then((response) => {
//         setMcqQuestions(prevQuestions => [...prevQuestions, response.data.myData]); // Append new question to existing questions
//       })
//       .catch((error) => {
//         console.error("Error fetching next MCQ question:", error);
//       });
//   };


//   return (
//     <div className='assessment-mcq'>
//       <AssessmentQuestionHeading number={currentQuestionIndex} />
//       {mcqQuestions.length > 0 && (
//         <div>
//           <h4 className='mcq-question-heading'>{mcqQuestions[currentQuestionIndex].question}</h4>
//           <AssessmentMCQ_Options
//             mcqOptions={mcqQuestions[currentQuestionIndex].options}
//             handleOptionSelect={handleOptionSelect}
//             userAnswers={userAnswers}
//             currentQuestionIndex={currentQuestionIndex}
//           />
//           <div className='question-navigation-btn'>
//             <div className='question-navigation'>
//               <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} disabled={currentQuestionIndex === 0} className='btn btn-outline-primary'>Previous</button>
//               <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} disabled={currentQuestionIndex === mcqQuestions.length-1} className='btn btn-outline-primary'>Next</button>
//               <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
//             </div>
//             <div className='questions-staticstics'>
//               <div>
//                 <div className='questions-count'>{answeredCount}</div>
//                 <div>Answered</div>
//               </div>
//               <div className='questions-count'>
//                 <div>0</div>
//                 <div>Flag</div>
//               </div>
//               <div className='questions-count'>
//                 <div>{unansweredCount}</div>
//                 <div>Unanswered</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {submitStatus && <p>{submitStatus}</p>}

//     </div>

//   );
// }

// export default AssessmentMCQ;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AssessmentMCQ.css';
import { useDispatch, useSelector } from "react-redux";
import { AssessmentQuestionHeading, AssessmentMCQ_Options } from '../../index';
import { setQuestionSection } from '../../../Store/assessmentData';
import { useParams } from 'react-router';

function AssessmentMCQ() {
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(14);
  const { assessmentid } = useParams()
  const [score, setScore] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch MCQ questions from the API
    axios.get("/api/mcqquestions")
      .then((response) => {
        console.log(response.data.myData);
        setMcqQuestions(response.data.myData); // Update state with fetched questions
      })
      .catch((error) => {
        console.error("Error fetching MCQ questions:", error);
      });
  }, []);

  const handleOptionSelect = (selectedOption) => {
    const isAnswered = userAnswers[currentQuestionIndex] !== undefined;

    // If not answered, or if the answer is changed
    if (!isAnswered) {
      setUserAnswers(prevState => ({
        ...prevState,
        [currentQuestionIndex]: selectedOption
      }));

      setAnsweredCount(answeredCount + 1);

      if (mcqQuestions[currentQuestionIndex].correctAnswer === selectedOption) {
        setScore(score + 1);
      }
      setUnansweredCount(unansweredCount - 1);
    } else {
      setUserAnswers(prevState => ({
        ...prevState,
        [currentQuestionIndex]: selectedOption
      }));
    }
  };
  const AssessmentData = useSelector((state) => {
    return state.getAssessment;
  });
  const userid = AssessmentData.userDetails.userId
  const handleSubmit = async () => {
    // Send user answers to the backend
    console.log("Hello");
    const passData = {
      AssessmentId: assessmentid,
      userId: userid,
      Uscore: score,
      UcodingScore: 0,
      UansweredQuestions: answeredCount,
      UtotalQuestions: mcqQuestions.length,
      UcorrectAnswers: score
    }
    console.log(passData);
    const response = await fetch('http://localhost:3001/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passData)
    });

    if (response) {
      console.log(response);
      dispatch(setQuestionSection(["Programming Test", "coding"]))
    }
    else {
      console.error("Error submitting MCQ answer:", error);
      setSubmitStatus("Error submitting MCQ answer");
    };
  };

  const handleNextQuestion = () => {
    // Go to next question
    setCurrentQuestionIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      return nextIndex < mcqQuestions.length ? nextIndex : prevIndex;
    });
  };

  const handlePreviousQuestion = () => {
    // Go to previous question
    setCurrentQuestionIndex(prevIndex => {
      const previousIndex = prevIndex - 1;
      return previousIndex >= 0 ? previousIndex : prevIndex;
    });
  };

  return (
    <div className='assessment-mcq'>
      <AssessmentQuestionHeading number={currentQuestionIndex} />
      {mcqQuestions.length > 0 && (
        <div>
          <h4 className='mcq-question-heading'>{mcqQuestions[currentQuestionIndex].question}</h4>
          <AssessmentMCQ_Options
            mcqOptions={mcqQuestions[currentQuestionIndex].options}
            handleOptionSelect={handleOptionSelect}
            userAnswers={userAnswers}
            currentQuestionIndex={currentQuestionIndex}
          />
          <div className='question-navigation-btn'>
            <div className='question-navigation'>
              <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className='btn btn-outline-primary'>Previous</button>
              <button onClick={handleNextQuestion} disabled={currentQuestionIndex === mcqQuestions.length - 1} className='btn btn-outline-primary'>Next</button>
              <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
            </div>
            <div className='questions-staticstics'>
              <div>
                <h5 style={{ color: 'green' }} className='questions-count'>{answeredCount}</h5>
                <h5 style={{ color: 'green' }}>Answered</h5>
              </div>
              {/* <div className='questions-count'>
                <div>0</div>
                <div>Flag</div>
              </div> */}
              <div className='questions-count'>
                <h5 style={{ color: 'red' }}>{unansweredCount}</h5>
                <h5 style={{ color: 'red' }}>Unanswered</h5>
              </div>
            </div>
          </div>
        </div>
      )}
      {submitStatus && <p>{submitStatus}</p>}
    </div>
  );
}
export default AssessmentMCQ;