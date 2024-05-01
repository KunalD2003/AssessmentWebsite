const mongoose = require('mongoose');

// Define the Assessment schema
const assessmentSchema = new mongoose.Schema({
    AssessmentTitle: {
        type: String,
        required: true,
    },
    AssessmentStartDate: {
        type: Date,
        required: true,
    },
    AssessmentStartTime: {
        type: String,
        required: true,
    },
    AssessmentEndDate: {
        type: Date,
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
    Sections: [{
        id: {
            type: Number, // Changed to Number type
            required: true,
        },
        sectionName: {
            type: String,
            required: true,
        },
        sectionType: {
            type: String,
            enum: ['MCQ', 'Coding'],
            required: true,
        },
        questions: [{
            id: {
                type: Number, // Changed to Number type
                required: true,
            },
            questionDescription: {
                type: String,
                required: true,
            },
            Options: [{
                id: {
                    type: Number, // Changed to Number type
                    required: true,
                },
                optionTitle: {
                    type: String,
                    required: true,
                },
                isSelected: {
                    type: Boolean,
                    default: false,
                },
                isCorrect: {
                    type: Boolean,
                    required: true,
                },
            }],
        }],
    }],
});

// Create the Assessment model using the schema
const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
