// // import React, { useState } from 'react'
// // import { useParams } from 'react-router-dom'
// // import { editQuestion, getquestionDataUsingID } from '../../../Hooks/questionData'
// // import Accordion from 'react-bootstrap/Accordion';
// // import { useAccordionButton } from 'react-bootstrap/AccordionButton';
// // import Card from 'react-bootstrap/Card';
// // import Form from 'react-bootstrap/Form';
// // import { useForm } from "react-hook-form";
// // import './ShowQuestions.css'


// // function CustomToggle({ children, eventKey }) {
// //   const decoratedOnClick = useAccordionButton(eventKey, () =>
// //     console.log('totally custom!'),
// //   );
  
// //   return (
// //     <button
// //       type="button"
// //       style={{ backgroundColor: 'pink' }}
// //       onClick={decoratedOnClick}
// //     >
// //       {children}
// //     </button>
// //   );
// // }


// // function ShowQuestions() {
// //   const { sectionID } = useParams()
// //   const getQuestion = getquestionDataUsingID(sectionID)
// //   const [inputValue, changeInputVal] = useState()
// //   console.log(getQuestion.questions);


// //   const { register, handleSubmit } = useForm()

// //   const onSubmit = async (data) => {
// //     setSection(data)
// //   }

// //   return (
// //     <div>sectionName: {getQuestion.sectionName}
// //       <Accordion defaultActiveKey="0">
// //         {getQuestion.questions.map((index) => (
          
// //           <Card key={`${index.id}`}>
// //             <Card.Header>
// //               <CustomToggle eventKey={`${index.id}`} >Click me!</CustomToggle>
// //             </Card.Header>
// //             <Accordion.Collapse eventKey={`${index.id}`}>
// //               <Card.Body>
// //                 {index.questionDescription}
// //                 <Form onSubmit={handleSubmit(onSubmit)}>
// //                   <Form.Group className="mb-3" controlId={`${index.id}`} >
// //                     <Form.Label>Enter Question Description</Form.Label>
// //                     <Form.Control
// //                       placeholder="Enter Question Description"
// //                       autoFocus
// //                       rows={5} 
// //                       as="textarea"
// //                       defaultValue={index.questionDescription}
// //                       {...register("sectionName")}  
// //                       key={index.id}
// //                     />
// //                   </Form.Group>
                  
// //                   <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1" >
// //                     <Form.Control
// //                       type="submit"
// //                       value={"Add"}
// //                     />
// //                   </Form.Group>
// //                 </Form>
// //               </Card.Body>
// //             </Accordion.Collapse>
// //           </Card>
// //         ))}
// //       </Accordion>

// //     </div>
// //   )
// // }

// // export default ShowQuestions


// import React, { useEffect, useState } from 'react';
// import { fetchAllQuestions, updateQuestionById } from '../../../Hooks/questionService'; // Import functions from questionService
// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useForm } from 'react-hook-form'; // React Hook Form for form handling
// import './ShowQuestions.css';

// function ShowQuestions() {
//   const [questions, setQuestions] = useState([]); // State for fetched questions
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const { register, handleSubmit } = useForm(); // Form handling

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const data = await fetchAllQuestions(); // Fetch all questions
//         setQuestions(data); // Store fetched questions in state
//         setLoading(false); // Loading complete
//       } catch (err) {
//         setError(err.message); // Store the error message
//         setLoading(false); // Loading complete even with errors
//       }
//     };

//     fetchQuestions(); // Fetch data when the component mounts
//   }, []); // Ensure it runs once when the component mounts

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Display error state
//   }

//   const onSubmit = async (formData) => {
//     // Update question by its ID
//     await updateQuestionById(formData.questionId, formData);
//     // Optional: Refetch questions after updating
//     const updatedQuestions = await fetchAllQuestions(); 
//     setQuestions(updatedQuestions); // Update state with the latest data
//   };

//   return (
//     <div>
//       <Accordion defaultActiveKey="0">
//         {questions.map((question) => (
//           <Card key={question.id}>
//             <Card.Header>
//               <Button
//                 onClick={() => console.log(`Edit Question: ${question.id}`)}
//               >
//                 Edit Question
//               </Button>
//             </Card.Header>
//             <Accordion.Collapse eventKey={question.id.toString()}>
//               <Card.Body>
//                 <Form onSubmit={handleSubmit(onSubmit)}>
//                   <Form.Group>
//                     <Form.Label>Question Description</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={5}
//                       defaultValue={question.questionDescription}
//                       {...register('questionDescription')}
//                     />
//                   </Form.Group>
//                   <Form.Control type="hidden" value={question.id} {...register('questionId')} />
//                   <Button type="submit">Update Question</Button> {/* Submit button */}
//                 </Form>
//               </Card.Body>
//             </Accordion.Collapse>
//           </Card>
//         ))}
//       </Accordion>
//     </div>
//   );
// }

