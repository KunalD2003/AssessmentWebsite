const Question = require("../models/question");

// Function to get all questions
const getAllquestions = async (req, res) => {
    try {
        const { type } = req.query;
        const queryObject = {};

        if (type) {
            queryObject.type = type;
        }

        let page = Number(req.query.page) || 1;


        let apiData = Question.find(queryObject);

        const myData = await apiData;

        res.status(200).json({ myData });
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Function to submit an answer to a question
const submitAnswer = async (req, res) => {
    try {
        const { questionId } = req.params; 
        const { userAnswer } = req.body;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        const isCorrect = userAnswer === question.correctAnswer;

        question.userAnswer = userAnswer;
        question.isCorrect = isCorrect;

        await question.save();

        res.status(200).json({ message: "Answer submitted successfully", isCorrect });
    } catch (error) {
        console.error("Error submitting answer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Function to get a random question for testing
const getAllquestionsTesting = async (req, res) => {
    try {
        const myData = await Question.aggregate([{ $sample: { size: 1 } }]);

        res.status(200).json({ myData });
    } catch (error) {
        console.error("Error getting questions for testing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Function to insert a new question
const insertQuestion = async (req, res) => {
    try {
        const { question, options, correctAnswer } = req.body;
        const newQuestion = await Question.create({ question, options, correctAnswer });
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error inserting question:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Function to update a question
const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const { question, options, correctAnswer } = req.body;
        
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { question, options, correctAnswer },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteMCQQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        
        const deletedQuestion = await Question.findByIdAndDelete(questionId);

        if (!deletedQuestion) {
            return res.status(404).json({ message: ' Question not found' });
        }

        res.json({ message: ' Question deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllquestions, getAllquestionsTesting, submitAnswer, insertQuestion, updateQuestion, deleteMCQQuestion };
