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
    
    // Log for debugging
    console.log('getLocationById called:', {
      id: id,
      params: req.params,
      url: req.url,
      path: req.path,
      originalUrl: req.originalUrl
    });
    
    const location = Location.getById(id);
    
    if (!location) {
      console.log('Location not found for id:', id);
      return res.status(404).json({ message: 'Location not found' });
    }
    
    console.log('Location found:', location.id, location.name);
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

// Create location (Admin only)
const createLocation = (req, res) => {
  try {
    const locationData = req.body;
    
    // Validation
    if (!locationData.name || !locationData.address || !locationData.category) {
      return res.status(400).json({ 
        error: { 
          code: '400', 
          message: 'Name, address, and category are required' 
        } 
      });
    }

    const newLocation = Location.create(locationData);
    res.status(201).json({
      message: 'Location created successfully',
      location: newLocation
    });
  } catch (error) {
    console.error('Error in createLocation:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

// Update location (Admin only)
const updateLocation = (req, res) => {
  try {
    const { id } = req.params;
    const locationData = req.body;
    
    const updatedLocation = Location.update(id, locationData);
    
    if (!updatedLocation) {
      return res.status(404).json({ 
        error: { 
          code: '404', 
          message: 'Location not found' 
        } 
      });
    }

    res.status(200).json({
      message: 'Location updated successfully',
      location: updatedLocation
    });
  } catch (error) {
    console.error('Error in updateLocation:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: error.message || 'A server error has occurred' 
      } 
    });
  }
};

// Delete location (Admin only)
const deleteLocation = (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = Location.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ 
        error: { 
          code: '404', 
          message: 'Location not found' 
        } 
      });
    }

    res.status(200).json({
      message: 'Location deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteLocation:', error);
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
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
};

