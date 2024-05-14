// import axios from 'axios';

// // Base URL for your backend API
// const BASE_URL = 'http://localhost:3000';

// // Fetch all coding problems
// export async function fetchAllCodingProblems() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/codingProblems`);
//     return response.data; // Return fetched data
//   } catch (error) {
//     console.error("Error fetching coding problems:", error);
//     return []; // Return empty array on error
//   }
// }

// // Update a coding problem by its ID
// export async function updateCodingProblemById(questionId, updatedData) {
//   try {
//     const response = await axios.put(`${BASE_URL}/api/codingProblems/${questionId}`, updatedData);
//     return response.data; // Return the updated coding problem
//   } catch (error) {
//     console.error(`Error updating coding problem with ID ${questionId}:`, error);
//     return null; // Return null on error
//   }
// }

// // Delete a coding problem by its ID
// export async function deleteCodingProblemById(questionId) {
//   try {
//     const response = await axios.delete(`${BASE_URL}/api/codingProblems/${questionId}`);
//     return response.data; // Return some confirmation or the deleted document
//   } catch (error) {
//     console.error(`Error deleting coding problem with ID ${questionId}:`, error);
//     return null; // Return null on error
//   }
// }

// // Insert a new coding problem
// export async function insertCodingProblem(newQuestionData) {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/codingProblems/`, newQuestionData);
//     return response.data; // Return the inserted coding problem
//   } catch (error) {
//     console.error("Error inserting coding problem:", error);
//     return null; // Return null on error
//   }
// }




import axios from 'axios';


const BASE_URL = 'http://localhost:3000';

// Fetch all coding problems
export async function fetchAllCodingProblems() {
  try {
    const response = await axios.get(`${BASE_URL}/api/codingProblems`);
    return response.data; // Return fetched data
  } catch (error) {
    console.error("Error fetching coding problems:", error);
    return []; // Return empty array on error
  }
}


//Update a coding problem by its ID
// export async function updateCodingProblemById(questionId, updatedData) {
//   try {
//     const response = await axios.put(`${BASE_URL}/api/codingProblems/${questionId}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating coding problem with ID ${questionId}:`, error); // Enhanced logging
//     return null;
//   }
// }

// Update a coding problem by its ID
export async function updateCodingProblemById(questionId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/api/codingProblems/${questionId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating coding problem with ID ${questionId}:`, error);
    return null;
  }
}


// Delete a coding problem by its ID
export async function deleteCodingProblemById(questionId) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/codingProblems/${questionId}`);
    return response.data; // Return some confirmation or the deleted document
  } catch (error) {
    console.error(`Error deleting coding problem with ID ${questionId}:`, error);
    return null; // Return null on error
  }
}

// Insert a new coding problem
export async function insertCodingProblem(newQuestionData) {
  try {
    const response = await axios.post(`${BASE_URL}/api/codingProblems/`, newQuestionData);
    return response.data; // Return the inserted coding problem
  } catch (error) {
    console.error("Error inserting coding problem:", error);
    return null; // Return null on error
  }
}
