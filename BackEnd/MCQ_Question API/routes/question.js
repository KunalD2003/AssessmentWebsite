const express = require("express");
const router =express.Router();
const MCQ = require("../models/question.js");
const Numbers = require("../models/number.js")


const{
    getAllquestions,
    getAllquestionsTesting,
} = require("../controllers/question");

router.route("/").get(getAllquestions);
router.route("/testing").get(getAllquestionsTesting);

router.post('/', async (req, res) => {
    try {
        const { score, codingScore,id } = req.body;
       const number1=score
        const number2=codingScore
         await Numbers.findByIdAndUpdate(id, { number1, number2 }, { new: true });
        res.status(201).json({ message: 'Numbers created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/result', async (req, res) => {
    try {
        const numbers = await Numbers.findById("6631222bac1ba08073756af0");
        if (!numbers) {
            return res.status(404).json({ message: 'Numbers not found' });
        }
        res.status(200).json(numbers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 module.exports=router;