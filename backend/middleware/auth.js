const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: { 
          code: '401', 
          message: 'No token provided' 
        } 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: { 
        code: '401', 
        message: 'Invalid or expired token' 
      } 
    });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: { 
        code: '401', 
        message: 'Authentication required' 
      } 
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: { 
        code: '403', 
        message: 'Admin access required' 
      } 
    });
  }

  next();
};

module.exports = {
  authenticate,
  isAdmin
};

