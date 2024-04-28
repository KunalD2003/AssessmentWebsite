import React from 'react'
import './ArchievedExams.css'
import archievedResult from '../../Hooks/archievedResults'


function ArchievedExams() {
  const tempData = archievedResult();
  console.log(tempData);
  return (
    <div className='archieved-exams'>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Exam Name</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody className=''>
          {tempData.map((index) => (
            <tr>
              <td>{index.assessmentName}</td>
              <td>{index.status}</td>
              <td>{index.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ArchievedExams