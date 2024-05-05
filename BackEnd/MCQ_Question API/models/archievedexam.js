const mongoose = require('mongoose');

const archivedExamSchema = new mongoose.Schema({
    examname: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('ArchivedExamResult', archivedExamSchema);

