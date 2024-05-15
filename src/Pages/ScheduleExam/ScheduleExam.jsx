import './ScheduleExam.css';
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
