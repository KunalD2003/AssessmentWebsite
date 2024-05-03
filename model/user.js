// Import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
    userId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String }, // Optional field for user's location
  dob: { type: Date }, // Date of Birth field
  linkedinProfile: { type: String }, // LinkedIn profile URL
});

// Create and export User model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
