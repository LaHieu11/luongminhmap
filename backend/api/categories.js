// Serverless function for /api/categories
// This file is for reference - actual deployment uses api/categories.js
const cors = require('cors')({ origin: true });
const Location = require('../models/Location');

module.exports = (req, res) => {
  cors(req, res, () => {
    try {
      const categories = Location.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error in categories:', error);
      res.status(500).json({ 
        error: { 
          code: '500', 
          message: error.message || 'A server error has occurred' 
        } 
      });
    }
  });
};

