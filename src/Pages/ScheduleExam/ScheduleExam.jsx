import React, { useState } from "react";
import "./ScheduleExam.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getquestionData } from "../../Hooks/questionData";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

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
      toast.success('Successfully Scheduled Exam', {
        position: "top-center",
        theme: "dark",
      })
      console.log(response.data);
      // Handle success, show message to user, etc.
    } catch (error) {
      alert('Not Schedule Exam')
      toast.error('Not Schedule Exam', {
        position: 'top-left',
        theme: "dark",
      })
      console.error("Error submitting assessment data:", error);
      // Handle error, show error message to user, etc.
    }
  };

  return (
    <div className="schedule-exam">
      <div>
        <h1>Schedule Assessment</h1>
      </div>
      <Form className="schedule-form">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Assessment Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Assessment Title"
            name="AssessmentTitle"
            value={formData.AssessmentTitle}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment Start Date:</Form.Label>
          <Form.Control
            type="date"
            name="AssessmentDate"
            value={formData.AssessmentDate}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment Start Time:</Form.Label>
          <Form.Control
            type="time"
            name="AssessmentStartTime"
            value={formData.AssessmentStartTime}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment End Time:</Form.Label>
          <Form.Control
            type="time"
            name="AssessmentEndTime"
            value={formData.AssessmentEndTime}
            onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment Duration (in min.) :</Form.Label>
          <Form.Control
            type="text"
            name="AssessmentDuration"
            value={formData.AssessmentDuration}
            onChange={handleChange} />
        </Form.Group>

        <div className="schedule-add-section-btn">
          {/* ...............Button crete........... */}
          <Button onClick={handleSubmit} variant="success">Create Assesment</Button>
        </div>
      </Form>
    </div>
  );
}

export default ScheduleExam;



// function ScheduleExam() {


//   return (
//     <>
//       <h1 className="headText">Schedule Exam</h1>
//       <form className="FormContainer">
//         <div className="inputContainer">
//           <h5 style={{}}>Assessment Title:</h5>
//           <input

//             style={{ alignSelf: "center", width: '50%' }}
//           />
//         </div>
//         <div className="inputContainer">
//           <h5>Assessment Start Date:</h5>

//           <input

//           />
//         </div>
//         <br />
//         <div className="inputContainer">
//           <h5>Assessment Start Time:</h5>
//           <input

//             style={{ alignSelf: "center", width: '50%' }}
//           />
//         </div>
//         <br />
//         <div className="inputContainer">
//           <h5>Assessment End Time:</h5>

//           <input

//             style={{ alignSelf: "center", width: '50%' }}
//           />
//         </div>
//         <br />
//         <div className="inputContainer">
//           <h5>Assessment duration:</h5>
//           <input

//             style={{ alignSelf: "center", width: '50%' }}
//           />
//         </div>
//         <div className="btnContainer">
//           <Button  variant="success"></Button>
//         </div>
//       </form>
//     </>
//   );
// }

// export default ScheduleExam;
