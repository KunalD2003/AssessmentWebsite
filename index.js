const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const webcamRoutes = require('./routes/webcamRoutes'); // Your route handler

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express application

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors());


// Use JSON parser with larger payload limit
app.use(express.json({ limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on connection failure
  });

// Apply webcam routes to the /webcam endpoint
app.use('/webcam', webcamRoutes);

// Middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' }); // Handle unknown routes
});

// Middleware for handling other server errors
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err); // Log unexpected errors
  res.status(500).json({ error: 'Internal Server Error' }); // Return HTTP 500 status
});

const PORT = process.env.PORT || 3000; // Set the server port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Confirm the server is running
});
