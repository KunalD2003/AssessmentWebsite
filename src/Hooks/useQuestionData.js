import { useEffect, useCallback, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
// import get

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
                    index.code = ""
                    index.sectionSwitchType = "coding"
                })  
                return setData(response)
            })
    }, [])
    return data
}