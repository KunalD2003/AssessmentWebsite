import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import
import './ResultPage.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// Sample data to be displayed on the ResultPage
const results = {
  totalQuestions: 40,
  attempted: 28,
  timeTaken: '20:00 mins',
  correctAnswers: 15,
  partialCorrectAnswers: 0,
  score: 45,
};
const ResultCard = ({ title, value }) => (
  <div className="col-6 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{value}</p>
      </div>
    </div>
  </div>
);
const ResultPage = () => {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="container result-page">
      <div className="row">
        <ResultCard title="Total Questions" value={results.totalQuestions} />
        <ResultCard title="Attempted" value={results.attempted} />
        <ResultCard title="Time Taken" value={results.timeTaken} />
        <ResultCard title="Correct Answers" value = {results.correctAnswers} />
        <ResultCard title="Partial Correct Answers" value ={results.partialCorrectAnswers} />
        <ResultCard title="Score" value={results.score} />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleBackClick}>
          Back to Assessment
        </button>
      </div>
    </div>
  );
};
export default ResultPage;





