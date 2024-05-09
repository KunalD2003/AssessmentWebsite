const mongoose = require("mongoose");

const userScoreSchema = new mongoose.Schema({
    AssessmentId: { type: String },
    userId: { type: String },
    Uscore: { type: Number },
    UcodingScore: { type: Number },
    UansweredQuestions: { type: Number },
    UtotalQuestions: { type: Number },
    UcorrectAnswers: { type: Number }
});

module.exports = mongoose.model('UserScore', userScoreSchema);

