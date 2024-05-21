const express = require('express');
const { addUserIdentity } = require('../controllers/userIdentityController'); // Import the controller function
const router = express.Router();

// Define the POST endpoint for storing captured images
router.post('/saveImage', addUserIdentity); // Use the controller function to store the image

module.exports = router; // Export the router
