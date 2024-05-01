const express = require('express');
const router = express.Router();
const { auth } = require('./firebase'); // Your Firebase initialization

router.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Firebase ID token sent from the client
    const decodedToken = await auth.verifyIdToken(token);
    // Optionally, check if the user is authorized to access your backend

    // Redirect to user dashboard or perform other actions based on authentication
    res.json({ success: true });
  } catch (error) {
    console.error('Firebase authentication error:', error);
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
});

module.exports = router;
