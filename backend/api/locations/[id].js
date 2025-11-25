// Serverless function for /api/locations/:id
// This file is for reference - actual deployment uses api/locations/[id].js
const cors = require('cors')({ origin: true });
const Location = require('../../models/Location');

module.exports = (req, res) => {
  cors(req, res, () => {
    try {
      // Vercel passes id as req.query.id for dynamic routes
      const id = req.query.id || req.params?.id;
      const location = Location.getById(id);
      
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      
      res.status(200).json(location);
    } catch (error) {
      console.error('Error in location by id:', error);
      res.status(500).json({ 
        error: { 
          code: '500', 
          message: error.message || 'A server error has occurred' 
        } 
      });
    }
  });
};

