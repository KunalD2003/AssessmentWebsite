import React, { useEffect, useState, useCallback } from 'react';
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
  const [show, setShow] = useState(false);
  const { assessmentid } = useParams();
  const dispatch = useDispatch();

  const AssessmentData = useSelector((state) => state.getAssessment);
  const userId = AssessmentData.userDetails.userId;

  useEffect(() => {
    AxiosInstance1.get("/api/mcqquestions")
      .then((response) => {
        setMcqQuestions(response.data.myData);
      })
      .catch((error) => {
        console.error("Error fetching MCQ questions:", error);
      });
  }, []);

  const handleOptionSelect = (selectedOption) => {
    setUserAnswers((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: selectedOption
    }));
  };

  const calculateScore = useCallback(() => {
    return mcqQuestions.reduce((score, question, index) => {
      return score + (question.correctAnswer === userAnswers[index] ? 1 : 0);
    }, 0);
  }, [mcqQuestions, userAnswers]);

  const handleConfirm = () => {
    const score = calculateScore();
    const passData = {
      AssessmentId: assessmentid,
      userId,
      Uscore: score,
      UcodingScore: 0,
      UansweredQuestions: Object.keys(userAnswers).length,
      UtotalQuestions: mcqQuestions.length,
      UcorrectAnswers: score,
    };

    dispatch(setResultData(passData));
    dispatch(setQuestionSection(["Programming Test", "coding"]));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, mcqQuestions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => setShow(true);
  const handleClose = () => setShow(false);

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = mcqQuestions.length - answeredCount;

  return (
    <div className='assessment-mcq'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Logical Aptitude Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Submit This Section?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleConfirm}>Submit</Button>
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
              <div className='questions-count'>
                <h5 style={{ color: 'red' }}>{unansweredCount}</h5>
                <h5 style={{ color: 'red' }}>Unanswered</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssessmentMCQ;
