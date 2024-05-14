

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { fetchAllQuestions, updateQuestionById, deleteQuestionById, insertQuestion } from '../../../Hooks/questionService'; // Import service functions

const ShowQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm(); // React Hook Form with reset functionality
  const [editMode, setEditMode] = useState(null); // State to track the current question in edit mode
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false); // State to control new question form visibility

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

  // Function to handle form submission for updating a question
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

  // Function to handle deletion of a question
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

  // Function to handle form submission for adding a new question
  const handleNewQuestionSubmit = async (data) => {
    try {
      // Prepare the new question data object
      const newQuestionData = {
        question: data.questionDescription,
        options: [data.option1, data.option2, data.option3, data.option4],
        correctAnswer: data.correctAnswer
      };

      // Insert the new question
      await insertQuestion(newQuestionData);

      // Hide the form after submission
      setShowNewQuestionForm(false);

      // Refetch questions to update the list
      fetchQuestions();
    } catch (error) {
      console.error('Error inserting question:', error);
    }
  };

  // Fetch questions function
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

  useEffect(() => {
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
      <Button className="mb-3" onClick={() => setShowNewQuestionForm(true)}>Add New Question</Button>
      {showNewQuestionForm && (
        <Card>
          <Card.Body>
            <h3>Add New Question</h3>
            <Form onSubmit={handleSubmit(handleNewQuestionSubmit)}>
              <Form.Group>
                <Form.Label>Question Description</Form.Label>
                <Form.Control
                  type="text"
                  {...register('questionDescription')}
                />
              </Form.Group>
              {[1, 2, 3, 4].map((index) => (
                <Form.Group key={`option-${index}`}>
                  <Form.Label>Option {index}</Form.Label>
                  <Form.Control
                    type="text"
                    {...register(`option${index}`)}
                  />
                </Form.Group>
              ))}
              <Form.Group>
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control
                  type="text"
                  {...register('correctAnswer')}
                />
              </Form.Group>
              <Button type="submit">Add Question</Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {questions.map((question) => (
        <div key={question._id}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>{question.question}</span>
                <div style={{display: "flex", gap: "0.5rem"}}>
                  <Button variant="primary" onClick={() => handleEdit(question)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(question._id)}>Delete</Button>
                </div>
              </div>
            </Card.Header>
            {editMode === question._id && (
              <Card.Body>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                  <Form.Group>
                    <Form.Label>Question Description</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={question.question}
                      {...register('questionDescription')}
                    />
                  </Form.Group>
                  {question.options.map((option, i) => (
                    <Form.Group key={`option-${i}`} style={{marginTop: "0.5rem"}}>
                      <Form.Label>Option {i + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={option}
                        {...register(`option${i + 1}`)}
                      />
                    </Form.Group>
                  ))}
                  <Form.Group style={{marginTop: "0.5rem"}}>
                    <Form.Label style={{color: "green"}}>Correct Answer</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={question.correctAnswer}
                      {...register('correctAnswer')}
                    />
                  </Form.Group>
                  <Form.Control type="hidden" value={question._id} {...register('questionId')} />
                  <Button type="submit" style={{marginTop: "1rem"}}>Update</Button>
                </Form>
              </Card.Body>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ShowQuestions;
