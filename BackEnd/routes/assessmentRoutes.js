import express from 'express'; // Express module
import { createAssessment, getAllAssessments } from '../controllers/assessmentController.js'; // Import controller functions

const router = express.Router(); // Create a new router instance

// POST endpoint to create a new assessment
router.post('/createAssessment', createAssessment);

// GET endpoint to fetch all assessments
router.get('/assessments', getAllAssessments);

export default router; // Export the router
