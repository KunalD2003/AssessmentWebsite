import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import {
  useQuestionData,
  addSection,
  deleteSection,
  getSectionByName,
} from '../../Hooks/questionData';
import './QuestionBank.css';

function QuestionBank() {
  const [deleteBtnDisplay, setDeleteBtnDisplay] = useState("none");
  const navigate = useNavigate();
  const sections = useQuestionData();
  const [sectionList, setSectionList] = useState(sections);
  const [show, setShow] = useState(false);
  const [totalMCQQuestions, setTotalMCQQuestions] = useState(0); // State to hold total MCQ questions count

  useEffect(() => {
    setSectionList(sections);
  }, [sections]);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    addSection(data);
    setSectionList([...sections]); // Update the state to trigger re-render
    handleClose();
  };

  const handleDelete = (sectionID) => {
    deleteSection(sectionID);
    setSectionList([...sections]); // Update the state to trigger re-render
  };

  const fetchSectionData = (section) => {
    if (section.sectionType === "MCQ") {
      navigate(`/questionbank/showquestions/${section.id}`);
    } else if (section.sectionType === "Coding") {
      navigate(`/questionbank/CodingProblems/${section.id}`);
    }
  };

  return (
    <div className='question-bank-page'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Section Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Section Title"
                autoFocus
                {...register("sectionName")}
              />
            </Form.Group>
            <Form.Select aria-label="Default select example" {...register("sectionType")}>
              <option>Select Section Type</option>
              <option value="Coding">Coding</option>
              <option value="MCQ">MCQ</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Control
                type="submit"
                value="Add"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <div className='question-bank-cards-container'>
        {sectionList.map((section) => (
          <div className="card question-bank-card" key={section.id}>
            <div className="card-body question-bank-card-body">
              <h3 className="card-title section-title">{section.sectionName}</h3>
              <div className='sections-details'>
                <p>Total Questions: </p>
                <p>{section.questions.length}</p>
              </div>
              <div className='sections-details'>
                <p>Section Type: </p>
                <p>{section.sectionType}</p>
              </div>
              <div className='section-card-btn'>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ display: deleteBtnDisplay }}
                  onClick={() => handleDelete(section.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => fetchSectionData(section)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionBank;
