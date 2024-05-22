import React, { useEffect, useState } from 'react'
import './ArchievedExams.css'
import assessmentData from '../../Hooks/assessmentData'
import archievedexamresult from '../../Hooks/archievedExamsData';

function ArchievedExams() {
  const [archievedList, setArchievedList] = useState([])
  const tempData = archievedexamresult();
  useEffect(() => {
    if(tempData){
      setArchievedList(tempData)
      console.log(archievedList);
    }
  },[tempData])
  return (
    <div className='archieved-exams'>
      {(archievedList.length ===  0) ? <h1 style={{color:'green',display:'flex',justifyContent:"center",alignItems:'center'}}>Loading...</h1> : (
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Exam Name</th>
            <th scope="col">Score</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody className=''>
           {archievedList.map((index) => (
            <tr>
              <td>{index.examname}</td>
              <td>{index.score}</td>
              <td>{index.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
}

export default ArchievedExams