const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', authController.signup);

// @route   POST /auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', authController.login);

module.exports = router;
