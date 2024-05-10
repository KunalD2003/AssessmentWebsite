
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { fetchAllQuestions, updateQuestionById, deleteQuestionById } from '../../../Hooks/questionService'; // Import service functions

const ShowQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm(); // React Hook Form with reset functionality
  const [editMode, setEditMode] = useState(null); // State to track the current question in edit mode

  // Toggle edit mode for a specific question
  const handleEdit = (question) => {
    if (editMode === question._id) {
      // If the same question is clicked, close the edit mode
      setEditMode(null);
    } else {
      // Set the current question in edit mode and reset form with its data
      setEditMode(question._id);
      reset({
        questionDescription: question.question,
        option1: question.options[0] || '',
        option2: question.options[1] || '',
        option3: question.options[2] || '',
        option4: question.options[3] || '',
        correctAnswer: question.correctAnswer || '',
        questionId: question._id,
      });
    }
  };

  // Function to update a question
  const handleUpdate = async (data) => {
    try {
      const questionId = data.questionId; // Get the question ID from the form
      const questionDescription = data.questionDescription; // Get the updated description
      const options = [data.option1, data.option2, data.option3, data.option4]; // Get the updated options
      const correctAnswer = data.correctAnswer; // Get the correct answer

      // Call the service to update the question by ID
      await updateQuestionById(questionId, { question: questionDescription, options, correctAnswer });

      // Update the state with the modified question
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === questionId
            ? { ...question, question: questionDescription, options, correctAnswer }
            : question
        )
      );

      setEditMode(null); // Exit edit mode after update
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  // Function to delete a question
  const handleDelete = async (questionId) => {
    try {
      await deleteQuestionById(questionId); // Delete the question by ID
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId) // Remove from state
      );
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchAllQuestions(); // Fetch all questions
        console.log('Fetched data:', data); // Log fetched data

        if (data && Array.isArray(data.myData)) {
          setQuestions(data.myData); // Store fetched questions
        } else {
          throw new Error('Unexpected data format'); // Handle unexpected structure
        }
      } catch (err) {
        console.error('Error while fetching:', err); // Log errors
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Stop loading whether successful or not
      }
    };

    fetchQuestions(); // Fetch questions on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      <h2>Questions List</h2>
      <Accordion defaultActiveKey="0">
        {questions.map((question, index) => (
          <Card key={question._id || index}>
            <Card.Header>
              {question.question}
              <Button
                variant="primary"
                className="float-end"
                onClick={() => handleEdit(question)} // Toggle edit mode
              >
                Edit
              </Button>

              <Button
                variant="danger"
                className="float-end me-2"
                onClick={() => handleDelete(question._id)} // Delete button
              >
                Delete
              </Button>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                {editMode === question._id ? ( // Only display form when in edit mode
                  <Form onSubmit={handleSubmit(handleUpdate)}> {/* Form for updating */}
                    <Form.Group>
                      <Form.Label>Question Description</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={question.question}
                        {...register('questionDescription')}
                      />
                    </Form.Group>
                    {question.options.map((option, i) => (
                      <Form.Group key={`option-${i}`}>
                        <Form.Label>Option {i + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={option}
                          {...register(`option${i + 1}`)}
                        />
                      </Form.Group>
                    ))}
                    <Form.Group>
                      <Form.Label>Correct Answer</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={question.correctAnswer}
                        {...register('correctAnswer')}
                      />
                    </Form.Group>
                    <Form.Control type="hidden" value={question._id} {...register('questionId')} />
                    <Button type="submit">Update</Button> {/* Submit button to update */}
                  </Form>
                ) : (
                  <div>
                    <p>Question Description: {question.question}</p> {/* Display question description */}
                    {question.options.map((option, i) => (
                      <p key={`display-option-${i}`}>Option {i + 1}: {option}</p> 
                    ))}
                    <p>Correct Answer: {question.correctAnswer}</p> {/* Display correct answer */}
                  </div>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default ShowQuestions; // Export the component
