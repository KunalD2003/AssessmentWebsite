import { useEffect, useState } from "react";
import { AxiosInstance } from "../AxiosInstance";


let assessmentData = () => {
    const [data, setData] = useState([``])
    useEffect(() => {
        AxiosInstance.get("/api/assessments")
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