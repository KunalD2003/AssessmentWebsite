import { useEffect, useCallback, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

let archievedexamresult = () => {
  const [data, setData] = useState([])
  const userId = useSelector((state) => {
    return state.getAssessment.userDetails.userId
  })
  useEffect(() => {
    axios.get(`/archievedexamresult`)
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