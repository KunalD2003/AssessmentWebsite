import Assessment from '../models/assessmentModel.js'; // Import the Mongoose model

// Function to fetch all assessments
export const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find(); // Retrieve all assessments
    res.status(200).json(assessments); // Return as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assessments', error: error.message }); // Handle errors
  }
};

// Function to create a new assessment
export const createAssessment = async (req, res) => {
  try {
    const { name, description } = req.body; // Retrieve data from request body

    const newAssessment = new Assessment({ name, description }); // Create a new assessment

    const savedAssessment = await newAssessment.save(); // Save to the database

    res.status(201).json(savedAssessment); // Return the created assessment
  } catch (error) {
    res.status(500).json({ message: 'Error creating assessment', error: error.message }); // Handle errors
  }
};
