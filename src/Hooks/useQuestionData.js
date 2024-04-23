import { useEffect,useCallback,useState } from "react";


const TestData = [
    {
        text: "text 1"
    },
    {
        text: "text 3"
    },
    {
        text: "text 4"
    },
    {
        text: "text 5"
    },
    {
        text: "text 6"
    },
]
let useQuestionData = () => {
    const [data, setData] = useState("")
    useEffect(() => {
        fetch(`https://api.github.com/users/KunalD2003`)
        .then((response) => {
            // console.log(response);
            return response.json()
        })
        .then((response) => {
            return setData(TestData)
        })
    },[])
    return data
}

export default useQuestionData