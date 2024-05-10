// import React from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import { nanoid } from '@reduxjs/toolkit';
// import './Hero.css';
// import clockIcon from '../../assets/img/time-icon.svg';
// import fileIcon from '../../assets/img/file-icon.svg';
// import assessmentData from '../../Hooks/assessmentData'
// import axios from 'axios';

// const AssessmentCard = [
//   {
//     id: nanoid(),
//     title: "Web Developer",
//     totalQuestions: 45,
//     duration: "1 hour",
//     startDate: "4/27/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
//   {
//     id: nanoid(),
//     title: "Andorid Developer",
//     totalQuestions: 45,
//     duration: "1 hour",
//     startDate: "4/28/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
//   {
//     id: nanoid(),
//     title: "Frontend Developer",
//     totalQuestions: 50,
//     duration: "45 min",
//     startDate: "4/27/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
//   {
//     id: nanoid(),
//     title: "React Developer",
//     totalQuestions: 60,
//     duration: "1:30 hour",
//     startDate: "4/27/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
// ]

// //delete API integration function
// const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:3000/api/assessments/${id}`); // Remove colon (:) before userId
//     assessmentData(); // Fetch data again after deletion
//     alert('User Data Delete');
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     alert('User Data not Delete');
//   }
// };


// function Hero() {
//   const navigate = useNavigate(); 
//   const assessment = assessmentData()
//   console.log(assessment);
//   return (
//     <div className="herosection">
//       {assessment.map((index) => (
//         <div className="card user-dashboard-card" >
//           <div className='assessment-role-title' style={{justifyContent:'center',alignItems:'center'}}>
//             <h2 style={{textAlign:'center'}}>{index.AssessmentTitle}</h2>
//           </div>
//           <div className="card-body assessment-start-card-body">
//           <div className='assessment-details'>
//               <div>
//                 <i className='bx bx-calendar assessment-details-icon'></i>
//                 <p>Date:</p>
//               </div>
//               <p>{index.AssessmentDate} <span className='start-assessment-time'></span></p>
//             </div>
//             <div className='assessment-details'>
//               <div>
//                 <i className='bx bx-stopwatch assessment-details-icon'></i>
//                 <p>Exam Start:</p>
//               </div>
//               <p>{index.AssessmentStartTime}</p>
//             </div>
            
//             <div className='assessment-details'>
//               <div>
//                 <i className='bx bx-calendar assessment-details-icon'></i>
//                 <p>Exam End:</p>
//               </div>
//               <p>{index.AssessmentEndTime} <span className='start-assessment-time'></span></p>
//             </div>
//             <div className='start-assesment-btn'>
//               <button type="button" className="btn btn-info" >View Results</button>
//               <button type="button" className="btn btn-primary" >Edit</button>
//               <button type="button" className="btn btn-danger" onClick={() => handleDelete(index.id)}>Delete</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//     // </div>
//   )
// }

// export default Hero


import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios
import './Hero.css';
import clockIcon from '../../assets/img/time-icon.svg';
import fileIcon from '../../assets/img/file-icon.svg';
import assessmentData from '../../Hooks/assessmentData';

// const AssessmentCard = [
//   {
//     id: nanoid(),
//     title: "Web Developer",
//     totalQuestions: 45,
//     duration: "1 hour",
//     startDate: "4/27/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
//   {
//     id: nanoid(),
//     title: "Andorid Developer",
//     totalQuestions: 45,
//     duration: "1 hour",
//     startDate: "4/28/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
//   {
//     id: nanoid(),
//     title: "Frontend Developer",
//     totalQuestions: 50,
//     duration: "45 min",
//     startDate: "4/27/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
//   {
//     id: nanoid(),
//     title: "React Developer",
//     totalQuestions: 60,
//     duration: "1:30 hour",
//     startDate: "4/27/2024",
//     startTime: "12:30 PM",
//     endDate: "4/27/2024",
//     endTime: "1:50 PM"
//   },
// ]

//delete API integration function
const handleDelete = async (id) => {
  console.log("To be delete ID: ", id)
  try {
    await axios.delete(`http://localhost:3000/api/assessments/${id}`); // Remove colon (:) before userId
    // assessmentData(); // Fetch data again after deletion
    alert('User Data Delete');
  } catch (error) {
    console.error("Error deleting user:", error);
    alert('User Data not Delete');
  }
};


function Hero() {
  const navigate = useNavigate(); 
  const assessment = assessmentData()
  console.log(assessment);
  return (
    <div className="herosection">
      {assessment.map((index) => (
        <div className="card user-dashboard-card" >
          <div className='assessment-role-title' style={{justifyContent:'center',alignItems:'center'}}>
            <h2 style={{textAlign:'center'}}>{index.AssessmentTitle}</h2>
          </div>
          <div className="card-body assessment-start-card-body">
          <div className='assessment-details'>
              <div>
                <i className='bx bx-calendar assessment-details-icon'></i>
                <p>Date:</p>
              </div>
              <p>{index.AssessmentDate} <span className='start-assessment-time'></span></p>
            </div>
            <div className='assessment-details'>
              <div>
                <i className='bx bx-stopwatch assessment-details-icon'></i>
                <p>Exam Start:</p>
              </div>
              <p>{index.AssessmentStartTime}</p>
            </div>
            
            <div className='assessment-details'>
              <div>
                <i className='bx bx-calendar assessment-details-icon'></i>
                <p>Exam End:</p>
              </div>
              <p>{index.AssessmentEndTime} <span className='start-assessment-time'></span></p>
            </div>
            <div className='start-assesment-btn'>
              <button type="button" className="btn btn-info" >View Results</button>
              <button type="button" className="btn btn-primary" >Edit</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(index._id)}>Delete</button>
              
            </div>
          </div>
        </div>
      ))}
    </div>
    // </div>
  )
}

export default Hero;
