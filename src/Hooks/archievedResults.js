import { useEffect, useCallback, useState } from "react";

const TestData = [
    {
        assessmentName: "Junior Software Engineer",
        status: "Cleared",
        date: "20-04-2024"
    },
    {
        assessmentName: "HR Intern",
        status: "Uncleared",
        date: "15-04-2024"
    },
    {
        assessmentName: "QA Fresher",
        status: "Cleared",
        date: "12-04-2024"
    },
    {
        assessmentName: "Frontend Developer",
        status: "Uncleared",
        date: "05-04-2024"
    },
]
let archievedResult = () => {
    const [data, setData] = useState(TestData)
    // fetch(`https://api.github.com/users/KunalD2003`)
    //     .then((response) => {
    //         // console.log(response);
    //         return response.json()
    //     })
    //     .then((response) => {
    //         return setData(TestData)
    //     })
    return data
}

export default archievedResult