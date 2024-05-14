import { useEffect, useCallback, useState } from "react";
import axios from 'axios';


let assessmentData = () => {
    const [data, setData] = useState([])
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
    },[])
    return data
}




export default assessmentData