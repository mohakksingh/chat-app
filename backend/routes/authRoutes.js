const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('../config/passport');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.login(user, { session: false }, async (error) => {
      if (error) {
        res.status(500).json({ message: 'Server Error' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    });
  })(req, res);
});

module.exports = router;
