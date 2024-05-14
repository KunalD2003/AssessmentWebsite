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













// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { nanoid } from "@reduxjs/toolkit";
// import axios from "axios"; // Import axios
// import "./Hero.css";
// import clockIcon from "../../assets/img/time-icon.svg";
// import fileIcon from "../../assets/img/file-icon.svg";
// import { Button, Form, Modal } from "react-bootstrap";

// function Hero() {
//   // .....api get state
//   const [assesmentdata, setAssesmentData] = useState([]);
//   //.....api get state end
//   //modal state
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   //modal state end

//   // ............update ke liye state start
//   const [formData, setFormData] = useState({
//     AssessmentTitle: "",
//     AssessmentDate: "",
//     AssessmentStartTime: "",
//     AssessmentEndTime: "",
//     AssessmentDuration: "",
//   });

//   //function update start
//   const handleUpdate = async (id) => {
//     try {
//       await axios.put(`http://localhost:3000/api/assessments/${id}`, formData);
//       alert("Assessment Updated");
//       handleClose();
//       fetchData();
//     } catch (error) {
//       console.error("Error updating assessment:", error);
//       alert("Assessment not Updated");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   //function update end
//   // ............update ke liye state end

//   //get api function start...
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/assessments");
//       setAssesmentData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   //get api function start End...

//   //delete API integration function
//   const handleDelete = async (id) => {
//     console.log("To be delete ID: ", id);
//     try {
//       await axios.delete(`http://localhost:3000/api/assessments/${id}`); // Remove colon (:) before userId
//       // assessmentData(); // Fetch data again after deletion
//       alert("Assessment Delete");
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Assessment not Delete");
//     }
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="herosection">
//       {assesmentdata.map((index) => (
        // <div className="card user-dashboard-card">
        //   <div
        //     className="assessment-role-title"
        //     style={{ justifyContent: "center", alignItems: "center" }}
        //   >
        //     <h2 style={{ textAlign: "center" }}>{index.AssessmentTitle}</h2>
        //   </div>
        //   <div className="card-body assessment-start-card-body">
        //     <div className="assessment-details">
        //       <div>
        //         <i className="bx bx-calendar assessment-details-icon"></i>
        //         <p>Date:</p>
        //       </div>
        //       <p>
        //         {index.AssessmentDate}{" "}
        //         <span className="start-assessment-time"></span>
        //       </p>
        //     </div>
        //     <div className="assessment-details">
        //       <div>
        //         <i className="bx bx-stopwatch assessment-details-icon"></i>
        //         <p>Exam Start:</p>
        //       </div>
        //       <p>{index.AssessmentStartTime}</p>
        //     </div>

        //     <div className="assessment-details">
        //       <div>
        //         <i className="bx bx-calendar assessment-details-icon"></i>
        //         <p>Exam End:</p>
        //       </div>
        //       <p>
        //         {index.AssessmentEndTime}
        //         <span className="start-assessment-time"></span>
        //       </p>
        //     </div>
        //     <div className="start-assesment-btn">
        //       <button type="button" className="btn btn-info">
        //         View Results
        //       </button>
        //       <button
        //         type="button"
        //         className="btn btn-primary"
        //         onClick={handleShow}
        //       >
        //         Edit
        //       </button>
        //       <button
        //         type="button"
        //         className="btn btn-danger"
        //         onClick={() => handleDelete(index._id)}
        //       >
        //         Delete
        //       </button>
        //     </div>
        //   </div>
        // </div>
//       ))}

//       {/* modal */}
//       <Modal show={show} onHide={handleClose}>
//         <form>
//           <h3 style={{ marginTop: "2%", textAlign: "center", fontWeight: 700 }}>
//             UPDATE EXAM
//           </h3>
//           <div className="modalinputContainer">
//             <h6 style={{ marginTop: "3%" }}>Assessment Title:</h6>
//             <input
//               type="text"
//               name="AssessmentTitle"
//               value={formData.AssessmentTitle}
//               onChange={handleChange}
//               placeholder="Assessment Title"
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//                 marginBottom: "4%",
//               }}
//             />
//           </div>
//           <div className="modalinputContainer">
//             <h6>Assessment Start Date:</h6>
//             <input
//               type="date"
//               name="AssessmentDate"
//               value={formData.AssessmentDate}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment Start Time:</h6>
//             <input
//               type="time"
//               name="AssessmentStartTime"
//               value={formData.AssessmentStartTime}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment End Time:</h6>
//             <input
//               type="time"
//               name="AssessmentEndTime"
//               value={formData.AssessmentEndTime}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment duration:</h6>
//             <input
//               type="text"
//               placeholder="Assessment duration"
//               name="AssessmentDuration"
//               value={formData.AssessmentDuration}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginLeft: "1%",
//                 marginBottom: "2%",
//               }}
//             />
//           </div>
//         </form>

