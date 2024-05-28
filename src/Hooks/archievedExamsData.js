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
        console.log(response.data);
        const archievedData = response.data.filter((index) => {
          if (index.userid === userId) {
            console.log(index);
            return index
            // addArchievedExams(index)
          }
        })
        console.log(archievedData);
        return setData(archievedData)
      })
  }, [])
  return data
}



export default archievedexamresult