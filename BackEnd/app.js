import express from 'express';
import mongoose from 'mongoose';
import assessmentRoutes from './routes/assessmentRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // To handle cross-origin requests

const app = express(); // Create an Express app instance

// Middleware to parse JSON and allow CORS
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/assessmentDB') // No additional options needed
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Attach routes to the Express server
app.use('/api', assessmentRoutes); // Use imported routes for the `/api` endpoint

// Set the port and start the Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Server start confirmation
});
