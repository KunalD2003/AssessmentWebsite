
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // Regular expression to validate email format
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    mobile: {
        type: Number,
        required: true,
        match: /^[0-9]{10}$/
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contact', contactSchema);

