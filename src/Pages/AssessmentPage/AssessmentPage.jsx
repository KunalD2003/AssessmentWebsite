import React from 'react'
import './AssessmentPage.css'
import { AssessmentNavbar, AssessmentBody } from '../../Components/index'
import useCurrencyInfo from '../../Hooks/useQuestionData'

function AssessmentPage() {
    const temp = useCurrencyInfo()
    console.log(temp);
    return (
        <div className='assessment-page'>
            <AssessmentNavbar />
            <AssessmentBody />

        </div>
    )
}

export default AssessmentPage