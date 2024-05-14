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

// Get results of all users
router.get('/all', async (req, res) => {
    try {
        const allScores = await UserScore.find();

        if (!allScores || allScores.length === 0) {
            return res.status(404).json({ message: 'No user scores found' });
        }

        res.status(200).json(allScores);
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


router.put('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedScore = req.body;

        const existingUserScore = await UserScore.findOne({ userId });

        if (!existingUserScore) {
            return res.status(404).json({ message: 'User score not found' });
        }

        // Update the fields you want to update
        existingUserScore.Uscore = updatedScore.Uscore || existingUserScore.Uscore;
        existingUserScore.UcodingScore = updatedScore.UcodingScore || existingUserScore.UcodingScore;
        existingUserScore.UansweredQuestions = updatedScore.UansweredQuestions || existingUserScore.UansweredQuestions;
        existingUserScore.UtotalQuestions = updatedScore.UtotalQuestions || existingUserScore.UtotalQuestions;
        existingUserScore.UcorrectAnswers = updatedScore.UcorrectAnswers || existingUserScore.UcorrectAnswers;

        await existingUserScore.save();

        res.status(200).json({ message: 'User score updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
