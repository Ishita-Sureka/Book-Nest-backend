const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const admin = require('firebase-admin');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken'); // Middleware for token verification

const router = express.Router();

// Registration Route
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('firebaseUID').notEmpty().withMessage('Firebase UID is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, firebaseUID } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ firebaseUID });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ name, email, firebaseUID });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login Route
router.post('/login', verifyFirebaseToken, async (req, res) => {
  try {
    const decodedToken = req.user; // Get the decoded token from the middleware
    const user = await User.findOne({ firebaseUID: decodedToken.uid });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

module.exports = router;
