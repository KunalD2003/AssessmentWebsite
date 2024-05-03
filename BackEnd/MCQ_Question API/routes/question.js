const express = require("express");
const router = express.Router();
const MCQ = require("../models/question.js");
const UserScore = require("../models/userScore.js");


const {
    getAllquestions,
    getAllquestionsTesting,
} = require("../controllers/question");


router.route("/").get(getAllquestions);
router.route("/testing").get(getAllquestionsTesting);


router.post('/', async (req, res) => {
    try {
        const { score, codingScore, answeredQuestions, totalQuestions, correctAnswers ,id} = req.body;
        /*  const id = req.params.id;*/
        const Uscore = score
        const UcodingScore = codingScore
        const UansweredQuestions = answeredQuestions
        const UtotalQuestions = totalQuestions
        const UcorrectAnswers = correctAnswers
        await UserScore.findByIdAndUpdate(id, { Uscore, UcodingScore, UansweredQuestions, UtotalQuestions,UcorrectAnswers  });

        res.status(201).json({ message: 'User test submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's result
router.get('/result', async (req, res) => {
    try {
       /* const id = req.params.id;*/
        const userScore = await UserScore.findById("6633eb8ace767dbde2b4ff49");

        if (!userScore) {
            return res.status(404).json({ message: 'User score not found' });
        }

        res.status(200).json(userScore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



