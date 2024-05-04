import React from 'react'
import './AssessmentPage.css'
import { AssessmentNavbar, AssessmentBody ,AssessmentMCQ} from '../../Components/index'
import { useDispatch, useSelector } from 'react-redux';

function AssessmentPage() {
    const AssessmentData1 = useSelector((state) => {
        return state.getAssessment
    })
    // console.log(AssessmentData1.questionBank[1].questions())
    
    console.log(AssessmentData1);
    return (
        <div className='assessment-page'>
            <AssessmentNavbar />
            {(AssessmentData1.currentPageType === "coding") ? (
                <div>
                    <AssessmentBody />
                </div>
            ) : ''}
            {(AssessmentData1.currentPageType === "MCQ") ? (
                <div>
                    <AssessmentMCQ />
                </div>
            ) : ''}
        </div>
    )
}

export default AssessmentPage