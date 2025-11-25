// Serverless function for /api/locations
// This file is for reference - actual deployment uses api/locations/index.js
const cors = require('cors')({ origin: true });
const locations = require('../../models/Location');

module.exports = (req, res) => {
  cors(req, res, () => {
    try {
      const { category, search } = req.query;
      
      let filteredLocations = locations.getAll();
      
      // Filter by category
      if (category && category !== 'Tất cả') {
        filteredLocations = locations.filterByCategory(category);
      }
      
      // Filter by search term
      if (search) {
        const searchResults = locations.search(search);
        // Kết hợp cả 2 filter nếu có cả category và search
        if (category && category !== 'Tất cả') {
          filteredLocations = filteredLocations.filter(loc => 
            searchResults.some(result => result.id === loc.id)
          );
        } else {
          filteredLocations = searchResults;
        }
      }
      
      res.status(200).json(filteredLocations);
    } catch (error) {
      console.error('Error in locations:', error);
      res.status(500).json({ 
        error: { 
          code: '500', 
          message: error.message || 'A server error has occurred' 
        } 
      });
    }
  });
};

