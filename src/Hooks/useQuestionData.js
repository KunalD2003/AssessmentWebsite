import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setCodingQuestion } from "../Store/assessmentData";
import { AxiosInstance } from "../AxiosInstance";

export default function useQusetionData() {
    const [data, setData] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        AxiosInstance.get("/api/codingProblems")
            .then((response) => {
                return response.data
            })
            .then((response) => {
                response.map((index) => {
                    index.code = "// Write your code here"
                    index.sectionSwitchType = "coding"
                    index.isAttempted = false
                })
                dispatch(setCodingQuestion(response))
                return setData(response)
            })
    }, [])
    return data
}