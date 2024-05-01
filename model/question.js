const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: mongoose.Schema.Types.Mixed, required: true }, // Assuming output can be of any type
});

// Define the schema for the "codingProblems" collection
const questionSchema = new mongoose.Schema(
  {
    questionId: { type: Number, required: true, unique: true },
    question: { type: String, required: true },
    problem: { type: String, required: true },
    sectionType: { type: String, required: true },
    examples: [exampleSchema], // Array of examples
  },
  { collection: "codingProblems" }
); // Specify the collection name);

// Create a model based on the schema
const Question = mongoose.model(
  "Question",
  questionSchema,
  "digital_Recruitment"
);

module.exports = Question; // Export the model for use in other files
