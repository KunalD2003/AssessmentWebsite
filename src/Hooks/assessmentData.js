import { useEffect, useState } from "react";
import { AxiosInstance } from "../AxiosInstance";


let assessmentData = () => {
    const [data, setData] = useState([``])
    useEffect(() => {
        AxiosInstance.get("/api/assessments")
            .then((response) => {
                return response.data
            })
            .then((response) => {
                return setData(response)
            })
    }, [])
    return data
}



export default assessmentData