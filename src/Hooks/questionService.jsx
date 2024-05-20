
// import axios from 'axios';

// // Base URL for your backend API
// const BASE_URL = 'http://localhost:3001';

// // Fetch all questions
// export async function fetchAllQuestions() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/mcqquestions/`);
//     return response.data; // Return fetched data
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     return []; // Return empty array on error
//   }
// }

// // Update a question by its ID
// export async function updateQuestionById(questionId, updatedData) {
//   try {
//     const response = await axios.put(`${BASE_URL}/api/mcqquestions/${questionId}`, updatedData);
//     return response.data; // Return the updated question
//   } catch (error) {
//     console.error(`Error updating question with ID ${questionId}:`, error);
//     return null; // Return null on error
//   }
// }

// // Delete a question by its ID
// export async function deleteQuestionById(questionId) {
//   try {
//     const response = await axios.delete(`${BASE_URL}/api/mcqquestions/${questionId}`);
//     return response.data; // Return some confirmation or the deleted document
//   } catch (error) {
//     console.error(`Error deleting question with ID ${questionId}:`, error);
//     return null; // Return null on error
//   }
// }

// // Insert a new question
// export async function insertQuestion(newQuestionData) {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/mcqquestions/`, newQuestionData);
//     return response.data; // Return the inserted question
//   } catch (error) {
//     console.error("Error inserting question:", error);
//     return null; // Return null on error
//   }
// }/



// import axios from 'axios';

// // Base URL for your backend API
// const BASE_URL = 'http://localhost:3001';

// // Fetch all questions
// export async function fetchAllQuestions() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/mcqquestions`);
//     return response.data; // Return fetched data
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     return []; // Return empty array on error
//   }
// }

// // Update a question by its ID
// export async function updateQuestionById(questionId, updatedData) {
//   try {
//     const response = await axios.put(`${BASE_URL}/api/mcqquestions/${questionId}`, updatedData);
//     return response.data; // Return the updated question
//   } catch (error) {
//     console.error(`Error updating question with ID ${questionId}:`, error);
//     return null; // Return null on error
//   }
// }

// // Delete a question by its ID
// export async function deleteQuestionById(questionId) {
//   try {
//     const response = await axios.delete(`${BASE_URL}/api/mcqquestions/${questionId}`);
//     return response.data; // Return some confirmation or the deleted document
//   } catch (error) {
//     console.error(`Error deleting question with ID ${questionId}:`, error);
//     return null; // Return null on error
//   }
// }

// // Insert a new question
// export async function insertQuestion(newQuestionData) {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/mcqquestions`, newQuestionData);
//     return response.data; // Return the inserted question
//   } catch (error) {
//     console.error("Error inserting question:", error);
//     return null; // Return null on error
//   }
// }





import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'https://assessmentwebsite-4-3u7s.onrender.com';

// Fetch all questions
export async function fetchAllQuestions() {
  try {
    const response = await axios.get(`${BASE_URL}/api/mcqquestions`);
    return response.data; // Return fetched data
  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // Return empty array on error
  }
}
// export async function fetchMCQQuestionsAndCount() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/mcqquestions`);
//     const mcqQuestions = response.data;
//     const totalMCQQuestions = mcqQuestions.length; // Calculate the total number of MCQ questions
//     return { mcqQuestions, totalMCQQuestions }; // Return both the questions and the total count
//   } catch (error) {
//     console.error("Error fetching MCQ questions:", error);
//     return { mcqQuestions: [], totalMCQQuestions: 0 }; // Return empty array and 0 count on error
//   }
// }



// Update a question by its ID
export async function updateQuestionById(questionId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/api/mcqquestions/${questionId}`, updatedData);
    return response.data; // Return the updated question
  } catch (error) {
    console.error(`Error updating question with ID ${questionId}:`, error);
    return null; // Return null on error
  }
}

// Delete a question by its ID
export async function deleteQuestionById(questionId) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/mcqquestions/${questionId}`);
    return response.data; // Return some confirmation or the deleted document
  } catch (error) {
    console.error(`Error deleting question with ID ${questionId}:`, error);
    return null; // Return null on error
  }
}

// Insert a new question
export async function insertQuestion(newQuestionData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/mcqquestions/`, newQuestionData);
    return response.data; // Return the inserted question
  } catch (error) {
    console.error("Error inserting question:", error);
    return null; // Return null on error
  }
}