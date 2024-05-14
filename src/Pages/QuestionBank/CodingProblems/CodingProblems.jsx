
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { fetchAllCodingProblems, insertCodingProblem, updateCodingProblemById, deleteCodingProblemById } from '../../../Hooks/codingService';

const CodingProblems = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);

  const fetchQuestions = async () => {
    try {
      const data = await fetchAllCodingProblems();
      console.log('Fetched data:', data);
      if (data && Array.isArray(data)) {
        setQuestions(data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (err) {
      console.error('Error while fetching:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNewQuestionSubmit = async (data) => {
    try {
      const newQuestionData = {
        questionId: data.questionId,
        question: data.questionDescription,
        problem: data.problemDescription,
        sectionType: data.sectionType,
        examples: [
          { input: data.example1Input, output: data.example1Output },
          { input: data.example2Input, output: data.example2Output }
        ]
      };
      await insertCodingProblem(newQuestionData);
      setShowNewQuestionForm(false);
      fetchQuestions();
    } catch (error) {
      console.error('Error inserting question:', error);
    }
  };

  // const handleEditQuestionSubmit = async (data) => {
  //   try {
  //     const updatedQuestionData = {
  //       questionId: data.questionId,
  //       question: data.questionDescription,
  //       problem: data.problemDescription,
  //       sectionType: data.sectionType,
  //       examples: [
  //         { input: data.example1Input, output: data.example1Output },
  //         { input: data.example2Input, output: data.example2Output }
  //       ]
  //     };

  //     if (!editQuestionId) {
  //       console.error('Invalid editQuestionId');
  //       return;
  //     }

  //     await updateCodingProblemById(editQuestionId, updatedQuestionData);
  //     setEditQuestionId(null);
  //     fetchQuestions();
  //   } catch (error) {
  //     console.error('Error updating question:', error);
  //   }
  // };

  const handleEditQuestionSubmit = async (data) => {
    try {
      const updatedQuestionData = {
        // Use the manually defined questionId from the form data
        questionId: data.questionId,
        question: data.questionDescription,
        problem: data.problemDescription,
        sectionType: data.sectionType,
        examples: [
          { input: data.example1Input, output: data.example1Output },
          { input: data.example2Input, output: data.example2Output }
        ]
      };
  
      if (!editQuestionId) {
        console.error('Invalid editQuestionId');
        return;
      }
  
      // Call the updateCodingProblemById function with the manually defined questionId
      await updateCodingProblemById(data.questionId, updatedQuestionData);
      setEditQuestionId(null);
      fetchQuestions();
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };
  

  const handleEditQuestion = (questionId) => {
    const questionToEdit = questions.find(question => question._id === questionId);
    if (questionToEdit) {
      setEditQuestionId(questionId);
      reset({
        questionId: questionToEdit.questionId,
        questionDescription: questionToEdit.question,
        problemDescription: questionToEdit.problem,
        sectionType: questionToEdit.sectionType,
        example1Input: questionToEdit.examples.length > 0 ? questionToEdit.examples[0].input : '',
        example1Output: questionToEdit.examples.length > 0 ? questionToEdit.examples[0].output : '',
        example2Input: questionToEdit.examples.length > 1 ? questionToEdit.examples[1].input : '',
        example2Output: questionToEdit.examples.length > 1 ? questionToEdit.examples[1].output : '',
      });
    } else {
      console.error('Question not found for editing');
    }
  };

  const handleDeleteQuestion = async (question) => {
    try {
      console.log('Deleting question:', question.questionId);
      await deleteCodingProblemById(question.questionId);
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <h2>Questions List</h2>
      <Button className="mb-3" onClick={() => {
        setShowNewQuestionForm(true);
        setEditQuestionId(null);
        reset(); // Reset form fields when adding a new question
      }}>Add New Question</Button>
      {showNewQuestionForm && (
        <Card>
          <Card.Body>
            <h3>Add New Question</h3>
            <Form onSubmit={handleSubmit(handleNewQuestionSubmit)}>
              <Form.Group>
                <Form.Label>Question ID</Form.Label>
                <Form.Control
                  type="text"
                  {...register('questionId')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Question Description</Form.Label>
                <Form.Control
                  type="text"
                  {...register('questionDescription')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Problem Description</Form.Label>
                <Form.Control
                  type="text"
                  {...register('problemDescription')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Section Type</Form.Label>
                <Form.Control
                  type="text"
                  {...register('sectionType')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Example 1 Input</Form.Label>
                <Form.Control
                  type="text"
                  {...register('example1Input')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Example 1 Output</Form.Label>
                <Form.Control
                  type="text"
                  {...register('example1Output')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Example 2 Input</Form.Label>
                <Form.Control
                  type="text"
                  {...register('example2Input')}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Example 2 Output</Form.Label>
                <Form.Control
                  type="text"
                  {...register('example2Output')}
                  required
                />
              </Form.Group>
              <Button type="submit">Add Question</Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {questions.map((question) => (
        <Card key={question._id}>
          <Card.Body>
            {editQuestionId === question._id ? (
              <>
                <h3>Edit Question</h3>
                <Form onSubmit={handleSubmit(handleEditQuestionSubmit)}>
                  <Form.Group>
                    <Form.Label>Question ID</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('questionId')}
                      defaultValue={question.questionId}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Question Description</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('questionDescription')}
                      defaultValue={question.question}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Problem Description</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('problemDescription')}
                      defaultValue={question.problem}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Section Type</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('sectionType')}
                      defaultValue={question.sectionType}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Example 1 Input</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('example1Input')}
                      defaultValue={question.examples.length > 0 ? question.examples[0].input : ''}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Example 1 Output</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('example1Output')}
                      defaultValue={question.examples.length > 0 ? question.examples[0].output : ''}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Example 2 Input</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('example2Input')}
                      defaultValue={question.examples.length > 1 ? question.examples[1].input : ''}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Example 2 Output</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('example2Output')}
                      defaultValue={question.examples.length > 1 ? question.examples[1].output : ''}
                      required
                    />
                  </Form.Group>
                 
                  <Button type="submit" style={{ marginRight: '0.5rem' }}>
  Save Changes
</Button>
<Button
  variant="secondary"
  onClick={() => setEditQuestionId(null)}
  style={{ marginLeft: '0.5rem' }}
>
  Cancel
</Button>

                </Form>
              </>
            ) : (
              <>
                <h3>{question.question}</h3>
                <p>Problem: {question.problem}</p>
                <p>Section Type: {question.sectionType}</p>
                <h4>Examples:</h4>
                <ul>
                  {question.examples.map((example, index) => (
                    <li key={index}>
                      Input: {example.input}, Output: {example.output}
                    </li>
                  ))}
                </ul>
               
                <Button
                 onClick={() => handleEditQuestion(question._id)}
                     className="btn btn-primary mr-2"
                              >
                                Edit
                        </Button>
                       <Button
                         onClick={() => handleDeleteQuestion(question)}
                            className="btn btn-danger"
                             style={{ marginLeft: '0.5rem' }}
                           >
                                Delete
                      </Button>

              </>
            )}
          </Card.Body>
        </Card>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default CodingProblems;
