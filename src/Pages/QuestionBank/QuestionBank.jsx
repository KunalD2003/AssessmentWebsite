import React, { useEffect, useState } from 'react'
import './QuestionBank.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { deleteSection, getquestionData, setSection } from '../../Hooks/questionData'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"



function QuestionBank() {
  const [deleteBtnDisplay, setDeleteBtnDisplay] = useState("none")
  const navigate = useNavigate()
  const [sectionList, setSectionList] = useState(getquestionData())
  const [show, setShow] = useState(false);

  const sections = getquestionData()
  useEffect(() => {
    setSectionList(sections)
    console.log(sections);
  },[sections, sectionList, setSectionList])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    setSection(data)
    handleClose()
  }

  return (
    <div className='question-bank-page'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Enter Section Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="name@example.com"
                autoFocus
                {...register("sectionName")}
              />
            </Form.Group>
            <Form.Select aria-label="Default select example" {...register("sectionType")}>
              <option>Select Section Type</option>
              <option value="Coding">Coding</option>
              <option value="MCQ">MCQ</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Label>Enter Section Title</Form.Label>
              <Form.Control
                type="submit"
                value={"Add"}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <div className='question-bank-cards-container'>
        {sectionList.map((index) => (
          <div className="card question-bank-card" key={index.id}>
            <div className="card-body question-bank-card-body">
              <h3 className="card-title section-title">{index.sectionName}</h3>
              <div className='sections-details'>
                <p>Total Questions: </p>
                <p>{index.questions.length}</p>
              </div>
              <div className='sections-details'>
                <p>Section Type: </p>
                <p>{index.sectionType}</p>
              </div>
              <div className='section-card-btn'>
                <button type="button" className="btn btn-danger" style={{ display: `${deleteBtnDisplay}` }} onClick={async () => {
                  sections.pop(index.id)
                  console.log(sections);
                }}>Delete</button>
                <button type="button" className="btn btn-primary" onClick={() => navigate(`/questionbank/showquestions/${index.id}`)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='add-delete-question-bank'>
        <button type="button" className="btn btn-danger" onClick={() => (deleteBtnDisplay === "none") ? setDeleteBtnDisplay("block") : setDeleteBtnDisplay("none")}>Delete Question bank</button>
        <Button variant="success" onClick={handleShow}> Add Question bank </Button>
      </div>
    </div>
  )
}

export default QuestionBank
