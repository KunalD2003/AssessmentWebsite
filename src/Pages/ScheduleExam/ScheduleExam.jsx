<<<<<<< HEAD
// import React, { useState } from "react";
// import "./ScheduleExam.css";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { getquestionData } from "../../Hooks/questionData";
// import { nanoid } from "@reduxjs/toolkit";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function ScheduleExam() {
//   const { register, handleSubmit } = useForm();
//   const [indexCount, setIndexCount] = useState(0);
//   const [newFormData, setFormData] = useState({});
//   const [sectionList, setSectionList] = useState([
//     {
//       id: nanoid(),
//       index: indexCount,
//     },
//   ]);

//   const section = getquestionData();
//   const onSubmit = async (data) => {
//     newFormData.AssessmentTitle = data.AssessmentTitle;
//     newFormData.AssessmentStartDate = data.AssessmentStartDate;
//     newFormData.AssessmentEndDate = data.AssessmentEndDate;
//     newFormData.Sections = [{}, {}];
//     console.log(newFormData);

//     try {
//       const response = await axios({
//         method: "post",
//         url: "/api/assessments",
//         data: newFormData,
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="schedule-exam">
//       <div>
//         <h1>Schedule Assessment</h1>
//       </div>
//       <Form className="schedule-form" onSubmit={handleSubmit(onSubmit)}>
//         <h3>1. Enter Assessment Details</h3>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>Enter Assessment Title:</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter Assessment Title"
//             {...register("AssessmentTitle")}
//           />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>Assessment Start Date:</Form.Label>
//           <Form.Control type="date" {...register("AssessmentStartDate")} />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>Assessment Start Time:</Form.Label>
//           <Form.Control type="time" {...register("AssessmentStartTime")} />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>Assessment End Date:</Form.Label>
//           <Form.Control type="date" {...register("AssessmentEndDate")} />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>Assessment End Time:</Form.Label>
//           <Form.Control type="time" {...register("AssessmentEndTime")} />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//           <Form.Label>Assessment Duration (in min.) :</Form.Label>
//           <Form.Control type="number" {...register("AssessmentDuration")} />
//         </Form.Group>

//         <div className="schedule-add-section-btn">
//           {/* ...............Button crete........... */}
//           <Form.Control
//             variant="secondary"
//             type="submit"
//             value={"Create Assessment"}
//             className="create-assessment-btn"
//           />
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default ScheduleExam;

import React, { useState } from "react";
import axios from "axios";
import "./ScheduleExam.css";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
=======
import React, { useState } from 'react'
import './ScheduleExam.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { getquestionData } from '../../Hooks/questionData';
import { nanoid } from '@reduxjs/toolkit';
import { useForm } from "react-hook-form";
import axios from 'axios';
>>>>>>> 5746691 (Coading Question API commit)

function ScheduleExam() {
  const [formData, setFormData] = useState({
    AssessmentTitle: "",
    AssessmentDate: "",
    AssessmentStartTime: "",
    AssessmentEndTime: "",
    AssessmentDuration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/assessments",
        formData
      );
      alert('Successfully Scheduled Exam')
      toast.success('Successfully Scheduled Exam',{
        position: "top-center",
        theme: "dark",
    })
      console.log(response.data);
      // Handle success, show message to user, etc.
    } catch (error) {
      alert('Not Schedule Exam')
      toast.error('Not Schedule Exam',{
        position:'top-left',
        theme: "dark",
    })
      console.error("Error submitting assessment data:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <>
      <h1 className="headText">Schedule Exam</h1>
      <form  className="FormContainer">
        <div className="inputContainer">
          <h5 style={{}}>Assessment Title:</h5>
          <input
            type="text"
            name="AssessmentTitle"
            value={formData.AssessmentTitle}
            onChange={handleChange}
            placeholder="Assessment Title"
            style={{ alignSelf: "center",width:'50%' }}
          />
        </div>
        <div className="inputContainer">
          <h5>Assessment Start Date:</h5>

          <input
            type="date"
            name="AssessmentDate"
            value={formData.AssessmentDate}
            onChange={handleChange}
            style={{ alignSelf: "center",width:'50%' }}
          />
        </div>
        <br />
        <div className="inputContainer">
          <h5>Assessment Start Time:</h5>
          <input
            type="time"
            name="AssessmentStartTime"
            value={formData.AssessmentStartTime}
            onChange={handleChange}
            style={{ alignSelf: "center",width:'50%' }}
          />
        </div>
        <br />
        <div className="inputContainer">
          <h5>Assessment End Time:</h5>

          <input
            type="time"
            name="AssessmentEndTime"
            value={formData.AssessmentEndTime}
            onChange={handleChange}
            style={{ alignSelf: "center",width:'50%' }}
          />
        </div>
        <br />
        <div className="inputContainer">
          <h5>Assessment duration:</h5>
          <input
            type="text"
            name="AssessmentDuration"
            value={formData.AssessmentDuration}
            onChange={handleChange}
            style={{ alignSelf: "center",width:'50%' }}
          />
        </div>
        <div className="btnContainer">
          <Button onClick={handleSubmit} variant="success">Create Assesment</Button>
        </div>
      </form>
    </>
  );
}

export default ScheduleExam;