// export default ShowQuestions;


// import React, { useEffect, useState } from 'react';

// const ShowQuestions = () => {
//   const [questions, setQuestions] = useState([]); // Initialize as an empty array
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/api/mcqquestions') // Replace with your endpoint
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         return response.json(); // Ensure JSON response
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setQuestions(data); // Only set if it's an array
//         } else {
//           throw new Error('Unexpected data format');
//         }
//       })
//       .catch((error) => {
//         setError(error.message); // Store error message
//       });
//   }, []); // Effect runs once on component mount

//   if (error) {
//     return <div>Error: {error}</div>; // Display error message
//   }

//   return (
//     <div>
//       <h2>Questions List</h2>
//       <ul>
//         {questions.map((question, index) => (
//           <li key={index}>{question.questionText || 'No question text'}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShowQuestions;


// import React, { useEffect, useState } from 'react';

// const ShowQuestions = () => {
//   const [questions, setQuestions] = useState([]); // Initialize state to an empty array
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     fetch('http://localhost:3001/api/mcqquestions') // Your API endpoint
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.statusText}`);
//         }
//         return response.json(); // Parse the response as JSON
//       })
//       .then((data) => {
//         console.log("Fetched data:", data); // Log to inspect the format
//         if (Array.isArray(data)) {
//           setQuestions(data); // Set if data is an array
//         } else {
//           throw new Error('Unexpected data format');
//         }
//       })
//       .catch((error) => {
//         setError(error.message); // Store error message
//       });
//   }, []); // Effect runs only once on component mount
  

//   // Handle rendering based on the state of `questions` and `error`
//   if (error) {
//     return <div>Error: {error}</div>; // If there's an error, display it
//   }

//   return (
//     <div>
//       <h2>Questions List</h2>
//       <ul>
//         {/* Use your code snippet here to render the questions */}
//         {Array.isArray(questions) ? (
//           questions.map((question, index) => <li key={index}>{question.questionText}</li>)
//         ) : (
//           <div>No questions available</div>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ShowQuestions;




// import React, { useEffect, useState } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useForm } from 'react-hook-form';
// import { fetchAllQuestions, updateQuestionById, deleteQuestionById } from '../../../Hooks/questionService'; // Import your service functions

// const ShowQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { register, handleSubmit } = useForm(); // React Hook Form

//   // Define the `handleUpdate` function
//   const handleUpdate = async (data) => {
//     try {
//       const questionId = data.questionId; // Get the question ID from the form
//       const questionDescription = data[`questionDescription-${questionId}`]; // Get the updated description

//       // Call the service to update the question by ID
//       const updatedQuestion = await updateQuestionById(questionId, { question: questionDescription });

//       // Update the state with the modified question
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((question) =>
//           question._id === questionId ? { ...question, question: updatedQuestion.question } : question
//         )
//       );
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const data = await fetchAllQuestions(); // Fetch all questions
//         console.log('Fetched data:', data); // Log fetched data

//         if (data && Array.isArray(data.myData)) {
//           setQuestions(data.myData); // Store fetched questions
//         } else {
//           throw new Error('Unexpected data format'); // Handle unexpected structure
//         }
//       } catch (err) {
//         console.error('Error while fetching:', err); // Log errors
//         setError(err.message); // Set error state
//       } finally {
//         setLoading(false); // Stop loading whether successful or not
//       }
//     };

//     fetchQuestions(); // Fetch questions when component mounts
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Questions List</h2>
//       <Accordion defaultActiveKey="0">
//         {questions.map((question, index) => (
//           <Card key={question._id || index}>
//             <Card.Header>
//               {question.question}
//               <Button
//                 variant="danger"
//                 className="float-end"
//                 onClick={() => deleteQuestionById(question._id)}
//               >
//                 Delete
//               </Button>
//             </Card.Header>
//             <Accordion.Collapse eventKey={index.toString()}>
//               <Card.Body>
//                 <Form onSubmit={handleSubmit(handleUpdate)}>
//                   <Form.Group>
//                     <Form.Label>Question Description</Form.Label>
//                     <Form.Control
//                       type="text"
//                       defaultValue={question.question}
//                       {...register(`questionDescription-${question._id}`)} // Use a unique name
//                     />
//                   </Form.Group>
//                   <Form.Control type="hidden" value={question._id} {...register('questionId')} /> {/* Hidden field for ID */}
//                   <Button type="submit">Update</Button> {/* Submit button */}
//                 </Form>
//               </Card.Body>
//             </Accordion.Collapse>
//           </Card>
//         ))}
//       </Accordion>
//     </div>
//   );
// };

// export default ShowQuestions; // Export the component



// import React, { useEffect, useState } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { useForm } from 'react-hook-form';
// import { fetchAllQuestions, updateQuestionById } from '../../../Hooks/questionService';

// const ShowQuestions = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { register, handleSubmit } = useForm(); // React Hook Form
//   const [editMode, setEditMode] = useState(null); // State to track the current edit mode (which question is being edited)

//   // Function to toggle edit mode for a specific question
//   const handleEdit = (questionId) => {
//     setEditMode((prevEditMode) => (prevEditMode === questionId ? null : questionId)); // Toggle edit mode
//   };

//   // Function to update a question
//   const handleUpdate = async (data) => {
//     try {
//       const questionId = data.questionId; // Get the question ID from the form
//       const questionDescription = data[`questionDescription-${questionId}`]; // Get the updated description
//       const options = [data.option1, data.option2, data.option3, data.option4]; // Get the updated options
//       const correctAnswer = data.correctAnswer; // Get the correct answer

//       // Call the service to update the question by ID
//       await updateQuestionById(questionId, { question: questionDescription, options, correctAnswer });

//       // Update the state with the modified question
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((question) =>
//           question._id === questionId
//             ? { ...question, question: questionDescription, options, correctAnswer }
//             : question
//         )
//       );

//       setEditMode(null); // Exit edit mode after update
//     } catch (error) {
//       console.error('Error updating question:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const data = await fetchAllQuestions(); // Fetch all questions
//         console.log('Fetched data:', data); // Log fetched data

//         if (data && Array.isArray(data.myData)) {
//           setQuestions(data.myData); // Store fetched questions
//         } else {
//           throw new Error('Unexpected data format'); // Handle unexpected structure
//         }
//       } catch (err) {
//         console.error('Error while fetching:', err); // Log errors
//         setError(err.message); // Set error state
//       } finally {
//         setLoading(false); // Stop loading whether successful or not
//       }
//     };

//     fetchQuestions(); // Fetch questions when component mounts
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading while fetching
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Display error message
//   }

//   return (
//     <div>
//       <h2>Questions List</h2>
//       <Accordion defaultActiveKey="0">
//         {questions.map((question, index) => (
//           <Card key={question._id || index}>
//             <Card.Header>
//               {question.question} {/* Display question text */}
//               <Button
//                 variant="primary"
//                 className="float-end"
//                 onClick={() => handleEdit(question._id)} // Edit button to toggle edit mode
//               >
//                 Edit
//               </Button> {/* Edit button */}
//             </Card.Header>
//             <Accordion.Collapse eventKey={index.toString()}>
//               <Card.Body>
//                 {editMode === question._id ? ( // If in edit mode, display the form
//                   <Form onSubmit={handleSubmit(handleUpdate)}>
//                     <Form.Group>
//                       <Form.Label>Question Description</Form.Label>
//                       <Form.Control
//                         type="text"
//                         defaultValue={question.question}
//                         {...register(`questionDescription-${question._id}`)} // Use a unique name
//                       />
//                     </Form.Group>
//                     {question.options.map((option, i) => (
//                       <Form.Group key={`option-${i}`}>
//                         <Form.Label>Option {i + 1}</Form.Label>
//                         <Form.Control
//                           type="text"
//                           defaultValue={option}
//                           {...register(`option${i + 1}`)} // Register options
//                         />
//                       </Form.Group>
//                     ))}
//                     <Form.Group>
//                       <Form.Label>Correct Answer</Form.Label>
//                       <Form.Control
//                         type="text"
//                         defaultValue={question.correctAnswer}
//                         {...register('correctAnswer')}
//                       />
//                     </Form.Group>
//                     <Form.Control type="hidden" value={question._id} {...register('questionId')} /> {/* Hidden field */}
//                     <Button type="submit">Update</Button> {/* Submit button */}
//                   </Form>
//                 ) : (
//                   <div>
//                     <p>Question Description: {question.question}</p>
//                     {question.options.map((option, i) => (
//                       <p key={`display-option-${i}`}>Option {i + 1}: {option}</p> 
//                     ))}
//                     <p>Correct Answer: {question.correctAnswer}</p> {/* Display correct answer */}
//                   </div>
//                 )}
//               </Card.Body>
//             </Accordion.Collapse>
//           </Card>
//         ))}
//       </Accordion>
//     </div>
//   );
// };

// export default ShowQuestions;



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
