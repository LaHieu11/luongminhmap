const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: { 
          code: '400', 
          message: 'Username, email, and password are required' 
        } 
      });
    }

    // Check if user exists
    if (User.getByUsername(username)) {
      return res.status(400).json({ 
        error: { 
          code: '400', 
          message: 'Username already exists' 
        } 
      });
    }

    if (User.getByEmail(email)) {
      return res.status(400).json({ 
        error: { 
          code: '400', 
          message: 'Email already exists' 
        } 
      });
    }

    // Only allow admin role creation by existing admins
    const userRole = role === 'admin' ? 'user' : (role || 'user');

    // Create user
    const newUser = await User.create({
      username,
      email,
      password,
      role: userRole
    });

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        error: { 
          code: '400', 
          message: 'Username and password are required' 
        } 
      });
    }

    // Find user
    const user = User.getByUsername(username);
    if (!user) {
      return res.status(401).json({ 
        error: { 
          code: '401', 
          message: 'Invalid credentials' 
        } 
      });
    }

    // Verify password
    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: { 
          code: '401', 
          message: 'Invalid credentials' 
        } 
      });
    }

    // Generate token
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

// Get current user
const getCurrentUser = (req, res) => {
  try {
    const user = User.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        error: { 
          code: '404', 
          message: 'User not found' 
        } 
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};

