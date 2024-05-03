// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('./model/user'); // Import the User model

// Handle POST request for user registration
router.post('/register', async (req, res) => {
  try {
    // Extract user data from request body
    const { userId, name, email, password, location, dob, linkedinProfile } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance based on User model
    const newUser = new User({ userId, name, email, password, location, dob, linkedinProfile });

    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully'");
    console.log(newUser);

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    console.log("User registered successfully'");
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Handle GET request to get all users
router.get('/users', async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  // Handle GET request to get user by userId
router.get('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by userId
      const user = await User.findOne({ userId });
      console.log(user);
  
      if (!user) {
        console.log("User not found")
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
// Export the router
module.exports = router;
