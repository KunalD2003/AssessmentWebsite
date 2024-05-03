import { useEffect, useCallback, useState } from "react";
import axios from 'axios';

const TestData = [
    {
        assessmentName: "Junior Software Engineer",
        status: "Cleared",
        date: "20-04-2024"
    },
    {
        assessmentName: "HR Intern",
        status: "Uncleared",
        date: "15-04-2024"
    },
    {
        assessmentName: "QA Fresher",
        status: "Cleared",
        date: "12-04-2024"
    },
    {
        assessmentName: "Frontend Developer",
        status: "Uncleared",
        date: "05-04-2024"
    },
]
let assessmentData = () => {
    const [data, setData] = useState([``])
    useEffect(() => {
        axios.get("/api/assessments")
            .then((response) => {
                console.log(response.data);
                return response.data
            })
            .then((response) => {
                console.log(response);
                return setData(response)
            })
    }, [])
    return data
}



export default assessmentData