//         <Button
//           variant="primary"
//           onClick={() => handleUpdate(formData._id)}
//           style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
//         >
//           Update
//         </Button>

//         <Button
//           variant="secondary"
//           onClick={handleClose}
//           style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
//         >
//           Close
//         </Button>
//       </Modal>
//     </div>
//     // </div>
//   );
// }

// export default Hero;












// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Hero.css";
// import { Button, Modal } from "react-bootstrap";

// function Hero() {
//   const [assesmentdata, setAssesmentData] = useState([]);
//   const [show, setShow] = useState(false);
// const [formData, setFormData] = useState({
//   _id:"",
//   AssessmentTitle: "",
//   AssessmentDate: "",
//   AssessmentStartTime: "",
//   AssessmentEndTime: "",
//   AssessmentDuration: "",
// });

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/assessments");
//       setAssesmentData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/assessments/${_id}`);
//       alert("Assessment Deleted");
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting assessment:", error);
//       alert("Assessment not Deleted");
//     }
//   };

// const handleUpdate = async (id) => {
//   try {
//     await axios.put(`http://localhost:3000/api/assessments/${_id}`, formData);
//     alert("Assessment Updated");
//     handleClose();
//     fetchData();
//   } catch (error) {
//     console.error("Error updating assessment:", error);
//     alert("Assessment not Updated");
//   }
// };

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

//   return (
//     <div className="herosection">
//       {assesmentdata.map((index) => (
//         <div className="card user-dashboard-card">
//         <div
//           className="assessment-role-title"
//           style={{ justifyContent: "center", alignItems: "center" }}
//         >
//           <h2 style={{ textAlign: "center" }}>{index.AssessmentTitle}</h2>
//         </div>
//         <div className="card-body assessment-start-card-body">
//           <div className="assessment-details">
//             <div>
//               <i className="bx bx-calendar assessment-details-icon"></i>
//               <p>Date:</p>
//             </div>
//             <p>
//               {index.AssessmentDate}{" "}
//               <span className="start-assessment-time"></span>
//             </p>
//           </div>
//           <div className="assessment-details">
//             <div>
//               <i className="bx bx-stopwatch assessment-details-icon"></i>
//               <p>Exam Start:</p>
//             </div>
//             <p>{index.AssessmentStartTime}</p>
//           </div>

//           <div className="assessment-details">
//             <div>
//               <i className="bx bx-calendar assessment-details-icon"></i>
//               <p>Exam End:</p>
//             </div>
//             <p>
//               {index.AssessmentEndTime}
//               <span className="start-assessment-time"></span>
//             </p>
//           </div>
//           <div className="start-assesment-btn">
//             <button type="button" className="btn btn-info">
//               View Results
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={handleShow}
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               className="btn btn-danger"
//               onClick={() => handleDelete(index._id)}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//       ))}

//       <Modal show={show} onHide={handleClose}>
//         <form>
//           <h3 style={{ marginTop: "2%", textAlign: "center", fontWeight: 700 }}>
//             UPDATE EXAM
//           </h3>
//           <div className="modalinputContainer">
//             <h6 style={{ marginTop: "3%" }}>Assessment Title:</h6>
//             <input
//               type="text"
//               name="AssessmentTitle"
//               value={formData.AssessmentTitle}
//               onChange={handleChange}
//               placeholder="Assessment Title"
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//                 marginBottom: "4%",
//               }}
//             />
//           </div>
//           <div className="modalinputContainer">
//             <h6>Assessment Start Date:</h6>
//             <input
//               type="date"
//               name="AssessmentDate"
//               value={formData.AssessmentDate}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment Start Time:</h6>
//             <input
//               type="time"
//               name="AssessmentStartTime"
//               value={formData.AssessmentStartTime}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment End Time:</h6>
//             <input
//               type="time"
//               name="AssessmentEndTime"
//               value={formData.AssessmentEndTime}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment duration:</h6>
//             <input
//               type="text"
//               placeholder="Assessment duration"
//               name="AssessmentDuration"
//               value={formData.AssessmentDuration}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginLeft: "1%",
//                 marginBottom: "2%",
//               }}
//             />
//           </div>
//         </form>

