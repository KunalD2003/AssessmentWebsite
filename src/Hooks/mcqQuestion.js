import { useEffect, useState } from "react";
import axios from 'axios';

export default function mcqQuestion() {
    const [data, setData] = useState()
    useEffect(() => {
        axios.get("/api/mcqquestions")
            .then((response) => {
                return response.data.myData; // Update state with fetched questions
            })
            .then((response) => {
                return setData(response)
            })
    }, [])
    return data
}