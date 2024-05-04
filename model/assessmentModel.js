const mongoose = require('mongoose');

// Define the Assessment schema
const assessmentSchema = new mongoose.Schema({
    AssessmentTitle: {
        type: String,
        required: true,
    },
    AssessmentDate: {
        type: Date,
        required: true,
    },
    AssessmentStartTime: {
        type: String,
        required: true,
    },
  
    AssessmentEndTime: {
        type: String,
        required: true,
    },
    AssessmentDuration: {
        type: String,
        required: true,
    },
   
});

// Create the Assessment model using the schema
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
