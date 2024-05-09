const express = require('express');
const router = express.Router();
const UserScore = require("../models/userScore.js");

// Submit user's test result
router.post('/', async (req, res) => {
    try {
        const { AssessmentId,userId, Uscore, UcodingScore, UansweredQuestions, UtotalQuestions, UcorrectAnswers } = req.body;

        const userScore = new UserScore({
            AssessmentId,
            userId,
            Uscore,
            UcodingScore,
            UansweredQuestions,
            UtotalQuestions,
            UcorrectAnswers
        });

        await userScore.save();

        res.status(201).json({ message: 'User test submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user's result by userId
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userScore = await UserScore.findOne({ userId });

        if (!userScore) {
            return res.status(404).json({ message: 'User score not found' });
        }

        res.status(200).json(userScore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
