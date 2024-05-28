import { useEffect, useState } from "react";
import { AxiosInstance1 } from "../AxiosInstance";

export default function mcqQuestion() {
    const [data, setData] = useState()
    useEffect(() => {
        AxiosInstance1.get("/api/mcqquestions")
            .then((response) => {
                return response.data.myData; // Update state with fetched questions
            })
            .then((response) => {
                return setData(response)
            })
    }, [])
    return data
}