import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { editQuestion, getquestionDataUsingID } from '../../Hooks/questionData'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"


function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );
  
  return (
    <button
      type="button"
      style={{ backgroundColor: 'pink' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}


function ShowQuestions() {
  const { sectionID } = useParams()
  const getQuestion = getquestionDataUsingID(sectionID)
  const [inputValue, changeInputVal] = useState()
  console.log(getQuestion);


  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    setSection(data)
  }

  return (
    <div>sectionName: {getQuestion.sectionName}
      <Accordion defaultActiveKey="0">
        {getQuestion.questions.map((index) => (
          <Card key={`${index.id}`}>
            <Card.Header>
              <CustomToggle eventKey={`${index.id}`} >Click me!</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index.id}`}>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                    <Form.Label>Enter Section Title</Form.Label>
                    <Form.Control
                      placeholder="name@example.com"
                      autoFocus
                      rows={5} 
                      as="textarea"
                      {...register("sectionName")}  
                      value={index.questionDescription}
                      onChange={(e) => editQuestion(index.id, e.target.value, sectionID)}
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
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

    </div>
  )
}

export default ShowQuestions