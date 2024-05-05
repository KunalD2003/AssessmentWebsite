import { useEffect, useCallback, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";

export default function useQusetionData() {
    const [data, setData] = useState()
    useEffect(() => {
        axios.get("/api/codingProblems")
            .then((response) => {
                return response.data
            })
            .then((response) => {
                return setData(response)
            })
    }, [])
    return data
}