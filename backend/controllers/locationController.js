const Location = require('../models/Location');

// Lấy tất cả địa điểm với filter
const getAllLocations = (req, res) => {
  try {
    const { category, search } = req.query;
    
    let filteredLocations = Location.getAll();
    
    // Filter by category
    if (category) {
      filteredLocations = Location.filterByCategory(category);
    }
    
    // Filter by search term
    if (search) {
      const searchResults = Location.search(search);
      // Kết hợp cả 2 filter nếu có cả category và search
      if (category) {
        filteredLocations = filteredLocations.filter(loc => 
          searchResults.some(result => result.id === loc.id)
        );
      } else {
        filteredLocations = searchResults;
      }
    }
    
    res.status(200).json(filteredLocations);
  } catch (error) {
    console.error('Error in getAllLocations:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

// Lấy địa điểm theo ID
const getLocationById = (req, res) => {
  try {
    const { id } = req.params;
    const location = Location.getById(id);
    
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.status(200).json(location);
  } catch (error) {
    console.error('Error in getLocationById:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

module.exports = {
  getAllLocations,
  getLocationById
};

