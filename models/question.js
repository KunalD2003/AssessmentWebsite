const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question must be provided"],
    },
    options: {
        type: [String],
        required: [true, "Options must be provided"],
    },
    correctAnswer: {
        type: String,
        required: [true, "Correct answer must be provided"],
    },
    userAnswer: {
        type: String,
        default: null 
    },
    isCorrect: {
        type: Boolean,
        default: null 
    }
});

module.exports = mongoose.model("MCQ", mcqSchema);

