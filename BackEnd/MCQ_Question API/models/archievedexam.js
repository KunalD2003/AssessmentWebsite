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
    },
    userid:{
        type: String,
              
    },
    assessmentid :{
        type: String,

    }
});

module.exports = mongoose.model('ArchivedExamResult', archivedExamSchema);

