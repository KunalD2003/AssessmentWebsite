


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Modal, Form } from 'react-bootstrap';
import {
  useQuestionData,
  addSection,
  deleteSection,
  getSectionByName,
  fetchMCQQuestionsAndCount,
  // Import the function
} from '../../Hooks/questionData';

import './QuestionBank.css';

function QuestionBank() {
  const [deleteBtnDisplay, setDeleteBtnDisplay] = useState("none");
  const navigate = useNavigate();
  const sections = useQuestionData();
  const [sectionList, setSectionList] = useState(sections);
  const [show, setShow] = useState(false);

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

  const fetchSectionData = async (section) => {
    if (section.sectionType === "MCQ") {
      // Fetch MCQ questions and their count
      const { mcqQuestions, totalMCQQuestions } = await fetchMCQQuestionsAndCount();
      navigate(`/questionbank/showquestions/${section.id}`, { state: { mcqQuestions, totalMCQQuestions }});
    } else if (section.sectionType === "Coding") {
      // API call for Coding type data
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
                <p>{section.sectionType === 'MCQ' ? totalMCQQuestions : section.mcqQuestions.length}</p>
                {/* <p>{section.mcqQuestions.length}</p> */}
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
