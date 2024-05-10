const express = require("express");
const router = express.Router();
const MCQ = require("../models/question.js");


const { getAllquestions, getAllquestionsTesting,insertQuestion, updateQuestion, deleteAssessment, deleteMCQQuestion} = require("../controllers/question.js");

router.route("/").get(getAllquestions);
router.route("/testing").get(getAllquestionsTesting);
router.route("/").post(insertQuestion);
router.route("/:questionId").put(updateQuestion);
router.route("/:questionId").delete(deleteMCQQuestion);



module.exports = router;



