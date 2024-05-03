import React, { useEffect, useState } from 'react';
import './AssessmentNavbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionSection } from '../../../Store/assessmentData';
import ReactPaginate from 'react-paginate';
import axios from 'axios'; // Importing axios

function AssessmentNavbar() {
    const AssessmentData = useSelector((state) => {
        return state.getAssessment;
    });
    const dispatch = useDispatch();
    const [section, setSection] = useState(AssessmentData.questionBank[0].sectionName);
    const [pageNumber, setPageNumber] = useState(0); // For pagination

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
        axios.get("/api/nextQuestion")
            .then((response) => {
                const nextQuestionIndex = pageNumber + 1;
                if (nextQuestionIndex < AssessmentData.questionBank.length) {
                    setSection(AssessmentData.questionBank[nextQuestionIndex].sectionName);
                    dispatch(setQuestionSection([AssessmentData.questionBank[nextQuestionIndex].sectionName, AssessmentData.questionBank[nextQuestionIndex].sectionType]));
                    setPageNumber(nextQuestionIndex);
                } else {
                    console.log("No more questions available");
                }
            })
            .catch((error) => {
                console.error("Error fetching next question:", error);
            });
    };

    return (
        <div className='assessment-navbar'>
            <div className='camera-monitoring'>
                camera
            </div>
            <div className='assessment-navbar-two-section'>
                <div className='camera-title-timer-submit'>
                    <div>
                        <h3>Candidate Assesment Test</h3>
                    </div>
                    <div className='timer-submit'>
                        <div>timer</div>
                        <a className="btn btn-primary" href="#" role="button">Submit Test</a>
                    </div>
                </div>
                <div className='camera-questions'>
                    <div className='questions-pagination'>
                        <div>
                            <select name="Choose Section" id="id" value={section} onChange={(e) => {
                                setSection(e.target.value);
                                console.log(e.target.value);
                                AssessmentData.questionBank.map((index) => {
                                    if (e.target.value === index.sectionName) {
                                        dispatch(setQuestionSection([index.sectionName, index.sectionType]));
                                    }
                                });
                            }}>
                                {AssessmentData.questionBank.map((index) => (
                                    <option key={`${index.sectionName}`} value={`${index.sectionName}`} >{index.sectionName}</option>
                                ))}
                            </select>
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssessmentNavbar;
