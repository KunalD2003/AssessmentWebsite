import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.getAssessment.authStatus)
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/userid/assessments')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
    return loader ? <h1> Loading....</h1> : <>{children}</>
}

export default AuthLayout