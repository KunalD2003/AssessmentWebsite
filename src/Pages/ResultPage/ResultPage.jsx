import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResultPage.css'; // Custom CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { resetCodingScore, setAssessmentStatus, setQuestionSection } from '../../Store/assessmentData';
import { AxiosInstance, AxiosInstance1 } from '../../AxiosInstance';


const ResultCard = ({ title, value, icon }) =>
(
  <div className="col-md-4 col-sm-12 mb-3">
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


const ResultPage = ({ id }) => {
  
  const [results, setResults] = useState(null); // Changed to null to handle loading state
  const [assessmentTitle, setAssessmentTitle] = useState("")
  const [codingQuestionLength, setCodingQuestionLength] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { assessmentid } = useParams()
  const userId = useSelector((state) => {
    return state.getAssessment.userDetails.userId
  })
  
  
  let questions = useSelector((state) => {
    return state.getAssessment.questionBank
  })
  useEffect(() => {
    let isAddedToArchive = false;
    setCodingQuestionLength(questions.length)
    const addArchievedExams = async (data) => {
      if (!isAddedToArchive) {
        isAddedToArchive = true;
        const date = new Date()
        const currentAssessment = await AxiosInstance.get(`https://assessmentwebsite-6.onrender.com/api/assessments/${data.AssessmentId}`)
          .then((response) => {
            return response.data
          })
        const passData = {
          examname: currentAssessment.AssessmentTitle,
          score: (data.Uscore + data.UcodingScore),
          Date: date.toLocaleDateString,
          userid: data.userId,
          assessmentid: data.AssessmentId
        }
        const response = await fetch(`${import.meta.env.VITE_API_ANKIT_URL}/archievedexamresult`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(passData)
        });
      }
    }
    
    AxiosInstance1.get(`/result/all`)
      .then((response) => {
        const data = response.data.find((index) => {
          if (index.AssessmentId === assessmentid && index.userId === userId) {
            setResults(index)
            addArchievedExams(index)
          }
        })
      })
      .catch((error) => {
        console.error("Error in result fetch:", error);
      });
  }, []);

  
  if (!results) {
    return <h1 style={{color:'green',display:'flex',justifyContent:"center",alignItems:'center'}}>Loading...</h1>;
  }

  return (
    <div className="result-page" style={{ height: '100%', minHeight:'100vh', paddingBlock: '2rem'}}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="row justify-content-center">
              <ResultCard title="Total Logical Aptitude Questions" value={results.UtotalQuestions} icon="bx bx-file" />
              <ResultCard title="Logical Aptitude Correct Answers" value={results.Uscore/1} icon="bx bx-select-multiple" />
              <ResultCard title="Score in Logical Aptitude" value={results.Uscore} icon="bx bx-select-multiple" />
              <ResultCard title="Total Programming Test Question" value={codingQuestionLength} icon="bx bx-file" />
              <ResultCard title="Programming Test Correct Answers" value={results.UcodingScore/5} icon="bx bx-check-circle" />
              <ResultCard title="Score in Programming Test" value={results.UcodingScore} icon="bx bx-check-circle" />
              
              <ResultCard title="Total Score" value={(results.Uscore + results.UcodingScore)} icon="bx bx-archive" />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-primary" onClick={() => {
                dispatch(setAssessmentStatus())
                dispatch(setQuestionSection(["Logical Apptitude", "MCQ"]))
                dispatch(resetCodingScore())
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



