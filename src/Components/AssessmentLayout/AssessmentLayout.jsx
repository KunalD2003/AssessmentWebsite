import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AssessmentLayout({ children, assessment = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const assessStatus = useSelector((state) => state.getAssessment.assessmentStatus)
    const currentAssessment = useSelector((state) => state.getAssessment.currentAssessmentId)
    useEffect(() => {
        if (assessment && assessStatus !== assessment) {
            navigate(`/${currentAssessment}/assessment`)
        }
        else if (!assessment && assessStatus !== assessment) {
            navigate(`/${currentAssessment}/result`)
        }
        setLoader(false)
    }, [assessStatus, navigate, assessment])
    return loader ? <h1> Loading....</h1> : <>{children}</>
}

export default AssessmentLayout