// Import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
    userId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 phone:{type:String, required:true},
});

// Create and export User model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