//         <Button
//           variant="primary"
//           onClick={() => handleUpdate(formData._id)}
//           style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
//         >
//           Update
//         </Button>

//         <Button
//           variant="secondary"
//           onClick={handleClose}
//           style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
//         >
//           Close
//         </Button>
//       </Modal>
//     </div>
//   );
// }

// export default Hero;









import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hero.css";
import { Button, Modal } from "react-bootstrap";

function Hero() {
  const [assesmentdata, setAssesmentData] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    AssessmentTitle: "",
    AssessmentDate: "",
    AssessmentStartTime: "",
    AssessmentEndTime: "",
    AssessmentDuration: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/assessments");
      setAssesmentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/assessments/${id}`);
      alert("Assessment Deleted");
      fetchData();
    } catch (error) {
      console.error("Error deleting assessment:", error);
      alert("Assessment not Deleted");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/assessments/${formData._id}`, formData);
      alert("Assessment Updated");
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error updating assessment:", error);
      alert("Assessment not Updated");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="herosection">
      {assesmentdata.map((index) => (
        <div className="card user-dashboard-card" key={index._id}>
          <div
            className="assessment-role-title"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <h2 style={{ textAlign: "center" }}>{index.AssessmentTitle}</h2>
          </div>
          <div className="card-body assessment-start-card-body">
            <div className="assessment-details">
              <div>
                <i className="bx bx-calendar assessment-details-icon"></i>
                <p>Date:</p>
              </div>
              <p>
                {index.AssessmentDate}{" "}
                <span className="start-assessment-time"></span>
              </p>
            </div>
            <div className="assessment-details">
              <div>
                <i className="bx bx-stopwatch assessment-details-icon"></i>
                <p>Exam Start:</p>
              </div>
              <p>{index.AssessmentStartTime}</p>
            </div>

            <div className="assessment-details">
              <div>
                <i className="bx bx-calendar assessment-details-icon"></i>
                <p>Exam End:</p>
              </div>
              <p>
                {index.AssessmentEndTime}
                <span className="start-assessment-time"></span>
              </p>
            </div>
            <div className="start-assesment-btn">
              <button type="button" className="btn btn-info">
                View Results
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setFormData({
                    _id: index._id,
                    AssessmentTitle: index.AssessmentTitle,
                    AssessmentDate: index.AssessmentDate,
                    AssessmentStartTime: index.AssessmentStartTime,
                    AssessmentEndTime: index.AssessmentEndTime,
                    AssessmentDuration: index.AssessmentDuration,
                  });
                  handleShow();
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(index._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <form>
          <h3 style={{ marginTop: "2%", textAlign: "center", fontWeight: 700 }}>
            UPDATE EXAM
          </h3>
          <div className="modalinputContainer">
            <h6 style={{ marginTop: "3%" }}>Assessment Title:</h6>
            <input
              type="text"
              name="AssessmentTitle"
              value={formData.AssessmentTitle}
              onChange={handleChange}
              placeholder="Assessment Title"
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
                marginBottom: "4%",
              }}
            />
          </div>
          <div className="modalinputContainer">
            <h6>Assessment Start Date:</h6>
            <input
              type="date"
              name="AssessmentDate"
              value={formData.AssessmentDate}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
              }}
            />
          </div>
          <br />
          <div className="modalinputContainer">
            <h6>Assessment Start Time:</h6>
            <input
              type="time"
              name="AssessmentStartTime"
              value={formData.AssessmentStartTime}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
              }}
            />
          </div>
          <br />
          <div className="modalinputContainer">
            <h6>Assessment End Time:</h6>
            <input
              type="time"
              name="AssessmentEndTime"
              value={formData.AssessmentEndTime}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
              }}
            />
          </div>
          <br />
          <div className="modalinputContainer">
            <h6>Assessment duration:</h6>
            <input
              type="text"
              placeholder="Assessment duration"
              name="AssessmentDuration"
              value={formData.AssessmentDuration}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginLeft: "1%",
                marginBottom: "2%",
              }}
            />
          </div>
        </form>

        <Button
          variant="primary"
          onClick={handleUpdate}
          style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
        >
          Update
        </Button>

        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
        >
          Close
        </Button>
      </Modal>
    </div>
  );
}

export default Hero;