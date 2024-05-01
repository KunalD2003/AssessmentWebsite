const Question = require("../models/question");

const getAllquestions = async (req, res) => {
    try {
        const { type } = req.query;
        const queryObject = {};

        if (type) {
            queryObject.type = type;
        }

        let apiData = Question.find(queryObject);

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 12;
        let skip = (page - 1) * limit;

        apiData = apiData.skip(skip).limit(limit);

        const myData = await apiData;

        res.status(200).json({ myData, nbHits: myData.length });
    } catch (error) {
        console.error("Error getting questions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

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

const getAllquestionsTesting = async (req, res) => {
    try {
        const myData = await Question.aggregate([{ $sample: { size: 1 } }]);

        res.status(200).json({ myData });
    } catch (error) {
        console.error("Error getting questions for testing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAllquestions, getAllquestionsTesting, submitAnswer };
