import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosInstance1 } from "../AxiosInstance";

let archievedexamresult = () => {
  const [data, setData] = useState([])
  const userId = useSelector((state) => {
    return state.getAssessment.userDetails.userId
  })
  useEffect(() => {
    AxiosInstance1.get(`/archievedexamresult`)
      .then((response) => {
        const archievedData = response.data.filter((index) => {
          if (index.userid === userId) {
            return index
            // addArchievedExams(index)
          }
        })
        return setData(archievedData)
      })
  }, [])
  return data
}



export default archievedexamresult