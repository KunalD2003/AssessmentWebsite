import React, { useState } from 'react'
import './ScheduleExam.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getquestionData } from '../../Hooks/questionData';
import { nanoid } from '@reduxjs/toolkit';
import { useForm } from "react-hook-form"
import axios from 'axios';

function ScheduleExam() {

  const { register, handleSubmit } = useForm()
  const [indexCount, setIndexCount] = useState(0)
  const [newFormData, setFormData] = useState({})
  const [sectionList, setSectionList] = useState([
    {
      id: nanoid(),
      index: indexCount
    },
  ]);

  const section = getquestionData()
  const onSubmit = async (data) => {

    newFormData.AssessmentTitle = data.AssessmentTitle
    newFormData.AssessmentStartDate = data.AssessmentStartDate
    newFormData.AssessmentEndDate =  data.AssessmentEndDate
    newFormData.Sections = [{},{}]
    console.log(newFormData);

    try {
      const response = await axios({
        method: 'post',
        url: '/api/assessments',
        data: newFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  
  }

  return (
    <div className='schedule-exam'>
      <div>
        <h1>
          Schedule Assessment
        </h1>
      </div>
      <Form className='schedule-form' onSubmit={handleSubmit(onSubmit)}>
        <h3>1. Enter Assessment Details</h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Enter Assessment Title:</Form.Label>
          <Form.Control type="text" placeholder="Enter Assessment Title" {...register("AssessmentTitle")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment Start Date:</Form.Label>
          <Form.Control type="date" {...register("AssessmentStartDate")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment Start Time:</Form.Label>
          <Form.Control type="time" {...register("AssessmentStartTime")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment End Date:</Form.Label>
          <Form.Control type="date" {...register("AssessmentEndDate")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment End Time:</Form.Label>
          <Form.Control type="time" {...register("AssessmentEndTime")}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Assessment Duration (in min.) :</Form.Label>
          <Form.Control type="number" {...register("AssessmentDuration")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Passing Marks (it should be less than Total Marks) :</Form.Label>
          <Form.Control type="number" {...register("AssessmentPassingMarks")}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Total Marks</Form.Label>
          <Form.Control type="number" {...register("AssessmentTotalMarks")}/>
        </Form.Group>
        <div className='schedule-form-divider'>

        </div>
        <h3>2. Add Sections</h3>

        {
          sectionList.map((index) => (
            <div key={index.id}>
              <Form.Label>Section Name:</Form.Label>
              <Form.Select aria-label="Default select example" className='mb-3' {...register(`${`SectionName` + indexCount}`)}>
                <option>Select Section</option>
                {section.map((index1) => (
                  <option value={index1.sectionName} key={index1.id}>{index1.sectionName}</option>
                ))}
              </Form.Select>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Marks Assigned Per Question:</Form.Label>
                <Form.Control type="number" {...register(`${`MarksPerQuestion` + indexCount}`)}/>
              </Form.Group>
              <div className='schedule-form-divider'></div>
            </div>
          ))
        }
        <div className='schedule-add-section-btn'>
          <Button variant="secondary" onClick={() => {
            setIndexCount(indexCount+1)
            setSectionList([...sectionList, { id: nanoid() }]);
            console.log(sectionList);
          }
          }>Add Section</Button>
          <Form.Control
          variant="secondary"
            type="submit"
            value={"Create Assessment"}
            className='create-assessment-btn'
          />
        </div>
        {/* <Form.Label>Section Name:</Form.Label>
        <Form.Select aria-label="Default select example" className='mb-3'>
          <option>Select Section</option>
          {section.map((index) => (
            <option value={index.sectionName}>{index.sectionName}</option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Marks Assigned Per Question:</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <div className='schedule-add-section-btn'>
          <Button variant="secondary">Add Section</Button>
        </div>
        <div className='schedule-form-divider'>

        </div> */}
      </Form>
    </div>
  )
}

export default ScheduleExam