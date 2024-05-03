// src/routes/admin.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Middleware to verify admin authentication
const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken.admin !== true) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET route to fetch all logged-in users (admin access only)
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      status: 'Online', // You can check user's last activity to determine status
    }));
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
