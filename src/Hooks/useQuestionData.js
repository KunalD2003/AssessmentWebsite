import { useEffect, useCallback, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setCodingQuestion } from "../Store/assessmentData";

export default function useQusetionData() {
    const [data, setData] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get("/api/codingProblems")
            .then((response) => {
                return response.data
            })
            .then((response) => {
                response.map((index) => {
                    index.code = "// Write your code here"
                    index.sectionSwitchType = "coding"
                })
                dispatch(setCodingQuestion(response))
                return setData(response)
            })
    }, [])
    console.log(data);
    return data
}