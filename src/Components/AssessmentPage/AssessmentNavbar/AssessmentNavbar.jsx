import React, { useEffect, useState } from 'react'
import './AssessmentNavbar.css'
import useQuestionData from '../../../Hooks/useQuestionData';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionSection } from '../../../Store/assessmentData';
import ReactPaginate from 'react-paginate'

function AssessmentNavbar() {
    const AssessmentData = useSelector((state) => {
        return state.getAssessment
    })
    const dispatch = useDispatch()
    const [section, setSection] = useState(AssessmentData.questionBank[0].sectionName)
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
                                setSection(e.target.value)
                                console.log(e.target.value);
                                AssessmentData.questionBank.map((index) => {
                                    if(e.target.value === index.sectionName){
                                        dispatch(setQuestionSection([index.sectionName, index.sectionType]))
                                    }
                                })
                            }}>
                                {AssessmentData.questionBank.map((index) => (
                                    <option key={`${index.sectionName}`} value={`${index.sectionName}`} >{index.sectionName}</option>
                                ))}
                            </select>
                        </div>
                        <div className='pagination-pages'>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className='questions-staticstics'>
                            <div>
                                <div className='questions-count'>0</div>
                                <div>Answered</div>
                            </div>
                            <div className='questions-count'>
                                <div>0</div>
                                <div>Flag</div>
                            </div>
                            <div className='questions-count'>
                                <div>0</div>
                                <div>Unanswered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssessmentNavbar