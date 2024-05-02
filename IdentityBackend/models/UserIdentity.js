const mongoose = require('mongoose');

// Define the UserIdentity schema
const userIdentitySchema = new mongoose.Schema({
  uniqueID: {
    type: String,
    unique: true, // Ensure the ID is unique
    required: true, // Prevent null values
  },
  faceImage: {
    type: String, // Base64-encoded face image
    required: true,
  },
  idImage: {
    type: String, // Base64-encoded ID image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for record creation
  },
});

// Create the Mongoose model
const UserIdentity = mongoose.model('UserIdentity', userIdentitySchema);

module.exports = UserIdentity; // Export the model
