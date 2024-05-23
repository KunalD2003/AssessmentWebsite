import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AssessmentMCQ.css';
import { useDispatch, useSelector } from "react-redux";
import { AssessmentQuestionHeading, AssessmentMCQ_Options } from '../../index';
import { setQuestionSection, setResultData } from '../../../Store/assessmentData';
import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AxiosInstance1 } from '../../../AxiosInstance';

function AssessmentMCQ() {
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState();
  const { assessmentid } = useParams()
  const [score, setScore] = useState(0);
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  

  useEffect(() => {
    // Fetch MCQ questions from the API
    AxiosInstance1.get("/api/mcqquestions")
      .then((response) => {
        setMcqQuestions(response.data.myData); // Update state with fetched questions
        setUnansweredCount(response.data.myData.length)
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
  const handleConfirm = async () => {
    // Send user answers to the backend
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
    dispatch(setResultData(passData))
    console.log(AssessmentData.resultData);
    // const response = await fetch('https://assessmentwebsite-4-3u7s.onrender.com/result', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(passData)
    // });

    dispatch(setQuestionSection(["Programming Test", "coding"]))
    // if (response) {
    // }
    // else {
    //   console.error("Error submitting MCQ answer:", error);
    //   setSubmitStatus("Error submitting MCQ answer");
    // };
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
  const handleSubmit = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className='assessment-mcq'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Logical Aptitude Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Submit This Section ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
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