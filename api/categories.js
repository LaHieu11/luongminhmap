// Serverless function for /api/categories
const cors = require('cors')({ origin: true });
const locations = require('./locations');

module.exports = (req, res) => {
  cors(req, res, () => {
    try {
      const categories = ['Tất cả', ...new Set(locations.map(loc => loc.category))];
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
