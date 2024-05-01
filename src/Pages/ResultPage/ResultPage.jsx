
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResultPage.css'; // Custom CSS for styling

// Component for individual result cards with text and icons
const ResultCard = ({ title, value, icon }) => (
  <div className="col-md-6 col-sm-12 mb-3">
    <div className="card result-card"> {/* Card with custom styling */}
      <div className="card-body">
        <div className="card-title text-center">
          {/* Title with larger font size */}
          <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{title}</h5>
        </div>
        <hr /> {/* Divider after the title */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Text with increased font size */}
          <p className="card-text" style={{ fontSize: '1.2rem' }}>{value}</p>
          {icon && <i className={icon} style={{ fontSize: '1.5rem' }}></i>} {/* Larger icon */}
        </div>
      </div>
    </div>
  </div>
);

// Main component for the results page
const ResultPage = () => {
  const results = {
    totalQuestions: 40,
    attempted: 28,
    correctAnswers: 15,
    score: 45,
  };

  return (
    <div className="result-page" style={{ height: '100vh' }}> {/* Full-screen background */}
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}> {/* Centered content */}
          <div className="col-md-8">
            <div className="row justify-content-center"> {/* Centered row */}
              <ResultCard title="Total Questions" value={results.totalQuestions} icon="bx bx-file" />
              <ResultCard title="Attempted" value={results.attempted} icon="bx bx-select-multiple" />
            </div>
            <div className="row justify-content-center"> {/* Centered row */}
              <ResultCard title="Correct Answers" value={results.correctAnswers} icon="bx bx-check-circle" />
              <ResultCard title="Score" value={results.score} icon="bx bx-archive" />
            </div>
            <div className="d-flex justify-content-start mt-4"> {/* Left-aligned button */}
              <button className="btn btn-primary">Back to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
