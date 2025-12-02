const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get current user (protected)
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;

