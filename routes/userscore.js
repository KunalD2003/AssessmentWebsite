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


router.put('/:userId/:assessmentId', async (req, res) => {
    const userId = req.params.userId;
    const assessmentId = req.params.assessmentId; // Not used, but included for completeness

    const updatedScore = req.body;
    console.log(updatedScore);

    if (!updatedScore) {
        return res.status(400).json({ message: 'No update data provided' });
    }

    try {
        const existingUserScore = await UserScore.findOne({ userId, AssessmentId: assessmentId });

        if (!existingUserScore) {
            return res.status(404).json({ message: 'User score not found' });
        }

        // Update only the fields that are provided in the request body
        if (updatedScore.Uscore !== undefined) {
            existingUserScore.Uscore = updatedScore.Uscore;
        }
        if (updatedScore.UcodingScore !== undefined) {
            existingUserScore.UcodingScore = updatedScore.UcodingScore;
        }
        if (updatedScore.UansweredQuestions !== undefined) {
            existingUserScore.UansweredQuestions = updatedScore.UansweredQuestions;
        }
        if (updatedScore.UtotalQuestions !== undefined) {
            existingUserScore.UtotalQuestions = updatedScore.UtotalQuestions;
        }
        if (updatedScore.UcorrectAnswers !== undefined) {
            existingUserScore.UcorrectAnswers = updatedScore.UcorrectAnswers;
        }

        await existingUserScore.save();

        res.status(200).json({ message: 'User score updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
