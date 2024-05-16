

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResultPage.css'; // Custom CSS for styling
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

// Component for individual result cards with text and icons
const ResultCard = ({ title, value, icon }) =>
(
  <div className="col-md-6 col-sm-12 mb-3">
    <div className="card result-card">
      <div className="card-body">
        <div className="card-title text-center">
          <h5 className="card-title" style={{ fontSize: '1.5rem' }}>{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text" style={{ fontSize: '1.2rem' }}>{value}</p>
          {icon && <i className={icon} style={{ fontSize: '1.5rem' }}></i>}
        </div>
      </div>
    </div>
  </div>
);

// Main component for the results page
const ResultPage = ({ id }) => {
  // State to hold the fetched result data
  const [results, setResults] = useState(null); // Changed to null to handle loading state
  const [assessmentTitle, setAssessmentTitle] = useState("")
  const navigate = useNavigate()
  const { assessmentid } = useParams()
  const userId = useSelector((state) => {
    return state.getAssessment.userDetails.userId
  })
  // Function to fetch result data from backend

  useEffect(() => {
    let isAddedToArchive = false;


    const addArchievedExams = async (data) => {
      if (!isAddedToArchive) {
        isAddedToArchive = true;
        const date = new Date()
        const currentAssessment = await axios.get(`http://localhost:3000/api/assessments/${data.AssessmentId}`)
          .then((response) => {
            console.log(response.data);
            return response.data
          })
        const passData = {
          examname: currentAssessment.AssessmentTitle,
          score: (data.Uscore + data.UcodingScore),
          Date: date.toLocaleDateString,
          userid: data.userId,
          assessmentid: data.AssessmentId
        }
        const response = await fetch('http://localhost:3001/archievedexamresult', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(passData)
        });
      }
    }
    // Fetch MCQ questions from the API
    axios.get(`/result/all`)
      .then((response) => {
        const data = response.data.find((index) => {
          if (index.AssessmentId === assessmentid && index.userId === userId) {
            setResults(index)
            addArchievedExams(index)
            console.log(index);
          }
        })
      })
      .catch((error) => {
        console.error("Error in result fetch:", error);
      });
  }, []);

  // If results are not fetched or loading, return loading message
  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div className="result-page" style={{ height: '100vh' }}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="row justify-content-center">
              <ResultCard title="totalQuestions" value={results.UtotalQuestions} icon="bx bx-file" />
              <ResultCard title="answeredQuestions" value={results.UansweredQuestions} icon="bx bx-select-multiple" />
            </div>
            <div className="row justify-content-center">
              <ResultCard title="correctAnswers" value={results.UcorrectAnswers} icon="bx bx-check-circle" />
              {/* Use different value for Score if needed */}
              <ResultCard title="score" value={results.Uscore} icon="bx bx-archive" />
            </div>
            <div className="d-flex justify-content-start mt-4">
              <button className="btn btn-primary" onClick={() => {
                navigate("/userid/assessments")
              }}>Back to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;


