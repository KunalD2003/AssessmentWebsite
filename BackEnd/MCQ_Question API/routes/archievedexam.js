const express = require('express');
const router = express.Router();
const ArchivedExamResult = require('../models/archievedexam.js');

router.post('/', async (req, res) => {
    try {
        const { examname, score, date } = req.body;
        // Create a new archived exam result with the provided data
        const archivedExamResult = new ArchivedExamResult({ examname, score, date });

        await archivedExamResult.save();
  
        res.status(201).json(archivedExamResult);
        console.log(archivedExamResult);
    } catch (err) {  
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
       
        const archivedExamResults = await ArchivedExamResult.find();
        res.json(archivedExamResults);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
