import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:3001';

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
