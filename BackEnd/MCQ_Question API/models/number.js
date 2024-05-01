const mongoose = require("mongoose");

const numbersSchema = new mongoose.Schema({
    number1: { type: Number},
    number2: { type: Number}
});

// Define Model
module.exports = mongoose.model('Numbers', numbersSchema);