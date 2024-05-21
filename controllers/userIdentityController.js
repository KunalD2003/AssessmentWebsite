const { v4: uuidv4 } = require('uuid'); // Generate unique IDs
const UserIdentity = require('../models/UserIdentity'); // Mongoose model for storing images

const addUserIdentity = async (req, res) => {
  try {
    const { faceImage, idImage } = req.body;

    // Validate required fields
    if (!faceImage || !idImage) {
      return res.status(400).json({ error: 'Both faceImage and idImage are required' }); // Return 400 for missing data
    }

    const uniqueID = uuidv4(); // Generate a unique identifier

    const newUser = new UserIdentity({
      uniqueID, // Assign the unique identifier
      faceImage, // Store the Base64-encoded face image
      idImage, // Store the Base64-encoded ID image
    });

    await newUser.save(); // Save the new user to MongoDB
    console.log("User identity stored successfully");

    res.status(201).json({ message: 'User identity stored successfully', user: newUser }); // Return success message
  } catch (error) {
    console.error('Error storing user identity:', error); // Log server errors
    res.status(500).json({ error: 'Failed to store user identity' }); // Handle server-side errors
  }
};

module.exports = { addUserIdentity }; // Export the controller function
