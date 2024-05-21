import React, { useEffect, useState } from "react";
import "./AssessmentNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionSection } from "../../../Store/assessmentData";
import ReactPaginate from "react-paginate";
import axios from "axios"; // Importing axios
import FaceDetection from "../../Webcame/FaceDetection";
import * as tf from "@tensorflow/tfjs";
import assessmentData from "../../../Hooks/assessmentData";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const CountdownTimer = ({ minutes, seconds }) => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  });
  const { assessmentid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft((prevTimeLeft) => ({
          ...prevTimeLeft,
          seconds: prevTimeLeft.seconds - 1,
        }));
      } else if (timeLeft.minutes > 0) {
        setTimeLeft((prevTimeLeft) => ({
          minutes: prevTimeLeft.minutes - 1,
          seconds: 59,
        }));
      } else if (timeLeft.minutes == 0 && timeLeft.minutes == 0) {
        navigate(`/${assessmentid}/result`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft.minutes}:
      {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
    </div>
  );
};

function AssessmentNavbar() {

  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const { assessmentid } = useParams();
  const AssessmentData = useSelector((state) => {
    return state.getAssessment;
  });
  const dispatch = useDispatch();
  const [section, setSection] = useState(
    AssessmentData.questionBank[0].sectionName
  );
  const [pageNumber, setPageNumber] = useState(0); // For pagination
  const [assessmentDuration, SetAssessmentDuration] = useState();
  const assessments = assessmentData();

  useEffect(() => {
    // Set WebGL as backend
    tf.setBackend("webgl")
      .then(() => console.log("Using WebGL backend"))
      .catch((error) => {
        console.error("Error setting backend:", error);
        // Optionally fallback to another backend
      });

    // Ensure TensorFlow.js is ready
    tf.ready().then(() => {
      console.log("TensorFlow.js is ready");
    });
  }, []);

  const handlePageClick = (data) => {
    setPageNumber(data.selected); // Update pageNumber when page is clicked
  };

  const handleNextQuestion = () => {
    // Fetch next question from API
    fetchNextQuestion();
  };

  const fetchNextQuestion = () => {
    // Call your API to fetch the next question
    // Assuming the API returns the next question in AssessmentData
    // You need to replace this with your actual API call
    axios
      .get("/api/nextQuestion")
      .then((response) => {
        const nextQuestionIndex = pageNumber + 1;
        if (nextQuestionIndex < AssessmentData.questionBank.length) {
          setSection(
            AssessmentData.questionBank[nextQuestionIndex].sectionName
          );
          dispatch(
            setQuestionSection([
              AssessmentData.questionBank[nextQuestionIndex].sectionName,
              AssessmentData.questionBank[nextQuestionIndex].sectionType,
            ])
          );
          setPageNumber(nextQuestionIndex);
        } else {
          console.log("No more questions available");
        }
      })
      .catch((error) => {
        console.error("Error fetching next question:", error);
      });
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 1);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(1, "0")}`;
  };

  return (
    <div className="assessment-navbar">
      <div className="camera-monitoring">
        <FaceDetection></FaceDetection>
      </div>
      <div className="assessment-navbar-two-section">
        <div className="camera-title-timer-submit">
          <div>
            <h3>Candidate Assesment Test</h3>
          </div>
          <div className="timer-submit">
            {assessments.map((index) =>
              assessmentid === index._id ? (
                <div>
                  Remaining Time:
                  <span>
                    <CountdownTimer
                      minutes={index.AssessmentDuration}
                      seconds="00"
                    />
                  </span>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
        <div className="camera-questions">
          <div className="questions-pagination">
            <div>
              {/* <select
                name="Choose Section"
                id="id"
                value={section}
                onChange={(e) => {
                  setSection(e.target.value);
                  console.log(e.target.value);
                  AssessmentData.questionBank.map((index) => {
                    if (e.target.value === index.sectionName) {
                      dispatch(
                        setQuestionSection([
                          index.sectionName,
                          index.sectionType,
                        ])
                      );
                    }
                  });
                }}
              >
                {AssessmentData.questionBank.map((index) => (
                  <option
                    key={`${index.sectionName}`}
                    value={`${index.sectionName}`}
                  >
                    {index.sectionName}
                  </option>
                ))}
              </select> */}
              <h6>Current Section: <span>{AssessmentData.currentPage}</span></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentNavbar;
